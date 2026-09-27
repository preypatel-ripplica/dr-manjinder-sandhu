"use client";
import { useLayoutEffect, useRef } from "react";

/** Animate a panel's natural size and newly selected content, never its controls. */
export function usePanelMotion(changeKey: string | number) {
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef<number | null>(null);
  const animation = useRef<Animation | null>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const from = animation.current ? element.getBoundingClientRect().height : previous.current;
    animation.current?.cancel();
    const to = element.getBoundingClientRect().height;
    previous.current = to;
    if (from === null || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const motion = element.animate([
      { height: `${from}px`, opacity: .5, transform: "translateY(5px)" },
      { height: `${to}px`, opacity: 1, transform: "translateY(0)" },
    ], { duration: 380, easing: "cubic-bezier(.22,1,.36,1)" });
    animation.current = motion;
    motion.onfinish = () => { animation.current = null; };
  }, [changeKey]);
  useLayoutEffect(() => () => animation.current?.cancel(), []);
  return ref;
}
