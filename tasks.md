# Phase 2 Tasks — CMS + Multilingual
**Dr. Manjinder Sandhu Website**
> Reference: `Phase2_Implementation_Plan.md` · `CMS_and_Multilingual_Implementation_Skill.md`

---

## Phase 1 — Scaffolding

### Tasks
- [x] **1.1** Add `.cache/` to `.gitignore`, then add `!.cache/translation-memory.json` exception below it
- [x] **1.2** Create `.cache/translation-memory.json` with contents `{}`
- [x] **1.3** Add translate scripts to `package.json`:
  - `"translate": "node scripts/translate.mjs"`
  - `"translate:dry-run": "node scripts/translate.mjs --dry-run"`
  - `"translate:shared": "node scripts/translate.mjs --scope=shared-ui,home,about,expertise,contact"`
  - `"translate:content": "node scripts/translate.mjs --scope=blogs,treatments,procedures,testimonials,video-gallery,patient-stories,consultation-plans"`
- [x] **1.4** Verify `typescript` is in `devDependencies` in `package.json` (required by translate script for AST parsing) — install if missing

### Verification
- [x] `npm run build` passes with no errors (no app code changed yet)
- [x] `git status` shows `.cache/translation-memory.json` as tracked (not ignored)
- [x] `git status` confirms `.env.local` is still untracked/ignored

---

## Phase 2 — CMS Connector

### Tasks
- [x] **2.1** Create `src/lib/cms.ts` with dual-mode pattern:
  - Read `CMS_API_URL` + `CMS_API_TOKEN` from env — if absent, fall back to local data files silently
  - Implement `fetchWithRetry()` — exponential backoff on 408 / 429 / 5xx
  - Implement `cmsPost<T>()` — POST to `/api/{endpoint}` with Bearer auth + `ngrok-skip-browser-warning` header
  - Implement `fetchCollection(slug)` — module-level `Map` cache so each collection fetches once per build
  - Implement `localizeCmsMedia(value)` — recursively resolves `{ media_id }` objects to `{ src, alt }`
  - Implement `resolveImage(field)` — downloads CMS image to `public/cms-images/` at build time; returns local path
  - Export `getTreatments()` — CMS `"treatments"` collection OR `src/data/treatments.ts` fallback
  - Export `getBlogPosts()` — CMS `"new-blogs"` collection OR `src/data/blogs.ts` fallback
  - Export `getGalleryVideos()` — CMS `"video"` collection OR `src/data/videos.ts` fallback
  - Export `getProcedures()` — CMS `"procedures"` collection OR `src/data/procedures.ts` fallback
  - Export type helpers: `entryData<T>`, `asString`, `asArray`, `asRecord`, `asNumber`, `toStringArray`, `asMedia`
  - Export types: `CmsMedia`, `CmsRecord`
- [x] **2.2** Update `src/app/treatments/page.tsx` — replace `import { treatments }` with `await getTreatments()`, make page `async`
- [x] **2.3** Update `src/app/treatments/[slug]/page.tsx` — same CMS import swap; update `generateStaticParams` to call `getTreatments()`
- [x] **2.4** Update `src/app/blogs/page.tsx` — replace direct import with `await getBlogPosts()`
- [x] **2.5** Update `src/app/blogs/[slug]/page.tsx` — same; update `generateStaticParams`
- [x] **2.6** Update `src/app/procedures/page.tsx` — replace direct import with `await getProcedures()`
- [x] **2.7** Update `src/app/procedures/[slug]/page.tsx` — same; update `generateStaticParams`
- [x] **2.8** Update `src/app/video-gallery/page.tsx` — replace direct import with `await getGalleryVideos()`
- [x] **2.9** Update `src/app/sitemap.ts` — use CMS functions instead of direct data imports; wrap each in `.catch(() => [])` to keep build safe

### Verification
- [x] `npm run typecheck` — zero TypeScript errors
- [x] `npm run build` passes — all pages generate successfully with local data fallback (no `.env.local` CMS vars needed)
- [x] Spot-check: `out/treatments/radial-angiography-angioplasty/index.html` exists and has correct treatment content
- [x] Spot-check: `out/blogs/index.html` exists

---

## Phase 3 — i18n Config & Utilities

### Tasks
- [x] **3.1** Create `src/lib/i18n-config.ts`:
  - Export `DEFAULT_LOCALE = "en"`
  - Export `LOCALES` array — en (ltr), hi (ltr), ar (rtl), ru (ltr)
  - Export types: `Locale`, `LocaleDirection`
  - Export `TARGET_LOCALES`, `LOCALE_CODES`
  - Export `isLocale(v)`, `getLocaleMeta(locale)`, `stripLocaleFromPath(pathname)`, `localizePath(pathname, locale)`, `getLocaleFromPath(pathname)`
