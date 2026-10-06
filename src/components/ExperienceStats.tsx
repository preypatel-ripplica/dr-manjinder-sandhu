"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";

function Count({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      function tick(now: number) {
        const progress = Math.min((now - start) / 1100, 1);
        setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} aria-label={`${value.toLocaleString("en-IN")}${suffix}`}>
      <span aria-hidden="true" dir="ltr" className="inline-block">
        {shown.toLocaleString("en-IN")}
        {suffix}
      </span>
    </span>
  );
}

export function ExperienceStats() {
  const { t } = useI18n();

  return (
    <dl className="experience-stats">
      <div>
        <dt>
          <Count value={33} suffix="+" />
        </dt>
        <dd>{t("Years of experience")}</dd>
      </div>
      <div>
        <dt>
          <Count value={25000} suffix="+" />
        </dt>
        <dd>{t("Cardiac procedures")}</dd>
      </div>
      <div>
        <dt>
          <Count value={4} />
        </dt>
        <dd>{t("Locations across Delhi NCR")}</dd>
      </div>
      <div className="stats-principle">
        <dt>{t("One person at a time.")}</dt>
        <dd>{t("That’s how we approach heart care.")}</dd>
      </div>
    </dl>
  );
}
