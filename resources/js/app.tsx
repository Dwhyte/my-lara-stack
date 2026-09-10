import '../css/tailwind.css';
import '../css/main.css';

import './echo';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

import AppLayout from '@/layouts/app';
import AuthLayout from '@/layouts/auth';
import DefaultLayout from '@/layouts/default';
import WelcomeLayout from '@/layouts/welcome';
import { applyAppearanceToDocument } from '@/lib/appearance';
import type { AppSharedProps } from '@/types/inertia';

type PageModule = {
    default: ComponentType & {
        layout?: (page: ReactNode) => ReactNode;
    };
};

const pageModules = import.meta.glob<PageModule>('./pages/**/*.tsx');

function resolveLayout(name: string): (page: ReactNode) => ReactNode {
    if (name.startsWith('Welcome')) {
        return (children) => <WelcomeLayout>{children}</WelcomeLayout>;
    }

    if (name.startsWith('auth/')) {
        return (children) => <AuthLayout>{children}</AuthLayout>;
    }

    if (name.startsWith('Demo') || name.startsWith('settings/') || name === 'Dashboard') {
        return (children) => <AppLayout>{children}</AppLayout>;
    }

    return (children) => <DefaultLayout>{children}</DefaultLayout>;
}

createInertiaApp({
    serverHead: true,
    resolve: async (name) => {
        const page = (await resolvePageComponent(
            `./pages/${name}.tsx`,
            pageModules,
        )) as PageModule;

        page.default.layout ??= resolveLayout(name);

        return page.default;
    },
    setup({ el, App, props }) {
        const resolvedAppearance =
            (props.initialPage.props as unknown as AppSharedProps).resolvedAppearance ?? 'light';

        applyAppearanceToDocument(resolvedAppearance);

        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
