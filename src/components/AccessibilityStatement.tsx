import { X } from "lucide-react";

interface AccessibilityStatementProps {
  open: boolean;
  onClose: () => void;
}

const AccessibilityStatement = ({ open, onClose }: AccessibilityStatementProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-scale-in p-8"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">הצהרת נגישות</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            aria-label="סגירה"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="font-body text-foreground/90 text-sm leading-relaxed space-y-4">
          <p>
            חברת OPA Music Group מחויבת להנגשת האתר לאנשים עם מוגבלויות, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ובהתאם לתקן הישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.0 ברמה AA.
          </p>

          <h3 className="font-heading text-lg font-semibold text-foreground">פעולות שבוצעו להנגשת האתר</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>התאמת האתר לשימוש עם קוראי מסך ותוכנות מסייעות.</li>
            <li>הוספת טקסט חלופי (alt text) לתמונות באתר.</li>
            <li>הבטחת ניגודיות צבעים מספקת בין טקסט לרקע.</li>
            <li>אפשרות ניווט באתר באמצעות מקלדת בלבד.</li>
            <li>שימוש בכותרות היררכיות לשיפור המבנה הסמנטי.</li>
            <li>התאמת האתר לתצוגה במכשירים ניידים וטאבלטים.</li>
          </ul>

          <h3 className="font-heading text-lg font-semibold text-foreground">דרכי יצירת קשר בנושא נגישות</h3>
          <p>
            אם נתקלתם בבעיית נגישות באתר או שיש לכם הצעות לשיפור, נשמח לשמוע מכם. ניתן לפנות אלינו באמצעות:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>טלפון: 050-1234567</li>
            <li>דוא"ל: info@opamusic.co.il</li>
          </ul>

          <h3 className="font-heading text-lg font-semibold text-foreground">תאריך עדכון ההצהרה</h3>
          <p>הצהרה זו עודכנה לאחרונה בתאריך מרץ 2026.</p>

          <p className="text-foreground/60 text-xs mt-6">
            * אנו פועלים באופן שוטף לשיפור הנגישות באתר ולהתאמתו לתקנים המתעדכנים. אם נתקלתם בקושי כלשהו, אנא צרו עמנו קשר ונפעל לטפל בכך בהקדם.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityStatement;
