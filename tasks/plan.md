# Plan: Multilingual Site (English + Tehran Persian)

Implements `specs/i18n-multilingual.md`. Astro built-in i18n, dictionary constants,
RTL + Vazirmatn, manual switcher, Cloudflare geo Worker. I write fluent Tehran
Persian copy for all sections (stakeholder reviews before ship).

## Component / dependency graph

```
[1] Foundation ─────────────────────────────────────────────┐
    astro.config i18n · install vazirmatn ·                  │
    src/i18n/ui.ts (skeleton) · src/i18n/utils.ts            │
        │                                                     │
        ▼                                                     │
[2] Layout shell (extract src/layouts/base.astro)            │
    index.astro → Base lang=en ; fa/index.astro → Base lang=fa│
    <html lang/dir>, localized <head> meta + hreflang        │
        │                                                     │
        ▼                                                     │
[3] Section string extraction  ◄─── parallelizable, one per section
    header · splash · features · tutorial · compatibility ·  │
    showcase · pricing · footer · content-section(title prop) │
    each: EN + fluent Tehran Persian values into ui.ts        │
        │                                                     │
        ▼                                                     │
[4] Language switcher component + header wiring              │
        │                                                     │
        ▼                                                     │
[5] RTL polish (rtl: variants) + Vazirmatn font wiring ◄─────┘
        │
        ▼
[6] Geo Worker (worker.js) + wrangler.jsonc main/binding
        │
        ▼
[7] Verify: build + preview + spoofed CF-IPCountry test
```

## Order rationale

- **Sequential spine:** [1]→[2] must land first — routing + layout are the frame
  everything else hangs on. Nothing renders at `/fa/` without them.
- **Parallel middle:** [3] sections are independent once the dictionary + `t()`
  exist; each touches one component + its section keys in `ui.ts` (en + fa).
- **[4] and [5]** come after sections exist so there's real content to switch/flip.
- **[6] Worker** is deploy-layer, orthogonal to Astro — buildable anytime after
  `/fa/` route exists, placed last to keep the static build green first.

## Verification checkpoints

- **After [2]:** `npm run build` emits `/index.html` + `/fa/index.html`; `/fa/`
  has `dir="rtl" lang="fa"`; English `/` byte-unchanged. ← review gate
- **After [3]:** no hardcoded UI strings remain in components (grep); English view
  identical to today; `/fa/` renders real Persian copy in RTL.
- **After [5]:** switcher works both ways + sets cookie; Vazirmatn renders on
  `/fa/`; Persian numerals in prices; no horizontal overflow on mobile RTL. ← review gate
- **After [7]:** spoofed `CF-IPCountry: IR` on `/` → 302 `/fa/`; cookie suppresses
  it; non-IR + English URLs untouched. ← final gate

## Risks & mitigations

| Risk                                                                   | Mitigation                                                                                                                                                     |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showcase.astro` (376 lines) has client-JS tabs w/ `data-showcase-tab` | Key only visible tab labels/text; leave JS + data attrs untouched.                                                                                             |
| RTL breaks gradients / `ocean-current` animation / one-way flex        | Patch per-component with `rtl:` variants; visual diff each section.                                                                                            |
| Duplicated `<head>` between en/fa pages                                | Extract `base.astro` layout first ([2]); both pages thin wrappers.                                                                                             |
| Vazirmatn variable-weight coverage vs `font-extrabold` usage           | Verify weights 400–800 present; fallback stack `Vazirmatn, Inter, sans`.                                                                                       |
| Worker + `ASSETS` binding / trailing-slash on `/fa/` edge cases        | Test with `wrangler dev` + header spoof before deploy; only redirect exact `/`.                                                                                |
| `content-section.astro` gets `title` as prop                           | Parent components pass translated `t(...)`; wrapper stays language-agnostic.                                                                                   |
| Persian copy tone/quality                                              | Natural Tehran register, product-appropriate; keep tech terms (crypto, Telegram, exchange names) as commonly used in fa crypto community; stakeholder reviews. |
| Persian numerals in prices                                             | `toFaDigits()` helper, applied at render only when `lang==="fa"`.                                                                                              |

## Out of scope (this iteration)

- Additional locales beyond en/fa.
- Automated tests / CI (repo has none).
- Analytics on language/geo.
