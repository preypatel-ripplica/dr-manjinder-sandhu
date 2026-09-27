"use client";
<<<<<<< HEAD

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, ShieldCheck, Activity } from "lucide-react";
import { treatments, TreatmentCategory } from "@/data/treatments";

export const TreatmentsFilterGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"All" | TreatmentCategory>("All");

  const filteredTreatments = activeTab === "All"
    ? treatments
    : treatments.filter(t => t.category === activeTab);

  const tabs: ("All" | TreatmentCategory)[] = ["All", "Invasive", "Non-Invasive", "Preventive", "General"];

  return (
    <div>
      {/* Category Filter Tab Bar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        justifyContent: "center",
        marginBottom: "3rem"
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.65rem 1.4rem",
                borderRadius: "var(--radius-pill)",
                border: isActive ? "1.5px solid var(--primary)" : "1px solid var(--border-color)",
                backgroundColor: isActive ? "var(--primary)" : "var(--bg-card)",
                color: isActive ? "#ffffff" : "var(--secondary)",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: isActive ? "0 4px 14px rgba(230, 35, 52, 0.25)" : "none"
              }}
            >
              {tab === "All" ? "All Treatments" : `${tab} Cardiology`}
            </button>
          );
        })}
      </div>

      {/* Grid of Treatment Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "2rem"
      }}>
        {filteredTreatments.map((treatment) => (
          <div
            key={treatment.id}
            className="card-surface"
            style={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span className="eyebrow-pill" style={{ fontSize: "0.7rem" }}>
                  {treatment.category.toUpperCase()} CARDIOLOGY
                </span>
                {treatment.isPopular && (
                  <span style={{
                    backgroundColor: "var(--secondary)",
                    color: "#ffffff",
                    fontSize: "0.675rem",
                    fontWeight: 700,
                    padding: "0.25rem 0.6rem",
                    borderRadius: "var(--radius-pill)",
                    textTransform: "uppercase"
                  }}>
                    Featured Procedure
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: "1.3rem", color: "var(--secondary)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                {treatment.title}
              </h3>

              <p style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.85rem" }}>
                {treatment.tagline}
              </p>

              <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                {treatment.shortDescription}
              </p>

              {/* Key Benefits List */}
              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--secondary)", marginBottom: "0.5rem" }}>
                  KEY CLINICAL HIGHLIGHTS:
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {treatment.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", fontSize: "0.825rem", color: "var(--text-body)" }}>
                      <CheckCircle2 size={14} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href={`/treatments/${treatment.slug}`}
              className="btn-outline"
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.875rem",
                justifyContent: "center"
              }}
            >
              <span>View Details & Recovery</span>
              <ArrowRight size={15} />
            </Link>
          </div>
=======
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
>>>>>>> ea53e95 (Update website design, SEO files, and content)
        ))}
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> ea53e95 (Update website design, SEO files, and content)
