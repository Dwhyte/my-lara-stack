# Design tokens

Color is never hardcoded in components. Every color comes from a semantic token so light/dark themes and brand changes propagate automatically.

## Source of truth

- **`resources/css/app.css`** — the only registry. Defines:
  - `:root` and `.dark` OKLCH CSS variables
  - `@theme inline` mappings that expose Tailwind utilities (`bg-primary`, `text-muted-foreground`, etc.)
- **`.ai/design/brand.md`** — human-readable brand intent (palette, fonts, radius). Update this when brand direction changes; then mirror values in `app.css`.
- **`components.json`** — shadcn-vue CLI config (style: `reka-vega`, base color: `neutral`). Run `pnpm dlx shadcn-vue@latest apply` or edit `app.css` for theme changes — do not hardcode colors in Vue SFCs.

Add a new color in **`app.css`** (both `:root` and `.dark`, plus `@theme inline` if needed) before using it. Never introduce raw hex or `oklch(...)` in a `.vue` file.

## Core surface tokens

| Utility | Role |
| --- | --- |
| `bg-background` | Page canvas |
| `bg-card` / `text-card-foreground` | Card surfaces |
| `bg-popover` | Menus, dropdowns, popovers |
| `text-foreground` | Primary text and icons |
| `text-muted-foreground` | Secondary text, captions, hints |
| `border-border` | Default hairlines |
| `border-input` | Form control borders |
| `bg-muted` | Subtle fills, chips, wells |
| `bg-accent` / `text-accent-foreground` | Hover/selected subtle backgrounds |
| `bg-primary` / `text-primary-foreground` | Primary actions |
| `bg-secondary` / `text-secondary-foreground` | Secondary actions |
| `text-destructive` / `bg-destructive` | Errors and destructive actions |
| `ring-ring` | Focus rings |

## Hierarchy without extra grays

Use semantic tokens for emphasis instead of inventing new gray steps:

- `text-foreground` — primary
- `text-muted-foreground` — secondary / inactive
- `text-muted-foreground/80` or opacity modifiers — faint labels when needed
- `bg-muted` — subtle grouping backgrounds
- `border-border` — dividers and card edges

Prefer `text-muted-foreground` over raw Tailwind grays (`text-gray-500`, `text-zinc-400`).

## Chart and sidebar tokens

- Charts: `chart-1` … `chart-5` (mapped in `@theme inline` as `--color-chart-*`)
- Sidebar shell: `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, etc.

Use these when building dashboards or sidebar layouts — don't invent parallel color names.

## Radius

Base radius comes from `--radius: 0.625rem` in `:root`. Tailwind exposes:

- `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-4xl`

Match shadcn component defaults; don't override component radius with arbitrary values unless the design system doc calls for it.

## Dark mode

Dark mode toggles the `.dark` class on `<html>` via `useAppearance` (`resources/js/hooks/use-appearance.ts`).

- Prefer token utilities that already flip per theme (`bg-background`, `text-foreground`).
- Do **not** add manual `dark:bg-gray-950` style overrides for standard surfaces.
- For generic shadcn dark-mode rules, see the **`shadcn` skill** `rules/styling.md`.

## Accent discipline

Solid `bg-primary` is for the **one primary action per view** (or the main CTA in a card footer). Secondary navigation and alternate actions use `variant="secondary"` or `variant="outline"`. Status and errors use `destructive` tokens or `Badge` variants — not ad-hoc red/green Tailwind colors.
