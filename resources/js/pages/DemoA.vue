<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';
import { demoB } from '@/actions/App/Http/Controllers/DemoController';
import { useAppearance } from '@/composables/useAppearance';
import type { AppSharedProps } from '@/types/inertia';

defineProps<AppSharedProps>();

const { resolvedAppearance, updateAppearance } = useAppearance();

const isDarkMode = computed({
    get: () => resolvedAppearance.value === 'dark',
    set: (enabled: boolean) => {
        updateAppearance(enabled ? 'dark' : 'light');
    },
});

const stackItems = [
    {
        label: 'Laravel',
        description: 'Handles routing, validation, and serves the initial HTML',
    },
    {
        label: 'Inertia.js',
        description: 'Bridges Laravel controllers with Vue page components',
    },
    {
        label: 'Vue',
        description: 'Renders interactive UI on the client',
    },
    {
        label: 'Vite',
        description: 'Bundles and serves assets with HMR in development',
    },
    {
        label: 'Tailwind CSS',
        description: 'Utility-first layout and styling',
    },
    {
        label: 'Vuetify',
        description: 'Material Design components alongside Tailwind',
    },
    {
        label: 'Iconify',
        description: 'Icons via @iconify/vue and Vuetify icon set',
    },
] as const;
</script>

<template>
    <Head title="Demo A" />

    <div class="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
        <div class="w-full max-w-2xl space-y-8">
            <div class="space-y-3 text-center">
                <div class="flex justify-center">
                    <v-switch v-model="isDarkMode" color="primary" density="comfortable" hide-details inset label="Light/Dark" />
                </div>
                <div
                    class="inline-flex items-center gap-2 rounded-lg bg-zinc-900/10 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-50/10 dark:text-zinc-50"
                >
                    <Icon icon="lucide:zap" class="size-3.5" />
                    Vite + Inertia + Tailwind + Vuetify
                </div>
                <h1 class="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Demo Page A</h1>
                <p class="text-lg text-zinc-500 dark:text-zinc-400">This page is rendered by Vue via Inertia.js, served by Laravel.</p>
            </div>

            <v-card class="border border-zinc-200 dark:border-zinc-800" rounded="lg">
                <v-card-item>
                    <v-card-title class="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                        <Icon icon="lucide:layers" class="size-5" />
                        Stack Overview
                    </v-card-title>
                    <v-card-subtitle class="text-zinc-500 dark:text-zinc-400"> The technology powering this page </v-card-subtitle>
                </v-card-item>

                <v-card-text>
                    <ul class="space-y-3">
                        <li v-for="item in stackItems" :key="item.label" class="flex items-start gap-3">
                            <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                <span class="size-2 rounded-lg bg-zinc-900 dark:bg-zinc-50" />
                            </span>
                            <span class="text-sm text-zinc-700 dark:text-zinc-300">
                                <strong>{{ item.label }}</strong>
                                —
                                {{ item.description }}
                            </span>
                        </li>
                    </ul>
                </v-card-text>

                <v-divider class="border-zinc-200 dark:border-zinc-800" />

                <v-card-actions class="px-4 pt-6 pb-4">
                    <v-btn block color="primary" size="large" variant="tonal" :to="demoB.url()" class="group">
                        Go to Demo Page B
                        <Icon icon="lucide:arrow-right" class="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                    </v-btn>
                </v-card-actions>
            </v-card>

            <p class="text-center text-xs text-zinc-400 dark:text-zinc-600">Navigation is handled client-side by Inertia.js — no full page reload</p>
        </div>
    </div>
</template>
