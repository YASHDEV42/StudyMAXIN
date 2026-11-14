"use client";

import { useEffect } from "react";

/**
 * The opening choreography's only job: reveal the type once its fonts are in
 * (or after a short patience), by setting `data-ready` on the landing root.
 * CSS has a timed failsafe and <noscript> override if this never runs.
 */
export function HeroStage() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-landing]");
    if (!root) return;
    let cancelled = false;
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const patience = new Promise((resolve) => window.setTimeout(resolve, 1400));
    void Promise.race([fonts, patience]).then(() =>
      requestAnimationFrame(() => {
        if (!cancelled) root.dataset.ready = "true";
      }),
    );
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
