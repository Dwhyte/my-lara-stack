<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

import MobileBottomSheet from '@/components/adaptive/MobileBottomSheet.vue';
import PageTransition from '@/components/PageTransition.vue';
import AppBottomNav from '@/components/shell/AppBottomNav.vue';
import AppDesktopHeader from '@/components/shell/AppDesktopHeader.vue';
import AppSidebarDrawer from '@/components/shell/AppSidebarDrawer.vue';
import UserMenuSheet from '@/components/shell/UserMenuSheet.vue';
import { useCreateProjectSheet } from '@/composables/useCreateProjectSheet';
import { useSnackbar } from '@/composables/useSnackbar';
import { useUserMenuSheet } from '@/composables/useUserMenuSheet';
import { useRoute } from '@/lib/inertia-nav';

const drawerOpen = ref(false);
const route = useRoute();
const display = useDisplay();
const { open: userMenuOpen, closeUserMenu } = useUserMenuSheet();
const { openCreateProjectSheet } = useCreateProjectSheet();
const { message, color, visible, hideSnackbar } = useSnackbar();

const isDesktop = computed(() => display.mdAndUp.value);

watch(
    () => route.path,
    () => {
        document.querySelector('.app-main-canvas')?.scrollTo({ top: 0 });

        if (!isDesktop.value) {
            drawerOpen.value = false;
        }
    },
);

function openNav(): void {
    drawerOpen.value = true;
}
</script>

<template>
    <v-app class="app-layout h-svh overflow-hidden">
        <AppDesktopHeader v-if="isDesktop" />
        <AppSidebarDrawer v-model="drawerOpen" />
        <v-main class="app-main-canvas h-dvh overflow-auto">
            <div class="min-h-full pb-bottom-nav">
                <PageTransition>
                    <slot />
                </PageTransition>
            </div>
        </v-main>
        <AppBottomNav
            @open-nav="openNav"
            @open-create="openCreateProjectSheet"
        />

        <MobileBottomSheet v-if="!isDesktop" v-model:open="userMenuOpen">
            <UserMenuSheet @close="closeUserMenu" />
        </MobileBottomSheet>

        <v-snackbar
            v-model="visible"
            :color="color"
            location="bottom"
            rounded="lg"
            timeout="4000"
            @update:model-value="(open) => !open && hideSnackbar()"
        >
            {{ message }}
        </v-snackbar>
    </v-app>
</template>
