import localFont from "next/font/local";

/**
 * Shared, self-hosted display faces (see ./README.md). Nothing is fetched at
 * build time. The hero and the documentation headings both use them, so the
 * product keeps one typographic voice. Body text stays on the system stack.
 */
const newsreader = localFont({
  src: [
    { path: "./newsreader.woff2", weight: "400", style: "normal" },
    { path: "./newsreader-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
});

// Not preloaded: only Arabic pages set real text in it.
const amiri = localFont({
  src: [
    { path: "./amiri-regular.woff2", weight: "400", style: "normal" },
    { path: "./amiri-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Geeza Pro", "Noto Naskh Arabic", "Traditional Arabic", "serif"],
});

export const fontVariables = `${newsreader.variable} ${amiri.variable}`;
