import type { ReactNode } from 'react';

import PageTransition from '@/components/PageTransition';

export default function WelcomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-dvh bg-[#0a0a0b] md:bg-[var(--auth-surface)]">
            <PageTransition>{children}</PageTransition>
        </div>
    );
}
