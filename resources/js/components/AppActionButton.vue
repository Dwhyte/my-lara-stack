<script setup lang="ts">
withDefaults(
    defineProps<{
        disabled?: boolean;
        loading?: boolean;
        type?: 'button' | 'submit';
        block?: boolean;
        href?: string;
        prependIcon?: string;
        appendIcon?: string;
    }>(),
    {
        type: 'button',
        block: true,
    },
);
</script>

<template>
    <v-btn
        variant="flat"
        size="large"
        rounded="xl"
        :block="block"
        class="auth-cta-btn"
        :type="href ? undefined : type"
        :tag="href ? 'a' : 'button'"
        :href="href"
        :disabled="disabled"
        :loading="loading"
        :prepend-icon="prependIcon"
        :append-icon="appendIcon"
    >
        <slot />
    </v-btn>
</template>
