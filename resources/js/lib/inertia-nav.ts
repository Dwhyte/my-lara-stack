import { router, usePage } from '@inertiajs/react';

function pathnameFromPageUrl(url: string): string {
    return new URL(url, 'http://local').pathname;
}

export function navigateTo(path: string, options?: { replace?: boolean }): void {
    router.visit(path, { replace: options?.replace ?? false });
}

export function useRoutePath(): string {
    const page = usePage();

    return pathnameFromPageUrl(page.url);
}
