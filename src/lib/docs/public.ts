import type { Content } from "../content/schema";
import { isPublished } from "../routes";

/** Build-time publication boundary. Never serialize the internal authoring catalog. */
export function publicContent(content: Content): Content {
  const topics = content.topics.filter(isPublished).map((topic) => ({
    ...topic,
    documents: topic.documents.filter(
      (document) => document.status === "published",
    ),
  }));
  const ids = new Set(topics.map((topic) => topic.id));
  const sourceIds = new Set(
    topics.flatMap((topic) =>
      topic.documents.flatMap((document) =>
        document.sources.map((source) => source.sourceId),
      ),
    ),
  );
  return {
    ...content,
    topics,
    sources: content.sources.filter((source) => sourceIds.has(source.id)),
    glossary: content.glossary.filter(
      (entry) =>
        !entry.topicIds.length || entry.topicIds.some((id) => ids.has(id)),
    ),
  };
}

export function topicOptions(content: Content) {
  return publicContent(content).topics.map(
    ({ id, title, courseId, chapterId, order }) => ({
      id,
      title,
      courseId,
      chapterId,
      order,
    }),
  );
}
export type TopicOption = ReturnType<typeof topicOptions>[number];
