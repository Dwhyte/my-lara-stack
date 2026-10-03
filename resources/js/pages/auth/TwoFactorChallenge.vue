<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { ref } from 'vue';

const recovery = ref(false);
</script>

<template>
    <UCard class="w-full max-w-md">
        <template #header>
            <h1 class="text-highlighted text-2xl font-bold tracking-tight">Two-factor challenge</h1>
            <p class="text-muted text-sm">
                {{ recovery ? 'Enter a recovery code.' : 'Enter the code from your authenticator app.' }}
            </p>
        </template>

        <Form action="/two-factor-challenge" method="post" v-slot="{ errors, processing }" class="flex flex-col gap-4">
            <UFormField v-if="recovery" label="Recovery code" :error="errors.recovery_code ?? errors.code">
                <UInput name="recovery_code" autocomplete="one-time-code" />
            </UFormField>
            <UFormField v-else label="Authentication code" :error="errors.code">
                <UInput name="code" inputmode="numeric" autocomplete="one-time-code" />
            </UFormField>
            <UButton type="submit" block size="lg" :loading="processing">Continue</UButton>
        </Form>

        <UButton variant="link" class="mt-4 px-0" @click="recovery = !recovery">
            {{ recovery ? 'Use an authentication code' : 'Use a recovery code' }}
        </UButton>
    </UCard>
</template>
