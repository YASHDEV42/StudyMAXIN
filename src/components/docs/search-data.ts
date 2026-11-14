"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import {
  fromPublicSearchDocument,
  type PublicSearchDocument,
  type SearchDocument,
} from "@/lib/docs/search";

type State =
  | { status: "idle" | "loading" | "error"; index?: undefined }
  | { status: "ready"; index: SearchDocument[] };

const cache = new Map<Locale, Promise<SearchDocument[]>>();

/** Fetches the static per-locale index once per page session. */
export function loadSearchIndex(locale: Locale) {
  let pending = cache.get(locale);
  if (!pending) {
    pending = fetch(
      `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${locale}/docs/search-index.json`,
    )
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<PublicSearchDocument[]>;
      })
      .then((docs) => docs.map(fromPublicSearchDocument));
    pending.catch(() => cache.delete(locale));
    cache.set(locale, pending);
  }
  return pending;
}

export function useSearchIndex(locale: Locale, enabled = true) {
  const [state, setState] = useState<State>({ status: "idle" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    // Only announce loading if the fetch is not already resolved.
    const timer = window.setTimeout(
      () => live && setState((s) => (s.index ? s : { status: "loading" })),
      120,
    );
    loadSearchIndex(locale).then(
      (index) => live && setState({ status: "ready", index }),
      () => live && setState({ status: "error" }),
    );
    return () => {
      live = false;
      window.clearTimeout(timer);
    };
  }, [locale, enabled, attempt]);
  return { ...state, retry: () => setAttempt((value) => value + 1) };
}
