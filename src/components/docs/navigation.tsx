"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Course } from "@/lib/content/schema";
import type { TopicOption } from "@/lib/docs/public";
import type { Locale } from "@/lib/i18n";
import { messages } from "@/lib/i18n";
import { docsMessages } from "@/lib/docs/messages";
import { routes } from "@/lib/routes";
import { quizMessages } from "@/lib/quiz/messages";
import { LanguageSwitch } from "@/components/language-switch";
import { setNavigationOpen, useNavigationOpen } from "./nav-store";

export const sidebarId = "docs-sidebar";
export const menuButtonId = "docs-menu-button";

const chapterKey = (courseId: string, chapterId: string) =>
  `${courseId}/${chapterId}`;

function Chevron() {
  return (
    <svg
      className="sidebar-chevron"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m6 3.5 4.5 4.5L6 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Course → chapter → topic navigation. Only the chapter that contains the
 * current topic opens by default; readers can open others, and moving to a
 * topic in another chapter opens that chapter too. Below the desktop
 * breakpoint the same element becomes a drawer opened from the header.
 */
export function DocsNavigation({
  courses,
  topics,
  locale,
}: {
  courses: Course[];
  topics: TopicOption[];
  locale: Locale;
}) {
  const path = usePathname();
  const t = docsMessages[locale];
  const open = useNavigationOpen();
  const scroller = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const current = topics.find((topic) => path.includes(`/topics/${topic.id}/`));
  const activeKey = current
    ? chapterKey(current.courseId, current.chapterId)
    : undefined;

  const [expanded, setExpanded] = useState(
    () => new Set(activeKey ? [activeKey] : []),
  );
  // Reveal the chapter of a newly visited topic (state adjusted during render,
  // so the opened chapter is part of the same paint as the new page).
  const [seenKey, setSeenKey] = useState(activeKey);
  if (seenKey !== activeKey) {
    setSeenKey(activeKey);
    if (activeKey && !expanded.has(activeKey))
      setExpanded(new Set(expanded).add(activeKey));
  }

  // Keep the current topic in view inside the sidebar's own scroll area,
  // without moving the page.
  useEffect(() => {
    const container = scroller.current;
    const link = container?.querySelector<HTMLElement>(
      '.sidebar-topics [aria-current="page"]',
    );
    if (!container || !link) return;
    const top =
      link.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop;
    if (
      top < container.scrollTop + 48 ||
      top > container.scrollTop + container.clientHeight - 96
    )
      container.scrollTop = Math.max(0, top - container.clientHeight / 3);
  }, [path, open]);

  // The drawer closes on navigation.
  useEffect(() => setNavigationOpen(false), [path]);

  // Drawer behaviour: focus, Escape, background inert, no page scroll.
  useEffect(() => {
    if (!open) return;
    const main = document.getElementById("main-content");
    const root = document.documentElement;
    const previous = root.style.overflow;
    main?.setAttribute("inert", "");
    root.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setNavigationOpen(false);
      document.getElementById(menuButtonId)?.focus();
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setNavigationOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      main?.removeAttribute("inert");
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const toggle = (key: string) =>
    setExpanded((previous) => {
      const next = new Set(previous);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const utilities = [
    { href: routes.glossary(locale), label: messages[locale].glossary },
    { href: routes.search(locale), label: t.search },
    { href: routes.labs(locale), label: t.labs },
    { href: routes.quiz(locale), label: quizMessages[locale].link },
  ];

  return (
    <>
      <div
        className="docs-backdrop"
        data-open={open || undefined}
        aria-hidden="true"
        onClick={() => setNavigationOpen(false)}
      />
      <aside
        id={sidebarId}
        className="docs-sidebar"
        data-open={open || undefined}
      >
        <div className="sidebar-drawer-head">
          <span>{t.navigation}</span>
          <button
            ref={closeButton}
            type="button"
            className="icon-button"
            aria-label={t.closeMenu}
            onClick={() => {
              setNavigationOpen(false);
              document.getElementById(menuButtonId)?.focus();
            }}
          >
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5 5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="sidebar-scroll" ref={scroller}>
          <nav aria-label={t.navigation} className="sidebar-nav">
            {courses.map((course) => {
              const courseHref = routes.course(locale, course.id);
              return (
                <div className="sidebar-course" key={course.id}>
                  <Link
                    className="sidebar-course-link"
                    href={courseHref}
                    aria-current={path === courseHref ? "page" : undefined}
                  >
                    {course.title[locale]}
                  </Link>
                  <ol className="sidebar-chapters">
                    {[...course.chapters]
                      .sort((a, b) => a.order - b.order)
                      .map((chapter) => {
                        const key = chapterKey(course.id, chapter.id);
                        const items = topics
                          .filter(
                            (topic) =>
                              topic.courseId === course.id &&
                              topic.chapterId === chapter.id,
                          )
                          .sort((a, b) => a.order - b.order);
                        const number = String(chapter.order + 1).padStart(
                          2,
                          "0",
                        );
                        if (!items.length)
                          return (
                            <li
                              key={chapter.id}
                              className="sidebar-chapter"
                              data-empty
                            >
                              <span className="sidebar-chapter-row">
                                <span className="sidebar-chapter-number">
                                  {number}
                                </span>
                                <span className="sidebar-chapter-title">
                                  {chapter.title[locale]}
                                </span>
                                <span className="sidebar-soon">
                                  {t.comingSoon}
                                </span>
                              </span>
                            </li>
                          );
                        const isOpen = expanded.has(key);
                        const panel = `chapter-${course.id}-${chapter.id}`;
                        return (
                          <li
                            key={chapter.id}
                            className="sidebar-chapter"
                            data-active={key === activeKey || undefined}
                          >
                            <button
                              type="button"
                              className="sidebar-chapter-row"
                              aria-expanded={isOpen}
                              aria-controls={panel}
                              onClick={() => toggle(key)}
                            >
                              <span className="sidebar-chapter-number">
                                {number}
                              </span>
                              <span className="sidebar-chapter-title">
                                {chapter.title[locale]}
                              </span>
                              <Chevron />
                            </button>
                            <div
                              id={panel}
                              className="sidebar-topics-panel"
                              data-open={isOpen || undefined}
                            >
                              <ol className="sidebar-topics">
                                {items.map((topic) => (
                                  <li key={topic.id}>
                                    <Link
                                      href={routes.topic(locale, topic)}
                                      aria-current={
                                        topic.id === current?.id
                                          ? "page"
                                          : undefined
                                      }
                                    >
                                      {topic.title[locale]}
                                    </Link>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </li>
                        );
                      })}
                  </ol>
                </div>
              );
            })}
          </nav>
          <div className="sidebar-utilities">
            <nav aria-label={docsMessages[locale].mainNavigation}>
              {utilities.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={
                    item.href === routes.quiz(locale) ? false : undefined
                  }
                  aria-current={path === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <LanguageSwitch locale={locale} />
          </div>
        </div>
      </aside>
    </>
  );
}
