import type { User } from '@/types/auth';

export type AppSharedProps = {
    errors: Record<string, string>;
    name: string;
    resolvedAppearance: 'light' | 'dark';
    auth: {
        user: User | null;
    };
    sidebarOpen: boolean;
};
