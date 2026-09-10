# Spacing & layout

Consistent spacing makes new pages feel like part of the same app. Match `DemoA.tsx` / `DemoB.tsx` unless a sibling component establishes a different local pattern.

## Page shell

Centered demo/marketing-style pages:

```tsx
<div className="flex min-h-full items-center justify-center p-4 md:p-8">
    <div className="flex w-full max-w-2xl flex-col gap-8">{/* header, card, footer note */}</div>
</div>
```

App-style pages (settings, dashboards): drop `items-center justify-center` and use `app-page-shell` / `max-w-lg` as in `settings/Appearance.tsx`.

## Width scale

| Class | Use |
| --- | --- |
| `max-w-2xl` | Focused content (demos, auth forms, narrow settings) |
| `max-w-4xl` | Wider content (tables, two-column forms) |
| `max-w-6xl` / `max-w-7xl` | Full app shells with sidebar |

## Padding & gap scale

| Context | Classes |
| --- | --- |
| Page outer padding | `p-4 md:p-8` |
| Section vertical rhythm | `flex flex-col gap-8` between major blocks |
| Card internal sections | `CardHeader` / `CardContent` / `CardFooter` |
| Inline clusters | `flex items-center gap-2` or `gap-3` |
| List rows | `flex flex-col gap-3` or `gap-2` |
| Footer action stacks | `flex flex-col gap-2` inside `CardFooter` |

## Spacing rules

- Use **`flex` + `gap-*`** for vertical and horizontal stacks — not `space-y-*` or `space-x-*`
- Use **`size-*`** when width and height are equal (icons, avatars)
- Use **`cn()`** from `@/lib/utils` for conditional layout classes (CLI-generated UI may import `cn` from the `cn` package)

## Cards and surfaces

- Default content card: `<Card className="surface-raised">` with full header/content/footer composition
- Primary action in a card: one full-width `Button` with `size="lg"` in `CardFooter`
- Secondary / navigation action: `variant="secondary"` or `variant="outline"` on the next row
- Subtle inline badge/chip: `rounded-lg bg-muted px-4 py-1.5 text-sm` (see Demo A header pill)

Extract shared surface wrappers to `resources/js/components/` only when the same non-trivial composition repeats across multiple pages.

## Responsive layout

- Mobile-first: start single column, add `md:` / `lg:` for grid and sidebar breakpoints
- Prefer CSS grid/flex with `gap-*` over margin hacks between siblings
- App chrome: `AppSidebarDrawer` + `AppBottomNav` + `AppDesktopHeader` — do not hand-roll a second shell

## Loading and empty states

- Deferred Inertia props: show pulsing skeletons — not blank areas
- No data: muted centered copy with `text-muted-foreground`
- Inline async: disable the `Button` while `processing`
