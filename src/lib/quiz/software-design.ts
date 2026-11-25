import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { validateBank } from "./bank";
import type { PublishedQuizBank } from "./audit";

// The existing software-design bank is a provisional study collection,
// not an independently audited transcription of all lecture questions.
export async function loadSoftwareDesignBank(root: string): Promise<PublishedQuizBank> {
  const raw = JSON.parse(await readFile(join(root, "software-design", "trainer-bank.json"), "utf8"));
  const { questions, ...manifest } = raw;
  const files = new Map<string, unknown>(manifest.topics.map((topic: { id: string }) => [topic.id, questions.filter((question: { topicId: string }) => question.topicId === topic.id)]));
  return { ...validateBank("software-design", manifest, files), referencesByQuestion: {} };
}
