import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import AutoImport from 'unplugin-auto-import/vite';
import vuetify from 'vite-plugin-vuetify';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
    optimizeDeps: {
        exclude: ['vuetify'],
    },
    ssr: {
        noExternal: ['vuetify', 'vuetify-inertia-link', '@iconify/vue'],
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
        },
    },
    plugins: [
        laravel({
            input: ['resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        inertia(),
        AutoImport({
            imports: ['vue'],
            dts: 'resources/js/types/auto-imports.d.ts',
            vueTemplate: true,
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
            },
        }),
        vue(),
        tailwindcss(),
        vuetify({
            autoImport: true,
        }),
        wayfinder({
            formVariants: true,
        }),
    ],
    server: {
        watch: {
            ignored: ['**/storage/**', '**/vendor/**'],
        },
    },
});
