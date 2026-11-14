import type { Locale } from "../i18n";

// Turkish dotted/dotless I, Latin accents, Arabic vocalization/alef variants.
export function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .replace(/[ıİ]/g, "i")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/ـ/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
export function queryTokens(value: string) {
  return [
    ...new Set(
      normalizeSearch(value.slice(0, 200)).split(/\s+/).filter(Boolean),
    ),
  ].slice(0, 10);
}
export type SearchDocument = {
  id: string;
  topicId: string;
  courseId: string;
  course: string;
  chapter: string;
  title: string;
  locale: Locale;
  kind: "lesson" | "cheat-sheet";
  href: string;
  text: string;
  titleIndex: string;
  bodyIndex: string;
  termIndex: string;
};
/** The shipped form: `bodyIndex` is derived on the client instead of sent twice. */
export type PublicSearchDocument = Omit<SearchDocument, "bodyIndex">;
export function toPublicSearchDocument({
  bodyIndex: _bodyIndex,
  ...doc
}: SearchDocument): PublicSearchDocument {
  void _bodyIndex;
  return doc;
}
export function fromPublicSearchDocument(
  doc: PublicSearchDocument,
): SearchDocument {
  return { ...doc, bodyIndex: normalizeSearch(doc.text) };
}
export function searchDocuments(
  index: SearchDocument[],
  query: string,
  courseId = "",
) {
  const tokens = queryTokens(query);
  if (!tokens.length) return [];
  return index
    .filter(
      (doc) =>
        (!courseId || doc.courseId === courseId) &&
        tokens.every((token) =>
          `${doc.titleIndex} ${doc.termIndex} ${doc.bodyIndex}`.includes(token),
        ),
    )
    .map((doc) => ({
      doc,
      score: tokens.reduce(
        (score, token) =>
          score +
          (doc.titleIndex.includes(token) ? 8 : 0) +
          (doc.termIndex.includes(token) ? 4 : 0) +
          (doc.bodyIndex.includes(token) ? 1 : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score || a.doc.id.localeCompare(b.doc.id))
    .map(({ doc }) => doc);
}
export function searchExcerpt(doc: SearchDocument, query: string) {
  // Select a short sentence near a matching term without injecting HTML.
  const token = queryTokens(query).find((token) =>
    doc.bodyIndex.includes(token),
  );
  const sentences = doc.text.split(/(?<=[.!?؟])\s+/);
  const sentence =
    sentences.find(
      (sentence) => token && normalizeSearch(sentence).includes(token),
    ) ?? doc.text;
  return sentence.length > 240 ? `${sentence.slice(0, 240)}…` : sentence;
}

/**
 * Character ranges of `text` that match query tokens under the same
 * normalization as search (case, Turkish dotted I, accents, Arabic marks), so
 * highlights follow what actually matched. Returns sorted, merged ranges.
 */
export function matchRanges(text: string, query: string) {
  const tokens = queryTokens(query);
  if (!tokens.length) return [];
  let normalized = "";
  const origin: number[] = [];
  for (let index = 0; index < text.length; index++) {
    const piece = text[index]
      .toLowerCase()
      .replace(/[ıİ]/g, "i")
      .normalize("NFKD")
      .replace(/\p{M}/gu, "")
      .replace(/ـ/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/[^\p{L}\p{N}]+/gu, " ");
    for (const char of piece) {
      normalized += char;
      origin.push(index);
    }
  }
  const ranges: [number, number][] = [];
  for (const token of tokens) {
    let from = normalized.indexOf(token);
    while (from !== -1) {
      ranges.push([origin[from], origin[from + token.length - 1] + 1]);
      from = normalized.indexOf(token, from + token.length);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([...range]);
  }
  return merged;
}
