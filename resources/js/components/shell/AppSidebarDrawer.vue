<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed, watch } from 'vue';
import { useDisplay } from 'vuetify';

import { appSideNavItems } from '@/constants/appNav';
import { navigateTo, useRoute } from '@/lib/inertia-nav';
import type { AppSharedProps } from '@/types/inertia';

const DRAWER_WIDTH = computed(() => (isDesktop.value ? 227 : 300));
const RAIL_WIDTH = 52;

const drawerOpen = defineModel<boolean>({ default: false });

const page = usePage<AppSharedProps>();
const route = useRoute();
const display = useDisplay();
const isDesktop = computed(() => display.mdAndUp.value);
const appName = computed(() => page.props.name);
const appInitial = computed(() => appName.value.charAt(0).toUpperCase() || 'A');

interface ResolvedNavChild {
    key: string;
    label: string;
    link: string;
    active: boolean;
    disabled: boolean;
    badge: string | null;
}

interface ResolvedNavItem {
    key: string;
    label: string;
    icon?: string;
    link: string;
    action: string | null;
    active: boolean;
    disabled: boolean;
    badge: string | null;
    children: ResolvedNavChild[];
}

const navItems = computed<ResolvedNavItem[]>(() => {
    const current = route.path.replace(/\/+$/, '') || '/';

    const isActive = (to: string): boolean => {
        const target = to.replace(/\/+$/, '') || '/';

        return current === target || current.startsWith(`${target}/`);
    };

    return appSideNavItems.map((item) => ({
        key: item.key,
        label: item.label,
        icon: item.icon,
        link: item.to ?? '',
        action: item.action ?? null,
        active: item.action ? false : isActive(item.to ?? ''),
        disabled: false,
        badge: null,
        children: [],
    }));
});

const settingsNavActive = computed(() => {
    const current = route.path.replace(/\/+$/, '') || '/';

    return current === '/settings' || current.startsWith('/settings/');
});

watch(
    isDesktop,
    (desktop) => {
        drawerOpen.value = desktop;
    },
    { immediate: true },
);

function navItemClass(active: boolean, disabled: boolean, extra = '', spacedOnMobile = false): string {
    const classes = ['side-nav-item', 'rounded-lg', extra].filter(Boolean);

    if (spacedOnMobile && !isDesktop.value) {
        classes.push('mb-[0.7rem]');
    }

    if (!active && !disabled) {
        classes.push('side-nav-item--inactive');
    }

    return classes.join(' ');
}

const navIconSize = computed(() => (isDesktop.value ? 18 : 22));

function navTitleClass(gap: 'gap-2' | 'gap-4' = 'gap-4'): string {
    return [
        'flex items-center',
        gap,
        isDesktop.value ? 'text-sm font-medium' : '!text-lg font-medium',
    ].join(' ');
}

function openSettings(): void {
    drawerOpen.value = false;
    navigateTo('/settings');
}
</script>

<template>
    <v-navigation-drawer
        v-model="drawerOpen"
        order="0"
        class="surface-chrome-sidebar"
        :width="DRAWER_WIDTH"
        :temporary="!isDesktop"
        :rail="isDesktop"
        :rail-width="RAIL_WIDTH"
        :expand-on-hover="isDesktop"
    >
        <template #prepend>
            <div class="flex items-center px-2 py-3">
                <Link
                    href="/demo/a"
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground no-underline"
                    :aria-label="`${appName} home`"
                >
                    <span class="font-display text-sm font-extrabold">{{ appInitial }}</span>
                </Link>
            </div>
        </template>

        <v-list nav :lines="false">
            <template v-for="item in navItems" :key="item.key">
                <v-list-group v-if="item.children.length > 0" :value="item.key">
                    <template #activator="{ props: activatorProps }">
                        <v-list-item v-bind="activatorProps" :active="item.active" :class="navItemClass(item.active, item.disabled, '', true)">
                            <v-list-item-title :class="navTitleClass('gap-2')">
                                <v-icon v-if="item.icon" :size="navIconSize">{{ item.icon }}</v-icon>
                                {{ item.label }}
                                <span v-if="item.badge" class="ms-1 text-on-surface/40">{{ item.badge }}</span>
                            </v-list-item-title>
                        </v-list-item>
                    </template>

                    <v-list-item
                        v-for="child in item.children"
                        :key="child.key"
                        link
                        :to="child.disabled ? undefined : child.link"
                        :active="child.active"
                        :disabled="child.disabled"
                        :class="navItemClass(child.active, child.disabled, 'ml-5', true)"
                    >
                        <v-list-item-title :class="navTitleClass('gap-2')">
                            {{ child.label }}
                            <span v-if="child.badge" class="ms-1 text-on-surface/40">{{ child.badge }}</span>
                        </v-list-item-title>
                    </v-list-item>
                </v-list-group>

                <v-list-item
                    v-else-if="item.action"
                    link
                    :class="navItemClass(false, item.disabled, '', true)"
                    @click="drawerOpen = false"
                >
                    <v-list-item-title :class="navTitleClass()">
                        <v-icon v-if="item.icon" :size="navIconSize">{{ item.icon }}</v-icon>
                        {{ item.label }}
                        <span v-if="item.badge" class="ms-1 text-on-surface/40">{{ item.badge }}</span>
                    </v-list-item-title>
                </v-list-item>

                <v-list-item
                    v-else
                    link
                    :to="item.disabled ? undefined : item.link"
                    :active="item.active"
                    :disabled="item.disabled"
                    :class="navItemClass(item.active, item.disabled, '', true)"
                >
                    <v-list-item-title :class="navTitleClass()">
                        <v-icon v-if="item.icon" :size="navIconSize">{{ item.icon }}</v-icon>
                        {{ item.label }}
                        <span v-if="item.badge" class="ms-1 text-on-surface/40">{{ item.badge }}</span>
                    </v-list-item-title>
                </v-list-item>
            </template>
        </v-list>

        <template #append>
            <v-divider />
            <div class="flex flex-col gap-1 pb-2">
                <v-list density="compact" nav :lines="false">
                    <v-list-item
                        v-if="isDesktop"
                        link
                        to="/settings"
                        :active="settingsNavActive"
                        :class="navItemClass(settingsNavActive, false)"
                    >
                        <v-list-item-title :class="navTitleClass()">
                            <v-icon icon="solar:settings-linear" :size="navIconSize" />
                            Settings
                        </v-list-item-title>
                    </v-list-item>

                    <v-list-item
                        v-else
                        link
                        :active="settingsNavActive"
                        :class="navItemClass(settingsNavActive, false)"
                        @click="openSettings"
                    >
                        <v-list-item-title :class="navTitleClass()">
                            <v-icon icon="solar:settings-linear" :size="navIconSize" />
                            Settings
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
        </template>
    </v-navigation-drawer>
</template>
