import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { getBlogPosts, getProcedures, getTreatments } from "@/lib/cms";
import { LOCALES, localizePath } from "@/lib/i18n-config";
import { BASE_URL } from "@/lib/seo";

export const dynamic = "force-static";

function makeEntry(
  path: string,
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
  priority: number,
): MetadataRoute.Sitemap {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale.code] = `${BASE_URL}${localizePath(normalizedPath, locale.code)}`;
  }
  languages["x-default"] = `${BASE_URL}${localizePath(normalizedPath, "en")}`;

  return LOCALES.map((locale) => {
    const locUrl = `${BASE_URL}${localizePath(normalizedPath, locale.code)}`;
    return {
      url: locUrl,
      changeFrequency,
      priority: locale.code === "en" ? priority : Math.max(0.1, priority - 0.1),
      alternates: {
        languages,
      },
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths: [string, "weekly" | "monthly", number][] = [
    ["/", "weekly", 1.0],
    ["/about-us/", "monthly", 0.8],
    ["/treatments/", "monthly", 0.9],
    ["/expertise/", "monthly", 0.7],
    ["/consultation-plans/", "monthly", 0.7],
    ["/contact-us/", "monthly", 0.8],
    ["/blogs/", "weekly", 0.8],
    ["/procedures/", "monthly", 0.7],
    ["/patient-stories/", "monthly", 0.6],
    ["/testimonials/", "monthly", 0.5],
    ["/video-gallery/", "monthly", 0.5],
  ];

  const [treatments, blogs, procedures] = await Promise.all([
    getTreatments().catch(() => []),
    getBlogPosts().catch(() => []),
    getProcedures().catch(() => []),
  ]);

  const staticEntries = staticPaths.flatMap(([p, freq, prio]) =>
    makeEntry(p, freq, prio),
  );

  const treatmentEntries = treatments.flatMap((t) =>
    makeEntry(`/treatments/${t.slug}/`, "monthly", 0.8),
  );

  const blogEntries = blogs.flatMap((b) =>
    makeEntry(`/blogs/${b.slug}/`, "monthly", 0.7),
  );

  const procedureEntries = procedures.flatMap((p) =>
    makeEntry(`/procedures/${p.slug}/`, "monthly", 0.6),
  );

  const caseStudyEntries = caseStudies.flatMap((cs) =>
    makeEntry(`/patient-stories/${cs.slug}/`, "monthly", 0.6),
  );

  return [
    ...staticEntries,
    ...treatmentEntries,
    ...blogEntries,
    ...procedureEntries,
    ...caseStudyEntries,
  ];
}
