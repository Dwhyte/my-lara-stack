// import AuthLayout from '@/layouts/AuthLayout.vue';
// import SettingsLayout from '@/layouts/settings/Layout.vue';
import { initializeTheme } from '@/composables/useAppearance';
import AppLayout from '@/layouts/AppLayout.vue';
import { createInertiaApp, http } from '@inertiajs/vue3';
import { createHead } from '@unhead/vue';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createPinia } from 'pinia';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import VuetifyInertiaLink from 'vuetify-inertia-link';
import toastify from './plugins/toastify';
import vuetify from './plugins/vuetify';

import '../css/app.css';
import '../css/toastify-overrides.css';
import '../css/vuetify-overrides.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

http.onRequest((config) => {
    config.headers ??= {};
    config.headers['Accept'] = 'application/json';

    return config;
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
    layout: (name) => {
        switch (true) {
            case name === 'Welcome':
                return AppLayout;
            // case name.startsWith('auth/'):
            //     return AuthLayout;
            // case name.startsWith('settings/'):
            //     return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(createPinia())
            .use(createHead())
            .use(toastify)
            .use(vuetify)
            .use(VuetifyInertiaLink)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
