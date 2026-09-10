# Icons

## Page and feature components → `@iconify/react`

Use the shared `IconifyIcon` wrapper so string names (`lucide:*`, later `hugeicons:*`) survive:

```tsx
import IconifyIcon from '@/components/IconifyIcon';

<IconifyIcon name="lucide:bell" className="size-5" />
```

Use `size-*` for square icons in page-level markup. Icons inherit current text color by default.

## Icons inside shadcn UI components

When placing icons **inside** `Button` or other shadcn primitives, keep them as children and let the button’s gap handle spacing. Generated Lucide React icons from the CLI are fine inside `components/ui` (e.g. Sonner). App pages should still prefer `IconifyIcon` string names.

## Accessibility

- Icon-only buttons: always set `aria-label` on the control
- Decorative icons adjacent to visible text: no extra label needed
- Meaningful standalone icons: provide visible text or `aria-label` on the interactive parent

## Do not

- Mix icon libraries in the same button without reason
- Wrap icons in unnecessary `<span>` wrappers for spacing — use `gap-*` on the flex parent
- Use `<v-icon>` or Vue Iconify — this kit is React
