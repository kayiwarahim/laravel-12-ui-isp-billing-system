<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    /**
     * Display a listing of the campaigns.
     */
    public function index()
    {
        // Fetch campaigns if needed, for now just render the page
        return Inertia::render('Communication/Campaigns');
    }
}
