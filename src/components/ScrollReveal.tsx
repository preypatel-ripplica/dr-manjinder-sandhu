"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollReveal: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Gather section containers and key component blocks
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "section, .reveal-section, .revealSection, .card-surface, .stat-card-vikram, .clinic-spotlight-card, .expert-top-row"
      )
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;

          // Reveal section container
          target.classList.add("reveal-visible");
          target.classList.add("revealVisible");
          target.classList.add("reveal-in-view");

          // Reveal child cards/items with light 60ms staggered delays
          const children = Array.from(
            target.querySelectorAll<HTMLElement>(
              ".card-surface, .stat-card-vikram, article, .reveal-child, .reveal-item, .benefit-card, .clinic-card"
            )
          );

          children.forEach((child, idx) => {
            child.classList.add("reveal-child-visible");
            child.classList.add("revealChildVisible");
            child.classList.add("reveal-in-view");
            if (!child.style.transitionDelay) {
              child.style.transitionDelay = `${(idx % 6) * 60}ms`;
            }
          });

          observer.unobserve(target);
        });
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.05
      }
    );

    sections.forEach((sec, sIdx) => {
      // Check if element is already inside top viewport on initial page load
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && sIdx === 0) {
        sec.classList.add("reveal-visible");
        sec.classList.add("revealVisible");
        sec.classList.add("reveal-in-view");
      } else {
        sec.classList.add("reveal-pending");
        sec.classList.add("revealPending");

        const children = Array.from(
          sec.querySelectorAll<HTMLElement>(
            ".card-surface, .stat-card-vikram, article, .reveal-child, .reveal-item, .benefit-card, .clinic-card"
          )
        );

        children.forEach((c, cIdx) => {
          c.classList.add("reveal-child");
          c.classList.add("revealChild");
          c.style.transitionDelay = `${(cIdx % 6) * 60}ms`;
        });

        observer.observe(sec);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};
