# CMS + Multilingual Implementation Skill
## Dr. Manjinder Sandhu Website — Phase 2

> **Reference repos analysed:**
> - `drVikramWebsite` — Next.js **Pages Router**, static export (`output: "export"`)
> - `drTriptiWebsite` — Next.js **App Router**, static export (`output: "export"`)
>
> Dr. Manjinder Sandhu uses **Next.js App Router** + `output: "export"` + `trailingSlash: true`, so the **Dr. Tripti pattern is the primary reference** for routing. Dr. Vikram's `scripts/translate.mjs` is the **authoritative translation pipeline** reference (it uses the TypeScript AST, which is the most robust extractor across both repos).

---

## 1. Architecture Overview

```
Phase 2 adds:
┌─────────────────────────────────────────────────────────────────┐
│  CMS LAYER (build-time only)                                     │
│  lib/cms.ts  ←  CMS_API_URL + CMS_API_TOKEN (.env.local)         │
│  - Fetches: treatments, blogs, videos from headless CMS          │
│  - Falls back to local data/ files when CMS not configured       │
│  - Downloads images to public/cms-images/ at build time          │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  i18n LAYER (build-time + runtime)                               │
│  lib/i18n-config.ts  — locales, helpers                          │
│  lib/i18n.ts         — normalise, translate text, decode         │
│  lib/i18n-render.tsx — translateReactTree() for server components│
│  .cache/translation-memory.json — committed, never regenerated   │
│  scripts/translate.mjs — Gemini-powered, run manually only       │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  ROUTING (App Router static)                                     │
│  src/app/[locale]/[[...slug]]/page.tsx                           │
│  - generateStaticParams() covers all /hi /ar /ru routes          │
│  - re-uses existing page server components directly              │
│  - wraps output in translateReactTree(node, locale)              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. CMS Connector (`lib/cms.ts`)

### 2.1 Design principles (from both references)
- **Build-time only** — import this file only from server components or `generateStaticParams`/`generateMetadata`. Never in a Client Component.
- **Dual-mode** — if `CMS_API_URL` and `CMS_API_TOKEN` are not set, fall back to local data files silently (Dr. Tripti pattern). This ensures `npm run build` always works without a CMS connection.
- **Cache** — fetch each collection once per build using a module-level `Map` (Dr. Vikram pattern).
- **Images** — download signed CMS media to `public/cms-images/` at build time so the static export works after signed URLs expire.
- **Retry** — use exponential-backoff retry for transient CMS errors (Dr. Vikram pattern; Dr. Tripti uses `force-cache` as simpler alternative).

### 2.2 Environment variables
```env
# .env.local (never commit)
CMS_API_URL=https://unreplevined-keith-superexacting.ngrok-free.app
CMS_API_TOKEN=cms_live_...
CMS_RETRY_ATTEMPTS=5
CMS_RETRY_DELAY_MS=700
```

### 2.3 API contract (same across all Ripplica sites)
```
POST {CMS_API_URL}/api/content.entries.list
  Body: { collection_slug: string, page_size: 100 }
  Auth: Bearer {CMS_API_TOKEN}
  Header: ngrok-skip-browser-warning: true

POST {CMS_API_URL}/api/content.media.get
  Body: { media_id: string }

Response shape (entries.list):
  Array<{ entry_id, collection_id, entry: {...} }>
  OR { entries: [...] }  OR { data: [...] }  OR { items: [...] }
```

### 2.4 CMS collections to wire up
| Collection slug | Local fallback file | Exported function |
|---|---|---|
| `treatments` | `src/data/treatments.ts` | `getTreatments()` |
| `new-blogs` | `src/data/blogs.ts` | `getBlogPosts()` |
| `video` | `src/data/video-gallery.ts` | `getGalleryVideos()` |
| `procedures` | `src/data/procedures.ts` | `getProcedures()` |

> **Note:** `case-studies`, `consultation-plans`, and `testimonials` can stay local-only in Phase 2 unless the client explicitly puts them in the CMS.

### 2.5 Key helper functions to implement

```ts
// Retry with backoff
async function fetchWithRetry(url, init, label): Promise<Response>

