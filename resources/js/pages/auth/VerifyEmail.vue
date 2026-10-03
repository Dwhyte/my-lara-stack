<script setup lang="ts">
import { Form, Link } from '@inertiajs/vue3';

defineProps<{
    status?: string;
}>();
</script>

<template>
    <UCard class="w-full max-w-md">
        <template #header>
            <h1 class="text-highlighted text-2xl font-bold tracking-tight">Verify email</h1>
            <p class="text-muted text-sm">Check your inbox for a verification link.</p>
        </template>

        <p v-if="status" class="text-success mb-4 text-sm">{{ status }}</p>

        <Form action="/email/verification-notification" method="post" v-slot="{ processing }">
            <UButton type="submit" block size="lg" :loading="processing">Resend verification email</UButton>
        </Form>

        <p class="text-muted mt-6 text-center text-sm">
            <Link href="/logout" method="post" as="button" class="text-primary hover:underline">Sign out</Link>
        </p>
    </UCard>
</template>
