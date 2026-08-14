<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';

import IconifyIcon from '@/components/IconifyIcon.vue';
import { headerBackToForPath, showBackFromRoute, showBarTitleFromRoute } from '@/composables/useAppHeader';
import { appNavItems } from '@/constants/appNav';
import { navigateTo, useRoute } from '@/lib/inertia-nav';
import type { AppSharedProps } from '@/types/inertia';

const page = usePage<AppSharedProps>();
const route = useRoute();

const appName = computed(() => page.props.name);
const appInitial = computed(() => appName.value.charAt(0).toUpperCase());

const navTitle = computed(() => {
    const match = appNavItems.find((item) => route.path === item.to || route.path.startsWith(`${item.to}/`));

    return match?.label ?? appName.value;
});

const showBack = computed(() => showBackFromRoute(route.path));

const showBarTitle = computed(() => showBarTitleFromRoute(route.path));

function handleBack(): void {
    const backTo = headerBackToForPath(route.path);

    if (backTo) {
        navigateTo(backTo);

        return;
    }

    window.history.back();
}
</script>

<template>
    <v-app-bar
        flat
        density="compact"
        order="2"
        color="white"
        class="surface-chrome-header app-desktop-header"
        elevation="0"
    >
        <div class="flex h-13 w-full items-center gap-2 px-6">
            <div class="flex shrink-0 items-center gap-2">
                <a
                    href="/demo/a"
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground no-underline"
                    :aria-label="`${appName} home`"
                    @click.prevent="navigateTo('/demo/a')"
                >
                    <span class="font-display text-sm font-extrabold">{{ appInitial }}</span>
                </a>

                <v-btn
                    v-if="showBack"
                    icon
                    variant="tonal"
                    rounded="lg"
                    density="comfortable"
                    class="shrink-0 bg-foreground/5"
                    aria-label="Go back"
                    @click="handleBack"
                >
                    <v-icon icon="lucide:arrow-left" size="18" />
                </v-btn>
            </div>

            <div class="flex min-w-0 flex-1 items-center overflow-hidden">
                <nav
                    v-if="showBarTitle"
                    aria-label="Current page"
                    class="flex min-w-0 shrink items-center gap-1.5 text-sm"
                >
                    <span class="truncate font-medium text-foreground">{{ navTitle }}</span>
                </nav>
            </div>

            <div class="flex shrink-0 items-center gap-2">
                <v-btn
                    icon
                    variant="text"
                    rounded="lg"
                    density="comfortable"
                    class="shrink-0 bg-muted/40"
                    aria-label="Notifications"
                >
                    <IconifyIcon name="lucide:bell" class="size-[18px]" />
                </v-btn>

                <v-btn
                    icon
                    variant="text"
                    rounded="lg"
                    density="comfortable"
                    class="shrink-0 bg-muted/40"
                    aria-label="Account"
                    to="/settings/profile"
                >
                    <IconifyIcon name="lucide:user-round" class="size-[18px]" />
                </v-btn>
            </div>
        </div>
    </v-app-bar>
</template>

<style scoped>
.h-13 {
    height: 3.25rem;
}
</style>
