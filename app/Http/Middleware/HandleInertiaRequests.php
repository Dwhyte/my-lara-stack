<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Support\Appearance;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * @var string
     */
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $resolvedAppearance = Appearance::resolved($request);

        view()->share('resolvedAppearance', $resolvedAppearance);

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'resolvedAppearance' => $resolvedAppearance,
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
