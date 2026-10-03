import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue';

import { persistAppearance } from '@/lib/appearance';
import type { Appearance, ResolvedAppearance } from '@/lib/appearanceResolve';
import { APPEARANCE_COOKIE, parseAppearance, readSystemPrefersDarkFromWindow } from '@/lib/appearanceResolve';

const appearance = ref<Appearance>('system');

function readStoredAppearance(): Appearance {
    if (typeof window === 'undefined') {
        return 'system';
    }

    return parseAppearance(window.localStorage.getItem(APPEARANCE_COOKIE));
}

export function useAppearance(): {
    appearance: Ref<Appearance>;
    resolvedAppearance: ComputedRef<ResolvedAppearance>;
    updateAppearance: (value: Appearance) => void;
} {
    onMounted(() => {
        appearance.value = readStoredAppearance();
    });

    const resolvedAppearance = computed<ResolvedAppearance>(() => {
        const stored = appearance.value;

        if (stored === 'system') {
            return readSystemPrefersDarkFromWindow() ? 'dark' : 'light';
        }

        return stored;
    });

    function updateAppearance(value: Appearance): void {
        appearance.value = value;
        persistAppearance(value);
    }

    return {
        appearance,
        resolvedAppearance,
        updateAppearance,
    };
}
