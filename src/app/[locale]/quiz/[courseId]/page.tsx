import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitch } from "@/components/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { QuizTrainer } from "@/components/quiz/trainer";
import { isLocale } from "@/lib/i18n";
import { loadQuizBank } from "@/lib/quiz/load";
import { quizMessages } from "@/lib/quiz/messages";
import { routes } from "@/lib/routes";
import "@/styles/quiz.css";

type Props = { params: Promise<{ locale: string; courseId: string }> };

export function generateStaticParams() {
  return [
    { locale: "tr", courseId: "database-management" },
    { locale: "ar", courseId: "database-management" },
  ];
}

export async function generateMetadata({ params }: Props) {
  const { locale, courseId } = await params;
  if (!isLocale(locale) || courseId !== "database-management") notFound();
  return {
    title:
      locale === "tr"
        ? "Veritabanı Yönetim Sistemleri Soru Bankası"
        : "بنك أسئلة نظم إدارة قواعد البيانات",
    description: quizMessages[locale].intro,
  };
}

export default async function DatabaseQuizPage({ params }: Props) {
  const { locale, courseId } = await params;
  if (!isLocale(locale) || courseId !== "database-management") notFound();
  const bank = await loadQuizBank(undefined, undefined, courseId);
  return (
    <div className="quiz-shell">
      <header className="quiz-header">
        <div className="quiz-header-inner">
          <Link className="quiz-brand" href={routes.home(locale)}>
            <bdi lang="en" dir="ltr">
              Study<em>MAXIN</em>
            </bdi>
          </Link>
          <Link className="quiz-docs" href={`/${locale}/quiz/`}>
            {locale === "tr"
              ? "İşletim Sistemleri testi"
              : "اختبار نظم التشغيل"}
          </Link>
          <Link className="quiz-docs" href={routes.docs(locale)}>
            {quizMessages[locale].docs}
          </Link>
          <div className="quiz-preferences">
            <LanguageSwitch locale={locale} />
            <ThemeToggle locale={locale} />
          </div>
        </div>
      </header>
      <QuizTrainer locale={locale} bank={bank} />
    </div>
  );
}
