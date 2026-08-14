<?php

use Inertia\Testing\AssertableInertia as Assert;

test('demo page A is displayed', function () {
    $appName = config('app.name');

    $this->get(route('demo.a'))
        ->assertOk()
        ->assertSee('<title data-inertia="title">Demo A - '.$appName.'</title>', false)
        ->assertInertia(fn (Assert $page) => $page
            ->component('DemoA')
            ->has('head'));
});

test('demo page B is displayed with server props', function () {
    $appName = config('app.name');

    $this->get(route('demo.b'))
        ->assertOk()
        ->assertSee('<title data-inertia="title">Demo B - '.$appName.'</title>', false)
        ->assertInertia(fn (Assert $page) => $page
            ->component('DemoB')
            ->where('message', 'Hello from Laravel!')
            ->has('timestamp')
            ->has('head'));
});
