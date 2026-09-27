"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePanelMotion } from "@/hooks/usePanelMotion";
import { ArrowUpRight } from "lucide-react";
import { treatments, TreatmentCategory } from "@/data/treatments";
import { careVisuals } from "@/data/care-visuals";
const tabs: ("All" | TreatmentCategory)[] = [
  "All",
  "Invasive",
  "Non-Invasive",
  "Preventive",
  "General",
];
export function TreatmentsFilterGrid() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<(typeof tabs)[number]>("All");
  const panelRef = usePanelMotion(`${active}-${query}`);
  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category",
    );
    if (tabs.includes(category as typeof active))
      setActive(category as typeof active);
  }, []);
  const filtered = treatments.filter((t) => (active === "All" || t.category === active) && `${t.title} ${t.shortDescription} ${careVisuals[t.slug].title}`.toLowerCase().includes(query.toLowerCase().trim()));
  return (
    <div>
      <div className="treatment-search form-field"><label htmlFor="treatment-search">Find a treatment or area of care</label><input id="treatment-search" type="search" placeholder="Try heart valves, pacemaker or prevention" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div
        className="treatment-filters"
        role="group"
        aria-label="Filter treatments"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            aria-pressed={active === tab}
          >
            {tab === "All" ? "All treatments" : tab}
          </button>
        ))}
      </div>
      <p className="filter-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "treatment" : "treatments"}
        {active !== "All" ? ` · ${active} cardiology` : ""}
      </p>
      {filtered.length === 0 && <div className="search-empty"><h2>No matching treatments</h2><p>Try a different term, or call the team for help finding the right consultation.</p><button className="btn-outline" onClick={() => { setQuery(""); setActive("All"); }}>Show all treatments</button></div>}
      <div className="treatment-grid" ref={panelRef}>
        {filtered.map((t) => (
          <article
            className="treatment-card image-treatment-card motion-swap"
            key={t.id}
          >
            <Link
              tabIndex={-1}
              aria-hidden="true"
              href={`/treatments/${t.slug}`}
              className="treatment-image"
            >
              <img
                src={careVisuals[t.slug].image}
                alt=""
                loading="lazy"
                width={600}
                height={380}
              />
              <span>{careVisuals[t.slug].title}</span>
            </Link>
            <div className="treatment-card-copy">
              <span className="eyebrow-pill">{t.category} cardiology</span>
              <h2>{t.title}</h2>
              <p>{careVisuals[t.slug].summary}</p>
              <Link href={`/treatments/${t.slug}`} className="text-link">
                Explore treatment <ArrowUpRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
