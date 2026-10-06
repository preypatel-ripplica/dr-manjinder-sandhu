"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import {
  getLocaleFromPath,
  getLocaleMeta,
  LOCALES,
  localizePath,
  stripLocaleFromPath,
} from "@/lib/i18n-config";
import { useI18n } from "./I18nProvider";

interface LanguageSwitcherProps {
  currentLocale?: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const { t } = useI18n();

  const activeCode = currentLocale ?? getLocaleFromPath(pathname);
  const activeMeta = getLocaleMeta(activeCode);
  const barePath = stripLocaleFromPath(pathname);

  const closeDropdown = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  useEffect(() => {
    closeDropdown();
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeDropdown();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <details ref={detailsRef} className="language-switcher">
      <summary
        aria-label={t("Select language")}
        className="language-switcher__trigger"
      >
        <Globe size={15} />
        <span>{activeMeta.nativeLabel}</span>
        <ChevronDown size={14} className="lang-chevron" />
      </summary>

      <div className="language-switcher__menu" role="menu">
        {LOCALES.map((locale) => {
          const href = localizePath(barePath, locale.code);
          const isSelected = locale.code === activeCode;

          return (
            <Link
              key={locale.code}
              href={href}
              role="menuitem"
              aria-current={isSelected ? "true" : undefined}
              className={`language-switcher__option ${isSelected ? "is-active" : ""}`}
              onClick={closeDropdown}
            >
              <span>{locale.nativeLabel}</span>
              <small>{locale.label}</small>
            </Link>
          );
        })}
      </div>
    </details>
  );
}
