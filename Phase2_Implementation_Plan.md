# Phase 2 Implementation Plan
## Dr. Manjinder Sandhu Website — CMS + Multilingual

> **Reference skill doc:** `CMS_and_Multilingual_Implementation_Skill.md`
> **Stack:** Next.js 15 · App Router · `output: "export"` · `trailingSlash: true` · TypeScript

---

## Current State Snapshot

```
Already exists:
  src/data/*.ts          — 10 local data files (treatments, blogs, procedures, etc.)
  src/app/layout.tsx     — root layout, <html lang="en"> hardcoded
  src/components/        — 25 components (Header, Footer, FloatingWhatsApp, etc.)
  scripts/serve.mjs      — static server only
  .gitignore             — no .cache exception yet
  package.json           — no translate scripts yet

Does NOT exist yet:
  lib/                   — entire lib folder is missing
  src/app/[locale]/      — no locale routing
  src/components/LanguageSwitcher.tsx
  scripts/translate.mjs
  .cache/translation-memory.json
```

---

## Milestone Map

```
M1  Project scaffolding & gitignore fix          (~30 min)
M2  CMS connector (lib/cms.ts)                   (~2 hrs)
M3  i18n config & utilities                      (~45 min)
M4  React tree translator (lib/i18n-render.tsx)  (~45 min)
M5  Locale routing & locale layout               (~1.5 hrs)
M6  Language switcher + Header integration       (~1 hr)
M7  SEO — metadata, sitemap, hreflang            (~1 hr)
M8  Translation script + first translate run     (~1 hr)
M9  RTL CSS pass                                 (~1 hr)
M10 QA & final verification                      (~1 hr)
```

---

## M1 — Project Scaffolding & Gitignore

### M1.1 — Fix `.gitignore`

Add the translation-memory exception so it is committed even though the `.cache/` dir exists:

```diff
# .gitignore
+ # Translation memory must be committed (even though under .cache/)
+ !.cache/translation-memory.json
```

Also add a `.cache` rule if not already ignored:

```diff
+ .cache/
+ !.cache/translation-memory.json
```

### M1.2 — Create `.cache/translation-memory.json`

Create with an empty object so imports don't fail at build time:

```json
{}
```

### M1.3 — Add npm scripts to `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "node scripts/serve.mjs",
    "lint": "tsc --noEmit",
    "typecheck": "tsc --noEmit",
    "translate": "node scripts/translate.mjs",
    "translate:dry-run": "node scripts/translate.mjs --dry-run",
    "translate:shared": "node scripts/translate.mjs --scope=shared-ui,home,about,expertise,contact",
    "translate:content": "node scripts/translate.mjs --scope=blogs,treatments,procedures,testimonials,video-gallery,patient-stories,consultation-plans"
  }
}
```

### M1.4 — Install `typescript` dev dependency (for translate script AST)

```bash
npm install --save-dev typescript
```

> **Check:** `typescript` is already listed in `devDependencies` — verify it's there, otherwise install.

### ✅ M1 Acceptance
- `npm run build` still passes (no changes to app code yet).
- `.cache/translation-memory.json` exists and is tracked by git.

---

## M2 — CMS Connector (`lib/cms.ts`)

Create `lib/cms.ts` at project root (same level as `src/`, matching both reference repos).

### M2.1 — File structure

```
lib/
  cms.ts       ← create now
  (more files added in M3, M4)
```

### M2.2 — Implementation outline

The file must implement the **dual-mode pattern**: CMS when `CMS_API_URL` + `CMS_API_TOKEN` are set; local data fallback otherwise.

```
Env vars read:
  CMS_API_URL        — base URL of CMS API
  CMS_API_TOKEN      — Bearer token
  CMS_RETRY_ATTEMPTS — default 5
  CMS_RETRY_DELAY_MS — default 700

Internal helpers (not exported):
  fetchWithRetry(url, init, label)   — exponential backoff on 408/429/5xx
  cmsPost<T>(endpoint, body)         — POST /api/{endpoint} with auth headers
  fetchCollection(slug)              — cached per build, returns unknown[]
  localizeCmsMedia(value)            — recursively resolves { media_id } → { src, alt }
  downloadTo(url, absPath)           — streams CMS image to public/cms-images/
  findLocalMediaPath(mediaId)        — checks if already downloaded

