# Brand & design reference

Human-readable brand intent for this starter kit. **Implementation lives in code** — mirror any changes here into `resources/css/app.css` and `components.json`.

## Stack

- **UI library:** shadcn-vue (Reka UI primitives, Vega style)
- **CSS:** Tailwind CSS v4 with `@theme inline` in `resources/css/app.css`
- **Icons (pages/features):** `@lucide/vue`
- **Dark mode:** `.dark` class on `<html>` via `useAppearance`

## Preset (shadcn-vue)

| Setting | Value |
| --- | --- |
| Style | Reka Vega (`reka-vega`) |
| Base / theme color | Neutral |
| Radius | Default (`--radius` in `app.css`) |
| Body font | Inter Variable |
| Heading font | Inter (same as body for now — swap via `--font-heading` when brand needs a display face) |
| Chart palette | `chart-1` … `chart-5` in `app.css` |

To re-apply or tweak the preset: `pnpm dlx shadcn-vue@latest info --json` then `pnpm dlx shadcn-vue@latest apply --preset vega` or edit CSS variables directly.

## Color philosophy

- **Neutral-first:** Primary actions use `primary` / `primary-foreground`, not a loud brand hue — suitable for a generic starter kit.
- **Hierarchy via tokens:** `foreground` vs `muted-foreground`, not a ladder of gray Tailwind utilities.
- **One primary CTA per view:** Solid primary buttons are scarce; secondary and outline variants handle the rest.
- **Status:** Use `destructive` and `Badge` variants — not raw `text-red-500` / `text-green-600`.

## Typography

- Body: Inter Variable, antialiased
- Page titles: bold, tight tracking (`text-4xl font-bold tracking-tight`)
- Secondary copy: `text-muted-foreground`

When adding a display/heading font (e.g. Raleway), update:

1. This doc
2. `@import` in `resources/css/app.css`
3. `--font-heading` in `@theme inline`

## Spacing & layout defaults

- Page padding: `p-8` (responsive: `p-4 md:p-8`)
- Focused content width: `max-w-2xl`
- Vertical rhythm: `flex flex-col gap-8` between major sections
- Prefer `gap-*` over `space-y-*`

## Assets & mockups

Drop reference screenshots, logos, or Figma exports in this directory as the brand evolves. Name files descriptively (`dashboard-v1.png`, `logo.svg`). The **`app-ui` skill** points here when matching designs.

## When customizing for a product

1. Update this file with brand decisions (colors, fonts, radius, tone).
2. Edit `:root` / `.dark` variables in `resources/css/app.css`.
3. Run `pnpm dlx shadcn-vue@latest apply --preset <code>` if switching shadcn-vue preset, or edit CSS variables directly.
4. Add reusable surface patterns to `.cursor/skills/app-ui/rules/` as they emerge (don't pre-document components that don't exist yet).
