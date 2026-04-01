import type { ThemeDefinition } from 'vuetify';

/**
 * Single source of truth for semantic colors. Vuetify turns these into
 * `--v-theme-*` CSS variables; Tailwind maps them in `resources/css/app.css` `@theme`.
 *
 * Add keys here to get matching `bg-*` / `text-*` utilities (via `--color-*`) and Vuetify components.
 */
export const lightThemeColors = {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#54F2F2',
    error: '#FF453A',
    info: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
} satisfies NonNullable<ThemeDefinition['colors']>;

export const darkThemeColors = {
    background: '#121212',
    surface: '#1e1e1e',
    primary: '#00dc82',
    secondary: '#00c16a',
    accent: '#54F2F2',
    error: '#CF6679',
    info: '#64b5f6',
    success: '#4CAF50',
    warning: '#FB8C00',
} satisfies NonNullable<ThemeDefinition['colors']>;
