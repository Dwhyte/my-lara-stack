<script setup lang="ts">
import { Form } from '@inertiajs/vue3';

defineProps<{
    canManageTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
}>();
</script>

<template>
    <div class="mx-auto max-w-lg p-4 md:p-8">
        <h1 class="text-highlighted text-2xl font-semibold">Security</h1>
        <p class="text-muted mt-1">Update your password and two-factor settings.</p>

        <UCard class="mt-6">
            <Form action="/settings/password" method="put" v-slot="{ errors, processing }" class="flex flex-col gap-4">
                <UFormField label="Current password" :error="errors.current_password">
                    <UInput name="current_password" type="password" autocomplete="current-password" />
                </UFormField>
                <UFormField label="New password" :error="errors.password">
                    <UInput name="password" type="password" autocomplete="new-password" />
                </UFormField>
                <UFormField label="Confirm password" :error="errors.password_confirmation">
                    <UInput name="password_confirmation" type="password" autocomplete="new-password" />
                </UFormField>
                <UButton type="submit" :loading="processing">Update password</UButton>
            </Form>
        </UCard>

        <UCard v-if="canManageTwoFactor" class="mt-6">
            <h2 class="text-highlighted text-sm font-semibold">Two-factor authentication</h2>
            <p class="text-muted mt-1 text-sm">
                {{ twoFactorEnabled ? 'Two-factor authentication is enabled.' : 'Two-factor authentication is off.' }}
            </p>
        </UCard>
    </div>
</template>
