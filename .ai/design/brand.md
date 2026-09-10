# Brand & design reference

Human-readable brand intent for this starter kit. **Implementation lives in code** — mirror any changes here into `resources/css/tokens/`.

## Stack

- **UI library:** shadcn/ui (React) with project tokens
- **CSS:** Tailwind CSS v4 + token chain in `resources/css/tokens/`
- **Icons:** Iconify via `@iconify/react` (Lucide collection)
- **Dark mode:** Server-resolved `resolvedAppearance` + `.dark` on `<html>`

## Brand colors

| Token | Value | Usage |
| --- | --- | --- |
| Primary | `#2142E7` | CTAs, active nav, brand accents |
| Chrome header | elevation raised (white) | Desktop app header |
| Display font | Inter | Headings, page titles |
| Body font | Inter | Body copy, UI labels |
| Mono font | JetBrains Mono | Code blocks |

## Color philosophy

- **Royal blue primary:** Primary actions use `primary` / `shadow-brand`.
- **Hierarchy via tokens:** `foreground` vs `muted-foreground`, surface utilities (`surface-raised`, `surface-chrome-*`).
- **One primary CTA per view:** Solid primary buttons are scarce; outline variants handle secondary actions.
- **Status:** Semantic tokens — not raw Tailwind color utilities.

## Typography

- Body: Inter (via `@fontsource/inter`)
- Display: Inter (`font-display`, `--font-display`)
- Page titles: Inter Bold 24/32 (`text-2xl font-bold leading-8`)
- Secondary copy: `text-muted-foreground`

## Spacing & layout defaults

- Page padding: `p-4 md:p-8`
- Focused content width: `max-w-2xl`
- Vertical rhythm: `flex flex-col gap-8` between major sections
- App shell: sidebar + bottom nav via `layouts/app.tsx`