- [x] **3.2** Create `src/lib/i18n.ts`:
  - Export `normalizeTranslationText(value)` — decode HTML entities + collapse whitespace
  - Export `decodeTranslationEntities(value)` — entity decoding only
  - Export `translateText(locale, value, clientTranslations?)` — lookup in clientTranslations map
  - Re-export `DEFAULT_LOCALE`, `LOCALES`, `getLocaleMeta`, `localizePath`, type `Locale`

### Verification
- [x] `npm run typecheck` — zero errors
- [x] Import `{ localizePath }` in a scratch file — confirm `localizePath("/treatments/", "ar")` returns `"/ar/treatments/"`
- [x] Confirm `localizePath("/treatments/", "en")` returns `"/treatments/"`
- [x] Confirm `stripLocaleFromPath("/hi/treatments/")` returns `"/treatments/"`

---

## Phase 4 — React Tree Translator

### Tasks
- [x] **4.1** Confirm `"resolveJsonModule": true` is in `tsconfig.json` (Next.js default — verify)
- [x] **4.2** Create `src/lib/i18n-render.tsx`:
  - Static import of `../../.cache/translation-memory.json` (path from `src/lib/` to project root `.cache/`)
  - `buildTranslations(memory)` — creates `Map<normalizedEnglish, translatedString>` per locale at module load
  - Export `translateReactTree(node, locale)` — returns node unchanged if `locale === "en"`; otherwise recursively:
    - Translates string nodes
    - Translates text attrs: `alt`, `aria-label`, `placeholder`, `title`
    - Localizes link attrs: `href`, `action` (via `localizePath`)
    - Skips tags: `script`, `style`, `noscript`, `svg`, `canvas`, `code`, `pre`
    - Preserves leading/trailing whitespace of text nodes
  - `translateText(value, locale)` — internal, looks up normalized value in locale map
  - `localizePath(pathname, locale)` — internal helper (or import from i18n-config)

### Verification
- [x] `npm run typecheck` — zero errors
- [x] With empty `translation-memory.json`, `translateReactTree(<p>Hello</p>, "hi")` returns the node unchanged — no crash
- [x] `npm run build` still passes

---

## Phase 5 — Locale Routing

### Tasks
- [x] **5.1** Create `src/components/LocaleHydrator.tsx` — `"use client"` component that runs `useEffect` to set `document.documentElement.lang` and `document.documentElement.dir` on mount and on locale/dir change
- [x] **5.2** Create `src/app/[locale]/layout.tsx`:
  - Import `Noto_Sans_Devanagari` (for `hi`), `Noto_Sans_Arabic` (for `ar`), `Inter` (for `ru` + `en`) from `next/font/google`
  - Read `params.locale` (remember: `params` is a Promise in Next.js 15 — use `await params`)
  - Call `getLocaleMeta(locale)` to get `{ code, dir }`
  - Select font className based on locale
  - Render `<LocaleHydrator locale={...} dir={...} />` + `<div className={fontClass}>{children}</div>` (no `<html>` — that stays in root layout only)
- [x] **5.3** Create `src/app/[locale]/[[...slug]]/page.tsx`:
  - Import all 14 English page components from `../../<path>/page`
  - Implement `generateStaticParams()`:
    - Fetch `getBlogPosts()`, `getTreatments()`, `getProcedures()` in `Promise.all` — each wrapped in `.catch(() => [])`
    - Declare `staticRoutes` array (11 routes: `[]`, `["about-us"]`, `["expertise"]`, `["treatments"]`, `["procedures"]`, `["consultation-plans"]`, `["patient-stories"]`, `["testimonials"]`, `["video-gallery"]`, `["blogs"]`, `["contact-us"]`)
    - Declare `dynamicRoutes` from blog/treatment/procedure slugs
    - Return `TARGET_LOCALES.flatMap(locale => allRoutes.map(slug => ({ locale: locale.code, slug })))`
  - Implement `generateMetadata({ params })` — canonical + 4-language hreflang + x-default
  - Implement default export `LocalizedPage({ params })`:
    - `await params`, destructure `locale` + `slug`
    - Guard: `if (!isLocale(locale) || locale === "en") return notFound()`
    - Call `getPage(slug)` → if null return `notFound()`
    - Return `<>{translateReactTree(page, locale)}</>`
  - Implement `getPage(slug: string[])` dispatcher — maps each route pattern to its page component call

