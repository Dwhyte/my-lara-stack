import type { ReactNode } from 'react';

import { useRoutePath } from '@/lib/inertia-nav';

export default function PageTransition({ children }: { children: ReactNode }) {
    const path = useRoutePath();

    return (
        <div key={path} className="page-enter-active min-h-full">
            {children}
        </div>
    );
}
