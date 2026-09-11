<?php

declare(strict_types=1);

test('pnpm dev starts vite reverb and queue together', function () {
    $package = json_decode(
        (string) file_get_contents(base_path('package.json')),
        true,
        flags: JSON_THROW_ON_ERROR,
    );

    expect($package['scripts']['dev'])
        ->toContain('concurrently')
        ->toContain('vite')
        ->toContain('scripts/reverb-dev.sh')
        ->toContain('scripts/queue-dev.sh');

    expect($package['scripts']['dev:herd'])
        ->toContain('concurrently')
        ->toContain('vite')
        ->toContain('scripts/queue-dev.sh')
        ->not->toContain('reverb-dev.sh');

    expect(base_path('scripts/reverb-dev.sh'))->toBeFile();
    expect(base_path('scripts/queue-dev.sh'))->toBeFile();

    $reverbDev = (string) file_get_contents(base_path('scripts/reverb-dev.sh'));

    expect($reverbDev)
        ->toContain("this app's Reverb")
        ->toContain('Herd/services/reverb')
        ->not->toContain('likely Herd Reverb on plain WS');
});

test('composer dev wraps pail around pnpm rather than artisan tabbed processes', function () {
    $composer = json_decode(
        (string) file_get_contents(base_path('composer.json')),
        true,
        flags: JSON_THROW_ON_ERROR,
    );

    $dev = implode(' ', $composer['scripts']['dev']);

    expect($dev)
        ->toContain('pnpm run dev')
        ->toContain('php artisan pail')
        ->not->toContain('php artisan dev');
});

test('app service provider does not register laravel tabbed dev commands', function () {
    $source = (string) file_get_contents(app_path('Providers/AppServiceProvider.php'));

    expect($source)->not->toContain('DevCommands');
});
