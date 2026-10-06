import fs from "node:fs";
import path from "node:path";

// -----------------------------------------------------------------------------
// Build-time CMS client — dual-mode:
//   • CMS mode:      CMS_API_URL + CMS_API_TOKEN present in .env.local
//                    → fetches live content from headless CMS at build time
//   • Fallback mode: env vars absent
//                    → silently returns the local src/data/*.ts files
//                    → build ALWAYS succeeds; CMS wiring is purely additive
//
// Import only from Server Components, generateStaticParams, generateMetadata,
// or sitemap.ts — never from a Client Component ("use client").
// -----------------------------------------------------------------------------

const CMS_API_URL = process.env.CMS_API_URL;
const CMS_API_TOKEN = process.env.CMS_API_TOKEN;
const CMS_RETRY_ATTEMPTS = Number(process.env.CMS_RETRY_ATTEMPTS || 5);
const CMS_RETRY_DELAY_MS = Number(process.env.CMS_RETRY_DELAY_MS || 700);

/** True when CMS credentials are available in the environment. */
const CMS_ENABLED = Boolean(CMS_API_URL && CMS_API_TOKEN);

// ─── Internal helpers ────────────────────────────────────────────────────────

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryDelay(attempt: number) {
  return CMS_RETRY_DELAY_MS * attempt;
}

function isRetryableStatus(status: number) {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  label: string,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= CMS_RETRY_ATTEMPTS; attempt += 1) {
    try {
      const res = await fetch(url, {
        ...init,
        headers: {
          ...(init.headers || {}),
          "ngrok-skip-browser-warning": "true",
          Connection: "close",
        },
      });

      if (
        res.ok ||
        !isRetryableStatus(res.status) ||
        attempt === CMS_RETRY_ATTEMPTS
      ) {
        return res;
      }

      lastError = new Error(`${label} failed: ${res.status} ${res.statusText}`);
    } catch (error) {
      lastError = error;

      if (attempt === CMS_RETRY_ATTEMPTS) {
        throw new Error(
          `${label} failed after ${attempt} attempts: ${errorMessage(error)}`,
          { cause: error },
        );
      }
    }

    await wait(retryDelay(attempt));
  }

  throw new Error(`${label} failed: ${errorMessage(lastError)}`);
}

async function cmsPost<T = unknown>(
  endpoint: string,
  body: object,
): Promise<T> {
  const res = await fetchWithRetry(
    `${CMS_API_URL}/api/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CMS_API_TOKEN}`,
      },
      body: JSON.stringify(body),
    },
    `CMS request to "${endpoint}"`,
  );

  if (!res.ok) {
    throw new Error(
      `CMS request to "${endpoint}" failed: ${res.status} ${res.statusText}`,
    );
  }

  return res.json() as Promise<T>;
}

type CmsEntriesResponse = {
  entries?: unknown[];
  data?: unknown[];
  items?: unknown[];
};

const collectionCache = new Map<string, Promise<unknown[]>>();

/**
 * Fetch every entry in a CMS collection.
 * Cached per-build so pages sharing a collection don't duplicate fetches.
 */
export async function fetchCollection(slug: string): Promise<unknown[]> {
  if (collectionCache.has(slug)) return collectionCache.get(slug)!;

  const request = (async () => {
    const data = await cmsPost<unknown[] | CmsEntriesResponse>(
      "content.entries.list",
      { collection_slug: slug, page_size: 100 },
    );

    return Array.isArray(data)
      ? data
      : (data?.entries ?? data?.data ?? data?.items ?? []);
  })();

  collectionCache.set(slug, request);

  try {
    return await request;
  } catch (error) {
    collectionCache.delete(slug);
    throw error;
  }
}

/** Unwrap a CMS list item `{ entry_id, collection_id, entry: {...} }` → inner object. */
export function entryData<T = Record<string, unknown>>(item: unknown): T {
  return ((item as { entry?: unknown })?.entry ?? item) as T;
}

// ─── Media helpers ────────────────────────────────────────────────────────────

