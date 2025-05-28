<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    /**
     * Display a listing of the packages.
     */
    public function index()
    {
        // Fetch packages if needed, for now just render the page
        return Inertia::render('Finance/Packages');
    }
}
