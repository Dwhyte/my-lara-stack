<script setup lang="ts">
import { loginCarouselGradients, loginCarouselImages } from '@/features/auth/login-carousel'

const props = withDefaults(
  defineProps<{
    paused?: boolean
  }>(),
  {
    paused: false,
  },
)

const fadeDurationMs = 900
const intervalMs = 5500

const activeIndex = ref(0)
const incomingIndex = ref<number | null>(null)
const isTransitioning = ref(false)
const progress = ref(0)

let intervalId: ReturnType<typeof setInterval> | null = null
let animationFrameId: number | null = null

function easeInOut(progressValue: number): number {
  return progressValue < 0.5
    ? 2 * progressValue * progressValue
    : 1 - (-2 * progressValue + 2) ** 2 / 2
}

function cancelProgressAnimation(): void {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

function finishTransition(nextIndex: number): void {
  activeIndex.value = nextIndex
  incomingIndex.value = null
  isTransitioning.value = false
  progress.value = 0
}

function animateProgress(onComplete: () => void): void {
  cancelProgressAnimation()

  const startTime = performance.now()

  function frame(now: number): void {
    const elapsed = now - startTime
    const linear = Math.min(elapsed / fadeDurationMs, 1)
    progress.value = easeInOut(linear)

    if (linear < 1) {
      animationFrameId = requestAnimationFrame(frame)

      return
    }

    progress.value = 1
    animationFrameId = null
    onComplete()
  }

  animationFrameId = requestAnimationFrame(frame)
}

function startTransition(nextIndex: number): void {
  if (isTransitioning.value) {
    return
  }

  incomingIndex.value = nextIndex
  isTransitioning.value = true
  progress.value = 0

  animateProgress(() => {
    finishTransition(nextIndex)
  })
}

function scheduleCarousel(): void {
  if (intervalId) {
    clearInterval(intervalId)
  }

  if (props.paused || loginCarouselImages.length <= 1) {
    return
  }

  intervalId = setInterval(() => {
    const nextIndex = (activeIndex.value + 1) % loginCarouselImages.length
    startTransition(nextIndex)
  }, intervalMs)
}

const outgoingStyle = computed(() => ({
  opacity: 1 - progress.value,
  background: loginCarouselGradients[activeIndex.value],
}))

const incomingStyle = computed(() => ({
  opacity: progress.value,
  background: incomingIndex.value === null
    ? loginCarouselGradients[0]
    : loginCarouselGradients[incomingIndex.value],
}))

watch(
  () => props.paused,
  () => {
    scheduleCarousel()
  },
)

onMounted(() => {
  scheduleCarousel()
})

onBeforeUnmount(() => {
  cancelProgressAnimation()

  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="absolute inset-0 overflow-hidden">
    <div
      class="carousel-slide-layer"
      :style="outgoingStyle"
    >
      <img
        :src="loginCarouselImages[activeIndex]"
        alt=""
        class="carousel-slide-image"
        decoding="async"
      >
    </div>
    <div
      v-if="incomingIndex !== null"
      class="carousel-slide-layer"
      :style="incomingStyle"
    >
      <img
        :src="loginCarouselImages[incomingIndex]"
        alt=""
        class="carousel-slide-image"
        decoding="async"
      >
    </div>
  </div>
</template>

<style scoped>
.carousel-slide-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.carousel-slide-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transform: scale(1.04);
  opacity: 0.85;
}
</style>
