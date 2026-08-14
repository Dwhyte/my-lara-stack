import { usePage } from '@inertiajs/vue3';
import type { ComputedRef } from 'vue';

import type { AppHeaderMode } from '@/types/app-shell';

export function resolveAppHeaderMode(path: string): AppHeaderMode {
    if (path === '/demo/a' || path === '/demo/b') {
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
    mode: ComputedRef<AppHeaderMode>;
    stackTitle: ComputedRef<string | null>;
    showBackButton: ComputedRef<boolean>;
    backHref: ComputedRef<string>;
} {
    const page = usePage();
    const path = computed(() => page.url.split('?')[0] ?? '/');

    const mode = computed(() => resolveAppHeaderMode(path.value));

    const stackTitle = computed(() => {
        const currentPath = path.value;

        if (currentPath.startsWith('/settings/profile')) {
            return 'Profile';
        }

        if (currentPath.startsWith('/settings/security')) {
            return 'Security';
        }

        if (currentPath.startsWith('/settings/appearance')) {
            return 'Appearance';
        }

        if (currentPath.startsWith('/settings')) {
            return 'Settings';
        }

        return null;
    });

    const showBackButton = computed(() => showBackFromRoute(path.value));

    const backHref = computed(() => headerBackToForPath(path.value) ?? '/demo/a');

    return {
        mode,
        stackTitle,
        showBackButton,
        backHref,
    };
}
