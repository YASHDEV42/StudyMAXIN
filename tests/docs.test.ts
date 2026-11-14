import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fixtureContent, writeFixture } from "./fixtures";
import { publicContent, topicOptions } from "../src/lib/docs/public";
import { buildSearchIndex } from "../src/lib/docs/search-index";
import {
  fromPublicSearchDocument,
  matchRanges,
  toPublicSearchDocument,
} from "../src/lib/docs/search";
import {
  normalizeSearch,
  searchDocuments,
  searchExcerpt,
} from "../src/lib/docs/search";
import { filterGlossary, glossaryTsv } from "../src/lib/docs/glossary";
import {
  documentMarkdown,
  sourceUrl,
  topicBundle,
} from "../src/lib/docs/export";
import { conceptTargets, markdownHeadings } from "../src/lib/docs/markdown";
import { loadContent } from "../src/lib/content/load";
import { sourceSchema } from "../src/lib/content/schema";

function contentWithDrafts() {
  const content = fixtureContent();
  content.topics[0].documents[1].status = "draft";
  content.topics[0].documents[1].body = "CONFIDENTIAL-DRAFT-BODY";
  content.topics[0].documents[1].title = "CONFIDENTIAL-DRAFT-TITLE";
  const draft = structuredClone(content.topics[0]);
  draft.id = "draft-only";
  draft.title.tr = "PRIVATE-TOPIC";
  draft.documents.forEach((doc) => {
    doc.status = "draft";
  });
  content.topics.push(draft);
  return content;
}

test("all public projections, search and exports exclude draft documents and draft-only topics", () => {
  const content = contentWithDrafts();
  const serialized = JSON.stringify([
    publicContent(content),
    topicOptions(content),
    buildSearchIndex(content, "ar"),
    topicBundle(content.topics[0], content, "ar"),
  ]);
  assert.doesNotMatch(
    serialized,
    /CONFIDENTIAL-DRAFT|PRIVATE-TOPIC|draft-only/,
  );
  assert.equal(
    documentMarkdown(content.topics[0].documents[1], content, "ar"),
    "",
  );
  assert.equal(topicBundle(content.topics[1], content, "tr"), "");
});

test("multilingual full-text search handles Turkish casing/accents, Arabic marks and English glossary terms", () => {
  const content = fixtureContent();
  content.topics[0].documents[0].body +=
    "\nGİZLİLİK ve bütünlük. UniqueBodyTerm.";
  content.topics[0].documents[1].body += "\nإِتَاحَة الـمعلومات";
  const index = buildSearchIndex(content, "ar");
  assert.equal(normalizeSearch("I İ ı i BÜTÜNLÜK"), "i i i i butunluk");
  assert.equal(searchDocuments(index, "gizlilik butunluk").length, 1);
  assert.equal(searchDocuments(index, "اتاحة المعلومات").length, 1);
  assert.equal(searchDocuments(index, "test term").length, 3);
  assert.equal(searchDocuments(index, "uniquebodyterm").length, 1);
  assert.equal(searchDocuments(index, "unknown").length, 0);
  assert.equal(searchDocuments(index, "!!!").length, 0);
  assert.equal(searchDocuments(index, "test", "other-course").length, 0);
  assert.match(
    searchExcerpt(
      searchDocuments(index, "UniqueBodyTerm")[0],
      "UniqueBodyTerm",
    ),
    /UniqueBodyTerm/,
  );
});

test("search results open the matching lesson language, while cheat sheets preserve the UI locale", () => {
  const index = buildSearchIndex(fixtureContent(), "ar");
  assert.match(
    index.find((doc) => doc.kind === "lesson" && doc.locale === "tr")!.href,
    /^\/tr\//,
  );
  assert.match(
    index.find((doc) => doc.kind === "cheat-sheet")!.href,
    /^\/ar\//,
  );
  const ranked = searchDocuments(index, "Türkçe");
  assert.equal(ranked[0].kind, "lesson");
});

test("glossary intersects course, derived chapter and topic filters, with Turkish alphabetical order", () => {
  const content = fixtureContent();
  const second = structuredClone(content.courses[0]);
  second.id = "other-course";
  const topic = structuredClone(content.topics[0]);
  topic.id = "other-topic";
  topic.courseId = second.id;
  content.courses.push(second);
  content.topics.push(topic);
  const entry = structuredClone(content.glossary[0]);
  entry.id = "other-term";
  entry.courseIds = [second.id];
  entry.topicIds = [topic.id];
  entry.term.tr = "Başka";
  content.glossary.push(entry);
  const filter = {
    query: "technical",
    courseId: "fixture-course",
    chapterId: "fixture-chapter",
    topicId: "fixture-topic",
  };
  assert.deepEqual(
    filterGlossary(content.glossary, topicOptions(content), filter).map(
      (entry) => entry.id,
    ),
    ["fixture-term"],
  );
  assert.equal(
    filterGlossary(content.glossary, topicOptions(content), {
      ...filter,
      topicId: "other-topic",
    }).length,
    0,
  );
});

