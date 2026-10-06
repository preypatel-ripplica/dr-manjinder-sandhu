"use client";

import { useEffect } from "react";
import type { LocaleDirection } from "@/lib/i18n-config";

interface LocaleHydratorProps {
  locale: string;
  dir: LocaleDirection;
}

export function LocaleHydrator({ locale, dir }: LocaleHydratorProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return null;
}
