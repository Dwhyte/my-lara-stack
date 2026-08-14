# Brand & design reference

Human-readable brand intent for this starter kit. **Implementation lives in code** — mirror any changes here into `resources/css/tokens/` and `resources/css/vuetify-overrides.css`.

## Stack

- **UI library:** Vuetify 4 with Vouch token styling
- **CSS:** Tailwind CSS v4 + token chain in `resources/css/tokens/`
- **Icons:** Iconify with `@iconify-json/lucide`
- **Dark mode:** Server-resolved `resolvedAppearance` + `.dark` on `<html>`

## Brand colors

| Token | Value | Usage |
| --- | --- | --- |
| Primary | `#5b50e8` | CTAs, active nav, brand accents |
| Display font | Manrope | Headings, logo mark |
| Body font | Inter | Body copy, UI labels |
| Mono font | JetBrains Mono | Code blocks |

## Color philosophy

- **Purple brand primary:** Primary actions use `primary` / `shadow-brand` on Vuetify buttons.
- **Hierarchy via tokens:** `foreground` vs `muted-foreground`, surface utilities (`surface-raised`, `surface-chrome-*`).
- **One primary CTA per view:** Solid primary buttons are scarce; outlined variants handle secondary actions.
- **Status:** Use Vuetify `color` props and semantic tokens — not raw Tailwind color utilities.

## Typography

- Body: Inter (via `@fontsource/inter`)
- Display: Manrope (`font-display`, `--font-display`)
- Page titles: bold, tight tracking (`text-4xl font-bold tracking-tight font-display`)
- Secondary copy: `text-muted-foreground`

## Spacing & layout defaults

- Page padding: `p-4 md:p-8`
- Focused content width: `max-w-2xl`
- Vertical rhythm: `space-y-8` between major sections
- App shell: sidebar + bottom nav on mobile via `layouts/app.vue`

## Assets & mockups

Drop reference screenshots, logos, or Figma exports in this directory as the brand evolves. The **`app-ui` skill** points here when matching designs.
