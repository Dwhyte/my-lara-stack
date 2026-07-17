<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import { useAppearance } from '@/composables/use-appearance';

const { resolvedAppearance } = useAppearance();
</script>

<template>
    <div class="min-h-screen">
        <slot />
        <Toaster expand position="bottom-right" :theme="resolvedAppearance" />
    </div>
</template>
