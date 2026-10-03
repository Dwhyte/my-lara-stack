<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="flex min-h-svh items-center justify-center p-4 md:p-8">
        <UCard class="w-full max-w-lg">
            <template #header>
                <div class="flex flex-col gap-1">
                    <h1 class="text-highlighted text-xl font-semibold">Dashboard</h1>
                    <p class="text-muted text-sm">You are signed in. Demo pages live next to this starter shell.</p>
                </div>
            </template>

            <UButton as-child>
                <Link href="/demo/a">Go to Demo A</Link>
            </UButton>
        </UCard>
    </div>
</template>
