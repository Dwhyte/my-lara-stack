import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createPinia } from 'pinia';
import { createSSRApp, h, type DefineComponent } from 'vue';
import { renderToString } from 'vue/server-renderer';
import VuetifyInertiaLink from 'vuetify-inertia-link';

import IconifyIcon from '@/components/IconifyIcon.vue';
import AppLayout from '@/layouts/app.vue';
import AuthLayout from '@/layouts/auth.vue';
import DefaultLayout from '@/layouts/default.vue';
import WelcomeLayout from '@/layouts/welcome.vue';
import { createAppVuetify } from '@/plugins/vuetify';
import type { AppSharedProps } from '@/types/inertia';

const layoutMap: Record<string, typeof AppLayout | null> = {
    Welcome: WelcomeLayout,
    Auth: AuthLayout,
};

createServer(
    (page) =>
        createInertiaApp({
            page,
            render: renderToString,
            resolve: async (name) => {
                const resolvedPage = await resolvePageComponent(
                    `./pages/${name}.vue`,
                    import.meta.glob<DefineComponent>('./pages/**/*.vue'),
                );

                const prefix = name.split('/')[0] ?? '';
                let layout: typeof AppLayout | null = layoutMap[prefix] ?? DefaultLayout;

                if (name.startsWith('Demo') || name.startsWith('settings/')) {
                    layout = AppLayout;
                }

                if (layout && resolvedPage.default) {
                    resolvedPage.default.layout = resolvedPage.default.layout ?? layout;
                }

                return resolvedPage;
            },
            setup({ App, props, plugin }) {
                const resolvedAppearance =
                    (props.initialPage.props as AppSharedProps).resolvedAppearance ?? 'light';

                return createSSRApp({ render: () => h(App, props) })
                    .use(plugin)
                    .use(createPinia())
                    .use(createAppVuetify(resolvedAppearance))
                    .use(VuetifyInertiaLink)
                    .component('IconifyIcon', IconifyIcon);
            },
        }),
    { cluster: true },
);
