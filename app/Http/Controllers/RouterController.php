<?php

namespace App\Http\Controllers;

use App\Models\Router;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\MikrotikService;
use Illuminate\Support\Facades\Log;

class RouterController extends Controller
{
    protected $mikrotikService;

    public function __construct(MikrotikService $mikrotikService)
    {
        $this->mikrotikService = $mikrotikService;
    }

    public function index()
    {
        $routers = Router::all();
        return Inertia::render('routers/index', [
            'routers' => $routers
        ]);
    }

    public function create()
    {
        return Inertia::render('routers/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'host' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'port' => 'required|integer|min:1|max:65535',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $router = Router::create($validated);

        return redirect()->route('routers.show', $router)
            ->with('success', 'Router created successfully.');
    }

    public function show(Router $router)
    {
        try {
            $statusData = $this->mikrotikService->getStatus($router);
            $systemResource = $statusData['resources'] ?? [];
            $interfaces = $statusData['interfaces'] ?? [];
            $connected = $statusData['connected'] ?? false;
        } catch (\Exception $e) {
            // Handle potential exceptions from getStatus as well
            $systemResource = [];
            $interfaces = [];
            $connected = false;
        }

        return Inertia::render('routers/show', [
            'router' => $router,
            'systemResource' => $systemResource,
            'interfaces' => $interfaces,
            'connected' => $connected,
        ]);
    }

    public function edit(Router $router)
    {
        return Inertia::render('routers/edit', [
            'router' => $router
        ]);
    }

    public function update(Request $request, Router $router)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'host' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => 'nullable|string|max:255',
            'port' => 'required|integer|min:1|max:65535',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        // Only update password if a new one is provided
        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $router->update($validated);

        return redirect()->route('routers.show', $router)
            ->with('success', 'Router updated successfully.');
    }

    public function destroy(Router $router)
    {
        $router->delete();

        return redirect()->route('routers.index')
            ->with('success', 'Router deleted successfully.');
    }

    // Additional Router Functionality Methods

    public function status(Router $router)
    {
        try {
            $status = $this->mikrotikService->getStatus($router);
            return response()->json($status);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function interfaces(Router $router)
    {
        try {
            $interfaces = $this->mikrotikService->getInterfaces($router);
            return response()->json($interfaces);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function resources(Router $router)
    {
        try {
            $resources = $this->mikrotikService->getSystemResource($router);
            return response()->json($resources);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function restart(Router $router)
    {
        try {
            $this->mikrotikService->restart($router);
            return response()->json(['message' => 'Router restart initiated']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function createBackup(Router $router)
    {
        try {
            $backup = $this->mikrotikService->createBackup($router);
            return response()->json([
                'message' => 'Backup created successfully',
                'backup' => $backup
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function createBridge(Request $request, Router $router)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $this->mikrotikService->createBridge($router, $request->name);

        return back()->with('success', 'Bridge created successfully.');
    }

    public function enableBridge(Request $request, Router $router, string $name)
    {
        $this->mikrotikService->enableBridge($router, $name);

        return back()->with('success', 'Bridge enabled successfully.');
    }

    public function disableBridge(Request $request, Router $router, string $name)
    {
        $this->mikrotikService->disableBridge($router, $name);

        return back()->with('success', 'Bridge disabled successfully.');
    }

    public function removeBridge(Request $request, Router $router, string $name)
    {
        $this->mikrotikService->removeBridge($router, $name);

        return back()->with('success', 'Bridge removed successfully.');
    }

    public function addIpAddress(Request $request, Router $router)
    {
        $validated = $request->validate([
            'address' => 'required|string',
            'interface' => 'required|string',
        ]);

        try {
            $this->mikrotikService->addIpAddress($router, $validated['address'], $validated['interface']);
            return redirect()->back()->with('success', 'IP address added successfully.');
        } catch (\Exception $e) {
            Log::error("Failed to add IP address on router {$router->id}: " . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to add IP address.');
        }
    }
} 