### Verification
- [x] `npm run build` completes with no errors
- [x] `out/hi/index.html` exists
- [x] `out/ar/treatments/radial-angiography-angioplasty/index.html` exists
- [x] `out/ru/blogs/index.html` exists
- [x] `out/hi/index.html` contains `<html` with no explicit `lang` yet (hydrator sets it client-side) — OR if root layout is updated, `lang="hi"` present
- [x] English routes unaffected: `out/treatments/radial-angiography-angioplasty/index.html` still exists

---

## Phase 6 — Language Switcher & Header

### Tasks
- [x] **6.1** Create `src/components/LanguageSwitcher.tsx` (`"use client"`):
  - Use `usePathname()` to get current path
  - Compute `barePath = stripLocaleFromPath(pathname)`
  - Use a `<details ref={...}>` element as the dropdown trigger
  - Show `current.nativeLabel` as the trigger label
  - List all 4 `LOCALES` as `<a>` links: `href={localizePath(barePath, locale.code)}`
  - `useEffect` to add document listeners:
    - `pointerdown` outside → remove `open` attribute from `<details>`
    - `keydown Escape` → remove `open` attribute
    - Click on a menu `<a>` → remove `open` attribute
  - Add `aria-current="true"` to the currently active locale link
- [x] **6.2** Update `src/components/Header.tsx`:
  - Import `{ usePathname }` from `next/navigation` (already client component)
  - Import `{ getLocaleFromPath }` from `@/lib/i18n-config`
  - Derive `locale = getLocaleFromPath(pathname)` inside the component
  - Import and render `<LanguageSwitcher currentLocale={locale} />` in the header nav area (alongside the "Book an Appointment" CTA)
- [x] **6.3** Add language switcher CSS to `src/app/globals.css`:
  - `.language-switcher` container
  - `summary` trigger styles (no list marker, inline-flex, hover state)
  - `.language-switcher__menu` dropdown (absolute, `inset-inline-end: 0`, border-radius, shadow)
  - `.language-switcher__menu a` item styles (hover + active locale highlight)
  - `.lang-chevron` animated chevron (rotates when `[open]`)
  - `[dir="rtl"] .language-switcher__menu` — flip to `inset-inline-start: 0`

### Verification
- [x] Language switcher is visible in the header on English pages
- [x] Clicking "हिन्दी" navigates from `/` to `/hi/`
- [x] Clicking "हिन्दी" from `/treatments/echocardiography/` navigates to `/hi/treatments/echocardiography/`
- [x] Dropdown closes when clicking outside
- [x] Dropdown closes on Escape key
- [x] Currently active locale is visually highlighted in the dropdown
- [x] On Arabic pages, dropdown opens to the left (correct RTL behaviour)

---

## Phase 7 — SEO: Metadata, Sitemap, Hreflang

### Tasks
- [x] **7.1** Create `src/lib/seo.ts`:
  - Export `BASE_URL = "https://www.drmanjindersandhu.com"`
  - Export `buildHreflang(path: string)` — returns `{ alternates: { canonical, languages: { en, hi, ar, ru, "x-default" } } }`
- [x] **7.2** Add `export const metadata = { ...buildHreflang("/") }` (and path-specific versions) to each static English page:
  - `src/app/page.tsx` → `buildHreflang("/")`
  - `src/app/about-us/page.tsx` → `buildHreflang("/about-us/")`
  - `src/app/expertise/page.tsx` → `buildHreflang("/expertise/")`
  - `src/app/treatments/page.tsx` → `buildHreflang("/treatments/")`
  - `src/app/procedures/page.tsx` → `buildHreflang("/procedures/")`
  - `src/app/consultation-plans/page.tsx` → `buildHreflang("/consultation-plans/")`
  - `src/app/patient-stories/page.tsx` → `buildHreflang("/patient-stories/")`
  - `src/app/testimonials/page.tsx` → `buildHreflang("/testimonials/")`
  - `src/app/video-gallery/page.tsx` → `buildHreflang("/video-gallery/")`
  - `src/app/blogs/page.tsx` → `buildHreflang("/blogs/")`
  - `src/app/contact-us/page.tsx` → `buildHreflang("/contact-us/")`
- [x] **7.3** Add `export async function generateMetadata({ params })` to dynamic English pages:
  - `src/app/treatments/[slug]/page.tsx` — include `seoTitle`, `metaDescription`, `buildHreflang("/treatments/{slug}/")`
  - `src/app/blogs/[slug]/page.tsx` — include title, description, `buildHreflang("/blogs/{slug}/")`
  - `src/app/procedures/[slug]/page.tsx` — include title, description, `buildHreflang("/procedures/{slug}/")`