test("TSV preserves both examples, flattens whitespace and neutralizes formula cells", () => {
  const entry = fixtureContent().glossary[0];
  entry.examples.tr = "=SUM(1,2)\nnew\tcell";
  const tsv = glossaryTsv([entry]);
  assert.equal(tsv.trim().split("\n").length, 2);
  assert.equal(tsv.trim().split("\n")[1].split("\t").length, 4);
  assert.match(tsv, /'=SUM\(1,2\) new cell/);
  assert.match(tsv, /Technical test example/);
});

test("Markdown export resolves concept destinations without rewriting inline/fenced code, and retains provenance", () => {
  const content = fixtureContent();
  const doc = content.topics[0].documents[0];
  doc.body =
    "[Topic](topic:fixture-topic) [Term](glossary:fixture-term)\n\n`topic:fixture-topic`\n\n```text\n[Code](topic:fixture-topic)\n```\n\n[Ref][x]\n\n[x]: topic:fixture-topic\n";
  const markdown = documentMarkdown(doc, content, "ar");
  assert.match(markdown, /\[Topic\]\(\/ar\/docs\/courses\//);
  assert.match(markdown, /\[Term\]\(\/ar\/docs\/glossary\/#fixture-term\)/);
  assert.match(markdown, /`topic:fixture-topic`/);
  assert.match(markdown, /\[Code\]\(topic:fixture-topic\)/);
  assert.match(markdown, /\[x\]: \/ar\/docs\/courses\//);
  assert.match(markdown, /provenance: illustrative/);
  const bundle = topicBundle(content.topics[0], content, "ar");
  for (const title of [
    "Türkçe test",
    "اختبار عربي",
    "Özet testi",
    "Technical test example",
  ])
    assert.ok(bundle.includes(title));
});

test("source exports preserve physical ranges and private fingerprints; remote URL query survives the page fragment", () => {
  const content = fixtureContent();
  content.sources.push({
    id: "private-original",
    title: "Private test",
    language: "tr",
    courseIds: ["fixture-course"],
    location: {
      kind: "private",
      filename: "test.pdf",
      pageCount: 8,
      sha256: "a".repeat(64),
      reason: "Not redistributed.",
    },
  });
  const doc = content.topics[0].documents[0];
  doc.provenance = "source-based";
  doc.sources = [{ sourceId: "private-original", pages: [{ from: 2, to: 4 }] }];
  const markdown = documentMarkdown(doc, content, "tr");
  assert.match(markdown, /physical PDF pages: 2–4/);
  assert.match(markdown, /SHA-256: a{64}/);
  assert.equal(sourceUrl(content.sources[0], 2), undefined);
  const remote = structuredClone(content.sources[0]);
  remote.location = {
    kind: "remote",
    url: "https://example.invalid/book.pdf?download=1#old",
    pageCount: 8,
  };
  assert.equal(
    sourceUrl(remote, 3),
    "https://example.invalid/book.pdf?download=1#page=3",
  );
  assert.equal(
    sourceSchema.safeParse({
      ...content.sources[0],
      location: { ...content.sources[0].location, filename: "../outside.pdf" },
    }).success,
    false,
  );
});

test("private originals can be absent in public checkouts; present originals must match and cannot be symlinks", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "slg-private-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const content = fixtureContent();
  const bytes = Buffer.from("%PDF-1.7\nsynthetic private fixture\n");
  content.sources.push({
    id: "private-test",
    title: "Private test bytes",
    language: "tr",
    courseIds: ["fixture-course"],
    location: {
      kind: "private",
      filename: "test.pdf",
      pageCount: 1,
      sha256: createHash("sha256").update(bytes).digest("hex"),
      reason: "Synthetic technical fixture.",
    },
  });
  const { contentRoot, publicRoot } = await writeFixture(root, content);
  await loadContent(contentRoot, publicRoot);
  await mkdir(path.join(root, "materials"));
  const file = path.join(root, "materials/test.pdf");
  await writeFile(file, bytes);
  await loadContent(contentRoot, publicRoot);
  await writeFile(file, "%PDF-altered");
  await assert.rejects(
    loadContent(contentRoot, publicRoot),
    /SHA-256 mismatch/,
  );
  await rm(file);
  await writeFile(path.join(root, "outside.pdf"), bytes);
  await symlink(path.join(root, "outside.pdf"), file);
  await assert.rejects(loadContent(contentRoot, publicRoot), /regular file/);
});

test("heading anchors are deterministic across repeated headings and backlinks ignore code examples", () => {
  const body =
    "## Aynı\n\n[Link](topic:fixture-topic)\n\n## Aynı\n\n### عربي\n\n```text\n[False](topic:code-only)\n```";
  assert.deepEqual(
    markdownHeadings(body).map((item) => item.id),
    ["section-1", "section-2", "section-3"],
  );
  assert.deepEqual([...conceptTargets(body)], ["fixture-topic"]);
});

test("shipped search index omits the derived body index and restores it exactly", () => {
  const index = buildSearchIndex(fixtureContent(), "tr");
  for (const doc of index) {
    const shipped = toPublicSearchDocument(doc);
    assert.equal("bodyIndex" in shipped, false);
    assert.deepEqual(fromPublicSearchDocument(shipped), doc);
  }
});

test("match highlighting follows search normalization across scripts", () => {
  assert.deepEqual(matchRanges("GİZLİLİK ve bütünlük", "gizlilik"), [[0, 8]]);
  assert.deepEqual(matchRanges("Bütünlük", "butunluk"), [[0, 8]]);
  assert.deepEqual(matchRanges("السِّرّية", "سرية"), [[2, 9]]);
  assert.deepEqual(matchRanges("plain text", ""), []);
});
