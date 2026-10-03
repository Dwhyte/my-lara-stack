<script setup lang="ts">
import { Form, Link } from '@inertiajs/vue3';

defineProps<{
    status?: string;
}>();
</script>

<template>
    <UCard class="w-full max-w-md">
        <template #header>
            <h1 class="text-highlighted text-2xl font-bold tracking-tight">Forgot password</h1>
            <p class="text-muted text-sm">We will email you a reset link.</p>
        </template>

        <p v-if="status" class="text-success mb-4 text-sm">{{ status }}</p>

        <Form action="/forgot-password" method="post" v-slot="{ errors, processing }" class="flex flex-col gap-4">
            <UFormField label="Email" :error="errors.email">
                <UInput name="email" type="email" autocomplete="email" />
            </UFormField>
            <UButton type="submit" block size="lg" :loading="processing">Email reset link</UButton>
        </Form>

        <p class="text-muted mt-6 text-center text-sm">
            <Link href="/login" class="text-primary hover:underline">Back to sign in</Link>
        </p>
    </UCard>
</template>
