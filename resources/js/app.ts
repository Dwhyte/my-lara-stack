import '../css/tailwind.css';
import '../css/main.css';
import '../css/vuetify-overrides.css';
import 'vuetify/styles';

import './echo';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createPinia } from 'pinia';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import VuetifyInertiaLink from 'vuetify-inertia-link';

import IconifyIcon from '@/components/IconifyIcon.vue';
import AppLayout from '@/layouts/app.vue';
import AuthLayout from '@/layouts/auth.vue';
import DefaultLayout from '@/layouts/default.vue';
import WelcomeLayout from '@/layouts/welcome.vue';
import { applyAppearanceToDocument, createAppVuetify } from '@/plugins/vuetify';
import type { AppSharedProps } from '@/types/inertia';

createInertiaApp({
    serverHead: true,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        );

        const layoutMap: Record<string, typeof AppLayout | null> = {
            Welcome: WelcomeLayout,
            Auth: AuthLayout,
        };

        const prefix = name.split('/')[0] ?? '';
        let layout: typeof AppLayout | null = layoutMap[prefix] ?? DefaultLayout;

        if (name.startsWith('Demo') || name.startsWith('settings/')) {
            layout = AppLayout;
        }

        if (layout && page.default) {
            page.default.layout = page.default.layout ?? layout;
        }

        return page;
    },
    setup({ el, App, props, plugin }) {
        const resolvedAppearance =
            (props.initialPage.props as unknown as AppSharedProps).resolvedAppearance ?? 'light';

        applyAppearanceToDocument(resolvedAppearance);

        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(createPinia())
            .use(createAppVuetify(resolvedAppearance))
            .use(VuetifyInertiaLink)
            .component('IconifyIcon', IconifyIcon)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
