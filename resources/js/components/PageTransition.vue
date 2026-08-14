<script setup lang="ts">
import { usePage } from '@inertiajs/vue3'
import { resolvePageTransitionName } from '@/lib/app/page-transitions'

const page = usePage()
const transitionName = ref('page')
const previousPath = ref(
  typeof window !== 'undefined' ? pathnameFromUrl(page.url) : pathnameFromUrl(page.url),
)

const pagePath = computed(() => pathnameFromUrl(page.url))

watch(
  pagePath,
  (toPath) => {
    transitionName.value = resolvePageTransitionName(previousPath.value, toPath) ?? 'page'
    previousPath.value = toPath
  },
)

function pathnameFromUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return new URL(url).pathname
  }

  return url.split('?')[0]?.split('#')[0] ?? url
}
</script>

<template>
  <Transition :name="transitionName" mode="out-in">
    <div :key="pagePath">
      <slot />
    </div>
  </Transition>
</template>
