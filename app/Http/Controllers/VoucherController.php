<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VoucherController extends Controller
{
    /**
     * Display a listing of the vouchers.
     */
    public function index()
    {
        // Fetch vouchers if needed, for now just render the page
        return Inertia::render('Finance/Vouchers');
    }
}
