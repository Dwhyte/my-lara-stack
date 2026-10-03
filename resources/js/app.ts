import '../css/app.css';

import './echo';

import { createInertiaApp } from '@inertiajs/vue3';
import ui from '@nuxt/ui/vue-plugin';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h, type Component } from 'vue';

import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { applyAppearanceToDocument } from '@/lib/appearance';
import type { AppSharedProps } from '@/types/inertia';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pageModules = import.meta.glob<DefineComponent>('./pages/**/*.vue');

function resolveLayout(name: string): Component {
    if (name.startsWith('auth/')) {
        return AuthLayout;
    }

    if (name.startsWith('Demo') || name.startsWith('settings/') || name === 'Dashboard') {
        return AppLayout;
    }

    return DefaultLayout;
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const page = await resolvePageComponent(`./pages/${name}.vue`, pageModules);

        page.default.layout = page.default.layout ?? resolveLayout(name);

        return page;
    },
    setup({ el, App, props, plugin }) {
        const resolvedAppearance =
            (props.initialPage.props as unknown as AppSharedProps).resolvedAppearance ?? 'light';

        applyAppearanceToDocument(resolvedAppearance);

        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ui)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
