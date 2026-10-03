<!DOCTYPE html>
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    @class(['dark' => ($resolvedAppearance ?? 'light') === 'dark'])
    style="color-scheme: {{ $resolvedAppearance ?? 'light' }}"
>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <script>
            window.__reverb = @json(\App\Support\ReverbClientConfig::forBrowser());
        </script>

        @head
        @vite(['resources/js/app.ts'])
    </head>
    <body class="font-sans antialiased">
        <div class="isolate">
            @inertia
        </div>
    </body>
</html>
