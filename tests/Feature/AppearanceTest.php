<?php

use Inertia\Testing\AssertableInertia as Assert;

test('demo page resolves dark appearance from cookie', function () {
    $this->withUnencryptedCookie('appearance', 'dark')
        ->get(route('demo.a'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('resolvedAppearance', 'dark')
        );
});

test('demo page respects dark system preference when appearance is system', function () {
    $this->withUnencryptedCookie('appearance', 'system')
        ->withHeaders(['Sec-CH-Prefers-Color-Scheme' => 'dark'])
        ->get(route('demo.b'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('resolvedAppearance', 'dark')
        );
});
