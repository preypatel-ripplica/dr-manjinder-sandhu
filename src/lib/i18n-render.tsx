import React, { type ReactNode } from "react";
import rawTranslationMemory from "../../.cache/translation-memory.json";
import { DEFAULT_LOCALE, localizePath } from "./i18n-config";
import { normalizeTranslationText } from "./i18n";

type TranslationMemory = Record<string, Record<string, string>>;
const translationMemory = rawTranslationMemory as TranslationMemory;

const localeMaps = new Map<string, Map<string, string>>();

function getLocaleMap(locale: string): Map<string, string> {
  let map = localeMaps.get(locale);
  if (!map) {
    map = new Map<string, string>();
    const localeObj = translationMemory[locale];
    if (localeObj && typeof localeObj === "object") {
      for (const [key, val] of Object.entries(localeObj)) {
        if (typeof val === "string" && val.trim()) {
          const normKey = normalizeTranslationText(key);
          if (normKey) {
            map.set(normKey, val);
          }
        }
      }
    }
    localeMaps.set(locale, map);
  }
  return map;
}

function translateString(text: string, locale: string): string {
  if (!text || locale === DEFAULT_LOCALE) return text;

  const leading = text.match(/^\s*/)?.[0] ?? "";
  const trailing = text.match(/\s*$/)?.[0] ?? "";
  const trimmed = text.trim();

  if (!trimmed) return text;

  const map = getLocaleMap(locale);
  const normalized = normalizeTranslationText(trimmed);
  const translated = map.get(normalized);

  if (translated) {
    return leading + translated + trailing;
  }

  return text;
}

const SKIP_TAGS = new Set([
  "script",
  "style",
  "noscript",
  "svg",
  "canvas",
  "code",
  "pre",
]);

const SKIPPED_PROP_KEYS = new Set([
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
  "key",
  "ref",
  "target",
  "rel",
  "type",
  "name",
  "as",
]);

function translateValue(
  value: unknown,
  locale: string,
  keyContext?: string,
): unknown {
  if (value === null || value === undefined || locale === DEFAULT_LOCALE) {
    return value;
  }

  if (typeof value === "string") {
    if (
      (keyContext === "href" || keyContext === "action") &&
      value.startsWith("/") &&
      !value.startsWith("//")
    ) {
      return localizePath(value, locale);
    }
    if (keyContext && SKIPPED_PROP_KEYS.has(keyContext)) {
      return value;
    }
    return translateString(value, locale);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => translateValue(item, locale, keyContext));
  }

  if (React.isValidElement(value)) {
    return translateReactTree(value, locale);
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const newObj: Record<string, unknown> = {};
    let hasChanged = false;

    for (const [k, v] of Object.entries(obj)) {
      if (SKIPPED_PROP_KEYS.has(k)) {
        newObj[k] = v;
      } else {
        const trans = translateValue(v, locale, k);
        if (trans !== v) {
          hasChanged = true;
        }
        newObj[k] = trans;
      }
    }

    return hasChanged ? newObj : value;
  }

  return value;
}

export function translateReactTree(
  node: ReactNode,
  locale: string,
): ReactNode {
  if (!node || locale === DEFAULT_LOCALE) return node;

  if (typeof node === "string") {
    return translateString(node, locale);
  }

  if (typeof node === "number" || typeof node === "boolean") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => {
      const translatedChild = translateReactTree(child, locale);
      if (
        React.isValidElement(translatedChild) &&
        translatedChild.key === null
      ) {
        return React.cloneElement(translatedChild, { key: index });
      }
      return translatedChild;
    });
  }

  if (React.isValidElement(node)) {
    const type = node.type;

    if (typeof type === "string" && SKIP_TAGS.has(type.toLowerCase())) {
      return node;
    }

    if (typeof type === "function") {
      try {
        const props = (node.props ?? {}) as Record<string, unknown>;
        const rendered = (type as (p: Record<string, unknown>) => ReactNode)(
          props,
        );
        return translateReactTree(rendered, locale);
      } catch {
        // Component function call threw (e.g. client component hook usage)
      }
    }

    const props = node.props as Record<string, unknown>;
    const newProps: Record<string, unknown> = {};
    let hasChangedProps = false;

    for (const [key, value] of Object.entries(props)) {
      if (key === "children") {
        const newChildren = translateReactTree(value as ReactNode, locale);
        if (newChildren !== value) {
          newProps.children = newChildren;
          hasChangedProps = true;
        }
      } else {
        const translatedVal = translateValue(value, locale, key);
        if (translatedVal !== value) {
          newProps[key] = translatedVal;
          hasChangedProps = true;
        }
      }
    }

    if (hasChangedProps) {
      return React.cloneElement(node, newProps);
    }
  }

  return node;
}
