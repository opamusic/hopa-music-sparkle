import { useState, useEffect } from "react";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

const navLinks = [
  { label: "מי אנחנו", href: "#about" },
  { label: "DJs", href: "#djs" },
  { label: "Rona", href: "#rona" },
  { label: "שאלות", href: "#faq" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero">
          <img
            src={scrolled ? logoBlack : logoWhite}
            alt="הופה מוזיקה"
            className="h-10 md:h-12 transition-all duration-300"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              scrolled
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-white/20 text-primary-foreground backdrop-blur-sm border border-white/30 hover:bg-white/30"
            }`}
          >
            צור קשר
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-foreground" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-foreground" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-foreground" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-6 animate-scale-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-foreground text-lg font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-primary text-primary-foreground px-5 py-3 rounded-full text-center font-medium mt-2"
            >
              צור קשר
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
