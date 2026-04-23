interface AccessibilityStatementContentProps {
  lang?: "he" | "en";
}

const AccessibilityStatementContent = ({ lang = "he" }: AccessibilityStatementContentProps) => {
  if (lang === "en") {
    return (
      <div className="font-body text-foreground/90 text-sm leading-relaxed space-y-4" dir="ltr">
        <p>
          OPA Music Group is committed to making its website accessible to people with
          disabilities, in accordance with the Equal Rights for Persons with Disabilities
          Regulations (Service Accessibility Adjustments), 5773-2013, and the Israeli standard
          IS 5568 based on WCAG 2.0 Level AA.
        </p>

        <h3 className="font-heading text-lg font-semibold text-foreground">Accessibility adjustments made</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Compatibility with screen readers and assistive technologies.</li>
          <li>Alternative text (alt) on all meaningful images.</li>
          <li>Sufficient color contrast between text and background (WCAG AA).</li>
          <li>Full keyboard navigation, visible focus indicator, and skip-to-content link.</li>
          <li>Semantic HTML structure with proper heading hierarchy.</li>
          <li>Responsive layout for mobile, tablet, and desktop.</li>
          <li>Accessible dialogs with focus management and Escape-to-close.</li>
          <li>Support for the OS "reduce motion" preference.</li>
          <li>Accessibility widget for font-size, high contrast, link highlighting, and animation pausing.</li>
        </ul>

        <h3 className="font-heading text-lg font-semibold text-foreground">Known limitations</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Third-party embedded content (Instagram, TikTok, WhatsApp) is provided by the
            platforms themselves and may not fully meet AA requirements.
          </li>
          <li>
            Some decorative animations may remain visible when OS reduce-motion is not set;
            you can disable them from our accessibility widget.
          </li>
        </ul>

        <h3 className="font-heading text-lg font-semibold text-foreground">Accessibility coordinator</h3>
        <p>If you encounter any accessibility issue, please contact us:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Phone:{" "}
            <a href="tel:+972559899791" className="underline hover:text-primary">
              +972 55-989-9791
            </a>
          </li>
          <li>
            Email:{" "}
            <a
              href="mailto:opadjs.il@gmail.com?subject=Accessibility%20inquiry"
              className="underline hover:text-primary"
            >
              opadjs.il@gmail.com
            </a>
          </li>
        </ul>

        <h3 className="font-heading text-lg font-semibold text-foreground">Statement dates</h3>
        <p>Initial accessibility: April 2026 · Last updated: April 2026.</p>

        <p className="text-foreground/60 text-xs mt-6">
          We continuously work to improve accessibility and keep the site aligned with
          evolving standards. If you experience difficulty, please contact us and we will
          address the issue as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <div className="font-body text-foreground/90 text-sm leading-relaxed space-y-4" dir="rtl">
      <p>
        חברת OPA Music Group מחויבת להנגשת האתר לאנשים עם מוגבלויות, בהתאם ל
        <strong>חוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998</strong> ול
        <strong>תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013</strong>
        , ובהתאם ל<strong>תקן הישראלי ת"י 5568</strong> המבוסס על הנחיות <strong>WCAG 2.0 ברמה AA</strong>.
      </p>

      <h3 className="font-heading text-lg font-semibold text-foreground">פעולות שבוצעו להנגשת האתר</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>התאמת האתר לשימוש עם קוראי מסך ותוכנות מסייעות.</li>
        <li>הוספת טקסט חלופי (alt) לכל התמונות המשמעותיות באתר.</li>
        <li>הבטחת ניגודיות צבעים בין טקסט לרקע ברמת AA (יחס של 4.5:1 לפחות).</li>
        <li>ניווט מלא באמצעות מקלדת בלבד, כולל סמן מיקוד גלוי וקישור דילוג לתוכן.</li>
        <li>שימוש בכותרות היררכיות ותגיות סמנטיות לשיפור מבנה העמוד.</li>
        <li>התאמה לתצוגה במכשירים ניידים, טאבלטים ומסכי מחשב.</li>
        <li>חלונות מודאליים נגישים עם ניהול מיקוד וסגירה במקש Escape.</li>
        <li>תמיכה בהעדפת מערכת ההפעלה לצמצום אנימציות (prefers-reduced-motion).</li>
        <li>וידג'ט נגישות: הגדלת/הקטנת טקסט, מצב ניגודיות גבוהה, הדגשת קישורים ועצירת אנימציות.</li>
      </ul>

      <h3 className="font-heading text-lg font-semibold text-foreground">מגבלות נגישות ידועות</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>
          תוכן מוטמע מצד שלישי (אינסטגרם, טיקטוק, וואטסאפ) מסופק על ידי הפלטפורמות עצמן ואינו
          בהכרח עומד במלוא דרישות התקן.
        </li>
        <li>
          אנימציות עיטוריות מסוימות עשויות להיוותר גלויות כאשר לא הוגדרה העדפת "צמצום תנועה"
          במערכת ההפעלה — ניתן לבטלן דרך וידג'ט הנגישות באתר.
        </li>
      </ul>

      <h3 className="font-heading text-lg font-semibold text-foreground">רכז הנגישות</h3>
      <p>
        אחראי על הנגשת האתר: <strong>צוות OPA Music Group</strong>. אם נתקלתם בבעיית נגישות
        או שיש לכם הצעות לשיפור, נשמח לשמוע מכם:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>
          טלפון:{" "}
          <a href="tel:+972559899791" className="underline hover:text-primary" dir="ltr">
            +972 55-989-9791
          </a>
        </li>
        <li>
          דוא"ל:{" "}
          <a
            href="mailto:opadjs.il@gmail.com?subject=%D7%A4%D7%A0%D7%99%D7%99%D7%94%20%D7%91%D7%A0%D7%95%D7%A9%D7%90%20%D7%A0%D7%92%D7%99%D7%A9%D7%95%D7%AA"
            className="underline hover:text-primary"
          >
            opadjs.il@gmail.com
          </a>
        </li>
      </ul>
      <p className="text-foreground/70 text-xs">
        אנו מחויבים להשיב לפניות בנושאי נגישות בתוך זמן סביר ולפעול לתיקון ליקויים בהקדם.
      </p>

      <h3 className="font-heading text-lg font-semibold text-foreground">תאריכי ההצהרה</h3>
      <p>תאריך ההנגשה הראשוני: אפריל 2026 · עדכון אחרון: אפריל 2026.</p>

      <p className="text-foreground/60 text-xs mt-6">
        אנו פועלים באופן שוטף לשיפור הנגישות באתר ולהתאמתו לתקנים המתעדכנים. אם נתקלתם בקושי
        כלשהו, אנא צרו עמנו קשר ונפעל לטפל בכך בהקדם.
      </p>
    </div>
  );
};

export default AccessibilityStatementContent;
