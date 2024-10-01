<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApplicationResponse;
use App\Http\Controllers\Controller;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TicketTypeController extends Controller
{
    use ApplicationResponse;

    public function index()
    {
        $ticketTypes = TicketType::all();
        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $ticketTypes
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
        ]);

        $ticketType = TicketType::create($validated);

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $ticketType,
        );
    }

    public function show($id)
    {
        $ticketType = TicketType::findOrFail($id);
        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $ticketType,
        );
    }

    public function update(Request $request, $id)
    {
        $ticketType = TicketType::findOrFail($id);

        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
        ]);

        $ticketType->update($validated);

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $ticketType,
        );
    }

    public function destroy($id)
    {
        $ticketType = TicketType::findOrFail($id);
        $ticketType->delete();

        return $this->json(
            Response::HTTP_OK,
            "Success.",
        );
    }
}
