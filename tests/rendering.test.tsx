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
  assert.match(glossary, /<table class="glossary-table" dir="ltr">/);
  assert.match(glossary, /<th scope="row" lang="tr">/);
  assert.match(glossary, /<td lang="tr">/);
  assert.match(glossary, /<td lang="en">/);
});

test("after the lesson: Next Topic first, then sources, then relationships", () => {
  const content = fixtureContent();
  const first = content.topics[0];
  const second = structuredClone(first);
  second.id = "fixture-next";
  second.order = 1;
  second.title = { tr: "Sonraki fikstür", ar: "الموضوع التالي للاختبار" };
  content.topics.push(second);
  first.related = ["fixture-next"];
  content.sources = [
    {
      id: "fixture-private",
      title: "Private fixture source · fixture.pdf",
      language: "tr",
      courseIds: ["fixture-course"],
      location: {
        kind: "private",
        filename: "fixture.pdf",
        pageCount: 10,
        sha256: "a".repeat(64),
        reason: "Fixture",
      },
    },
  ];
  first.documents[0].sources = [
    {
      sourceId: "fixture-private",
      pages: [
        { from: 2, to: 4 },
        { from: 7, to: 7 },
      ],
    },
  ];
  const html = renderToStaticMarkup(
    <TopicView topic={first} form="lesson" content={content} locale="tr" />,
  );
  const article = html.indexOf("</article>");
  const next = html.indexOf('class="next-card"');
  const sources = html.indexOf('class="source-citations"');
  const related = html.indexOf('class="relationships"');
  assert.ok(article > 0 && article < next, "next topic follows the lesson");
  assert.ok(next < sources, "sources follow the next topic");
  assert.ok(sources < related, "relationships follow the sources");
  assert.match(
    html,
    /rel="next" href="\/tr\/docs\/courses\/fixture-course\/topics\/fixture-next\/lesson\/?"/,
  );
  // Private originals are cited as text: no upload control, no hosted link.
  assert.ok(html.includes("Private fixture source · fixture.pdf"));
  assert.match(html, /<bdi>2–4<\/bdi><\/span><span>, <bdi>7<\/bdi>/);
  assert.ok(!html.includes('type="file"'));
  assert.ok(!html.includes("fixture.pdf#page"));
});

test("the final published topic ends with a completion state, not a broken link", () => {
  const content = fixtureContent();
  const html = renderToStaticMarkup(
    <TopicView
      topic={content.topics[0]}
      form="cheat-sheet"
      content={content}
      locale="ar"
    />,
  );
  assert.ok(html.includes("next-complete"));
  assert.ok(!html.includes('rel="next"'));
  assert.match(html, /href="\/ar\/docs\/courses\/fixture-course\/?"/);
});
