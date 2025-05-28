<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RouterController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\UserController as UserManagementController;

Route::get('/', function () {
    return redirect()->route('routers.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Router Management Routes
    Route::prefix('routers')->name('routers.')->group(function () {
        Route::get('/', [RouterController::class, 'index'])->name('index');
        Route::get('/create', [RouterController::class, 'create'])->name('create');
        Route::post('/', [RouterController::class, 'store'])->name('store');
        Route::get('/{router}', [RouterController::class, 'show'])->name('show');
        Route::get('/{router}/edit', [RouterController::class, 'edit'])->name('edit');
        Route::put('/{router}', [RouterController::class, 'update'])->name('update');
        Route::delete('/{router}', [RouterController::class, 'destroy'])->name('destroy');
        
        // Additional Router Functionality Routes
        Route::get('/{router}/status', [RouterController::class, 'status'])->name('status');
        Route::get('/{router}/interfaces', [RouterController::class, 'interfaces'])->name('interfaces');
        Route::get('/{router}/resources', [RouterController::class, 'resources'])->name('resources');
        Route::post('/{router}/restart', [RouterController::class, 'restart'])->name('restart');
        Route::post('/{router}/backup', [RouterController::class, 'backup'])->name('backup');
    });

    // User, Ticket, and Lead Management Routes
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserManagementController::class, 'index'])->name('index');
    });

    Route::resource('tickets', TicketController::class)->middleware(['auth', 'verified']);
    Route::resource('leads', LeadController::class)->middleware(['auth', 'verified']);

    // Placeholder routes for other sections (Finance and Communication)
    Route::prefix('finance')->name('finance.')->group(function () {
        Route::get('/packages', function () { return Inertia::render('Finance/Packages'); })->name('packages');
        Route::get('/payments', function () { return Inertia::render('Finance/Payments'); })->name('payments');
        Route::get('/vouchers', function () { return Inertia::render('Finance/Vouchers'); })->name('vouchers');
        Route::get('/expenses', function () { return Inertia::render('Finance/Expenses'); })->name('expenses');
    });

    Route::prefix('communication')->name('communication.')->group(function () {
        Route::get('/campaigns', function () { return Inertia::render('Communication/Campaigns'); })->name('campaigns');
        Route::get('/sms', function () { return Inertia::render('Communication/Sms'); })->name('sms');
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
