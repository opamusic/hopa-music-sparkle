import { useEffect, useRef, useState } from "react";
import { Accessibility, X, Type, Contrast, Link2, Pause, RotateCcw } from "lucide-react";
import { useAccessibilityPrefs } from "@/hooks/useAccessibilityPrefs";

interface AccessibilityWidgetProps {
  lang: "he" | "en";
  onOpenStatement: () => void;
}

const copy = {
  he: {
    openLabel: "פתיחת תפריט נגישות",
    closeLabel: "סגירת תפריט נגישות",
    title: "אפשרויות נגישות",
    fontSize: "גודל טקסט",
    increase: "הגדלת טקסט",
    decrease: "הקטנת טקסט",
    highContrast: "ניגודיות גבוהה",
    highlightLinks: "הדגשת קישורים",
    pauseMotion: "עצירת אנימציות",
    reset: "איפוס הגדרות",
    statement: "הצהרת נגישות",
    on: "מופעל",
    off: "כבוי",
  },
  en: {
    openLabel: "Open accessibility menu",
    closeLabel: "Close accessibility menu",
    title: "Accessibility options",
    fontSize: "Text size",
    increase: "Increase text",
    decrease: "Decrease text",
    highContrast: "High contrast",
    highlightLinks: "Highlight links",
    pauseMotion: "Pause animations",
    reset: "Reset settings",
    statement: "Accessibility statement",
    on: "On",
    off: "Off",
  },
};

const AccessibilityWidget = ({ lang, onOpenStatement }: AccessibilityWidgetProps) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const labels = copy[lang];

  const {
    prefs,
    increaseFont,
    decreaseFont,
    toggleHighContrast,
    toggleHighlightLinks,
    togglePauseMotion,
    reset,
  } = useAccessibilityPrefs();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  // WhatsApp button is always on right-6 — place widget on left-6 in both languages
  // to avoid overlap.
  const side = "left-6";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={labels.openLabel}
        aria-expanded={open}
        aria-controls="a11y-panel"
        className={`fixed bottom-6 ${side} z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}
        style={{ boxShadow: "0 4px 14px rgba(195,35,105,0.4)" }}
      >
        <Accessibility className="w-7 h-7" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="a11y-panel-title"
          dir={lang === "he" ? "rtl" : "ltr"}
          className={`fixed bottom-24 ${side} z-50 w-[min(340px,calc(100vw-2rem))] max-h-[70vh] overflow-y-auto rounded-2xl bg-card text-card-foreground shadow-2xl p-5 border border-border`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 id="a11y-panel-title" className="font-heading text-lg font-bold">
              {labels.title}
            </h2>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label={labels.closeLabel}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-2">
            <fieldset>
              <legend className="font-body text-sm font-semibold mb-2 flex items-center gap-2">
                <Type className="w-4 h-4" aria-hidden="true" />
                {labels.fontSize}
              </legend>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={decreaseFont}
                  disabled={prefs.fontSize === "normal"}
                  aria-label={labels.decrease}
                  className="flex-1 py-2 rounded-lg bg-muted hover:bg-muted/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-body font-semibold"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={increaseFont}
                  disabled={prefs.fontSize === "xl"}
                  aria-label={labels.increase}
                  className="flex-1 py-2 rounded-lg bg-muted hover:bg-muted/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-body font-semibold"
                >
                  A+
                </button>
              </div>
            </fieldset>

            <ToggleButton
              icon={<Contrast className="w-4 h-4" aria-hidden="true" />}
              label={labels.highContrast}
              pressed={prefs.highContrast}
              onToggle={toggleHighContrast}
              stateLabel={prefs.highContrast ? labels.on : labels.off}
            />
            <ToggleButton
              icon={<Link2 className="w-4 h-4" aria-hidden="true" />}
              label={labels.highlightLinks}
              pressed={prefs.highlightLinks}
              onToggle={toggleHighlightLinks}
              stateLabel={prefs.highlightLinks ? labels.on : labels.off}
            />
            <ToggleButton
              icon={<Pause className="w-4 h-4" aria-hidden="true" />}
              label={labels.pauseMotion}
              pressed={prefs.pauseMotion}
              onToggle={togglePauseMotion}
              stateLabel={prefs.pauseMotion ? labels.on : labels.off}
            />

            <button
              type="button"
              onClick={reset}
              className="w-full mt-3 py-2 rounded-lg bg-muted hover:bg-muted/70 transition-colors font-body text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              {labels.reset}
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOpenStatement();
              }}
              className="w-full mt-2 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-body text-sm font-semibold"
            >
              {labels.statement}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

interface ToggleButtonProps {
  icon: React.ReactNode;
  label: string;
  pressed: boolean;
  onToggle: () => void;
  stateLabel: string;
}

const ToggleButton = ({ icon, label, pressed, onToggle, stateLabel }: ToggleButtonProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={pressed}
    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg transition-colors font-body text-sm ${
      pressed ? "bg-primary/10 text-foreground" : "bg-muted hover:bg-muted/70"
    }`}
  >
    <span className="flex items-center gap-2">
      {icon}
      {label}
    </span>
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center min-w-10 h-6 px-2 rounded-full text-xs font-semibold ${
        pressed
          ? "bg-primary text-primary-foreground"
          : "bg-background text-muted-foreground border border-border"
      }`}
    >
      {stateLabel}
    </span>
  </button>
);

export default AccessibilityWidget;
