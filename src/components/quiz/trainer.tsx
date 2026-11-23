"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import type { Locale } from "@/lib/i18n";
import type { PublishedQuizBank } from "@/lib/quiz/audit";
import type { Question } from "@/lib/quiz/bank";
import { quizMessages } from "@/lib/quiz/messages";
import {
  attemptTotals,
  emptyProgress,
  exportProgress,
  finishSession,
  importProgress,
  maxImportBytes,
  readLocal,
  recordAnswer,
  reviewPool,
  score,
  storageKeyFor,
  type LocalQuiz,
  type QuizResult,
} from "@/lib/quiz/progress";
import {
  batchSizes,
  createSession,
  examSize,
  modes,
  moveSession,
  selectAnswer,
  timerMinutes,
  type Mode,
} from "@/lib/quiz/session";
import { QuizResults, SourceNote, StatLine } from "./views";

export function QuizTrainer({
  locale,
  bank,
}: {
  locale: Locale;
  bank: PublishedQuizBank;
}) {
  const t = quizMessages[locale];
  const storageKey = storageKeyFor(bank.courseId);
  const questions = useMemo(
    () => new Map(bank.questions.map((question) => [question.id, question])),
    [bank],
  );
  const [data, setData] = useState<LocalQuiz>(() => ({
    progress: emptyProgress(bank.courseId),
    active: null,
  }));
  const current = useRef(data);
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<"home" | "session" | "result">("home");
  const [result, setResult] = useState<QuizResult | null>(null);
  const [mode, setMode] = useState<Mode>("topic");
  const [topic, setTopic] = useState(bank.topics[0].id);
  const [size, setSize] = useState(10);
  const [minutes, setMinutes] = useState(75);
  const [clock, setClock] = useState(0);
  const [notice, setNotice] = useState("");
  const [storageFailed, setStorageFailed] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const upload = useRef<HTMLInputElement>(null);
  const { active, progress } = data;

  useEffect(() => {
    const load = window.setTimeout(() => {
      try {
        const restored = readLocal(
          window.localStorage.getItem(storageKey),
          questions,
          bank.courseId,
        );
        current.current = restored.data;
        setData(restored.data);
        if (restored.recovered) setNotice(t.recovered);
        if (restored.data.active) setScreen("session");
      } catch {
        setStorageFailed(true);
      }
      setClock(Date.now());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(load);
  }, [questions, t.recovered, storageKey, bank.courseId]);

  const save = useCallback(
    (next: LocalQuiz) => {
      current.current = next;
      setData(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
        setStorageFailed(false);
      } catch {
        setStorageFailed(true);
      }
    },
    [storageKey],
  );

  const finish = useCallback(
    (now: number) => {
      const { active, progress } = current.current;
      if (!active) return;
      const completed = finishSession(progress, active, questions, now);
      if (!completed) return;
      save({ active: null, progress: completed.progress });
      setResult(completed.result);
      setScreen("result");
    },
    [questions, save],
  );

  const deadline = active?.deadline;
  useEffect(() => {
    if (deadline == null) return;
    const tick = () => {
      const now = Date.now();
      setClock(now);
      if (now >= deadline) finish(now);
    };
    const initial = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 250);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [deadline, finish]);

  const previousScreen = useRef(screen);
  useEffect(() => {
    if (screen !== "home" || screen !== previousScreen.current)
      heading.current?.focus();
    previousScreen.current = screen;
  }, [screen, active?.position]);

  const wrong = useMemo(
    () => reviewPool(bank.questions, progress, "wrong"),
    [bank, progress],
  );
  const bookmarks = useMemo(
    () => reviewPool(bank.questions, progress, "bookmarks"),
    [bank, progress],
  );
  const pool =
    mode === "wrong"
      ? wrong
      : mode === "bookmarks"
        ? bookmarks
        : mode === "topic"
          ? bank.questions.filter(({ topicId }) => topicId === topic)
          : mode === "book"
            ? bank.questions.filter(({ source }) =>
                bank.sources.some(
                  (item) => item.id === source.id && item.kind === "textbook-excerpt",
                ),
              )
            : bank.questions;
  const limit =
    mode === "exam"
      ? examSize
      : mode === "wrong" || mode === "bookmarks"
        ? Math.min(pool.length, size)
        : size;

  function start() {
    const now = Date.now();
    const session = createSession(
      pool,
      mode,
      limit,
      mode === "exam" && minutes ? now + minutes * 60_000 : null,
    );
    if (!session || current.current.active) return;
    setClock(now);
    save({ ...current.current, active: session });
    setScreen("session");
  }

  function answer(index: number, now: number) {
    const { active, progress } = current.current;
    if (!active) return;
    if (active.deadline !== null && now >= active.deadline) return finish(now);
    const updated = selectAnswer(active, index, now);
    if (updated === active) return;
    const item = updated.items[updated.position];
    const question = questions.get(item.id)!;
    save({
      active: updated,
      progress:
        active.mode === "exam"
          ? progress
          : recordAnswer(
              progress,
              item.id,
              item.answer === question.correctIndex,
              active.mode,
            ),
    });
  }

  function move(position: number) {
    const { active, progress } = current.current;
    if (!active) return;
    const updated = moveSession(active, position);
    if (updated !== active) save({ active: updated, progress });
  }

  function toggleBookmark(question: Question) {
    const snapshot = current.current;
    const { bookmarks } = snapshot.progress;
    save({
      ...snapshot,
      progress: {
        ...snapshot.progress,
        bookmarks: bookmarks.includes(question.id)
          ? bookmarks.filter((id) => id !== question.id)
          : [...bookmarks, question.id],
      },
    });
  }

  function onKeys(event: KeyboardEvent, now: number) {
    if (
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      (event.target instanceof HTMLElement &&
        event.target.closest(
          "input, select, textarea, a, summary, [contenteditable]",
        ))
    )
      return;
    if (event.key.toLowerCase() === "n" && current.current.active) {
      event.preventDefault();
      if (event.repeat) return;
      const session = current.current.active;
      if (session.position < session.items.length - 1)
        move(session.position + 1);
      else if (session.mode !== "exam") finish(now);
    }
    if (/^[1-5]$/.test(event.key)) {
      event.preventDefault();
      if (!event.repeat) answer(Number(event.key) - 1, now);
    }
  }

  async function restore(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    try {
      if (file.size > maxImportBytes) throw new Error();
      const imported = importProgress(await file.text(), bank.courseId);
      if (!window.confirm(t.replace)) return;
      save({ active: null, progress: imported });
      setNotice(t.imported);
    } catch {
      setNotice(t.invalidImport);
    }
  }

  function backup() {
    const url = URL.createObjectURL(
      new Blob([exportProgress(current.current.progress)], {
        type: "application/json",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `studymaxin-${bank.courseId}-progress.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (screen === "result" && result) {
    return (
      <main className="quiz-main">
        {storageFailed && (
          <p role="status" className="quiz-notice">
            {t.storageError}
          </p>
        )}
        <QuizResults
          locale={locale}
          bank={bank}
          questions={questions}
          result={result}
          heading={heading}
          back={() => setScreen("home")}
          bookmark={toggleBookmark}
          bookmarks={progress.bookmarks}
        />
      </main>
    );
  }

  if (screen === "session" && active) {
    const item = active.items[active.position];
    const question = questions.get(item.id)!;
    const exam = active.mode === "exam";
    const answered = active.items.filter(
      ({ answer }) => answer !== null,
    ).length;
    const reveal = !exam && item.answer !== null;
    const correct = item.answer === question.correctIndex;
    const remaining = Math.max(
      0,
      Math.ceil(((active.deadline ?? clock) - clock) / 1000),
    );
    const marked = progress.bookmarks.includes(question.id);
    return (
      <main
        className="quiz-main quiz-session"
        onKeyDown={(event) => {
          // A keyboard event, like a click, is graded against the wall clock.
          // eslint-disable-next-line react-hooks/purity
          onKeys(event, Date.now());
        }}
      >
        <div className="quiz-session-toolbar">
          <button type="button" onClick={() => setScreen("home")}>
            {t.pause}
          </button>
          {active.deadline !== null && (
            <span className="quiz-clock">
              {t.timer}{" "}
              <bdi>
                {Math.floor(remaining / 60)}:
                {String(remaining % 60).padStart(2, "0")}
              </bdi>
            </span>
          )}
        </div>
        {storageFailed && (
          <p role="status" className="quiz-notice">
            {t.storageError}
          </p>
        )}
        <div className="quiz-progress">
          <strong>{t.mode[active.mode]}</strong>
          <span>
            <bdi>
              {answered}/{active.items.length}
            </bdi>{" "}
            {t.answered}
          </span>
        </div>
        <progress
          value={answered}
          max={active.items.length}
          aria-label={t.answered}
        />
        <section className="quiz-card quiz-question">
          <div className="quiz-question-meta">
            <span>
              {t.question}{" "}
              <bdi>
                {active.position + 1}/{active.items.length}
              </bdi>{" "}
              ·{" "}
              {
                bank.topics.find(({ id }) => id === question.topicId)?.title[
                  locale
                ]
              }
            </span>
            <button
              type="button"
              aria-pressed={marked}
              onClick={() => toggleBookmark(question)}
            >
              {marked ? "★ " : "☆ "}
              {marked ? t.unbookmark : t.bookmark}
            </button>
          </div>
          <h1 ref={heading} tabIndex={-1} lang="tr" dir="ltr">
            {question.question}
          </h1>
          <ol
            className="quiz-options"
            aria-label={t.choose}
            lang="tr"
            dir="ltr"
          >
            {item.order.map((original, displayed) => (
              <li key={original}>
                <button
                  type="button"
                  aria-keyshortcuts={String(displayed + 1)}
                  aria-pressed={item.answer === original}
                  aria-disabled={reveal || undefined}
                  data-feedback={
                    reveal && original === question.correctIndex
                      ? "correct"
                      : reveal && item.answer === original
                        ? "incorrect"
                        : undefined
                  }
                  onClick={() => answer(displayed, Date.now())}
                >
                  <span className="quiz-letter" aria-hidden="true">
                    {["A", "B", "C", "D", "E"][displayed]}
                  </span>
                  {question.choices[original]}
                  {reveal && original === question.correctIndex && (
                    <span aria-hidden="true">✓</span>
                  )}
                  {reveal && !correct && item.answer === original && (
                    <span aria-hidden="true">✕</span>
                  )}
                </button>
              </li>
            ))}
          </ol>
          <div aria-live="polite" aria-atomic="true">
            {reveal && (
              <div
                className="quiz-feedback"
                data-feedback={correct ? "correct" : "incorrect"}
              >
                <strong>{correct ? t.correct : t.incorrect}</strong>
                <p lang="tr" dir="ltr">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
          {reveal && (
            <SourceNote question={question} bank={bank} locale={locale} />
          )}
        </section>
        <div className="quiz-session-toolbar">
          <button
            type="button"
            disabled={active.position === 0}
            onClick={() => move(active.position - 1)}
          >
            {t.previous}
          </button>
          {active.position < active.items.length - 1 && (
            <button
              type="button"
              className="quiz-primary"
              aria-keyshortcuts="N"
              disabled={!exam && !reveal}
              onClick={() => move(active.position + 1)}
            >
              {t.next}
            </button>
          )}
          {!exam &&
            answered === active.items.length &&
            active.position === active.items.length - 1 && (
              <button
                type="button"
                className="quiz-primary"
                aria-keyshortcuts="N"
                onClick={() => finish(Date.now())}
              >
                {t.finish}
              </button>
            )}
          {exam && (
            <button
              type="button"
              className="quiz-primary"
              onClick={() => {
                if (
                  answered === active.items.length ||
                  window.confirm(t.confirmSubmit)
                )
                  finish(Date.now());
              }}
            >
              {t.submit}
            </button>
          )}
        </div>
        <p className="quiz-key-hint">{bank.courseId === "database-management" ? (locale === "tr" ? "Seçenekler: 1–5, sonraki soru: N." : "الاختيارات: 1–5، السؤال التالي: N.") : t.keys}</p>
        {exam && (
          <details className="quiz-card quiz-map" open>
            <summary>{t.map}</summary>
            <div>
              {active.items.map(({ id, answer }, index) => (
                <button
                  type="button"
                  key={id}
                  aria-label={`${t.question} ${index + 1}${answer !== null ? `, ${t.answered}` : ""}`}
                  aria-current={index === active.position ? "step" : undefined}
                  data-answered={answer !== null}
                  onClick={() => move(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </details>
        )}
      </main>
    );
  }

  const totals = attemptTotals(Object.values(progress.stats));
  const examCount = progress.results.filter(
    ({ mode }) => mode === "exam",
  ).length;
  const weak = bank.topics
    .map((topic) => ({
      ...topic,
      ...attemptTotals(
        bank.questions
          .filter(({ topicId }) => topicId === topic.id)
          .map(({ id }) => progress.stats[id]),
      ),
    }))
    .filter(({ incorrect }) => incorrect > 0)
    .sort(
      (a, b) =>
        b.incorrect / (b.correct + b.incorrect) -
          a.incorrect / (a.correct + a.incorrect) || b.incorrect - a.incorrect,
    );
  const unavailable = limit < 1 || pool.length < limit;
  return (
    <main className="quiz-main">
      <div className="quiz-intro">
        <p>{t.home}</p>
        <h1 ref={heading} tabIndex={-1}>
          {bank.courseId === "operating-systems" ? t.title : bank.title[locale]}
        </h1>
        <p>{t.intro}</p>
        <span>
          {bank.questions.length} {t.available} · {t.language}
        </span>
      </div>
      <div className="quiz-dashboard">
        <section className="quiz-card quiz-setup">
          {active && (
            <div className="quiz-active">
              <h2>{t.active}</h2>
              <p>
                {t.mode[active.mode]} ·{" "}
                <bdi>
                  {active.items.filter(({ answer }) => answer !== null).length}/
                  {active.items.length}
                </bdi>
              </p>
              {active.deadline !== null && <p>{t.timedReminder}</p>}
              <div className="quiz-actions">
                <button
                  type="button"
                  className="quiz-primary"
                  onClick={() => setScreen("session")}
                >
                  {t.resume}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(t.confirmDiscard))
                      save({ ...current.current, active: null });
                  }}
                >
                  {t.discard}
                </button>
              </div>
            </div>
          )}
          <fieldset disabled={!ready || !!active} className="quiz-modes">
            <legend className="quiz-visually-hidden">{t.home}</legend>
            {modes.filter((value) => value !== "book" || bank.sources.some((source) => source.kind === "textbook-excerpt")).map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="quiz-mode"
                  value={value}
                  checked={value === mode}
                  onChange={() => setMode(value)}
                />
                <span>
                  {t.mode[value]}
                  {value === "wrong"
                    ? ` (${wrong.length})`
                    : value === "bookmarks"
                      ? ` (${bookmarks.length})`
                      : ""}
                </span>
              </label>
            ))}
          </fieldset>
          <h2>{t.mode[mode]}</h2>
          <p>
            {bank.courseId === "database-management" && mode === "random"
              ? locale === "tr"
                ? "Altı haftadan karışık test sorularıyla tekrar yap."
                : "راجع المحاضرات الست بأسئلة اختيار من متعدد."
              : t.modeDetail[mode]}
          </p>
          <div className="quiz-settings">
            {mode === "topic" && (
              <label>
                {t.week}
                <select
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                >
                  {bank.topics.map(({ id, title }, index) => (
                    <option key={id} value={id}>
                      {index + 1} · {title[locale]}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {mode === "exam" ? (
              <label>
                {t.duration}
                <select
                  value={minutes}
                  onChange={(event) => setMinutes(Number(event.target.value))}
                >
                  {timerMinutes.map((value) => (
                    <option key={value} value={value}>
                      {value ? `${value} ${t.minutes}` : t.unlimited}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <label>
                {t.size}
                <select
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                >
                  {batchSizes.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <div className="quiz-actions">
            <button
              type="button"
              className="quiz-primary"
              disabled={!ready || !!active || unavailable}
              onClick={start}
            >
              {t.start}
              {limit > 0 && ` · ${limit}`}
            </button>
            <span>
              {pool.length} {t.available}
            </span>
          </div>
          {unavailable && (
            <p>
              {mode === "wrong"
                ? t.noWrong
                : mode === "bookmarks"
                  ? t.noBookmarks
                  : t.noQuestions}
            </p>
          )}
        </section>
        <aside className="quiz-card quiz-dashboard-progress">
          <h2>{t.progress}</h2>
          <StatLine
            stats={[
              [totals.correct + totals.incorrect, t.attempts],
              [totals.correct, t.correct],
              [totals.incorrect, t.incorrect],
            ]}
          />
          <dl className="quiz-counts">
            <div>
              <dt>{t.practiceSessions}</dt>
              <dd>{progress.results.length - examCount}</dd>
            </div>
            <div>
              <dt>{t.exams}</dt>
              <dd>{examCount}</dd>
            </div>
          </dl>
          <h3>{t.weak}</h3>
          {weak.length ? (
            <ol>
              {weak.map(({ id, title, incorrect, correct }) => (
                <li key={id}>
                  {title[locale]}{" "}
                  <bdi>
                    {incorrect}/{correct + incorrect}
                  </bdi>
                </li>
              ))}
            </ol>
          ) : (
            <p>{t.noWeak}</p>
          )}
          <div className="quiz-actions">
            <button type="button" disabled={!ready} onClick={backup}>
              {t.backup}
            </button>
            <button
              type="button"
              disabled={!ready || !!active}
              onClick={() => upload.current?.click()}
            >
              {t.restore}
            </button>
            <input
              ref={upload}
              type="file"
              accept=".json,application/json"
              hidden
              onChange={restore}
            />
          </div>
          <p role="status" hidden={!notice && !storageFailed}>
            {storageFailed ? t.storageError : notice}
          </p>
        </aside>
      </div>
      {!!progress.results.length && (
        <section className="quiz-card quiz-history">
          <h2>{t.history}</h2>
          <ol>
            {[...progress.results].reverse().map((past, index) => {
              const graded = score(past.items);
              return (
                <li key={`${past.finishedAt}-${index}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setResult(past);
                      setScreen("result");
                    }}
                  >
                    <span>
                      {t.mode[past.mode]} ·{" "}
                      {new Date(past.finishedAt).toLocaleString(locale, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                    <bdi>
                      {graded.correct}/{graded.total} · {graded.percentage}%
                    </bdi>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </main>
  );
}
