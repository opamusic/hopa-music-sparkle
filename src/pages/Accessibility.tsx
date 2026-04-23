import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import AccessibilityStatementContent from "@/components/AccessibilityStatementContent";
import type { SiteLanguage } from "./Index";

const AccessibilityPage = () => {
  const [lang, setLang] = useState<SiteLanguage>(() => {
    const stored = typeof document !== "undefined" ? document.documentElement.lang : "he";
    return stored === "en" ? "en" : "he";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    document.title =
      lang === "he"
        ? "הצהרת נגישות | OPA Music Group"
        : "Accessibility Statement | OPA Music Group";
  }, [lang]);

  const t = {
    he: { title: "הצהרת נגישות", back: "חזרה לעמוד הראשי", switch: "English" },
    en: { title: "Accessibility Statement", back: "Back to home", switch: "עברית" },
  }[lang];

  const BackIcon = lang === "he" ? ArrowRight : ArrowLeft;

  return (
    <main
      id="main-content"
      dir={lang === "he" ? "rtl" : "ltr"}
      className="min-h-screen bg-background py-16 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline font-body"
          >
            <BackIcon className="w-4 h-4" aria-hidden="true" />
            {t.back}
          </Link>
          <button
            type="button"
            onClick={() => setLang((p) => (p === "he" ? "en" : "he"))}
            className="text-sm font-body text-muted-foreground hover:text-primary underline"
          >
            {t.switch}
          </button>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
          {t.title}
        </h1>

        <AccessibilityStatementContent lang={lang} />
      </div>
    </main>
  );
};

export default AccessibilityPage;
