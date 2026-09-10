import type { ReactNode } from 'react';

import AuthBrandPanel from '@/components/auth/AuthBrandPanel';
import PageTransition from '@/components/PageTransition';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="auth-layout bg-[var(--auth-surface)] min-h-dvh">
            <div className="grid min-h-dvh md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
                <AuthBrandPanel />
                <div className="flex min-h-dvh items-center justify-center bg-[var(--auth-surface)]">
                    <PageTransition>{children}</PageTransition>
                </div>
            </div>
            <footer className="pointer-events-none absolute inset-x-0 bottom-0 hidden px-10 pb-6 text-xs text-[var(--auth-muted)] md:block">
                <div className="flex gap-4">
                    <span>Privacy</span>
                    <span>Terms</span>
                </div>
            </footer>
        </div>
    );
}
