export const locales = ["tr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function direction(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export const messages = {
  tr: {
    docs: "Dersler",
    glossary: "Sözlük",
    home: "Ana sayfa",
    skip: "İçeriğe geç",
    empty: "Henüz yayımlanmış ders içeriği yok.",
    pending:
      "Kaynak PDF’ler bu depoya henüz eklenmedi. İçerik işleme tamamlanmış değildir.",
    lesson: "Anlatımlı ders",
    cheatSheet: "Türkçe sınav özeti",
    unavailable: "Bu içerik henüz bu dilde yayımlanmadı.",
    illustrative: "Örnek içerik — kaynak PDF’den işlenmemiştir.",
    prerequisites: "Ön koşullar",
    related: "İlgili konular",
    sources: "Kaynaklar",
    emptyGlossary: "Henüz sözlük girdisi yok.",
    emptyChapter: "Bu bölümde henüz yayımlanmış konu yok.",
    foundation: "Çalışma alanı hazırlanıyor",
    enter: "Çalışmaya başla",
    page: "PDF sayfaları",
  },
  ar: {
    docs: "المقررات",
    glossary: "المعجم",
    home: "الرئيسية",
    skip: "انتقل إلى المحتوى",
    empty: "لا توجد مواد دراسية منشورة بعد.",
    pending:
      "لم تُضف ملفات PDF المصدرية إلى هذا المستودع بعد، ولم تكتمل معالجة المحتوى.",
    lesson: "الدرس التفصيلي",
    cheatSheet: "ملخص الامتحان بالتركية",
    unavailable: "لم يُنشر هذا المحتوى بهذه اللغة بعد.",
    illustrative: "محتوى توضيحي — لم تتم معالجته من ملف PDF مصدري.",
    prerequisites: "المتطلبات السابقة",
    related: "مواضيع ذات صلة",
    sources: "المصادر",
    emptyGlossary: "لا توجد مصطلحات في المعجم بعد.",
    emptyChapter: "لا توجد مواضيع منشورة في هذا الفصل بعد.",
    foundation: "مساحة الدراسة قيد الإعداد",
    enter: "ابدأ الدراسة",
    page: "صفحات PDF",
  },
} as const;
