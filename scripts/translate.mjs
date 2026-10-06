import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const MEMORY_PATH = path.join(PROJECT_ROOT, ".cache", "translation-memory.json");
const ENV_PATH = path.join(PROJECT_ROOT, ".env.local");

function loadEnvFile() {
  if (!fs.existsSync(ENV_PATH)) return;
  const content = fs.readFileSync(ENV_PATH, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let val = trimmed.slice(eqIndex + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

loadEnvFile();

const TARGET_LOCALES = [
  { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
];

const KNOWN_SCOPES = [
  "shared-ui",
  "home",
  "about",
  "expertise",
  "contact",
  "blogs",
  "treatments",
  "procedures",
  "testimonials",
  "video-gallery",
  "patient-stories",
  "consultation-plans",
];

const scopeFiles = {
  "shared-ui": [
    "src/components/Header.tsx",
    "src/components/Footer.tsx",
    "src/components/BookingModal.tsx",
    "src/components/AppointmentForm.tsx",
    "src/components/LanguageSwitcher.tsx",
    "src/components/ClinicLocations.tsx",
    "src/components/FloatingWhatsApp.tsx",
  ],
  home: [
    "src/app/page.tsx",
    "src/components/CareExplorer.tsx",
    "src/components/CarePathFinder.tsx",
    "src/components/VisitJourney.tsx",
    "src/components/ExperienceStats.tsx",
    "src/components/PatientReel.tsx",
    "src/components/FAQAccordion.tsx",
    "src/components/VisualIntro.tsx",
    "src/components/TreatmentsCarousel.tsx",
    "src/components/SymptomTriageWidget.tsx",
    "src/data/testimonials.ts",
    "src/data/care-visuals.ts",
    "src/data/treatments.ts",
    "src/data/clinics.ts",
  ],
  about: ["src/app/about-us/page.tsx", "src/data/doctor-profile.ts"],
  expertise: ["src/app/expertise/page.tsx", "src/data/doctor-profile.ts"],
  contact: [
    "src/app/contact-us/page.tsx",
    "src/components/ClinicLocations.tsx",
    "src/data/clinics.ts",
  ],
  blogs: [
    "src/app/blogs/page.tsx",
    "src/app/blogs/[slug]/page.tsx",
    "src/data/blogs.ts",
  ],
  treatments: [
    "src/app/treatments/page.tsx",
    "src/app/treatments/[slug]/page.tsx",
    "src/components/TreatmentsFilterGrid.tsx",
    "src/components/TreatmentsCarousel.tsx",
    "src/components/TransradialRecoveryTimeline.tsx",
    "src/data/treatments.ts",
    "src/data/care-visuals.ts",
  ],
  procedures: [
    "src/app/procedures/page.tsx",
    "src/app/procedures/[slug]/page.tsx",
    "src/components/ProcedureStepper.tsx",
    "src/data/procedures.ts",
  ],
  testimonials: ["src/app/testimonials/page.tsx", "src/data/testimonials.ts"],
  "video-gallery": ["src/app/video-gallery/page.tsx", "src/data/videos.ts"],
  "patient-stories": [
    "src/app/patient-stories/page.tsx",
    "src/app/patient-stories/[slug]/page.tsx",
    "src/data/case-studies.ts",
  ],
  "consultation-plans": [
    "src/app/consultation-plans/page.tsx",
    "src/data/consultation-plans.ts",
  ],
};

const SKIPPED_PROPERTY_KEYS = new Set([
  "slug",
  "id",
  "href",
  "url",
  "videoUrl",
  "canonical",
  "canonicalPath",
  "ogImage",
  "src",
  "image",
  "cardImage",
  "bannerImage",
  "authorImage",
  "videoThumbnail",
  "publishedAt",
  "publishedLabel",
  "access_key",
  "from_name",
  "className",
  "class",
  "icon",
  "style",
  "type",
  "name",
  "as",
  "key",
  "ref",
  "action",
  "method",
]);

function decodeEntities(text) {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function normalizeText(text) {
  if (!text) return "";
  return decodeEntities(text).replace(/\s+/g, " ").trim();
}

function shouldExtract(text, propKey = "") {
  if (!text) return false;
  if (propKey && SKIPPED_PROPERTY_KEYS.has(propKey)) return false;

  const norm = normalizeText(text);
  if (!norm || norm.length < 2) return false;

  // Skip code imports, module names, React hooks
  if (/^(use client|react|react-dom|next\/|lucide-react|@\/|\.\/|\.\.\/)/.test(norm))
    return false;

  // Skip URLs, file paths, tel/mailto, hash ids
  if (/^(https?:\/\/|\/|tel:|mailto:|#)/.test(norm)) return false;
  if (/\.(png|jpg|jpeg|svg|webp|gif|css|ts|tsx|js|jsx|json)$/i.test(norm))
    return false;

  // Skip HTTP methods, UUIDs, hex values, access keys
  if (/^(GET|POST|PUT|DELETE|FETCH|JSON|HTML|CSS|UTF-8)$/i.test(norm)) return false;
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(norm))
    return false;

  // Skip CSS selectors, regex patterns, or code strings with syntax symbols
  if (
    /^[a-z0-9_\-\.\#\:\s\>\[\]\(\)\,\"\=\*\+\\\/\?]+$/i.test(norm) &&
    (norm.includes("[") ||
      (norm.includes(">") && !norm.includes(" ")) ||
      norm.includes("\\") ||
      norm.includes("*") ||
      norm.includes(";"))
  ) {
    return false;
  }

  // Skip pure numbers or symbols
  if (/^[0-9\s\.,\/\\\-\+\*\:\;\!\?\@\#\$\%\^\&\(\)\[\]\{\}\<\>\|'"]+$/.test(norm))
    return false;

  // Skip snake_case or kebab-case identifiers that look like code
  if (
    /^[a-z][a-z0-9_\-]*$/.test(norm) &&
    !["home", "about", "care", "blogs", "contact", "fees", "services", "treatments", "procedures", "expertise"].includes(norm)
  ) {
    if (norm.includes("_") || norm.includes("-")) return false;
  }

  return true;
}

function getPropertyName(node) {
  let parent = node.parent;
  while (parent) {
    if (ts.isPropertyAssignment(parent) || ts.isShorthandPropertyAssignment(parent)) {
      return parent.name.getText();
    }
    if (ts.isJsxAttribute(parent)) {
      return parent.name.getText();
    }
    if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) {
      return "__IMPORT__";
    }
    if (ts.isCallExpression(parent)) {
      const exprText = parent.expression.getText();
      if (
        exprText === "require" ||
        exprText === "import" ||
        exprText.includes("addEventListener") ||
        exprText.includes("querySelector") ||
        exprText.includes("getAttribute")
      ) {
        return "__CODE__";
      }
    }
    parent = parent.parent;
  }
  return "";
}

function extractStringsFromTsFile(filePath) {
  const absPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(PROJECT_ROOT, filePath);
  if (!fs.existsSync(absPath)) return [];

  const code = fs.readFileSync(absPath, "utf8");
  const sourceFile = ts.createSourceFile(
    absPath,
    code,
    ts.ScriptTarget.Latest,
    true,
  );
  const found = new Set();

  function visit(node) {
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node)
    ) {
      const propName = getPropertyName(node);
      if (propName !== "__IMPORT__" && propName !== "__CODE__") {
        if (shouldExtract(node.text, propName)) {
          found.add(normalizeText(node.text));
        }
      }
    } else if (ts.isJsxText(node)) {
      if (shouldExtract(node.text)) {
        found.add(normalizeText(node.text));
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return Array.from(found);
}

function loadMemory() {
  if (!fs.existsSync(MEMORY_PATH)) {
    return { hi: {}, ar: {}, ru: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(MEMORY_PATH, "utf8"));
  } catch {
    return { hi: {}, ar: {}, ru: {} };
  }
}

function saveMemory(memory) {
  fs.mkdirSync(path.dirname(MEMORY_PATH), { recursive: true });
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2), "utf8");
}

async function translateBatchWithGemini(strings, targetLocale) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing in .env.local.");
  }

  const modelName =
    process.env.GEMINI_TRANSLATION_MODEL || process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

  const systemPrompt = `You are a professional medical translator specializing in cardiology and healthcare.
Translate the JSON array of English strings into ${targetLocale.name} (${targetLocale.code}).

Rules:
1. Maintain medical accuracy for cardiology (e.g., angioplasty, TAVR, TAVI, pacemaker, ECG, stenting, CTO, coronary artery disease).
2. Keep doctor name "Dr. Manjinder Sandhu" and brand terms clear and natural.
3. Preserve HTML/JSX entities, placeholders like %s or {0}, and capitalization structure.
4. Output MUST be a valid JSON array of strings in the EXACT SAME length and order as the input array.
5. Return ONLY the raw JSON array string with no markdown code fences or backticks.`;

  let lastError;
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      const payload = {
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { text: JSON.stringify(strings) },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      };

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 429) {
        const errText = await res.text();
        let delayMs = 20000;
        try {
          const errObj = JSON.parse(errText);
          const retryInfo = errObj.error?.details?.find(
            (d) => d["@type"]?.includes("RetryInfo"),
          );
          if (retryInfo?.retryDelay) {
            const parsed = parseInt(retryInfo.retryDelay, 10);
            if (!isNaN(parsed) && parsed > 0) delayMs = (parsed + 3) * 1000;
          }
        } catch {}
        lastError = new Error(`Rate limit 429 hit (${errText.slice(0, 80)})`);
        console.warn(`Rate limit 429 hit. Backing off for ${Math.round(delayMs / 1000)}s (attempt ${attempt}/10)...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gemini API error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const rawText =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

      const match = rawText.match(/\[[\s\S]*\]/);
      if (!match) {
        throw new Error(
          `Gemini response contains no JSON array: ${rawText.slice(0, 100)}`,
        );
      }

      const cleanJson = match[0];
      const translatedArray = JSON.parse(cleanJson);
      if (!Array.isArray(translatedArray)) {
        throw new Error("Gemini response is not a JSON array.");
      }
      if (translatedArray.length !== strings.length) {
        throw new Error(
          `Gemini returned ${translatedArray.length} items, expected ${strings.length}`,
        );
      }

      return translatedArray;
    } catch (err) {
      lastError = err;
      if (attempt < 10) {
        await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
      }
    }
  }

  throw lastError ?? new Error("Translation batch failed after 10 attempts.");
}

async function extractStringsFromCms() {
  const CMS_API_URL = process.env.CMS_API_URL;
  const CMS_API_TOKEN = process.env.CMS_API_TOKEN;
  if (!CMS_API_URL || !CMS_API_TOKEN) return [];

  const collections = ["treatments", "new-blogs", "procedures", "video"];
  const extracted = new Set();

  function walk(val, keyContext = "") {
    if (!val) return;
    if (typeof val === "string") {
      if (shouldExtract(val, keyContext)) {
        extracted.add(normalizeText(val));
      }
    } else if (Array.isArray(val)) {
      for (const item of val) walk(item, keyContext);
    } else if (typeof val === "object") {
      for (const [k, v] of Object.entries(val)) {
        if (
          !SKIPPED_PROPERTY_KEYS.has(k) &&
          !["entry_id", "collection_id", "user_id", "status", "created_at", "updated_at"].includes(k)
        ) {
          walk(v, k);
        }
      }
    }
  }

  for (const col of collections) {
    try {
      const res = await fetch(`${CMS_API_URL}/api/content.entries.list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ collection_slug: col, page_size: 100 }),
      });
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data)
          ? data
          : data?.entries ?? data?.data ?? data?.items ?? [];
        for (const item of items) {
          walk(item?.entry ?? item);
        }
      }
    } catch (err) {
      console.warn(
        `Failed to fetch CMS collection "${col}" for translation:`,
        err instanceof Error ? err.message : String(err),
      );
    }
  }

  return Array.from(extracted);
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");

  const rawScopes = [];
  for (const arg of args) {
    if (arg === "--dry-run") continue;
    if (arg.startsWith("--scope=")) {
      rawScopes.push(...arg.replace("--scope=", "").split(","));
    } else if (arg.startsWith("--")) {
      const scope = arg.slice(2);
      if (KNOWN_SCOPES.includes(scope)) rawScopes.push(scope);
    } else if (KNOWN_SCOPES.includes(arg)) {
      rawScopes.push(arg);
    }
  }

  const selectedScopes =
    rawScopes.length > 0 ? Array.from(new Set(rawScopes)) : KNOWN_SCOPES;

  console.log(
    `Running translation script [dry-run: ${isDryRun}] [scopes: ${selectedScopes.join(", ")}]`,
  );

  const memory = loadMemory();
  const allExtracted = new Set();

  for (const scope of selectedScopes) {
    const files = scopeFiles[scope] || [];
    for (const f of files) {
      const extracted = extractStringsFromTsFile(f);
      for (const s of extracted) allExtracted.add(s);
    }
  }

  const cmsStrings = await extractStringsFromCms();
  for (const s of cmsStrings) allExtracted.add(s);

  const stringList = Array.from(allExtracted);
  console.log(`Found ${stringList.length} unique translatable strings across target scopes.`);

  let missingCount = 0;
  const missingPerLocale = { hi: [], ar: [], ru: [] };

  for (const locale of TARGET_LOCALES) {
    memory[locale.code] = memory[locale.code] || {};
    const locMap = memory[locale.code];
    for (const str of stringList) {
      if (!locMap[str]) {
        missingCount++;
        missingPerLocale[locale.code].push(str);
      }
    }
  }

  console.log(`Total missing string entries across all locales: ${missingCount}`);
  for (const loc of TARGET_LOCALES) {
    console.log(`  - ${loc.code}: ${missingPerLocale[loc.code].length} missing`);
  }

  if (isDryRun) {
    console.log(`Dry-run complete. Missing translations: ${missingCount}`);
    return;
  }

  if (missingCount === 0) {
    console.log("All strings for selected scopes are translated. Memory is up to date!");
    return;
  }

  const BATCH_SIZE = 50;

  for (const locale of TARGET_LOCALES) {
    const missing = missingPerLocale[locale.code];
    if (missing.length === 0) continue;

    console.log(`Translating ${missing.length} strings for ${locale.name} (${locale.code})...`);

    for (let i = 0; i < missing.length; i += BATCH_SIZE) {
      const batch = missing.slice(i, i + BATCH_SIZE);
      console.log(
        `  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(missing.length / BATCH_SIZE)} (${batch.length} items)...`,
      );

      try {
        const translatedBatch = await translateBatchWithGemini(batch, locale);
        for (let j = 0; j < batch.length; j++) {
          memory[locale.code][batch[j]] = translatedBatch[j];
        }
        saveMemory(memory);
        console.log(`    Successfully saved batch to .cache/translation-memory.json`);
      } catch (err) {
        console.error(
          `  Error translating batch for ${locale.code}:`,
          err instanceof Error ? err.message : String(err),
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
  }

  console.log("Translation process completed. All saved to .cache/translation-memory.json.");
}

main().catch((err) => {
  console.error("Fatal translation error:", err);
  process.exit(1);
});
