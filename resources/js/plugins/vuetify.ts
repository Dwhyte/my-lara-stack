import { createVuetify } from 'vuetify'
import type { ResolvedAppearance } from '@/lib/appearanceResolve'
import iconify from '@/lib/vuetify-icons'
import { readVuetifyThemeColors, vuetifyDarkThemeColors, vuetifyLightThemeColors } from '@/theme/tokens'

export function applyAppearanceToDocument(resolved: ResolvedAppearance): void {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.classList.toggle('dark', resolved === 'dark')
  document.documentElement.style.colorScheme = resolved
}

export function createAppVuetify(initialTheme: ResolvedAppearance) {
  const isServer = typeof document === 'undefined'
  const lightColors = isServer
    ? vuetifyLightThemeColors()
    : (readVuetifyThemeColors('light') ?? vuetifyLightThemeColors())
  const darkColors = isServer
    ? vuetifyDarkThemeColors()
    : (readVuetifyThemeColors('dark') ?? vuetifyDarkThemeColors())

  return createVuetify({
    ssr: true,
    defaults: {
      VBtn: {
        rounded: 'lg',
      },
      VCard: {
        rounded: 'lg',
        variant: 'flat',
      },
    },
    icons: {
      defaultSet: 'iconify',
      sets: {
        iconify,
      },
    },
    theme: {
      defaultTheme: initialTheme,
      themes: {
        light: {
          colors: lightColors,
        },
        dark: {
          colors: darkColors,
        },
      },
    },
    display: {
      mobileBreakpoint: 'md',
      thresholds: {
        xs: 0,
        sm: 600,
        md: 840,
        lg: 1145,
        xl: 1545,
        xxl: 2138,
      },
    },
  })
}
