import { useCallback, useEffect, useState } from "react";

export type FontSize = "normal" | "lg" | "xl";

export interface AccessibilityPrefs {
  fontSize: FontSize;
  highContrast: boolean;
  highlightLinks: boolean;
  pauseMotion: boolean;
}

const STORAGE_KEY = "opa_a11y_prefs_v1";

const DEFAULT_PREFS: AccessibilityPrefs = {
  fontSize: "normal",
  highContrast: false,
  highlightLinks: false,
  pauseMotion: false,
};

const loadPrefs = (): AccessibilityPrefs => {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<AccessibilityPrefs>;
    return { ...DEFAULT_PREFS, ...parsed };
  } catch {
    return DEFAULT_PREFS;
  }
};

const applyPrefsToDocument = (prefs: AccessibilityPrefs) => {
  const html = document.documentElement;
  html.classList.remove("a11y-font-lg", "a11y-font-xl");
  if (prefs.fontSize === "lg") html.classList.add("a11y-font-lg");
  if (prefs.fontSize === "xl") html.classList.add("a11y-font-xl");
  html.classList.toggle("a11y-high-contrast", prefs.highContrast);
  html.classList.toggle("a11y-highlight-links", prefs.highlightLinks);
  html.classList.toggle("a11y-pause-motion", prefs.pauseMotion);
};

export const useAccessibilityPrefs = () => {
  const [prefs, setPrefs] = useState<AccessibilityPrefs>(() => loadPrefs());

  useEffect(() => {
    applyPrefsToDocument(prefs);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* storage unavailable — apply in-memory only */
    }
  }, [prefs]);

  const increaseFont = useCallback(() => {
    setPrefs((p) => ({
      ...p,
      fontSize: p.fontSize === "normal" ? "lg" : "xl",
    }));
  }, []);

  const decreaseFont = useCallback(() => {
    setPrefs((p) => ({
      ...p,
      fontSize: p.fontSize === "xl" ? "lg" : "normal",
    }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setPrefs((p) => ({ ...p, highContrast: !p.highContrast }));
  }, []);

  const toggleHighlightLinks = useCallback(() => {
    setPrefs((p) => ({ ...p, highlightLinks: !p.highlightLinks }));
  }, []);

  const togglePauseMotion = useCallback(() => {
    setPrefs((p) => ({ ...p, pauseMotion: !p.pauseMotion }));
  }, []);

  const reset = useCallback(() => {
    setPrefs(DEFAULT_PREFS);
  }, []);

  return {
    prefs,
    increaseFont,
    decreaseFont,
    toggleHighContrast,
    toggleHighlightLinks,
    togglePauseMotion,
    reset,
  };
};
