import { fontVariables } from "@/fonts";
import { themeScript } from "@/lib/theme";
import "@/styles/base.css";

export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // data-theme is set before paint by themeScript, so React must not reconcile it.
    <html
      lang="tr"
      dir="ltr"
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
