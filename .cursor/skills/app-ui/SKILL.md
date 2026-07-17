---
name: app-ui
description: 'Apply this skill whenever building, styling, or refactoring Vue UI in this Laravel starter kit. This includes creating pages or components in resources/js; choosing or composing shadcn-vue components; applying Tailwind CSS utilities; working with spacing, padding, gap, radius, layout, grid, responsive breakpoints, dark mode; typography; colors and design tokens; icons; badges; active/hover states; or matching a design or mockup. Always reach for a shadcn-vue component first and adapt it with project tokens; build from scratch only when no primitive fits. Triggers on phrases like restyle, hero, card, button, drawer, sidebar, nav, modal, UI, component, layout, padding, spacing, colors, theme, shadcn, or Tailwind.'
license: MIT
metadata:
    author: my-lara-stack
---

# App UI

How this starter kit builds and styles UI: **shadcn-vue components first**, adapted with **Tailwind utilities** bound to **design tokens**, at a consistent spacing/radius/type scale. The goal is visual consistency — every new component should look like it belongs with `DemoA`, `DemoB`, and `AppLayout`.

## Consistency First

Before applying any rule, check what the app already does. Open 2–3 sibling files in `resources/js/pages`, `resources/js/components`, or `resources/js/layouts` and match their structure, spacing, and token usage. An established local pattern always wins over a theoretically better one.

These rules are the defaults for when no pattern exists yet, not overrides for existing patterns.

## The one-line philosophy

Reach for a shadcn-vue primitive → bind colors to tokens → adjust spacing/radius with Tailwind → only hand-roll when nothing fits.

## Quick Reference

### 1. shadcn-vue-first → `rules/shadcn-first.md`

- Always try `@/components/ui/*` before custom markup; compose, don't replace
- Add missing components with `pnpm dlx shadcn-vue@latest add <name>`
- Inertia navigation: `<Button as-child><Link :href="..." /></Button>`, never `<Link><button>`
- For composition, forms, overlays, and icons — defer to the **`shadcn-vue` skill** (`.agents/skills/shadcn-vue/`)

### 2. Design tokens → `rules/design-tokens.md`

- Never hardcode hex; use semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`)
- Registry: `resources/css/app.css` (`:root`, `.dark`, `@theme inline`)
- Brand reference: `.ai/design/brand.md`
- Preset: Reka Vega style, Neutral palette (see `components.json`)

### 3. Spacing & layout → `rules/spacing-layout.md`

- Page canvas: `min-h-screen bg-background p-8`
- Content width: `max-w-2xl` for focused pages, `max-w-4xl` for wider layouts
- Vertical stacks: `flex flex-col gap-*` (not `space-y-*`)
- Card padding: use `CardHeader` / `CardContent` / `CardFooter` — don't flatten into one block

### 4. Typography → `rules/typography.md`

- Body: `font-sans` (Inter Variable)
- Headings: `text-foreground` with weight/size ladder
- Secondary copy: `text-muted-foreground`

### 5. Icons → `rules/icons.md`

- Pages and feature components: `@lucide/vue`
- Icons inside shadcn-vue `Button` and other UI primitives: follow the **`shadcn-vue` skill**

### 6. MCP & docs → `rules/mcp-and-docs.md`

- Verify shadcn-vue component APIs with `pnpm dlx shadcn-vue@latest docs <component>`
- Boost `search-docs` for Tailwind v4 / Inertia / Vue
- Activate **`tailwindcss-development`** for utility-class work

## How to Apply

1. Identify the task (new page, restyle, layout) and read the relevant rule file(s) above.
2. Check sibling files for an existing pattern — follow it (Consistency First).
3. Pick the shadcn-vue primitive; verify its API via `shadcn-vue docs` / `search-docs`.
4. Bind colors to tokens, set spacing/radius from the scale, add icons via `@lucide/vue`.
5. For generic shadcn-vue composition rules (FieldGroup, DialogTitle, gap vs space-y), follow the **`shadcn-vue` skill** — do not duplicate them here.
6. Keep code comment-free per **`no-narrative-comments`** — document patterns in `README.md` or skills, not in source files.
