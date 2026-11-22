import { loadContent } from "../src/lib/content/load";
import { loadQuizBank } from "../src/lib/quiz/load";

try {
  const [content, quiz, databaseQuiz] = await Promise.all([
    loadContent(),
    loadQuizBank(),
    loadQuizBank(undefined, undefined, "database-management"),
  ]);
  console.log(
    `Quiz valid: ${quiz.questions.length} verified questions in ${quiz.topics.length} topics.`,
  );
  console.log(
    `Database quiz valid: ${databaseQuiz.questions.length} verified questions in ${databaseQuiz.topics.length} topics.`,
  );
  console.log(
    `Content valid: ${content.courses.length} courses, ${content.topics.length} topics, ${content.sources.length} sources, ${content.glossary.length} glossary entries.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
