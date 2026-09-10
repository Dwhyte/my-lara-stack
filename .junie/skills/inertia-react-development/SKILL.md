---
name: inertia-react-development
description: "Develops Inertia.js v3 React client-side applications. Activates when creating React pages, forms, or navigation; using <Link>, <Form>, useForm, useHttp, setLayoutProps, or router; working with deferred props, prefetching, optimistic updates, instant visits, or polling; or when user mentions React with Inertia, React pages, React forms, or React navigation."
license: MIT
metadata:
  author: laravel
---

# Inertia React Development

## When to Apply

Activate this skill when:

- Creating or modifying React page components for Inertia
- Working with forms in React (using `<Form>`, `useForm`, or `useHttp`)
- Implementing client-side navigation with `<Link>` or `router`
- Using v3 features: deferred props, prefetching, optimistic updates, instant visits, layout props, HTTP requests, WhenVisible, InfiniteScroll, once props, flash data, or polling
- Building React-specific features with the Inertia protocol

## Documentation

Use `search-docs` for detailed Inertia v3 React patterns and documentation.

## Basic Usage

### Page Components Location

React page components live in `resources/js/pages` and use the `.tsx` extension.

### Page Component Structure

```tsx
type UsersIndexProps = {
    users: Array<{ id: number; name: string }>;
};

export default function UsersIndex({ users }: UsersIndexProps) {
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
```

Persistent layouts are assigned in `resources/js/app.tsx` (Demo / settings → app layout, auth → auth layout). Pages may also set `Component.layout`.

## Client-Side Navigation

### Basic Link Component

Use `<Link>` instead of traditional `<a>` tags:

```tsx
import { Link } from '@inertiajs/react';

<Link href="/">Home</Link>
<Link href="/users">Users</Link>
<Link href={`/users/${user.id}`}>View User</Link>
```

Prefer Wayfinder URLs: `href={show.url(user.id)}` from `@/actions` or `@/routes`.

### Styled links (shadcn)

```tsx
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

<Button asChild>
    <Link href={demoB.url()}>Go to Demo Page B</Link>
</Button>
```

Never nest `<button>` inside `<Link>` without `asChild`.

### Link with Method

```tsx
import { Link } from '@inertiajs/react';

<Link href="/logout" method="post" as="button">
    Logout
</Link>
```

### Prefetching

```tsx
import { Link } from '@inertiajs/react';

<Link href="/users" prefetch>
    Users
</Link>
```

### Programmatic Navigation

```tsx
import { router } from '@inertiajs/react';

router.visit('/users');

router.visit('/users', {
    method: 'post',
    data: { name: 'John' },
    onSuccess: () => undefined,
});
```

Use `router.cancelAll()` — `router.cancel()` was removed in v3.

## Form Handling

### Form Component (recommended)

```tsx
import { Form } from '@inertiajs/react';

export default function CreateUser() {
    return (
        <Form action="/users" method="post">
            {({ errors, processing, wasSuccessful }) => (
                <>
                    <input type="text" name="name" />
                    {errors.name ? <div>{errors.name}</div> : null}

                    <button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'Create User'}
                    </button>

                    {wasSuccessful ? <div>User created!</div> : null}
                </>
            )}
        </Form>
    );
}
```

With Wayfinder: `<Form {...store.form()}>` or `action={store.url()}` plus `method="post"`.

Reset helpers: `resetOnError`, `resetOnSuccess`, `setDefaultsOnSuccess`.

### `useForm` Hook

```tsx
import { useForm } from '@inertiajs/react';

export default function CreateUser() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
    });

    function submit(event: React.FormEvent): void {
        event.preventDefault();
        post('/users', {
            onSuccess: () => reset('password'),
        });
    }

    return (
        <form onSubmit={submit}>
            <input value={data.name} onChange={(event) => setData('name', event.target.value)} />
            {errors.name ? <div>{errors.name}</div> : null}
            <button type="submit" disabled={processing}>
                Create User
            </button>
        </form>
    );
}
```

### `useHttp`

For standalone XHR that should not change the Inertia page, use `useHttp` (Axios was removed in v3).

## Inertia v3 Features

### Layout Props

```tsx
import { setLayoutProps } from '@inertiajs/react';

setLayoutProps({
    title: 'Dashboard',
    showSidebar: false,
});
```

### Deferred Props

Always render a pulsing skeleton while the prop is undefined.

```tsx
export default function UsersIndex({ users }: { users?: Array<{ id: number; name: string }> }) {
    return (
        <div>
            <h1>Users</h1>
            {!users ? (
                <div className="animate-pulse">
                    <div className="bg-muted mb-2 h-4 w-3/4 rounded" />
                    <div className="bg-muted h-4 w-1/2 rounded" />
                </div>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```

### Polling

```tsx
import { usePoll } from '@inertiajs/react';

export default function Dashboard({ stats }: { stats: { activeUsers: number } }) {
    usePoll(5000);

    return <div>Active Users: {stats.activeUsers}</div>;
}
```

`autoStart` defaults to `true`. `keepAlive` defaults to `false` (throttles when the tab is hidden).

### WhenVisible

```tsx
import { WhenVisible } from '@inertiajs/react';

<WhenVisible data="stats" buffer={200} fallback={<div className="animate-pulse">Loading…</div>}>
    {({ fetching }) => (
        <div>
            <p>Total Users: {stats.total_users}</p>
            {fetching ? <span>Refreshing…</span> : null}
        </div>
    )}
</WhenVisible>
```

### InfiniteScroll

The server must use `Inertia::scroll()`. Use `search-docs` with `infinite scroll` for buffers, reverse mode, and custom triggers.

## Events

v3 renamed: `invalid` → `httpException`, `exception` → `networkError`.

## Common Pitfalls

- Using traditional `<a>` links instead of Inertia `<Link>` (breaks SPA behavior)
- Forgetting skeleton states for deferred props
- Using `<form>` without `preventDefault` (use `<Form>` or `useForm`)
- Using `router.cancel()` instead of `router.cancelAll()`
- Listening for `invalid` / `exception` instead of `httpException` / `networkError`
- Copying Inertia props into Zustand — keep server data on the page
