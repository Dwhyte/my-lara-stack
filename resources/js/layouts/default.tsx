import type { ReactNode } from 'react';

import PageTransition from '@/components/PageTransition';

export default function DefaultLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-background text-foreground min-h-dvh">
            <PageTransition>{children}</PageTransition>
        </div>
    );
}
