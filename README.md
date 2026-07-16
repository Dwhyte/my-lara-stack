# my-lara-stack

A production-ready **Laravel** + **Inertia.js** + **React** starter kit: **Tailwind CSS v4**, **shadcn/ui**, **Wayfinder**, **Fortify** auth, **Zustand** for client UI state, **AI-assisted development** via **Laravel Boost** and **MCP**, and local dev on **[Laravel Herd](https://herd.laravel.com/)** — no Docker required.

## Using this as a template

1. **Publish on GitHub** — In the repository **Settings → General**, enable **Template repository**. Others can use **Use this template** → **Create a new repository** to start a fresh project without fork history ([GitHub docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)).
2. **After generating a new repo** — Follow [Development (Herd)](#development-herd) below: install dependencies, copy `.env`, migrate, and regenerate Wayfinder. Generated paths (`resources/js/actions`, `resources/js/routes`, `resources/js/wayfinder`) are **not** committed; run `php artisan wayfinder:generate` after clone (or `pnpm dev` / `pnpm build`, which run the generator via Vite).
3. **Rename for your product** — Set `APP_NAME` in `.env`, adjust `config/app.php` / `composer.json` name if you like, and point [Herd](https://herd.laravel.com/) (or your host) at the new site URL.

## What's included

| Feature | Details |
| -------- | -------- |
| **Laravel 13** | Streamlined app structure, Fortify auth, settings routes |
| **Inertia.js v3** | Server-driven SPA — React pages rendered from Laravel controllers |
| **React 19** | Function components, TypeScript, Vite HMR |
| **Vite 8** | Fast dev server with HMR, hashed production builds |
| **Tailwind CSS v4** | Utility-first styling via `@tailwindcss/vite` |
| **shadcn/ui v4** | Accessible, composable UI (Mira style, Neutral palette) in `resources/js/components/ui/` |
| **Lucide React** | Icons in pages and feature components |
| **Sonner** | Toast notifications (wired in `app.tsx`) |
| **Zustand** | Client-only UI state; Inertia props for server-owned data |
| **Wayfinder** | Type-safe route and controller URLs in TypeScript (`@/actions`, `@/routes`) |
| **Design tokens** | OKLCH CSS variables in `resources/css/app.css`; brand reference in `.ai/design/brand.md` |
| **Dark / light mode** | `useAppearance` toggles `.dark` on `<html>`; shadcn semantic tokens flip automatically |
| **Laravel Fortify** | Auth scaffolding (login, registration, 2FA, email verification, etc.) |
| **Pest v4** | Feature, unit, and browser tests (Playwright) |
| **Laravel Pint** | PHP code style (`composer run lint`) |
| **Laravel Pail** | Log tailing (optional; `composer run dev` stack) |
| **Demo pages** | `/demo/a` → `/demo/b` Inertia flow, dark mode toggle, Sonner toast, Zustand counter |
| **Laravel Boost** | Dev dependency: docs search, app-aware tooling, `boost:update` on `composer update` |
| **Laravel MCP** | [Model Context Protocol](https://modelcontextprotocol.io/) for AI/editor integrations |
| **AGENTS.md** | Project guidelines for AI assistants (stack versions, conventions, Boost usage) |
| **Cursor** | `.cursor/rules`, skills (`app-ui`, Inertia React, Wayfinder, Pest, …), and MCP config |

Docker is **not** required. Add Compose or Sail later if your team wants containerized services.

## AI-assisted development

This stack is set up so coding agents and assistants can work **with** your app, not against it:

- **[Laravel Boost](https://github.com/laravel/boost)** — Curated Laravel context, version-aware documentation search, and tooling that understands your installed packages. Run `php artisan boost:update` after `composer update` (already wired in `composer.json`).
- **Laravel MCP** — Lets compatible clients expose tools such as Artisan-aware helpers, schema-aware queries, and project URLs. Configure your editor (e.g. Cursor MCP) to use the Boost/MCP server as documented for your environment.
- **`AGENTS.md`** — Single entry point describing stack versions, skills, and Boost rules (keep it in sync when you ship major upgrades).
- **`.cursor/`** — Rules and skills so prompts stay on-rails:
  - **`app-ui`** — Project design system: shadcn-first, tokens, spacing, typography
  - **`shadcn`** (`.agents/skills/shadcn/`) — Generic shadcn/ui composition and CLI rules
  - **Inertia React**, **Wayfinder**, **Tailwind**, **Pest**, **Laravel best practices**
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
4. Create the app database (SQLite or MySQL/Postgres) and run `php artisan migrate`
5. Install JS dependencies: `pnpm install`
6. Generate Wayfinder bindings: `php artisan wayfinder:generate`
7. Start the Vite dev server: `pnpm dev`

Serve the app with **Herd** (recommended): link or park the project so it is available at a `*.test` domain (for example `https://my-lara-stack.test`). Vite runs separately for HMR.

Optional all-in-one (uses `php artisan serve` instead of Herd):

```bash
composer run dev
```

Fresh setup in one command:

```bash
composer run setup
```

## Demo pages

Two Inertia demos mirror a classic “stack overview → server props” flow:

| URL | Page | Notes |
| ----- | ------ | ------ |
| `/` | Redirect | Redirects to `/demo/a` |
| `/demo/a` | `DemoA` | Stack overview; dark mode switch; Sonner toast + Zustand counter; link to Demo B |
| `/demo/b` | `DemoB` | Props `message` and `timestamp` from `DemoController` |

Controller: `app/Http/Controllers/DemoController.php`.  
React pages: `resources/js/pages/DemoA.tsx`, `resources/js/pages/DemoB.tsx`.

## Frontend conventions

### Inertia + React

- Entry: `resources/js/app.tsx`
- Pages: `resources/js/pages/*.tsx` — assign layouts via `Page.layout` (see `DemoA.tsx`)
- In-app navigation: `<Link href={route.url()}>` from `@inertiajs/react`
- Styled links: `<Button asChild><Link href={...} /></Button>`
- Route URLs: import from `@/actions/` or `@/routes/` (Wayfinder)

### shadcn/ui

Components live in `resources/js/components/ui/`. Add new ones with:

```bash
pnpm dlx shadcn@latest add dialog tabs input
```

Config: `components.json` (Mira style, Neutral base color). For composition rules (forms, overlays, spacing), see `.agents/skills/shadcn/` and the **`app-ui`** skill.

### Client state (Zustand)

Use **Zustand** for ephemeral client-only UI state: modal open/closed, wizard step, sidebar collapse, toast counters, optimistic toggles. **Do not** mirror server-owned data (users, records, auth) in a store — use Inertia props and refresh via `router` / `useForm` / `<Form>`.

Stores live in `resources/js/stores/use-*-store.ts`. Example: `use-demo-store.ts` (toast counter on Demo A).

#### DevTools

- **Redux DevTools** (browser extension): demo store registers as `DemoStore` with named actions (`incrementToastCount`, `reset`). Enabled in development only via `devtools` middleware.
- **React DevTools**: prefer domain hooks (e.g. `useDemoToast()`) in components instead of calling `useDemoStore()` directly — each raw `useStore()` call shows as a generic `BoundStore` entry; a named hook is easier to read in the tree.

See `AGENTS.md` for the full Zustand vs Inertia props guidance.

### Design tokens

1. **Edit** `resources/css/app.css` — `:root` and `.dark` OKLCH variables, mapped to Tailwind via `@theme inline`.
2. **Use semantic utilities** — `bg-primary`, `text-muted-foreground`, `border-border`, etc. Never hardcode hex in components.
3. **Brand direction** — document intent in `.ai/design/brand.md`, then mirror values in `app.css` and `components.json`.
4. **Dark mode** — `useAppearance` in `resources/js/hooks/use-appearance.ts` toggles `.dark` on `<html>`; tokens flip automatically.

To re-apply or tweak the shadcn preset:

```bash
pnpm dlx shadcn@latest preset resolve
pnpm dlx shadcn@latest apply <code>
```

## Code style

**No narrative comments in source.** Do not add file-header docblocks or comments that explain what the code does, how it fits the architecture, or how to use DevTools — that belongs here, in `AGENTS.md`, or in `.cursor/skills/`. Code should read clearly from names and types. The **`no-narrative-comments`** Cursor rule enforces this for agents.

PHP: Laravel Pint (`composer run lint`).  
Frontend: ESLint + Prettier + TypeScript (`pnpm run lint`, `pnpm run format`, `pnpm run types:check`).

## Project structure

```
app/Http/Controllers/       # HTTP controllers (including Inertia responses)
bootstrap/                    # Application bootstrap, middleware
config/                       # Configuration
database/                     # Migrations, factories, seeders
public/                       # Web root (built assets, index.php)
resources/
  css/                        # Tailwind + shadcn theme (app.css)
  js/
    actions/                  # Generated Wayfinder controller helpers (gitignored)
    components/ui/            # shadcn/ui components
    hooks/                    # React hooks (e.g. useAppearance)
    layouts/                  # AppLayout and shared shells
    lib/                      # Utilities (cn, etc.)
    pages/                    # Inertia React pages
    routes/                   # Generated Wayfinder routes (gitignored)
    stores/                   # Zustand stores (client-only UI state)
    types/                    # Shared TypeScript types
routes/                       # Route definitions (web.php, settings.php, …)
tests/                        # Pest tests (Feature, Unit, Browser)
.ai/design/                   # Brand reference for humans and agents
.cursor/                      # Cursor rules and skills
.agents/skills/               # Upstream skills (shadcn, etc.)
AGENTS.md                     # AI / agent guidelines for this repo
components.json               # shadcn/ui CLI config
```

After changing routes or controller method signatures, run `php artisan wayfinder:generate` so TypeScript stays in sync (or rely on the Vite Wayfinder plugin during `pnpm dev`).

## Scripts

| Command | Purpose |
| -------- | -------- |
| `pnpm dev` | Vite dev server |
| `pnpm build` | Production frontend build |
| `pnpm run lint` / `pnpm run format` | ESLint / Prettier (with fix) |
| `pnpm run lint:check` / `pnpm run format:check` | CI-style lint/format checks |
| `pnpm run types:check` | TypeScript (`tsc --noEmit`) |
| `php artisan test` | Run Pest tests |
| `composer run lint` | Laravel Pint (PHP style) |
| `composer run ci:check` | Frontend checks + tests |
| `composer run setup` | Install deps, migrate, build assets |
| `php artisan boost:update` | Refresh Boost / AI guidance data (also runs on `composer update`) |
| `pnpm dlx shadcn@latest add <name>` | Add shadcn/ui components |

## Learn more

- [Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) (GitHub)
- [Laravel](https://laravel.com/docs)
- [Laravel Boost](https://github.com/laravel/boost)
- [Inertia.js](https://inertiajs.com/)
- [React](https://react.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [Laravel Herd](https://herd.laravel.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