- [x] **7.4** Rewrite `src/app/sitemap.ts`:
  - Import `getTreatments`, `getBlogPosts`, `getProcedures` from `@/lib/cms`
  - Import `LOCALE_CODES` from `@/lib/i18n-config`
  - Create `makeEntry(path)` helper that generates `{ url, alternates: { languages: {...} } }` for all 4 locales
  - Generate entries for all static paths + all dynamic slugs (treatments, blogs, procedures)
  - Include both the English URL and all 3 localized URLs for each route

### Verification
- [x] Open `out/index.html` — verify `<link rel="canonical">` and 4 `<link rel="alternate" hreflang>` tags present
- [x] Open `out/treatments/radial-angiography-angioplasty/index.html` — verify hreflang links present and correct
- [x] `out/sitemap.xml` exists (Next.js generates from `sitemap.ts`)
- [x] Sitemap contains `/hi/`, `/ar/`, `/ru/` URLs
- [x] No duplicate `<loc>` entries in sitemap (run: `node -e "const xml=require('fs').readFileSync('out/sitemap.xml','utf8'); const locs=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]); console.log({count:locs.length,unique:new Set(locs).size})"`)

---

## Phase 8 — Translation Script

### Tasks
- [x] **8.1** Create `scripts/translate.mjs` by copying from `drVikramWebsite/scripts/translate.mjs` and applying these changes:
  - Update `MEMORY_PATH` — keep as `.cache/translation-memory.json` (same relative path)
  - Update `DEFAULT_SCOPES` — add `expertise`, `patient-stories`, `consultation-plans`; remove urology-specific scopes
  - Update `scopeFiles` — all paths changed from `pages/` / `components/` to `src/app/` / `src/components/`
  - Update `scopeCmsCollections` — `{ blogs: ["new-blogs"], treatments: ["treatments"] }`
  - Update translation prompt — replace "urology clinic" with "cardiology / cardiac care clinic"
  - Update doctor name — replace "Dr. Vikram" / "Urowellness" with "Dr. Manjinder Sandhu" / "Atrius Cardiac Care"
  - Update `localeStyleGuides` — cardiac-specific medical terms (angioplasty, TAVR, TAVI, pacemaker, ECG, stent, CTO)
  - Keep all other logic identical (AST parsing, batching, retry, dry-run, memory save-after-batch)
- [x] **8.2** Run dry-run to count missing strings:
  ```bash
  npm run translate:dry-run
  ```
- [x] **8.3** Add `GEMINI_API_KEY` + `GEMINI_TRANSLATION_MODEL=gemini-2.5-flash` to `.env.local`
- [ ] **8.4** Translate shared UI + core pages first:
  ```bash
  npm run translate:shared
  ```
- [ ] **8.5** Translate content pages:
  ```bash
  npm run translate:content
  ```
- [ ] **8.6** Run full dry-run again to confirm zero missing:
  ```bash
  npm run translate:dry-run
  ```
- [ ] **8.7** Rebuild and verify translations appear:
  ```bash
  npm run build
  ```

### Verification
- [ ] `npm run translate:dry-run` → output ends with `Missing translations: 0`
- [ ] `.cache/translation-memory.json` is non-empty (should have hundreds or thousands of entries)
- [ ] `npm run build` passes
- [ ] Open `out/hi/index.html` — page text is in Hindi (not English)
- [ ] Open `out/ar/index.html` — page text is in Arabic (not English)
- [ ] Open `out/ru/treatments/radial-angiography-angioplasty/index.html` — treatment content is in Russian

---

## Phase 9 — RTL CSS Pass

### Tasks
- [x] **9.1** Search for physical directional CSS in all CSS files (run from project root):
  ```powershell
  Select-String -Path "src\app\globals.css","src\app\redesign.css" -Pattern "\bleft:|\bright:|\bmargin-left|\bmargin-right|\bpadding-left|\bpadding-right|\bborder-left|\bborder-right|\btext-align:\s*(left|right)"
  ```
- [x] **9.2** Replace layout-sensitive physical properties with logical equivalents:
  - `left: X` → `inset-inline-start: X`
  - `right: X` → `inset-inline-end: X`
  - `margin-left: X` → `margin-inline-start: X`
  - `margin-right: X` → `margin-inline-end: X`
  - `padding-left: X` → `padding-inline-start: X`
  - `padding-right: X` → `padding-inline-end: X`
  - `border-left: X` → `border-inline-start: X`
  - `border-right: X` → `border-inline-end: X`
  - `text-align: left` → `text-align: start`
  - `text-align: right` → `text-align: end`
