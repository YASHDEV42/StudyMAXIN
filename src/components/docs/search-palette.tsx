"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Course } from "@/lib/content/schema";
import { direction, type Locale } from "@/lib/i18n";
import { docsMessages } from "@/lib/docs/messages";
import { searchDocuments, searchExcerpt } from "@/lib/docs/search";
import { routes } from "@/lib/routes";
import { Highlight } from "./highlight";
import { loadSearchIndex, useSearchIndex } from "./search-data";

const RESULT_LIMIT = 30;

function isApplePlatform() {
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } })
      .userAgentData?.platform ??
    navigator.platform ??
    navigator.userAgent;
  return /mac|iphone|ipad|ipod/i.test(platform);
}
const noSubscribe = () => () => {};

function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      /^(input|textarea|select)$/i.test(target.tagName))
  );
}

export function SearchIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="17"
      height="17"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="8.6" cy="8.6" r="5.6" />
      <path d="m13 13 4.2 4.2" />
    </svg>
  );
}

/**
 * Header search: a field-like trigger plus a modal command palette over the
 * same multilingual index as the search page. ⌘K on Apple platforms and
 * Ctrl+K elsewhere toggle it from anywhere; "/" opens it outside text fields.
 */
export function SearchPalette({
  locale,
  courses,
}: {
  locale: Locale;
  courses: Pick<Course, "id" | "title">[];
}) {
  const t = docsMessages[locale];
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();
  const apple = useSyncExternalStore(noSubscribe, isApplePlatform, () => null);
  const search = useSearchIndex(locale, open);

  const results =
    search.status === "ready"
      ? searchDocuments(search.index, query, course).slice(0, RESULT_LIMIT)
      : [];
  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));
  const optionId = (index: number) => `${listId}-option-${index}`;

  const show = useCallback(() => {
    const element = dialog.current;
    if (!element || element.open) return;
    element.showModal();
    setOpen(true);
    input.current?.select();
  }, []);
  const hide = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const isK = event.key.toLowerCase() === "k" || event.code === "KeyK";
      const modifier = isApplePlatform()
        ? event.metaKey && !event.ctrlKey
        : event.ctrlKey && !event.metaKey;
      if (isK && modifier && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        if (dialog.current?.open) hide();
        else show();
        return;
      }
      if (
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !isEditable(event.target) &&
        !dialog.current?.open
      ) {
        event.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, hide]);

  // Keep the active option visible while moving with the keyboard.
  useEffect(() => {
    list.current
      ?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results.length]);

  const go = (href: string) => {
    hide();
    router.push(href);
    // The search page reads ?q= itself; tell it the URL changed.
    window.setTimeout(
      () => window.dispatchEvent(new Event("studymaxin-query")),
      0,
    );
  };

  const onInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!results.length) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((activeIndex + step + results.length) % results.length);
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      go(results[activeIndex].href);
    }
  };

  const trimmed = query.trim();
  const fullSearch = `${routes.search(locale)}${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ""}`;

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        aria-haspopup="dialog"
        aria-keyshortcuts={apple ? "Meta+K" : "Control+K"}
        onClick={show}
        onPointerEnter={() => void loadSearchIndex(locale).catch(() => {})}
        onFocus={() => void loadSearchIndex(locale).catch(() => {})}
      >
        <SearchIcon />
        <span className="search-trigger-label">{t.searchPlaceholder}</span>
        <span className="search-trigger-short">{t.searchButton}</span>
        <kbd className="search-trigger-kbd" aria-hidden="true">
          {apple === null ? "" : apple ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>
      <dialog
        ref={dialog}
        className="search-dialog"
        aria-label={t.searchDialog}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) hide();
        }}
      >
        <div className="search-panel">
          <div className="search-field">
            <SearchIcon />
            <input
              ref={input}
              type="text"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={
                results.length ? optionId(activeIndex) : undefined
              }
              aria-label={t.searchDialog}
              placeholder={t.searchPlaceholder}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              dir="auto"
              maxLength={200}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
            />
            <button
              type="button"
              className="search-close"
              onClick={hide}
              aria-label={t.close}
            >
              <kbd aria-hidden="true">Esc</kbd>
            </button>
          </div>
          {courses.length > 1 && (
            <div className="search-scope" role="group" aria-label={t.course}>
              {[{ id: "", title: null }, ...courses].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={course === item.id}
                  onClick={() => {
                    setCourse(item.id);
                    setActive(0);
                  }}
                >
                  {item.title ? item.title[locale] : t.allCourses}
                </button>
              ))}
            </div>
          )}
          <div className="search-body">
            <p className="search-status" role="status" aria-live="polite">
              {search.status === "error"
                ? ""
                : search.status !== "ready"
                  ? trimmed
                    ? t.searchLoading
                    : ""
                  : trimmed
                    ? `${results.length === RESULT_LIMIT ? `${RESULT_LIMIT}+` : results.length} ${t.results}`
                    : ""}
            </p>
            {search.status === "error" && (
              <div className="search-message">
                <p>{t.searchError}</p>
                <button type="button" onClick={search.retry}>
                  ↻
                </button>
              </div>
            )}
            {!trimmed && search.status !== "error" && (
              <p className="search-message">{t.searchEmpty}</p>
            )}
            {!!trimmed && search.status === "ready" && !results.length && (
              <p className="search-message">{t.noResults}</p>
            )}
            <ul
              ref={list}
              id={listId}
              role="listbox"
              aria-label={t.searchResults}
              className="search-options"
              hidden={!results.length}
            >
              {results.map((doc, index) => (
                <li
                  key={doc.id}
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === activeIndex}
                  onPointerMove={() =>
                    index !== activeIndex && setActive(index)
                  }
                >
                  <Link
                    href={doc.href}
                    tabIndex={-1}
                    onClick={(event) => {
                      if (
                        event.metaKey ||
                        event.ctrlKey ||
                        event.shiftKey ||
                        event.button !== 0
                      )
                        return;
                      event.preventDefault();
                      go(doc.href);
                    }}
                  >
                    <span className="search-option-meta">
                      <span className="badge" data-kind={doc.kind}>
                        {doc.kind === "cheat-sheet"
                          ? t.sheetTr
                          : doc.locale === "ar"
                            ? t.lessonAr
                            : t.lessonTr}
                      </span>
                      <span className="search-option-path">
                        {doc.course}
                        {doc.chapter && <> · {doc.chapter}</>}
                      </span>
                    </span>
                    <span
                      className="search-option-title"
                      lang={doc.locale}
                      dir={direction(doc.locale)}
                    >
                      <Highlight text={doc.title} query={query} />
                    </span>
                    <span
                      className="search-option-excerpt"
                      lang={doc.locale}
                      dir={direction(doc.locale)}
                    >
                      <Highlight
                        text={searchExcerpt(doc, query)}
                        query={query}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="search-foot">
            <span className="search-keys" aria-hidden="true">
              <kbd>↑</kbd>
              <kbd>↓</kbd> {t.searchKeys}
              <kbd>↵</kbd> {t.searchOpen}
              <kbd>Esc</kbd> {t.searchClose}
            </span>
            <Link
              href={fullSearch}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.button !== 0)
                  return;
                event.preventDefault();
                go(fullSearch);
              }}
            >
              {t.searchAll}
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
