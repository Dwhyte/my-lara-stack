import { useRoutePath } from '@/lib/inertia-nav';
import type { AppHeaderMode } from '@/types/app-shell';

export function resolveAppHeaderMode(path: string): AppHeaderMode {
    if (path === '/demo/a' || path === '/demo/b' || path === '/dashboard') {
        return 'hub';
    }

    if (path.startsWith('/settings')) {
        return 'stack';
    }

    return 'bar';
}

function pathDepthFor(path: string): number {
    return path.split('/').filter(Boolean).length;
}

export function showBackFromRoute(path: string): boolean {
    const mode = resolveAppHeaderMode(path);

    if (mode === 'stack') {
        return true;
    }

    return mode === 'bar' && pathDepthFor(path) > 1;
}

export function showBarTitleFromRoute(path: string): boolean {
    return resolveAppHeaderMode(path) !== 'hub';
}

export function headerBackToForPath(path: string): string | null {
    if (path.startsWith('/settings/') && path !== '/settings/profile') {
        return '/settings/profile';
    }

    return null;
}

export function useAppHeader(): {
    mode: AppHeaderMode;
    stackTitle: string | null;
    showBackButton: boolean;
    backHref: string;
} {
    const path = useRoutePath();

    let stackTitle: string | null = null;

    if (path.startsWith('/settings/profile')) {
        stackTitle = 'Profile';
    } else if (path.startsWith('/settings/security')) {
        stackTitle = 'Security';
    } else if (path.startsWith('/settings/appearance')) {
        stackTitle = 'Appearance';
    } else if (path.startsWith('/settings')) {
        stackTitle = 'Settings';
    }

    return {
        mode: resolveAppHeaderMode(path),
        stackTitle,
        showBackButton: showBackFromRoute(path),
        backHref: headerBackToForPath(path) ?? '/demo/a',
    };
}
