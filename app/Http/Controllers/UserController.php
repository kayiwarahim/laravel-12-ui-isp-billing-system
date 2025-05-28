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

    // Add other methods (create, store, show, edit, update, destroy) later if needed
}
