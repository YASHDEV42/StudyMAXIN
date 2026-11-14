"use client";

import Link from "next/link";
import { useState } from "react";
import type { Course, GlossaryEntry } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n";
import { messages } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { docsMessages } from "@/lib/docs/messages";
import { filterGlossary, glossaryTsv } from "@/lib/docs/glossary";
import type { TopicOption } from "@/lib/docs/public";
import { CopyButton, downloadText } from "./actions";
import { SearchIcon } from "./search-palette";

export function GlossaryView({
  entries,
  courses,
  topics,
  locale,
}: {
  entries: GlossaryEntry[];
  courses: Course[];
  topics: TopicOption[];
  locale: Locale;
}) {
  const t = docsMessages[locale];
  const [query, setQuery] = useState("");
  const [courseId, setCourse] = useState("");
  const [chapterId, setChapter] = useState("");
  const [topicId, setTopic] = useState("");
  const filtered = filterGlossary(entries, topics, {
    query,
    courseId,
    chapterId,
    topicId,
  });
  const chapters =
    courses.find((course) => course.id === courseId)?.chapters ?? [];
  const availableTopics = topics.filter(
    (topic) =>
      (!courseId || topic.courseId === courseId) &&
      (!chapterId || topic.chapterId === chapterId),
  );
  const tsv = glossaryTsv(filtered);
  return (
    <>
      <p className="eyebrow">{t.library}</p>
      <h1>{messages[locale].glossary}</h1>
      <p className="lead">{t.glossaryIntro}</p>
      <div className="filter-panel glossary-filters">
        <label className="query-field">
          <span>{t.filter}</span>
          <span className="input-with-icon">
            <SearchIcon />
            <input
              type="search"
              dir="auto"
              maxLength={200}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </span>
        </label>
        <label>
          <span>{t.course}</span>
          <select
            value={courseId}
            onChange={(event) => {
              setCourse(event.target.value);
              setChapter("");
              setTopic("");
            }}
          >
            <option value="">{t.allCourses}</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title[locale]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.chapter}</span>
          <select
            disabled={!courseId}
            value={chapterId}
            onChange={(event) => {
              setChapter(event.target.value);
              setTopic("");
            }}
          >
            <option value="">{t.allChapters}</option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title[locale]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{t.topic}</span>
          <select
            value={topicId}
            onChange={(event) => setTopic(event.target.value)}
          >
            <option value="">{t.allTopics}</option>
            {availableTopics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title[locale]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="ghost-button"
          disabled={!query && !courseId && !chapterId && !topicId}
          onClick={() => {
            setQuery("");
            setCourse("");
            setChapter("");
            setTopic("");
          }}
        >
          {t.clear}
        </button>
      </div>
      <div className="results-bar">
        <p role="status" className="result-count">
          <bdi>{filtered.length}</bdi> {t.terms}
        </p>
        <div className="export-row">
          <CopyButton text={tsv} locale={locale} label={t.copyTsv} />
          <button
            type="button"
            className="ghost-button"
            onClick={() =>
              downloadText(
                tsv,
                "studymaxin-glossary.tsv",
                "text/tab-separated-values;charset=utf-8",
              )
            }
          >
            {t.downloadTsv}
          </button>
        </div>
      </div>
      {!entries.length && <p>{messages[locale].emptyGlossary}</p>}
      {!!entries.length && !filtered.length && (
        <p className="notice">{t.noResults}</p>
      )}
      {!!filtered.length && (
        <div className="glossary-region">
          <div
            className="glossary-scroll"
            dir="ltr"
            tabIndex={0}
            role="region"
            aria-label={messages[locale].glossary}
          >
            <table className="glossary-table" dir="ltr">
              <colgroup>
                <col className="col-term" />
                <col className="col-term" />
                <col className="col-example" />
                <col className="col-example" />
              </colgroup>
              <thead>
                <tr>
                  {[t.termTr, t.termEn, t.exampleTr, t.exampleEn].map(
                    (label) => (
                      <th
                        key={label}
                        scope="col"
                        lang={locale}
                        dir={locale === "ar" ? "rtl" : "ltr"}
                      >
                        {label}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry) => (
                  <tr className="glossary-entry" key={entry.id} id={entry.id}>
                    <th scope="row" lang="tr">
                      <span className="term">{entry.term.tr}</span>
                      <a
                        className="anchor-link"
                        href={`#${entry.id}`}
                        aria-label={`${entry.term.tr} — ${entry.term.en}`}
                      >
                        #
                      </a>
                      {!!entry.topicIds.length && (
                        <span className="term-links">
                          {entry.topicIds.map((id) => {
                            const topic = topics.find(
                              (topic) => topic.id === id,
                            );
                            return topic ? (
                              <Link
                                key={id}
                                lang={locale}
                                dir={locale === "ar" ? "rtl" : "ltr"}
                                href={routes.topic(locale, topic)}
                              >
                                {topic.title[locale]}
                              </Link>
                            ) : null;
                          })}
                        </span>
                      )}
                    </th>
                    <td lang="en" className="term-en">
                      {entry.term.en}
                    </td>
                    <td lang="tr">{entry.examples.tr}</td>
                    <td lang="en">{entry.examples.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
