import type { ThemeInstance } from 'vuetify'

export type ThemeMode = 'light' | 'dark'

export const VUETIFY_COLOR_CSS_VARS: Record<string, string> = {
  background: '--background',
  surface: '--card',
  'on-surface': '--foreground',
  primary: '--primary',
  'primary-soft': '--primary-soft',
  'primary-edge': '--primary-edge',
  'primary-strong': '--primary-strong',
  'primary-deep': '--primary-deep',
  secondary: '--accent-brand',
  accent: '--accent-brand',
  info: '--info',
  ink: '--ink',
  error: '--error',
  'error-soft': '--error-soft',
  'error-edge': '--error-edge',
  'error-strong': '--error-strong',
  success: '--success',
  'success-soft': '--success-soft',
  'success-edge': '--success-edge',
  'success-strong': '--success-strong',
  warning: '--warning',
  'warning-soft': '--warning-soft',
  'warning-edge': '--warning-edge',
  'warning-strong': '--warning-strong',
  seo: '--seo',
  aeo: '--aeo',
  'source-chatgpt': '--source-chatgpt',
  'source-chatgpt-soft': '--source-chatgpt-soft',
  'source-claude': '--source-claude',
  'source-claude-soft': '--source-claude-soft',
  'source-perplexity': '--source-perplexity',
  'source-perplexity-soft': '--source-perplexity-soft',
  'source-google': '--source-google',
  'source-google-soft': '--source-google-soft',
  'source-bing': '--source-bing',
  'source-bing-soft': '--source-bing-soft',
  'source-humans': '--source-humans',
  'source-humans-soft': '--source-humans-soft',
  'ramp-track': '--ramp-track',
  'ramp-200': '--ramp-200',
  'ramp-300': '--ramp-300',
  'ramp-400': '--ramp-400',
  'ramp-500': '--ramp-500',
  'health-bad': '--health-bad',
  'health-bad-soft': '--health-bad-soft',
  'health-mid': '--health-mid',
  'health-mid-soft': '--health-mid-soft',
  'health-good': '--health-good',
  'health-good-soft': '--health-good-soft',
  'category-meta': '--category-meta',
  'category-meta-soft': '--category-meta-soft',
  'category-content': '--category-content',
  'category-content-soft': '--category-content-soft',
  'category-technical': '--category-technical',
  'category-technical-soft': '--category-technical-soft',
  'category-social': '--category-social',
  'category-social-soft': '--category-social-soft',
  'category-schema': '--category-schema',
  'category-schema-soft': '--category-schema-soft',
}

