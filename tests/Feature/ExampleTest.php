<?php

test('home redirects to the demo page', function () {
    $response = $this->get(route('home'));

    $response->assertRedirect(route('demo.a'));
});