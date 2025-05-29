<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RouterController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController as UserManagementController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('routers')->name('routers.')->group(function () {
        Route::get('/', [RouterController::class, 'index'])->name('index');
        Route::get('/create', [RouterController::class, 'create'])->name('create');
        Route::post('/', [RouterController::class, 'store'])->name('store');
        Route::get('/{router}', [RouterController::class, 'show'])->name('show');
        Route::get('/{router}/edit', [RouterController::class, 'edit'])->name('edit');
        Route::put('/{router}', [RouterController::class, 'update'])->name('update');
        Route::delete('/{router}', [RouterController::class, 'destroy'])->name('destroy');
        Route::get('/{router}/status', [RouterController::class, 'status'])->name('status');
        Route::get('/{router}/interfaces', [RouterController::class, 'interfaces'])->name('interfaces');
        Route::get('/{router}/resources', [RouterController::class, 'resources'])->name('resources');
        Route::post('/{router}/restart', [RouterController::class, 'restart'])->name('restart');
        Route::post('/{router}/backup', [RouterController::class, 'backup'])->name('backup');
        Route::post('/{router}/bridges', [RouterController::class, 'createBridge'])->name('createBridge');
        Route::post('/{router}/bridges/{name}/enable', [RouterController::class, 'enableBridge'])->name('enableBridge');
        Route::post('/{router}/bridges/{name}/disable', [RouterController::class, 'disableBridge'])->name('disableBridge');
        Route::delete('/{router}/bridges/{name}', [RouterController::class, 'removeBridge'])->name('removeBridge');
        Route::post('/{router}/ip-addresses', [RouterController::class, 'addIpAddress'])->name('addIpAddress');
    });

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserManagementController::class, 'index'])->name('index');
        Route::get('/active', [UserManagementController::class, 'active'])->name('active');
    });

    Route::prefix('finance')->name('finance.')->group(function () {
        Route::get('/packages', function () { return Inertia::render('Finance/Packages'); })->name('packages');
        Route::get('/payments', function () { return Inertia::render('Finance/Payments'); })->name('payments');
        Route::get('/vouchers', function () { return Inertia::render('Finance/Vouchers'); })->name('vouchers');
    });

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
