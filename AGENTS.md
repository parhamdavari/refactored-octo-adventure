# AGENTS.md

Single-page Astro landing site (`src/pages/index.astro`) with Tailwind CSS theming.

## Commands

| What | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` → `localhost:4321` |
| Production build | `npm run build` → `./dist/` |
| Preview build | `npm run preview` |
| Format | `npm run format` |
| Clean | `npm run clean` |

No test suite, no linter, no CI. Format via Prettier only.

## Architecture

- `src/pages/index.astro` — sole page; imports all components and `~/styles/index.css`
- `src/components/` — all `.astro` components; no React/Vue/Svelte
- `src/content/showcase/` — JSON data files + `_images/` for the Showcase section
- `src/content/config.ts` — Astro content collection schema for showcase data
- `src/styles/theme.css` — CSS custom properties toggled by `data-theme` attr (light/dark)
- `src/styles/index.css` — entry point, imports `global.css` + `theme.css`
- `src/icons/` — SVG icons used by `astro-icon` (`Icon` component)
- `src/types.ts` — shared TypeScript interfaces (`CompatibilityItem`, `FeatureItem`, `FooterLink`, `NavItem`)

## Key conventions

- Path alias: `~/*` maps to `src/*` (configured in `tsconfig.json`)
- Theming: CSS variables in `theme.css` exposed as Tailwind classes (`text-default`, `bg-default`, `border-default`, `text-primary`, `text-secondary`, etc.)
- Font: Inter Variable (loaded via `@fontsource-variable/inter` in `index.astro`)
- Icons: `astro-icon` with `Iconify` icon sets (`mdi:*`, `fa-brands:*`); custom SVGs in `src/icons/`
- Tailwind fluid type plugin: `tailwindcss-fluid-type` — font sizes use fluid scaling, not fixed breakpoints
- `corePlugins.fontSize: false` — standard Tailwind font-size utilities are disabled; use fluid-type instead
- Prettier plugins: `prettier-plugin-astro` (parser) + `prettier-plugin-tailwindcss` (class sorting, **must** load last)
- `site` in `astro.config.mjs` is set to the Netlify deployment URL — update if deploying elsewhere

## Gotchas

- No `node_modules` currently installed — run `npm install` first
- No lockfile for pnpm/yarn — this project uses npm
- Showcase images live in `src/content/showcase/_images/` and are referenced by `image()` in the content schema
- Dark mode is default (`data-theme="dark"` in `index.astro`); theme switcher uses `localStorage` with system preference fallback

## Fundamental Guidelines

*(From [andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills))*

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```
