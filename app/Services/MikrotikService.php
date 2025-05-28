<?php

namespace App\Services;

use App\Models\Router;
use RouterOS\Client;
use RouterOS\Config;
use RouterOS\Query;

class MikrotikService
{
    protected function connect(Router $router)
    {
        $config = new Config([
            'host' => $router->host,
            'user' => $router->username,
            'pass' => $router->password,
            'port' => $router->port,
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
        $client = $this->connect($router);
        $query = new Query('/system/resource/print');
        $resources = $client->query($query)->read();
        
        $query = new Query('/interface/print');
        $interfaces = $client->query($query)->read();

        return [
            'resources' => $resources,
            'interfaces' => $interfaces,
            'connected' => true,
            'last_check' => now(),
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