<script setup lang="ts">
import { navigateTo } from '@/lib/inertia-nav'
</script>

<template>
  <div class="relative min-h-dvh w-full bg-[#0a0a0b]">
    <div
      class="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)]"
    >
      <v-btn
        block
        variant="flat"
        height="50"
        class="welcome-get-started !rounded-[14px] !bg-[#f2f2f2] !text-[17px] !font-semibold !tracking-tight !text-black shadow-none"
        @click="navigateTo('/onboarding/name')"
      >
        Sign up
      </v-btn>

      <v-btn
        variant="text"
        class="welcome-sign-in mt-6 !min-w-0 !px-0 !text-[15px] !font-normal !tracking-tight !text-white normal-case"
        @click="navigateTo('/login')"
      >
        Already have an account?
      </v-btn>
    </div>
  </div>
</template>
