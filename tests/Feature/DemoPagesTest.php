<?php

use Inertia\Testing\AssertableInertia as Assert;

test('demo page A is displayed', function () {
    $this->get(route('demo.a'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('DemoA'));
});

test('demo page B is displayed with server props', function () {
    $this->get(route('demo.b'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('DemoB')
            ->where('message', 'Hello from Laravel!')
            ->has('timestamp'));
});
