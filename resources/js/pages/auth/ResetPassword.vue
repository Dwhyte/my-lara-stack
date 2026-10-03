<script setup lang="ts">
import { Form } from '@inertiajs/vue3';

defineProps<{
    email?: string;
    token?: string;
}>();
</script>

<template>
    <UCard class="w-full max-w-md">
        <template #header>
            <h1 class="text-highlighted text-2xl font-bold tracking-tight">Reset password</h1>
        </template>

        <Form action="/reset-password" method="post" v-slot="{ errors, processing }" class="flex flex-col gap-4">
            <input type="hidden" name="token" :value="token" />
            <UFormField label="Email" :error="errors.email">
                <UInput name="email" type="email" autocomplete="email" :default-value="email" />
            </UFormField>
            <UFormField label="Password" :error="errors.password">
                <UInput name="password" type="password" autocomplete="new-password" />
            </UFormField>
            <UFormField label="Confirm password" :error="errors.password_confirmation">
                <UInput name="password_confirmation" type="password" autocomplete="new-password" />
            </UFormField>
            <UButton type="submit" block size="lg" :loading="processing">Reset password</UButton>
        </Form>
    </UCard>
</template>
