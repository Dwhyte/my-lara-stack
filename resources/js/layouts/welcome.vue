<script setup lang="ts">
import PageTransition from '@/components/PageTransition.vue'
</script>

<template>
  <v-app class="min-h-dvh bg-[#0a0a0b] md:bg-[var(--auth-surface)]">
    <v-main class="min-h-dvh p-0 md:bg-[var(--auth-surface)]">
      <PageTransition>
        <slot />
      </PageTransition>
    </v-main>
  </v-app>
</template>
