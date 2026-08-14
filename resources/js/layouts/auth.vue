<script setup lang="ts">
import AuthBrandPanel from '@/components/auth/AuthBrandPanel.vue'
import PageTransition from '@/components/PageTransition.vue'
</script>

<template>
  <v-app class="auth-layout bg-[var(--auth-surface)]">
    <v-main class="min-h-dvh bg-[var(--auth-surface)]">
      <div class="grid min-h-dvh md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
        <AuthBrandPanel />
        <div class="flex min-h-dvh items-center justify-center bg-[var(--auth-surface)]">
          <PageTransition>
            <slot />
          </PageTransition>
        </div>
      </div>

      <footer class="pointer-events-none absolute inset-x-0 bottom-0 hidden px-10 pb-6 text-xs text-[var(--auth-muted)] md:block">
        <div class="flex gap-4">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </footer>
    </v-main>
  </v-app>
</template>

<style scoped>
.auth-layout {
  color: var(--auth-ink);
}
</style>
