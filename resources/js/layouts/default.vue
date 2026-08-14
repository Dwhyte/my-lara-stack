<script setup lang="ts">
import PageTransition from '@/components/PageTransition.vue'
</script>

<template>
  <div class="min-h-dvh bg-background text-foreground">
    <PageTransition>
      <slot />
    </PageTransition>
  </div>
</template>
