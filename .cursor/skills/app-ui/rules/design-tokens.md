# Design tokens

Color is never hardcoded in components. Every color comes from a semantic token so light/dark themes and brand changes propagate automatically.

## Source of truth

- **`resources/css/tokens/`** — the registry (`shadcn-vars.css`, `tokens.css`, `typography.css`)
- **`resources/css/tailwind.css`** — Tailwind v4 entry; `@source` includes `*.{tsx,ts}`; dark variant is `.dark`
- **`.ai/design/brand.md`** — human-readable brand intent (palette, fonts, radius)
- **`components.json`** — official shadcn React CLI config (style: `new-york`, base color: `neutral`)

Add a new color in the token files (both `:root` and `.dark`, plus `@theme inline` if needed) before using it. Never introduce raw hex or `oklch(...)` in a `.tsx` file.

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
| `bg-primary` / `text-primary-foreground` | Primary actions (`#2142e7`) |
| `bg-secondary` / `text-secondary-foreground` | Secondary actions |
| `text-destructive` / `bg-destructive` | Errors and destructive actions |
| `ring-ring` | Focus rings |
| `bg-shell-ink` | Bottom nav pill |

## Hierarchy without extra grays

Use semantic tokens for emphasis instead of inventing new gray steps:

- `text-foreground` — primary
- `text-muted-foreground` — secondary / inactive
- `bg-muted` — subtle grouping backgrounds
- `border-border` — dividers and card edges

Prefer `text-muted-foreground` over raw Tailwind grays (`text-gray-500`, `text-zinc-400`).

## Radius

Base radius is `--radius: 8px`. Tailwind exposes `rounded-sm` … `rounded-xl`. Buttons use `rounded-lg`; cards use `rounded-xl`; the bottom nav pill uses `rounded-[14px]`.

## Dark mode

Dark mode toggles the `.dark` class on `<html>` via `useAppearance` (`resources/js/hooks/use-appearance.ts`).

- Prefer token utilities that already flip per theme (`bg-background`, `text-foreground`).
- Do **not** add manual `dark:bg-gray-950` style overrides for standard surfaces.

## Accent discipline

Solid `bg-primary` is for the **one primary action per view** (or the main CTA in a card footer). Secondary navigation and alternate actions use `variant="secondary"` or `variant="outline"`. Status and errors use `destructive` tokens or `Badge` variants — not ad-hoc red/green Tailwind colors.
