export const DEFAULT_LOCALE = "en";

export type LocaleDirection = "ltr" | "rtl";

export interface LocaleMeta {
  code: string;
  label: string;
  nativeLabel: string;
  dir: LocaleDirection;
}

export const LOCALES: LocaleMeta[] = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", dir: "ltr" },
];

export const TARGET_LOCALES = LOCALES.filter(
  (locale) => locale.code !== DEFAULT_LOCALE,
);

export const LOCALE_CODES = LOCALES.map((locale) => locale.code);

export type Locale = (typeof LOCALES)[number]["code"];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALE_CODES.includes(value);
}

export function getLocaleMeta(code: string): LocaleMeta {
  return (
    LOCALES.find((locale) => locale.code === code) ??
    LOCALES.find((locale) => locale.code === DEFAULT_LOCALE)!
  );
}

export function getLocaleFromPath(pathname: string): Locale {
  const normalized = pathname.trim().replace(/^\/+/, "");
  const segment = normalized.split("/")[0]?.toLowerCase();
  if (segment && isLocale(segment)) {
    return segment;
  }
  return DEFAULT_LOCALE;
}

export function stripLocaleFromPath(pathname = "/"): string {
  if (!pathname) return "/";
  const [pathWithoutHash, hash = ""] = pathname.split("#");
  const [pathWithoutQuery, query = ""] = pathWithoutHash.split("?");
  const segments = pathWithoutQuery.split("/").filter(Boolean);

  if (
    segments.length &&
    LOCALE_CODES.includes(segments[0]) &&
    segments[0] !== DEFAULT_LOCALE
  ) {
    segments.shift();
  }

  const barePath = `/${segments.join("/")}`.replace(/\/$/, "") || "/";
  const queryPart = query ? `?${query}` : "";
  const hashPart = hash ? `#${hash}` : "";
  return `${barePath}${queryPart}${hashPart}`;
}

export function localizePath(
  pathname = "/",
  targetLocale = DEFAULT_LOCALE,
): string {
  if (!pathname || /^(https?:|mailto:|tel:|#)/.test(pathname)) {
    return pathname;
  }

  const basePath = stripLocaleFromPath(pathname);

  if (!isLocale(targetLocale) || targetLocale === DEFAULT_LOCALE) {
    return basePath;
  }

  return basePath === "/" ? `/${targetLocale}` : `/${targetLocale}${basePath}`;
}
