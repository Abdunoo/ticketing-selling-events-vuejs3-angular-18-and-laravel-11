<?php

namespace App\Http\Controllers\API;

use App\Models\Event;
use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Helpers\ApplicationResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Symfony\Component\HttpFoundation\Response;

class TicketController extends Controller
{
    use ApplicationResponse;

    public function downloadTickets($orderId)
    {
        $order = Order::with(['user'])->findOrFail($orderId);
        // $event = Event::with(['ticketTypes'])->findOrFail($id);
        // return $order;
        $tickets = Ticket::where('order_id', $order->id)->get();

        // Ensure the 'tickets' folder exists, create it if not
        $ticketsFolder = storage_path('app/public/tickets/');
        if (!File::exists($ticketsFolder)) {
            File::makeDirectory($ticketsFolder, 0755, true); // Create directory with permission 0755
        }

        $eventBannerBase64 = $this->getBase64Image('public/events/1200x400.png');
        $customer_name = $order->user->name;

        $data = [
            'order_no' => $order->order_no,
            'event_name' => $order->events->name,
            'event_date' => $order->events->start_datetime,
            'event_banner_base64' => $eventBannerBase64,
            'tickets' => $tickets->map(function ($ticket) use ($customer_name) {
                return [
                    'id' => $ticket->id,
                    'unique_code' => $ticket->unique_code,
                    'customer_name' => $customer_name ?? 'N/A',
                    'qr_code_url' => $this->generateQrCode($ticket->unique_code),
                ];
            }),
        ];

        $pdf = Pdf::loadView('tickets', $data);

        $fileName = 'tickets_' . $order->order_no . '.pdf';
        $pdfPath = $ticketsFolder . $fileName;
        $pdf->save($pdfPath);

        return response()->download($pdfPath)->deleteFileAfterSend(true);
    }

    private function generateQrCode($unique_code)
    {
        $qrCode = QrCode::format('png')->size(200)->generate($unique_code);
        return 'data:image/png;base64,' . base64_encode($qrCode);
    }

    private function getBase64Image($imagePath)
    {
        $image = Storage::get($imagePath);
        return 'data:image/png;base64,' . base64_encode($image);
    }


    public function index()
    {
        return Ticket::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'user_id' => 'nullable|exists:users,id',
            'ticket_type_id' => 'nullable|exists:ticket_types,id',
            'unique_code' => 'required|string|unique:tickets,unique_code',
            'is_sold' => 'boolean',
            'is_used' => 'boolean',
        ]);

        $ticket = Ticket::create($request->all());

        return response()->json($ticket, 201);
    }

    public function show($id)
    {
        return Ticket::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
            'user_id' => 'nullable|exists:users,id',
            'ticket_type_id' => 'nullable|exists:ticket_types,id',
            'unique_code' => 'required|string|unique:tickets,unique_code,' . $id,
            'is_sold' => 'boolean',
            'is_used' => 'boolean',
        ]);

        $ticket = Ticket::findOrFail($id);
        $ticket->update($request->all());

        return response()->json($ticket, 200);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();

        return response()->json(null, 204);
    }
}
