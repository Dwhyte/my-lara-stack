# Icons

## Page and feature components → `lucide-react`

Demos and app pages import icons directly:

```tsx
import { ArrowRight, Bell, Layers } from 'lucide-react';

<Layers className="size-5" />
<Bell className="size-4" />
```

Use `size-*` for square icons in page-level markup. Pair with `text-foreground` or `text-muted-foreground` as needed — icons inherit current text color by default.

## Icons inside shadcn UI components

When placing icons **inside** `Button`, `InputGroup`, or other shadcn primitives, follow the **`shadcn` skill** `rules/icons.md`:

- Use `data-icon="inline-start"` or `data-icon="inline-end"` on icons in `Button`
- Do not add sizing classes when the component handles icon size via CSS

If a page-level icon sits **outside** a shadcn primitive (e.g. next to a `CardTitle`), explicit `size-*` is fine.

## `components.json` icon library

CLI-added shadcn components may use **`hugeicons`** per `components.json` `iconLibrary`. When adding or updating components via CLI, respect the installed icon library in those UI files. Page/feature code continues to use **`lucide-react`** unless the project standard changes.

## Accessibility

- Icon-only buttons: always set `aria-label` on the `Button`
- Decorative icons adjacent to visible text: no extra label needed
- Meaningful standalone icons: provide visible text or `aria-label` on the interactive parent

## Do not

- Mix icon libraries in the same button without reason
- Use string icon names or custom SVG sprites when `lucide-react` already has the glyph
- Wrap icons in unnecessary `<span>` wrappers for spacing — use `gap-*` on the flex parent
