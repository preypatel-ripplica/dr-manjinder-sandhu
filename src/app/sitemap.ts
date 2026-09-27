import type { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { caseStudies } from "@/data/case-studies";
import { procedures } from "@/data/procedures";
import { treatments } from "@/data/treatments";

export const dynamic = "force-static";

const siteUrl = "https://www.drmanjindersandhu.com";

function url(path: string) {
  return `${siteUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/about-us/"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/treatments/"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/expertise/"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/consultation-plans/"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/contact-us/"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/blogs/"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/procedures/"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/patient-stories/"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/testimonials/"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/video-gallery/"), changeFrequency: "monthly", priority: 0.5 },
  ];

  return [
    ...corePages,
    ...treatments.map((treatment) => ({
      url: url(`/treatments/${treatment.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogs.map((blog) => ({
      url: url(`/blogs/${blog.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...procedures.map((procedure) => ({
      url: url(`/procedures/${procedure.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...caseStudies.map((story) => ({
      url: url(`/patient-stories/${story.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
