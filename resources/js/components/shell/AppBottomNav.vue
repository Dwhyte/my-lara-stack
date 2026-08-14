<script setup lang="ts">
import { useDisplay } from 'vuetify';

import { appBottomNavTabs } from '@/constants/appNav';
import { useRoute } from '@/lib/inertia-nav';

const emit = defineEmits<{
    openNav: [];
    openCreate: [];
}>();

const display = useDisplay();
const route = useRoute();

const isDesktop = computed(() => display.mdAndUp.value);

type BottomNavAction =
    | { id: string; label: string; icon: string; kind: 'menu' | 'create' }
    | { id: string; label: string; icon: string; kind: 'link'; to: string };

const actions = computed<BottomNavAction[]>(() => [
    { id: 'menu', label: 'Menu', icon: 'lucide:menu', kind: 'menu' },
    ...appBottomNavTabs.map((tab) => ({
        id: tab.id,
        label: tab.label,
        icon: tab.icon,
        kind: 'link' as const,
        to: tab.to,
    })),
    { id: 'new', label: 'New', icon: 'lucide:plus', kind: 'create' },
]);

function actionClasses(): string {
    return 'bottom-nav-action shrink-0 text-white';
}

function onAction(action: BottomNavAction): void {
    if (action.kind === 'menu') {
        emit('openNav');

        return;
    }

    if (action.kind === 'create') {
        emit('openCreate');
    }
}
</script>

<template>
    <nav
        class="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4"
        style="bottom: max(22px, env(safe-area-inset-bottom, 0px))"
        aria-label="Quick actions"
    >
        <div
            data-floating-container-inner
            class="bottom-nav-pill pointer-events-auto relative rounded-[14px] bg-shell-ink px-1.5 py-1.5 shadow-[0_12px_30px_rgba(10,10,11,0.45)]"
        >
            <div class="bottom-nav-layer flex items-center gap-1.5 opacity-100">
                <template v-for="action in actions" :key="action.id">
                    <v-tooltip
                        location="top"
                        content-class="app-ui-tooltip"
                        :disabled="!isDesktop"
                        :open-delay="350"
                    >
                        <template #activator="{ props: tooltipProps }">
                            <v-btn
                                v-if="action.kind === 'link'"
                                v-bind="tooltipProps"
                                :to="action.to"
                                :icon="action.icon"
                                variant="text"
                                rounded="lg"
                                density="comfortable"
                                :class="actionClasses()"
                                :aria-label="action.label"
                                :active="route.path === action.to || route.path.startsWith(`${action.to}/`)"
                            />

                            <v-btn
                                v-else
                                v-bind="tooltipProps"
                                :icon="action.icon"
                                variant="text"
                                rounded="lg"
                                density="comfortable"
                                :class="actionClasses()"
                                :aria-label="action.label"
                                @click="onAction(action)"
                            />
                        </template>
                        {{ action.label }}
                    </v-tooltip>
                </template>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.bottom-nav-action.v-btn {
    width: 40px;
    height: 40px;
}

.bottom-nav-action :deep(.v-icon) {
    font-size: 20px;
}

@media (prefers-reduced-motion: reduce) {
    .bottom-nav-pill,
    .bottom-nav-layer {
        transition: none;
    }
}
</style>
