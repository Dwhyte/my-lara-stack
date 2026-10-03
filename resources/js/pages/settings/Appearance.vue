<script setup lang="ts">
import type { Appearance } from '@/lib/appearanceResolve';
import { useAppearance } from '@/composables/useAppearance';

const options: Array<{ value: Appearance; label: string }> = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
];

const appearanceState = useAppearance();
</script>

<template>
    <div class="mx-auto max-w-lg p-4 md:p-8">
        <h1 class="text-highlighted text-2xl font-semibold">Appearance</h1>
        <p class="text-muted mt-1">Choose how this app looks on this device.</p>

        <UCard class="mt-6">
            <div class="flex gap-2">
                <UButton
                    v-for="option in options"
                    :key="option.value"
                    type="button"
                    class="flex-1"
                    :variant="appearanceState.appearance === option.value ? 'solid' : 'outline'"
                    @click="appearanceState.updateAppearance(option.value)"
                >
                    {{ option.label }}
                </UButton>
            </div>
        </UCard>
    </div>
</template>
