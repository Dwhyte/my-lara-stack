# MCP & docs — verify before you write

Don't guess component APIs. This project has docs tools that return version-correct answers.

## shadcn → official CLI

Before composing or fixing shadcn components:

- `pnpm dlx shadcn@latest add <name>` — add a primitive into `resources/js/components/ui/`
- Then restyle the generated file to match existing primitives and tokens

There is no shadcn-vue skill in this repo. Use the official React CLI and the primitives already in `components/ui`.

## Framework docs → Boost `search-docs`

Use `search-docs` for Tailwind CSS v4, Inertia v3, and React specifics. Multiple broad topic queries beat one narrow query, e.g. `['deferred props', 'skeleton']`, `['form validation', 'useForm']`.

## Tailwind utilities → `tailwindcss-development` skill

Activate when adding or debugging utility classes, responsive layout, dark mode, or `@theme` token changes.

## Motion → Emil skills

- **`emil-design-eng`** — default design-engineering advice for UI work
- **`animate`** — when building or changing transitions
- **`review-animations`** / **`improve-animations`** — when refining existing motion

Use these for the bottom-nav pill, tooltip enter, page transitions, and Vaul sheets.

## Brand direction → `.ai/design/brand.md`

When matching a mockup or extending the palette, read the brand doc first, then update `resources/css/tokens/` — not the other way around.

## Order of operations

1. Pattern exists in repo? Follow it (Consistency First).
2. Need shadcn API / composition rules? **`app-ui`** `rules/shadcn-first.md` + official CLI.
3. Need Tailwind/Inertia/React syntax? `search-docs` + **`tailwindcss-development`** / **`inertia-react-development`**.
4. Need project tokens, spacing, or brand? **`app-ui`** rule files + `.ai/design/brand.md`.
5. Need motion advice? **`emil-design-eng`** / **`animate`**.
6. Only then write the component.
