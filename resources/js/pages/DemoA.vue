<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { demoB } from '@/actions/App/Http/Controllers/DemoController';
import { useAppearance } from '@/composables/use-appearance';
import { useSnackbar } from '@/composables/useSnackbar';
import { useDemoStore } from '@/stores/use-demo-store';
import type { AppSharedProps } from '@/types/inertia';

type DemoAProps = AppSharedProps;

defineProps<DemoAProps>();

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
        label: 'Vue 3',
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
        label: 'Vuetify 4',
        description: 'Material Design components with Vouch token styling',
    },
    {
        label: 'Iconify',
        description: 'Consistent icon set via Lucide collection',
    },
    {
        label: 'Pinia',
        description: 'Client-only UI state that does not belong on the server',
    },
] as const;

const { resolvedAppearance, updateAppearance } = useAppearance();
const isDarkMode = computed(() => resolvedAppearance.value === 'dark');

const demoStore = useDemoStore();
const { toastCount } = storeToRefs(demoStore);
const { showSnackbar } = useSnackbar();

const showToast = (): void => {
    demoStore.incrementToastCount();
    showSnackbar(`Toast #${toastCount.value} from the Vuetify snackbar pattern.`, 'success');
};
</script>

<template>
    <div class="flex min-h-full items-center justify-center p-4 md:p-8">
        <div class="w-full max-w-2xl space-y-8">
            <div class="space-y-3 text-center">
                <div class="flex items-center justify-center gap-3">
                    <v-switch
                        :model-value="isDarkMode"
                        hide-details
                        density="compact"
                        color="primary"
                        aria-label="Toggle light and dark mode"
                        @update:model-value="(enabled: boolean | null) => updateAppearance(enabled ? 'dark' : 'light')"
                    />
                    <span class="text-sm text-muted-foreground">Light/Dark</span>
                </div>
                <div
                    class="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-1.5 text-sm font-medium text-foreground"
                >
                    <v-icon icon="lucide:zap" size="14" />
                    Vite + Inertia + Tailwind + Vuetify
                </div>
                <h1 class="font-display text-4xl font-bold tracking-tight text-foreground">Demo Page A</h1>
                <p class="text-lg text-muted-foreground">
                    This page is rendered by Vue via Inertia.js, served by Laravel.
                </p>
            </div>

            <v-card class="surface-raised">
                <v-card-title class="flex items-center gap-2 pt-6 text-lg font-semibold">
                    <v-icon icon="lucide:layers" size="20" />
                    Stack Overview
                </v-card-title>
                <v-card-subtitle class="pb-2">The technology powering this page</v-card-subtitle>

                <v-card-text>
                    <ul class="flex flex-col gap-3">
                        <li v-for="item in stackItems" :key="item.label" class="flex items-start gap-3">
                            <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <span class="size-2 rounded-lg bg-foreground" />
                            </span>
                            <span class="text-sm text-muted-foreground">
                                <strong class="text-foreground">{{ item.label }}</strong>
                                — {{ item.description }}
                            </span>
                        </li>
                    </ul>
                </v-card-text>

                <v-card-actions class="flex-col gap-2 px-4 pb-6">
                    <v-btn
                        variant="outlined"
                        rounded="lg"
                        size="large"
                        block
                        class="shadow-brand"
                        @click="showToast"
                    >
                        <v-icon icon="lucide:bell" start size="18" />
                        Show a snackbar
                        <span v-if="toastCount > 0" class="ml-1 text-muted-foreground">({{ toastCount }})</span>
                    </v-btn>
                    <v-btn
                        :to="demoB.url()"
                        color="primary"
                        rounded="lg"
                        size="large"
                        block
                        class="shadow-brand"
                    >
                        Go to Demo Page B
                        <v-icon icon="lucide:arrow-right" end size="18" />
                    </v-btn>
                </v-card-actions>
            </v-card>

            <p class="text-center text-xs text-muted-foreground">
                Navigation is handled client-side by Inertia.js — no full page reload
            </p>
        </div>
    </div>
</template>
