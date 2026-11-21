import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import type { ContentDocument } from "../src/lib/content/schema";
import { loadContent } from "../src/lib/content/load";

test("durable coverage claims match authored forms, exact citation ranges, source fingerprints and glossary inventory", async () => {
  const content = await loadContent();
  const ledger: typeof import("../docs/source-coverage.json") = JSON.parse(
    await readFile("docs/source-coverage.json", "utf8"),
  );
  assert.equal(ledger.inventory.fileCount, ledger.files.length);
  assert.equal(
    ledger.inventory.physicalPageInstances,
    ledger.files.reduce(
      (count: number, file: { physicalPages: number }) =>
        count + file.physicalPages,
      0,
    ),
  );
  for (const file of ledger.files) {
    const source = content.sources.find(
      (source) => source.id === file.sourceId,
    );
    assert.ok(source && source.location.kind === "private");
    assert.equal(source.location.pageCount, file.physicalPages);
    assert.equal(source.location.sha256, file.sha256);
  }
  for (const unit of ledger.completedUnits) {
    const topic = content.topics.find((topic) => topic.id === unit.topicId);
    assert.ok(topic);
    for (const [kind, locale] of [
      ["lesson", "ar"],
      ["lesson", "tr"],
      ["cheat-sheet", "tr"],
    ]) {
      const document: ContentDocument | undefined = topic.documents.find(
        (doc) => doc.kind === kind && doc.locale === locale,
      );
      assert.ok(
        document &&
          document.status === "published" &&
          document.provenance === "source-based" &&
          document.body.trim(),
      );
      assert.deepEqual(document.sources, [
        { sourceId: unit.sourceId, pages: [unit.pdfPages] },
        ...(unit.additionalSources ?? []).map(
          (source: {
            sourceId: string;
            pdfPages: { from: number; to: number };
          }) => ({
            sourceId: source.sourceId,
            pages: [source.pdfPages],
          }),
        ),
      ]);
    }
  }
  const courseGlossary = content.glossary.filter((entry) =>
    entry.courseIds.includes(ledger.courseId),
  );
  assert.equal(ledger.glossary.entryCount, courseGlossary.length);
});
