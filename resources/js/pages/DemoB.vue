<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Head } from '@inertiajs/vue3';
import { demoA } from '@/actions/App/Http/Controllers/DemoController';
import type { AppSharedProps } from '@/types/inertia';

const { message, timestamp } = defineProps<
    AppSharedProps & {
        message?: string;
        timestamp?: string;
    }
>();
</script>

<template>
    <Head title="Demo B" />

    <div class="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
        <div class="w-full max-w-2xl space-y-8">
            <div class="space-y-3 text-center">
                <div
                    class="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400"
                >
                    <Icon icon="lucide:circle-check" class="size-3.5" />
                    Navigation successful
                </div>
                <h1 class="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Demo Page B</h1>
                <p class="text-lg text-zinc-500 dark:text-zinc-400">You navigated here from Demo A via Inertia.js client-side routing.</p>
            </div>

            <v-card class="border border-zinc-200 dark:border-zinc-800" rounded="lg">
                <v-card-item>
                    <v-card-title class="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                        <Icon icon="lucide:server" class="size-5" />
                        Server-Provided Props
                    </v-card-title>
                    <v-card-subtitle class="text-zinc-500 dark:text-zinc-400">
                        Data passed from the Laravel controller to this Vue component
                    </v-card-subtitle>
                </v-card-item>

                <v-card-text class="space-y-4">
                    <div class="space-y-2 rounded-lg bg-zinc-100 p-4 font-mono text-sm dark:bg-zinc-900">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-zinc-400">message:</span>
                            <span class="text-zinc-900 dark:text-zinc-50"> "{{ message ?? 'Hello from Laravel!' }}" </span>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-zinc-400">timestamp:</span>
                            <span class="text-zinc-600 dark:text-zinc-300">
                                {{ timestamp ?? '—' }}
                            </span>
                        </div>
                    </div>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">
                        These values were assigned as props by the Laravel controller using
                        <code class="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800"> Inertia::render() </code>
                        .
                    </p>
                </v-card-text>

                <v-divider class="border-zinc-200 dark:border-zinc-800" />

                <v-card-actions class="px-4 pt-6 pb-4">
                    <v-btn block color="primary" size="large" variant="outlined" :to="demoA.url()" class="group">
                        <Icon icon="lucide:arrow-left" class="mr-1 size-4 transition-transform group-hover:-translate-x-1" />
                        Back to Demo Page A
                    </v-btn>
                </v-card-actions>
            </v-card>

            <p class="text-center text-xs text-zinc-400 dark:text-zinc-600">Navigate back — Inertia preserves scroll position and handles history</p>
        </div>
    </div>
</template>
