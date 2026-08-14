<script setup lang="ts">
import { useDisplay } from 'vuetify'
import MobileBottomSheet from '@/components/adaptive/MobileBottomSheet.vue'
import type {BottomSheetSize} from '@/components/adaptive/MobileBottomSheet.vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    size?: BottomSheetSize
  }>(),
  {
    title: '',
    size: null,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const display = useDisplay()

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const dialogMaxWidth = computed(() => {
  if (props.size === 'large') {
    return 560
  }

  return 480
})

const isFullscreenDialog = computed(() => props.size === 'full')

const mobileBodyClass = computed(() =>
  props.size === null
    ? 'flex flex-col overflow-hidden px-4 pb-6 pt-2'
    : 'flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-6 pt-2',
)
</script>

<template>
  <MobileBottomSheet
    v-if="!display.mdAndUp.value"
    v-model:open="open"
    :size="size"
  >
    <div :class="mobileBodyClass">
      <p v-if="title" class="mb-4 font-display text-lg font-extrabold">
        {{ title }}
      </p>
      <slot />
    </div>
  </MobileBottomSheet>

  <VDialog
    v-else
    v-model="open"
    :fullscreen="isFullscreenDialog"
    :max-width="isFullscreenDialog ? undefined : dialogMaxWidth"
    scrollable
  >
    <VCard :class="isFullscreenDialog ? 'h-full rounded-none' : ''">
      <VCardTitle v-if="title" class="font-display text-lg font-extrabold">
        {{ title }}
      </VCardTitle>
      <VCardText :class="isFullscreenDialog ? 'h-full' : ''">
        <slot />
      </VCardText>
    </VCard>
  </VDialog>
</template>
