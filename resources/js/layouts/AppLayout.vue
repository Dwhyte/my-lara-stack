<script setup lang="ts">
import { watch } from 'vue';
import { useTheme } from 'vuetify';
import { useAppearance } from '@/composables/useAppearance';

const theme = useTheme();
const { resolvedAppearance } = useAppearance();

watch(
    resolvedAppearance,
    (mode) => {
        theme.change(mode === 'dark' ? 'dark' : 'light');
    },
    { immediate: true },
);
</script>

<template>
    <v-app>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>