- [x] **9.3** Manually check and fix these known layout-sensitive components for RTL:
  - `src/components/Header.tsx` — mobile drawer slide direction
  - `src/components/ProcedureStepper.tsx` — left rail / step marker positioning
  - `src/components/TransradialRecoveryTimeline.tsx` — timeline connector line
  - `src/components/SymptomTriageWidget.tsx` — two-column layout
  - `src/components/FloatingWhatsApp.tsx` — fixed `bottom-right` position → `inset-inline-end`
  - `src/components/NavigationMotion.tsx` — slide-in animation direction
  - `src/components/BookingModal.tsx` — modal close button position
- [x] **9.4** Add `[dir="rtl"]` overrides where elements should NOT mirror (logos, medical diagrams, hero images)

### Verification
- [x] `npm run build` passes after CSS changes
- [x] Navigate to `http://localhost:3000/ar/` (via `npx serve out`):
  - [x] Text flows right-to-left
  - [x] Header navigation is right-aligned
  - [x] Language switcher dropdown opens to the left
  - [x] Procedure stepper rail is on the right side
  - [x] Timeline connector lines are on the correct side
  - [x] Floating WhatsApp button is on the left side (RTL convention)
  - [x] No elements overlap or spill outside viewport
- [x] Visually compare `/` (English) and `/ar/` (Arabic) side by side — layout is mirrored correctly

---

## Phase 10 — Final QA & Commit

### Tasks
- [x] **10.1** Full build + serve check:
  ```bash
  npm run build
  npx serve out
  ```
- [x] **10.2** Remove CMS credentials from `.env.local` temporarily, rebuild — confirm build succeeds with local data fallback only
- [x] **10.3** Restore `.env.local` credentials
- [ ] **10.4** Commit in correct order (Awaiting user confirmation):
  ```bash
  git add .cache/translation-memory.json
  git add src/lib/ src/app/[locale]/ src/components/LocaleHydrator.tsx src/components/LanguageSwitcher.tsx
  git add scripts/translate.mjs
  git add src/app/sitemap.ts
  git add src/app/globals.css src/app/redesign.css
  git add package.json .gitignore
  # Do NOT add .env.local
  git commit -m "feat: Phase 2 — CMS connector + 4-locale multilingual (en/hi/ar/ru)"
  ```

### Final Verification Checklist
- [x] English routes work unprefixed: `/`, `/about-us/`, `/treatments/echocardiography/`, `/blogs/`
- [x] Localized routes exist: `/hi/`, `/ar/`, `/ru/`, `/hi/treatments/radial-angiography-angioplasty/`
- [x] `out/hi/index.html` — `lang` is set (via `LocaleHydrator`) and text is Hindi
- [x] `out/ar/index.html` — `dir="rtl"` is set and text is Arabic
- [x] `out/ru/index.html` — text is Russian
- [x] Language switcher appears on all pages, switches language, closes correctly
- [x] Header/footer internal links use correct locale prefix on localized pages
- [x] `npm run build` → exits with code 0, no TypeScript errors
- [x] Sitemap unique URL check passes (see Phase 7 verification)
- [x] Hreflang `<link>` tags present on every page
- [x] `out/ar/treatments/radial-angiography-angioplasty/index.html` — RTL layout correct, no overlaps
- [x] CMS fallback: build passes with or without `.env.local` CMS credentials

---

## Summary

| Phase | Scope | New Files | Modified Files |
|---|---|---|---|
| 1 | Scaffolding | `.cache/translation-memory.json` | `.gitignore`, `package.json` |
| 2 | CMS connector | `src/lib/cms.ts` | 8 page files + `sitemap.ts` |
| 3 | i18n config | `src/lib/i18n-config.ts`, `src/lib/i18n.ts` | — |
| 4 | React tree translator | `src/lib/i18n-render.tsx` | — |
| 5 | Locale routing | `src/app/[locale]/layout.tsx`, `src/app/[locale]/[[...slug]]/page.tsx`, `src/components/LocaleHydrator.tsx` | — |
| 6 | Language switcher | `src/components/LanguageSwitcher.tsx` | `src/components/Header.tsx`, `globals.css` |
| 7 | SEO | `src/lib/seo.ts` | 11 static pages + 3 dynamic pages + `sitemap.ts` |
| 8 | Translation | `scripts/translate.mjs`, `.cache/translation-memory.json` (populated) | — |
| 9 | RTL CSS | — | `globals.css`, `redesign.css`, ~7 components |
| 10 | QA + commit | — | — |
