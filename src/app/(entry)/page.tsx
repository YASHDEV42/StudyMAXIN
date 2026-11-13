import Link from "next/link";
import { routes } from "@/lib/routes";

// Static language entry; Phase 3 may replace this as part of the landing experience.
export default function Entry() {
  return (
    <main className="entry">
      <h1 lang="en">StudyLike Genius</h1>
      <nav aria-label="Dil / اللغة">
        <Link href={routes.home("tr")} lang="tr">
          Türkçe
        </Link>
        <Link href={routes.home("ar")} lang="ar" dir="rtl">
          العربية
        </Link>
      </nav>
    </main>
  );
}
