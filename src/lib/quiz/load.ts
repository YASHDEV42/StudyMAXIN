import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { publishAuditedBank } from "./audit";
import { operatingSystemsId, validateBank } from "./bank";

export async function loadQuizBank(
  root = join(process.cwd(), "content", "quiz"),
  auditPath?: string,
  courseId = operatingSystemsId,
) {
  const dir = join(root, courseId);
  const read = async (name: string): Promise<unknown> =>
    JSON.parse(await readFile(join(dir, name), "utf8"));
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      throw new Error(`Unexpected quiz bank entry: ${entry.name}`);
    }
  }
  const files = await Promise.all(
    entries
      .filter(({ name }) => name !== "manifest.json")
      .map(async ({ name }) => [name.slice(0, -5), await read(name)] as const),
  );
  const [manifest, audit] = await Promise.all([
    read("manifest.json"),
    readFile(
      auditPath ??
        join(
          process.cwd(),
          "docs",
          courseId === operatingSystemsId
            ? "quiz-audit.json"
            : "database-quiz-audit.json",
        ),
      "utf8",
    ).then((raw): unknown => JSON.parse(raw)),
  ]);
  return publishAuditedBank(
    validateBank(courseId, manifest, new Map(files)),
    audit,
  );
}