Exported functions:
  getTreatments()    → Treatment[]   (CMS "treatments"    OR import from src/data/treatments.ts)
  getBlogPosts()     → BlogPost[]    (CMS "new-blogs"     OR import from src/data/blogs.ts)
  getGalleryVideos() → string[]      (CMS "video"         OR import from src/data/videos.ts)
  getProcedures()    → Procedure[]   (CMS "procedures"    OR import from src/data/procedures.ts)

Exported type helpers:
  entryData<T>(item)        — unwraps { entry_id, entry: {...} } → T
  resolveImage(field)       — CmsMedia → local path string
  asString(v, fallback)
  asArray(v)
  asRecord(v)
  asNumber(v, fallback)
  toStringArray(v)
  asMedia(v)

Exported types:
  CmsMedia
  CmsRecord
```

### M2.3 — Treatment normalizer

When CMS data arrives, each treatment entry must be normalized into the **same shape** as `src/data/treatments.ts`. Map CMS field names → local TypeScript field names:

| CMS field | Local field | Notes |
|---|---|---|
| `entry.slug` | `slug` | |
| `entry.title` | `title` | |
| `entry.category` | `category` | lowercase |
| `entry.description` / `entry.excerpt` | `shortDescription` | |
| `entry.fullOverview` | `fullOverview` | |
| `entry.hero_image` | `heroImage` | run through `resolveImage()` |
| `entry.content_image` | `contentImage` | run through `resolveImage()` |
| `entry.seoTitle` | `seoTitle` | |
| `entry.metaDescription` | `metaDescription` | |
| `entry.keywords` | `keywords` | `toStringArray()` |
| `entry.faqs` | `faqs` | normalize each `{ q, a }` or `{ question, answer }` |
| `entry.whoNeedsIt` | `whoNeedsIt` | `toStringArray()` |
| `entry.procedureSummary` | `procedureSummary` | |
| `entry.recoveryTimeline` | `recoveryTimeline` | |
| `entry.benefits` | `benefits` | `toStringArray()` |

### M2.4 — Update page imports

After `lib/cms.ts` is created, update these pages to import through the CMS functions instead of directly from `src/data/`:

| Page file | Current import | New import |
|---|---|---|
| `src/app/treatments/page.tsx` | `import { treatments } from "@/data/treatments"` | `import { getTreatments } from "@/lib/cms"` (make page async) |
| `src/app/treatments/[slug]/page.tsx` | `import { treatments } from "@/data/treatments"` | `import { getTreatments } from "@/lib/cms"` |
| `src/app/blogs/page.tsx` | `import { blogs } from "@/data/blogs"` | `import { getBlogPosts } from "@/lib/cms"` |
| `src/app/blogs/[slug]/page.tsx` | same | same |
| `src/app/video-gallery/page.tsx` | `import { videos } from "@/data/videos"` | `import { getGalleryVideos } from "@/lib/cms"` |
| `src/app/procedures/page.tsx` | `import { procedures } from "@/data/procedures"` | `import { getProcedures } from "@/lib/cms"` |
| `src/app/procedures/[slug]/page.tsx` | same | same |
| `src/app/sitemap.ts` | direct data imports | CMS function imports |

> **Key rule:** Each updated page becomes `async` if it wasn't already. The CMS functions return the same TypeScript types as the local data, so no JSX changes are needed — just the data source.

### M2.5 — `tsconfig.json` path alias for `lib/`

Ensure `@/lib/...` resolves. Check `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      // ADD if not present:
      "@/lib/*": ["./lib/*"],
      "@/data/*": ["./src/data/*"]
    }
  }
}
```

> **Note:** The current tsconfig likely only maps `"@/*": ["./src/*"]`. Since `lib/` is at root (not inside `src/`), you need a separate alias, OR put lib inside `src/lib/`. **Recommended:** put `lib/` inside `src/lib/` to avoid tsconfig changes — this keeps `@/lib/cms` working with the existing `"@/*": ["./src/*"]` alias.

**Decision point:** Place `lib/` at `src/lib/` (simpler, no tsconfig changes needed).

### ✅ M2 Acceptance
- `npm run build` passes with local data fallback (no `.env.local` CMS vars needed).
- All page imports go through `lib/cms.ts`.
- No TypeScript errors.

---

## M3 — i18n Config & Utilities

### M3.1 — `src/lib/i18n-config.ts`

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

export function isLocale(v: string | undefined): v is Locale
export function getLocaleMeta(locale: string | undefined)
export function stripLocaleFromPath(pathname?: string): string
export function localizePath(pathname?: string, locale?: Locale): string
export function getLocaleFromPath(pathname?: string): Locale
```

