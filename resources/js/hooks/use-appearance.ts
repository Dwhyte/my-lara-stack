import { useCallback, useSyncExternalStore } from 'react';

import { persistAppearance } from '@/lib/appearance';
import type { Appearance, ResolvedAppearance } from '@/lib/appearanceResolve';
import { APPEARANCE_COOKIE, parseAppearance, readSystemPrefersDarkFromWindow } from '@/lib/appearanceResolve';

let appearance: Appearance = parseAppearance(
    typeof window === 'undefined' ? undefined : window.localStorage.getItem(APPEARANCE_COOKIE),
);

const listeners = new Set<() => void>();

function emit(): void {
    for (const listener of listeners) {
        listener();
    }
}

function subscribe(listener: () => void): () => void {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

function getSnapshot(): Appearance {
    return appearance;
}

function getServerSnapshot(): Appearance {
    return 'system';
}

export function useAppearance(): {
    appearance: Appearance;
    resolvedAppearance: ResolvedAppearance;
    updateAppearance: (value: Appearance) => void;
} {
    const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const resolvedAppearance: ResolvedAppearance =
        stored === 'system' ? (readSystemPrefersDarkFromWindow() ? 'dark' : 'light') : stored;

    const updateAppearance = useCallback((value: Appearance) => {
        appearance = value;
        persistAppearance(value);
        emit();
    }, []);

    return {
        appearance: stored,
        resolvedAppearance,
        updateAppearance,
    };
}