export const CSS_VAR_FALLBACKS: Record<ThemeMode, Record<string, string>> = {
  light: {
    '--background': '#fcfcfd',
    '--foreground': '#1a1a22',
    '--card': '#ffffff',
    '--card-foreground': '#1a1a22',
    '--popover': '#ffffff',
    '--popover-foreground': '#1a1a22',
    '--primary': '#5b50e8',
    '--primary-foreground': '#ffffff',
    '--primary-hover': '#4a3fd6',
    '--primary-pressed': '#3e34bf',
    '--primary-soft': '#eeedfd',
    '--primary-edge': '#cfcbf6',
    '--primary-strong': '#4a3fd6',
    '--primary-deep': '#3e34bf',
    '--secondary': '#f2f2f5',
    '--secondary-foreground': '#1a1a22',
    '--muted': '#f2f2f5',
    '--muted-foreground': '#6b6b78',
    '--accent': '#f2f2f5',
    '--accent-foreground': '#1a1a22',
    '--accent-brand': '#5b50e8',
    '--destructive': '#dc4b4b',
    '--destructive-foreground': '#ffffff',
    '--border': '#e7e7ec',
    '--input': '#d9d9e0',
    '--ring': '#dcd9fb',
    '--radius': '10px',
    '--info': '#7c72e7',
    '--ink': '#1a1a22',
    '--error': '#dc4b4b',
    '--error-soft': '#fbe9e9',
    '--error-edge': '#f5d5d5',
    '--error-strong': '#c43d3d',
    '--success': '#1f9d63',
    '--success-soft': '#e4f5ec',
    '--success-edge': '#d0e8dc',
    '--success-strong': '#1f7a3d',
    '--warning': '#c8891b',
    '--warning-soft': '#fbf0db',
    '--warning-edge': '#f5e5c8',
    '--warning-strong': '#a67316',
    '--seo': '#5c74d6',
    '--aeo': '#d26e92',
    '--ramp-track': '#eeedfd',
    '--ramp-200': '#cfcbf6',
    '--ramp-300': '#a9a2ee',
    '--ramp-400': '#7c72e7',
    '--ramp-500': '#5b50e8',
    '--health-bad': '#dc4b4b',
    '--health-bad-soft': '#fbe9e9',
    '--health-mid': '#c8891b',
    '--health-mid-soft': '#fbf0db',
    '--health-good': '#1f9d63',
    '--health-good-soft': '#e4f5ec',
    '--source-chatgpt': '#d26e92',
    '--source-chatgpt-soft': '#f9e8ef',
    '--source-claude': '#cc6b3e',
    '--source-claude-soft': '#f9ede4',
    '--source-perplexity': '#1c93a8',
    '--source-perplexity-soft': '#e3f3f6',
    '--source-google': '#5c74d6',
    '--source-google-soft': '#e8ecfa',
    '--source-bing': '#a86bcb',
    '--source-bing-soft': '#f3ebf8',
    '--source-humans': '#8a8a96',
    '--source-humans-soft': '#ececef',
    '--category-meta': '#1c93a8',
    '--category-meta-soft': '#e3f3f6',
    '--category-content': '#d26e92',
    '--category-content-soft': '#f9e8ef',
    '--category-technical': '#cc6b3e',
    '--category-technical-soft': '#f9ede4',
    '--category-social': '#a86bcb',
    '--category-social-soft': '#f3ebf8',
    '--category-schema': '#5c74d6',
    '--category-schema-soft': '#e8ecfa',
    '--chart-1': '#d26e92',
    '--chart-2': '#cc6b3e',
    '--chart-3': '#1c93a8',
    '--chart-4': '#5c74d6',
    '--chart-5': '#8a8a96',
  },
  dark: {
    '--background': '#0f0f14',
    '--foreground': '#ececef',
    '--card': '#17171e',
    '--card-foreground': '#ececef',
    '--popover': '#17171e',
    '--popover-foreground': '#ececef',
    '--primary': '#6e63ec',
    '--primary-foreground': '#ffffff',
    '--primary-hover': '#8179f0',
    '--primary-pressed': '#5b50e8',
    '--primary-soft': '#221f3a',
    '--primary-edge': '#3a3560',
    '--primary-strong': '#8179f0',
    '--primary-deep': '#5b50e8',
    '--secondary': '#1e1e27',
    '--secondary-foreground': '#ececef',
    '--muted': '#1e1e27',
    '--muted-foreground': '#9a9aa6',
    '--accent': '#1e1e27',
    '--accent-foreground': '#ececef',
    '--accent-brand': '#6e63ec',
    '--destructive': '#e56a57',
    '--destructive-foreground': '#ffffff',
    '--border': 'rgb(255 255 255 / 0.09)',
    '--input': 'rgb(255 255 255 / 0.14)',
    '--ring': 'rgb(91 80 232 / 0.55)',
    '--radius': '10px',
    '--info': '#a9a2ee',
    '--ink': '#ececef',
    '--error': '#e56a57',
    '--error-soft': '#2c1512',
    '--error-edge': '#4a221c',
    '--error-strong': '#f08a7a',
    '--success': '#3fb57e',
    '--success-soft': '#12271d',
    '--success-edge': '#1a3d32',
    '--success-strong': '#5fd49a',
    '--warning': '#d6a03a',
    '--warning-soft': '#2a2109',
    '--warning-edge': '#4a3818',
    '--warning-strong': '#e8bc5c',
    '--seo': '#7c8fe0',
    '--aeo': '#e08aab',
    '--ramp-track': '#221f3a',
    '--ramp-200': '#3a3560',
    '--ramp-300': '#5a54a0',
    '--ramp-400': '#7c72e7',
    '--ramp-500': '#6e63ec',
    '--health-bad': '#e56a57',
    '--health-bad-soft': '#2c1512',
    '--health-mid': '#d6a03a',
    '--health-mid-soft': '#2a2109',
    '--health-good': '#3fb57e',
    '--health-good-soft': '#12271d',
    '--source-chatgpt': '#e08aab',
    '--source-chatgpt-soft': '#2e1a24',
    '--source-claude': '#e08a62',
    '--source-claude-soft': '#2e1f14',
    '--source-perplexity': '#3ab0c4',
    '--source-perplexity-soft': '#122a30',
    '--source-google': '#7c8fe0',
    '--source-google-soft': '#1a2040',
    '--source-bing': '#c08ae0',
    '--source-bing-soft': '#241a38',
    '--source-humans': '#9a9aa6',
    '--source-humans-soft': '#1e1e27',
    '--category-meta': '#3ab0c4',
    '--category-meta-soft': '#122a30',
    '--category-content': '#e08aab',
    '--category-content-soft': '#2e1a24',
    '--category-technical': '#e08a62',
    '--category-technical-soft': '#2e1f14',
    '--category-social': '#c08ae0',
    '--category-social-soft': '#241a38',
    '--category-schema': '#7c8fe0',
    '--category-schema-soft': '#1a2040',
    '--chart-1': '#e08aab',
    '--chart-2': '#e08a62',
    '--chart-3': '#3ab0c4',
    '--chart-4': '#7c8fe0',
    '--chart-5': '#9a9aa6',
  },
}