### M3.2 — `src/lib/i18n.ts`

```ts
import { DEFAULT_LOCALE, LOCALES, type Locale, getLocaleMeta, localizePath } from "./i18n-config";

export function normalizeTranslationText(value: unknown): string
export function decodeTranslationEntities(value: unknown): string
export function translateText(locale: Locale, value: string, clientTranslations?: Record<string,string>): string

export { DEFAULT_LOCALE, LOCALES, getLocaleMeta, localizePath };
export type { Locale };
```

### ✅ M3 Acceptance
- No TypeScript errors on `tsc --noEmit`.
- `npm run build` still passes.

---

## M4 — React Tree Translator (`src/lib/i18n-render.tsx`)

### M4.1 — File

```ts
// src/lib/i18n-render.tsx
"use server";  // NOT required — this is a plain module, not a Server Action

import React, { cloneElement, isValidElement } from "react";
import translationMemory from "../../.cache/translation-memory.json";
// Path relative to src/lib/ → project root .cache/

type LocaleCode = "en" | "hi" | "ar" | "ru";

export function translateReactTree(node: React.ReactNode, locale: LocaleCode): React.ReactNode
```

### M4.2 — Logic (copy from `drTriptiWebsite/lib/i18n-render.tsx`, adapt path)

Key behaviours:
- Returns `node` unchanged if `locale === "en"`.
- Skips tags: `script`, `style`, `noscript`, `svg`, `canvas`, `code`, `pre`.
- Translates text attributes: `alt`, `aria-label`, `placeholder`, `title`.
- Localizes link attributes: `href`, `action` (via `localizePath`).
- Preserves leading/trailing whitespace of text nodes.
- Builds a `Map<normalizedEnglish, translatedText>` per locale at module load time.

### M4.3 — `tsconfig.json` — allow JSON import

Ensure `resolveJsonModule: true` is in `tsconfig.json` (it usually is by default in Next.js):

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

### ✅ M4 Acceptance
- `import { translateReactTree } from "@/lib/i18n-render"` works without TypeScript errors.
- With empty translation memory, `translateReactTree(node, "hi")` returns node unchanged (no crashes).

---

## M5 — Locale Routing & Locale Layout

### M5.1 — `src/app/[locale]/layout.tsx`

This is a **nested layout** that handles locale-specific HTML attributes. In Next.js App Router, a segment layout wraps its segment's content — but only the **root** `layout.tsx` can render `<html>` and `<body>`. A nested locale layout CANNOT re-declare `<html>`.

**Solution:** The locale layout only renders a `<div>` wrapper and uses a `LocaleHydrator` client component to update `document.documentElement.lang` and `document.documentElement.dir` on the client.

```tsx
// src/app/[locale]/layout.tsx
import { LocaleHydrator } from "@/components/LocaleHydrator";
import { getLocaleMeta } from "@/lib/i18n-config";
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Arabic } from "next/font/google";

// Font instances
const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], display: "swap" });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], display: "swap" });

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const meta = getLocaleMeta(locale);
  const fontClass =
    locale === "hi" ? devanagari.className :
    locale === "ar" ? arabic.className :
    inter.className;

  return (
    <>
      <LocaleHydrator locale={meta.code} dir={meta.dir} />
      <div className={fontClass}>{children}</div>
    </>
  );
}
```

### M5.2 — `src/components/LocaleHydrator.tsx` (new client component)

```tsx
"use client";
import { useEffect } from "react";

export function LocaleHydrator({ locale, dir }: { locale: string; dir: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir  = dir;
  }, [locale, dir]);
  return null;
}
```

### M5.3 — `src/app/[locale]/[[...slug]]/page.tsx`

This is the main locale catch-all. Full implementation:

