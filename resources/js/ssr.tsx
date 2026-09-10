import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ComponentType, ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

import AppLayout from '@/layouts/app';
import AuthLayout from '@/layouts/auth';
import DefaultLayout from '@/layouts/default';
import WelcomeLayout from '@/layouts/welcome';

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

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: async (name) => {
            const resolved = (await resolvePageComponent(
                `./pages/${name}.tsx`,
                pageModules,
            )) as PageModule;

            resolved.default.layout ??= resolveLayout(name);

            return resolved.default;
        },
        setup: ({ App, props }) => <App {...props} />,
    }),
);
