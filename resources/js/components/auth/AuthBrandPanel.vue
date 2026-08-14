<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';

import AuthBackgroundCarousel from '@/components/auth/AuthBackgroundCarousel.vue';
import type { AppSharedProps } from '@/types/inertia';

const page = usePage<AppSharedProps>();
const appName = computed(() => page.props.name);
</script>

<template>
    <div class="relative hidden h-full min-h-[520px] overflow-hidden rounded-[28px] md:block">
        <AuthBackgroundCarousel />

        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <div class="absolute inset-x-0 bottom-0 p-10">
            <p class="font-mono text-xs uppercase tracking-[0.14em] text-white/70">
                {{ appName }}
            </p>
            <h2 class="mt-3 max-w-sm font-display text-3xl font-extrabold leading-tight text-white">
                Laravel + Inertia + Vuetify
            </h2>
            <p class="mt-3 max-w-sm text-sm text-white/80">
                A production-ready starter kit with Vouch design tokens and app shell.
            </p>
        </div>
    </div>
</template>
