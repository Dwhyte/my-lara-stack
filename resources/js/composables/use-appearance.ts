import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';

import {
    APPEARANCE_COOKIE,
    parseAppearance,
    readSystemPrefersDarkFromWindow
    
    
} from '@/lib/appearanceResolve';
import type {Appearance, ResolvedAppearance} from '@/lib/appearanceResolve';
import { applyAppearanceToDocument } from '@/plugins/vuetify';

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

    return parseAppearance(localStorage.getItem(APPEARANCE_COOKIE));
};

const handleSystemThemeChange = (): void => {
    const currentAppearance = getStoredAppearance() ?? 'system';
    const resolved = currentAppearance === 'system'
        ? (readSystemPrefersDarkFromWindow() ? 'dark' : 'light')
        : currentAppearance;

    applyAppearanceToDocument(resolved);
};

export function useAppearance() {
    const theme = useTheme();
    const appearance = ref<Appearance>(getStoredAppearance() ?? 'system');

    const resolvedAppearance = computed<ResolvedAppearance>(() => {
        if (appearance.value === 'system') {
            return readSystemPrefersDarkFromWindow() ? 'dark' : 'light';
        }

        return appearance.value;
    });

    const updateAppearance = (value: Appearance): void => {
        appearance.value = value;
        localStorage.setItem(APPEARANCE_COOKIE, value);
        setCookie(APPEARANCE_COOKIE, value);

        const resolved = value === 'system'
            ? (readSystemPrefersDarkFromWindow() ? 'dark' : 'light')
            : value;

        applyAppearanceToDocument(resolved);
        theme.change(resolved);
    };

    if (typeof window !== 'undefined') {
        mediaQuery()?.addEventListener('change', handleSystemThemeChange);
    }

    return {
        appearance,
        resolvedAppearance,
        updateAppearance,
    };
}
