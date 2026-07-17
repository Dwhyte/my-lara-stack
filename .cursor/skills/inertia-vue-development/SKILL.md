---
name: inertia-vue-development
description: Develops Inertia.js v3 Vue client-side applications. Activates when creating Vue pages, forms, or navigation; using Link, Form, useForm, setLayoutProps, or router; working with deferred props, prefetching, optimistic updates, instant visits, or polling; or when user mentions Vue with Inertia, Vue pages, Vue forms, or Vue navigation.
---

# Inertia Vue Development

## When to Use

Activate when working on:

- Vue pages in `resources/js/pages/*.vue`
- Inertia `<Link>`, `<Form>`, `useForm`, `usePage`, `router`
- Layout assignment via `defineOptions({ layout })`
- Deferred props, prefetching, polling, optimistic updates

## Project Conventions

- Entry: `resources/js/app.ts` using `createInertiaApp` from `@inertiajs/vue3`
- Pages resolve from `./pages/${name}.vue` via `resolvePageComponent`
- Layout: `defineOptions({ layout: AppLayout })` on page components (see `DemoA.vue`)
- Shared props typed in `resources/js/types/inertia.ts` (`AppSharedProps`)
- Route URLs: import from `@/actions/` or `@/routes/` (Wayfinder)
- SFC order: `<script setup>` → `<template>` → `<style>`

## Page Component Pattern

```vue
<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import type { AppSharedProps } from '@/types/inertia';

defineOptions({
    layout: AppLayout,
});

type PageProps = AppSharedProps & {
    message?: string;
};

defineProps<PageProps>();
</script>

<template>
    <Head title="My Page" />
    <div>{{ message }}</div>
</template>
```

## Navigation

```vue
<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { demoB } from '@/actions/App/Http/Controllers/DemoController';
import { Button } from '@/components/ui/button';
</script>

<template>
    <Button as-child>
        <Link :href="demoB.url()">Go to Demo B</Link>
    </Button>
</template>
```

## Forms

```vue
<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import store from '@/actions/...';
</script>

<template>
    <Form v-bind="store.form()" reset-on-success>
        <template #default="{ processing, errors }">
            <input name="email" />
            <p v-if="errors.email">{{ errors.email }}</p>
            <button :disabled="processing">Save</button>
        </template>
    </Form>
</template>
```

## State Management: Pinia vs Inertia props

Choose the source of truth deliberately.

### Use Inertia props for server-owned data

- Database records, auth user, flags computed on the server, anything that must survive a reload or be shareable via URL.
- Read from page props or `usePage().props`; mutate via `router`, `useForm`, or `<Form>`.
- Let the Inertia response refresh props after a write — the server stays the single source of truth.

```vue
<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';

const page = usePage();
const auth = page.props.auth;
</script>
```

### Use Pinia for client-only UI state

- Ephemeral UI that never belongs on the server: modal/drawer open, wizard step, sidebar collapse, filters, counters, optimistic flags.
- Stores live in `resources/js/stores/` as `defineStore` modules (see `use-demo-store.ts`).
- Pinia integrates natively with Vue DevTools — named stores, state, actions, and time-travel without extra middleware.

```ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDemoStore = defineStore('demo', () => {
    const toastCount = ref(0);
    const incrementToastCount = () => { toastCount.value += 1; };
    return { toastCount, incrementToastCount };
});
```

See `resources/js/stores/use-demo-store.ts` for a working example.

## Do Not

- Use Vue Router — Inertia handles routing via Laravel
- Hardcode URLs — use Wayfinder
- Use React or Zustand patterns — this project is Vue + shadcn-vue + Pinia
- Copy Inertia props into a Pinia store, or persist server data client-side to skip a request

## Documentation

Use Laravel Boost `search-docs` for Inertia v3 Vue-specific guidance before implementing new patterns.
