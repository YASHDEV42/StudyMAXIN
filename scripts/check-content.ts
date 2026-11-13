import { loadContent } from "../src/lib/content/load";

try {
  const content = await loadContent();
  console.log(
    `Content valid: ${content.courses.length} courses, ${content.topics.length} topics, ${content.sources.length} sources, ${content.glossary.length} glossary entries.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
