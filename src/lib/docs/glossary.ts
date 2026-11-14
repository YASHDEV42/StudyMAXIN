import type { GlossaryEntry } from "../content/schema";
import type { TopicOption } from "./public";
import { normalizeSearch, queryTokens } from "./search";

export function filterGlossary(
  entries: GlossaryEntry[],
  topics: TopicOption[],
  filters: {
    query: string;
    courseId: string;
    chapterId: string;
    topicId: string;
  },
) {
  const tokens = queryTokens(filters.query);
  return entries
    .filter((entry) => {
      if (filters.courseId && !entry.courseIds.includes(filters.courseId))
        return false;
      if (filters.topicId && !entry.topicIds.includes(filters.topicId))
        return false;
      if (
        filters.chapterId &&
        !entry.topicIds.some((id) =>
          topics.some(
            (topic) =>
              topic.id === id &&
              topic.chapterId === filters.chapterId &&
              (!filters.courseId || topic.courseId === filters.courseId),
          ),
        )
      )
        return false;
      const text = normalizeSearch(
        `${entry.term.tr} ${entry.term.en} ${entry.examples.tr} ${entry.examples.en}`,
      );
      return tokens.every((token) => text.includes(token));
    })
    .sort((a, b) => a.term.tr.localeCompare(b.term.tr, "tr"));
}
function tsvCell(value: string) {
  const clean = value.replace(/[\t\r\n]+/g, " ");
  // Prevent spreadsheet formula evaluation when pasted into spreadsheet tools.
  return /^[=+\-@]/.test(clean) ? `'${clean}` : clean;
}
export function glossaryTsv(entries: GlossaryEntry[]) {
  return (
    [
      "Türkçe\tEnglish\tTürkçe örnek\tEnglish example",
      ...entries.map((entry) =>
        [entry.term.tr, entry.term.en, entry.examples.tr, entry.examples.en]
          .map(tsvCell)
          .join("\t"),
      ),
    ].join("\n") + "\n"
  );
}
