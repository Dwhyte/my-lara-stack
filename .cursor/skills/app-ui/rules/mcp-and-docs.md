# MCP & docs — verify before you write

Don't guess component APIs. This project has MCP servers and docs tools that return version-correct answers.

## shadcn → `user-shadcn` MCP and CLI

Before composing or fixing shadcn components:

- `user-shadcn` MCP — search registries, view component source, get add commands
- `pnpm dlx shadcn@latest docs <component>` — documentation and example URLs
- `pnpm dlx shadcn@latest info --json` — installed components, aliases, preset, icon library

Activate the **`shadcn` skill** (`.agents/skills/shadcn/`) for full workflow and critical rules.

## Framework docs → Boost `search-docs`

Use `search-docs` for Tailwind CSS v4, Inertia v3, and React specifics. Multiple broad topic queries beat one narrow query, e.g. `['deferred props', 'skeleton']`, `['form validation', 'useForm']`.

## Tailwind utilities → `tailwindcss-development` skill

Activate when adding or debugging utility classes, responsive layout, dark mode, or `@theme` token changes.

## Brand direction → `.ai/design/brand.md`

When matching a mockup or extending the palette, read the brand doc first, then update `resources/css/app.css` tokens — not the other way around.

## Order of operations

1. Pattern exists in repo? Follow it (Consistency First).
2. Need shadcn API / composition rules? **`shadcn` skill** + `user-shadcn` MCP + `shadcn docs`.
3. Need Tailwind/Inertia/React syntax? `search-docs` + **`tailwindcss-development`** / **`inertia-react-development`** skills.
4. Need project tokens, spacing, or brand? **`app-ui` skill** rule files + `.ai/design/brand.md`.
5. Only then write the component.
