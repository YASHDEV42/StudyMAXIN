import { z } from "zod";

export const operatingSystemsId = "operating-systems";
export const stableId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const line = z.string().trim().min(1);
export const answerIndex = z.number().int().min(0).max(4);
export const normalizeText = (value: string) =>
  value.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("tr");

export const questionSchema = z.strictObject({
  id: stableId,
  courseId: stableId,
  topicId: stableId,
  difficulty: z.enum(["basic", "intermediate", "advanced"]),
  question: line,
  choices: z
    .union([z.tuple([line, line, line, line]), z.tuple([line, line, line, line, line])])
    .refine(
      (choices) => new Set(choices.map(normalizeText)).size === choices.length,
      "Answer choices must be distinct",
    ),
  correctIndex: answerIndex,
  explanation: line,
  source: z.strictObject({
    id: stableId,
    slides: z.array(z.number().int().positive()).min(1),
  }),
  clarificationAr: line.optional(),
}).refine((question) => question.correctIndex < question.choices.length, {
  path: ["correctIndex"],
  message: "Correct answer index exceeds the available choices",
});

const localized = z.strictObject({ tr: line, ar: line });
export const manifestSchema = z.strictObject({
  courseId: stableId,
  title: localized,
  topics: z.array(z.strictObject({ id: stableId, title: localized })).min(1),
  sources: z
    .array(
      z.strictObject({
        id: stableId,
        topicId: stableId,
        kind: z.enum(["original-slides", "secondary-notes", "textbook-excerpt"]),
        title: line,
        slideCount: z.number().int().positive(),
        sha256: z.string().regex(/^[a-f0-9]{64}$/),
      }),
    )
    .min(1),
});

export type Question = z.infer<typeof questionSchema>;
export type Manifest = z.infer<typeof manifestSchema>;
export type QuizBank = Manifest & { questions: Question[] };

export function validateBank(
  courseId: string,
  manifestInput: unknown,
  files: Map<string, unknown>,
): QuizBank {
  const manifest = manifestSchema.parse(manifestInput);
  if (manifest.courseId !== courseId)
    throw new Error("Quiz manifest course does not match its directory");
  const topics = new Set(manifest.topics.map(({ id }) => id));
  if (topics.size !== manifest.topics.length)
    throw new Error("Duplicate quiz topic ID");
  const sources = new Map(
    manifest.sources.map((source) => [source.id, source]),
  );
  if (sources.size !== manifest.sources.length)
    throw new Error("Duplicate quiz source ID");
  for (const source of sources.values()) {
    if (!topics.has(source.topicId))
      throw new Error(`Unknown source topic: ${source.id}`);
  }
  const ids = new Set<string>();
  const stems = new Set<string>();
  const questions: Question[] = [];
  for (const [topicId, input] of files) {
    if (!topics.has(topicId))
      throw new Error(`Unknown quiz topic file: ${topicId}`);
    const parsed = z.array(questionSchema).min(1).safeParse(input);
    if (!parsed.success)
      throw new Error(`${topicId}.json: ${parsed.error.message}`);
    for (const question of parsed.data) {
      const stem = normalizeText(question.question);
      if (ids.has(question.id))
        throw new Error(`Duplicate quiz question ID: ${question.id}`);
      if (stems.has(stem))
        throw new Error(`Duplicate quiz question text: ${question.id}`);
      if (question.courseId !== courseId || question.topicId !== topicId) {
        throw new Error(
          `Question course or topic does not match its file: ${question.id}`,
        );
      }
      const source = sources.get(question.source.id);
      const { slides } = question.source;
      if (
        !source ||
        source.topicId !== topicId ||
        new Set(slides).size !== slides.length ||
        slides.some((slide) => slide > source.slideCount)
      ) {
        throw new Error(`Invalid question source: ${question.id}`);
      }
      ids.add(question.id);
      stems.add(stem);
      questions.push(question);
    }
  }
  for (const topic of topics) {
    if (!files.has(topic)) throw new Error(`Missing quiz topic file: ${topic}`);
  }
  return { ...manifest, questions };
}