// Cached collection fetch
export async function fetchCollection(slug: string): Promise<unknown[]>

// Unwrap entry wrapper { entry_id, entry: {...} } → inner object
export function entryData<T>(item: unknown): T

// Recursively resolve { media_id } objects → { src, alt }
async function localizeCmsMedia(value: any): Promise<any>

// Download a CMS image to public/cms-images/ at build time
export async function resolveImage(field: CmsMedia): Promise<string>

// Type helpers
export function asString(v, fallback=""): string
export function asArray(v): unknown[]
export function asRecord(v): Record<string,unknown>
export function asNumber(v, fallback=0): number
export function toStringArray(v): string[]
```

### 2.6 Treatment shape (most complex collection)
```ts
export type TreatmentData = {
  id: string;
  slug: string;
  title: string;
  category: "preventive" | "general" | "non-invasive" | "invasive";
  excerpt: string;
  heroImage: string;
  contentImage: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalPath: string;
  blocks: Block[];       // text / list / imageText / gallery
  faqs: { q: string; a: string; openByDefault?: boolean }[];
  relatedTreatments: string[];  // slugs
  relatedBlogs: string[];       // slugs
  doctorNote?: { heading: string; body: string };
  lastReviewed: string;
};
```

---

## 3. Locale Configuration (`lib/i18n-config.ts`)

```ts
export const DEFAULT_LOCALE = "en";

export const LOCALES = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "hi", label: "Hindi",   nativeLabel: "हिन्दी",   dir: "ltr" },
  { code: "ar", label: "Arabic",  nativeLabel: "العربية",  dir: "rtl" },
  { code: "ru", label: "Russian", nativeLabel: "Русский",  dir: "ltr" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];
export type LocaleDirection = (typeof LOCALES)[number]["dir"];

export const TARGET_LOCALES = LOCALES.filter(l => l.code !== DEFAULT_LOCALE);
export const LOCALE_CODES   = LOCALES.map(l => l.code);

export function isLocale(v: string | undefined): v is Locale { ... }
export function getLocaleMeta(locale: string | undefined) { ... }
export function stripLocaleFromPath(pathname = "/"): string { ... }
export function localizePath(pathname = "/", locale: Locale = DEFAULT_LOCALE): string { ... }
export function getLocaleFromPath(pathname = "/"): Locale { ... }
```

---

## 4. i18n Utilities (`lib/i18n.ts`)

```ts
// Decode HTML entities + collapse whitespace → canonical lookup key
export function normalizeTranslationText(value: unknown): string

// Decode only entities (used before inserting translated text into DOM)
export function decodeTranslationEntities(value: unknown): string

// Look up a string in clientTranslations map (used by client components)
export function translateText(locale, value, clientTranslations = {}): string

// Re-export helpers so consumers import from one place
export { DEFAULT_LOCALE, LOCALES, getLocaleMeta, localizePath };
export type { Locale };
```

---

## 5. React Tree Translator (`lib/i18n-render.tsx`)

This is the **Dr. Tripti approach** — a server-side React tree walk that translates all text nodes and safe attributes recursively. This is the right approach for App Router since there are no `getStaticProps` / `withLocaleProps` calls.

```ts
// lib/i18n-render.tsx
import translationMemory from "../.cache/translation-memory.json";

export function translateReactTree(node: React.ReactNode, locale: LocaleCode): React.ReactNode
```

### How it works:
1. Reads the committed `.cache/translation-memory.json` at **module load time** (static import, zero runtime I/O).
2. Recursively walks React nodes:
   - `string` → `translateText(locale, string)`
   - JSX element → translate `children`, `alt`, `aria-label`, `placeholder`, `title` attrs; localize `href` and `action` attrs
   - Skips `script`, `style`, `noscript`, `svg`, `canvas`, `code`, `pre` tags entirely
3. Preserves leading/trailing whitespace in text nodes.
4. Internal `href` values are localized via `localizePath(href, locale)`.

### Usage pattern (App Router page):
```tsx
// src/app/[locale]/[[...slug]]/page.tsx
import { translateReactTree } from "@/lib/i18n-render";

