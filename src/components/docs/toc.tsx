"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { direction } from "@/lib/i18n";

type Heading = { id: string; title: string; depth: number };

/**
 * "On this page" rail for wide screens. The highlighted entry is the last
 * heading that has scrolled past the reading line near the top of the viewport.
 */
export function TocRail({
  headings,
  label,
  contentLocale,
}: {
  headings: Heading[];
  label: string;
  contentLocale: Locale;
}) {
  const [active, setActive] = useState<string>();
  useEffect(() => {
    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => !!element);
    if (!targets.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = 120;
      let current: string | undefined;
      for (const target of targets) {
        if (target.getBoundingClientRect().top - line <= 0) current = target.id;
        else break;
      }
      // At the very end of the page, the final heading is the one being read.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      )
        current = targets[targets.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);
  return (
    <nav className="toc-rail-nav" aria-label={label}>
      <p className="toc-rail-label">{label}</p>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id} data-depth={heading.depth > 2 ? 3 : 2}>
            <a
              href={`#${heading.id}`}
              lang={contentLocale}
              dir={direction(contentLocale)}
              aria-current={active === heading.id ? "location" : undefined}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
