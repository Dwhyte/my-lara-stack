import { usePage } from '@inertiajs/react';

import AuthBackgroundCarousel from '@/components/auth/AuthBackgroundCarousel';
import type { AppSharedProps } from '@/types/inertia';

export default function AuthBrandPanel() {
    const { props } = usePage<AppSharedProps>();

    return (
        <div className="relative hidden h-full min-h-[520px] overflow-hidden rounded-[28px] md:block">
            <AuthBackgroundCarousel />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-10">
                <p className="font-mono text-xs tracking-[0.14em] text-white/70 uppercase">{props.name}</p>
                <h2 className="font-display mt-3 max-w-sm text-3xl leading-tight font-extrabold text-white">
                    Laravel + Inertia + React
                </h2>
                <p className="mt-3 max-w-sm text-sm text-white/80">
                    A production-ready starter kit with shadcn/ui, design tokens, and an app shell.
                </p>
            </div>
        </div>
    );
}
