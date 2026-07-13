# AGENTS.md

Single-page Astro landing site for **Payesh** (crypto-deposit-monitoring Telegram bot). Sole page: `src/pages/index.astro`; Tailwind CSS theming. Deployed to Cloudflare (static assets from `./dist`).

## Commands

| What             | Command                                 |
| ---------------- | --------------------------------------- |
| Install deps     | `npm install`                           |
| Dev server       | `npm run dev` → `localhost:4321`        |
| Production build | `npm run build` → `./dist/`             |
| Preview build    | `npm run preview`                       |
| Format           | `npm run format`                        |
| Clean            | `npm run clean`                         |
| Deploy           | `npx wrangler deploy` (serves `./dist`) |

No test suite, no linter, no CI. Format via Prettier only. npm only (`package-lock.json`).

## Architecture

- `src/pages/index.astro` — sole page; sets `<head>`/OG meta, composes section components (`Header`, `Splash`, `Features`, `Tutorial`, `Compatibility`, `Showcase`, `Pricing`, `Footer`), imports `~/styles/index.css`
- `src/components/` — all `.astro` components; no React/Vue/Svelte. `content-section.astro` = shared section wrapper (title + `lead` slot)
- `public/` — static assets (exchange logos, images) referenced by absolute path (`/binance.jpeg`, etc.)
- `src/styles/theme.css` — CSS custom properties (dark-only). `index.css` = entry, imports `global.css` + `theme.css`
- `src/icons/` — SVG icons used by `astro-icon` (`Icon` component)
- `src/types.ts` — shared TS interfaces (`CompatibilityItem`, `FeatureItem`, `FooterLink`, `NavItem`)

## Key conventions

- Path alias: `~/*` → `src/*` (`tsconfig.json`)
- Theming: **dark only** (`data-theme="dark"` in `index.astro`; light-mode vars removed — don't reintroduce). CSS vars in `theme.css` exposed as Tailwind classes (`text-default`, `bg-default`, `border-default`, `text-primary`, …)
- Client-side JS (theme, showcase tabs via `data-showcase-tab`) lives as inline `<script>` in its component, no shared bundle
- Font: Inter Variable (`@fontsource-variable/inter`, imported in `index.astro`)
- Icons: `astro-icon` + `Iconify` sets (`mdi:*`, `fa-brands:*`); custom SVGs in `src/icons/`
- `tailwindcss-fluid-type` plugin: font sizes fluid-scale. `corePlugins.fontSize: false` — standard font-size utilities disabled, use fluid-type
- Prettier plugins: `prettier-plugin-astro` + `prettier-plugin-tailwindcss` (**must load last**)
- `site` in `astro.config.mjs` = `https://payesh.bot/` — update if domain changes

## Fundamental Guidelines

_(Distilled from [andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills))_

- **Think first.** Surface assumptions and tradeoffs; if a request is ambiguous or a simpler approach exists, say so before coding — don't pick silently.
- **Simplicity first.** Minimum code that solves the problem. No speculative features, abstractions, config, or error handling for impossible cases.
- **Surgical changes.** Touch only what the task requires. Match existing style, don't refactor working code, remove only orphans your own change created.
- **Goal-driven.** Turn tasks into verifiable goals; state a brief plan for multi-step work.
