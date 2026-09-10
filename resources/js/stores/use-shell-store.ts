import { create } from 'zustand';

type ShellStore = {
    userMenuOpen: boolean;
    drawerOpen: boolean;
    setUserMenuOpen: (open: boolean) => void;
    setDrawerOpen: (open: boolean) => void;
};

export const useShellStore = create<ShellStore>((set) => ({
    userMenuOpen: false,
    drawerOpen: false,
    setUserMenuOpen: (open) => set({ userMenuOpen: open }),
    setDrawerOpen: (open) => set({ drawerOpen: open }),
}));
