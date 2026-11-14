"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";
import { direction } from "@/lib/i18n";
import type { Course } from "@/lib/content/schema";
import { docsMessages } from "@/lib/docs/messages";
import { searchDocuments, searchExcerpt } from "@/lib/docs/search";
import { Highlight } from "./highlight";
import { SearchIcon } from "./search-palette";
import { useSearchIndex } from "./search-data";

function subscribeQuery(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("studymaxin-query", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("studymaxin-query", onChange);
  };
}
function getQuery() {
  return (
    new URLSearchParams(window.location.search).get("q")?.slice(0, 200) ?? ""
  );
}

export function SearchView({
  courses,
  locale,
}: {
  courses: Pick<Course, "id" | "title">[];
  locale: Locale;
}) {
  const t = docsMessages[locale];
  const query = useSyncExternalStore(subscribeQuery, getQuery, () => "");
  const [course, setCourse] = useState("");
  const search = useSearchIndex(locale);
  const results =
    search.status === "ready"
      ? searchDocuments(search.index, query, course)
      : [];
  return (
    <>
      <p className="eyebrow">{t.library}</p>
      <h1>{t.search}</h1>
      <p className="lead">{t.searchIntro}</p>
      <div className="filter-panel">
        <label className="query-field">
          <span>{t.query}</span>
          <span className="input-with-icon">
            <SearchIcon />
            <input
              autoComplete="off"
              type="search"
              value={query}
              maxLength={200}
              dir="auto"
              onChange={(event) => {
                const url = new URL(window.location.href);
                if (event.target.value)
                  url.searchParams.set("q", event.target.value);
                else url.searchParams.delete("q");
                window.history.replaceState(window.history.state, "", url);
                window.dispatchEvent(new Event("studymaxin-query"));
              }}
            />
          </span>
        </label>
        <label>
          <span>{t.course}</span>
          <select
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          >
            <option value="">{t.allCourses}</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title[locale]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="result-count">
        {search.status === "error"
          ? t.searchError
          : !query.trim()
            ? t.startSearch
            : search.status === "ready"
              ? `${results.length} ${t.results}`
              : t.searchLoading}
      </p>
      {!!query.trim() && search.status === "ready" && !results.length && (
        <p className="notice">{t.noResults}</p>
      )}
      <ol className="search-results">
        {results.slice(0, 50).map((doc) => (
          <li key={doc.id}>
            <p className="search-option-meta">
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
            </p>
            <h2 lang={doc.locale} dir={direction(doc.locale)}>
              <Link href={doc.href}>
                <Highlight text={doc.title} query={query} />
              </Link>
            </h2>
            <p lang={doc.locale} dir={direction(doc.locale)}>
              <Highlight text={searchExcerpt(doc, query)} query={query} />
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
