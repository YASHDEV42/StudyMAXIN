import { matchRanges } from "@/lib/docs/search";

/** Text with query matches wrapped in <mark>; never injects HTML. */
export function Highlight({ text, query }: { text: string; query: string }) {
  const ranges = matchRanges(text, query);
  if (!ranges.length) return <>{text}</>;
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const [from, to] of ranges) {
    if (from > cursor) parts.push(text.slice(cursor, from));
    parts.push(<mark key={from}>{text.slice(from, to)}</mark>);
    cursor = to;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}
