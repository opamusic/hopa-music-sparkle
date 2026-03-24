import { useScrollReveal } from "./useScrollReveal";
import { Drum, Guitar } from "lucide-react";
import ronaLogo from "@/assets/rona-logo.png";

interface RonaSectionProps {
  lang: "he" | "en";
}

const instrumentsByLang = {
  he: [
  {
    label: "כלי נשיפה",
    icon:
    <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-14 md:h-14 text-primary" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 34h34" />
          <path d="M42 34l11-7" />
          <path d="M42 34l11 7" />
          <path d="M19 34c0-7 4-12 10-12h7" />
          <circle cx="14" cy="34" r="6" />
          <path d="M52 24v20" />
          <path d="M56 26v16" />
        </svg>

  },
  { label: "ג'מבה", icon: <Drum className="w-8 h-8 md:w-12 md:h-12 text-primary" /> },
  { label: "גיטרה", icon: <Guitar className="w-8 h-8 md:w-12 md:h-12 text-primary" /> }],

  en: [
  {
    label: "Wind Instrument",
    icon:
    <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-14 md:h-14 text-primary" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 34h34" />
          <path d="M42 34l11-7" />
          <path d="M42 34l11 7" />
          <path d="M19 34c0-7 4-12 10-12h7" />
          <circle cx="14" cy="34" r="6" />
          <path d="M52 24v20" />
          <path d="M56 26v16" />
        </svg>

  },
  { label: "Djembe", icon: <Drum className="w-8 h-8 md:w-12 md:h-12 text-primary" /> },
  { label: "Guitar", icon: <Guitar className="w-8 h-8 md:w-12 md:h-12 text-primary" /> }]

};

const copy = {
  he: "ההרכב מבית OPA שנוצר כדי ללוות את הרגעים הכי משמעותיים שלכם. שילוב מדויק של כלי נשיפה, דג'מבה וגיטרה שנבנה בדיוק לפי הטעם והוויב שלכם – מליווי אישי ומרגש בכסא הכלה והחופה ועד מעטפת לייב-און-דיג'יי שמעיפה את הרחבה.",
  en: "OPA’s in-house ensemble was created for your most meaningful moments. A precise blend of wind instrument, djembe, and guitar tailored to your vibe—from emotional chuppah accompaniment to a full live-on-DJ experience that elevates the party."
};

const RonaSection = ({ lang }: RonaSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="rona" className="section-padding bg-background">
      <div ref={ref} className={`max-w-6xl mx-auto ${isVisible ? "" : "opacity-0"}`}>
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <img
            src={ronaLogo}
            alt="RONA by OPA"
            className="h-44 md:h-64 mx-auto object-fill text-4xl" />
          
        </div>

        <div
          className={`grid grid-cols-3 gap-6 md:gap-10 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}
          style={{ animationDelay: "200ms" }}>
          
          {instrumentsByLang[lang].map((item, i) =>
          <div
            key={item.label}
            className="flex flex-col items-center gap-4 group"
            style={{ animationDelay: `${i * 100}ms` }}>
            
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>
              <span className="font-body text-sm md:text-base text-muted-foreground font-medium text-center">{item.label}</span>
            </div>
          )}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}
          style={{ animationDelay: "400ms" }}>
          
          <p className="text-muted-foreground leading-relaxed font-body max-w-xl mx-auto">{copy[lang]}</p>
        </div>
      </div>
    </section>);

};

export default RonaSection;