import { Link } from "react-router-dom";
import logoBlack from "@/assets/logo-black.png";
import { Instagram } from "lucide-react";

interface FooterProps {
  lang: "he" | "en";
  onAccessibilityClick?: () => void;
}

const Footer = ({ lang, onAccessibilityClick }: FooterProps) => {
  const copy = {
    he: {
      rights: "© כל הזכויות שמורות.",
      accessibility: "הצהרת נגישות",
      instagramLabel: "הפרופיל שלנו באינסטגרם — נפתח בכרטיסייה חדשה",
      openWidget: "תפריט נגישות",
    },
    en: {
      rights: "© All rights reserved.",
      accessibility: "Accessibility Statement",
      instagramLabel: "Our Instagram profile — opens in new tab",
      openWidget: "Accessibility menu",
    },
  };

  return (
    <footer className="py-12 px-6" style={{ background: "#c32369" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">

          <img src={logoBlack} alt="OPA Music Group" className="h-8 opacity-80" style={{ filter: "brightness(0) invert(1)" }} />

          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/opamusic.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white transition-colors"
              aria-label={copy[lang].instagramLabel}
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
          {/* TODO: User to provide TikTok + Facebook URLs. Hidden from a11y tree until then. */}
        </div>

        <div className="text-center md:text-left text-sm text-white/90 font-body space-y-1">
          <p>© {new Date().getFullYear()} OPA Music Group. {copy[lang].rights}</p>
          <p className="space-x-2 rtl:space-x-reverse">
            <Link to="/accessibility" className="underline hover:text-white transition-colors">
              {copy[lang].accessibility}
            </Link>
            {onAccessibilityClick && (
              <>
                <span aria-hidden="true"> · </span>
                <button
                  type="button"
                  onClick={onAccessibilityClick}
                  className="underline hover:text-white transition-colors cursor-pointer"
                >
                  {copy[lang].openWidget}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