async function downloadTo(url: string, absPath: string): Promise<void> {
  const res = await fetchWithRetry(
    url,
    { headers: { "ngrok-skip-browser-warning": "true" } },
    `CMS media download from ${url}`,
  );

  if (!res.ok) {
    throw new Error(
      `Failed to download CMS media from ${url}: ${res.status} ${res.statusText}`,
    );
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, buffer);
}

export type CmsMedia =
  | { media_id?: string; alt_text?: string; name?: string }
  | string
  | null
  | undefined;

const mediaCache = new Map<string, Promise<string>>();

function findLocalMediaPath(mediaId: string): string {
  const mediaDir = path.join(process.cwd(), "public", "cms-images");
  if (!fs.existsSync(mediaDir)) return "";

  const localFile = fs
    .readdirSync(mediaDir)
    .find(
      (filename) =>
        filename === mediaId || filename.startsWith(`${mediaId}.`),
    );

  return localFile ? `/cms-images/${localFile}` : "";
}

/**
 * Resolve a CMS image field to a local `/cms-images/...` path, downloading it
 * at build time when needed. Returns the field as-is when it is already a
 * plain string (e.g. a local `/images/...` path from the fallback data).
 */
export async function resolveImage(field: CmsMedia): Promise<string> {
  if (!field) throw new Error("Missing required CMS image field");
  if (typeof field === "string") return field;
  if (!field.media_id) {
    throw new Error(
      `CMS image field is missing media_id (name: ${field.name ?? "unknown"})`,
    );
  }

  if (mediaCache.has(field.media_id)) return mediaCache.get(field.media_id)!;

  const existingLocalPath = findLocalMediaPath(field.media_id);
  if (existingLocalPath) {
    const p = Promise.resolve(existingLocalPath);
    mediaCache.set(field.media_id, p);
    return p;
  }

  const request = (async () => {
    const media = await cmsPost<{
      filename?: string;
      name?: string;
      download_url?: string;
      preview_url?: string;
      url?: string;
    }>("content.media.get", { media_id: field.media_id });

    const ext =
      path.extname(media?.filename || media?.name || field.name || "") ||
      ".jpg";
    const localPath = `/cms-images/${field.media_id}${ext}`;
    const absPath = path.join(
      process.cwd(),
      "public",
      "cms-images",
      `${field.media_id}${ext}`,
    );

    if (!fs.existsSync(absPath)) {
      const signedUrl =
        media?.download_url ?? media?.preview_url ?? media?.url;
      if (!signedUrl) {
        throw new Error(
          `CMS media ${field.media_id} has no downloadable URL`,
        );
      }
      await downloadTo(signedUrl, absPath);
    }

    return localPath;
  })();

  mediaCache.set(field.media_id, request);

  try {
    return await request;
  } catch (error) {
    mediaCache.delete(field.media_id);
    throw error;
  }
}

// ─── Type helpers ─────────────────────────────────────────────────────────────

export type CmsRecord = Record<string, unknown>;

export function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function asRecord(value: unknown): CmsRecord {
  return value && typeof value === "object" ? (value as CmsRecord) : {};
}

export function asNumber(value: unknown, fallback = 0): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

export function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

export function asMedia(value: unknown): CmsMedia {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return value as CmsMedia;
  return undefined;
}

// ─── Data types (mirrors src/data/*.ts exactly) ───────────────────────────────

export type TreatmentCategory =
  | "Preventive"
  | "General"
  | "Non-Invasive"
  | "Invasive";

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  category: TreatmentCategory;
  tagline: string;
  shortDescription: string;
  fullOverview: string;
  whoNeedsIt: string[];
  procedureSummary: string;
  recoveryTimeline: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
  isPopular?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  author: { name: string; role: string; avatar: string };
  contentBlocks: {
    type: "paragraph" | "heading" | "quote" | "checklist";
    text?: string;
    items?: string[];
  }[];
  faqs?: { question: string; answer: string }[];
  tags: string[];
  sources?: { label: string; url: string }[];
}

