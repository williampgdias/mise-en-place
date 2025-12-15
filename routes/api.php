<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Http\REquest;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (REquest $request) {
    return $request->user();
});

// -----------------------------------------------------------
// PUBLIC ROUTES (Customer)
// -----------------------------------------------------------
// Anyone can create a booking
Route::post('/reservations', [ReservationController::class, 'store']);

// -----------------------------------------------------------
// PROTECTED ROUTES (Manager)
// -----------------------------------------------------------
// Only people connected can see, edit and cancel
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::patch('/reservations/{reservation}', [ReservationController::class, 'update']);
    Route::delete('/reservations/{reservation}', [ReservationController::class, 'destroy']);
});