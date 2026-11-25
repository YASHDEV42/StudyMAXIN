import { loadContent } from "../src/lib/content/load";
import { loadQuizBank } from "../src/lib/quiz/load";

try {
  const [content, quiz, databaseQuiz, designQuiz] = await Promise.all([
    loadContent(),
    loadQuizBank(),
    loadQuizBank(undefined, undefined, "database-management"),
    loadQuizBank(undefined, undefined, "software-design"),
  ]);
  console.log(
    `Quiz valid: ${quiz.questions.length} verified questions in ${quiz.topics.length} topics.`,
  );
  console.log(
    `Database quiz valid: ${databaseQuiz.questions.length} verified questions in ${databaseQuiz.topics.length} topics.`,
  );
  console.log(`Software design quiz valid: ${designQuiz.questions.length} practice questions.`);
  console.log(
    `Content valid: ${content.courses.length} courses, ${content.topics.length} topics, ${content.sources.length} sources, ${content.glossary.length} glossary entries.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
