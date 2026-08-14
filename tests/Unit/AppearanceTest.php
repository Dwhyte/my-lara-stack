<?php

use App\Support\Appearance;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

test('appearance resolves dark from cookie', function () {
    $request = Request::create('/demo/a', 'GET');
    $request->cookies->set(Appearance::COOKIE, 'dark');

    expect(Appearance::resolved($request))->toBe('dark');
});

test('appearance resolves light from system preference when cookie is system', function () {
    $request = Request::create('/demo/a', 'GET', server: [
        'HTTP_SEC_CH_PREFERS_COLOR_SCHEME' => 'dark',
    ]);
    $request->cookies->set(Appearance::COOKIE, 'system');

    expect(Appearance::resolved($request))->toBe('dark');
});

test('appearance forces light on login route for auth shell', function () {
    $request = Request::create('/login', 'GET');
    $request->setRouteResolver(fn () => new Route('GET', '/login', fn () => null)->name('login'));
    $request->cookies->set(Appearance::COOKIE, 'dark');

    expect(Appearance::resolved($request))->toBe('light');
});
