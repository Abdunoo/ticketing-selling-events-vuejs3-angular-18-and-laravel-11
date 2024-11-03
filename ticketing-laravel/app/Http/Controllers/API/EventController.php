<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApplicationResponse;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Http\JsonResponse;
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

        $events = Event::with([
            'ticketTypes' => function ($query) {
                $query->orderBy('price', 'asc')->limit(1);
            }
        ])
            ->where(function ($query) use ($searchTerm) {
                $query->where('name', 'LIKE', $searchTerm)
                    ->orWhere('location', 'LIKE', $searchTerm);
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
        $events = Event::lazyByIdDesc();
        $events->map(function ($event) {
            $event->image_banner = prepend_base_url($event->image_banner, $event->name);
            return $event;
        });

        return response()->json($events);
    }

    public function store(Request $request): JsonResponse
    {
        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date',
            'location' => 'required|string',
            'image_banner' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
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
        $validatedData['organizer_id'] = $request->user->id;
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
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'start_datetime' => 'sometimes|required|date',
            'end_datetime' => 'sometimes|required|date',
            'location' => 'sometimes|required|string|max:255',
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

            $imagePath = $image->storeAs($directoryPath, $fileName);
            $webpImage = Image::read($image->getRealPath())->encode(new WebpEncoder(quality: 80));
            $webpImagePath = $directoryPath . '/' . $webpFileName;
            Storage::put($webpImagePath, $webpImage);
            $validatedData['image_banner'] = $webpImagePath;
            $validatedData['slug'] = Str::slug($validatedData['name']);
        }

        $event->update($validatedData);

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $event
        );
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
