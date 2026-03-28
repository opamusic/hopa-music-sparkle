import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import { X, Instagram } from "lucide-react";
import dj1 from "@/assets/dj1.jpg";
import dj2 from "@/assets/dj2.jpg";
import dj3 from "@/assets/dj3.jpg";
import sigIlay from "@/assets/sig-ilay.png";
import sigOri from "@/assets/sig-ori.png";
import sigItay from "@/assets/sig-itay.png";

interface DJ {
  name: string;
  image: string;
  bio: {
    he: string;
    en: string;
  };
  instagram: string;
  tiktok: string;
}

const djs: DJ[] = [
  {
    name: "ILAY ATTIAS",
    image: dj1,
    bio: {
      he: "אחרי עשור על העמדה, עילאי יודע בדיוק איך להדביק את כולם באנרגיה גבוהה ועריכות ייחודיות. הוא מייצר עבורכם מסיבה כזאת שכל האורחים ידברו עליה הרבה אחרי שהיא תיגמר.",
      en: "After a decade behind the decks, Ilay knows exactly how to get everyone hooked with high energy and unique edits. He creates the kind of party your guests will talk about long after it's over.",
    },
    instagram: "#",
    tiktok: "#",
  },
  {
    name: "ORI HOLLANDER",
    image: dj2,
    bio: {
      he: "עם רמיקסים בלעדיים ואנרגיה מטורפת, אורי כאן כדי להפוך את הרחבה שלכם למסיבה מטורפת שלא עוצרת. הוא מוודא שכל האורחים שלכם ירגישו את הטירוף הזה בכל רגע מחדש.",
      en: "With exclusive remixes and insane energy, Ori is here to turn your dancefloor into a non-stop party. He makes sure every guest feels the madness at every moment.",
    },
    instagram: "#",
    tiktok: "#",
  },
  {
    name: "ITAY ROZENGART",
    image: dj3,
    bio: {
      he: "איתי מגיע מעולם המועדונים ומביא את הוויב המדויק של הלילה ישר לחתונה שלכם. הוא יודע איך לייצר מסיבה מטורפת, כזו שגורמת לכל האורחים פשוט להיכנס לתוך המוזיקה וליהנות.",
      en: "Itay comes from the club scene and brings the exact nightlife vibe straight to your wedding. He knows how to create an insane party that pulls every guest into the music.",
    },
    instagram: "#",
    tiktok: "#",
  },
];

const djSignatures: Record<string, string> = {
  "ILAY ATTIAS": sigIlay,
  "ORI HOLLANDER": sigOri,
  "ITAY ROZENGART": sigItay,
};

interface DJsSectionProps {
  lang: "he" | "en";
}

const DJsSection = ({ lang }: DJsSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const [selectedDJ, setSelectedDJ] = useState<DJ | null>(null);
  const sectionTitle = "Our DJ's";
  const aboutLabel = lang === "he" ? "קצת על הדיג'יי" : "About the DJ";
  const closeLabel = lang === "he" ? "סגירה" : "Close";

  return (
    <>
      <section id="djs" className="section-padding bg-muted/30">
        <div ref={ref} className={`max-w-6xl mx-auto ${isVisible ? "" : "opacity-0"}`}>
          <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
            <h2 className="font-heading md:text-5xl text-foreground mb-2 text-4xl font-normal">{sectionTitle}</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Desktop: standard grid */}
          <div className="hidden md:grid grid-cols-3 gap-4">
            {djs.map((dj, i) => (
              <button
                key={dj.name}
                onClick={() => setSelectedDJ(dj)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
                  isVisible ? "animate-fade-up" : ""
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <img
                  src={dj.image}
                  alt={dj.name}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-heading text-2xl font-bold text-white">{dj.name}</h3>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile: vertical strips side by side */}
          <div className="flex md:hidden gap-1.5 h-[420px]">
            {djs.map((dj, i) => (
              <MobileStrip key={dj.name} dj={dj} index={i} isVisible={isVisible} onClick={() => setSelectedDJ(dj)} />
            ))}
          </div>
        </div>
      </section>

      {/* DJ Modal */}
      {selectedDJ && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedDJ(null)}
        >
          <div
            className="bg-card rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-in"
            style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.4)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedDJ.image}
                alt={selectedDJ.name}
                className="w-full aspect-[3/4] object-cover object-top"
              />
              {/* Stronger bottom gradient fade for readability */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-card from-20% via-card/80 via-45% to-transparent"
                style={{ top: "25%" }}
              />
              <button
                onClick={() => setSelectedDJ(null)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/90 transition-colors"
                aria-label={closeLabel}
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Overlaid content on faded area */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-3xl font-bold text-foreground mb-2">{selectedDJ.name}</h3>
                <p className="text-foreground font-body text-xs tracking-wide uppercase mb-1.5">{aboutLabel}</p>
                <p className="text-foreground leading-relaxed mb-4 font-body text-sm font-medium">{selectedDJ.bio[lang]}</p>
                <div className="flex items-center gap-4 mb-4">
                  <a href={selectedDJ.instagram} className="text-foreground/70 hover:text-primary transition-colors" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={selectedDJ.tiktok} className="text-foreground/70 hover:text-primary transition-colors" aria-label="TikTok">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.89a8.27 8.27 0 004.76 1.52V7a4.84 4.84 0 01-1-.31z" />
                    </svg>
                  </a>
                </div>
                {djSignatures[selectedDJ.name] && (
                  <img src={djSignatures[selectedDJ.name]} alt={`${selectedDJ.name} signature`} className="h-14 w-auto object-contain opacity-80" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MobileStrip = ({ dj, index, isVisible, onClick }: { dj: DJ; index: number; isVisible: boolean; onClick: () => void }) => {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={onClick}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 1500)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`relative overflow-hidden rounded-xl transition-all duration-500 ${
        isVisible ? "animate-fade-up" : ""
      } ${active ? "flex-[2]" : "flex-1"}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <img
        src={dj.image}
        alt={dj.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`} />
      <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h3 className="font-heading text-sm font-bold text-white leading-tight">{dj.name}</h3>
      </div>
    </button>
  );
};

export default DJsSection;
