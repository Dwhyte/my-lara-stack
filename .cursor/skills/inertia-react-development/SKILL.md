---
name: inertia-react-development
description: Develops Inertia.js v3 React client-side applications. Activates when creating React pages, forms, or navigation; using Link, Form, useForm, useHttp, setLayoutProps, or router; working with deferred props, prefetching, optimistic updates, instant visits, or polling; or when user mentions React with Inertia, React pages, React forms, or React navigation.
---

# Inertia React Development

## When to Use

Activate when working on:

- React pages in `resources/js/pages/*.tsx`
- Inertia `<Link>`, `<Form>`, `useForm`, `usePage`, `router`, `useHttp`
- Layout assignment on page components
- Deferred props, prefetching, polling, optimistic updates

## Project Conventions

- Entry: `resources/js/app.tsx` using `createInertiaApp` from `@inertiajs/react`
- Pages resolve from `./pages/${name}.tsx` via `resolvePageComponent`
- Default layout applied in `app.tsx` resolve — override per page with `Page.layout`
- Shared props typed in `resources/js/types/inertia.ts` (`AppSharedProps`)
- Route URLs: import from `@/actions/` or `@/routes/` (Wayfinder)

## Page Component Pattern

```tsx
import { Head, Link } from '@inertiajs/react';
import type { AppSharedProps } from '@/types/inertia';

type PageProps = AppSharedProps & {
    message?: string;
};

export default function MyPage({ message }: PageProps) {
    return (
        <>
            <Head title="My Page" />
            <div>{message}</div>
        </>
    );
}
```

## Navigation

```tsx
import { Link } from '@inertiajs/react';
import { demoB } from '@/actions/App/Http/Controllers/DemoController';
import { Button } from '@/components/ui/button';

<Button asChild>
    <Link href={demoB.url()}>Go to Demo B</Link>
</Button>
```

## Forms

```tsx
import { Form } from '@inertiajs/react';
import store from '@/actions/...';

<Form {...store.form()} resetOnSuccess>
    {({ processing, errors }) => (
        <>
            <input name="email" />
            {errors.email && <p>{errors.email}</p>}
            <button disabled={processing}>Save</button>
        </>
    )}
</Form>
```

## Layout Override

```tsx
import AppLayout from '@/layouts/AppLayout';

export default function MyPage() {
    return <div>...</div>;
}

MyPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
```

## State Management: Zustand vs Inertia props

Choose the source of truth deliberately.

### Use Inertia props for server-owned data

- Database records, auth user, flags computed on the server, anything that must survive a reload or be shareable via URL.
- Read from page props or `usePage().props`; mutate via `router`, `useForm`, or `<Form>`.
- Let the Inertia response refresh props after a write — the server stays the single source of truth.

```tsx
import { usePage } from '@inertiajs/react';

const { auth } = usePage().props;
```

### Use Zustand for client-only UI state

- Ephemeral UI that never belongs on the server: modal/drawer open, wizard step, sidebar collapse, filters, counters, optimistic flags.
- Stores live in `resources/js/stores/` as `use-*-store.ts`. Select narrow slices to avoid extra renders.
- Wrap stores in **domain hooks** (e.g. `useDemoToast()`) so React DevTools shows a readable hook name — calling `useDemoStore()` directly twice creates two generic `BoundStore` entries (unlike Pinia, which names the store in Vue DevTools).
- Enable **Redux DevTools** (browser extension) + Zustand's `devtools` middleware for a Pinia-like action timeline and time-travel debugging. Store registers by name (e.g. `DemoStore`).

```tsx
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

export const useDemoStore = create<DemoStore>()(
    devtools(
        (set) => ({
            toastCount: 0,
            incrementToastCount: () =>
                set(
                    (state) => ({ toastCount: state.toastCount + 1 }),
                    undefined,
                    'incrementToastCount',
                ),
        }),
        { name: 'DemoStore', enabled: import.meta.env.DEV },
    ),
);

/** Use in components — shows as "useDemoToast" in React DevTools. */
export function useDemoToast() {
    return useDemoStore(
        useShallow((state) => ({
            toastCount: state.toastCount,
            incrementToastCount: state.incrementToastCount,
        })),
    );
}
```

See `resources/js/stores/use-demo-store.ts` for a working example.

## Do Not

- Use React Router — Inertia handles routing via Laravel
- Hardcode URLs — use Wayfinder
- Use Vue or Vuetify patterns — this project is React + shadcn/ui
- Copy Inertia props into a Zustand store, or persist server data client-side to skip a request

## Documentation

Use Laravel Boost `search-docs` for Inertia v3 React-specific guidance before implementing new patterns.
