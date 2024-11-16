<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApplicationResponse;
use App\Helpers\Ticketku;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

use function App\Helpers\prepend_base_url;

class OrderController extends Controller
{
    use ApplicationResponse;

    protected $model;
    protected $ticketku;

    public function __construct()
    {
        $this->model = new Order();
        $this->ticketku = new Ticketku();
    }

    public function list(Request $request): JsonResponse
    {
        try {
            $perPage = $request->input('limit', 6);
            $searchTerm = '%' . $request->input('query', '') . '%';
            $user = $request->user;

            $orders = Order::with('events')
                ->where('user_id', $user->id)
                ->whereHas('events', function ($query) use ($searchTerm) {
                    $query->where('name', 'LIKE', $searchTerm)
                        ->orWhere('location', 'LIKE', $searchTerm);
                })
                ->orderByDesc('created_at')
                ->paginate($perPage);

            $orders->getCollection()->transform(function ($order) {
                $order->events->image_banner = prepend_base_url($order->events->image_banner, $order->events->name);
                return $order;
            });

            return $this->json(Response::HTTP_OK, "Success.", $orders);
        } catch (\Throwable $th) {
            return $this->json(Response::HTTP_INTERNAL_SERVER_ERROR, $th->getMessage());
        }
    }

    public function index(): JsonResponse
    {
        try {
            $orders = Order::with(['events', 'user'])->get();

            $orders->transform(function ($order) {
                $order->events->image_banner = prepend_base_url($order->events->image_banner, $order->events->name);
                return $order;
            });

            return $this->json(Response::HTTP_OK, "Success.", $orders);
        } catch (\Throwable $th) {
            return $this->json(Response::HTTP_INTERNAL_SERVER_ERROR, $th->getMessage());
        }
    }

    public function store(Request $request): JsonResponse
    {
        $order_no = $this->ticketku->getOrderNo();

        try {
            $validatedData = $request->validate([
                'total_price' => 'required|numeric',
                'event_id' => 'nullable|exists:events,id',
                'quantity' => 'required|integer',
                'price' => 'required|numeric',
                'ticket_type' => 'required|string',
                'user_id' => 'nullable|exists:users,id',
            ]);

            $data = array_merge($validatedData, [
                'order_no' => $order_no,
                'payment_status' => 'pending',
                'user_id' => $request->user->id,
            ]);

            if ($request->user_id) {
                $data['user_id'] = $request->user_id;
            }

            DB::beginTransaction();

            $order = Order::create($data);
            $response = Ticketku::createInvoice($data);

            if (isset($response['invoice_url'])) {
                $order->update(['url_invoice' => $response['invoice_url']]);
            }

            foreach (range(1, $request->quantity) as $i) {
                Ticket::create([
                    'order_id' => $order->id,
                    'is_used' => false,
                    'unique_code' => 'TCKT-' . strtoupper(Str::random(4)) . '-' . $order->id . '-' . $data['user_id'] . '-' . $data['event_id'] . '-' . $i,
                ]);
            }

            DB::commit();

            return $this->json(Response::HTTP_OK, "Success.", $order);
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->json(Response::HTTP_INTERNAL_SERVER_ERROR, $th->getMessage());
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $order = Order::with('events.ticketTypes')->find($id);

            if (!$order) {
                return $this->json(Response::HTTP_NOT_FOUND, "Order not found.");
            }

            $order->events->image_banner = prepend_base_url($order->events->image_banner, $order->events->name);

            return $this->json(Response::HTTP_OK, "Success.", $order);
        } catch (\Throwable $th) {
            return $this->json(Response::HTTP_INTERNAL_SERVER_ERROR, $th->getMessage());
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return $this->json(Response::HTTP_NOT_FOUND, "Order not found.");
            }

            $validatedData = $request->validate([
                'total_price' => 'required|numeric',
                'event_id' => 'nullable|exists:events,id',
                'quantity' => 'required|integer',
                'price' => 'required|numeric',
                'ticket_type' => 'required|string',
                'user_id' => 'nullable|exists:users,id',
                'order_no' => 'required|string',
            ]);

            $response = Ticketku::createInvoice($validatedData);

            $data = $validatedData;
            if (isset($response['invoice_url'])) {
                $data['url_invoice'] = $response['invoice_url'];
            }

            $order->update($data);

            return $this->json(Response::HTTP_OK, "Success.", $order);
        } catch (\Throwable $th) {
            return $this->json(Response::HTTP_INTERNAL_SERVER_ERROR, $th->getMessage());
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return $this->json(Response::HTTP_NOT_FOUND, "Order not found.");
            }

            $order->delete();

            return $this->json(Response::HTTP_OK, "Order deleted successfully.", $order);
        } catch (\Throwable $th) {
            return $this->json(Response::HTTP_INTERNAL_SERVER_ERROR, $th->getMessage());
        }
    }
}
