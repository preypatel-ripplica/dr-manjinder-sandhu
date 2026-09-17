"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

export interface ScrollReelTestimonial {
  quote: string;
  author: string;
  image: string;
  alt?: string;
}

export interface ScrollReelTestimonialsProps {
  testimonials: ScrollReelTestimonial[];
  charStaggerMs?: number;
  className?: string;
}

const CELL = 120;
const GAP = 10;
const STEP = 3 * (CELL + GAP);
const EXIT_MS = 240;
const SLIDE_MS = 800;
const EASE_INOUT = "cubic-bezier(0.65, 0, 0.35, 1)";

const FEATURED_SHADOW =
  "0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)";

/* Blurred placeholder cell */
function Cell() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: `${CELL}px`,
        height: `${CELL}px`,
        flexShrink: 0,
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
        background: "linear-gradient(180deg, var(--bg-soft) 0%, #edf2f7 100%)",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8)"
      }}
    />
  );
}

/* Featured portrait tile */
function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      style={{
        width: `${CELL}px`,
        height: `${CELL}px`,
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        boxShadow: FEATURED_SHADOW,
        border: "2px solid var(--primary-tag-bg)",
        backgroundColor: "var(--bg-soft)"
      }}
    >
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 20%"
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(26,37,48,0.3) 100%)",
          pointerEvents: "none"
        }}
      />
    </div>
  );
}

/* Per-character split animation */
function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className="scroll-reel-char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function ScrollReelTestimonials({
  testimonials,
  charStaggerMs = 6,
}: ScrollReelTestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const animating = useRef(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const count = testimonials.length;

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    return () => {
      cancelAnimationFrame(raf);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const paginate = useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = index + dir;
      if (next < 0 || next >= count) return;
      animating.current = true;

      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  };

  const middleItems = useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    testimonials.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [testimonials, count]);

  const sideCellCount = 4 + 2 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  const current = testimonials[displayIndex];

  return (
    <div
      role="region"
      aria-label="Patient Testimonials Reel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        maxWidth: "1060px",
        margin: "0 auto",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
        minHeight: "400px"
      }}
      className="triage-grid"
    >
      {/* Reel section */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: "360px",
          height: "400px",
          flexShrink: 0,
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
        }}
      >
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: `${GAP}px`
        }}>
          {/* Left column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: `${GAP}px`,
              flexShrink: 0,
              willChange: "transform",
              ...colStyle(sideY)
            }}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>

          {/* Middle column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: `${GAP}px`,
              flexShrink: 0,
              willChange: "transform",
              ...colStyle(middleY)
            }}
          >
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured
                  key={i}
                  src={testimonials[item.i].image}
                  alt={testimonials[item.i].alt}
                />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          {/* Right column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: `${GAP}px`,
              flexShrink: 0,
              willChange: "transform",
              ...colStyle(sideY)
            }}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2rem 2.5rem"
      }}>
        <div>
          {/* Quote Icon */}
          <svg
            style={{ width: "36px", height: "36px", color: "var(--primary)", display: "block", marginBottom: "0.6rem" }}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
          </svg>

          {/* Text stage */}
          <div style={{ position: "relative", width: "100%", maxWidth: "520px", minHeight: "160px", paddingTop: "4px" }} aria-live="polite">
            <div
              key={displayIndex}
              className={exiting ? "scroll-reel-exit" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem"
              }}
            >
              <p style={{
                margin: 0,
                fontSize: "1.1rem",
                fontWeight: 600,
                lineHeight: 1.6,
                color: "var(--secondary)",
                letterSpacing: "-0.01em"
              }}>
                <Chars
                  text={current.quote}
                  startIndex={0}
                  staggerMs={charStaggerMs}
                />
              </p>
              <p style={{
                margin: 0,
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "var(--primary)"
              }}>
                <Chars
                  text={`— ${current.author}`}
                  startIndex={current.quote.length + 6}
                  staggerMs={charStaggerMs}
                />
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={index === 0}
            aria-label="Previous testimonial"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1.5px solid var(--border-color)",
              backgroundColor: "#ffffff",
              color: "var(--secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: index === 0 ? "not-allowed" : "pointer",
              opacity: index === 0 ? 0.4 : 1,
              transition: "all 0.2s ease"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M7.5 2.5 3.5 6l4 3.5" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={index === count - 1}
            aria-label="Next testimonial"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1.5px solid var(--border-color)",
              backgroundColor: "#ffffff",
              color: "var(--secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: index === count - 1 ? "not-allowed" : "pointer",
              opacity: index === count - 1 ? 0.4 : 1,
              transition: "all 0.2s ease"
            }}
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="m4.5 2.5 4 3.5-4 3.5" />
            </svg>
          </button>

          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600, marginLeft: "0.5rem" }}>
            {index + 1} of {count}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelTestimonials;
