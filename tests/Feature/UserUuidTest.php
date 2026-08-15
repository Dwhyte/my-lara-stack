<?php

use App\Models\User;
use Illuminate\Support\Str;

test('users are assigned uuid v7 primary keys', function () {
    $user = User::factory()->create();

    expect($user->id)
        ->toBeString()
        ->and(Str::isUuid($user->id))->toBeTrue()
        ->and($user->getIncrementing())->toBeFalse()
        ->and($user->getKeyType())->toBe('string');
});
