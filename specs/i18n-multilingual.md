# Spec: Multilingual Site (English + Tehran Persian)

Status: **Implemented** — all phases landed; pending stakeholder review of Persian copy + manual RTL visual pass.

## Objective

Make the Payesh landing site bilingual: keep the existing English site and add a
fluent **Tehran Persian (fa-IR)** version targeting users in Iran.

- **Who:** Iranian crypto users browsing from Iran (Persian), plus the existing
  international/English audience.
- **Success:** A visitor from Iran lands on the Persian site automatically; every
  section renders correct RTL Persian with a proper Persian webfont; an English
  visitor is unaffected (same URLs, same content); either visitor can switch
  language manually and stay on the equivalent page.

### Decisions (locked with stakeholder)

| Question           | Decision                                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URL structure      | English at root `/`, Persian at `/fa/`. Existing English URLs unchanged.                                                                                      |
| Language detection | **Cloudflare geo redirect**: `CF-IPCountry: IR` → `/fa/`. Plus a manual switcher.                                                                             |
| Persian copy       | **I write** the strings — fluent, natural Tehran Persian for every section, matched to the crypto/Telegram-bot product tone. Stakeholder reviews before ship. |
| Scope              | Full site, both languages — all 8 sections + `<head>` meta.                                                                                                   |

## Tech Stack

- Astro 4.16 (static) — **built-in i18n routing**, no external i18n library.
- Tailwind 3.4 + `tailwindcss-fluid-type` (dark-only theme — do not reintroduce light vars).
- `@fontsource-variable/inter` (Latin) + **new** `@fontsource-variable/vazirmatn` (Persian).
- Deploy: Cloudflare **Workers static assets** (`wrangler.jsonc`, `assets.directory: ./dist`).
  Geo redirect implemented via a `main` Worker with an `ASSETS` binding.

## Commands

```
Install deps: npm install
Add Persian font: npm install @fontsource-variable/vazirmatn
Dev: npm run dev            # localhost:4321 — visit / and /fa/
Build: npm run build        # → ./dist
Preview: npm run preview
Format: npm run format
Deploy: npx wrangler deploy # serves ./dist + runs geo Worker
```

No test suite / linter / CI exists (per AGENTS.md). Verification is manual + build-passes.

## Project Structure

```
src/pages/index.astro          → English page (root, unchanged URL)
src/pages/fa/index.astro        → Persian page (/fa/)  — thin wrapper, same components
src/i18n/ui.ts                  → string dictionary: { en: {...}, fa: {...} } + types
src/i18n/utils.ts               → useTranslations(lang), getLocalizedUrl helpers
src/components/*.astro          → read strings via Astro.currentLocale (no prop-drill)
src/components/language-switcher.astro → new: EN ⇄ فا toggle in header
src/styles/theme.css            → font-family var swap per dir/lang
worker.js (or src/worker.js)    → new: CF geo redirect, falls through to ASSETS
wrangler.jsonc                  → add main + assets.binding = "ASSETS"
astro.config.mjs               → add i18n block
specs/i18n-multilingual.md      → this spec
```

## Approach (how it works)

1. **Routing.** `astro.config.mjs` i18n:

   ```js
   i18n: {
     defaultLocale: "en",
     locales: ["en", "fa"],
     routing: { prefixDefaultLocale: false }, // en → /, fa → /fa/
   }
   ```

   `src/pages/fa/index.astro` re-composes the same section components; both pages
   share one component set. Components call `Astro.currentLocale` ("en" | "fa").

2. **Strings.** All hardcoded copy moves into `src/i18n/ui.ts` keyed by section
   (e.g. `header.nav.features`, `splash.headline`, `pricing.plan.title`). I fill
   both English and fluent Tehran Persian values.
   Components resolve via `const t = useTranslations(Astro.currentLocale)`.
   Structured data (nav items, feature list, pricing plans in `src/types.ts`
   consumers) becomes locale-indexed arrays.

3. **RTL + font.** Root element: `<html lang={lang} dir={lang === "fa" ? "rtl" : "ltr">`.
   `dir="rtl"` flips the layout for free where physical spacing is symmetric.
   Vazirmatn applied via `:lang(fa)` / `[dir="rtl"]` font-family override in
   `theme.css`. Asymmetric spots (gradients, `text-right`, one-directional flex,
   Showcase tabs, Splash) get `rtl:` Tailwind variants as needed — patched per
   component during implementation, not blanket-refactored.

