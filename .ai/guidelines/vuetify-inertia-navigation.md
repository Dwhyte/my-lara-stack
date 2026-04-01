# Vuetify + Inertia navigation (Brainer)

This app uses **Inertia** (no Vue Router). Vuetify `to` props expect `RouterLink`; we register **`vuetify-inertia-link`** in `resources/js/app.ts` so `v-btn`, `v-list-item`, etc. use Inertia visits and real `href` for accessibility.

## Do

- Use **`:to="path"`** on Vuetify components for in-app navigation; rely on the shim for clicks and URL preview.
- Keep **explicit active state** for the home route when needed: `isNavActive(link)` uses exact match for `/` and `startsWith` for other paths (the link helper alone treats `/` as a prefix of every URL).
- Use Inertia **`<Link>`** with **`instant`** / **`component`** only where instant visits matter; Vuetify `:to` cannot pass `instant` without extending the shim.

## Avoid

- Wrapping **`<Link>`** around **`v-btn`** (invalid `<a><button>` nesting and broken styles).
- Using **`v-btn :to`** expecting Vue Router — use the registered Inertia-compatible `RouterLink` instead.

## Non-GET actions

Use Inertia **`Link`** with **`method`**, **`router.post`**, or **`useForm`** — not Vuetify `to` (e.g. logout).

## Layout props (`AppLayout`)

`AppLayout` declares **`showAppShell`** (default `true`). Pages can call **`setLayoutProps({ showAppShell: false })`** to hide the app bar, sidebar, and mobile menu for a full-bleed view. Inertia resets layout props on navigation when state is not preserved.
