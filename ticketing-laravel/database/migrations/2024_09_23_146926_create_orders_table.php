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
        Schema::create('orders', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->decimal('discount_amount', 10, 2)->default(0)->nullable();
            $table->decimal('total_price', 10, 2);
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->unsignedBigInteger('event_id');
            $table->string('ticket_type')->nullable();
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->string('order_no');
            $table->string('url_invoice')->nullable();
            $table->string('pay_date')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('bank')->nullable();
            $table->string('no_rek')->nullable();
            $table->string('name_of')->nullable();
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
