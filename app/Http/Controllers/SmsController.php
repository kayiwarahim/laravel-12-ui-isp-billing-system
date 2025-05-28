<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SmsController extends Controller
{
    /**
     * Display a listing of the SMS messages.
     */
    public function index()
    {
        // Fetch SMS messages if needed, for now just render the page
        return Inertia::render('Communication/Sms');
    }
}