export default async function LocalizedPage({ params }) {
  const locale = params.locale as LocaleCode;
  const page = await getPage(params.slug ?? []);
  if (!page) return notFound();
  return <>{translateReactTree(page, locale)}</>;
}
```

---

## 6. Locale Routing (`src/app/[locale]/[[...slug]]/page.tsx`)

### Route structure
```
English (default, unprefixed):
  /                  →  src/app/page.tsx
  /treatments/       →  src/app/treatments/page.tsx
  /treatments/[slug] →  src/app/treatments/[slug]/page.tsx
  /blogs/[slug]      →  src/app/blogs/[slug]/page.tsx
  ...

Localized (prefixed):
  /hi/               →  src/app/[locale]/[[...slug]]/page.tsx  (locale=hi, slug=[])
  /hi/treatments/    →  (locale=hi, slug=["treatments"])
  /ar/treatments/echocardiography/  →  (locale=ar, slug=["treatments","echocardiography"])
```

### `generateStaticParams()` — what to return
```ts
export async function generateStaticParams() {
  const [blogPosts, treatmentData, procedureData] = await Promise.all([
    getBlogPosts().catch(() => []),
    getTreatments().catch(() => []),
    getProcedures().catch(() => []),
  ]);

  const staticRoutes = [
    [],
    ["about-us"],
    ["expertise"],
    ["treatments"],
    ["procedures"],
    ["consultation-plans"],
    ["patient-stories"],
    ["testimonials"],
    ["video-gallery"],
    ["blogs"],
    ["contact-us"],
  ];

  const dynamicRoutes = [
    ...blogPosts.map(p => ["blogs", p.slug]),
    ...treatmentData.map(t => ["treatments", t.slug]),
    ...procedureData.map(p => ["procedures", p.slug]),
  ];

  const routes = [...staticRoutes, ...dynamicRoutes];
  const localeCodes = ["hi", "ar", "ru"] as const;

  return localeCodes.flatMap(locale =>
    routes.map(slug => ({ locale, slug }))
  );
}
```

### Page dispatcher (follow Dr. Tripti `getPage()` pattern)
```tsx
async function getPage(slug: string[]) {
  const route = slug.join("/");

  // Static pages
  if (route === "")                   return <HomePage />;
  if (route === "about-us")           return <AboutPage />;
  if (route === "expertise")          return <ExpertisePage />;
  if (route === "treatments")         return <TreatmentsPage />;
  if (route === "procedures")         return <ProceduresPage />;
  if (route === "consultation-plans") return <ConsultationPlansPage />;
  if (route === "patient-stories")    return <PatientStoriesPage />;
  if (route === "testimonials")       return <TestimonialsPage />;
  if (route === "video-gallery")      return <VideoGalleryPage />;
  if (route === "blogs")              return <BlogsPage />;
  if (route === "contact-us")         return <ContactPage />;

  // Dynamic pages
  if (slug[0] === "blogs" && slug[1])
    return BlogPostPage({ params: { slug: slug[1] } });
  if (slug[0] === "treatments" && slug[1])
    return TreatmentPage({ params: { slug: slug[1] } });
  if (slug[0] === "procedures" && slug[1])
    return ProcedurePage({ params: { slug: slug[1] } });
  if (slug[0] === "patient-stories" && slug[1])
    return PatientStoryPage({ params: { slug: slug[1] } });

  return null;
}
```

> **Important:** Call existing page server components directly as async functions — do NOT wrap in `<Suspense>` unless they actually have async work that benefits from it.

---

## 7. Translation Memory (`.cache/translation-memory.json`)

### File location & Git rules
```
.cache/translation-memory.json   ← MUST be committed
.env.local                       ← NEVER commit
```

The `.cache/` directory is gitignored by default on many projects. Ensure `.gitignore` has an exception:
```gitignore
# In .gitignore — ensure translation memory is committed:
!.cache/translation-memory.json
```

### Memory shape
```json
{
  "58265cc0115114af": {
    "en": "Book Appointment",
    "hi": "अपॉइंटमेंट बुक करें",
    "ar": "احجز موعداً",
    "ru": "Записаться на приём"
  }
}
```

### Key derivation
```js
// SHA-256 of normalized text, first 16 hex chars
const key = crypto.createHash("sha256")
  .update(normalizeTranslationText(text))
  .digest("hex")
  .slice(0, 16);
