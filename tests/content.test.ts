import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { catalogSchema } from "../src/lib/content/schema";
import { loadContent } from "../src/lib/content/load";
import { validateContent } from "../src/lib/content/validate";
import { fixtureContent, writeFixture } from "./fixtures";

test("empty catalogs are valid without placeholder educational content", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "slg-empty-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const { contentRoot, publicRoot } = await writeFixture(root, {
    schemaVersion: 1,
    courses: [],
    topics: [],
    glossary: [],
    sources: [],
  });
  const content = await loadContent(contentRoot, publicRoot);
  assert.deepEqual(
    [content.courses, content.topics, content.glossary, content.sources],
    [[], [], [], []],
  );
});

test("three distinct forms and global glossary form a valid catalog", () => {
  const content = fixtureContent();
  const metadata = {
    ...content,
    topics: content.topics.map((topic) => ({
      ...topic,
      documents: topic.documents.map(
        ({ body: _body, ...document }) => document,
      ),
    })),
  };
  assert.equal(catalogSchema.safeParse(metadata).success, true);
  assert.deepEqual(validateContent(content), []);
  const invalid = structuredClone(metadata);
  Object.assign(invalid.topics[0].documents[2], { locale: "ar" });
  assert.equal(catalogSchema.safeParse(invalid).success, false);
  assert.equal(
    catalogSchema.safeParse({ ...metadata, surprise: true }).success,
    false,
  );
});

test("detects duplicate identities and ambiguous document/order keys", () => {
  const content = fixtureContent();
  content.topics.push(structuredClone(content.topics[0]));
  content.topics[0].documents.push(
    structuredClone(content.topics[0].documents[0]),
  );
  assert.match(validateContent(content).join("\n"), /topics: duplicate/);
  assert.match(validateContent(content).join("\n"), /topic order: duplicate/);
  assert.match(validateContent(content).join("\n"), /documents: duplicate/);
});

test("supports multiple courses, shared chapter IDs, and cross-course relationships", () => {
  const content = fixtureContent();
  const course = structuredClone(content.courses[0]);
  course.id = "second-course";
  course.order = 1;
  content.courses.push(course);
  const topic = structuredClone(content.topics[0]);
  topic.id = "second-topic";
  topic.courseId = course.id;
  topic.prerequisites = ["fixture-topic"];
  content.topics.push(topic);
  content.glossary[0].courseIds.push(course.id);
  content.glossary[0].topicIds.push(topic.id);
  assert.deepEqual(validateContent(content), []);
});

test("checks hierarchy, dangling relations, self references, and prerequisite cycles", () => {
  const content = fixtureContent();
  const second = structuredClone(content.topics[0]);
  second.id = "second-topic";
  second.order = 1;
  second.prerequisites = ["fixture-topic"];
  content.topics.push(second);
  content.topics[0].prerequisites = ["second-topic"];
  content.topics[0].related = ["missing", "fixture-topic"];
  content.topics[0].chapterId = "missing";
  const errors = validateContent(content).join("\n");
  assert.match(errors, /unknown chapter/);
  assert.match(errors, /unknown related topic/);
  assert.match(errors, /self related reference/);
  assert.match(errors, /prerequisite cycle/);
});

test("validates glossary associations and bilingual examples", () => {
  const content = fixtureContent();
  content.glossary[0].courseIds = ["missing-course"];
  content.glossary[0].topicIds.push("missing-topic");
  const errors = validateContent(content).join("\n");
  assert.match(errors, /unknown course/);
  assert.match(errors, /unknown topic/);
  assert.match(errors, /unassociated course/);
});

test("checks citations, unavailable originals, and physical PDF page bounds", () => {
  const content = fixtureContent();
  const document = content.topics[0].documents[0];
  document.provenance = "source-based";
  assert.match(validateContent(content).join("\n"), /requires citations/);
  content.sources = [
    {
      id: "fixture-pdf",
      title: "Test PDF",
      language: "tr",
      courseIds: ["fixture-course"],
      location: {
        kind: "remote",
        url: "https://example.invalid/fixture.pdf",
        pageCount: 2,
      },
    },
  ];
  document.sources = [{ sourceId: "fixture-pdf", pages: [{ from: 1, to: 3 }] }];
  assert.match(
    validateContent(content).join("\n"),
    /exceeds fixture-pdf page count/,
  );
  document.sources[0].pages[0].to = 2;
  assert.deepEqual(validateContent(content), []);
  content.sources[0].location = {
    kind: "unavailable",
    reason: "Technical fixture, no original PDF supplied.",
  };
  assert.match(
    validateContent(content).join("\n"),
    /unavailable; keep this document draft/,
  );
  document.status = "draft";
  assert.deepEqual(validateContent(content), []);
});

test("rejects unsafe Markdown and broken concept references", () => {
  const content = fixtureContent();
  content.topics[0].documents[0].body =
    "<script>alert(1)</script>\n\n[Bad](javascript:alert) [Missing](topic:missing) [Relative](../missing)\n\n![](https://example.invalid/image.png)";
  const errors = validateContent(content).join("\n");
  assert.match(errors, /raw HTML/);
  assert.match(errors, /javascript:alert/);
  assert.match(errors, /topic:missing/);
  assert.match(errors, /\.\.\/missing/);
  assert.match(errors, /nonempty alt text/);
  content.topics[0].documents[0].body = "  ";
  assert.match(validateContent(content).join("\n"), /published body is empty/);
});

test("loader reads Markdown, rejects orphan files, and fails on missing bodies", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "slg-content-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const { contentRoot, publicRoot } = await writeFixture(root);
  const content = await loadContent(contentRoot, publicRoot);
  assert.equal(content.topics[0].documents.length, 3);
  const orphan = path.join(contentRoot, "topics/fixture-topic/lesson.en.md");
  await writeFile(orphan, "Unregistered fixture");
  await assert.rejects(loadContent(contentRoot, publicRoot), /unregistered/);
  await rm(orphan);
  await rm(path.join(contentRoot, "topics/fixture-topic/lesson.ar.md"));
  await assert.rejects(loadContent(contentRoot, publicRoot), /ENOENT/);
});

test("local PDF integrity verifies bytes, missing originals, and symlinks", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "slg-pdf-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const content = fixtureContent();
  // Header-only synthetic bytes for filesystem checks; this is not a real educational PDF.
  const bytes = Buffer.from("%PDF-1.7\nsynthetic test bytes\n");
  content.sources = [
    {
      id: "fixture-pdf",
      title: "Synthetic test bytes",
      language: "tr",
      courseIds: ["fixture-course"],
      location: {
        kind: "local",
        path: "/sources/fixture.pdf",
        pageCount: 1,
        sha256: createHash("sha256").update(bytes).digest("hex"),
      },
    },
  ];
  const { contentRoot, publicRoot } = await writeFixture(root, content);
  await mkdir(path.join(publicRoot, "sources"));
  const pdf = path.join(publicRoot, "sources/fixture.pdf");
  await assert.rejects(
    loadContent(contentRoot, publicRoot),
    /local PDF missing/,
  );
  await writeFile(pdf, bytes);
  await loadContent(contentRoot, publicRoot);
  await writeFile(pdf, "changed");
  await assert.rejects(
    loadContent(contentRoot, publicRoot),
    /SHA-256 mismatch/,
  );
  await rm(pdf);
  const otherFile = path.join(root, "outside.pdf");
  await writeFile(otherFile, bytes);
  await symlink(otherFile, pdf);
  await assert.rejects(loadContent(contentRoot, publicRoot), /symlinked/);
});
