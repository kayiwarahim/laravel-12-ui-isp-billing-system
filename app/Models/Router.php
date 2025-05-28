<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Router extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'host',
        'username',
        'password',
        'port',
        'is_active',
        'description',
        'location',
        'last_connection_status',
        'last_connection_time'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'last_connection_time' => 'datetime',
    ];
} 