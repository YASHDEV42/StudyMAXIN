"use client";

import { useId, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { docsMessages } from "@/lib/docs/messages";

export function downloadText(text: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function CopyButton({
  text,
  locale,
  label,
}: {
  text: string;
  locale: Locale;
  label?: string;
}) {
  const t = docsMessages[locale];
  const [result, setResult] = useState<{
    text: string;
    status: "copied" | "failed";
  }>();
  const status = result?.text === text ? result.status : "idle";
  return (
    <>
      <button
        type="button"
        className="ghost-button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setResult({ text, status: "copied" });
          } catch {
            setResult({ text, status: "failed" });
          }
        }}
      >
        {label ?? t.copy}
      </button>
      <span role="status" className="action-status">
        {status === "copied"
          ? t.copied
          : status === "failed"
            ? t.copyFailed
            : ""}
      </span>
      {status === "failed" && (
        <label className="manual-copy">
          {t.manualCopy}
          <textarea
            dir="auto"
            readOnly
            value={text}
            onFocus={(event) => event.target.select()}
          />
        </label>
      )}
    </>
  );
}
export function DocumentActions({
  markdown,
  bundle,
  filename,
  locale,
}: {
  markdown: string;
  bundle: string;
  filename: string;
  locale: Locale;
}) {
  const t = docsMessages[locale];
  const note = useId();
  return (
    <div className="document-actions">
      {markdown && <CopyButton text={markdown} locale={locale} />}
      <button
        type="button"
        className="ghost-button"
        title={t.bundleNote}
        aria-describedby={note}
        onClick={() =>
          downloadText(bundle, `${filename}.md`, "text/markdown;charset=utf-8")
        }
      >
        {t.bundle}
      </button>
      <span id={note} className="visually-hidden">
        {t.bundleNote}
      </span>
    </div>
  );
}
