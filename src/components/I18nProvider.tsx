"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_LOCALE,
  getLocaleFromPath,
  getLocaleMeta,
  localizePath,
  type LocaleDirection,
} from "@/lib/i18n-config";
import rawTranslationMemory from "../../.cache/translation-memory.json";
import { normalizeTranslationText } from "@/lib/i18n";

type TranslationMemory = Record<string, Record<string, string>>;
const translationMemory = rawTranslationMemory as TranslationMemory;

interface I18nContextType {
  locale: string;
  dir: LocaleDirection;
  t: (text: string) => string;
  localizeHref: (href: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: DEFAULT_LOCALE,
  dir: "ltr",
  t: (text: string) => text,
  localizeHref: (href: string) => href,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPath(pathname);
  const meta = getLocaleMeta(locale);

  useEffect(() => {
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
  }, [meta.code, meta.dir]);

  const value = useMemo(() => {
    const localeMap = translationMemory[locale] || {};
    const normalizedMap = new Map<string, string>();
    if (locale !== DEFAULT_LOCALE && typeof localeMap === "object") {
      for (const [key, val] of Object.entries(localeMap)) {
        if (typeof val === "string" && val.trim()) {
          const normKey = normalizeTranslationText(key);
          if (normKey) {
            normalizedMap.set(normKey, val);
          }
        }
      }
    }

    const t = (text: string): string => {
      if (!text || locale === DEFAULT_LOCALE) return text;
      const leading = text.match(/^\s*/)?.[0] ?? "";
      const trailing = text.match(/\s*$/)?.[0] ?? "";
      const trimmed = text.trim();
      if (!trimmed) return text;

      const norm = normalizeTranslationText(trimmed);
      const translated = normalizedMap.get(norm);
      if (translated) {
        return leading + translated + trailing;
      }
      return text;
    };

    const localizeHref = (href: string): string => {
      return localizePath(href, locale);
    };

    return {
      locale,
      dir: meta.dir,
      t,
      localizeHref,
    };
  }, [locale, meta.dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  return useContext(I18nContext);
}
