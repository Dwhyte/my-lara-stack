export type Appearance = 'light' | 'dark' | 'system'
export type ResolvedAppearance = 'light' | 'dark'

export const APPEARANCE_COOKIE = 'appearance'

export function parseAppearance(value: string | null | undefined): Appearance {
  if (value === 'light' || value === 'dark' || value === 'system') {
    return value
  }

  return 'system'
}

export function resolveAppearance(appearance: Appearance, systemPrefersDark: boolean): ResolvedAppearance {
  if (appearance === 'system') {
    return systemPrefersDark ? 'dark' : 'light'
  }

  return appearance
}

export function readSystemPrefersDarkFromHeaders(headers: Record<string, string | undefined>): boolean {
  return headers['sec-ch-prefers-color-scheme'] === 'dark'
}

export function readSystemPrefersDarkFromWindow(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function readAppearanceFromStorage(): Appearance | null {
  if (typeof window === 'undefined') {
    return null
  }

  return parseAppearance(window.localStorage.getItem(APPEARANCE_COOKIE))
}

export function syncAppearanceStorageToCookie(cookie: { value: string | null }): Appearance {
  const fromStorage = readAppearanceFromStorage()

  if (fromStorage !== null && cookie.value === null) {
    cookie.value = fromStorage
  }

  return parseAppearance(cookie.value ?? fromStorage ?? undefined)
}
