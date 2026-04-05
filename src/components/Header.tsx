import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

interface HeaderProps {
  lang: "he" | "en";
  onToggleLanguage: () => void;
}

const navLinks = {
  he: [
    { label: "About Us", href: "#about" },
    { label: "DJs", href: "#djs" },
    { label: "Your Love", href: "#yourlove" },
    { label: "Rona", href: "#rona" },
    { label: "שאלות", href: "#faq" },
  ],
  en: [
    { label: "About Us", href: "#about" },
    { label: "DJs", href: "#djs" },
    { label: "Your Love", href: "#yourlove" },
    { label: "Rona", href: "#rona" },
    { label: "FAQ", href: "#faq" },
  ],
};

const Header = ({ lang, onToggleLanguage }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const ctaLabel = lang === "he" ? "צור קשר" : "Contact Us";
  const languageLabel = lang === "he" ? "החלפת שפה" : "Switch language";
  const menuLabel = lang === "he" ? "פתיחת תפריט" : "Toggle menu";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")}>
          <img
            src={scrolled ? logoBlack : logoWhite}
            alt="הופה מוזיקה"
            className="h-10 md:h-12 transition-all duration-300"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks[lang].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              scrolled
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-white/20 text-primary-foreground backdrop-blur-sm border border-white/30 hover:bg-white/30"
            }`}
          >
            {ctaLabel}
          </a>
          <button
            onClick={onToggleLanguage}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 hover:text-primary ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
            aria-label={languageLabel}
          >
            <Globe className="w-4 h-4" />
            <span>{lang === "he" ? "EN" : "עב"}</span>
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onToggleLanguage}
            className={`flex items-center gap-1 text-xs font-medium ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
            aria-label={languageLabel}
          >
            <Globe className="w-4 h-4" />
            <span>{lang === "he" ? "EN" : "עב"}</span>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col gap-1.5 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
            aria-label={menuLabel}
          >
            <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-foreground" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-foreground" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-foreground" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-6 animate-scale-in">
          <nav className="flex flex-col gap-4">
            {navLinks[lang].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-foreground text-lg font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="bg-primary text-primary-foreground px-5 py-3 rounded-full text-center font-medium mt-2"
            >
              {ctaLabel}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
