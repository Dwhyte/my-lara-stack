<?php

declare(strict_types=1);

namespace App\Support;

use Illuminate\Http\Request;

final class Appearance
{
    public const COOKIE = 'appearance';

    public static function resolved(Request $request): string
    {
        if (self::usesLightAuthShell($request)) {
            return 'light';
        }

        $appearance = self::parseAppearance($request->cookie(self::COOKIE));
        $systemPrefersDark = strtolower((string) $request->header('Sec-CH-Prefers-Color-Scheme')) === 'dark';

        if ($appearance === 'system') {
            return $systemPrefersDark ? 'dark' : 'light';
        }

        return $appearance;
    }

    private static function parseAppearance(?string $value): string
    {
        if (in_array($value, ['light', 'dark', 'system'], true)) {
            return $value;
        }

        return 'system';
    }

    private static function usesLightAuthShell(Request $request): bool
    {
        $routeName = $request->route()?->getName() ?? '';

        if (in_array($routeName, [
            'home',
            'login',
            'register',
            'password.request',
            'password.reset',
            'verification.notice',
            'two-factor.login',
            'password.confirm',
        ], true)) {
            return true;
        }

        return str_starts_with($routeName, 'password.')
            || str_starts_with($routeName, 'verification.');
    }
}
