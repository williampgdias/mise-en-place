<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();

            // Who make the booking
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('tel_number');

            // Booking details
            $table->dateTime('res_date');
            $table->integer('guest_number');

            $table->foreignId('table_id')->constrained()->onDelete('cascade');

            $table->enum('status', ['pending', 'confirmed', 'seated', 'cancelled', 'no_show'])
                ->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};