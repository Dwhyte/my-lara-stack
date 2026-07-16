<?php

it('renders demo pages without javascript errors', function () {
    $pages = visit(['/demo/a', '/demo/b']);

    $pages->assertNoJavaScriptErrors();
});

it('can navigate from demo a to demo b in the browser', function () {
    $page = visit('/demo/a');

    $page->assertSee('Demo Page A')
        ->assertNoJavaScriptErrors()
        ->click('Go to Demo Page B')
        ->assertSee('Demo Page B')
        ->assertSee('Hello from Laravel!')
        ->assertNoJavaScriptErrors();
});
