# my-lara-stack

A production-ready **Laravel** + **Inertia.js** + **Vue** starter kit: **Tailwind CSS v4**, **Vuetify**, **Iconify**, **Wayfinder**, **Fortify** auth, shared **design tokens**, **AI-assisted development** via **Laravel Boost** and **MCP**, and local dev on **[Laravel Herd](https://herd.laravel.com/)**—no Docker required.

## What’s included

| Feature | Details |
| -------- | -------- |
| **Inertia.js v3** | Server-driven SPA — Vue pages rendered from Laravel controllers |
| **Vue 3** | Composition API + `<script setup>` |
| **Vite** | Fast dev server with HMR, hashed production builds |
| **Tailwind CSS v4** | Utility-first styling via `@tailwindcss/vite` |
| **Vuetify** | Material components + shared Iconify icon set for `v-icon` |
| **Iconify** | `@iconify/vue` + Vuetify `iconify` set (`lucide:*`, `mdi:*`, …) |
| **Wayfinder** | Type-safe route and controller URLs in TypeScript (`@/actions`, `@/routes`) |
| **Design tokens** | Single source in `resources/js/theme/tokens.ts`; Vuetify `--v-theme-*` + Tailwind `@theme` stay aligned |
| **Dark / light mode** | `useAppearance` (Tailwind `html.dark`) + Vuetify `theme.change()` synced in `AppLayout`; inset switch on Demo A |
| **Laravel Fortify** | Auth scaffolding (login, registration, 2FA, email verification, etc.) |
| **Pest** | Feature and unit tests |
| **Laravel Pint** | PHP code style (`composer run lint`) |
| **Laravel Pail** | Log tailing (optional; `composer run dev` stack) |
| **Demo pages** | `/demo/a` → `/demo/b` Inertia flow + `DemoController` server props; `/` redirects to `/demo/a` |
| **Laravel Boost** | Dev dependency: docs search, app-aware tooling, `boost:update` on `composer update` |
| **Laravel MCP** | Pulled in with Boost — [Model Context Protocol](https://modelcontextprotocol.io/) for AI/editor integrations |
| **AGENTS.md** | Project guidelines for AI assistants (stack versions, conventions, Boost usage) |
| **Cursor** | `.cursor/rules`, skills, and MCP config for consistent workflows in Cursor |

Docker is **not** required. Add Compose or Sail later if your team wants containerized services.

## AI-assisted development (ready to use)

This stack is set up so coding agents and assistants can work **with** your app, not against it:

- **[Laravel Boost](https://github.com/laravel/boost)** — Curated Laravel context, version-aware documentation search, and tooling that understands your installed packages. Run `php artisan boost:update` after `composer update` (already wired in `composer.json`).
- **Laravel MCP** — Lets compatible clients expose tools such as Artisan-aware helpers, schema-aware queries, and project URLs. Configure your editor (e.g. Cursor MCP) to use the Boost/MCP server as documented for your environment.
- **`AGENTS.md`** — Single entry point describing stack versions, skills, and Boost rules (keep it in sync when you ship major upgrades).
- **`.cursor/`** — Rules and skills (Wayfinder, Inertia, Tailwind, Pest, Laravel practices) so prompts stay on-rails.

When you add new AI-specific config, prefer **documenting the workflow** in `AGENTS.md` or your team wiki so the team and agents stay aligned.

## Requirements

- PHP **8.3+** (Herd can manage versions)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) and **pnpm** (or npm/yarn if you prefer)

## Development (Herd)

1. Clone the repository and enter the project directory.
2. Install PHP dependencies: `composer install`
3. Copy environment file: `cp .env.example .env` — then `php artisan key:generate`
4. Create the app database (SQLite or MySQL/Postgres) and run `php artisan migrate`
5. Install JS dependencies: `pnpm install`
6. Generate Wayfinder bindings: `php artisan wayfinder:generate`
7. Start the Vite dev server: `pnpm dev`

Serve the app with **Herd** (recommended): link or park the project so it is available at a `*.test` domain (for example `https://my-lara-stack.test`). Vite runs separately for HMR.

Optional all-in-one (uses `php artisan serve` instead of Herd):

```bash
composer run dev
```

## Demo pages

Two Inertia demos mirror a classic “stack overview → server props” flow:

| URL | Page | Notes |
| ----- | ------ | ------ |
| `/` | Redirect | Redirects to `/demo/a` |
| `/demo/a` | `DemoA` | Stack overview; **dark mode** inset switch; link to Demo B |
| `/demo/b` | `DemoB` | Props `message` and `timestamp` from `DemoController` |

Controllers: `app/Http/Controllers/DemoController.php`.  
Vue pages: `resources/js/pages/DemoA.vue`, `resources/js/pages/DemoB.vue`.

## Design tokens (Vuetify + Tailwind)

1. **Edit** `resources/js/theme/tokens.ts` — `lightThemeColors` and `darkThemeColors` (hex strings). Add a key here when you need a new semantic color in both stacks.
2. **Vuetify** injects `--v-theme-{name}` on the active `.v-theme--light` / `.v-theme--dark` root (keep `theme.utilities: true` in `plugins/vuetify.ts` so `text-primary` / `bg-primary` helpers work on components).
3. **Tailwind** maps the same names in `resources/css/app.css` inside `@theme` as `--color-{name}: rgb(var(--v-theme-{name}))`. Use utilities such as `bg-primary`, `text-secondary`, `border-error`, etc.
4. **Brand aliases** — `--color-brand-primary` / `--color-brand-secondary` point at `primary` and `secondary` so gradients and legacy `brand-*` utilities stay aligned.

`:root` app-shell variables in `app.css` that reference `rgb(var(--v-theme-primary))` update automatically when you change tokens.

## Project structure

```
app/Http/Controllers/     # HTTP controllers (including Inertia responses)
bootstrap/                  # Application bootstrap, middleware
config/                     # Configuration
database/                   # Migrations, factories, seeders
public/                     # Web root (built assets, index.php)
resources/
  css/                      # Tailwind / global CSS entrypoints
  js/
    actions/                # Generated Wayfinder controller helpers (gitignored)
    pages/                  # Inertia Vue pages
    plugins/                # Vuetify, toast, etc.
    theme/                  # Design tokens (semantic colors for Vuetify + Tailwind)
    routes/                 # Generated Wayfinder routes (gitignored)
routes/                     # Route definitions (web.php, settings, …)
tests/                      # Pest tests
AGENTS.md                   # AI / agent guidelines for this repo
```

After changing routes or controller method signatures, run `php artisan wayfinder:generate` so TypeScript stays in sync (or rely on the Vite Wayfinder plugin during `pnpm dev`).

## Scripts

| Command | Purpose |
| -------- | -------- |
| `pnpm dev` | Vite dev server |
| `pnpm build` | Production frontend build |
| `pnpm run lint` / `pnpm run format` | ESLint / Prettier |
| `php artisan test` | Run tests |
| `composer run lint` | Laravel Pint (PHP style) |
| `php artisan boost:update` | Refresh Boost / AI guidance data (also runs on `composer update`) |

## Learn more

- [Laravel](https://laravel.com/docs)
- [Laravel Boost](https://github.com/laravel/boost)
- [Inertia.js](https://inertiajs.com/)
- [Vue](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Iconify](https://iconify.design/)
- [Laravel Herd](https://herd.laravel.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
