<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useInitiateGoogleOAuth, useSendMagicLink } from '@/features/auth/mutations'
import { validateLoginEmail } from '@/features/auth/schemas'

const props = withDefaults(
  defineProps<{
    mode?: 'login' | 'signup'
    name?: string
  }>(),
  {
    mode: 'login',
    name: '',
  },
)

const emit = defineEmits<{
  sent: [email: string]
}>()

const stage = ref<'form' | 'sent'>('form')
const email = ref('')
const signupName = ref(props.name)
const emailError = ref<string | null>(null)
const formError = ref<string | null>(null)

const { send, isPending: sendingMagicLink } = useSendMagicLink()
const { open: openGoogle, isPending: googleLoading } = useInitiateGoogleOAuth()

const sentEmailDisplay = computed(() => {
  const trimmed = email.value.trim()

  return trimmed !== '' ? trimmed : 'your inbox'
})

const googleLabel = computed(() => (
  props.mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'
))

const submitLabel = computed(() => (
  props.mode === 'signup' ? 'Sign up' : 'Sign in'
))

async function submitMagicLink(): Promise<void> {
  formError.value = null
  emailError.value = null

  const validation = validateLoginEmail(email.value)

  if (validation !== true) {
    emailError.value = validation

    return
  }

  try {
    await send(
      email.value.trim(),
      props.mode === 'signup' ? signupName.value.trim() || undefined : undefined,
    )
    stage.value = 'sent'
    emit('sent', email.value.trim())
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'Unable to send magic link.'
  }
}

async function resendMagicLink(): Promise<void> {
  formError.value = null

  try {
    await send(
      email.value.trim(),
      props.mode === 'signup' ? signupName.value.trim() || undefined : undefined,
    )
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'Unable to resend magic link.'
  }
}

async function startGoogleSignIn(): Promise<void> {
  formError.value = null

  try {
    await openGoogle()
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'Unable to open Google sign-in.'
  }
}

function backToForm(): void {
  stage.value = 'form'
  formError.value = null
}
</script>

<template>
  <div class="w-full font-sans">
    <template v-if="stage === 'form'">
      <v-btn
        variant="outlined"
        size="large"
        rounded="xl"
        block
        class="auth-google-btn"
        :loading="googleLoading"
        :disabled="sendingMagicLink"
        @click="startGoogleSignIn"
      >
        <Icon icon="flat-color-icons:google" class="mr-2 size-5 shrink-0" />
        {{ googleLabel }}
      </v-btn>

      <p class="my-5 text-center text-sm text-[var(--auth-muted)]">
        or
      </p>

      <v-text-field
        v-if="mode === 'signup'"
        v-model="signupName"
        label="Name"
        variant="solo-filled"
        flat
        rounded="xl"
        hide-details
        class="auth-field mb-3"
        autocomplete="name"
      />

      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        variant="solo-filled"
        flat
        rounded="xl"
        :error-messages="emailError ? [emailError] : []"
        class="auth-field"
        autocomplete="email"
        @keyup.enter="submitMagicLink"
      />

      <v-alert
        v-if="formError"
        type="error"
        variant="tonal"
        density="compact"
        rounded="xl"
        class="mt-4"
      >
        {{ formError }}
      </v-alert>

      <v-btn
        variant="flat"
        size="large"
        rounded="xl"
        block
        class="auth-cta-btn mt-5"
        :loading="sendingMagicLink"
        :disabled="googleLoading"
        @click="submitMagicLink"
      >
        {{ submitLabel }}
      </v-btn>
    </template>

    <template v-else>
      <h2 class="font-display text-2xl font-extrabold tracking-tight text-[var(--auth-ink)]">
        Check your email
      </h2>
      <p class="mt-3 text-[15px] leading-relaxed text-[var(--auth-muted)]">
        We sent a magic link to
        <span class="font-medium text-[var(--auth-ink)]">{{ sentEmailDisplay }}</span>.
        It expires in 15 minutes.
      </p>

      <v-alert
        v-if="formError"
        type="error"
        variant="tonal"
        density="compact"
        rounded="xl"
        class="mt-4"
      >
        {{ formError }}
      </v-alert>

      <v-btn
        variant="text"
        class="auth-text-link mt-4 px-0"
        @click="backToForm"
      >
        Use a different email
      </v-btn>

      <v-btn
        variant="flat"
        size="large"
        rounded="xl"
        block
        class="auth-cta-btn mt-4"
        :loading="sendingMagicLink"
        @click="resendMagicLink"
      >
        Resend link
      </v-btn>
    </template>
  </div>
</template>
