<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

import type { AppSharedProps } from '@/types/inertia';

defineEmits<{
    close: [];
}>();

const page = usePage<AppSharedProps>();
const userName = computed(() => page.props.auth.user?.name ?? 'Account');

function logout(): void {
    router.post('/logout');
}
</script>

<template>
    <div class="flex flex-col gap-4 p-6">
        <div>
            <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">Signed in as</p>
            <p class="mt-1 text-lg font-semibold text-foreground">{{ userName }}</p>
        </div>

        <v-list density="compact" nav class="rounded-lg border border-border bg-card">
            <v-list-item link to="/settings/profile" @click="$emit('close')">
                <template #prepend>
                    <v-icon icon="lucide:user" size="18" />
                </template>
                <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/settings/security" @click="$emit('close')">
                <template #prepend>
                    <v-icon icon="lucide:shield" size="18" />
                </template>
                <v-list-item-title>Security</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/settings/appearance" @click="$emit('close')">
                <template #prepend>
                    <v-icon icon="lucide:sun-moon" size="18" />
                </template>
                <v-list-item-title>Appearance</v-list-item-title>
            </v-list-item>
        </v-list>

        <v-btn variant="outlined" rounded="lg" block @click="logout">
            Log out
        </v-btn>

        <p v-if="!page.props.auth.user" class="text-sm text-muted-foreground">
            <Link href="/login" class="text-primary hover:underline" @click="$emit('close')">
                Sign in
            </Link>
            to access account settings.
        </p>
    </div>
</template>
