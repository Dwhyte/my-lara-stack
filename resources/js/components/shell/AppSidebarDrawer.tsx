import { Link, usePage } from '@inertiajs/react';

import IconifyIcon from '@/components/IconifyIcon';
import { appSideNavItems } from '@/constants/appNav';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { navigateTo, useRoutePath } from '@/lib/inertia-nav';
import { cn } from '@/lib/utils';
import type { AppSharedProps } from '@/types/inertia';

type AppSidebarDrawerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function AppSidebarDrawer({ open, onOpenChange }: AppSidebarDrawerProps) {
    const { props } = usePage<AppSharedProps>();
    const path = useRoutePath();
    const { isDesktop } = useBreakpoint();
    const appName = props.name;
    const appInitial = appName.charAt(0).toUpperCase() || 'A';
    const current = path.replace(/\/+$/, '') || '/';

    function isActive(to: string): boolean {
        const target = to.replace(/\/+$/, '') || '/';

        return current === target || current.startsWith(`${target}/`);
    }

    const settingsActive = current === '/settings' || current.startsWith('/settings/');

    if (!isDesktop && !open) {
        return null;
    }

    return (
        <>
            {!isDesktop && open ? (
                <button
                    type="button"
                    className="fixed inset-0 z-30 bg-[rgb(10_10_11/0.45)]"
                    aria-label="Close navigation"
                    onClick={() => onOpenChange(false)}
                />
            ) : null}

            <aside
                className={cn(
                    'surface-chrome-sidebar group/sidebar z-30 flex flex-col overflow-hidden transition-[width] duration-200',
                    isDesktop
                        ? 'fixed inset-y-0 left-0 w-[52px] hover:w-[227px]'
                        : 'fixed inset-y-0 left-0 w-[300px]',
                )}
            >
                <div className="flex items-center px-2 py-3">
                    <Link
                        href="/demo/a"
                        className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg no-underline"
                        aria-label={`${appName} home`}
                    >
                        <span className="font-display text-sm font-extrabold">{appInitial}</span>
                    </Link>
                </div>

                <nav className="flex flex-1 flex-col gap-1 px-1.5">
                    {appSideNavItems.map((item) => {
                        const active = item.to ? isActive(item.to) : false;

                        return (
                            <Link
                                key={item.key}
                                href={item.to ?? '/demo/a'}
                                className={cn(
                                    'flex items-center gap-4 rounded-lg px-2.5 py-2 text-sm font-medium',
                                    active
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                )}
                                onClick={() => {
                                    if (!isDesktop) {
                                        onOpenChange(false);
                                    }
                                }}
                            >
                                <IconifyIcon name={item.icon} className="size-[18px] shrink-0" />
                                <span className={cn(isDesktop && 'sr-only group-hover/sidebar:not-sr-only')}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-border mt-auto border-t px-1.5 py-2">
                    <button
                        type="button"
                        className={cn(
                            'flex w-full items-center gap-4 rounded-lg px-2.5 py-2 text-sm font-medium',
                            settingsActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        )}
                        onClick={() => {
                            onOpenChange(false);
                            navigateTo('/settings');
                        }}
                    >
                        <IconifyIcon name="lucide:settings" className="size-[18px] shrink-0" />
                        <span className={cn(isDesktop && 'sr-only group-hover/sidebar:not-sr-only')}>Settings</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
