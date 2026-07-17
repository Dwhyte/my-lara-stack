<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to ensure the best experience when building Laravel applications.

## Foundational Context

This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.4
- inertiajs/inertia-laravel (INERTIA_LARAVEL) - v3
- laravel/fortify (FORTIFY) - v1
- laravel/framework (LARAVEL) - v13
- laravel/prompts (PROMPTS) - v0
- laravel/wayfinder (WAYFINDER) - v0
- laravel/boost (BOOST) - v2
- laravel/mcp (MCP) - v0
- laravel/pail (PAIL) - v1
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- pestphp/pest (PEST) - v4
- phpunit/phpunit (PHPUNIT) - v12
- @inertiajs/vue3 (INERTIA_VUE) - v3
- vue (VUE) - v3
- tailwindcss (TAILWINDCSS) - v4
- shadcn-vue (SHADCN_VUE) - latest
- @lucide/vue (LUCIDE) - v1
- pinia (PINIA) - v3
- @laravel/vite-plugin-wayfinder (WAYFINDER_VITE) - v0
- eslint (ESLINT) - v9
- prettier (PRETTIER) - v3

## Skills Activation

This project has domain-specific skills available in `.cursor/skills/` and `.agents/skills/`. You MUST activate the relevant skill whenever you work in that domain—don't wait until you're stuck.

- `laravel-best-practices` — Apply when writing, reviewing, or refactoring Laravel PHP code.
- `wayfinder-development` — Use when frontend code calls backend routes or controller actions.
- `pest-testing` — Use when writing, editing, fixing, or refactoring Pest tests.
- `inertia-vue-development` — Use when creating Vue pages, forms, or navigation with Inertia.
- `tailwindcss-development` — Use when adding or fixing Tailwind CSS utility classes in Vue SFCs.
- `app-ui` — Use when building or styling Vue UI: tokens, spacing, typography, icons, matching designs. Project-specific layer on top of shadcn-vue.
- `shadcn-vue` skill — Use when installing, composing, or customizing shadcn-vue components (generic library rules in `.agents/skills/shadcn-vue/`).

=== .ai/vue-shadcn-navigation rules ===

# Vue + shadcn-vue + Inertia navigation

This app uses **Inertia Vue 3** (no Vue Router). Use Inertia `<Link>` for in-app navigation and shadcn-vue `<Button as-child>` when you need button styling on links.

## Do

- Use **`<Link :href="route.url()">`** from `@inertiajs/vue3` for in-app navigation.
- Use **`<Button as-child><Link :href="..." /></Button>`** for styled navigation buttons.
- Import route URLs from Wayfinder: `@/actions/...` or `@/routes/...`.
- Use shadcn-vue components from `@/components/ui/*` before building custom UI.
- Use `@lucide/vue` for icons in pages and components.

## Avoid

- Hardcoding URLs — use Wayfinder-generated route functions.
- Wrapping `<button>` inside `<Link>` without `as-child` (invalid nesting).
- Adding React or Vuetify patterns — this stack is Vue + shadcn-vue.

## Non-GET actions

Use Inertia **`Link`** with **`method`**, **`router.post`**, or **`useForm`** — not plain anchor tags.

## Layouts

Pages live in `resources/js/pages/*.vue`. Assign layouts via `defineOptions({ layout: AppLayout })` (see `DemoA.vue`). Default shell is `AppLayout`.

## Theming

Dark mode toggles the `.dark` class on `<html>` via `useAppearance` in `resources/js/composables/use-appearance.ts`. shadcn-vue CSS variables in `resources/css/app.css` drive light/dark surfaces. Brand intent and token guidance: `.ai/design/brand.md` and the **`app-ui` skill**.

## State management: Pinia vs Inertia props

Default to **Inertia props for server-owned data**; reach for **Pinia only for client-only UI state**.

### Use Inertia props (not a store)

- Data owned by the database or the request (users, records, auth, flags computed server-side).
- Anything that must survive a full reload, be shareable via URL, or stay in sync with the backend.
- Get it from `usePage().props` or page component props; mutate it via `router`, `useForm`, or `<Form>` so the server stays the source of truth.
- After a successful write, let the Inertia response refresh props — do not mirror server data into a store.

### Use Pinia (client-only UI state)

