<script setup lang="ts">
import { navigateTo } from '@/lib/inertia-nav';

const props = withDefaults(
  defineProps<{
    showBack?: boolean
    backTo?: string
    onBack?: (() => void) | null
  }>(),
  {
    showBack: false,
    onBack: null,
  },
)

function handleBack(): void {
  if (typeof props.onBack === 'function') {
    props.onBack()

    return
  }

  if (props.backTo) {
    navigateTo(props.backTo)

    return
  }

  window.history.back()
}
</script>

<template>
  <header class="app-mobile-header surface-chrome-header sticky top-0 z-10 pt-safe-header md:hidden">
    <div class="flex min-h-12 w-full items-center gap-2 px-4  md:px-6">
      <div
        v-if="showBack"
        class="app-mobile-header__leading flex size-12 shrink-0 items-center justify-center"
      >
        <v-btn
          icon

          variant="tonal"
          rounded="lg"
          density="comfortable"
          class="shrink-0 bg-foreground/5 -ml-1"
          aria-label="Go back"
          @click="handleBack"
        >
          <v-icon icon="lucide:arrow-left" size="24" />
        </v-btn>
      </div>

      <div class="min-w-0 flex-1" />

      <div v-if="$slots.trailing" class="flex shrink-0 items-center gap-1.5">
        <slot name="trailing" />
      </div>
    </div>
  </header>
</template>
