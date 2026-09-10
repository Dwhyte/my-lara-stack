import { create } from 'zustand';

type DemoStore = {
    toastCount: number;
    incrementToastCount: () => void;
};

export const useDemoStore = create<DemoStore>((set) => ({
    toastCount: 0,
    incrementToastCount: () => set((state) => ({ toastCount: state.toastCount + 1 })),
}));
