---
name: app-ui
description: 'Apply this skill whenever building, styling, or refactoring React UI in this Laravel starter kit. This includes creating pages or components in resources/js; composing shadcn/ui primitives; applying Tailwind CSS utilities; working with spacing, padding, gap, radius, layout, grid, responsive breakpoints, dark mode; typography; colors and design tokens; Iconify icons; badges; active/hover states; motion (bottom nav, tooltips, page transitions, Vaul sheets); or matching a design or mockup. Always reach for a shadcn component first and adapt it with project tokens; build from scratch only when no primitive fits. Load emil-design-eng for UI craft, and animate when building transitions.'
license: MIT
metadata:
    author: my-lara-stack
---

# App UI

How this starter kit builds and styles UI: **shadcn/ui first**, adapted with **Tailwind utilities** bound to **design tokens**, at a consistent spacing/radius/type scale. The goal is visual consistency — every new component should look like it belongs with `DemoA`, `DemoB`, and `layouts/app.tsx`.

For motion (bottom-nav pill, tooltip enter, page transitions, Vaul sheets), also load **`emil-design-eng`**. Load **`animate`** when you are building or changing those transitions.

## Consistency First

Before applying any rule, check what the app already does. Open 2–3 sibling files in `resources/js/pages`, `resources/js/components`, or `resources/js/layouts` and match their structure, spacing, and token usage. An established local pattern always wins over a theoretically better one.

## The one-line philosophy

Reach for a shadcn primitive → bind colors to tokens → adjust spacing/radius with Tailwind → only hand-roll when nothing fits.

## Quick Reference

### 1. shadcn-first → `rules/shadcn-first.md`

- Use `Button`, `Card`, `Dialog`, `Drawer`, `Input`, `Field`, `Select`, `Switch`, `Tooltip`, etc. from `@/components/ui/*`
- Navigation: `Button asChild` + Inertia `<Link>`
- Surface elevation: `surface-raised`, `surface-chrome-header`, `surface-chrome-sidebar`
- Primary CTAs: `variant="default"` + `shadow-brand` (already on the default button)

### 2. Design tokens → `rules/design-tokens.md`

- Never hardcode hex; use semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`)
- Registry: `resources/css/tokens/`
- Brand reference: `.ai/design/brand.md`

### 3. Spacing & layout → `rules/spacing-layout.md`

- App pages inside shell: `min-h-full p-4 md:p-8`
- Content width: `max-w-2xl` for focused pages
- Vertical stacks: `flex flex-col gap-*`

### 4. Typography → `rules/typography.md`

- Body and display: Inter (`font-sans` / `font-display`)
- Secondary copy: `text-muted-foreground`

### 5. Icons → `rules/icons.md`

- Iconify Lucide: `<IconifyIcon name="lucide:bell" />`

### 6. Docs → `rules/mcp-and-docs.md`

- `pnpm dlx shadcn@latest add <name>` to install primitives, then restyle in `components/ui`
- Boost `search-docs` for Tailwind v4 / Inertia / React
- Activate **`tailwindcss-development`** for utility-class work
- Activate **`emil-design-eng`** (and **`animate`**) for visual craft and motion

## How to Apply

1. Identify the task and check sibling files for existing patterns.
2. Pick the shadcn primitive; add it via the official CLI if missing.
3. Bind colors to tokens, set spacing from the scale, add Iconify icons.
4. Keep code comment-free per **`no-narrative-comments`**.
