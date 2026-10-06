import {
  DEFAULT_LOCALE,
  getLocaleMeta,
  LOCALES,
  localizePath,
  type Locale,
} from "./i18n-config";

export { DEFAULT_LOCALE, getLocaleMeta, LOCALES, localizePath, type Locale };

export function decodeTranslationEntities(value: string): string {
  if (!value) return "";
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export function normalizeTranslationText(value: string): string {
  if (!value) return "";
  return decodeTranslationEntities(value).replace(/\s+/g, " ").trim();
}

export function translateText(
  locale: string,
  value: string,
  translationsMap?: Record<string, Record<string, string>>,
): string {
  if (!value || locale === DEFAULT_LOCALE) return value;
  const normalized = normalizeTranslationText(value);
  if (!normalized) return value;

  const localeMap = translationsMap?.[locale];
  if (localeMap && normalized in localeMap) {
    return localeMap[normalized];
  }

  return value;
}
