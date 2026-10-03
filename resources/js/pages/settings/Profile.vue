<script setup lang="ts">
import { Form, usePage } from '@inertiajs/vue3';

import type { AppSharedProps } from '@/types/inertia';

defineProps<{
    mustVerifyEmail?: boolean;
    status?: string;
}>();

const page = usePage<AppSharedProps>();
const user = page.props.auth.user;
</script>

<template>
    <div class="mx-auto max-w-lg p-4 md:p-8">
        <h1 class="text-highlighted text-2xl font-semibold">Profile</h1>
        <p class="text-muted mt-1">Update your name and email address.</p>

        <p v-if="status" class="text-success mt-4 text-sm">{{ status }}</p>

        <UCard class="mt-6">
            <Form action="/settings/profile" method="patch" v-slot="{ errors, processing }" class="flex flex-col gap-4">
                <UFormField label="Name" :error="errors.name">
                    <UInput name="name" :default-value="user?.name ?? ''" />
                </UFormField>
                <UFormField label="Email" :error="errors.email">
                    <UInput name="email" type="email" :default-value="user?.email ?? ''" />
                </UFormField>
                <p v-if="mustVerifyEmail && user && !user.email_verified_at" class="text-muted text-sm">
                    Your email address is unverified.
                </p>
                <UButton type="submit" :loading="processing">Save</UButton>
            </Form>
        </UCard>

        <UCard class="mt-6">
            <h2 class="text-highlighted text-sm font-semibold">Delete account</h2>
            <p class="text-muted mt-1 text-sm">This will permanently delete your account.</p>
            <Form action="/settings/profile" method="delete" v-slot="{ errors, processing }" class="mt-4 flex flex-col gap-4">
                <UFormField label="Password" :error="errors.password">
                    <UInput name="password" type="password" autocomplete="current-password" />
                </UFormField>
                <UButton type="submit" color="error" :loading="processing">Delete account</UButton>
            </Form>
        </UCard>
    </div>
</template>
