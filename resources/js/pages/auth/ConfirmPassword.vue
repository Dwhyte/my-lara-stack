<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
</script>

<template>
    <UCard class="w-full max-w-md">
        <template #header>
            <h1 class="text-highlighted text-2xl font-bold tracking-tight">Confirm password</h1>
            <p class="text-muted text-sm">Please confirm your password to continue.</p>
        </template>

        <Form action="/user/confirm-password" method="post" v-slot="{ errors, processing }" class="flex flex-col gap-4">
            <UFormField label="Password" :error="errors.password">
                <UInput name="password" type="password" autocomplete="current-password" />
            </UFormField>
            <UButton type="submit" block size="lg" :loading="processing">Confirm</UButton>
        </Form>
    </UCard>
</template>
