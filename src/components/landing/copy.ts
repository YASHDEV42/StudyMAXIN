import type { Locale } from "@/lib/i18n";

/**
 * Landing-only messages. Shared docs strings stay in `src/lib/i18n.ts`.
 * A headline is a list of lines; each line is a list of segments, so emphasis
 * is decided per language (Latin has an italic to lean on; Arabic does not, and
 * is left unemphasised) without markup living in the copy.
 */
export type HeadlineSegment = { text: string; emphasis?: boolean };

export type LandingCopy = {
  metaTitle: string;
  description: string;
  headline: HeadlineSegment[][];
  lede: string;
  cta: string;
  figure: string;
  figureNote: string;
  languageLabel: string;
};

export const landingCopy: Record<Locale, LandingCopy> = {
  tr: {
    metaTitle: "StudyMAXIN — Bilginin çekim alanı",
    description:
      "Üniversite dersleri için çok dilli bilgi bankası: ayrıntılı Arapça ve Türkçe dersler, Türkçe sınav özetleri ve birbirine bağlanan kavramlar.",
    headline: [
      [{ text: "Bilginin" }],
      [{ text: "çekim", emphasis: true }, { text: " alanı." }],
    ],
    lede: "Üniversite dersleri için çok dilli bilgi bankası: ayrıntılı Arapça ve Türkçe dersler, Türkçe sınav özetleri ve birbirine bağlanan kavramlar.",
    cta: "Çalışmaya Başla",
    figure: "Şek. 1 — Eşpotansiyel çizgiler.",
    figureNote: "Sakin bir alan, tek bir odak.",
    languageLabel: "Dil",
  },
  ar: {
    metaTitle: "StudyMAXIN — جاذبيّة المعرفة",
    description:
      "قاعدة معرفية متعدّدة اللغات لمقرّرات الجامعة: دروس مفصّلة بالعربية والتركية، وملخّصات امتحانات بالتركية، ومفاهيم يترابط بعضها ببعض.",
    headline: [[{ text: "جاذبيّة" }], [{ text: "المعرفة" }]],
    lede: "قاعدة معرفية متعدّدة اللغات لمقرّرات الجامعة: دروس مفصّلة بالعربية والتركية، وملخّصات امتحانات بالتركية، ومفاهيم يترابط بعضها ببعض.",
    cta: "ابدأ الدراسة",
    figure: "شكل ١ — خطوط تساوي الجهد.",
    figureNote: "حقلٌ هادئ، وتركيزٌ واحد.",
    languageLabel: "اللغة",
  },
};

export const languageNames: Record<Locale, string> = {
  tr: "Türkçe",
  ar: "العربية",
};
