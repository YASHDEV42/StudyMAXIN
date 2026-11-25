import { z } from "zod";
import {
  answerIndex,
  operatingSystemsId,
  stableId,
  type Question,
} from "./bank";
import {
  examSize,
  examSizeFor,
  modeSchema,
  sessionSchema,
  type Mode,
  type Session,
} from "./session";

export const storageKey = "studymaxin.quiz.operating-systems.v1";
export const storageKeyFor = (courseId: string) =>
  courseId === operatingSystemsId
    ? storageKey
    : `studymaxin.quiz.${courseId}.v1`;
export const maxImportBytes = 5_000_000;
const count = z.number().int().nonnegative();
const statsSchema = z
  .strictObject({
    correct: count,
    incorrect: count,
    streak: count,
    queued: z.boolean(),
  })
  .refine(
    (stats) =>
      stats.correct + stats.incorrect > 0 &&
      stats.streak <= stats.correct &&
      (!stats.queued || stats.incorrect > 0),
  );
const resultItemSchema = z.strictObject({
  id: stableId,
  topicId: stableId,
  answer: answerIndex.nullable(),
  correctIndex: answerIndex,
});
const resultSchema = z
  .strictObject({
    mode: modeSchema,
    finishedAt: z.number().int().positive().max(8.64e15),
    items: z.array(resultItemSchema).min(1).max(examSize),
  })
  .refine(
    ({ mode, items }) =>
      new Set(items.map(({ id }) => id)).size === items.length &&
      (mode === "exam"
        ? [50, examSize].includes(items.length)
        : items.every(({ answer }) => answer !== null)),
  );
const progressSchema = z.strictObject({
  version: z.literal(1),
  courseId: stableId,
  stats: z.record(stableId, statsSchema),
  bookmarks: z
    .array(stableId)
    .refine((ids) => new Set(ids).size === ids.length),
  results: z.array(resultSchema),
}).refine(({ courseId, results }) =>
  results.every(({ mode, items }) => mode !== "exam" || items.length === examSizeFor(courseId)),
);
const localSchema = z.strictObject({
  progress: progressSchema,
  active: sessionSchema.nullable(),
});

export type Progress = z.infer<typeof progressSchema>;
export type QuizResult = z.infer<typeof resultSchema>;
export type LocalQuiz = z.infer<typeof localSchema>;
type Stats = z.infer<typeof statsSchema>;

export const emptyProgress = (courseId = operatingSystemsId): Progress => ({
  version: 1,
  courseId,
  stats: {},
  bookmarks: [],
  results: [],
});

export function importProgress(
  raw: string,
  courseId = operatingSystemsId,
): Progress {
  if (new TextEncoder().encode(raw).length > maxImportBytes)
    throw new Error("Progress file too large");
  const progress = progressSchema.parse(JSON.parse(raw));
  if (progress.courseId !== courseId) throw new Error("Wrong quiz course");
  return progress;
}

export function exportProgress(progress: Progress): string {
  return JSON.stringify(progress);
}

export function readLocal(
  raw: string | null,
  questions: ReadonlyMap<string, Question>,
  courseId = operatingSystemsId,
) {
  const fallback: LocalQuiz = {
    progress: emptyProgress(courseId),
    active: null,
  };
  if (raw === null) return { data: fallback, recovered: false };
  try {
    const saved = JSON.parse(raw);
    const parsed = localSchema.safeParse(saved);
    if (!parsed.success) {
      const progress = progressSchema.safeParse(saved?.progress);
      return {
        data: {
          ...fallback,
          progress:
            progress.success && progress.data.courseId === courseId
              ? progress.data
              : fallback.progress,
        },
        recovered: true,
      };
    }
    const { active, progress } = parsed.data;
    if (progress.courseId !== courseId)
      return { data: fallback, recovered: true };
    if (active && (active.items.some(({ id }) => !questions.has(id)) || (active.mode === "exam" && active.items.length !== examSizeFor(courseId)))) {
      return { data: { progress, active: null }, recovered: true };
    }
    return { data: parsed.data, recovered: false };
  } catch {
    return { data: fallback, recovered: true };
  }
}

export function recordAnswer(
  progress: Progress,
  id: string,
  correct: boolean,
  mode: Mode,
): Progress {
  const previous = progress.stats[id] ?? {
    correct: 0,
    incorrect: 0,
    streak: 0,
    queued: false,
  };
  return {
    ...progress,
    stats: {
      ...progress.stats,
      [id]: {
        correct: previous.correct + Number(correct),
        incorrect: previous.incorrect + Number(!correct),
        streak: correct ? previous.streak + 1 : 0,
        queued: !correct || (previous.queued && mode !== "wrong"),
      },
    },
  };
}

function priority(stats?: Stats) {
  return stats ? 3 * stats.incorrect - stats.correct - 2 * stats.streak : 0;
}

export function reviewPool(
  questions: readonly Question[],
  progress: Progress,
  mode: "wrong" | "bookmarks",
) {
  const bookmarks = new Set(progress.bookmarks);
  return questions
    .filter(({ id }) =>
      mode === "wrong" ? progress.stats[id]?.queued : bookmarks.has(id),
    )
    .sort(
      (a, b) =>
        priority(progress.stats[b.id]) - priority(progress.stats[a.id]) ||
        a.id.localeCompare(b.id, "en"),
    );
}

export function attemptTotals(stats: (Stats | undefined)[]) {
  return stats.reduce<{ correct: number; incorrect: number }>(
    (total, entry) => ({
      correct: total.correct + (entry?.correct ?? 0),
      incorrect: total.incorrect + (entry?.incorrect ?? 0),
    }),
    { correct: 0, incorrect: 0 },
  );
}

export function score(items: QuizResult["items"]) {
  const correct = items.filter(
    ({ answer, correctIndex }) => answer === correctIndex,
  ).length;
  const blank = items.filter(({ answer }) => answer === null).length;
  return {
    correct,
    blank,
    incorrect: items.length - correct - blank,
    total: items.length,
    percentage: items.length ? Math.round((100 * correct) / items.length) : 0,
  };
}

export function finishSession(
  progress: Progress,
  session: Session,
  questions: ReadonlyMap<string, Question>,
  now: number,
): { progress: Progress; result: QuizResult } | null {
  if (
    session.mode !== "exam" &&
    session.items.some(({ answer }) => answer === null)
  )
    return null;
  const items = session.items.flatMap(({ id, answer }) => {
    const question = questions.get(id);
    return question
      ? [
          {
            id,
            topicId: question.topicId,
            answer,
            correctIndex: question.correctIndex,
          },
        ]
      : [];
  });
  if (items.length !== session.items.length) return null;
  const result: QuizResult = { mode: session.mode, finishedAt: now, items };
  let next = progress;
  if (session.mode === "exam") {
    for (const { id, answer, correctIndex } of items) {
      if (answer !== null)
        next = recordAnswer(next, id, answer === correctIndex, session.mode);
    }
  }
  return { progress: { ...next, results: [...next.results, result] }, result };
}
