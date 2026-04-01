import type { User } from '@/types/auth';

/**
 * Props shared on every Inertia page via `HandleInertiaRequests::share()`.
 * Declare these on page components so Vue does not treat them as extraneous DOM attributes
 * (especially when the template has multiple roots, e.g. `<Head>` + content).
 */
export type AppSharedProps = {
    errors: Record<string, string>;
    name: string;
    auth: {
        user: User | null;
    };
    sidebarOpen: boolean;
};
