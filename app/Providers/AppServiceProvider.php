<?php

declare(strict_types=1);

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\DevCommands;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Laravel\Head\Facades\Head;
use Laravel\Head\HeadBuilder;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureDevCommands();
        $this->configureHead();
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }

    protected function configureDevCommands(): void
    {
        if (! $this->app->environment('local')) {
            return;
        }

        DevCommands::tabs();
        DevCommands::withTimestamps();
    }

    protected function configureHead(): void
    {
        $appName = config('app.name');

        Head::defaults(function (HeadBuilder $head) use ($appName): void {
            $head
                ->title($appName, suffix: " - {$appName}")
                ->description('Build something great.')
                ->canonical()
                ->searchableByRobots();
        });

        Head::inertiaGlobals(function (HeadBuilder $head): void {
            $head
                ->viewport('width=device-width, initial-scale=1')
                ->favicon('/favicon.ico', sizes: 'any')
                ->link('icon', '/favicon.svg', ['type' => 'image/svg+xml'])
                ->appleTouchIcon('/apple-touch-icon.png');
        });
    }
}
