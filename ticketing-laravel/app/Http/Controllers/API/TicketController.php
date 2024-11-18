<?php

namespace App\Http\Controllers\API;

use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Helpers\ApplicationResponse;
use App\Http\Controllers\Controller;

class TicketController extends Controller
{
    use ApplicationResponse;

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
