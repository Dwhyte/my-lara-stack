import { useEffect  } from 'react';
import type {ReactNode} from 'react';

import MobileBottomSheet from '@/components/adaptive/MobileBottomSheet';
import PageTransition from '@/components/PageTransition';
import AppBottomNav from '@/components/shell/AppBottomNav';
import AppDesktopHeader from '@/components/shell/AppDesktopHeader';
import AppSidebarDrawer from '@/components/shell/AppSidebarDrawer';
import UserMenuSheet from '@/components/shell/UserMenuSheet';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useRoutePath } from '@/lib/inertia-nav';
import { useShellStore } from '@/stores/use-shell-store';

export default function AppLayout({ children }: { children: ReactNode }) {
    const path = useRoutePath();
    const { isDesktop } = useBreakpoint();
    const drawerOpen = useShellStore((state) => state.drawerOpen);
    const setDrawerOpen = useShellStore((state) => state.setDrawerOpen);
    const userMenuOpen = useShellStore((state) => state.userMenuOpen);
    const setUserMenuOpen = useShellStore((state) => state.setUserMenuOpen);

    useEffect(() => {
        document.querySelector('.app-main-canvas')?.scrollTo({ top: 0 });

        if (!isDesktop) {
            setDrawerOpen(false);
        } else {
            setDrawerOpen(true);
        }
    }, [path, isDesktop, setDrawerOpen]);

    return (
        <TooltipProvider delayDuration={350}>
            <div className="h-svh overflow-hidden">
                {isDesktop ? <AppDesktopHeader /> : null}
                <AppSidebarDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
                <main className="app-main-canvas h-dvh overflow-auto md:pl-[52px]">
                    <div className="min-h-full pb-bottom-nav">
                        <PageTransition>{children}</PageTransition>
                    </div>
                </main>
                <AppBottomNav onOpenNav={() => setDrawerOpen(true)} />
                {!isDesktop ? (
                    <MobileBottomSheet open={userMenuOpen} onOpenChange={setUserMenuOpen}>
                        <UserMenuSheet onClose={() => setUserMenuOpen(false)} />
                    </MobileBottomSheet>
                ) : null}
                <Toaster position="bottom-center" />
            </div>
        </TooltipProvider>
    );
}
