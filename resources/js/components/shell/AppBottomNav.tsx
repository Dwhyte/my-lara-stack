import { Link } from '@inertiajs/react';

import { toast } from 'sonner';
import IconifyIcon from '@/components/IconifyIcon';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { appBottomNavTabs } from '@/constants/appNav';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useRoutePath } from '@/lib/inertia-nav';
import { cn } from '@/lib/utils';

type BottomNavAction =
    | { id: string; label: string; icon: string; kind: 'menu' | 'create' }
    | { id: string; label: string; icon: string; kind: 'link' | 'home'; to: string };

type AppBottomNavProps = {
    onOpenNav: () => void;
};

export default function AppBottomNav({ onOpenNav }: AppBottomNavProps) {
    const { isDesktop } = useBreakpoint();
    const path = useRoutePath();

    const firstAction: BottomNavAction = isDesktop
        ? {
              id: 'home',
              label: 'Home',
              icon: 'lucide:house',
              kind: 'home',
              to: '/demo/a',
          }
        : { id: 'menu', label: 'Menu', icon: 'lucide:menu', kind: 'menu' };

    const actions: BottomNavAction[] = [
        firstAction,
        ...appBottomNavTabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            icon: tab.icon,
            kind: 'link' as const,
            to: tab.to,
        })),
        { id: 'new', label: 'New', icon: 'lucide:plus', kind: 'create' },
    ];

    function isLinkAction(action: BottomNavAction): action is Extract<BottomNavAction, { kind: 'link' | 'home' }> {
        return action.kind === 'link' || action.kind === 'home';
    }

    function isActive(to: string): boolean {
        return path === to || path.startsWith(`${to}/`);
    }

    function onAction(action: BottomNavAction): void {
        if (action.kind === 'menu') {
            onOpenNav();

            return;
        }

        if (action.kind === 'create') {
            toast.info('Create action is a starter-kit placeholder.');
        }
    }

    return (
        <nav
            className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4"
            style={{ bottom: 'max(22px, env(safe-area-inset-bottom, 0px))' }}
            aria-label="Quick actions"
        >
            <div
                data-floating-container-inner
                className="bg-shell-ink pointer-events-auto relative flex min-h-[52px] items-center rounded-[14px] px-1.5 py-1.5 shadow-[0_12px_30px_rgba(10,10,11,0.45)]"
            >
                <div className="flex items-center gap-1.5">
                    {actions.map((action) => {
                        const button = isLinkAction(action) ? (
                            <Link
                                href={action.to}
                                aria-label={action.label}
                                className={cn(
                                    'flex size-10 shrink-0 items-center justify-center rounded-lg text-white',
                                    isActive(action.to) && 'bg-white/10',
                                )}
                            >
                                <IconifyIcon name={action.icon} className="size-5" />
                            </Link>
                        ) : (
                            <button
                                type="button"
                                aria-label={action.label}
                                className="flex size-10 shrink-0 items-center justify-center rounded-lg text-white"
                                onClick={() => onAction(action)}
                            >
                                <IconifyIcon name={action.icon} className="size-5" />
                            </button>
                        );

                        if (!isDesktop) {
                            return <span key={action.id}>{button}</span>;
                        }

                        return (
                            <Tooltip key={action.id} delayDuration={350}>
                                <TooltipTrigger asChild>{button}</TooltipTrigger>
                                <TooltipContent side="top">{action.label}</TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
