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
        Schema::create('events', function (Blueprint $table) {
            $table->id()->autoIncrement()->primary();
            $table->string('name', 50)->unique();
            $table->string('slug', 50);
            $table->string('description', 500);
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->string('location', 255);
            $table->string('image_banner');
            $table->unsignedBigInteger('organizer_id');
            $table->boolean('is_active')->default(true);
            $table->foreign('organizer_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
