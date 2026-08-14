export type AppNavItem = {
    label: string;
    to: string;
    icon: string;
};

export type AppBottomNavTabId = 'demoA' | 'demoB' | 'settings';

export type AppSideNavKey = 'demoA' | 'demoB' | 'settings' | 'account';

export type AppBottomNavTab = AppNavItem & {
    id: AppBottomNavTabId;
};

export type AppSideNavItem = {
    key: AppSideNavKey;
    label: string;
    to?: string;
    icon: string;
    action?: string;
};

export const appBottomNavTabs: AppBottomNavTab[] = [
    { id: 'demoA', label: 'Demo A', to: '/demo/a', icon: 'lucide:layers' },
    { id: 'demoB', label: 'Demo B', to: '/demo/b', icon: 'lucide:zap' },
    { id: 'settings', label: 'Settings', to: '/settings', icon: 'lucide:settings' },
];

export const appSideNavItems: AppSideNavItem[] = [
    { key: 'demoA', label: 'Demo A', to: '/demo/a', icon: 'lucide:layers' },
    { key: 'demoB', label: 'Demo B', to: '/demo/b', icon: 'lucide:zap' },
];

export const appNavItems: AppNavItem[] = [
    { label: 'Demo A', to: '/demo/a', icon: 'lucide:layers' },
    { label: 'Demo B', to: '/demo/b', icon: 'lucide:zap' },
    { label: 'Settings', to: '/settings', icon: 'lucide:settings' },
];

export function resolveAppSideNavKey(path: string): AppSideNavKey | null {
    const normalized = path.replace(/\/+$/, '') || '/';

    if (normalized === '/settings' || normalized.startsWith('/settings/')) {
        return 'settings';
    }

    if (normalized === '/demo/a') {
        return 'demoA';
    }

    if (normalized === '/demo/b') {
        return 'demoB';
    }

    return null;
}

export function resolveAppBottomNavTab(path: string): AppBottomNavTabId | null {
    const sideNavKey = resolveAppSideNavKey(path);

    if (sideNavKey === 'settings') {
        return 'settings';
    }

    if (sideNavKey === 'demoA' || sideNavKey === 'demoB') {
        return sideNavKey;
    }

    return null;
}
