import { z } from "zod";

export const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string().trim().min(1);
const localized = z.strictObject({ tr: text, ar: text });
const order = z.number().int().nonnegative();
const ids = z.array(idSchema);

export const courseSchema = z.strictObject({
  id: idSchema,
  title: localized,
  description: localized,
  order,
  chapters: z
    .array(z.strictObject({ id: idSchema, title: localized, order }))
    .min(1),
});

const pageRangeSchema = z
  .strictObject({
    from: z.number().int().positive(),
    to: z.number().int().positive(),
  })
  .refine((range) => range.to >= range.from, "Page range must be ascending");

const citationSchema = z.strictObject({
  sourceId: idSchema,
  pages: z.array(pageRangeSchema).min(1),
});

const documentFields = {
  title: text,
  summary: text,
  status: z.enum(["draft", "published"]),
  provenance: z.enum(["source-based", "illustrative"]),
  sources: z.array(citationSchema),
};

export const documentSchema = z.discriminatedUnion("kind", [
  z.strictObject({
    ...documentFields,
    kind: z.literal("lesson"),
    locale: z.enum(["ar", "tr"]),
  }),
  z.strictObject({
    ...documentFields,
    kind: z.literal("cheat-sheet"),
    locale: z.literal("tr"),
  }),
]);

export const topicSchema = z.strictObject({
  id: idSchema,
  courseId: idSchema,
  chapterId: idSchema,
  title: localized,
  order,
  prerequisites: ids,
  related: ids,
  documents: z.array(documentSchema).max(3),
});

export const sourceSchema = z.strictObject({
  id: idSchema,
  title: text,
  language: z.enum(["ar", "tr", "en"]),
  courseIds: ids.min(1),
  location: z.discriminatedUnion("kind", [
    z.strictObject({
      kind: z.literal("local"),
      path: z.string().regex(/^\/sources\/[a-zA-Z0-9][a-zA-Z0-9_/-]*\.pdf$/),
      pageCount: z.number().int().positive(),
      sha256: z.string().regex(/^[a-f0-9]{64}$/),
    }),
    z.strictObject({
      kind: z.literal("remote"),
      url: z.url({ protocol: /^https$/ }),
      pageCount: z.number().int().positive(),
    }),
    z.strictObject({ kind: z.literal("unavailable"), reason: text }),
  ]),
});

export const glossaryEntrySchema = z.strictObject({
  id: idSchema,
  term: z.strictObject({ tr: text, en: text }),
  examples: z.strictObject({ tr: text, en: text }),
  courseIds: ids.min(1),
  topicIds: ids,
});

export const catalogSchema = z.strictObject({
  schemaVersion: z.literal(1),
  courses: z.array(courseSchema),
  topics: z.array(topicSchema),
  sources: z.array(sourceSchema),
  glossary: z.array(glossaryEntrySchema),
});

export type Course = z.infer<typeof courseSchema>;
export type Topic = z.infer<typeof topicSchema>;
export type Document = z.infer<typeof documentSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type GlossaryEntry = z.infer<typeof glossaryEntrySchema>;
export type Catalog = z.infer<typeof catalogSchema>;
export type ContentDocument = Document & { body: string };
export type ContentTopic = Omit<Topic, "documents"> & {
  documents: ContentDocument[];
};
export type Content = Omit<Catalog, "topics"> & { topics: ContentTopic[] };

export function documentFilename(document: Pick<Document, "kind" | "locale">) {
  return `${document.kind}.${document.locale}.md`;
}
