<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, CircleCheck, Server } from '@lucide/vue';

import { demoA } from '@/actions/App/Http/Controllers/DemoController';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import type { AppSharedProps } from '@/types/inertia';

defineOptions({
    layout: AppLayout,
});

type DemoBProps = AppSharedProps & {
    message?: string;
    timestamp?: string;
};

defineProps<DemoBProps>();
</script>

<template>
    <Head title="Demo B" />

    <div class="flex min-h-screen items-center justify-center bg-background p-8">
        <div class="w-full max-w-2xl space-y-8">
            <div class="space-y-3 text-center">
                <div
                    class="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400"
                >
                    <CircleCheck class="size-3.5" />
                    Navigation successful
                </div>
                <h1 class="text-4xl font-bold tracking-tight text-foreground">Demo Page B</h1>
                <p class="text-lg text-muted-foreground">You navigated here from Demo A via Inertia.js client-side routing.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle class="flex items-center gap-2">
                        <Server class="size-5" />
                        Server-Provided Props
                    </CardTitle>
                    <CardDescription> Data passed from the Laravel controller to this Vue component </CardDescription>
                </CardHeader>

                <CardContent class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2 rounded-lg bg-muted p-4 font-mono text-sm">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-muted-foreground">message:</span>
                            <span class="text-foreground"> "{{ message ?? 'Hello from Laravel!' }}" </span>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-muted-foreground">timestamp:</span>
                            <span class="text-muted-foreground">{{ timestamp ?? '—' }}</span>
                        </div>
                    </div>
                    <p class="text-sm text-muted-foreground">
                        These values were assigned as props by the Laravel controller using
                        <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs"> Inertia::render() </code>
                        .
                    </p>
                </CardContent>

                <CardFooter>
                    <Button as-child class="group w-full" size="lg" variant="outline">
                        <Link :href="demoA.url()">
                            <ArrowLeft class="mr-1 size-4 transition-transform group-hover:-translate-x-1" />
                            Back to Demo Page A
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            <p class="text-center text-xs text-muted-foreground">Navigate back — Inertia preserves scroll position and handles history</p>
        </div>
    </div>
</template>
