<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        // Validate clients data
        $validated = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'tel_number' => 'required|string',
            'res_date' => 'required|date|after:now',
            'guest_number' => 'required|integer|min:1',
        ]);

        // Define the time
        $reservationDate = Carbon::parse($validated['res_date']);

        $tables = Table::where('capacity', '>=', $validated['guest_number'])
            ->where('is_active', true)
            ->whereDoesntHave('reservations', function ($query) use ($reservationDate) {
                $query->whereBetween('res_date', [
                    $reservationDate->copy()->subHours(2),
                    $reservationDate->copy()->addHours(2)
                ]);
            })
            ->get();

        // If don't find any free table...
        if ($tables->isEmpty()) {
            return response()->json([
                'message' => 'No tables available for this time or party size.',
            ], 422);
        }

        // If found, take the first free table
        $table = $tables->first();

        // Create the booking
        $reservation = Reservation::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'tel_number' => $validated['tel_number'],
            'res_date' => $reservationDate,
            'guest_number' => $validated['guest_number'],
            'table_id' => $table->id,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Reservation created successfully!',
            'table_assigned' => $table->name,
            'reservation' => $reservation
        ], 201);
    }
}