function createThemeProbe(mode: ThemeMode): HTMLElement {
  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;'

  if (mode === 'dark') {
    wrapper.classList.add('dark')
  }

  wrapper.appendChild(document.createElement('div'))
  document.documentElement.appendChild(wrapper)

  return wrapper
}

export function readCssThemeColor(cssVar: string, mode: ThemeMode): string {
  if (typeof document === 'undefined') {
    return CSS_VAR_FALLBACKS[mode][cssVar] ?? ''
  }

  const wrapper = createThemeProbe(mode)
  const probe = wrapper.firstElementChild as HTMLElement
  const value = getComputedStyle(probe).getPropertyValue(cssVar).trim()
  wrapper.remove()

  if (value.length === 0) {
    return CSS_VAR_FALLBACKS[mode][cssVar] ?? ''
  }

  return value
}

export function readVuetifyThemeColors(mode: ThemeMode): Record<string, string> {
  const colors: Record<string, string> = {}

  for (const [vuetifyKey, cssVar] of Object.entries(VUETIFY_COLOR_CSS_VARS)) {
    colors[vuetifyKey] = readCssThemeColor(cssVar, mode)
  }

  return colors
}

export function applyDocumentThemeVariables(mode: ThemeMode): void {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  const variables = CSS_VAR_FALLBACKS[mode]

  for (const [cssVar, value] of Object.entries(variables)) {
    root.style.setProperty(cssVar, value)
  }
}

export function syncVuetifyThemesFromCss(theme: ThemeInstance): void {
  if (typeof document === 'undefined') {
    return
  }

  const lightTheme = theme.themes.value.light
  const darkTheme = theme.themes.value.dark

  if (lightTheme !== undefined) {
    lightTheme.colors = {
      ...lightTheme.colors,
      ...readVuetifyThemeColors('light'),
    }
  }

  if (darkTheme !== undefined) {
    darkTheme.colors = {
      ...darkTheme.colors,
      ...readVuetifyThemeColors('dark'),
    }
  }
}

export function vuetifyLightThemeColors(): Record<string, string> {
  const colors: Record<string, string> = {}

  for (const [vuetifyKey, cssVar] of Object.entries(VUETIFY_COLOR_CSS_VARS)) {
    colors[vuetifyKey] = CSS_VAR_FALLBACKS.light[cssVar] ?? ''
  }

  return colors
}

export function vuetifyDarkThemeColors(): Record<string, string> {
  const colors: Record<string, string> = {}

  for (const [vuetifyKey, cssVar] of Object.entries(VUETIFY_COLOR_CSS_VARS)) {
    colors[vuetifyKey] = CSS_VAR_FALLBACKS.dark[cssVar] ?? ''
  }

  return colors
}
