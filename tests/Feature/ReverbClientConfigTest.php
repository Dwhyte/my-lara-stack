<?php

declare(strict_types=1);

use App\Support\ReverbClientConfig;

test('browser reverb config uses the client host not the publish host', function () {
    config([
        'app.url' => 'https://my-lara-stack.test',
        'broadcasting.connections.reverb.key' => 'laravel-herd',
        'broadcasting.connections.reverb.options' => [
            'host' => '127.0.0.1',
            'port' => 8080,
            'scheme' => 'http',
        ],
        'broadcasting.connections.reverb.client' => [
            'host' => 'reverb.herd.test',
            'port' => 443,
            'scheme' => 'https',
        ],
    ]);

    expect(ReverbClientConfig::forBrowser())->toMatchArray([
        'key' => 'laravel-herd',
        'host' => 'reverb.herd.test',
        'port' => 443,
        'scheme' => 'https',
    ]);
});

test('browser reverb config falls back to server options when client host is empty', function () {
    config([
        'app.url' => 'https://my-lara-stack.test',
        'broadcasting.connections.reverb.key' => 'laravel-herd',
        'broadcasting.connections.reverb.options' => [
            'host' => '127.0.0.1',
            'port' => 8080,
            'scheme' => 'http',
        ],
        'broadcasting.connections.reverb.client' => [
            'host' => '',
            'port' => 8080,
            'scheme' => 'http',
        ],
    ]);

    expect(ReverbClientConfig::forBrowser())->toMatchArray([
        'key' => 'laravel-herd',
        'host' => '127.0.0.1',
        'port' => 8080,
        'scheme' => 'http',
    ]);
});
