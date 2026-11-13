import type {
  Definition,
  Image,
  ImageReference,
  Link,
  LinkReference,
} from "mdast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import type { Content } from "./schema";
import { contentLink, isPublished } from "../routes";

const parser = unified().use(remarkParse).use(remarkGfm);

export function validateContent(content: Content): string[] {
  const errors: string[] = [];
  const fail = (context: string, message: string) => {
    errors.push(`${context}: ${message}`);
  };
  function unique(values: (string | number)[], context: string) {
    const seen = new Set<string | number>();
    for (const value of values) {
      if (seen.has(value)) fail(context, `duplicate ${JSON.stringify(value)}`);
      seen.add(value);
    }
  }
  for (const key of ["courses", "topics", "sources", "glossary"] as const) {
    unique(
      content[key].map((item) => item.id),
      key,
    );
  }
  unique(
    content.courses.map((course) => course.order),
    "course order",
  );
  const courses = new Map(content.courses.map((course) => [course.id, course]));
  const topics = new Map(content.topics.map((topic) => [topic.id, topic]));
  const sources = new Map(content.sources.map((source) => [source.id, source]));
  for (const course of content.courses) {
    unique(
      course.chapters.map((chapter) => chapter.id),
      `${course.id} chapters`,
    );
    unique(
      course.chapters.map((chapter) => chapter.order),
      `${course.id} chapter order`,
    );
    for (const chapter of course.chapters) {
      unique(
        content.topics
          .filter(
            (topic) =>
              topic.courseId === course.id && topic.chapterId === chapter.id,
          )
          .map((topic) => topic.order),
        `${course.id}/${chapter.id} topic order`,
      );
    }
  }
  for (const source of content.sources) {
    unique(source.courseIds, `source ${source.id} courses`);
    for (const id of source.courseIds)
      if (!courses.has(id)) fail(`source ${source.id}`, `unknown course ${id}`);
  }
  for (const topic of content.topics) {
    const context = `topic ${topic.id}`;
    const course = courses.get(topic.courseId);
    if (!course) fail(context, `unknown course ${topic.courseId}`);
    else if (!course.chapters.some((chapter) => chapter.id === topic.chapterId))
      fail(context, `unknown chapter ${topic.chapterId}`);
    for (const relation of ["prerequisites", "related"] as const) {
      unique(topic[relation], `${context} ${relation}`);
      for (const id of topic[relation]) {
        const target = topics.get(id);
        if (!target) fail(context, `unknown ${relation} topic ${id}`);
        else if (id === topic.id) fail(context, `self ${relation} reference`);
        else if (isPublished(topic) && !isPublished(target))
          fail(context, `${relation} target ${id} has no published documents`);
      }
    }
    unique(
      topic.documents.map((document) => `${document.kind}.${document.locale}`),
      `${context} documents`,
    );
    for (const document of topic.documents) {
      const docContext = `${context}/${document.kind}.${document.locale}`;
      if (document.status === "published" && !document.body.trim())
        fail(docContext, "published body is empty");
      if (
        document.provenance === "source-based" &&
        document.status === "published" &&
        !document.sources.length
      )
        fail(docContext, "published source-based content requires citations");
      unique(
        document.sources.map((citation) => citation.sourceId),
        `${docContext} citations`,
      );
      for (const citation of document.sources) {
        const source = sources.get(citation.sourceId);
        if (!source) {
          fail(docContext, `unknown source ${citation.sourceId}`);
          continue;
        }
        if (!source.courseIds.includes(topic.courseId))
          fail(
            docContext,
            `source ${source.id} is not associated with course ${topic.courseId}`,
          );
        if (source.location.kind === "unavailable") {
          if (document.status === "published")
            fail(
              docContext,
              `source ${source.id} is unavailable; keep this document draft`,
            );
        } else {
          for (const range of citation.pages)
            if (range.to > source.location.pageCount)
              fail(
                docContext,
                `page ${range.to} exceeds ${source.id} page count ${source.location.pageCount}`,
              );
        }
      }
      const tree = parser.parse(document.body);
      const definitions = new Set<string>();
      visit(tree, "definition", (node: Definition) => {
        definitions.add(node.identifier);
      });
      visit(tree, (node) => {
        if (node.type === "html")
          fail(docContext, "raw HTML/JSX is unsupported; use Markdown");
        if (node.type === "heading" && node.depth === 1)
          fail(
            docContext,
            "body headings must start at level 2; the renderer supplies the title",
          );
        if (node.type === "link" || node.type === "definition") {
          const { url } = node as Link | Definition;
          if (!contentLink(url, document.locale, content))
            fail(docContext, `unsupported or unresolved link ${url}`);
        }
        if (node.type === "image") {
          const image = node as Image;
          if (
            !/^https:\/\//.test(image.url) ||
            !contentLink(image.url, document.locale, content) ||
            !image.alt?.trim()
          )
            fail(
              docContext,
              "images require an HTTPS URL and nonempty alt text",
            );
        }
        if (node.type === "linkReference" || node.type === "imageReference") {
          const reference = node as LinkReference | ImageReference;
          if (!definitions.has(reference.identifier))
            fail(docContext, `missing link definition ${reference.identifier}`);
          if (node.type === "imageReference")
            fail(docContext, "use inline Markdown image syntax with alt text");
        }
      });
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  function checkCycle(id: string) {
    if (visiting.has(id)) {
      fail(`topic ${id}`, "prerequisite cycle detected");
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const target of topics.get(id)?.prerequisites ?? [])
      if (topics.has(target)) checkCycle(target);
    visiting.delete(id);
    visited.add(id);
  }
  for (const topic of content.topics) checkCycle(topic.id);

  unique(
    content.glossary.map(
      (entry) =>
        `${entry.term.tr.toLocaleLowerCase("tr")}\u0000${entry.term.en.toLowerCase()}`,
    ),
    "glossary term pairs",
  );
  for (const entry of content.glossary) {
    const context = `glossary ${entry.id}`;
    unique(entry.courseIds, `${context} courses`);
    unique(entry.topicIds, `${context} topics`);
    for (const id of entry.courseIds)
      if (!courses.has(id)) fail(context, `unknown course ${id}`);
    for (const id of entry.topicIds) {
      const topic = topics.get(id);
      if (!topic) fail(context, `unknown topic ${id}`);
      else {
        if (!entry.courseIds.includes(topic.courseId))
          fail(context, `topic ${id} belongs to an unassociated course`);
        if (!isPublished(topic))
          fail(context, `topic ${id} has no published documents`);
      }
    }
  }
  return errors;
}
