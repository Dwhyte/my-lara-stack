<script setup lang="ts">
import { Form, Link } from '@inertiajs/vue3';
</script>

<template>
    <UCard class="w-full max-w-md">
        <template #header>
            <h1 class="text-highlighted text-2xl font-bold tracking-tight">Sign up</h1>
        </template>

        <Form action="/register" method="post" v-slot="{ errors, processing }" class="flex flex-col gap-4">
            <UFormField label="Name" :error="errors.name">
                <UInput name="name" autocomplete="name" />
            </UFormField>
            <UFormField label="Email" :error="errors.email">
                <UInput name="email" type="email" autocomplete="email" />
            </UFormField>
            <UFormField label="Password" :error="errors.password">
                <UInput name="password" type="password" autocomplete="new-password" />
            </UFormField>
            <UFormField label="Confirm password" :error="errors.password_confirmation">
                <UInput name="password_confirmation" type="password" autocomplete="new-password" />
            </UFormField>
            <UButton type="submit" block size="lg" :loading="processing">Create account</UButton>
        </Form>

        <p class="text-muted mt-6 text-center text-sm">
            Already have an account?
            <Link href="/login" class="text-primary font-medium hover:underline">Sign in</Link>
        </p>
    </UCard>
</template>
