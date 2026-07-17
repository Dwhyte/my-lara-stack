# Icons

## Page and feature components → `@lucide/vue`

Demos and app pages import icons directly:

```vue
<script setup lang="ts">
import { ArrowRight, Bell, Layers } from '@lucide/vue';
</script>

<template>
  <Layers class="size-5" />
  <Bell class="size-4" />
</template>
```

Use `size-*` for square icons in page-level markup. Icons inherit current text color by default.

## Icons inside shadcn-vue UI components

When placing icons **inside** `Button`, `InputGroup`, or other shadcn-vue primitives, follow the **`shadcn-vue` skill** icon rules (e.g. `data-icon="inline-start"` on icons in `Button`).

If a page-level icon sits **outside** a shadcn-vue primitive (e.g. next to a `CardTitle`), explicit `size-*` is fine.

## `components.json` icon library

CLI-added shadcn-vue components use **`lucide`** per `components.json` `iconLibrary` (`@lucide/vue`).

## Accessibility

- Icon-only buttons: always set `aria-label` on the `Button`
- Decorative icons adjacent to visible text: no extra label needed
- Meaningful standalone icons: provide visible text or `aria-label` on the interactive parent

## Do not

- Mix icon libraries in the same button without reason
- Wrap icons in unnecessary `<span>` wrappers for spacing — use `gap-*` on the flex parent
