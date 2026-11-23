import { z } from "zod";
import { answerIndex, stableId, type QuizBank } from "./bank";
import { examSize } from "./session";

const note = z.string().trim().min(1);
const positions = z.array(z.number().int().positive());
const evidenceKind = z.enum([
  "direct-slides",
  "direct-book",
  "slide-application",
  "studymaxin-teaching",
  "supplementary",
  "unresolved",
]);

const auditSchema = z.strictObject({
  version: z.literal(1),
  questions: z.array(
    z.strictObject({
      id: stableId,
      status: z.enum(["verified", "requires-review"]),
      subtopic: stableId,
      reviewedAnswerIndex: answerIndex.optional(),
      evidence: z.strictObject({
        kind: evidenceKind,
        sourceId: stableId,
        slides: positions.min(1),
        visualSlides: positions,
        references: z
          .array(z.url().refine((url) => url.startsWith("https://")))
          .min(1)
          .optional(),
        note,
      }),
      correction: z
        .strictObject({
          fields: z
            .array(
              z.enum([
                "difficulty",
                "question",
                "choices",
                "correctIndex",
                "explanation",
                "source",
                "clarificationAr",
              ]),
            )
            .min(1),
          note,
        })
        .optional(),
    }),
  ),
});

export type PublishedQuizBank = QuizBank & {
  referencesByQuestion: Record<string, string[]>;
};

export function publishAuditedBank(
  bank: QuizBank,
  input: unknown,
): PublishedQuizBank {
  const audit = auditSchema.parse(input);
  const records = new Map(audit.questions.map((record) => [record.id, record]));
  if (records.size !== audit.questions.length)
    throw new Error("Duplicate quiz audit ID");

  const sourceKinds = new Map(bank.sources.map(({ id, kind }) => [id, kind]));
  const questions: QuizBank["questions"] = [];
  const referencesByQuestion: PublishedQuizBank["referencesByQuestion"] = {};
  for (const question of bank.questions) {
    const record = records.get(question.id);
    if (!record) throw new Error(`Missing quiz audit record: ${question.id}`);
    records.delete(question.id);
    const { evidence, reviewedAnswerIndex, status } = record;
    if (
      evidence.sourceId !== question.source.id ||
      evidence.slides.length !== question.source.slides.length ||
      evidence.slides.some(
        (slide, index) => slide !== question.source.slides[index],
      ) ||
      new Set(evidence.visualSlides).size !== evidence.visualSlides.length ||
      evidence.visualSlides.some((slide) => !evidence.slides.includes(slide))
    ) {
      throw new Error(`Mismatched quiz audit citation: ${question.id}`);
    }
    if (status === "requires-review") {
      if (evidence.kind !== "unresolved" || reviewedAnswerIndex !== undefined)
        throw new Error(`Inconsistent unresolved quiz audit: ${question.id}`);
      continue;
    }
    if (
      evidence.kind === "unresolved" ||
      reviewedAnswerIndex !== question.correctIndex
    ) {
      throw new Error(`Inconsistent verified quiz audit: ${question.id}`);
    }
    if (
      evidence.kind === "supplementary" ||
      evidence.kind === "studymaxin-teaching"
    ) {
      if (!evidence.references)
        throw new Error(
          `Missing supporting quiz audit reference: ${question.id}`,
        );
      referencesByQuestion[question.id] = evidence.references;
    } else if (
      (evidence.kind === "direct-book" &&
        sourceKinds.get(evidence.sourceId) !== "textbook-excerpt") ||
      (evidence.kind !== "direct-book" &&
        sourceKinds.get(evidence.sourceId) !== "original-slides")
    ) {
      throw new Error(`Source evidence type mismatch: ${question.id}`);
    }
    questions.push(question);
  }
  if (records.size)
    throw new Error(
      `Unknown quiz audit IDs: ${[...records.keys()].join(", ")}`,
    );
  if (questions.length < examSize)
    throw new Error(
      `A mock exam requires ${examSize} verified questions (found ${questions.length})`,
    );

  return { ...bank, questions, referencesByQuestion };
}
