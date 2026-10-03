<script setup lang="ts">
import { router } from '@inertiajs/vue3';

import { demoA } from '@/actions/App/Http/Controllers/DemoController';

defineProps<{
    message?: string;
    timestamp?: string;
}>();
</script>

<template>
    <div class="flex min-h-svh items-center justify-center p-4 md:p-8">
        <div class="flex w-full max-w-2xl flex-col gap-8">
            <div class="flex flex-col gap-3 text-center">
                <UBadge color="primary" variant="subtle" size="lg" class="self-center">
                    <UIcon name="i-lucide-circle-check" class="size-3.5" />
                    Navigation successful
                </UBadge>
                <h1 class="text-highlighted text-4xl font-bold tracking-tight">Demo Page B</h1>
                <p class="text-muted text-lg">You navigated here from Demo A via Inertia.js client-side routing.</p>
            </div>

            <UCard>
                <template #header>
                    <div class="flex flex-col gap-1">
                        <div class="text-highlighted flex items-center gap-2 text-lg font-semibold">
                            <UIcon name="i-lucide-server" class="size-5" />
                            Server-Provided Props
                        </div>
                        <p class="text-muted text-sm">Data passed from the Laravel controller to this Vue component</p>
                    </div>
                </template>

                <div class="flex flex-col gap-4">
                    <div class="bg-elevated flex flex-col gap-2 rounded-lg p-4 font-mono text-sm">
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-muted">message:</span>
                            <span class="text-highlighted">"{{ message ?? 'Hello from Laravel!' }}"</span>
                        </div>
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="text-muted">timestamp:</span>
                            <span class="text-muted">{{ timestamp ?? '—' }}</span>
                        </div>
                    </div>
                    <p class="text-muted text-sm">
                        These values were assigned as props by the Laravel controller using
                        <code class="bg-elevated rounded px-1.5 py-0.5 font-mono text-xs">Inertia::render()</code>.
                    </p>
                </div>

                <template #footer>
                    <UButton variant="outline" size="lg" block @click="router.visit(demoA.url())">
                        <UIcon name="i-lucide-arrow-left" class="size-[18px]" />
                        Back to Demo Page A
                    </UButton>
                </template>
            </UCard>

            <p class="text-muted text-center text-xs">Navigate back — Inertia preserves scroll position and handles history</p>
        </div>
    </div>
</template>