```tsx
import { notFound } from "next/navigation";
import { isLocale, TARGET_LOCALES } from "@/lib/i18n-config";
import { translateReactTree } from "@/lib/i18n-render";
import { getTreatments, getBlogPosts, getProcedures } from "@/lib/cms";

// ---- Static page imports ----
import HomePage              from "../../page";
import AboutPage             from "../../about-us/page";
import ExpertisePage         from "../../expertise/page";
import TreatmentsPage        from "../../treatments/page";
import TreatmentDetailPage   from "../../treatments/[slug]/page";
import ProceduresPage        from "../../procedures/page";
import ProcedureDetailPage   from "../../procedures/[slug]/page";
import ConsultationPlansPage from "../../consultation-plans/page";
import PatientStoriesPage    from "../../patient-stories/page";
import TestimonialsPage      from "../../testimonials/page";
import VideoGalleryPage      from "../../video-gallery/page";
import BlogsPage             from "../../blogs/page";
import BlogPostPage          from "../../blogs/[slug]/page";
import ContactPage           from "../../contact-us/page";

// generateStaticParams — builds all /hi /ar /ru static paths
export async function generateStaticParams() {
  const [blogPosts, treatments, procedures] = await Promise.all([
    getBlogPosts().catch(() => []),
    getTreatments().catch(() => []),
    getProcedures().catch(() => []),
  ]);

  const staticRoutes = [
    [], ["about-us"], ["expertise"], ["treatments"], ["procedures"],
    ["consultation-plans"], ["patient-stories"], ["testimonials"],
    ["video-gallery"], ["blogs"], ["contact-us"],
  ];

  const dynamicRoutes = [
    ...blogPosts.map(p => ["blogs", p.slug]),
    ...treatments.map(t => ["treatments", t.slug]),
    ...procedures.map(p => ["procedures", p.slug]),
  ];

  return TARGET_LOCALES.flatMap(locale =>
    [...staticRoutes, ...dynamicRoutes].map(slug => ({ locale: locale.code, slug }))
  );
}

// generateMetadata — canonical + hreflang per page
export async function generateMetadata({ params }) {
  const { locale, slug = [] } = await params;
  const path = slug.join("/");
  const base = "https://www.drmanjindersandhu.com";
  const en   = `${base}/${path}${path ? "/" : ""}`;

  return {
    alternates: {
      canonical: locale === "en" ? en : `${base}/${locale}/${path}/`,
      languages: {
        "en":        en,
        "hi":        `${base}/hi/${path}/`,
        "ar":        `${base}/ar/${path}/`,
        "ru":        `${base}/ru/${path}/`,
        "x-default": en,
      },
    },
  };
}

// Main page component
export default async function LocalizedPage({ params }) {
  const { locale, slug = [] } = await params;

  if (!isLocale(locale) || locale === "en") return notFound();

  const page = await getPage(slug);
  if (!page) return notFound();

  return <>{translateReactTree(page, locale)}</>;
}

// Page dispatcher
async function getPage(slug: string[]) {
  const route = slug.join("/");

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

  if (slug[0] === "blogs"          && slug[1]) return BlogPostPage({ params: Promise.resolve({ slug: slug[1] }) });
  if (slug[0] === "treatments"     && slug[1]) return TreatmentDetailPage({ params: Promise.resolve({ slug: slug[1] }) });
  if (slug[0] === "procedures"     && slug[1]) return ProcedureDetailPage({ params: Promise.resolve({ slug: slug[1] }) });
  if (slug[0] === "patient-stories" && slug[1]) return PatientStoriesPage({ params: Promise.resolve({ slug: slug[1] }) });

  return null;
}
```

> **Next.js 15 note:** `params` is now a `Promise` in App Router server components. Use `await params` before destructuring.

### ✅ M5 Acceptance
- `npm run build` produces `/hi/`, `/ar/`, `/ru/` directories in `out/`.
- `out/hi/index.html` exists and contains English text (translations come later in M8).
- No 404s on known English routes (`/`, `/treatments/`).
- `out/hi/treatments/radial-angiography-angioplasty/index.html` exists.

---

## M6 — Language Switcher & Header Integration

### M6.1 — `src/components/LanguageSwitcher.tsx`

New **client component**:

