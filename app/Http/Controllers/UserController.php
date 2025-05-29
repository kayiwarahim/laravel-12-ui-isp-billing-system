<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('Users/index', [
            'users' => $users,
        ]);
    }

    public function active()
    {
        $activeUsers = User::where('active', true)->get();
        return Inertia::render('Users/active', [
            'users' => $activeUsers,
        ]);
    }

}
