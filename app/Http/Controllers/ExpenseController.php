<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the expenses.
     */
    public function index()
    {
        // Fetch expenses if needed, for now just render the page
        return Inertia::render('Finance/Expenses');
    }
}
