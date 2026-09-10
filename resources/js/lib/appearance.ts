import type { Appearance, ResolvedAppearance } from '@/lib/appearanceResolve';
import { APPEARANCE_COOKIE, readSystemPrefersDarkFromWindow } from '@/lib/appearanceResolve';

export function applyAppearanceToDocument(resolved: ResolvedAppearance): void {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.classList.toggle('dark', resolved === 'dark');
    document.documentElement.style.colorScheme = resolved;
}

export function persistAppearance(value: Appearance): ResolvedAppearance {
    const resolved =
        value === 'system' ? (readSystemPrefersDarkFromWindow() ? 'dark' : 'light') : value;

    if (typeof window !== 'undefined') {
        window.localStorage.setItem(APPEARANCE_COOKIE, value);
        document.cookie = `${APPEARANCE_COOKIE}=${value};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
    }

    applyAppearanceToDocument(resolved);

    return resolved;
}
