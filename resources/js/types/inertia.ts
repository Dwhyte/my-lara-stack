import type { User } from '@/types/auth';

export type AppSharedProps = {
    errors: Record<string, string>;
    name: string;
    auth: {
        user: User | null;
    };
    sidebarOpen: boolean;
};
