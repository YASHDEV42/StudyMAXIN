import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  catalogSchema,
  courseSchema,
  documentFilename,
  glossaryEntrySchema,
  sourceSchema,
  topicSchema,
  type Content,
} from "./schema";
import { validateContent } from "./validate";

async function readJson(file: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    throw new Error(`${file}: cannot read JSON`, { cause: error });
  }
}

async function readRecords<T extends { id: string }>(
  root: string,
  filename: string,
  schema: z.ZodType<T>,
) {
  const records: T[] = [];
  const directories = await readdir(root, { withFileTypes: true });
  for (const directory of directories.sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    if (directory.name === ".gitkeep") continue;
    if (!directory.isDirectory())
      throw new Error(
        `${root}/${directory.name}: expected a record directory (no symlinks)`,
      );
    const file = path.join(root, directory.name, filename);
    if (!(await lstat(file)).isFile())
      throw new Error(
        `${file}: expected a regular metadata file (no symlinks)`,
      );
    if (filename === "course.json") {
      const files = await readdir(path.dirname(file));
      if (files.some((name) => name !== filename))
        throw new Error(`${path.dirname(file)}: unregistered course file`);
    }
    const record = schema.parse(await readJson(file));
    if (record.id !== directory.name)
      throw new Error(`${file}: id must match directory ${directory.name}`);
    records.push(record);
  }
  return records;
}

/** Pure filesystem boundary. Tests pass isolated roots; the app always uses the repository roots. */
export async function loadContent(
  contentRoot = path.join(process.cwd(), "content"),
  publicRoot = path.join(process.cwd(), "public"),
): Promise<Content> {
  const [courses, topics, sources, glossary] = await Promise.all([
    readRecords(path.join(contentRoot, "courses"), "course.json", courseSchema),
    readRecords(path.join(contentRoot, "topics"), "topic.json", topicSchema),
    readJson(path.join(contentRoot, "sources.json")).then((value) =>
      z.array(sourceSchema).parse(value),
    ),
    readJson(path.join(contentRoot, "glossary.json")).then((value) =>
      z.array(glossaryEntrySchema).parse(value),
    ),
  ]);
  const catalog = catalogSchema.parse({
    schemaVersion: 1,
    courses,
    topics,
    sources,
    glossary,
  });
  const content: Content = {
    ...catalog,
    topics: await Promise.all(
      catalog.topics.map(async (topic) => {
        const directory = path.join(contentRoot, "topics", topic.id);
        const expected = new Set([
          "topic.json",
          ...topic.documents.map(documentFilename),
        ]);
        for (const file of await readdir(directory, { withFileTypes: true })) {
          if (!file.isFile() || !expected.has(file.name))
            throw new Error(
              `${directory}/${file.name}: unregistered content file or symlink`,
            );
        }
        return {
          ...topic,
          documents: await Promise.all(
            topic.documents.map(async (document) => ({
              ...document,
              body: await readFile(
                path.join(directory, documentFilename(document)),
                "utf8",
              ),
            })),
          ),
        };
      }),
    ),
  };
  const errors = validateContent(content);
  for (const source of content.sources) {
    if (source.location.kind !== "local") continue;
    const file = path.join(publicRoot, source.location.path);
    try {
      // Reject symlinks in every path segment so source integrity stays within public/.
      const segments = source.location.path.slice(1).split("/");
      let current = publicRoot;
      for (const segment of segments) {
        current = path.join(current, segment);
        if ((await lstat(current)).isSymbolicLink()) throw new Error("symlink");
      }
      const bytes = await readFile(file);
      if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-")))
        errors.push(`source ${source.id}: file does not have a PDF header`);
      if (
        createHash("sha256").update(bytes).digest("hex") !==
        source.location.sha256
      )
        errors.push(`source ${source.id}: SHA-256 mismatch`);
    } catch {
      errors.push(
        `source ${source.id}: local PDF missing, unreadable, or symlinked: ${file}`,
      );
    }
  }
  if (errors.length)
    throw new Error(
      `Content integrity check failed:\n${errors.map((error) => `- ${error}`).join("\n")}`,
    );
  content.courses.sort((a, b) => a.order - b.order);
  content.topics.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
  return content;
}
