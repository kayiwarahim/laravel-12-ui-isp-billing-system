<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the payments.
     */
    public function index()
    {
        // Fetch payments if needed, for now just render the page
        return Inertia::render('Finance/Payments');
    }
}
