import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

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

export function useDemoToast() {
    return useDemoStore(
        useShallow((state) => ({
            toastCount: state.toastCount,
            incrementToastCount: state.incrementToastCount,
        })),
    );
}
