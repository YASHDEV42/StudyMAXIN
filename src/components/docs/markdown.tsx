import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Content } from "@/lib/content/schema";
import type { Locale } from "@/lib/i18n";
import { remarkHeadingIds } from "@/lib/docs/markdown";
import { contentLink } from "@/lib/routes";

export function ContentMarkdown({
  body,
  locale,
  content,
}: {
  body: string;
  locale: Locale;
  content: Content;
}) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkHeadingIds]}
      skipHtml
      urlTransform={(url, key) =>
        key === "src" && /^https:\/\//.test(url)
          ? url
          : (contentLink(url, locale, content) ?? "")
      }
      components={{
        a: ({ href, children }) => (
          <a
            href={
              href?.startsWith("/")
                ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${href}`
                : href
            }
          >
            {children}
          </a>
        ),
        pre: ({ children }) => <pre dir="ltr">{children}</pre>,
        code: ({ children, className }) => (
          <code dir="ltr" className={className}>
            {children}
          </code>
        ),
        table: ({ children }) => (
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label={locale === "ar" ? "جدول" : "Tablo"}
          >
            <table>{children}</table>
          </div>
        ),
      }}
    >
      {body}
    </Markdown>
  );
}
