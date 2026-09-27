"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Short route fades and interruptible anchor easing; wheel/touch scrolling stays native. */
export function NavigationMotion() {
  const pathname = usePathname();
  const router = useRouter();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const routeAnimation = useRef<Animation | null>(null);
  const navigating = useRef(false);
  useLayoutEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    navigating.current = false;
    routeAnimation.current?.cancel();
    const main = document.getElementById("main-content");
    if (main && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      routeAnimation.current = main.animate([
        { opacity: .25, transform: "translateY(9px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" });
    }
  }, [pathname]);
  useEffect(() => {
    let frame = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const cancelScroll = () => cancelAnimationFrame(frame);
    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || !["http:", "https:"].includes(url.protocol)) return;
      const samePath = url.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "");
      if (samePath && url.search === location.search && url.hash) {
        const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (!target || link.classList.contains("skip-link")) return;
        event.preventDefault();
        cancelScroll();
        const start = scrollY;
        const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 100;
        const destination = Math.max(0, Math.min(start + target.getBoundingClientRect().top - offset, document.documentElement.scrollHeight - innerHeight));
        history.pushState(history.state, "", url.hash);
        const finish = () => {
          const tabindex = target.getAttribute("tabindex");
          target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true });
          target.addEventListener("blur", () => { if (tabindex === null) target.removeAttribute("tabindex"); else target.setAttribute("tabindex", tabindex); }, { once: true });
        };
        if (reduced.matches) { scrollTo({ top: destination, behavior: "instant" }); finish(); return; }
        const begun = performance.now();
        const duration = Math.min(850, 450 + Math.abs(destination - start) * .06);
        const tick = (now: number) => {
          const t = Math.min(1, (now - begun) / duration);
          const eased = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          scrollTo({ top: start + (destination - start) * eased, behavior: "instant" });
          if (t < 1) frame = requestAnimationFrame(tick); else finish();
        };
        frame = requestAnimationFrame(tick);
      } else if (!samePath && !reduced.matches) {
        event.preventDefault();
        if (navigating.current) return;
        navigating.current = true;
        routeAnimation.current?.cancel();
        routeAnimation.current = document.getElementById("main-content")?.animate([
          { opacity: 1 }, { opacity: .2 },
        ], { duration: 120, fill: "forwards", easing: "ease-out" }) || null;
        timers.current.push(setTimeout(() => router.push(url.pathname + url.search + url.hash), 120));
        // Restore the current page if a route cannot finish, rather than leaving it faded.
        timers.current.push(setTimeout(() => { routeAnimation.current?.cancel(); navigating.current = false; }, 1800));
      }
    }
    document.addEventListener("click", click, true);
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    window.addEventListener("keydown", cancelScroll);
    return () => {
      document.removeEventListener("click", click, true);
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
      window.removeEventListener("keydown", cancelScroll);
      cancelScroll(); timers.current.forEach(clearTimeout); routeAnimation.current?.cancel();
    };
  }, [router]);
  return null;
}
