<?php

use App\Helpers\Ticketku;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\DiscountController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OrderDetailController;
use App\Http\Controllers\API\TicketController;
use App\Http\Controllers\API\TicketTypeController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Middleware\auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('register', [AuthController::class, 'register']);
Route::post('verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('login', [AuthController::class, 'login']);
Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);

Route::post('google-callback', [AuthController::class, 'handleGoogleCallback']);
Route::get('tickets/download/{orderId}', [TicketController::class, 'downloadTickets']);
Route::post('handle_invoice_callback', [Ticketku::class, 'handleInvoiceCallback']);

Route::get('events/list', [EventController::class, 'list']);
Route::get('categories/list', [CategoryController::class, 'index']);
Route::get('events/get_popular_events', [EventController::class, 'getPopularEvents']);
Route::get('events/by-slug/{slug}', [EventController::class, 'bySlug']);

Route::middleware(['auth.custom'])->group(function () {
    Route::get('orders/list', [OrderController::class, 'list']);
    Route::get('me', [AuthController::class, 'me']);
    Route::put('me/update', [AuthController::class, 'me_update']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('events', EventController::class);
    Route::get('my_events', [EventController::class, 'myEvent']);


    Route::apiResource('users', UserController::class);
    // Route::apiResource('ticket-types', TicketTypeController::class);
    Route::apiResource('tickets', TicketController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('categories', CategoryController::class);

    // admin routes
    // Route::get('admin/events', [EventController::class, 'index']);
    // Route::post('admin/events/{id}', [EventController::class, 'update']);
    // Route::post('admin/events', [EventController::class, 'store']);
    // Route::get('admin/events/{id}', [EventController::class, 'show']);
    // Route::delete('admin/events{id}', [EventController::class, 'destroy']);

    Route::apiResource('admin/orders', OrderController::class);
    Route::apiResource('admin/users', AuthController::class);
    Route::apiResource('admin/categories', CategoryController::class);
    Route::get('admin/dashboard/getMonthlyCounts', [DashboardController::class, 'getMonthlyCounts']);
});
Route::apiResource('admin/events', EventController::class);


// Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('dashboard');


