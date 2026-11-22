import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitch } from "@/components/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { QuizTrainer } from "@/components/quiz/trainer";
import { isLocale } from "@/lib/i18n";
import { getQuizBank } from "@/lib/quiz";
import { quizMessages } from "@/lib/quiz/messages";
import { routes } from "@/lib/routes";
import "@/styles/quiz.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: quizMessages[locale].title,
    description: quizMessages[locale].intro,
  };
}

export default async function QuizPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const bank = await getQuizBank();
  return (
    <div className="quiz-shell">
      <header className="quiz-header">
        <div className="quiz-header-inner">
          <Link className="quiz-brand" href={routes.home(locale)}>
            <bdi lang="en" dir="ltr">
              Study<em>MAXIN</em>
            </bdi>
          </Link>
          <Link
            className="quiz-docs"
            href={`/${locale}/quiz/database-management/`}
          >
            {locale === "tr" ? "Veritabanı testi" : "اختبار قواعد البيانات"}
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