- Ephemeral UI that never belongs on the server: modal/drawer open state, multi-step wizard position, sidebar collapse, unsaved filter/toggle state, counters, optimistic UI flags.
- Cross-component UI state that would otherwise be awkward prop-drilling.
- Stores live in `resources/js/stores/` as `defineStore` modules (see `resources/js/stores/use-demo-store.ts`).
- Pinia integrates natively with Vue DevTools — named stores, state, actions, and time-travel without extra middleware.

### Avoid

- Copying Inertia props into a Pinia store (creates two sources of truth that drift).
- Persisting server data client-side to "avoid a request" — re-fetch via Inertia instead.

=== foundation rules continued ===

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts

- Do not create verification scripts or tinker when tests cover that functionality and prove they work. Unit and feature tests are more important.

## Application Structure & Architecture

- Stick to existing directory structure; don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling

- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `pnpm run build`, `pnpm run dev`, or `composer run dev`. Ask them.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

## Replies

- Be concise in your explanations - focus on what's important rather than explaining obvious details.

=== boost rules ===

# Laravel Boost

## Tools

- Laravel Boost is an MCP server with tools designed specifically for this application. Prefer Boost tools over manual alternatives like shell commands or file reads.
- Use `database-query` to run read-only queries against the database instead of writing raw SQL in tinker.
- Use `database-schema` to inspect table structure before writing migrations or models.
- Use `get-absolute-url` to resolve the correct scheme, domain, and port for project URLs. Always use this before sharing a URL with the user.
- Use `browser-logs` to read browser logs, errors, and exceptions. Only recent logs are useful, ignore old entries.

## Searching Documentation (IMPORTANT)

- Always use `search-docs` before making code changes. Do not skip this step. It returns version-specific docs based on installed packages automatically.
- Pass a `packages` array to scope results when you know which packages are relevant.
- Use multiple broad, topic-based queries: `['rate limiting', 'routing rate limiting', 'routing']`. Expect the most relevant results first.
- Do not add package names to queries because package info is already shared. Use `test resource table`, not `filament 4 test resource table`.

### Search Syntax

1. Use words for auto-stemmed AND logic: `rate limit` matches both "rate" AND "limit".
2. Use `"quoted phrases"` for exact position matching: `"infinite scroll"` requires adjacent words in order.
3. Combine words and phrases for mixed queries: `middleware "rate limit"`.
4. Use multiple queries for OR logic: `queries=["authentication", "middleware"]`.

## Artisan

- Run Artisan commands directly via the command line (e.g., `php artisan route:list`). Use `php artisan list` to discover available commands and `php artisan [command] --help` to check parameters.
- Inspect routes with `php artisan route:list`. Filter with: `--method=GET`, `--name=users`, `--path=api`, `--except-vendor`, `--only-vendor`.
- Read configuration values using dot notation: `php artisan config:show app.name`, `php artisan config:show database.default`. Or read config files directly from the `config/` directory.

## Tinker

- Execute PHP in app context for debugging and testing code. Do not create models without user approval, prefer tests with factories instead. Prefer existing Artisan commands over custom tinker code.
- Always use single quotes to prevent shell expansion: `php artisan tinker --execute 'Your::code();'`
  - Double quotes for PHP strings inside: `php artisan tinker --execute 'User::where("active", true)->count();'`

=== php rules ===

# PHP

- Always use curly braces for control structures, even for single-line bodies.
- Use PHP 8 constructor property promotion: `public function __construct(public GitHub $github) { }`. Do not leave empty zero-parameter `__construct()` methods unless the constructor is private.
- Use explicit return type declarations and type hints for all method parameters: `function isAccessible(User $user, ?string $path = null): bool`
- Use TitleCase for Enum keys: `FavoritePerson`, `BestLake`, `Monthly`.
- Prefer PHPDoc blocks over inline comments. Only add inline comments for exceptionally complex logic.
- Use array shape type definitions in PHPDoc blocks.

=== deployments rules ===

# Deployment

