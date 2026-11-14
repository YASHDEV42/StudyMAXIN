"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Course } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n";
import { messages } from "@/lib/i18n";
import { docsMessages } from "@/lib/docs/messages";
import { routes } from "@/lib/routes";
import { LanguageSwitch } from "@/components/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { menuButtonId, sidebarId } from "./navigation";
import { setNavigationOpen, useNavigationOpen } from "./nav-store";
import { SearchPalette } from "./search-palette";

/**
 * One bar, three zones: identity and the menu at the start, search at the
 * centre of attention, then section links and preferences at the end.
 */
export function DocsHeader({
  locale,
  courses,
}: {
  locale: Locale;
  courses: Pick<Course, "id" | "title">[];
}) {
  const path = usePathname();
  const t = docsMessages[locale];
  const open = useNavigationOpen();
  const sections = [
    {
      href: routes.docs(locale),
      label: messages[locale].docs,
      current: path === routes.docs(locale) || path.includes("/courses/"),
    },
    {
      href: routes.glossary(locale),
      label: messages[locale].glossary,
      current: path === routes.glossary(locale),
    },
    {
      href: routes.labs(locale),
      label: t.labs,
      current: path === routes.labs(locale),
    },
  ];
  return (
    <header className="docs-header">
      <div className="docs-header-start">
        <button
          id={menuButtonId}
          type="button"
          className="icon-button menu-button"
          aria-expanded={open}
          aria-controls={sidebarId}
          aria-label={t.menu}
          onClick={() => setNavigationOpen(!open)}
        >
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
            <path
              d="M3.5 6h13M3.5 10h13M3.5 14h8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <Link className="brand" href={routes.home(locale)}>
          <span className="brand-mark" aria-hidden="true" />
          <bdi lang="en" dir="ltr">
            Study<em>MAXIN</em>
          </bdi>
        </Link>
      </div>
      <div className="docs-header-search">
        <SearchPalette locale={locale} courses={courses} />
      </div>
      <div className="docs-header-end">
        <nav className="header-sections" aria-label={t.mainNavigation}>
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              aria-current={
                section.current
                  ? path === section.href
                    ? "page"
                    : "true"
                  : undefined
              }
            >
              {section.label}
            </Link>
          ))}
        </nav>
        <span className="header-divider" aria-hidden="true" />
        <LanguageSwitch locale={locale} />
        <ThemeToggle locale={locale} className="header-theme" />
      </div>
    </header>
  );
}
