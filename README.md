# my-lara-stack

A production-ready **Laravel** + **Inertia.js** + **Vue 3** starter kit: **Tailwind CSS v4**, **shadcn-vue**, **Wayfinder**, **Fortify** auth, **Pinia** for client UI state, **AI-assisted development** via **Laravel Boost** and **MCP**, and local dev on **[Laravel Herd](https://herd.laravel.com/)** — no Docker required.

## Using this as a template

1. **Publish on GitHub** — In the repository **Settings → General**, enable **Template repository**. Others can use **Use this template** → **Create a new repository** to start a fresh project without fork history ([GitHub docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)).
2. **After generating a new repo** — Follow [Development (Herd)](#development-herd) below: install dependencies, copy `.env`, migrate, and regenerate Wayfinder. Generated paths (`resources/js/actions`, `resources/js/routes`, `resources/js/wayfinder`) are **not** committed; run `php artisan wayfinder:generate` after clone (or `pnpm dev` / `pnpm build`, which run the generator via Vite).
3. **Rename for your product** — Set `APP_NAME` in `.env`, adjust `config/app.php` / `composer.json` name if you like, and point [Herd](https://herd.laravel.com/) (or your host) at the new site URL.

## What's included

| Feature | Details |
| -------- | -------- |
| **Laravel 13** | Streamlined app structure, Fortify auth, settings routes |
| **Inertia.js v3** | Server-driven SPA — Vue pages rendered from Laravel controllers |
| **Vue 3** | Composition API + `<script setup>` SFCs |
| **Vite 8** | Fast dev server with HMR, hashed production builds |
| **Tailwind CSS v4** | Utility-first styling via `@tailwindcss/vite` |
| **shadcn-vue** | Accessible, composable UI (Reka Vega style, Neutral palette) in `resources/js/components/ui/` |
| **@lucide/vue** | Icons in pages and feature components |
| **vue-sonner** | Toast notifications (wired in `AppLayout.vue`) |
| **Pinia** | Client-only UI state; Inertia props for server-owned data |
| **Wayfinder** | Type-safe route and controller URLs in TypeScript (`@/actions`, `@/routes`) |
| **Design tokens** | OKLCH CSS variables in `resources/css/app.css`; brand reference in `.ai/design/brand.md` |
| **Dark / light mode** | `useAppearance` toggles `.dark` on `<html>`; shadcn-vue semantic tokens flip automatically |
| **Laravel Fortify** | Auth scaffolding (login, registration, 2FA, email verification, etc.) |
| **Laravel Reverb + Echo** | Realtime WebSocket foundation (wired at bootstrap) |
| **Pest v4** | Feature, unit, and browser tests (Playwright) |
| **Laravel Pint** | PHP code style (`composer run lint`) |
| **Laravel Pail** | Log tailing (optional; `composer run dev` stack) |
| **Demo pages** | `/demo/a` → `/demo/b` Inertia flow, dark mode toggle, Sonner toast, Pinia counter |
| **Laravel Boost** | Dev dependency: docs search, app-aware tooling, `boost:update` on `composer update` |
| **Laravel MCP** | [Model Context Protocol](https://modelcontextprotocol.io/) for AI/editor integrations |
| **AGENTS.md** | Project guidelines for AI assistants (stack versions, conventions, Boost usage) |
| **Cursor** | `.cursor/rules`, skills (`app-ui`, Inertia Vue, Wayfinder, Pest, …), and MCP config |

Docker is **not** required. Add Compose or Sail later if your team wants containerized services.

## AI-assisted development

This stack is set up so coding agents and assistants can work **with** your app, not against it:

- **[Laravel Boost](https://github.com/laravel/boost)** — Curated Laravel context, version-aware documentation search, and tooling that understands your installed packages. Run `php artisan boost:update` after `composer update` (already wired in `composer.json`).
- **Laravel MCP** — Lets compatible clients expose tools such as Artisan-aware helpers, schema-aware queries, and project URLs. Configure your editor (e.g. Cursor MCP) to use the Boost/MCP server as documented for your environment.
- **`AGENTS.md`** — Single entry point describing stack versions, skills, and Boost rules (keep it in sync when you ship major upgrades).
- **`.cursor/`** — Rules and skills so prompts stay on-rails:
  - **`app-ui`** — Project design system: shadcn-vue-first, tokens, spacing, typography
  - **`shadcn-vue`** (`.agents/skills/shadcn-vue/`) — Generic shadcn-vue composition and CLI rules
  - **Inertia Vue**, **Wayfinder**, **Tailwind**, **Pest**, **Laravel best practices**
- **`.ai/design/brand.md`** — Brand intent and preset reference for humans and agents

When you add new AI-specific config, prefer **documenting the workflow** in `AGENTS.md` or your team wiki so the team and agents stay aligned.

## Requirements

- PHP **8.3+** (Herd can manage versions)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) and **pnpm**

## Development (Herd)

1. Clone **your** copy of the repository (`git clone …`) and enter the project directory.
2. Install PHP dependencies: `composer install`
3. Copy environment file: `cp .env.example .env` — then `php artisan key:generate`
4. `php artisan reverb:install` — generates `REVERB_APP_KEY` / `REVERB_APP_SECRET` and sets `BROADCAST_CONNECTION=reverb`
5. Create the app database (SQLite or MySQL/Postgres) and run `php artisan migrate`
6. Install JS dependencies: `pnpm install`
7. Generate Wayfinder bindings: `php artisan wayfinder:generate`

**HTTP** is served by [Herd](https://herd.laravel.com/) at a `*.test` domain (for example `https://my-lara-stack.test`). Link or park the project in Herd; do not use `php artisan serve`.

**Background processes** (queue, logs, Vite, Reverb) run together via:

```bash
composer dev
```

This starts four tabbed processes — no `server` tab:

| Process | Command |
| -------- | -------- |
| queue | `php artisan queue:listen --tries=1` |
| logs | `php artisan pail` |
| vite | `pnpm run dev` |
| reverb | `php artisan reverb:start --debug` |

List registered processes: `php artisan dev:list`.

Fresh setup in one command:

```bash
composer run setup
```

Then run `php artisan reverb:install` if you used `composer run setup` before generating Reverb credentials.

## Demo pages

Two Inertia demos mirror a classic “stack overview → server props” flow:

| URL | Page | Notes |
| ----- | ------ | ------ |
| `/` | Redirect | Redirects to `/demo/a` |
| `/demo/a` | `DemoA` | Stack overview; dark mode switch; Sonner toast + Pinia counter; link to Demo B |
| `/demo/b` | `DemoB` | Props `message` and `timestamp` from `DemoController` |

Controller: `app/Http/Controllers/DemoController.php`.  
Vue pages: `resources/js/pages/DemoA.vue`, `resources/js/pages/DemoB.vue`.

## Frontend conventions

### Inertia + Vue

- Entry: `resources/js/app.ts`
- Pages: `resources/js/pages/*.vue` — assign layouts via `defineOptions({ layout: AppLayout })` (see `DemoA.vue`)
- SFC order: `<script setup>` → `<template>` → `<style>`
- In-app navigation: `<Link :href="route.url()">` from `@inertiajs/vue3`
- Styled links: `<Button as-child><Link :href="..." /></Button>`
- Route URLs: import from `@/actions/` or `@/routes/` (Wayfinder)

### shadcn-vue

Components live in `resources/js/components/ui/`. Add new ones with:

```bash
pnpm dlx shadcn-vue@latest add dialog tabs input
```

Config: `components.json` (Reka Vega style, Neutral base color). For composition rules (forms, overlays, spacing), see `.agents/skills/shadcn-vue/` and the **`app-ui`** skill.

### Client state (Pinia)

Use **Pinia** for ephemeral client-only UI state: modal open/closed, wizard step, sidebar collapse, toast counters, optimistic toggles. **Do not** mirror server-owned data (users, records, auth) in a store — use Inertia props and refresh via `router` / `useForm` / `<Form>`.

Stores live in `resources/js/stores/` as `defineStore` modules. Example: `use-demo-store.ts` (toast counter on Demo A).

Pinia integrates natively with **Vue DevTools** — named stores, state, actions, and time-travel without extra middleware.

See `AGENTS.md` for the full Pinia vs Inertia props guidance.

### Design tokens

1. **Edit** `resources/css/app.css` — `:root` and `.dark` OKLCH variables, mapped to Tailwind via `@theme inline`.
2. **Use semantic utilities** — `bg-primary`, `text-muted-foreground`, `border-border`, etc. Never hardcode hex in components.
3. **Brand direction** — document intent in `.ai/design/brand.md`, then mirror values in `app.css` and `components.json`.
4. **Dark mode** — `useAppearance` in `resources/js/composables/use-appearance.ts` toggles `.dark` on `<html>`; tokens flip automatically.

To re-apply or tweak the shadcn-vue preset:

```bash
pnpm dlx shadcn-vue@latest info --json
pnpm dlx shadcn-vue@latest apply --preset vega
```

## Code style

**No narrative comments in source.** Do not add file-header docblocks or comments that explain what the code does, how it fits the architecture, or how to use DevTools — that belongs here, in `AGENTS.md`, or in `.cursor/skills/`. Code should read clearly from names and types. The **`no-narrative-comments`** Cursor rule enforces this for agents.

PHP: Laravel Pint (`composer run lint`).  
Frontend: ESLint + Prettier + TypeScript (`pnpm run lint`, `pnpm run format`, `pnpm run types:check` via `vue-tsc`).

## Project structure

```
app/Http/Controllers/       # HTTP controllers (including Inertia responses)
bootstrap/                    # Application bootstrap, middleware
config/                       # Configuration
database/                     # Migrations, factories, seeders
public/                       # Web root (built assets, index.php)
resources/
  css/                        # Tailwind + shadcn-vue theme (app.css)
  js/
    actions/                  # Generated Wayfinder controller helpers (gitignored)
    components/ui/            # shadcn-vue components
    composables/              # Vue composables (e.g. useAppearance)
    layouts/                  # AppLayout and shared shells
    lib/                      # Utilities (cn, etc.)
    pages/                    # Inertia Vue pages
    routes/                   # Generated Wayfinder routes (gitignored)
    stores/                   # Pinia stores (client-only UI state)
    types/                    # Shared TypeScript types
routes/                       # Route definitions (web.php, settings.php, …)
tests/                        # Pest tests (Feature, Unit, Browser)
.ai/design/                   # Brand reference for humans and agents
.cursor/                      # Cursor rules and skills
.agents/skills/               # Upstream skills (shadcn-vue, etc.)
AGENTS.md                     # AI / agent guidelines for this repo
components.json               # shadcn-vue CLI config
```

After changing routes or controller method signatures, run `php artisan wayfinder:generate` so TypeScript stays in sync (or rely on the Vite Wayfinder plugin during `pnpm dev`).

## Scripts

| Command | Purpose |
| -------- | -------- |
| `pnpm dev` | Vite dev server |
| `pnpm build` | Production frontend build |
| `pnpm run lint` / `pnpm run format` | ESLint / Prettier (with fix) |
| `pnpm run lint:check` / `pnpm run format:check` | CI-style lint/format checks |
| `pnpm run types:check` | TypeScript (`vue-tsc --noEmit`) |
| `php artisan test` | Run Pest tests |
| `composer run lint` | Laravel Pint (PHP style) |
| `composer run ci:check` | Frontend checks + tests |
| `composer run setup` | Install deps, migrate, build assets |
| `composer dev` | Queue, Pail, Vite, Reverb (Herd serves HTTP) |
| `php artisan boost:update` | Refresh Boost / AI guidance data (also runs on `composer update`) |
| `pnpm dlx shadcn-vue@latest add <name>` | Add shadcn-vue components |

## Learn more

- [Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) (GitHub)
- [Laravel](https://laravel.com/docs)
- [Laravel Reverb](https://reverb.laravel.com/)
- [Laravel Boost](https://github.com/laravel/boost)
- [Inertia.js](https://inertiajs.com/)
- [Vue](https://vuejs.org/)
- [shadcn-vue](https://www.shadcn-vue.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Laravel Herd](https://herd.laravel.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
