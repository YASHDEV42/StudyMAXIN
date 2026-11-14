"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Locale } from "@/lib/i18n";
import {
  applyThemePreference,
  readThemePreference,
  themes,
  type ThemePreference,
} from "@/lib/theme";

const labels = {
  tr: { theme: "Tema", system: "Sistem", light: "Açık", dark: "Koyu" },
  ar: { theme: "المظهر", system: "حسب النظام", light: "فاتح", dark: "داكن" },
} as const;

function subscribe(onChange: () => void) {
  window.addEventListener("studylike-theme", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("studylike-theme", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function ThemeIcon({ theme }: { theme: ThemePreference }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {theme === "light" ? (
        <>
          <circle cx="10" cy="10" r="3.4" />
          <path d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
        </>
      ) : theme === "dark" ? (
        <path d="M16.4 12.6A6.9 6.9 0 0 1 7.4 3.6a6.9 6.9 0 1 0 9 9Z" />
      ) : (
        <>
          <rect x="2.5" y="3.5" width="15" height="10" rx="1.6" />
          <path d="M7 17h6M10 13.5V17" />
        </>
      )}
    </svg>
  );
}

/**
 * One quiet icon button that opens three explicit choices. The choice is local
 * to this browser; "system" clears it and follows the operating system again.
 */
export function ThemeToggle({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const t = labels[locale];
  const preference = useSyncExternalStore(
    subscribe,
    readThemePreference,
    () => "system" as const,
  );
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className={["theme-toggle", className].filter(Boolean).join(" ")}
      onBlur={(event) => {
        if (!root.current?.contains(event.relatedTarget as Node | null))
          setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        className="theme-toggle__button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${t.theme}: ${t[preference]}`}
        title={`${t.theme}: ${t[preference]}`}
        onClick={() => setOpen((value) => !value)}
      >
        <ThemeIcon theme={preference} />
      </button>
      <div
        id={id}
        className="theme-toggle__menu"
        role="group"
        aria-label={t.theme}
        hidden={!open}
      >
        {themes.map((theme) => (
          <button
            key={theme}
            type="button"
            aria-pressed={preference === theme}
            onClick={() => {
              applyThemePreference(theme);
              setOpen(false);
              button.current?.focus();
            }}
          >
            <ThemeIcon theme={theme} />
            <span>{t[theme]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
