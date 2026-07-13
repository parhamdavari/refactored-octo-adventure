# TODO: Multilingual Site (English + Tehran Persian)

Tracks `tasks/plan.md`. Do top-to-bottom; parallel group marked. Persian copy
written by me, fluent Tehran register.

## [1] Foundation

- [ ] Task: Add i18n routing + Persian font + dictionary scaffolding
  - Acceptance: `astro.config.mjs` has i18n block (`defaultLocale: en`,
    `locales: [en, fa]`, `prefixDefaultLocale: false`); `@fontsource-variable/vazirmatn`
    installed; `src/i18n/ui.ts` (empty `en`/`fa` objects + `languages`, `defaultLang`)
    and `src/i18n/utils.ts` (`useTranslations`, `getLocalizedUrl`, `toFaDigits`) exist.
  - Verify: `npm run build` passes; `import`s resolve.
  - Files: `astro.config.mjs`, `package.json`, `src/i18n/ui.ts`, `src/i18n/utils.ts`

## [2] Layout shell

- [ ] Task: Extract `base.astro` layout; add fa page + localized head
  - Acceptance: `src/layouts/base.astro` holds `<html lang dir>` + `<head>` (localized
    title/desc/og + reciprocal hreflang) + body composing all sections; `index.astro`
    → `<Base lang="en"/>`, new `src/pages/fa/index.astro` → `<Base lang="fa"/>`.
    `dir="rtl"` when fa.
  - Verify: `npm run build` emits `/index.html` + `/fa/index.html`; `/fa/` has
    `dir="rtl" lang="fa"`; `/` English HTML unchanged vs `git stash` baseline.
  - Files: `src/layouts/base.astro`, `src/pages/index.astro`, `src/pages/fa/index.astro`
  - ← REVIEW GATE (checkpoint after [2])

## [3] Section string extraction — parallelizable (one task per component)

Each: move that component's hardcoded strings into `ui.ts` (en + fa), consume via
`t()` / `Astro.currentLocale`. No inline strings left.

- [ ] Task: header + nav + mobile menu (+ «پایش» wordmark for fa)
  - Verify: nav labels + "Open Bot" from dict; fa shows «پایش», en shows "PAYESH".
  - Files: `src/components/header.astro`, `src/i18n/ui.ts`
- [ ] Task: splash (headline, sub, CTA)
  - Files: `src/components/splash.astro`, `src/i18n/ui.ts`
- [ ] Task: features (+ `content-section` title/lead passed as translated props)
  - Files: `src/components/features.astro`, `src/i18n/ui.ts`
- [ ] Task: tutorial (steps)
  - Files: `src/components/tutorial.astro`, `src/i18n/ui.ts`
- [ ] Task: compatibility (heading/lead; exchange names stay Latin)
  - Files: `src/components/compatibility.astro`, `src/i18n/ui.ts`
- [ ] Task: showcase (tab labels + captions; leave client JS + data attrs untouched)
  - Files: `src/components/showcase.astro`, `src/i18n/ui.ts`
- [ ] Task: pricing (plan names, features, prices via `toFaDigits` when fa)
  - Files: `src/components/pricing.astro`, `src/i18n/ui.ts`
- [ ] Task: footer (links, tagline, copyright)
  - Files: `src/components/footer.astro`, `src/i18n/ui.ts`
  - Acceptance (whole group): `grep` finds no user-facing hardcoded strings in
    `src/components/*.astro`; en view identical to today; fa view shows real Persian.
  - Verify (group): `npm run build` passes; diff `/index.html` vs baseline = none.

## [4] Language switcher

- [ ] Task: Add `language-switcher.astro`, wire into header (desktop + mobile menu)
  - Acceptance: toggle links to equivalent URL in other locale via `getLocalizedUrl`;
    sets `lang` cookie on click; shows "EN"/"فارسی".
  - Verify: `/` → click → `/fa/` and back; cookie `lang` set (devtools).
  - Files: `src/components/language-switcher.astro`, `src/components/header.astro`

## [5] RTL polish + font

- [ ] Task: Vazirmatn font wiring + RTL layout fixes
  - Acceptance: `theme.css` applies `Vazirmatn, Inter, sans` when `[dir=rtl]`/`:lang(fa)`;
    asymmetric spots (gradients, `text-right`, one-way flex, showcase tabs, splash)
    patched with `rtl:` variants; no horizontal overflow.
  - Verify: `npm run preview`, load `/fa/` desktop + mobile widths; visual pass each
    section; body has no x-scroll.
  - Files: `src/styles/theme.css`, affected `src/components/*.astro`
  - ← REVIEW GATE (checkpoint after [5])

## [6] Geo redirect Worker

- [ ] Task: Add geo Worker + wrangler binding
  - Acceptance: `worker.js` fetch handler — root `/` + no `lang` cookie +
    `CF-IPCountry === "IR"` → 302 `/fa/`; else `env.ASSETS.fetch(request)`.
    `wrangler.jsonc` gains `"main": "worker.js"` + `"assets": { directory, binding: "ASSETS" }`.
  - Verify: `npx wrangler dev`, curl `/` with `-H "CF-IPCountry: IR"` → 302 `/fa/`;
    with `-H "Cookie: lang=en"` → 200; non-IR → 200 English.
  - Files: `worker.js`, `wrangler.jsonc`

## [7] Final verify

- [ ] Task: Full build + preview + geo smoke test + hreflang check
  - Acceptance: all success criteria in spec §"Success Criteria" pass.
  - Verify: `npm run build`; manual pass both locales; hreflang reciprocal in both
    HTML outputs; geo test green.
  - ← FINAL GATE