export interface ProcedureStage {
  stageNumber: number;
  stageName: string;
  title: string;
  durationEstimate: string;
  keyPoints: string[];
  whatToExpect: string;
}

export interface ProcedureGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  estimatedTotalTime: string;
  hospitalStay: string;
  stages: ProcedureStage[];
}

export interface DoctorVideo {
  title: string;
  procedureTag: string;
  videoUrl: string;
  thumbnailUrl: string;
}

// ─── CMS normalizers ──────────────────────────────────────────────────────────

function normalizeTreatment(raw: unknown): Treatment {
  const r = asRecord(entryData(raw));
  const id = asString(r.id || r.entry_id, `t-${Math.random()}`);
  const slug = asString(r.slug);
  const category = ((): TreatmentCategory => {
    const c = asString(r.category).toLowerCase();
    if (c.includes("preventive")) return "Preventive";
    if (c.includes("general")) return "General";
    if (c.includes("non-invasive") || c.includes("noninvasive"))
      return "Non-Invasive";
    return "Invasive";
  })();

  const rawFaqs = asArray(r.faqs || r.faq);
  const faqs = rawFaqs.map((f) => {
    const fr = asRecord(f);
    return {
      question: asString(fr.question || fr.q),
      answer: asString(fr.answer || fr.a),
    };
  });

  return {
    id,
    slug,
    title: asString(r.title),
    category,
    tagline: asString(r.tagline || r.subtitle),
    shortDescription: asString(r.shortDescription || r.description || r.excerpt),
    fullOverview: asString(r.fullOverview || r.overview || r.body),
    whoNeedsIt: toStringArray(r.whoNeedsIt || r.who_needs_it || r.indications),
    procedureSummary: asString(r.procedureSummary || r.procedure || r.procedure_summary),
    recoveryTimeline: asString(r.recoveryTimeline || r.recovery || r.recovery_timeline),
    benefits: toStringArray(r.benefits),
    faqs,
    isPopular: Boolean(r.isPopular || r.is_popular || r.popular),
  };
}

function normalizeBlogPost(raw: unknown): BlogPost {
  const r = asRecord(entryData(raw));
  const id = asString(r.id || r.entry_id, `b-${Math.random()}`);
  const authorRaw = asRecord(r.author);

  const rawBlocks = asArray(r.contentBlocks || r.content_blocks || r.blocks);
  const contentBlocks = rawBlocks.map((b) => {
    const br = asRecord(b);
    return {
      type: asString(br.type, "paragraph") as BlogPost["contentBlocks"][0]["type"],
      text: asString(br.text),
      items: toStringArray(br.items),
    };
  });

  const rawFaqs = asArray(r.faqs || r.faq);
  const faqs = rawFaqs.map((f) => {
    const fr = asRecord(f);
    return {
      question: asString(fr.question || fr.q),
      answer: asString(fr.answer || fr.a),
    };
  });

  const rawSources = asArray(r.sources);
  const sources = rawSources.map((s) => {
    const sr = asRecord(s);
    return { label: asString(sr.label), url: asString(sr.url) };
  });

  return {
    id,
    slug: asString(r.slug),
    title: asString(r.title),
    excerpt: asString(r.excerpt || r.description),
    category: asString(r.category, "Cardiology"),
    publishDate: asString(r.publishDate || r.publish_date || r.date),
    readTime: asString(r.readTime || r.read_time, "5 min read"),
    author: {
      name: asString(authorRaw.name, "Dr. Manjinder Sandhu"),
      role: asString(authorRaw.role, "Senior Interventional Cardiologist"),
      avatar: asString(
        authorRaw.avatar,
        "/images/dr-sandhu-portrait.jpg",
      ),
    },
    contentBlocks,
    faqs: faqs.length ? faqs : undefined,
    tags: toStringArray(r.tags),
    sources: sources.length ? sources : undefined,
  };
}

