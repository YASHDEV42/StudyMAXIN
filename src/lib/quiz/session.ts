import { z } from "zod";
import { answerIndex, stableId, type Question } from "./bank";

export const modes = [
  "topic",
  "random",
  "book",
  "exam",
  "wrong",
  "bookmarks",
] as const;
export const examSize = 60;
export const batchSizes = [10, 20, 30] as const;
export const timerMinutes = [0, 45, 60, 75, 90, 120] as const;
export const modeSchema = z.enum(modes);
export type Mode = z.infer<typeof modeSchema>;

const itemSchema = z.strictObject({
  id: stableId,
  order: z
    .array(answerIndex)
    .min(4)
    .max(5)
    .refine(
      (order) =>
        new Set(order).size === order.length &&
        order.every((value) => value < order.length),
      "Answer order must be a permutation of 0..n-1",
    ),
  answer: answerIndex.nullable(),
});
export const sessionSchema = z
  .strictObject({
    mode: modeSchema,
    items: z.array(itemSchema).min(1).max(examSize),
    position: z.number().int().nonnegative(),
    deadline: z.number().int().positive().nullable(),
  })
  .refine(
    ({ mode, position, items, deadline }) =>
      position < items.length &&
      new Set(items.map(({ id }) => id)).size === items.length &&
      (mode === "exam" ? items.length === examSize : deadline === null),
  );
export type Session = z.infer<typeof sessionSchema>;

export function shuffle<T>(items: readonly T[], rng = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createSession(
  pool: readonly Question[],
  mode: Mode,
  size: number,
  deadline: number | null,
  rng = Math.random,
): Session | null {
  const unique = [
    ...new Map(pool.map((question) => [question.id, question])).values(),
  ];
  const count = mode === "exam" ? examSize : size;
  if (
    !Number.isInteger(count) ||
    count < 1 ||
    count > examSize ||
    count > unique.length
  )
    return null;
  const ordered =
    mode === "wrong" || mode === "bookmarks" ? unique : shuffle(unique, rng);
  return {
    mode,
    items: ordered.slice(0, count).map(({ id, choices }) => ({
      id,
      order: shuffle(
        choices.map((_, index) => index),
        rng,
      ),
      answer: null,
    })),
    position: 0,
    deadline: mode === "exam" ? deadline : null,
  };
}

export function selectAnswer(
  session: Session,
  displayIndex: number,
  now: number,
): Session {
  const item = session.items[session.position];
  const answer = item.order[displayIndex];
  if (
    answer === undefined ||
    (session.deadline !== null && now >= session.deadline) ||
    (session.mode !== "exam" && item.answer !== null)
  )
    return session;
  return {
    ...session,
    items: session.items.map((entry, index) =>
      index === session.position ? { ...entry, answer } : entry,
    ),
  };
}

export function moveSession(session: Session, position: number): Session {
  if (
    !Number.isInteger(position) ||
    position < 0 ||
    position >= session.items.length
  )
    return session;
  if (
    session.mode !== "exam" &&
    position > session.position &&
    session.items.slice(0, position).some(({ answer }) => answer === null)
  )
    return session;
  return { ...session, position };
}
