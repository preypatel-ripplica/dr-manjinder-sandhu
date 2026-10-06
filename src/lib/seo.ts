import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, localizePath } from "./i18n-config";

export const BASE_URL = "https://www.drmanjindersandhu.com";

export function buildHreflang(
  path: string,
  currentLocale: string = DEFAULT_LOCALE,
): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalPath = localizePath(normalizedPath, currentLocale);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale.code] = `${BASE_URL}${localizePath(normalizedPath, locale.code)}`;
  }
  languages["x-default"] = `${BASE_URL}${localizePath(normalizedPath, DEFAULT_LOCALE)}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}
