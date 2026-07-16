import { useCallback, useMemo, useState } from 'react';
import type { Appearance, ResolvedAppearance } from '@/types';

export function updateTheme(value: Appearance): void {
    if (typeof window === 'undefined') {
        return;
    }

    if (value === 'system') {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        const systemTheme = mediaQueryList.matches ? 'dark' : 'light';

        document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
        document.documentElement.classList.toggle('dark', value === 'dark');
    }
}

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;

    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const getStoredAppearance = (): Appearance | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem('appearance') as Appearance | null;
};

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const handleSystemThemeChange = (): void => {
    const currentAppearance = getStoredAppearance();

    updateTheme(currentAppearance || 'system');
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const savedAppearance = getStoredAppearance();
    updateTheme(savedAppearance || 'system');

    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

const readStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') {
        return 'system';
    }

    return getStoredAppearance() ?? 'system';
};

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>(readStoredAppearance);

    const resolvedAppearance = useMemo<ResolvedAppearance>(() => {
        if (appearance === 'system') {
            return prefersDark() ? 'dark' : 'light';
        }

        return appearance;
    }, [appearance]);

    const updateAppearance = useCallback((value: Appearance) => {
        setAppearance(value);
        localStorage.setItem('appearance', value);
        setCookie('appearance', value);
        updateTheme(value);
    }, []);

    return {
        appearance,
        resolvedAppearance,
        updateAppearance,
    };
}