```tsx
"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LOCALES, localizePath, stripLocaleFromPath } from "@/lib/i18n-config";

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const barePath = stripLocaleFromPath(pathname);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    // Close on outside click
    const handlePointerDown = (e: PointerEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(e.target as Node)) {
        detailsRef.current.removeAttribute("open");
      }
    };
    // Close on Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") detailsRef.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const current = LOCALES.find(l => l.code === currentLocale) ?? LOCALES[0];

  return (
    <details className="language-switcher" ref={detailsRef}>
      <summary aria-label="Switch language">
        {current.nativeLabel} <span className="lang-chevron" />
      </summary>
      <ul className="language-switcher__menu" role="menu">
        {LOCALES.map(locale => (
          <li key={locale.code} role="none">
            <a
              href={localizePath(barePath, locale.code)}
              role="menuitem"
              aria-current={locale.code === currentLocale ? "true" : undefined}
              onClick={() => detailsRef.current?.removeAttribute("open")}
            >
              {locale.nativeLabel}
              <span className="lang-label">{locale.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
```

### M6.2 — Header integration

The existing `Header.tsx` is already a client component (it manages mobile menu state). Add `LanguageSwitcher`:

```tsx
// In Header.tsx — add import:
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Read locale from URL in the Header:
// Option A: read via usePathname + getLocaleFromPath
// Option B: accept locale as prop from layout

// Recommended: use usePathname inside Header (it's already a client component):
import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@/lib/i18n-config";

// Inside component:
const pathname = usePathname();
const locale = getLocaleFromPath(pathname);

// In JSX, add next to the booking CTA button:
<LanguageSwitcher currentLocale={locale} />
```

### M6.3 — CSS for language switcher

Add to `src/app/globals.css` (or a scoped CSS module):

```css
/* Language Switcher */
.language-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.language-switcher summary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 8px;
  background: transparent;
  color: var(--text-dark);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s;
}
.language-switcher summary:hover,
.language-switcher[open] summary {
  background: var(--primary-light);
  border-color: var(--border-color);
}
.language-switcher summary::-webkit-details-marker { display: none; }
.lang-chevron {
  display: inline-block;
  width: 6px; height: 6px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.15s;
}
.language-switcher[open] .lang-chevron {
  transform: rotate(225deg) translateY(-2px);
}
.language-switcher__menu {
  position: absolute;
  top: calc(100% + 8px);
  inset-inline-end: 0;
  z-index: 300;
  min-width: 160px;
  padding: 6px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 16px 40px rgba(8,39,58,0.12);
  list-style: none;
  margin: 0;
}
.language-switcher__menu a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--text-dark);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.12s;
}
.language-switcher__menu a:hover,
.language-switcher__menu a[aria-current="true"] {
  background: var(--primary-light);
  color: var(--primary);
}
.lang-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 400;
}
```

### ✅ M6 Acceptance
- Language switcher appears in Header on all pages.
- Clicking a locale navigates to the correct localized URL.
- Dropdown closes on outside click and Escape.
- Works on `/` (English) and `/hi/` (Hindi).

---

## M7 — SEO: Metadata, Sitemap, Hreflang

### M7.1 — Root layout hreflang (English pages)

Update `src/app/layout.tsx` to add hreflang for English pages. The easiest approach: export a `generateMetadata` from each English page, or add `alternates` to the root `metadata` export.

For static pages that can't receive `params`, create a utility:

```ts
// src/lib/seo.ts
const BASE_URL = "https://www.drmanjindersandhu.com";

export function buildHreflang(path: string) {
  const clean = path.endsWith("/") ? path : `${path}/`;
  return {
    alternates: {
      canonical: `${BASE_URL}${clean}`,
      languages: {
        "en":        `${BASE_URL}${clean}`,
        "hi":        `${BASE_URL}/hi${clean}`,
        "ar":        `${BASE_URL}/ar${clean}`,
        "ru":        `${BASE_URL}/ru${clean}`,
        "x-default": `${BASE_URL}${clean}`,
      },
    },
  };
}
```

Add `export const metadata = { ...buildHreflang("/treatments/") }` to each English static page.

For dynamic pages (`treatments/[slug]`, `blogs/[slug]`), export `generateMetadata`:

```ts
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const treatment = (await getTreatments()).find(t => t.slug === slug);
  return {
    title: treatment?.seoTitle ?? treatment?.title,
    description: treatment?.metaDescription,
    ...buildHreflang(`/treatments/${slug}/`),
  };
}
```

