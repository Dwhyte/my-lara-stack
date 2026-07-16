# shadcn-first

This app is a React + shadcn/ui + Tailwind stack. The default move is **use a shadcn component and compose it**, not build styled markup from scratch.

## Decision tree

1. Is there a shadcn component for this? (`Button`, `Card`, `Dialog`, `Sheet`, `Tabs`, `Select`, `Input`, `Badge`, `Alert`, `Skeleton`, …) → use it from `@/components/ui/*`.
2. Component not installed? → `pnpm dlx shadcn@latest add <name>`, then compose.
3. Need a project-specific look? Apply token utilities + Tailwind **for layout** on the primitive. Prefer built-in `variant` and `size` props before custom classes.
4. Does no primitive fit the design? → build minimal markup with tokens + Tailwind, and note why in your reasoning.

Avoid recreating things shadcn already gives you (dialogs, dropdowns, toasts, form fields, tabs, tooltips).

## Respect component defaults

shadcn components ship with variants and styling via CSS variables. Don't repeat or fight defaults:

```tsx
// Good — use variant prop
<Button variant="outline" size="lg">Cancel</Button>

// Avoid — reimplementing outline styling on a raw button
<button className="border border-input bg-transparent ...">Cancel</button>
```

If a new app-wide default emerges, prefer editing the component in `resources/js/components/ui/` once rather than repeating props on every call site.

## Full composition

Use the full component API — don't flatten structure:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>{/* body */}</CardContent>
  <CardFooter>{/* actions */}</CardFooter>
</Card>
```

See **`DemoA.tsx`** and **`DemoB.tsx`** for page-level card patterns.

## Inertia navigation (no React Router)

- In-app links: `<Link href={route.url()}>` from `@inertiajs/react`
- Styled as a button: `<Button asChild><Link href={...}>Label</Link></Button>`
- Never wrap `<button>` inside `<Link>` without `asChild` (invalid nesting)
- Non-GET actions: Inertia `<Link method>`, `router.post`, or `useForm` — not plain `<a>` tags
- Route URLs: import from `@/actions/` or `@/routes/` (Wayfinder)

## Defer to the shadcn skill

This file covers **project choice of library**. For **correct usage** of that library, always follow the upstream **`shadcn` skill** (`.agents/skills/shadcn/`):

- Forms: `FieldGroup`, `Field`, validation states → `rules/forms.md`
- Overlays: `DialogTitle`, no manual z-index → `rules/composition.md`
- Spacing: `gap-*` not `space-y-*`, `size-*` not `w-* h-*` → `rules/styling.md`
- Icons in Button: `data-icon` → `rules/icons.md`
- CLI: add, search, preset → `SKILL.md` workflow section
