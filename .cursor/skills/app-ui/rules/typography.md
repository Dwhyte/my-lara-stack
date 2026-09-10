# Typography

Typography uses Inter for both body and display, plus JetBrains Mono for code.

## Font stacks

Defined in `resources/css/tokens/typography.css` and loaded via `@fontsource/inter` + `@fontsource/jetbrains-mono`:

| Token | Stack | Use |
| --- | --- | --- |
| `font-sans` | Inter | Body, UI, buttons, labels |
| `font-display` | Inter | Page titles and headings |
| `font-mono` | JetBrains Mono | Code, timestamps, props dumps |

Body default is applied globally: `body { @apply bg-background font-sans text-foreground antialiased; }`

## Size & weight ladder

| Element | Typical classes |
| --- | --- |
| Page title | `font-display text-4xl font-bold tracking-tight text-foreground` |
| Section title | `text-2xl font-semibold text-foreground` |
| Card title | `CardTitle` component (don't override font size unless needed) |
| Body / lead | `text-lg text-muted-foreground` for intro paragraphs |
| UI labels | `text-sm text-muted-foreground` |
| Fine print | `text-xs text-muted-foreground` |
| Emphasis in body | `<strong className="text-foreground">` inside muted copy |

## Hierarchy via color, not extra fonts

Secondary text uses `text-muted-foreground`. Primary text uses `text-foreground`. Avoid stacking many gray Tailwind steps — the token pair is enough for most UI.

## Numbers and metrics

When displaying tabular numbers (stats, IDs, timestamps), add `tabular-nums` for aligned columns.

## Do not

- Hardcode `font-family` in components — use `font-sans` / `font-display` / `font-mono`
- Override shadcn component typography in `className` unless adjusting layout (e.g. `truncate`, `text-center`)
- Use raw `text-gray-*` / `text-zinc-*` — use `text-foreground` / `text-muted-foreground`