- Laravel can be deployed using [Laravel Cloud](https://cloud.laravel.com/), which is the fastest way to deploy and scale production Laravel applications.

=== herd rules ===

# Laravel Herd

- The application is served by Laravel Herd at `https?://[kebab-case-project-dir].test`. Use the `get-absolute-url` tool to generate valid URLs. Never run commands to serve the site. It is always available.
- Use the `herd` CLI to manage services, PHP versions, and sites (e.g. `herd sites`, `herd services:start <service>`, `herd php:list`). Run `herd list` to discover all available commands.

=== tests rules ===

# Test Enforcement

- Every change must be programmatically tested. Write a new test or update an existing test, then run the affected tests to make sure they pass.
- Run the minimum number of tests needed to ensure code quality and speed. Use `php artisan test --compact` with a specific filename or filter.

=== inertia-laravel/core rules ===

# Inertia

- Inertia creates fully client-side rendered SPAs without modern SPA complexity, leveraging existing server-side patterns.
- Components live in `resources/js/pages` (unless specified in `vite.config.js`). Use `Inertia::render()` for server-side routing instead of Blade views.
- ALWAYS use `search-docs` tool for version-specific Inertia documentation and updated code examples.
- IMPORTANT: Activate `inertia-vue-development` when working with Inertia Vue client-side patterns.

=== inertia-vue/core rules ===

# Inertia + Vue

- Pages are Vue SFCs in `resources/js/pages/*.vue`.
- Use `<Link>` and `<Form>` from `@inertiajs/vue3` for navigation and forms.
- Use `useForm`, `usePage`, `router`, and `useHttp` from `@inertiajs/vue3` for client-side data flows.
- IMPORTANT: Activate `inertia-vue-development` when working with Inertia Vue patterns.

=== shadcn-vue/core rules ===

# shadcn-vue

- Components live in `resources/js/components/ui/`.
- Add components with `pnpm dlx shadcn-vue@latest add <name>`.
- Use `cn()` from `@/lib/utils` for conditional class names.
- Theme uses CSS variables in `resources/css/app.css` (Reka Vega style, Neutral palette, Inter font).
- IMPORTANT: Activate the shadcn-vue skill when installing or composing shadcn-vue components.

# Inertia v3

- Use all Inertia features from v1, v2, and v3. Check the documentation before making changes to ensure the correct approach.
- New v3 features: standalone HTTP requests (`useHttp` hook), optimistic updates with automatic rollback, layout props (`useLayoutProps` hook), instant visits, simplified SSR via `@inertiajs/vite` plugin, custom exception handling for error pages.
- Carried over from v2: deferred props, infinite scroll, merging props, polling, prefetching, once props, flash data.
- When using deferred props, add an empty state with a pulsing or animated skeleton.
- Axios has been removed. Use the built-in XHR client with interceptors, or install Axios separately if needed.
- `Inertia::lazy()` / `LazyProp` has been removed. Use `Inertia::optional()` instead.
- Prop types (`Inertia::optional()`, `Inertia::defer()`, `Inertia::merge()`) work inside nested arrays with dot-notation paths.
- SSR works automatically in Vite dev mode with `@inertiajs/vite` - no separate Node.js server needed during development.
- Event renames: `invalid` is now `httpException`, `exception` is now `networkError`.
- `router.cancel()` replaced by `router.cancelAll()`.
- The `future` configuration namespace has been removed - all v2 future options are now always enabled.

=== laravel/core rules ===

# Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using `php artisan list` and check their parameters with `php artisan [command] --help`.
- If you're creating a generic PHP class, use `php artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Model Creation

- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `php artisan make:model --help` to check the available options.

## APIs & Eloquent Resources

- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

## URL Generation

- When generating links to other pages, prefer named routes and the `route()` function.

## Testing

- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] {name}` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

## Vite Error

- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `pnpm run build` or ask the user to run `pnpm run dev` or `composer run dev`.

=== wayfinder/core rules ===

# Laravel Wayfinder

Use Wayfinder to generate TypeScript functions for Laravel routes. Import from `@/actions/` (controllers) or `@/routes/` (named routes).

=== pint/core rules ===

# Laravel Pint Code Formatter

- If you have modified any PHP files, you must run `vendor/bin/pint --dirty --format agent` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test --format agent`, simply run `vendor/bin/pint --format agent` to fix any formatting issues.

=== pest/core rules ===

## Pest

- This project uses Pest for testing. Create tests: `php artisan make:test --pest {name}`.
- The `{name}` argument should not include the test suite directory. Use `php artisan make:test --pest SomeFeatureTest` instead of `php artisan make:test --pest Feature/SomeFeatureTest`.
- Run tests: `php artisan test --compact` or filter: `php artisan test --compact --filter=testName`.
- Do NOT delete tests without approval.

</laravel-boost-guidelines>
