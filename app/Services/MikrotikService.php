<?php

namespace App\Services;

use App\Models\Router;
use RouterOS\Client;
use RouterOS\Config;
use RouterOS\Query;
use Illuminate\Support\Facades\Log;

class MikrotikService
{
    protected function connect(Router $router)
    {
        $config = new Config([
            'host' => $router->host,
            'user' => $router->username,
            'pass' => $router->password,
            'port' => $router->port,
            'timeout' => 5, // Add a timeout for the connection attempt
            'attempts' => 1, // Only try connecting once
            'delay' => 1, // Short delay between attempts (though only one attempt here)
        ]);

        return new Client($config);
    }

    public function getSystemResource(Router $router)
    {
        $client = $this->connect($router);
        $query = new Query('/system/resource/print');
        return $client->query($query)->read();
    }

    public function getInterfaces(Router $router)
    {
        $client = $this->connect($router);
        $query = new Query('/interface/print');
        return $client->query($query)->read();
    }

    public function getStatus(Router $router)
    {
        $connected = false;
        $resources = [];
        $interfaces = [];
        $last_check = now();

        try {
            $client = $this->connect($router);
            // Sending a simple command to check connection, e.g., get system info
            $query = new Query('/system/resource/print');
            $resources = $client->query($query)->read();

            $query = new Query('/interface/print');
            $interfaces = $client->query($query)->read();

            $connected = true;

        } catch (\Exception $e) {
            Log::error("Mikrotik connection failed for router {$router->id}: " . $e->getMessage());
            // Connection failed, router is considered offline
            $connected = false;
        }

        return [
            'resources' => $resources,
            'interfaces' => $interfaces,
            'connected' => $connected,
            'last_check' => $last_check,
        ];
    }

    public function restart(Router $router)
    {
        $client = $this->connect($router);
        $query = new Query('/system/reboot');
        return $client->query($query)->read();
    }

    public function createBackup(Router $router)
    {
        $client = $this->connect($router);
        
        // Create backup
        $query = new Query('/system/backup/save');
        $query->equal('name', 'backup-' . date('Y-m-d-H-i-s'));
        $client->query($query)->read();

        // Get list of backups
        $query = new Query('/system/backup/print');
        $backups = $client->query($query)->read();

        return $backups;
    }
} 