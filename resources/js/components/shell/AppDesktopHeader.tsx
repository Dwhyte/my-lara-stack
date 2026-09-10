import { usePage } from '@inertiajs/react';

import IconifyIcon from '@/components/IconifyIcon';
import { Button } from '@/components/ui/button';
import { appNavItems } from '@/constants/appNav';
import { headerBackToForPath, showBackFromRoute, showBarTitleFromRoute } from '@/hooks/use-app-header';
import { navigateTo, useRoutePath } from '@/lib/inertia-nav';
import type { AppSharedProps } from '@/types/inertia';

export default function AppDesktopHeader() {
    const { props } = usePage<AppSharedProps>();
    const path = useRoutePath();
    const appName = props.name;
    const appInitial = appName.charAt(0).toUpperCase();
    const match = appNavItems.find((item) => path === item.to || path.startsWith(`${item.to}/`));
    const navTitle = match?.label ?? appName;
    const showBack = showBackFromRoute(path);
    const showBarTitle = showBarTitleFromRoute(path);

    function handleBack(): void {
        const backTo = headerBackToForPath(path);

        if (backTo) {
            navigateTo(backTo);

            return;
        }

        window.history.back();
    }

    return (
        <header className="surface-chrome-header sticky top-0 z-20 hidden h-13 items-center md:flex">
            <div className="flex h-13 w-full items-center gap-2 px-6">
                <div className="flex shrink-0 items-center gap-2">
                    <a
                        href="/demo/a"
                        className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg no-underline"
                        aria-label={`${appName} home`}
                        onClick={(event) => {
                            event.preventDefault();
                            navigateTo('/demo/a');
                        }}
                    >
                        <span className="font-display text-sm font-extrabold">{appInitial}</span>
                    </a>

                    {showBack ? (
                        <Button
                            variant="secondary"
                            size="icon"
                            className="bg-foreground/5 shrink-0"
                            aria-label="Go back"
                            onClick={handleBack}
                        >
                            <IconifyIcon name="lucide:arrow-left" className="size-[18px]" />
                        </Button>
                    ) : null}
                </div>

                <div className="flex min-w-0 flex-1 items-center overflow-hidden">
                    {showBarTitle ? (
                        <nav aria-label="Current page" className="flex min-w-0 shrink items-center gap-1.5 text-sm">
                            <span className="text-foreground truncate font-medium">{navTitle}</span>
                        </nav>
                    ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <Button variant="ghost" size="icon" className="bg-muted/40 shrink-0" aria-label="Notifications">
                        <IconifyIcon name="lucide:bell" className="size-[18px]" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-muted/40 shrink-0" aria-label="Account" asChild>
                        <a href="/settings/profile" onClick={(event) => {
                            event.preventDefault();
                            navigateTo('/settings/profile');
                        }}>
                            <IconifyIcon name="lucide:user-round" className="size-[18px]" />
                        </a>
                    </Button>
                </div>
            </div>
        </header>
    );
}
