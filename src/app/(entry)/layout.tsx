import "@/styles/base.css";

export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
