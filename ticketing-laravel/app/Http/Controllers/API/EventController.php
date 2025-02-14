<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApplicationResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Encoders\WebpEncoder;

use function App\Helpers\prepend_base_url;

class EventController extends Controller
{
    use ApplicationResponse;

    // List all events
    public function list(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $orderBy = $request->input('order_by', 'id');
        $searchTerm = '%' . $request->input('search', '') . '%';
        $category = $request->input('cat', '');

        $events = Event::with([
            'ticketTypes' => function ($query) {
                $query->orderBy('price', 'asc')->limit(1);
            }
        ])
            ->where(function ($query) use ($searchTerm) {
                $query->where('name', 'LIKE', $searchTerm)
                    ->orWhere('location', 'LIKE', $searchTerm);
            })
            ->when($category, function ($query) use ($category) {
                return $query->where('category', $category);
            })
            ->orderByDesc($orderBy)
            ->paginate($perPage);

        $updateEvent = $events->getCollection()->map(function ($event) {
            $lowestPrice = $event->ticketTypes->first() ? $event->ticketTypes->first()->price : null;
            $event['price'] = $lowestPrice;
            $event['image_banner'] = prepend_base_url($event->image_banner, $event->name);
            return $event;
        });

        $events->setCollection($updateEvent);

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Success.',
            'data' => $events
        ]);
    }

    public function getPopularEvents()
    {
        $popularEvents = $this->fetchPopularEvents();
        if ($popularEvents->count() < 3) {
            $popularEvents = Event::limit(10)->get();
        }
        $popularEvents->map(function ($event) {
            $event->image_banner = prepend_base_url($event->image_banner, $event->name);
            return $event;
        });

        // Return the popular events as a JSON response (or to a view)
        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Success.',
            'data' => $popularEvents
        ]);
    }

    /**
     * Fetch the top 10 most popular events based on ticket sales.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    protected function fetchPopularEvents()
    {
        return Event::select(
            'events.id',
            'events.name',
            'events.slug',
            'events.start_datetime',
            'events.location',
            'events.image_banner',
            DB::raw('COUNT(tickets.id) as total_tickets_sold')
        )
            ->join('orders', 'events.id', '=', 'orders.event_id')
            ->join('tickets', 'orders.id', '=', 'tickets.order_id')
            ->where('events.start_datetime', '>', now())  // Fetch upcoming events only
            ->groupBy('events.id', 'events.name', 'events.start_datetime', 'events.location', 'events.image_banner')
            ->orderByDesc('total_tickets_sold')  // Order by the number of tickets sold
            ->limit(10)  // Limit to the top 10
            ->get();
    }

    public function myEvent(Request $request): JsonResponse
    {
        $perPage = $request->input('limit', 10);
        $orderBy = $request->input('order_by', 'id');
        $searchTerm = '%' . $request->input('search', '') . '%';

        $events = Event::with([
            'ticketTypes' => function ($query) {
                $query->orderBy('price', 'asc')->limit(1);
            }
        ])
            ->where(function ($query) use ($searchTerm) {
                $query->where('name', 'LIKE', $searchTerm)
                    ->orWhere('location', 'LIKE', $searchTerm);
            })
            ->where('organizer_id', $request->user->id)
            ->orderByDesc($orderBy)
            ->paginate($perPage);

        $updateEvent = $events->getCollection()->map(function ($event) {
            $event['image_banner'] = prepend_base_url($event->image_banner, $event->name);
            return $event;
        });

        $events->setCollection($updateEvent);

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Success.',
            'data' => $events
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $events = Event::orderByDesc('id')->get();

        $events = $events->map(function ($event) {
            $event->image_banner = prepend_base_url($event->image_banner, $event->name);
            return $event;
        });

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $events
        );
    }

    public function store(Request $request): JsonResponse
    {
        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:500',
            'category' => 'required|string|max:20',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date',
            'location' => 'required|string|max:255',
            'image_banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'ticket_types' => 'required',
            'ticket_types.*.name' => 'required|string',
            'ticket_types.*.price' => 'required|numeric',
            'ticket_types.*.quantity' => 'required|integer',
        ]);

        // Handle image upload, conversion, and storage
        $image = $request->file('image_banner');
        $ext = $image->getClientOriginalExtension();
        $fileName = date('YmdHis') . '_product.' . $ext;
        $webpFileName = pathinfo($fileName, PATHINFO_FILENAME) . '.webp';
        $directoryPath = 'images';

        // Create the directory if it doesn't exist
        if (!Storage::exists($directoryPath)) {
            Storage::makeDirectory($directoryPath);
        }

        // Store original image
        $imagePath = $image->storeAs($directoryPath, $fileName);

        // Convert image to WebP format and store
        $webpImage = Image::read($image->getRealPath())->encode(new WebpEncoder(quality: 80));
        $webpImagePath = $directoryPath . '/' . $webpFileName;
        Storage::put($webpImagePath, $webpImage);
        // Update validated data with the WebP image path
        $validatedData['image_banner'] = $webpImagePath;
        $validatedData['organizer_id'] = $request->organizer_id ?? $request->user->id;
        $validatedData['is_active'] = 1;
        $validatedData['slug'] = Str::slug($validatedData['name']);


        // Create the event
        $event = Event::create($validatedData);

        $ticket_types = json_decode($request->ticket_types, true);
        // Create ticket types
        foreach ($ticket_types as $ticketType) {
            $ticketType['event_id'] = $event->id;
            TicketType::create($ticketType);
        }

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $event
        );
    }

    /**
     * get event by slug
     */
    public function bySlug($slug): JsonResponse
    {
        $event = Event::with(['ticketTypes'])->where('slug', $slug)->firstOrFail();
        if (!$event) {
            return $this->json(
                Response::HTTP_NOT_FOUND,
                "Event not found."
            );
        }
        $imagePath = $event->image_banner;
        $event['image_banner'] = prepend_base_url($imagePath, $event->name);
        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $event
        );
    }


    // Show a specific event
    public function show($id): JsonResponse
    {
        $event = Event::with(['ticketTypes'])->findOrFail($id);
        $event['image_banner'] = prepend_base_url($event->image_banner, $event->name);

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $event
        );
    }

    // Update an event
    public function update(Request $request, $id): JsonResponse
    {
        $event = Event::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:500',
            'category' => 'required|string|max:20',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date',
            'location' => 'required|string|max:255',
            'image_banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'ticket_types' => 'required',
            'ticket_types.*.name' => 'required|string',
            'ticket_types.*.price' => 'required|numeric',
            'ticket_types.*.quantity' => 'required|integer',
        ]);

        if ($request->hasFile('image_banner')) {
            $image = $request->file('image_banner');
            $ext = $image->getClientOriginalExtension();
            $fileName = date('YmdHis') . '_product.' . $ext;
            $webpFileName = pathinfo($fileName, PATHINFO_FILENAME) . '.webp';
            $directoryPath = 'images';

            // Create the directory if it doesn't exist
            if (!Storage::exists($directoryPath)) {
                Storage::makeDirectory($directoryPath);
            }

            // Store original image
            $imagePath = $image->storeAs($directoryPath, $fileName);

            // Convert image to WebP format and store
            $webpImage = Image::read($image->getRealPath())->encode(new WebpEncoder(quality: 80));
            $webpImagePath = $directoryPath . '/' . $webpFileName;
            Storage::put($webpImagePath, $webpImage);
            $validatedData['image_banner'] = $webpImagePath;
        }
        $validatedData['slug'] = Str::slug($validatedData['name']);
        $validatedData['organizer_id'] = $request->organizer_id ?? $request->user->id;

        // Update event data
        $event->update($validatedData);

        // Update or create ticket types
        $ticketTypes = collect(json_decode($request->ticket_types, true));
        $existingTicketTypeIds = $event->ticketTypes->pluck('id')->toArray();

        foreach ($ticketTypes as $ticketTypeData) {
            if (isset($ticketTypeData['id']) && in_array($ticketTypeData['id'], $existingTicketTypeIds)) {
                // Update existing ticket type
                $ticketType = TicketType::find($ticketTypeData['id']);
                $ticketType->update([
                    'name' => $ticketTypeData['name'],
                    'price' => $ticketTypeData['price'],
                    'available_quantity' => $ticketTypeData['available_quantity']
                ]);
            } else {
                // Create new ticket type
                $ticketTypeData['event_id'] = $event->id;
                TicketType::create($ticketTypeData);
            }
        }

        // Delete removed ticket types
        $newTicketTypeIds = $ticketTypes->pluck('id')->filter()->toArray();
        $ticketTypesToDelete = array_diff($existingTicketTypeIds, $newTicketTypeIds);
        TicketType::destroy($ticketTypesToDelete);

        return response()->json([
            'code' => 200,
            'message' => 'Success.',
            'data' => $event->load('ticketTypes')
        ]);
    }

    // Delete an event
    public function destroy($id): JsonResponse
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $event
        );
    }
}
