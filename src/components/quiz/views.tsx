"use client";

import { useState, type RefObject } from "react";
import type { Locale } from "@/lib/i18n";
import type { PublishedQuizBank } from "@/lib/quiz/audit";
import type { Question } from "@/lib/quiz/bank";
import { quizMessages } from "@/lib/quiz/messages";
import { score, type QuizResult } from "@/lib/quiz/progress";

export function SourceNote({
  question,
  bank,
  locale,
}: {
  question: Question;
  bank: PublishedQuizBank;
  locale: Locale;
}) {
  const t = quizMessages[locale];
  const source = bank.sources.find(({ id }) => id === question.source.id)!;
  const references = bank.referencesByQuestion[question.id];
  return (
    <details className="quiz-source">
      <summary>
        {t.source}
        {question.clarificationAr && locale === "ar" ? ` · ${t.arabic}` : ""}
      </summary>
      <p>
        {references
          ? t.sourceContext
          : source.kind === "original-slides"
            ? t.original
            : source.kind === "textbook-excerpt"
              ? locale === "tr"
                ? "Kitap değerlendirme soruları"
                : "أسئلة التقييم في الكتاب"
              : t.notes}{" "}
        · <bdi lang="tr">{source.title}</bdi> · {source.kind === "textbook-excerpt" ? (locale === "tr" ? "sayfa" : "صفحة") : t.slides}{" "}
        <bdi>{question.source.slides.join(", ")}</bdi>
      </p>
      {references && (
        <ul aria-label={t.additionalSource}>
          {references.map((reference) => {
            const url = new URL(reference);
            const name = url.pathname.split("/").filter(Boolean).at(-1);
            return (
              <li key={reference}>
                <a href={reference} dir="ltr">
                  {url.hostname}
                  {name ? ` · ${name}` : ""}
                </a>
              </li>
            );
          })}
        </ul>
      )}
      {question.clarificationAr && (
        <p lang="ar" dir="rtl">
          {question.clarificationAr}
        </p>
      )}
    </details>
  );
}

export function StatLine({ stats }: { stats: [number, string][] }) {
  return (
    <dl className="quiz-stats">
      {stats.map(([value, label]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function QuizResults({
  locale,
  bank,
  questions,
  result,
  heading,
  back,
  bookmark,
  bookmarks,
}: {
  locale: Locale;
  bank: PublishedQuizBank;
  questions: ReadonlyMap<string, Question>;
  result: QuizResult;
  heading: RefObject<HTMLHeadingElement | null>;
  back: () => void;
  bookmark: (question: Question) => void;
  bookmarks: string[];
}) {
  const t = quizMessages[locale];
  const [all, setAll] = useState(false);
  const graded = score(result.items);
  const visible = result.items
    .map((item, index) => ({ ...item, index }))
    .filter(({ answer, correctIndex }) => all || answer !== correctIndex);
  return (
    <>
      <button type="button" onClick={back}>
        {t.pause}
      </button>
      <div className="quiz-intro">
        <p>{t.mode[result.mode]}</p>
        <h1 ref={heading} tabIndex={-1}>
          {t.result}
        </h1>
        <bdi className="quiz-score">
          {graded.correct}/{graded.total} <span>{graded.percentage}%</span>
        </bdi>
      </div>
      <div className="quiz-dashboard">
        <section className="quiz-card">
          <h2>{t.scoreBreakdown}</h2>
          <StatLine
            stats={[
              [graded.correct, t.correct],
              [graded.incorrect, t.incorrect],
              [graded.blank, t.blank],
            ]}
          />
        </section>
        <section className="quiz-card">
          <h2>{t.performance}</h2>
          <dl className="quiz-counts">
            {bank.topics.map(({ id, title }) => {
              const topic = score(
                result.items.filter(({ topicId }) => topicId === id),
              );
              if (!topic.total) return null;
              return (
                <div key={id}>
                  <dt>{title[locale]}</dt>
                  <dd>
                    <bdi>
                      {topic.correct}/{topic.total}
                    </bdi>
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      </div>
      <section className="quiz-card quiz-history">
        <div className="quiz-session-toolbar">
          <h2>{t.review}</h2>
          <label className="quiz-review-filter">
            <input
              type="checkbox"
              checked={all}
              onChange={(event) => setAll(event.target.checked)}
            />{" "}
            {t.all}
          </label>
        </div>
        {!all && (
          <p>
            {t.missed} · {visible.length}
          </p>
        )}
        {!visible.length && <p>{t.noMissed}</p>}
        <ol className="quiz-result-list">
          {visible.map(({ id, answer, correctIndex, index }) => {
            const question = questions.get(id);
            const marked = bookmarks.includes(id);
            return (
              <li key={id} className="quiz-card">
                <p className="quiz-question-meta">
                  {t.question} {index + 1} ·{" "}
                  {answer === null
                    ? t.blank
                    : answer === correctIndex
                      ? t.correct
                      : t.incorrect}
                </p>
                {question ? (
                  <>
                    <h3 lang="tr" dir="ltr">
                      {question.question}
                    </h3>
                    <dl className="quiz-result-answers">
                      <dt>{t.yourAnswer}</dt>
                      <dd
                        lang={answer === null ? undefined : "tr"}
                        dir={answer === null ? undefined : "ltr"}
                      >
                        {answer === null ? t.blank : question.choices[answer]}
                      </dd>
                      <dt>{t.correctAnswer}</dt>
                      <dd lang="tr" dir="ltr">
                        {question.choices[correctIndex]}
                      </dd>
                    </dl>
                    <p lang="tr" dir="ltr">
                      {question.explanation}
                    </p>
                    <SourceNote
                      question={question}
                      bank={bank}
                      locale={locale}
                    />
                    <button
                      type="button"
                      aria-pressed={marked}
                      onClick={() => bookmark(question)}
                    >
                      {marked ? "★ " : "☆ "}
                      {marked ? t.unbookmark : t.bookmark}
                    </button>
                  </>
                ) : (
                  <p>{t.retired}</p>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
