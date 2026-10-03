<script setup lang="ts">
import { Form, Link } from '@inertiajs/vue3';

defineProps<{
    canResetPassword?: boolean;
    canRegister?: boolean;
    status?: string;
}>();
</script>

<template>
    <UCard class="w-full max-w-md">
        <template #header>
            <h1 class="text-highlighted text-2xl font-bold tracking-tight">Sign in</h1>
        </template>

        <p v-if="status" class="text-success mb-4 text-sm">{{ status }}</p>

        <Form action="/login" method="post" v-slot="{ errors, processing }" class="flex flex-col gap-4">
            <UFormField label="Email" :error="errors.email">
                <UInput name="email" type="email" autocomplete="email" />
            </UFormField>
            <UFormField label="Password" :error="errors.password">
                <UInput name="password" type="password" autocomplete="current-password" />
            </UFormField>
            <UButton type="submit" block size="lg" :loading="processing">Sign in</UButton>
        </Form>

        <p v-if="canResetPassword" class="text-muted mt-4 text-center text-sm">
            <Link href="/forgot-password" class="text-primary hover:underline">Forgot password?</Link>
        </p>

        <p v-if="canRegister" class="text-muted mt-6 text-center text-sm">
            No account?
            <Link href="/register" class="text-primary font-medium hover:underline">Sign up</Link>
        </p>
    </UCard>
</template>