```

### Normalization
```js
function normalizeTranslationText(value) {
  return String(value)
    .replace(/&apos;|&#x27;|&#39;/g, "'")
    .replace(/&quot;|&#x22;|&#34;/g, '"')
    .replace(/&amp;|&#x26;|&#38;/g, "&")
    .replace(/&nbsp;|&#xA0;|&#160;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
```

---

## 8. Translation Script (`scripts/translate.mjs`)

Copy and adapt `drVikramWebsite/scripts/translate.mjs` — it is the most robust reference. Key adaptations for Dr. Manjinder:

### 8.1 Scope files to update
```js
const scopeFiles = {
  "shared-ui": [
    "src/components/Header.tsx",
    "src/components/Footer.tsx",
    "src/components/FloatingWhatsApp.tsx",
    "src/components/BookingModal.tsx",
  ],
  home: [
    "src/app/page.tsx",
    "src/components/SymptomTriageWidget.tsx",
    "src/components/TreatmentsFilterGrid.tsx",
    "src/components/TreatmentsCarousel.tsx",
  ],
  about: ["src/app/about-us/page.tsx"],
  expertise: ["src/app/expertise/page.tsx"],
  contact: ["src/app/contact-us/page.tsx"],
  blogs: ["src/app/blogs/page.tsx", "src/app/blogs/[slug]/page.tsx"],
  treatments: ["src/app/treatments/page.tsx", "src/app/treatments/[slug]/page.tsx"],
  procedures: ["src/app/procedures/page.tsx", "src/app/procedures/[slug]/page.tsx"],
  testimonials: ["src/app/testimonials/page.tsx"],
  "video-gallery": ["src/app/video-gallery/page.tsx"],
  "patient-stories": ["src/app/patient-stories/page.tsx", "src/app/patient-stories/[slug]/page.tsx"],
  "consultation-plans": ["src/app/consultation-plans/page.tsx"],
};
```

> The script also iterates `scopeCmsCollections` (if defined) to pull live CMS content and add those strings to the memory. Set `scopeCmsCollections = { blogs: ["new-blogs"], treatments: ["treatments"] }`.

### 8.2 Style guide (update doctor name + specialty)
```js
const localeStyleGuides = {
  hi: [
    "Write natural, impactful Hindi for cardiac patients in India. Prefer clear healthcare copy over literal word-for-word translation.",
    "Use warm, trustworthy, patient-friendly wording.",
    "Keep medical terms like angioplasty, TAVR, TAVI, pacemaker, ECG, echocardiogram, stent, cathlab recognizable.",
    "Keep Dr. Manjinder Sandhu, Atrius Cardiac Care, hospital names, addresses, emails, phone numbers, URLs unchanged.",
  ],
  ar: [ /* similar, Arabic healthcare copy */ ],
  ru: [ /* similar, Russian healthcare copy */ ],
};
```

### 8.3 npm scripts to add to `package.json`
```json
{
  "scripts": {
    "translate": "node scripts/translate.mjs",
    "translate:dry-run": "node scripts/translate.mjs --dry-run",
    "translate:shared": "node scripts/translate.mjs --scope=shared-ui,home,about,expertise,contact",
    "translate:content": "node scripts/translate.mjs --scope=blogs,treatments,procedures",
    "build": "next build"
  }
}
```

### 8.4 Required dependency for the translate script
The script uses `typescript` for AST parsing:
```bash
npm install --save-dev typescript
```
(Already in devDependencies — verify.)

---

## 9. Language Switcher Component

Create `src/components/LanguageSwitcher.tsx` as a **Client Component** (`"use client"`).

### Behavior
- Shows current locale's native label (e.g. `हिन्दी`, `العربية`)
- On click: dropdown lists all 4 locales, each linking to `localizePath(currentPath, locale)`
- Closes on: outside click, Escape key, route change, option click
- RTL-aware: menu opens to `inset-inline-start: 0` in RTL

### Implementation pattern (from Dr. Vikram)
Use a native `<details>` element for the trigger — it handles open/close without JS for click, and document listeners handle the edge cases (Escape, outside click, route change).

### Where to insert
Add `<LanguageSwitcher locale={locale} currentPath={...} />` into the `<Header>` component. For localized pages the locale comes from the URL; for English pages it defaults to `"en"`. The header needs to be a Client Component boundary (or accept locale as a prop from its server parent).

---

## 10. SEO — `lang`, `dir`, `canonical`, `hreflang`

### Layout changes (`src/app/layout.tsx`)
The root layout currently sets a fixed `lang="en"`. For localized pages this must be dynamic:

- The root layout's `<html>` tag cannot be locale-aware for both English and localized routes using the same layout file.
- **Solution (Dr. Tripti pattern):** Create a **separate layout for `[locale]`** at `src/app/[locale]/layout.tsx` that reads `params.locale` and sets `lang` and `dir` accordingly.

```tsx
// src/app/[locale]/layout.tsx
import { getLocaleMeta } from "@/lib/i18n-config";
import { Noto_Sans_Devanagari, Noto_Sans_Arabic } from "next/font/google";

export default function LocaleLayout({ children, params }) {
  const meta = getLocaleMeta(params.locale);
  // Select locale-appropriate font class
  return (
    <html lang={meta.code} dir={meta.dir}>
      <body className={localeFontClass}>{children}</body>
    </html>
  );
}
```

### Metadata for localized pages
Each localized page should export or have its parent generate:
```tsx
export async function generateMetadata({ params }) {
  const locale = params.locale;
  const slug = (params.slug ?? []).join("/");
  const baseUrl = "https://www.drmanjindersandhu.com";

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}/${slug}`,
      languages: {
        en:        `${baseUrl}/${slug}`,
        hi:        `${baseUrl}/hi/${slug}`,
        ar:        `${baseUrl}/ar/${slug}`,
        ru:        `${baseUrl}/ru/${slug}`,
        "x-default": `${baseUrl}/${slug}`,
      },
    },
  };
}
```

### Sitemap (`src/app/sitemap.ts`)
Extend to include all localized URLs with `xhtml:link` alternates. Next.js 15's `MetadataRoute.Sitemap` supports `alternates` — use it:
```ts
{
  url: "https://www.drmanjindersandhu.com/hi/treatments/echocardiography/",
  alternates: {
    languages: {
      en: "https://www.drmanjindersandhu.com/treatments/echocardiography/",
      hi: "https://www.drmanjindersandhu.com/hi/treatments/echocardiography/",
      ar: "https://www.drmanjindersandhu.com/ar/treatments/echocardiography/",
      ru: "https://www.drmanjindersandhu.com/ru/treatments/echocardiography/",
    },
  },
}
```

---

## 11. RTL CSS Rules

Arabic (`locale === "ar"`) requires `dir="rtl"` on `<html>`. All CSS that uses physical `left`/`right` positioning must be replaced with logical properties:

| Physical (avoid) | Logical (use) |
|---|---|
| `left: 0` | `inset-inline-start: 0` |
| `right: 0` | `inset-inline-end: 0` |
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `border-left` | `border-inline-start` |
| `text-align: left` | `text-align: start` |

**Common fix areas in this site:**
- Timeline vertical line (`.timeline-line { inset-inline-start: 24px }`)
- Procedure stepper rail active markers
- Language switcher dropdown positioning
- Header nav dropdowns
- Floating appointment card position in hero

---

## 12. Fonts

Add locale-specific fonts to avoid missing glyph boxes:
```ts
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Arabic } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], weight: [...], display: "swap" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: [...], display: "swap" });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], weight: [...], display: "swap" });

// Select based on locale:
// "hi" → devanagari.className
// "ar" → arabic.className
// "ru" or "en" → inter.className (Cyrillic subset already covers Russian)
```

---

## 13. Keys to Skip in Translation

The translate script and the `translateObjectForLocale` helper must skip these field keys:

```js
const SKIPPED_KEYS = new Set([
  "slug", "id", "href", "url", "videoUrl", "canonical", "canonicalPath",
  "ogImage", "src", "image", "icon", "cardImage", "bannerImage", "authorImage",
  "videoThumbnail", "publishedAt", "publishedLabel", "access_key", "from_name",
  "media_id", "download_url", "filename", "preview_url", "entry_id", "collection_id",
]);

const SKIPPED_KEY_PARTS = ["path", "url", "href", "src", "image", "thumbnail", "icon", "class", "type"];
```

> **Gotcha:** Do NOT skip the substring `"id"` globally — it would accidentally skip fields like `videoHeading`, `videoDescription` (which contain `id`). Only skip the exact key `"id"`.

---

## 14. Implementation Order

Follow this order to minimize rework and keep the build green at every step:

1. **Add `typescript` to devDependencies** (if not already present for translate script AST parsing).
2. **Create `.cache/` directory** with an empty `translation-memory.json` (`{}`); add `.gitignore` exception for it.
3. **Create `lib/i18n-config.ts`** — locale list, helpers.
4. **Create `lib/i18n.ts`** — normalize, decode, translate helpers.
5. **Create `lib/cms.ts`** — dual-mode connector with local fallbacks; update `src/data/*.ts` imports in pages to go through CMS functions.
6. **Validate build** — `npm run build` must still pass with local data.
7. **Create `lib/i18n-render.tsx`** — React tree translator (reads from `.cache/translation-memory.json`).
8. **Create `src/app/[locale]/layout.tsx`** — locale-aware HTML `lang`/`dir`, locale fonts.
9. **Create `src/app/[locale]/[[...slug]]/page.tsx`** — locale routing + `generateStaticParams` + page dispatcher + `translateReactTree`.
10. **Validate build** — `npm run build` must pass; static output has `/hi`, `/ar`, `/ru` routes.
11. **Create `scripts/translate.mjs`** — copy from Dr. Vikram, update `scopeFiles`, style guides, doctor name.
12. **Run dry-run** — `npm run translate:dry-run` shows missing count (expected: large, since memory is empty).
13. **Create `src/components/LanguageSwitcher.tsx`**; insert into Header.
14. **Update `src/app/sitemap.ts`** — add localized URLs with `alternates`.
15. **Add SEO metadata** — `generateMetadata` in locale layout or `[[...slug]]/page.tsx`.
16. **RTL CSS pass** — go through `src/app/globals.css` and component CSS, replace physical with logical properties.
17. **Run first translation** — `npm run translate -- --scope=shared-ui,home,about` (requires `GEMINI_API_KEY` in `.env.local`).
18. **Verify output** — `npm run build && npx serve out`, check `/hi`, `/ar`, `/ru`, language switcher, RTL layout.
19. **Translate remaining scopes** — content, blogs, treatments, procedures.
20. **Final dry-run** — `npm run translate:dry-run` → `Missing translations: 0`.
21. **Commit** — commit `.cache/translation-memory.json`, **not** `.env.local`.

---

## 15. Files Created / Modified Summary

| File | Action | Notes |
|---|---|---|
| `lib/cms.ts` | **Create** | Dual-mode CMS connector |
| `lib/i18n-config.ts` | **Create** | Locale list, path helpers |
| `lib/i18n.ts` | **Create** | Normalize, decode, translate |
| `lib/i18n-render.tsx` | **Create** | React tree translator (App Router) |
| `scripts/translate.mjs` | **Create** | Gemini translation pipeline |
| `.cache/translation-memory.json` | **Create** | Start as `{}`, gets populated by translate script |
| `.gitignore` | **Modify** | Add `!.cache/translation-memory.json` exception |
| `src/app/[locale]/layout.tsx` | **Create** | Locale-aware html lang/dir, fonts |
| `src/app/[locale]/[[...slug]]/page.tsx` | **Create** | Locale routing, page dispatcher |
| `src/components/LanguageSwitcher.tsx` | **Create** | Language dropdown, client component |
| `src/components/Header.tsx` | **Modify** | Insert LanguageSwitcher |
| `src/app/sitemap.ts` | **Modify** | Add localized URL entries |
| `src/app/globals.css` | **Modify** | RTL logical CSS properties pass |
| `package.json` | **Modify** | Add translate scripts |
| `next.config.ts` | **No change** | Already has `output: "export"`, `trailingSlash: true` |

---

## 16. Quality Checklist (before declaring done)

- [ ] English routes still work unprefixed (`/`, `/treatments/echocardiography/`).
- [ ] `/hi`, `/ar`, `/ru` top-level and deep routes exist in static `out/`.
- [ ] `<html lang="hi" dir="ltr">`, `<html lang="ar" dir="rtl">`, `<html lang="ru" dir="ltr">` verified in generated HTML.
- [ ] Arabic pages genuinely RTL — no physical `left/right` leaking.
- [ ] Language switcher links to same page in all 4 locales; closes on outside-click, Escape, route change.
- [ ] Header/footer links stay inside current locale prefix.
- [ ] `npm run translate:dry-run` → `Missing translations: 0`.
- [ ] `npm run build` passes clean.
- [ ] Sitemap has unique URLs (no duplicate `<loc>`).
- [ ] Hreflang alternates present on all pages.
- [ ] `.cache/translation-memory.json` committed.
- [ ] `.env.local` NOT committed.
- [ ] `npx serve out` works locally (test at least en/hi/ar locales manually).
- [ ] CMS fallback works — build succeeds with `.env.local` removed.

---

## 17. Common Pitfalls

| Problem | Cause | Fix |
|---|---|---|
| Some text stays English on `/hi` | String not in translation memory | Run `translate:dry-run`, check missing; likely a new string added after last translate run |
| Build fails with "cannot find `.cache/translation-memory.json`" | File not created | Create empty `{}` file; add gitignore exception |
| Arabic layout broken (elements overlap left rail) | Physical CSS `left`/`right` | Audit globals.css; replace with logical properties |
| Language switcher dropdown stays open | Native `<details>` doesn't auto-close on outside click | Add document `pointerdown` listener; remove `open` attribute manually |
| CMS images 404 in static export | Signed URL expired; image not downloaded | Ensure `resolveImage()` downloads to `public/cms-images/` before writing `src` attr |
| Duplicate `<html>` in output | Root `layout.tsx` and `[locale]/layout.tsx` both render `<html>` | `[locale]/layout.tsx` must be a nested layout — Next.js App Router does NOT require re-declaring `<html>` in nested layouts; only one root `<html>` allowed. Instead: pass `lang` and `dir` to root layout via a mechanism, or make the root layout accept dynamic locale from a shared context. **Simplest fix:** keep only root `layout.tsx` for `<html>`, make locale-specific only the `<body>` className for fonts, and set `lang`/`dir` via a client effect in a `LocaleHydrator` component. |
| `generateStaticParams` runs CMS fetch but CMS not connected | CMS functions called without env vars | Always wrap CMS calls in `.catch(() => [])` in `generateStaticParams` |
