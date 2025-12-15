<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

// Create
Route::post('/reservations', [ReservationController::class, 'store']);

// Read
Route::get('/reservations', [ReservationController::class, 'index']);

// Update the Status
Route::patch('/reservations/{reservation}', [ReservationController::class, 'update']);

// Delete the booking
Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);