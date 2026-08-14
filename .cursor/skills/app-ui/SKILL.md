---
name: app-ui
description: 'Apply this skill whenever building, styling, or refactoring Vue UI in this Laravel starter kit. This includes creating pages or components in resources/js; composing Vuetify 4 components; applying Tailwind CSS utilities; working with spacing, padding, gap, radius, layout, grid, responsive breakpoints, dark mode; typography; colors and design tokens; Iconify icons; badges; active/hover states; or matching a design or mockup. Always reach for a Vuetify component first and adapt it with project tokens; build from scratch only when no primitive fits.'
license: MIT
metadata:
    author: my-lara-stack
---

# App UI

How this starter kit builds and styles UI: **Vuetify 4 components first**, adapted with **Tailwind utilities** bound to **design tokens**, at a consistent spacing/radius/type scale. The goal is visual consistency — every new component should look like it belongs with `DemoA`, `DemoB`, and `layouts/app.vue`.

## Consistency First

Before applying any rule, check what the app already does. Open 2–3 sibling files in `resources/js/pages`, `resources/js/components`, or `resources/js/layouts` and match their structure, spacing, and token usage. An established local pattern always wins over a theoretically better one.

## The one-line philosophy

Reach for a Vuetify primitive → bind colors to tokens → adjust spacing/radius with Tailwind → only hand-roll when nothing fits.

## Quick Reference

### 1. Vuetify-first

- Use `v-btn`, `v-card`, `v-dialog`, `v-text-field`, `v-switch`, etc. before custom markup
- Navigation: `to` prop on Vuetify components via `vuetify-inertia-link`
- Surface elevation: `surface-raised`, `surface-chrome-header`, `surface-chrome-sidebar`
- Primary CTAs: `color="primary"` + `class="shadow-brand"`

### 2. Design tokens → `rules/design-tokens.md`

- Never hardcode hex; use semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`)
- Registry: `resources/css/tokens/` and `resources/css/vuetify-overrides.css`
- Brand reference: `.ai/design/brand.md`
- Vuetify theme bridge: `resources/js/theme/tokens.ts`

### 3. Spacing & layout → `rules/spacing-layout.md`

- App pages inside shell: `min-h-full p-4 md:p-8`
- Content width: `max-w-2xl` for focused pages
- Vertical stacks: `space-y-*` or `flex flex-col gap-*`

### 4. Typography

- Body: Inter (`font-sans`)
- Display headings: Manrope (`font-display`)
- Secondary copy: `text-muted-foreground`

### 5. Icons

- Iconify Lucide: `<v-icon icon="lucide:bell" />` or `<IconifyIcon name="lucide:bell" />`

### 6. Docs

- Vuetify MCP / docs for component APIs
- Boost `search-docs` for Tailwind v4 / Inertia / Vue
- Activate **`tailwindcss-development`** for utility-class work

## How to Apply

1. Identify the task and check sibling files for existing patterns.
2. Pick the Vuetify primitive; verify props via Vuetify docs.
3. Bind colors to tokens, set spacing from the scale, add Iconify icons.
4. Keep code comment-free per **`no-narrative-comments`**.
