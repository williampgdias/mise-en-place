<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

Route::post('/reservations', [ReservationController::class, 'store']);