### M7.2 — Update `src/app/sitemap.ts`

Extend to include all locale URLs:

```ts
import { getTreatments, getBlogPosts, getProcedures } from "@/lib/cms";
import { LOCALE_CODES } from "@/lib/i18n-config";

const BASE = "https://www.drmanjindersandhu.com";

function makeEntry(path: string) {
  const clean = path.endsWith("/") ? path : `${path}/`;
  return {
    url: `${BASE}${clean}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        LOCALE_CODES.map(locale => [
          locale,
          locale === "en"
            ? `${BASE}${clean}`
            : `${BASE}/${locale}${clean}`,
        ])
      ),
    },
  };
}

export default async function sitemap() {
  const [treatments, blogs, procedures] = await Promise.all([
    getTreatments().catch(() => []),
    getBlogPosts().catch(() => []),
    getProcedures().catch(() => []),
  ]);

  const staticPaths = ["/", "/about-us", "/expertise", "/treatments",
    "/procedures", "/consultation-plans", "/patient-stories",
    "/testimonials", "/video-gallery", "/blogs", "/contact-us"];

  const dynamicPaths = [
    ...treatments.map(t => `/treatments/${t.slug}`),
    ...blogs.map(b => `/blogs/${b.slug}`),
    ...procedures.map(p => `/procedures/${p.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];

  // Include both English and localized URLs
  const entries = allPaths.flatMap(path => [
    makeEntry(path),
    ...["hi","ar","ru"].map(locale => ({
      ...makeEntry(path),
      url: `${BASE}/${locale}${path === "/" ? "" : path}/`,
    })),
  ]);

  return entries;
}
```

### ✅ M7 Acceptance
- Each English page has `<link rel="canonical">` and four `<link rel="alternate" hreflang="...">` in its `<head>`.
- Sitemap includes `/hi/`, `/ar/`, `/ru/` URLs.
- No duplicate `<loc>` entries in sitemap.

---

## M8 — Translation Script & First Translate Run

### M8.1 — `scripts/translate.mjs`

Copy `drVikramWebsite/scripts/translate.mjs` verbatim, then apply these changes:

**1. Update scope file paths** (from `pages/` to `src/app/` + `src/components/`):

```js
const scopeFiles = {
  "shared-ui": [
    "src/components/Header.tsx",
    "src/components/Footer.tsx",
    "src/components/FloatingWhatsApp.tsx",
    "src/components/BookingModal.tsx",
    "src/components/LanguageSwitcher.tsx",
  ],
  home: [
    "src/app/page.tsx",
    "src/components/SymptomTriageWidget.tsx",
    "src/components/TreatmentsFilterGrid.tsx",
    "src/components/TreatmentsCarousel.tsx",
    "src/components/ExperienceStats.tsx",
    "src/components/PatientReel.tsx",
  ],
  about:             ["src/app/about-us/page.tsx"],
  expertise:         ["src/app/expertise/page.tsx"],
  contact:           ["src/app/contact-us/page.tsx"],
  blogs:             ["src/app/blogs/page.tsx", "src/app/blogs/[slug]/page.tsx"],
  treatments:        ["src/app/treatments/page.tsx", "src/app/treatments/[slug]/page.tsx"],
  procedures:        ["src/app/procedures/page.tsx", "src/app/procedures/[slug]/page.tsx"],
  testimonials:      ["src/app/testimonials/page.tsx"],
  "video-gallery":   ["src/app/video-gallery/page.tsx"],
  "patient-stories": ["src/app/patient-stories/page.tsx"],
  "consultation-plans": ["src/app/consultation-plans/page.tsx"],
};
```

**2. Update scope CMS collections:**

```js
const scopeCmsCollections = {
  blogs: ["new-blogs"],
  treatments: ["treatments"],
};
```

**3. Update translation prompt — replace doctor/specialty references:**

Change all occurrences of "urology clinic" → "cardiology clinic / cardiac care centre", "Dr. Vikram" → "Dr. Manjinder Sandhu", "Urowellness" → "Atrius Cardiac Care".

**4. Update locale style guides:**

```js
const localeStyleGuides = {
  hi: [
    "Write natural, impactful Hindi for cardiac patients in India. Prefer clear healthcare copy over literal word-for-word translation.",
    "Use warm, trustworthy, patient-friendly wording. Avoid stiff phrasing.",
    "Keep medical terms like angioplasty, TAVR, TAVI, pacemaker, ECG, echocardiogram, stent, cathlab, CTO recognizable.",
    "Keep Dr. Manjinder Sandhu, Atrius Cardiac Care, Fortis, hospital names, addresses, emails, phone numbers, URLs unchanged.",
  ],
  ar: [
    "Write natural, polished Arabic healthcare copy for cardiac patients. Prefer meaning-first localization.",
    "Use Modern Standard Arabic that feels reassuring and professional.",
    "Keep Dr. Manjinder Sandhu, Atrius Cardiac Care, hospital names, phone numbers, URLs unchanged.",
  ],
  ru: [
    "Write natural Russian healthcare copy for cardiac patients. Use professional, calm, trustworthy tone.",
    "Keep Dr. Manjinder Sandhu, Atrius Cardiac Care, hospital names, phone numbers, URLs unchanged.",
  ],
};
```

**5. Update `DEFAULT_SCOPES`:**

```js
const DEFAULT_SCOPES = [
  "shared-ui", "home", "about", "expertise", "contact",
  "blogs", "treatments", "procedures", "testimonials",
  "video-gallery", "patient-stories", "consultation-plans",
];
```

### M8.2 — First translate run (shared UI only)

```bash
# Dry run first to see missing count
npm run translate:dry-run

# Translate shared UI + high-traffic pages
npm run translate:shared
```

Requires `GEMINI_API_KEY` in `.env.local`:

```env
GEMINI_API_KEY=your_key_here
GEMINI_TRANSLATION_MODEL=gemini-2.5-flash
TRANSLATION_BATCH_SIZE=60
```

### M8.3 — Full content translation

```bash
npm run translate:content
```

Translate treatments + blogs + procedures. Re-run if it fails midway (already-saved strings are skipped).

### M8.4 — Final verification

```bash
npm run translate:dry-run  # must show "Missing translations: 0"
npm run build              # must pass
```

### ✅ M8 Acceptance
- `npm run translate:dry-run` → `Missing translations: 0`
- `.cache/translation-memory.json` is non-empty (thousands of entries).
- `npm run build` passes and `/hi/` output contains Hindi text (not English).

---

## M9 — RTL CSS Pass

### M9.1 — Audit `src/app/globals.css` and `src/app/redesign.css`

Search for all occurrences of physical directional CSS:

```powershell
# In project root
Select-String -Path "src\app\*.css","src\components\*.css" -Pattern "\b(left|right|margin-left|margin-right|padding-left|padding-right|border-left|border-right|text-align:\s*left|text-align:\s*right)\b"
```

### M9.2 — Replacement rules

| Replace | With |
|---|---|
| `left: X` | `inset-inline-start: X` |
| `right: X` | `inset-inline-end: X` |
| `margin-left: X` | `margin-inline-start: X` |
| `margin-right: X` | `margin-inline-end: X` |
| `padding-left: X` | `padding-inline-start: X` |
| `padding-right: X` | `padding-inline-end: X` |
| `border-left: X` | `border-inline-start: X` |
| `border-right: X` | `border-inline-end: X` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |

> **Exception:** Do NOT replace physical properties when they are intentionally asymmetric (e.g. a design element that should NOT mirror in RTL — logo, medical diagrams). Use `[dir="ltr"]` selector to scope those.

### M9.3 — Known fix areas to check manually

- `Header.tsx` — mobile drawer slide direction
- `NavigationMotion.tsx` — any slide-in animations
- `ProcedureStepper.tsx` — left rail positioning
- `TransradialRecoveryTimeline.tsx` — timeline connector lines
- `SymptomTriageWidget.tsx` — left/right panel layout
- `FloatingWhatsApp.tsx` — fixed positioning (bottom-right → `inset-inline-end`)
- `BookingModal.tsx` — modal positioning

### M9.4 — Test RTL visually

```bash
npm run build
npx serve out
# Navigate to http://localhost:3000/ar/
```

Check: text is right-to-left, layout doesn't overlap, language switcher opens to correct side.

### ✅ M9 Acceptance
- Arabic page renders correctly RTL — no overlapping elements.
- Procedure stepper rail, header nav, hero layout all flip correctly.
- No physical `left:`/`right:` CSS remaining in layout-sensitive rules.

---

## M10 — Final QA & Commit

### M10.1 — Full quality checklist

- [ ] English routes work unprefixed (`/`, `/treatments/radial-angiography-angioplasty/`).
- [ ] `/hi/`, `/ar/`, `/ru/` top-level routes exist.
- [ ] `/hi/treatments/radial-angiography-angioplasty/` exists.
- [ ] `/ar/blogs/[any-slug]/` exists.
- [ ] `<html lang="hi" dir="ltr">` confirmed in `out/hi/index.html`.
- [ ] `<html lang="ar" dir="rtl">` confirmed in `out/ar/index.html`.
- [ ] Hindi text present in `/hi/` pages (not English).
- [ ] Arabic text present in `/ar/` pages.
- [ ] Language switcher visible in header, correct locale highlighted.
- [ ] Switching locale from `/treatments/echocardiography/` → `/hi/treatments/echocardiography/` works.
- [ ] Language switcher closes on outside click, Escape.
- [ ] `npm run translate:dry-run` → `Missing translations: 0`.
- [ ] `npm run build` passes clean with no TS errors.
- [ ] Sitemap has localized URLs and no duplicates.
- [ ] Hreflang alternates in each page `<head>`.
- [ ] CMS build fallback works (rename `.env.local`, build passes with local data).
- [ ] `.cache/translation-memory.json` is committed.
- [ ] `.env.local` is NOT committed.

### M10.2 — Git commit order

```bash
git add .cache/translation-memory.json
git add src/lib/ src/app/[locale]/ src/components/LanguageSwitcher.tsx src/components/LocaleHydrator.tsx
git add scripts/translate.mjs
git add src/app/sitemap.ts src/app/layout.tsx src/app/globals.css
git add package.json .gitignore
git commit -m "feat: add CMS connector and 4-locale multilingual support (Phase 2)"
```

---

## Files Created / Modified

| File | Status | Milestone |
|---|---|---|
| `.gitignore` | **Modify** | M1 |
| `.cache/translation-memory.json` | **Create** | M1 |
| `package.json` | **Modify** | M1 |
| `src/lib/cms.ts` | **Create** | M2 |
| `src/app/treatments/page.tsx` | **Modify** | M2 |
| `src/app/treatments/[slug]/page.tsx` | **Modify** | M2 |
| `src/app/blogs/page.tsx` | **Modify** | M2 |
| `src/app/blogs/[slug]/page.tsx` | **Modify** | M2 |
| `src/app/video-gallery/page.tsx` | **Modify** | M2 |
| `src/app/procedures/page.tsx` | **Modify** | M2 |
| `src/app/procedures/[slug]/page.tsx` | **Modify** | M2 |
| `src/lib/i18n-config.ts` | **Create** | M3 |
| `src/lib/i18n.ts` | **Create** | M3 |
| `src/lib/i18n-render.tsx` | **Create** | M4 |
| `src/lib/seo.ts` | **Create** | M7 |
| `src/app/[locale]/layout.tsx` | **Create** | M5 |
| `src/app/[locale]/[[...slug]]/page.tsx` | **Create** | M5 |
| `src/components/LocaleHydrator.tsx` | **Create** | M5 |
| `src/components/LanguageSwitcher.tsx` | **Create** | M6 |
| `src/components/Header.tsx` | **Modify** | M6 |
| `src/app/globals.css` | **Modify** | M6 + M9 |
| `src/app/sitemap.ts` | **Modify** | M7 |
| `scripts/translate.mjs` | **Create** | M8 |
| `src/app/*/page.tsx` (all English pages) | **Modify** | M7 (add `generateMetadata`) |

**Total new files: 8 · Modified files: ~20**

---

## Dependency on CMS API Credentials

Phase 2 CMS work requires `.env.local` with real credentials:

```env
CMS_API_URL=https://<ngrok-subdomain>.ngrok-free.app
CMS_API_TOKEN=cms_live_...
```

A new token for Dr. Sandhu's project must be provisioned. Until then, the build always falls back to local data — so development and QA can proceed without CMS credentials.

Translation requires:
```env
GEMINI_API_KEY=your_gemini_key
```
