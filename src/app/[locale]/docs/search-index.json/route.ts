import { getContent } from "@/lib/content";
import { publicContent } from "@/lib/docs/public";
import { buildSearchIndex } from "@/lib/docs/search-index";
import { toPublicSearchDocument } from "@/lib/docs/search";
import { isLocale, locales } from "@/lib/i18n";

// Exported once per locale as a static file; the navbar palette and the search
// page fetch it lazily, so reading pages never carry the full-text index.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response(null, { status: 404 });
  const content = publicContent(await getContent());
  return Response.json(
    buildSearchIndex(content, locale).map(toPublicSearchDocument),
  );
}
