"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePanelMotion } from "@/hooks/usePanelMotion";
import { ArrowUpRight } from "lucide-react";
import {
  treatments as defaultTreatments,
  TreatmentCategory,
  Treatment,
} from "@/data/treatments";
import { careVisuals } from "@/data/care-visuals";
import { useI18n } from "./I18nProvider";

const tabs: ("All" | TreatmentCategory)[] = [
  "All",
  "Invasive",
  "Non-Invasive",
  "Preventive",
  "General",
];

interface TreatmentsFilterGridProps {
  items?: Treatment[];
}

export function TreatmentsFilterGrid({ items }: TreatmentsFilterGridProps) {
  const treatmentsList = items ?? defaultTreatments;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<(typeof tabs)[number]>("All");
  const panelRef = usePanelMotion(`${active}-${query}`);
  const { t, localizeHref } = useI18n();

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category",
    );
    if (tabs.includes(category as typeof active))
      setActive(category as typeof active);
  }, []);

  const filtered = treatmentsList.filter(
    (item) =>
      (active === "All" || item.category === active) &&
      `${item.title} ${item.shortDescription} ${careVisuals[item.slug]?.title ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );

  return (
    <div>
      <div className="treatment-search form-field">
        <label htmlFor="treatment-search">
          {t("Find a treatment or area of care")}
        </label>
        <input
          id="treatment-search"
          type="search"
          placeholder={t("Try heart valves, pacemaker or prevention")}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div
        className="treatment-filters"
        role="group"
        aria-label={t("Filter treatments")}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            aria-pressed={active === tab}
          >
            {tab === "All" ? t("All treatments") : t(tab)}
          </button>
        ))}
      </div>
      <p className="filter-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? t("treatment") : t("treatments")}
        {active !== "All" ? ` · ${t(active)} ${t("cardiology")}` : ""}
      </p>
      {filtered.length === 0 && (
        <div className="search-empty">
          <h2>{t("No matching treatments")}</h2>
          <p>
            {t("Try a different term, or call the team for help finding the right consultation.")}
          </p>
          <button
            className="btn-outline"
            onClick={() => {
              setQuery("");
              setActive("All");
            }}
          >
            {t("Show all treatments")}
          </button>
        </div>
      )}
      <div className="treatment-grid" ref={panelRef}>
        {filtered.map((item) => {
          const visual = careVisuals[item.slug] || {
            image: "/images/heart-consultation.jpg",
            alt: item.title,
            title: item.title,
            summary: item.shortDescription,
          };
          const href = localizeHref(`/treatments/${item.slug}`);

          return (
            <article
              className="treatment-card image-treatment-card motion-swap"
              key={item.id}
            >
              <Link
                tabIndex={-1}
                aria-hidden="true"
                href={href}
                className="treatment-image"
              >
                <img
                  src={visual.image}
                  alt={t(visual.alt)}
                  loading="lazy"
                  width={600}
                  height={380}
                />
                <span>{t(visual.title)}</span>
              </Link>
              <div className="treatment-card-copy">
                <span className="eyebrow-pill">
                  {t(item.category)} {t("cardiology")}
                </span>
                <h2>{t(item.title)}</h2>
                <p>{t(visual.summary)}</p>
                <Link href={href} className="text-link">
                  {t("Explore treatment")} <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
