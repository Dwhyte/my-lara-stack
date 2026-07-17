# Spacing & layout

Consistent spacing makes new pages feel like part of the same app. Match `DemoA.vue` / `DemoB.vue` unless a sibling component establishes a different local pattern.

## Page shell

Centered demo/marketing-style pages:

```vue
<div class="flex min-h-screen items-center justify-center bg-background p-8">
  <div class="flex w-full max-w-2xl flex-col gap-8">
    <!-- header block, card, footer note -->
  </div>
</div>
```

App-style pages (future dashboards, settings): drop `items-center justify-center`, use `min-h-screen bg-background` with a sidebar or top nav from shadcn `Sidebar` / header patterns.

## Width scale

| Class | Use |
| --- | --- |
| `max-w-2xl` | Focused content (demos, auth forms, narrow settings) |
| `max-w-4xl` | Wider content (tables, two-column forms) |
| `max-w-6xl` / `max-w-7xl` | Full app shells with sidebar |

## Padding & gap scale

| Context | Classes |
| --- | --- |
| Page outer padding | `p-8` (reduce to `p-4` on small screens with `p-4 md:p-8`) |
| Section vertical rhythm | `flex flex-col gap-8` between major blocks |
| Card internal sections | `CardHeader` / `CardContent` / `CardFooter` (component handles padding) |
| Inline clusters | `flex items-center gap-2` or `gap-3` |
| List rows | `flex flex-col gap-3` or `gap-2` |
| Footer action stacks | `flex flex-col gap-2` inside `CardFooter` |

## Spacing rules (align with shadcn skill)

- Use **`flex` + `gap-*`** for vertical and horizontal stacks — not `space-y-*` or `space-x-*`
- Use **`size-*`** when width and height are equal (icons, avatars)
- Use **`cn()`** from `@/lib/utils` for conditional layout classes

## Cards and surfaces

- Default content card: `<Card>` with full header/content/footer composition
- Primary action in a card: one full-width `Button` with `size="lg"` in `CardFooter`
- Secondary / navigation action: `variant="secondary"` or `variant="outline"` on the next row
- Subtle inline badge/chip: `rounded-lg bg-muted px-4 py-1.5 text-sm` (see Demo A header pill)

Extract shared surface wrappers to `resources/js/components/` only when the same non-trivial composition repeats across multiple pages.

## Responsive layout

- Mobile-first: start single column, add `md:` / `lg:` for grid and sidebar breakpoints
- Prefer CSS grid/flex with `gap-*` over margin hacks between siblings
- For complex app shells, add shadcn `Sidebar` via CLI when needed — don't hand-roll drawer behavior

## Loading and empty states

- Deferred Inertia props: show `Skeleton` components — not blank areas
- No data: use shadcn `Empty` when installed; until then, muted centered copy with `text-muted-foreground`
- Inline async: `Spinner` inside `Button` with `disabled` (see shadcn skill `rules/composition.md`)
