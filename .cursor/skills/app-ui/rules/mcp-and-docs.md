# MCP & docs — verify before you write

Don't guess component APIs. This project has docs tools that return version-correct answers.

## shadcn-vue → CLI

Before composing or fixing shadcn-vue components:

- `pnpm dlx shadcn-vue@latest docs <component>` — documentation and example URLs
- `pnpm dlx shadcn-vue@latest info --json` — installed components, aliases, preset, icon library

Activate the **`shadcn-vue` skill** (`.agents/skills/shadcn-vue/`) for full workflow and critical rules.

## Framework docs → Boost `search-docs`

Use `search-docs` for Tailwind CSS v4, Inertia v3, and Vue specifics. Multiple broad topic queries beat one narrow query, e.g. `['deferred props', 'skeleton']`, `['form validation', 'useForm']`.

## Tailwind utilities → `tailwindcss-development` skill

Activate when adding or debugging utility classes, responsive layout, dark mode, or `@theme` token changes.

## Brand direction → `.ai/design/brand.md`

When matching a mockup or extending the palette, read the brand doc first, then update `resources/css/app.css` tokens — not the other way around.

## Order of operations

1. Pattern exists in repo? Follow it (Consistency First).
2. Need shadcn-vue API / composition rules? **`shadcn-vue` skill** + `shadcn-vue docs`.
3. Need Tailwind/Inertia/Vue syntax? `search-docs` + **`tailwindcss-development`** / **`inertia-vue-development`** skills.
4. Need project tokens, spacing, or brand? **`app-ui` skill** rule files + `.ai/design/brand.md`.
5. Only then write the component.
