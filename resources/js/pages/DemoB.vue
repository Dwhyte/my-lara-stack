<script setup lang="ts">
import { demoA } from '@/actions/App/Http/Controllers/DemoController';
import type { AppSharedProps } from '@/types/inertia';

type DemoBProps = AppSharedProps & {
    message?: string;
    timestamp?: string;
};

defineProps<DemoBProps>();
</script>

<template>
    <div class="flex min-h-full items-center justify-center p-4 md:p-8">
        <div class="w-full max-w-2xl space-y-8">
            <div class="space-y-3 text-center">
                <div
                    class="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400"
                >
                    <v-icon icon="lucide:circle-check" size="14" />
                    Navigation successful
                </div>
                <h1 class="font-display text-4xl font-bold tracking-tight text-foreground">Demo Page B</h1>
                <p class="text-lg text-muted-foreground">
                    You navigated here from Demo A via Inertia.js client-side routing.
                </p>
            </div>

            <v-card class="surface-raised">
                <v-card-title class="flex items-center gap-2 pt-6 text-lg font-semibold">
                    <v-icon icon="lucide:server" size="20" />
                    Server-Provided Props
                </v-card-title>
                <v-card-subtitle class="pb-2">
                    Data passed from the Laravel controller to this Vue component
                </v-card-subtitle>

                <v-card-text class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2 rounded-lg bg-muted p-4 font-mono text-sm">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-muted-foreground">message:</span>
                            <span class="text-foreground">"{{ message ?? 'Hello from Laravel!' }}"</span>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-muted-foreground">timestamp:</span>
                            <span class="text-muted-foreground">{{ timestamp ?? '—' }}</span>
                        </div>
                    </div>
                    <p class="text-sm text-muted-foreground">
                        These values were assigned as props by the Laravel controller using
                        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Inertia::render()</code>.
                    </p>
                </v-card-text>

                <v-card-actions class="px-4 pb-6">
                    <v-btn
                        :to="demoA.url()"
                        variant="outlined"
                        rounded="lg"
                        size="large"
                        block
                    >
                        <v-icon icon="lucide:arrow-left" start size="18" />
                        Back to Demo Page A
                    </v-btn>
                </v-card-actions>
            </v-card>

            <p class="text-center text-xs text-muted-foreground">
                Navigate back — Inertia preserves scroll position and handles history
            </p>
        </div>
    </div>
</template>
