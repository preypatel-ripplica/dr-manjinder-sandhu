"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { treatments } from "@/data/treatments";

export const TreatmentsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + treatments.length) % treatments.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % treatments.length);
  };

  // Get 3 visible treatments centered around activeIndex
  const visibleItems = [-1, 0, 1].map((offset) => {
    const idx = (activeIndex + offset + treatments.length) % treatments.length;
    return { ...treatments[idx], isCenter: offset === 0, realIndex: idx };
  });

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
        marginBottom: "2.5rem"
      }}>
        <div>
          <span className="eyebrow-pill" style={{ marginBottom: "0.5rem" }}>
            SPECIALIZED CARDIOLOGY
          </span>
          <h2 style={{ fontSize: "2.2rem", color: "var(--secondary)", marginTop: "0.4rem" }}>
            Key Cardiology <span style={{ color: "var(--primary)" }}>Treatments</span>
          </h2>
        </div>

        <p style={{ color: "var(--text-body)", fontSize: "0.95rem", maxWidth: "520px" }}>
          Clear interventional care pathways for common heart concerns, from initial ECG diagnostic evaluation to wrist stenting, valve replacement, and long-term recovery.
        </p>
      </div>

      {/* Carousel Track Container */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.75rem",
        alignItems: "stretch",
        marginBottom: "2.5rem"
      }} className="metrics-grid">
        {visibleItems.map((item) => (
          <div
            key={`${item.id}-${item.realIndex}`}
            onClick={() => setActiveIndex(item.realIndex)}
            className="card-surface"
            style={{
              padding: "2rem",
              borderRadius: "var(--radius-lg)",
              backgroundColor: item.isCenter ? "var(--primary-light)" : "var(--bg-card)",
              border: item.isCenter ? "2px solid var(--primary)" : "1px solid var(--border-color)",
              transform: item.isCenter ? "scale(1.03)" : "scale(0.98)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: item.isCenter ? "var(--shadow-hover)" : "var(--shadow-card)"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span className="eyebrow-pill" style={{ fontSize: "0.675rem" }}>
                  {item.category.toUpperCase()} CARDIOLOGY
                </span>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: item.isCenter ? "var(--primary)" : "var(--bg-soft)",
                  color: item.isCenter ? "#ffffff" : "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Zap size={18} />
                </div>
              </div>

              <h3 style={{ fontSize: "1.3rem", color: "var(--secondary)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                {item.title}
              </h3>

              <p style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>
                {item.tagline}
              </p>

              <p style={{ color: "var(--text-body)", fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                {item.shortDescription}
              </p>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginBottom: "1.25rem" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {item.benefits.slice(0, 2).map((b, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", fontSize: "0.825rem", color: "var(--text-body)" }}>
                      <CheckCircle2 size={14} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href={`/treatments/${item.slug}`}
              className={item.isCenter ? "btn-primary" : "btn-outline"}
              style={{ width: "100%", justifyContent: "center", padding: "0.75rem", fontSize: "0.875rem" }}
            >
              <span>Explore Treatment</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        ))}
      </div>

      {/* Carousel Navigation Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/treatments" className="btn-outline">
          View all treatments <ArrowRight size={16} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={showPrevious}
            aria-label="Previous treatment"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1.5px solid var(--border-color)",
              backgroundColor: "#ffffff",
              color: "var(--secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={showNext}
            aria-label="Next treatment"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1.5px solid var(--primary)",
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 14px rgba(230,35,52,0.3)"
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
