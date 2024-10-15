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
        $perPage = $request->input('limit', 6);
        $user = $request->user;

        try {
            $orders = Order::with('events')
                ->where('user_id', $user->id)
                ->orderByDesc('created_at')->paginate($perPage);

            $getImageBanner = $orders->getCollection()->map(function ($order) {
                $order->events->image_banner = prepend_base_url($order->events->image_banner);
                return $order;
            });

            $orders->setCollection($getImageBanner);

            return $this->json(
                Response::HTTP_OK,
                "Success.",
                $orders
            );
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function index(Request $request)
    {
        $orders = Order::with(['events', 'user'])->get();

        $getImageBanner = $orders->map(function ($order) {
            $order->events->image_banner = prepend_base_url($order->events->image_banner);
            return $order;
        });

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $order_no = $this->ticketku->getOrderNo();
        $validatedData = $request->validate([
            'total_price' => 'required|numeric',
            'event_id' => 'nullable|exists:events,id',
            'quantity' => 'required|integer',
            'price' => 'required|numeric', // price per item
            'ticket_type' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $data = [
            'order_no' => $order_no,
            'total_price' => $request->total_price,
            'payment_status' => 'pending',
            'event_id' => $request->event_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'user_id' => $request->user->id,
            'ticket_type' => $request->ticket_type,
        ];

        try {
            DB::beginTransaction();

            $order = Order::create($data);

            $response = Ticketku::createInvoice($data);
            if (isset($response['invoice_url'])) {
                $order->update(['url_invoice' => $response['invoice_url']]);
            }

            for ($i = 0; $i < $request->quantity; $i++) {
                $unique_code = 'TCKT-' . strtoupper(Str::random(4)) . '-' . $order->id . '-' . $request->user->id . '-' . $request->event_id . '-' . ($i + 1);

                Ticket::create([
                    'order_id' => $order->id,
                    'is_used' => false,
                    'unique_code' => $unique_code,
                ]);
            }

            DB::commit();
            return $this->json(
                Response::HTTP_OK,
                "Success.",
                $order
            );
        } catch (\Throwable $th) {
            DB::rollBack();
            return $this->json(
                Response::HTTP_INTERNAL_SERVER_ERROR,
                $th->getMessage(),
            );
        }
    }

    public function show($id)
    {
        $order = Order::with('events')->find($id);
        $order->events['image_banner'] = prepend_base_url($order->events->image_banner);

        if (!$order) {
            return $this->json(
                Response::HTTP_NOT_FOUND,
                "Order not found",
            );
        }

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $order
        );
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return $this->json(
                Response::HTTP_NOT_FOUND,
                "Order not found",
            );
        }

        $validatedData = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'discount_id' => 'nullable|exists:discounts,id',
            'discount_amount' => 'required|numeric',
            'total_price' => 'required|numeric',
            'payment_status' => 'required|in:pending,paid,failed',
        ]);

        $order->update($validatedData);
        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $order
        );
    }

    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return $this->json(
                Response::HTTP_NOT_FOUND,
                "Order not found",
            );
        }

        $order->delete();
        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $order
        );
    }
}
