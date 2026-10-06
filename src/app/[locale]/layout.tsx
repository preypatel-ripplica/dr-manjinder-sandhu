import React from "react";
import { Noto_Sans_Devanagari, Noto_Sans_Arabic, Inter } from "next/font/google";
import { getLocaleMeta, isLocale } from "@/lib/i18n-config";
import { LocaleHydrator } from "@/components/LocaleHydrator";
import { notFound } from "next/navigation";

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hi",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ar",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale) || locale === "en") {
    notFound();
  }

  const meta = getLocaleMeta(locale);

  let fontClass = inter.className;
  if (locale === "hi") {
    fontClass = devanagari.className;
  } else if (locale === "ar") {
    fontClass = arabic.className;
  }

  return (
    <>
      <LocaleHydrator locale={meta.code} dir={meta.dir} />
      <div className={fontClass} dir={meta.dir}>
        {children}
      </div>
    </>
  );
}
