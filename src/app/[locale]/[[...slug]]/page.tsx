import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import HomePage from "@/app/page";
import AboutUsPage from "@/app/about-us/page";
import ExpertisePage from "@/app/expertise/page";
import TreatmentsIndexPage from "@/app/treatments/page";
import TreatmentDetailPage from "@/app/treatments/[slug]/page";
import ProceduresIndexPage from "@/app/procedures/page";
import ProcedureDetailPage from "@/app/procedures/[slug]/page";
import ConsultationPlansPage from "@/app/consultation-plans/page";
import PatientStoriesIndexPage from "@/app/patient-stories/page";
import CaseStudyDetailPage from "@/app/patient-stories/[slug]/page";
import TestimonialsPage from "@/app/testimonials/page";
import VideoGalleryPage from "@/app/video-gallery/page";
import BlogsPage from "@/app/blogs/page";
import BlogPostDetailPage from "@/app/blogs/[slug]/page";
import ContactUsPage from "@/app/contact-us/page";

import { caseStudies } from "@/data/case-studies";
import { treatments as localTreatments } from "@/data/treatments";
import { blogs as localBlogs } from "@/data/blogs";
import { procedures as localProcedures } from "@/data/procedures";
import { getBlogPosts, getProcedures, getTreatments } from "@/lib/cms";
import { isLocale, TARGET_LOCALES } from "@/lib/i18n-config";
import { translateReactTree } from "@/lib/i18n-render";
import { buildHreflang } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const [cmsTreatments, cmsBlogs, cmsProcedures] = await Promise.all([
    getTreatments().catch(() => []),
    getBlogPosts().catch(() => []),
    getProcedures().catch(() => []),
  ]);

  const treatmentsMap = new Map<string, string>();
  localTreatments.forEach((t) => treatmentsMap.set(t.slug.toLowerCase(), t.slug));
  cmsTreatments.forEach((t) => treatmentsMap.set(t.slug.toLowerCase(), t.slug));

  const blogsMap = new Map<string, string>();
  localBlogs.forEach((b) => blogsMap.set(b.slug.toLowerCase(), b.slug));
  cmsBlogs.forEach((b) => blogsMap.set(b.slug.toLowerCase(), b.slug));

  const proceduresMap = new Map<string, string>();
  localProcedures.forEach((p) => proceduresMap.set(p.slug.toLowerCase(), p.slug));
  cmsProcedures.forEach((p) => proceduresMap.set(p.slug.toLowerCase(), p.slug));

  const staticRoutes: string[][] = [
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

  const treatmentRoutes = Array.from(treatmentsMap.values()).map((slug) => ["treatments", slug]);
  const blogRoutes = Array.from(blogsMap.values()).map((slug) => ["blogs", slug]);
  const procedureRoutes = Array.from(proceduresMap.values()).map((slug) => ["procedures", slug]);
  const caseStudyRoutes = caseStudies.map((cs) => ["patient-stories", cs.slug]);

  const allRoutes = [
    ...staticRoutes,
    ...treatmentRoutes,
    ...blogRoutes,
    ...procedureRoutes,
    ...caseStudyRoutes,
  ];

  return TARGET_LOCALES.flatMap((locale) =>
    allRoutes.map((slug) => ({
      locale: locale.code,
      slug,
    })),
  );
}

async function getPage(slugSegments?: string[]): Promise<React.ReactNode | null> {
  const path = (slugSegments ?? []).join("/");

  switch (path) {
    case "":
      return HomePage();
    case "about-us":
      return AboutUsPage();
    case "expertise":
      return ExpertisePage();
    case "treatments":
      return await TreatmentsIndexPage();
    case "procedures":
      return await ProceduresIndexPage();
    case "consultation-plans":
      return ConsultationPlansPage();
    case "patient-stories":
      return PatientStoriesIndexPage();
    case "testimonials":
      return TestimonialsPage();
    case "video-gallery":
      return await VideoGalleryPage();
    case "blogs":
      return await BlogsPage();
    case "contact-us":
      return ContactUsPage();
  }

  if (slugSegments && slugSegments.length === 2) {
    const [prefix, slug] = slugSegments;
    const paramsPromise = Promise.resolve({ slug });

    if (prefix === "treatments") {
      return await TreatmentDetailPage({ params: paramsPromise });
    }
    if (prefix === "blogs") {
      return await BlogPostDetailPage({ params: paramsPromise });
    }
    if (prefix === "procedures") {
      return await ProcedureDetailPage({ params: paramsPromise });
    }
    if (prefix === "patient-stories") {
      return await CaseStudyDetailPage({ params: paramsPromise });
    }
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const path = slug && slug.length ? `/${slug.join("/")}/` : "/";
  return buildHreflang(path, locale);
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  const page = await getPage(slug);
  if (!page) {
    notFound();
  }

  return <>{translateReactTree(page, locale)}</>;
}
