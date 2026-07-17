<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, Bell, Layers, Zap } from '@lucide/vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { toast } from 'vue-sonner';

import { demoB } from '@/actions/App/Http/Controllers/DemoController';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAppearance } from '@/composables/use-appearance';
import AppLayout from '@/layouts/AppLayout.vue';
import { useDemoStore } from '@/stores/use-demo-store';

defineOptions({
    layout: AppLayout,
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
        label: 'shadcn-vue',
        description: 'Accessible, composable UI components built on Reka UI',
    },
    {
        label: 'Lucide',
        description: 'Consistent icon set for Vue components',
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

const showToast = () => {
    demoStore.incrementToastCount();
    toast.success('Toast fired from Sonner', {
        description: `This is toast #${toastCount.value}, counted in a Pinia store.`,
    });
};
</script>

<template>
    <Head title="Demo A" />

    <div class="flex min-h-screen items-center justify-center bg-background p-8">
        <div class="w-full max-w-2xl space-y-8">
            <div class="space-y-3 text-center">
                <div class="flex items-center justify-center gap-3">
                    <Switch
                        :model-value="isDarkMode"
                        aria-label="Toggle light and dark mode"
                        @update:model-value="(enabled: boolean) => updateAppearance(enabled ? 'dark' : 'light')"
                    />
                    <span class="text-sm text-muted-foreground">Light/Dark</span>
                </div>
                <div class="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
                    <Zap class="size-3.5" />
                    Vite + Inertia + Tailwind + shadcn-vue
                </div>
                <h1 class="text-4xl font-bold tracking-tight text-foreground">Demo Page A</h1>
                <p class="text-lg text-muted-foreground">This page is rendered by Vue via Inertia.js, served by Laravel.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <Layers class="size-5" />
                        Stack Overview
                    </CardTitle>
                    <CardDescription>The technology powering this page</CardDescription>
                </CardHeader>

                <CardContent>
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
                </CardContent>

                <CardFooter class="flex-col gap-2">
                    <Button type="button" class="w-full" size="lg" variant="outline" @click="showToast">
                        <Bell class="mr-1 size-4" />
                        Show a toast
                        <span v-if="toastCount > 0" class="ml-1 text-muted-foreground"> ({{ toastCount }}) </span>
                    </Button>
                    <Button as-child class="group w-full" size="lg" variant="secondary">
                        <Link :href="demoB.url()">
                            Go to Demo Page B
                            <ArrowRight class="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            <p class="text-center text-xs text-muted-foreground">Navigation is handled client-side by Inertia.js — no full page reload</p>
        </div>
    </div>
</template>
