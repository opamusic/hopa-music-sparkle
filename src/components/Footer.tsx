import logoBlack from "@/assets/logo-black.png";
import { Instagram } from "lucide-react";

interface FooterProps {
  lang: "he" | "en";
}

const Footer = ({ lang }: FooterProps) => {
  const copy = {
    he: {
      rights: "© כל הזכויות שמורות.",
      accessibility: "הצהרת נגישות",
    },
    en: {
      rights: "© All rights reserved.",
      accessibility: "Accessibility Statement",
    },
  };

  return (
    <footer className="py-12 px-6 bg-primary">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={logoBlack} alt="OPA Music Group" className="h-8 opacity-60" />

        <div className="flex items-center gap-5">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.89a8.27 8.27 0 004.76 1.52V7a4.84 4.84 0 01-1-.31z" /></svg>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
          </a>
        </div>

        <div className="text-center md:text-left text-sm text-muted-foreground font-body space-y-1">
          <p>© {new Date().getFullYear()} OPA Music Group. {copy[lang].rights}</p>
          <p><a href="#" className="hover:text-primary transition-colors">{copy[lang].accessibility}</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
