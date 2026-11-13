import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ContentView, TopicView } from "../src/components/docs/content-view";
import { messages } from "../src/lib/i18n";
import { fixtureContent } from "./fixtures";

test("Arabic lessons render RTL with LTR code", () => {
  const content = fixtureContent();
  const html = renderToStaticMarkup(
    <TopicView
      topic={content.topics[0]}
      form="lesson"
      content={content}
      locale="ar"
    />,
  );
  assert.match(html, /<article class="prose" lang="ar" dir="rtl">/);
  assert.match(html, /<pre dir="ltr"><code dir="ltr"/);
  assert.ok(html.includes("نص اختبار عربي"));
});

test("Turkish cheat sheet stays LTR inside the Arabic UI and links preserve UI locale", () => {
  const content = fixtureContent();
  const html = renderToStaticMarkup(
    <TopicView
      topic={content.topics[0]}
      form="cheat-sheet"
      content={content}
      locale="ar"
    />,
  );
  assert.match(html, /<article class="prose" lang="tr" dir="ltr">/);
  assert.ok(html.includes("Türkçe özet gövdesi"));
  assert.ok(html.includes(messages.ar.cheatSheet));
  assert.match(
    html,
    /href="\/ar\/docs\/courses\/fixture-course\/topics\/fixture-topic\/lesson\/"/,
  );
});

test("missing Arabic lesson has an explicit unavailable state and no silent Turkish fallback", () => {
  const content = fixtureContent();
  content.topics[0].documents[1].status = "draft";
  const html = renderToStaticMarkup(
    <TopicView
      topic={content.topics[0]}
      form="lesson"
      content={content}
      locale="ar"
    />,
  );
  assert.ok(html.includes(messages.ar.unavailable));
  assert.ok(!html.includes("Türkçe gövde"));
  assert.ok(!html.includes("نص اختبار عربي"));
});

test("PDF ranges link to the first physical page and glossary examples carry language tags", () => {
  const content = fixtureContent();
  content.sources = [
    {
      id: "fixture-pdf",
      title: "Test source",
      language: "tr",
      courseIds: ["fixture-course"],
      location: {
        kind: "remote",
        url: "https://example.invalid/fixture.pdf?download=1#old",
        pageCount: 10,
      },
    },
  ];
  content.topics[0].documents[0].sources = [
    { sourceId: "fixture-pdf", pages: [{ from: 2, to: 4 }] },
  ];
  const html = renderToStaticMarkup(
    <TopicView
      topic={content.topics[0]}
      form="lesson"
      content={content}
      locale="tr"
    />,
  );
  assert.match(
    html,
    /href="https:\/\/example.invalid\/fixture.pdf\?download=1#page=2"/,
  );
  const glossary = renderToStaticMarkup(
    <ContentView route={{ kind: "glossary" }} content={content} locale="ar" />,
  );
  assert.match(glossary, /id="fixture-term"/);
  assert.match(glossary, /<dd lang="tr">/);
  assert.match(glossary, /<dd lang="en">/);
});
