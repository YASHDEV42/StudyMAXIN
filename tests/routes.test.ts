import assert from "node:assert/strict";
import test from "node:test";
import {
  contentLink,
  docsSegments,
  resolveDocsRoute,
  routes,
  switchLocale,
} from "../src/lib/routes";
import { fixtureContent } from "./fixtures";

test("language switching preserves stable course/topic identity and content form", () => {
  const topic = fixtureContent().topics[0];
  for (const form of ["lesson", "cheat-sheet"] as const) {
    assert.equal(
      switchLocale(routes.topic("tr", topic, form), "ar"),
      routes.topic("ar", topic, form),
    );
  }
  assert.equal(switchLocale("/tr/docs/glossary/", "ar"), "/ar/docs/glossary/");
});

test("every generated route resolves; empty catalogs and unknown routes are safe", () => {
  const content = fixtureContent();
  for (const segments of docsSegments(content))
    assert.ok(resolveDocsRoute(segments, content));
  assert.equal(resolveDocsRoute(["courses", "ghost"], content), undefined);
  assert.equal(
    resolveDocsRoute(
      ["courses", "fixture-course", "topics", "fixture-topic", "unknown"],
      content,
    ),
    undefined,
  );
  assert.equal(resolveDocsRoute(["glossary", "extra"], content), undefined);
  assert.deepEqual(
    docsSegments({ ...content, courses: [], topics: [], glossary: [] }),
    [[], ["glossary"], ["search"], ["labs"]],
  );
  content.topics[0].documents.forEach((document) => {
    document.status = "draft";
  });
  assert.equal(
    docsSegments(content).some((segments) =>
      segments.includes("fixture-topic"),
    ),
    false,
  );
  assert.equal(
    resolveDocsRoute(
      ["courses", "fixture-course", "topics", "fixture-topic", "lesson"],
      content,
    ),
    undefined,
  );
});

test("concept and glossary links resolve by identity in either UI language", () => {
  const content = fixtureContent();
  assert.equal(
    contentLink("topic:fixture-topic", "ar", content),
    routes.topic("ar", content.topics[0]),
  );
  assert.equal(
    contentLink("glossary:fixture-term", "tr", content),
    "/tr/docs/glossary/#fixture-term",
  );
  assert.equal(contentLink("topic:ghost", "ar", content), undefined);
  assert.equal(contentLink("javascript:alert(1)", "tr", content), undefined);
  assert.equal(contentLink("https://", "tr", content), undefined);
});
