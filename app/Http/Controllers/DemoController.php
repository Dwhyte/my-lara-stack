<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class DemoController extends Controller
{
    /**
     * Demo page A — stack overview and navigation to Demo B.
     */
    public function demoA(): Response
    {
        return Inertia::render('DemoA');
    }

    /**
     * Demo page B — server-provided props from the controller.
     */
    public function demoB(): Response
    {
        return Inertia::render('DemoB', [
            'message' => 'Hello from Laravel!',
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
