"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function MotionEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = new Set<Animation>();
    const disclosures = new Map<
      HTMLDetailsElement,
      { animation: Animation; opening: boolean }
    >();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            if (!reduced.matches) {
              const animation = entry.target.animate(
                [
                  { opacity: 0, transform: "translateY(22px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
              );
              running.add(animation);
              animation.onfinish = () => running.delete(animation);
            }
          }
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        "main section > .container-custom, main .article-body, main .editorial-card",
      )
      .forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.85)
          observer.observe(el);
      });
    function disclosure(event: MouseEvent) {
      const summary = (event.target as Element).closest("summary");
      const details = summary?.parentElement;
      if (!(details instanceof HTMLDetailsElement) || reduced.matches) return;
      event.preventDefault();
      const previous = disclosures.get(details);
      const opening = previous ? !previous.opening : !details.open;
      const start = details.getBoundingClientRect().height;
      previous?.animation.cancel();
      details.open = true;
      const expanded = details.getBoundingClientRect().height;
      const compact =
        summary!.getBoundingClientRect().height +
        parseFloat(getComputedStyle(details).paddingTop) +
        parseFloat(getComputedStyle(details).paddingBottom) +
        parseFloat(getComputedStyle(details).borderTopWidth) +
        parseFloat(getComputedStyle(details).borderBottomWidth);
      details.style.overflow = "hidden";
      const animation = details.animate(
        [
          { height: `${start}px` },
          { height: `${opening ? expanded : compact}px` },
        ],
        { duration: 300, easing: "cubic-bezier(.2,.7,.2,1)" },
      );
      disclosures.set(details, { animation, opening });
      animation.onfinish = () => {
        details.open = opening;
        details.style.overflow = "";
        disclosures.delete(details);
      };
    }
    document.addEventListener("click", disclosure);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", disclosure);
      running.forEach((a) => a.cancel());
      disclosures.forEach(({ animation, opening }, el) => {
        animation.cancel();
        el.open = opening;
        el.style.overflow = "";
      });
    };
  }, [pathname]);
  return null;
}
