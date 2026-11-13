import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Content } from "../src/lib/content/schema";
import { documentFilename } from "../src/lib/content/schema";

/** Technical test data only. Never loaded by the production application. */
export function fixtureContent(): Content {
  return {
    schemaVersion: 1,
    courses: [
      {
        id: "fixture-course",
        title: { tr: "Test alanı", ar: "مساحة اختبار" },
        description: { tr: "Yalnızca teknik test.", ar: "اختبار تقني فقط." },
        order: 0,
        chapters: [
          {
            id: "fixture-chapter",
            title: { tr: "Test bölümü", ar: "فصل اختبار" },
            order: 0,
          },
        ],
      },
    ],
    topics: [
      {
        id: "fixture-topic",
        courseId: "fixture-course",
        chapterId: "fixture-chapter",
        title: { tr: "Test konusu", ar: "موضوع اختبار" },
        order: 0,
        prerequisites: [],
        related: [],
        documents: [
          {
            kind: "lesson",
            locale: "tr",
            title: "Türkçe test",
            summary: "Yalnızca teknik test.",
            status: "published",
            provenance: "illustrative",
            sources: [],
            body: "## Test\n\nTürkçe gövde. [Bağlantı](glossary:fixture-term).\n",
          },
          {
            kind: "lesson",
            locale: "ar",
            title: "اختبار عربي",
            summary: "اختبار تقني فقط.",
            status: "published",
            provenance: "illustrative",
            sources: [],
            body: "## اختبار\n\nنص اختبار عربي.\n\n```text\nfixture-code\n```\n",
          },
          {
            kind: "cheat-sheet",
            locale: "tr",
            title: "Özet testi",
            summary: "Eğitim içeriği değildir.",
            status: "published",
            provenance: "illustrative",
            sources: [],
            body: "## Özet\n\nTürkçe özet gövdesi. [Konu](topic:fixture-topic).\n",
          },
        ],
      },
    ],
    sources: [],
    glossary: [
      {
        id: "fixture-term",
        term: { tr: "Test terimi", en: "Test term" },
        examples: { tr: "Teknik test örneği.", en: "Technical test example." },
        courseIds: ["fixture-course"],
        topicIds: ["fixture-topic"],
      },
    ],
  };
}

export async function writeFixture(root: string, content = fixtureContent()) {
  const contentRoot = path.join(root, "content");
  const publicRoot = path.join(root, "public");
  await mkdir(publicRoot, { recursive: true });
  await mkdir(path.join(contentRoot, "courses"), { recursive: true });
  await mkdir(path.join(contentRoot, "topics"), { recursive: true });
  await writeFile(
    path.join(contentRoot, "sources.json"),
    JSON.stringify(content.sources),
  );
  await writeFile(
    path.join(contentRoot, "glossary.json"),
    JSON.stringify(content.glossary),
  );
  for (const course of content.courses) {
    const directory = path.join(contentRoot, "courses", course.id);
    await mkdir(directory, { recursive: true });
    await writeFile(
      path.join(directory, "course.json"),
      JSON.stringify(course),
    );
  }
  for (const topic of content.topics) {
    const directory = path.join(contentRoot, "topics", topic.id);
    await mkdir(directory, { recursive: true });
    const { documents, ...metadata } = topic;
    await writeFile(
      path.join(directory, "topic.json"),
      JSON.stringify({
        ...metadata,
        documents: documents.map(({ body: _body, ...document }) => document),
      }),
    );
    for (const document of documents)
      await writeFile(
        path.join(directory, documentFilename(document)),
        document.body,
      );
  }
  return { contentRoot, publicRoot };
}
