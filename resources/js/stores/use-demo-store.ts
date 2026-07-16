import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

/**
 * Example client-only UI store.
 *
 * Use Zustand for ephemeral client state that does not belong on the server:
 * counters, open/closed panels, wizard steps, optimistic UI toggles, etc.
 * For server-owned data, prefer Inertia props instead of a store.
 *
 * DevTools: install the Redux DevTools browser extension. This store registers
 * as "DemoStore" with named actions (incrementToastCount, reset).
 *
 * React DevTools: prefer the domain hook `useDemoToast()` in components instead
 * of calling `useDemoStore()` directly — each direct call creates a generic
 * "BoundStore" hook entry; a named hook reads like Pinia's store in the tree.
 */
type DemoStore = {
    toastCount: number;
    incrementToastCount: () => void;
    reset: () => void;
};

export const useDemoStore = create<DemoStore>()(
    devtools(
        (set) => ({
            toastCount: 0,
            incrementToastCount: () =>
                set(
                    (state) => ({ toastCount: state.toastCount + 1 }),
                    undefined,
                    'incrementToastCount',
                ),
            reset: () => set({ toastCount: 0 }, undefined, 'reset'),
        }),
        { name: 'DemoStore', enabled: import.meta.env.DEV },
    ),
);

/** Prefer this in components — shows as "useDemoToast" in React DevTools. */
export function useDemoToast() {
    return useDemoStore(
        useShallow((state) => ({
            toastCount: state.toastCount,
            incrementToastCount: state.incrementToastCount,
        })),
    );
}
