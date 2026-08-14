<script setup lang="ts">
import { Icon as IconifyIconComponent } from '@iconify/vue'

const props = defineProps<{
  name: string
  class?: string
}>()
</script>

<template>
  <IconifyIconComponent :icon="props.name" :class="props.class" />
</template>
