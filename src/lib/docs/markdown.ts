import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";

function textContent(node: unknown): string {
  const item = node as { value?: string; children?: unknown[] };
  return item.value ?? item.children?.map(textContent).join("") ?? "";
}
export function markdownHeadings(body: string) {
  const headings: { id: string; title: string; depth: number }[] = [];
  visit(unified().use(remarkParse).parse(body), "heading", (node) => {
    headings.push({
      id: `section-${headings.length + 1}`,
      title: textContent(node),
      depth: node.depth,
    });
  });
  return headings;
}
export function remarkHeadingIds() {
  return (tree: Root) => {
    let index = 0;
    visit(tree, "heading", (node) => {
      node.data = {
        ...node.data,
        hProperties: { ...node.data?.hProperties, id: `section-${++index}` },
      };
    });
  };
}
export function conceptTargets(body: string) {
  const ids = new Set<string>();
  visit(unified().use(remarkParse).use(remarkGfm).parse(body), (node) => {
    if (
      (node.type === "link" || node.type === "definition") &&
      node.url.startsWith("topic:")
    )
      ids.add(node.url.slice(6));
  });
  return ids;
}