function normalizeProcedureStage(raw: unknown): ProcedureStage {
  const r = asRecord(raw);
  return {
    stageNumber: asNumber(r.stageNumber || r.stage_number),
    stageName: asString(r.stageName || r.stage_name || r.name),
    title: asString(r.title),
    durationEstimate: asString(r.durationEstimate || r.duration || r.duration_estimate),
    keyPoints: toStringArray(r.keyPoints || r.key_points || r.points),
    whatToExpect: asString(r.whatToExpect || r.what_to_expect || r.description),
  };
}

function normalizeProcedureGuide(raw: unknown): ProcedureGuide {
  const r = asRecord(entryData(raw));
  const id = asString(r.id || r.entry_id, `p-${Math.random()}`);

  const rawStages = asArray(r.stages);
  const stages = rawStages.map(normalizeProcedureStage);

  return {
    id,
    slug: asString(r.slug),
    title: asString(r.title),
    subtitle: asString(r.subtitle),
    category: asString(r.category, "Coronary Interventions"),
    overview: asString(r.overview || r.description),
    estimatedTotalTime: asString(r.estimatedTotalTime || r.estimated_total_time || r.duration),
    hospitalStay: asString(r.hospitalStay || r.hospital_stay),
    stages,
  };
}

function normalizeDoctorVideo(raw: unknown): DoctorVideo {
  const r = asRecord(entryData(raw));
  return {
    title: asString(r.title),
    procedureTag: asString(r.procedureTag || r.procedure_tag || r.tag),
    videoUrl: asString(r.videoUrl || r.video_url || r.url),
    thumbnailUrl: asString(
      r.thumbnailUrl || r.thumbnail_url || r.thumbnail,
      "/images/heart-care-video.jpg",
    ),
  };
}

// ─── Public data-access functions ─────────────────────────────────────────────

/**
 * Returns all treatments.
 * CMS mode: fetches `"treatments"` collection and normalizes each entry.
 * Fallback mode: returns the local `src/data/treatments.ts` array as-is.
 */
export async function getTreatments(): Promise<Treatment[]> {
  if (CMS_ENABLED) {
    try {
      const items = await fetchCollection("treatments");
      if (items.length > 0) {
        return items.map(normalizeTreatment);
      }
    } catch (error) {
      console.warn("CMS treatments fetch failed, falling back to local data:", error instanceof Error ? error.message : error);
    }
  }

  const { treatments } = await import("../data/treatments");
  return treatments;
}

/**
 * Returns all blog posts.
 * CMS mode: fetches `"new-blogs"` collection.
 * Fallback mode: returns local `src/data/blogs.ts`.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (CMS_ENABLED) {
    try {
      const items = await fetchCollection("new-blogs");
      if (items.length > 0) {
        return items.map(normalizeBlogPost);
      }
    } catch (error) {
      console.warn("CMS new-blogs fetch failed, falling back to local data:", error instanceof Error ? error.message : error);
    }
  }

  const { blogs } = await import("../data/blogs");
  return blogs;
}

/**
 * Returns all procedure guides.
 * CMS mode: fetches `"procedures"` collection.
 * Fallback mode: returns local `src/data/procedures.ts`.
 */
export async function getProcedures(): Promise<ProcedureGuide[]> {
  if (CMS_ENABLED) {
    try {
      const items = await fetchCollection("procedures");
      if (items.length > 0) {
        return items.map(normalizeProcedureGuide);
      }
    } catch (error) {
      console.warn("CMS procedures fetch failed, falling back to local data:", error instanceof Error ? error.message : error);
    }
  }

  const { procedures } = await import("../data/procedures");
  return procedures;
}

/**
 * Returns all gallery videos.
 * CMS mode: fetches `"video"` collection.
 * Fallback mode: returns local `src/data/videos.ts`.
 */
export async function getGalleryVideos(): Promise<DoctorVideo[]> {
  if (CMS_ENABLED) {
    try {
      const items = await fetchCollection("video");
      if (items.length > 0) {
        return items.map(normalizeDoctorVideo);
      }
    } catch (error) {
      console.warn("CMS video fetch failed, falling back to local data:", error instanceof Error ? error.message : error);
    }
  }

  const { doctorVideos } = await import("../data/videos");
  return doctorVideos;
}
