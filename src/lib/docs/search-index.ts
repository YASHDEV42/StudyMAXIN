import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import type { Content } from "../content/schema";
import type { Locale } from "../i18n";
import { routes } from "../routes";
import { publicContent } from "./public";
import { normalizeSearch, type SearchDocument } from "./search";

export function plainMarkdown(body: string) {
  const values: string[] = [];
  visit(unified().use(remarkParse).use(remarkGfm).parse(body), (node) => {
    if (
      node.type === "text" ||
      node.type === "inlineCode" ||
      node.type === "code"
    )
      values.push(node.value);
  });
  return values.join(" ").replace(/\s+/g, " ").trim();
}
export function buildSearchIndex(
  content: Content,
  uiLocale: Locale,
): SearchDocument[] {
  const published = publicContent(content);
  return published.topics.flatMap((topic) =>
    topic.documents.map((document) => {
      const terms = published.glossary
        .filter((entry) => entry.topicIds.includes(topic.id))
        .flatMap((entry) => [entry.term.tr, entry.term.en])
        .join(" ");
      const text = `${document.summary} ${plainMarkdown(document.body)}`;
      const course = content.courses.find(
        (course) => course.id === topic.courseId,
      )!;
      return {
        id: `${topic.id}:${document.kind}:${document.locale}`,
        topicId: topic.id,
        courseId: topic.courseId,
        course: course.title[uiLocale],
        chapter:
          course.chapters.find((chapter) => chapter.id === topic.chapterId)
            ?.title[uiLocale] ?? "",
        title: document.title,
        locale: document.locale,
        kind: document.kind,
        href: routes.topic(
          document.kind === "lesson" ? document.locale : uiLocale,
          topic,
          document.kind,
        ),
        text,
        titleIndex: normalizeSearch(
          `${topic.title[uiLocale]} ${document.title}`,
        ),
        bodyIndex: normalizeSearch(text),
        termIndex: normalizeSearch(terms),
      };
    }),
  );
}
