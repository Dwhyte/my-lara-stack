# shadcn-vue-first

This app is a Vue + shadcn-vue + Tailwind stack. The default move is **use a shadcn-vue component and compose it**, not build styled markup from scratch.

## Decision tree

1. Is there a shadcn-vue component for this? (`Button`, `Card`, `Dialog`, `Sheet`, `Tabs`, `Select`, `Input`, `Badge`, `Alert`, `Skeleton`, …) → use it from `@/components/ui/*`.
2. Component not installed? → `pnpm dlx shadcn-vue@latest add <name>`, then compose.
3. Need a project-specific look? Apply token utilities + Tailwind **for layout** on the primitive. Prefer built-in `variant` and `size` props before custom classes.
4. Does no primitive fit the design? → build minimal markup with tokens + Tailwind, and note why in your reasoning.

Avoid recreating things shadcn-vue already gives you (dialogs, dropdowns, toasts, form fields, tabs, tooltips).

## Respect component defaults

shadcn-vue components ship with variants and styling via CSS variables. Don't repeat or fight defaults:

```vue
<Button variant="outline" size="lg">Cancel</Button>
```

If a new app-wide default emerges, prefer editing the component in `resources/js/components/ui/` once rather than repeating props on every call site.

## Full composition

Use the full component API — don't flatten structure:

```vue
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent><!-- body --></CardContent>
  <CardFooter><!-- actions --></CardFooter>
</Card>
```

See **`DemoA.vue`** and **`DemoB.vue`** for page-level card patterns.

## Inertia navigation (no Vue Router)

- In-app links: `<Link :href="route.url()">` from `@inertiajs/vue3`
- Styled as a button: `<Button as-child><Link :href="...">Label</Link></Button>`
- Never wrap `<button>` inside `<Link>` without `as-child` (invalid nesting)
- Non-GET actions: Inertia `<Link method>`, `router.post`, or `useForm` — not plain `<a>` tags
- Route URLs: import from `@/actions/` or `@/routes/` (Wayfinder)

## Defer to the shadcn-vue skill

This file covers **project choice of library**. For **correct usage** of that library, always follow the upstream **`shadcn-vue` skill** (`.agents/skills/shadcn-vue/`):

- Forms: `FieldGroup`, `Field`, validation states
- Overlays: `DialogTitle`, no manual z-index
- Spacing: `gap-*` not `space-y-*`, `size-*` not `w-* h-*`
- Icons in Button: `data-icon` conventions
- CLI: add, search, preset → `SKILL.md` workflow section
