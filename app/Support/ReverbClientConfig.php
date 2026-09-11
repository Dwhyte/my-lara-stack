<?php

declare(strict_types=1);

namespace App\Support;

final class ReverbClientConfig
{
    /**
     * @return array{key: string, host: string, port: int, scheme: string}
     */
    public static function forBrowser(): array
    {
        $connection = config('broadcasting.connections.reverb');
        $client = is_array($connection['client'] ?? null) ? $connection['client'] : [];
        $options = is_array($connection['options'] ?? null) ? $connection['options'] : [];

        $host = $client['host'] ?? null;

        if (! is_string($host) || $host === '') {
            $host = $options['host'] ?? parse_url((string) config('app.url'), PHP_URL_HOST);
        }

        return [
            'key' => (string) ($connection['key'] ?? ''),
            'host' => (string) ($host ?: 'localhost'),
            'port' => (int) ($client['port'] ?? $options['port'] ?? 8080),
            'scheme' => (string) ($client['scheme'] ?? $options['scheme'] ?? 'https'),
        ];
    }
}
