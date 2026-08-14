<script setup lang="ts">
import { DrawerContent, DrawerHandle, DrawerOverlay, DrawerPortal, DrawerRoot } from 'vaul-vue'

export type BottomSheetSize = null | 'large' | 'full'

const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(
  defineProps<{
    dismissible?: boolean
    scaleBackground?: boolean
    size?: BottomSheetSize
  }>(),
  {
    dismissible: true,
    scaleBackground: false,
    size: null,
  },
)

const isFull = computed(() => props.size === 'full')
const isLarge = computed(() => props.size === 'large')

const drawerContentClass = computed(() => {
  if (isLarge.value) {
    return 'fixed inset-x-0 bottom-0 z-50 flex h-[92dvh] max-h-[100dvh] flex-col overflow-hidden rounded-t-[28px] bg-background shadow-[0_-8px_32px_rgb(26_26_34/0.1)] outline-none'
  }

  return 'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[96%] flex-col overflow-hidden rounded-t-[28px] bg-background shadow-[0_-8px_32px_rgb(26_26_34/0.1)] outline-none'
})

const drawerBodyClass = computed(() =>
  isLarge.value
    ? 'flex min-h-0 flex-1 flex-col overflow-hidden'
    : 'flex min-h-0 flex-col overflow-hidden',
)

function close(): void {
  open.value = false
}

function onFullSheetClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null

  if (target?.closest('button, a, [role="button"], input, textarea, select, label')) {
    return
  }

  close()
}

watch(open, (value) => {
  if (typeof window === 'undefined') {
    return
  }

  document.body.style.overflow = value && isFull.value ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport v-if="isFull" to="body">
    <Transition name="sheet-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex h-dvh flex-col overflow-hidden bg-background pt-safe pb-safe outline-none"
        aria-modal="true"
        role="dialog"
        @click="onFullSheetClick"
      >
        <div class="flex min-h-0 flex-1 flex-col overflow-hidden">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>

  <DrawerRoot
    v-else
    v-model:open="open"
    :dismissible="props.dismissible"
    :should-scale-background="props.scaleBackground"
    :set-background-color-on-scale="false"
  >
    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 z-50 bg-[rgb(10_10_11/0.55)]" />
      <DrawerContent :class="drawerContentClass">
        <div class="flex shrink-0 flex-col items-center px-4 pt-3 pb-2">
          <DrawerHandle
            class="mt-0! mb-0! h-1.25! w-9! rounded-full! bg-foreground/20! opacity-100!"
          />
        </div>
        <div :class="drawerBodyClass">
          <slot />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>

<style>
.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 180ms ease;
}

.sheet-fade-enter-from,
.sheet-fade-leave-to {
  opacity: 0;
}
</style>
