import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import type {
  Content,
  ContentDocument,
  ContentTopic,
  Source,
} from "../content/schema";
import type { Locale } from "../i18n";
import { contentLink, routes } from "../routes";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

import { publicContent } from "./public";

export function sourceUrl(source: Source, page: number) {
  if (source.location.kind !== "local" && source.location.kind !== "remote")
    return undefined;
  const url = new URL(
    source.location.kind === "local"
      ? source.location.path
      : source.location.url,
    "https://local.invalid",
  );
  url.hash = `page=${page}`;
  return source.location.kind === "local"
    ? `${basePath}${url.pathname}${url.hash}`
    : url.href;
}
/** Rewrite only parsed link destinations, leaving code and ordinary text untouched. */
function exportBody(body: string, locale: Locale, content: Content) {
  const replacements: { start: number; end: number; value: string }[] = [];
  visit(unified().use(remarkParse).use(remarkGfm).parse(body), (node) => {
    if (
      (node.type === "link" || node.type === "definition") &&
      /^(topic|glossary):/.test(node.url) &&
      node.position
    ) {
      const start = node.position.start.offset!;
      const end = node.position.end.offset!;
      const source = body.slice(start, end);
      const position = source.lastIndexOf(node.url);
      const url = contentLink(node.url, locale, content);
      if (url && position >= 0)
        replacements.push({
          start: start + position,
          end: start + position + node.url.length,
          value: `${basePath}${url}`,
        });
    }
  });
  for (const replacement of replacements.sort((a, b) => b.start - a.start))
    body =
      body.slice(0, replacement.start) +
      replacement.value +
      body.slice(replacement.end);
  return body;
}
export function documentMarkdown(
  document: ContentDocument,
  content: Content,
  uiLocale: Locale,
) {
  if (document.status !== "published") return "";
  const citations = document.sources.map((citation) => {
    const source = content.sources.find(
      (source) => source.id === citation.sourceId,
    )!;
    const pages = citation.pages
      .map((range) => {
        const label =
          range.from === range.to
            ? `${range.from}`
            : `${range.from}–${range.to}`;
        const url = sourceUrl(source, range.from);
        return url ? `[${label}](${url})` : label;
      })
      .join(", ");
    const note =
      source.location.kind === "private"
        ? `\n  Private original: ${source.location.filename}; SHA-256: ${source.location.sha256}. ${source.location.reason}`
        : "";
    return `- ${source.title} — physical PDF pages: ${pages}.${note}`;
  });
  return `# ${document.title}\n\nLanguage: ${document.locale}; form: ${document.kind}; provenance: ${document.provenance}.\n\n${document.summary}\n\n${exportBody(document.body, uiLocale, content).trim()}\n\n## Source references\n\n${citations.join("\n") || "Illustrative content; no source citations."}\n`;
}
export function topicBundle(
  topic: ContentTopic,
  content: Content,
  uiLocale: Locale,
) {
  const published = publicContent(content);
  const publicTopic = published.topics.find((item) => item.id === topic.id);
  if (!publicTopic) return "";
  const relations = (ids: string[]) =>
    ids
      .map((id) => published.topics.find((item) => item.id === id))
      .filter((item) => item !== undefined)
      .map(
        (item) =>
          `- [${item.title[uiLocale]}](${basePath}${routes.topic(uiLocale, item)})`,
      )
      .join("\n") || "None recorded.";
  const entries = published.glossary.filter((entry) =>
    entry.topicIds.includes(topic.id),
  );
  return `# ${topic.title[uiLocale]} — study bundle\n\nStable topic ID: ${topic.id}\nOnly published forms are included. Route links are relative to the study site. Author-added explanations are labeled in the lessons. The source review scope is stated in each document; this bundle does not claim full chapter coverage.\n\n## Prerequisites\n\n${relations(topic.prerequisites)}\n\n## Related topics\n\n${relations(topic.related)}\n\n${publicTopic.documents.map((document) => documentMarkdown(document, published, uiLocale)).join("\n---\n\n")}\n## Turkish–English glossary\n\n${entries.map((entry) => `### ${entry.term.tr} — ${entry.term.en}\n\nTR: ${entry.examples.tr}\n\nEN: ${entry.examples.en}`).join("\n\n") || "No associated entries."}\n`;
}