4. **Switcher.** `language-switcher.astro` in the header links to the equivalent
   URL in the other locale (`getRelativeLocaleUrl`). Sets a `lang` preference
   cookie so the geo Worker doesn't override an explicit manual choice.

5. **Geo redirect (Worker).** `wrangler.jsonc` gains `"main": "worker.js"` and
   `"assets": { "directory": "./dist", "binding": "ASSETS" }`. Worker logic:

   ```
   if request path is "/" (root, no /fa prefix)
      and no `lang` cookie
      and header CF-IPCountry === "IR":
        302 → /fa/
   else: return env.ASSETS.fetch(request)
   ```

   Explicit manual switch (cookie) and non-Iran visitors are never redirected.

6. **SEO.** Each page emits localized `<title>`/`<meta description>`, `og:locale`,
   and reciprocal `<link rel="alternate" hreflang="en|fa|x-default">` tags.

## Code Style

Dictionary + resolver, mirroring existing typed-array style (`src/types.ts`):

```ts
// src/i18n/ui.ts
export const languages = { en: "English", fa: "فارسی" } as const;
export const defaultLang = "en";

export const ui = {
  en: {
    "header.nav.features": "Features",
    "splash.headline": "Real-time crypto deposit alerts on Telegram",
  },
  fa: {
    "header.nav.features": "امکانات",
    "splash.headline": "اعلان لحظه‌ای واریز رمزارز، مستقیم در تلگرام",
  },
} as const;

// src/i18n/utils.ts
export function useTranslations(lang: keyof typeof ui) {
  return (key: keyof (typeof ui)["en"]) =>
    ui[lang][key] || ui[defaultLang][key];
}
```

```astro
---
// component
import { useTranslations } from "~/i18n/utils";
const t = useTranslations(Astro.currentLocale as "en" | "fa");
---

<a href="#features">{t("header.nav.features")}</a>
```

Conventions: dot-namespaced keys by section; `~/*` alias; Prettier (astro +
tailwindcss plugin last); dark-only; fluid-type font sizes (no raw `text-*` sizes).

## Testing Strategy

No automated suite (matches repo). Manual verification per task:

- `npm run build` passes with zero Astro/TS errors.
- `/` renders English LTR (Inter), unchanged from today.
- `/fa/` renders Persian RTL (Vazirmatn) with real Tehran Persian copy, no
  leftover English strings.
- Switcher moves between `/` and `/fa/` preserving scroll target where possible.
- `npx wrangler dev` (or preview) with a spoofed `CF-IPCountry: IR` header →
  root redirects to `/fa/`; with cookie set → no redirect.
- hreflang tags present and reciprocal; no horizontal overflow in RTL on mobile.

## Boundaries

- **Always:** run `npm run build` before declaring a task done; keep English URLs
  and content byte-identical to today; keep dark-only theme; namespace every string.
- **Ask first:** adding any dependency beyond `@fontsource-variable/vazirmatn`;
  changing `astro.config.mjs` deploy/site fields; touching the Worker's redirect
  conditions; changing existing English copy wording.
- **Never:** reintroduce light-mode CSS vars; commit real geo/analytics secrets;
  hardcode Persian strings in components (must go through the dictionary);
  redirect visitors who made an explicit manual language choice.

## Success Criteria

1. `npm run build` produces `/` and `/fa/index.html`, zero errors.
2. English site at `/` is visually and textually unchanged from current `main`.
3. Persian site at `/fa/` is full RTL, Vazirmatn, all 8 sections keyed with
   fluent Tehran Persian copy (I write it; stakeholder reviews).
4. Manual switcher present and correct in both directions; sets `lang` cookie.
5. Geo Worker redirects Iran root visitors to `/fa/`, respects cookie, leaves
   everyone else and all English URLs untouched.
6. Reciprocal `hreflang` + localized meta on both pages.

## Resolved Questions

1. **Copy delivery** — no inline strings anywhere; all copy lives in the
   `src/i18n/ui.ts` constant dictionary (and locale-indexed data constants) so
   it's easy to update later. I write both `en` and `fa` blocks (fluent Tehran
   Persian); stakeholder reviews the Persian wording before ship.
2. **Numerals** — Persian numerals (۱۲۳) in the Persian view. Add a
   `toFaDigits()` helper in `src/i18n/utils.ts`; apply to prices/counts when
   `lang === "fa"`.
3. **Brand name** — Persian view uses «پایش» wordmark (Latin "PAYESH" stays in
   English view).
4. **Links** — same Telegram bot + exchange URLs for both locales.
