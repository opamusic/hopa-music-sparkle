import { useScrollReveal } from "./useScrollReveal";
import { Drum, Guitar, Music } from "lucide-react";
import ronaLogo from "@/assets/rona-logo.png";
import ronaBandPhoto from "@/assets/rona-band-photo.png";
import ronaHero from "@/assets/rona-hero.png";

interface RonaSectionProps {
  lang: "he" | "en";
}

const instrumentsByLang = {
  he: [
  { label: "סקסופון", icon: <Music className="w-8 h-8 md:w-12 md:h-12 text-primary" /> },
  { label: "דג'מבה", icon: <Drum className="w-8 h-8 md:w-12 md:h-12 text-primary" /> },
  { label: "גיטרה", icon: <Guitar className="w-8 h-8 md:w-12 md:h-12 text-primary" /> }],

  en: [
  { label: "Saxophone", icon: <Music className="w-8 h-8 md:w-12 md:h-12 text-primary" /> },
  { label: "Djembe", icon: <Drum className="w-8 h-8 md:w-12 md:h-12 text-primary" /> },
  { label: "Guitar", icon: <Guitar className="w-8 h-8 md:w-12 md:h-12 text-primary" /> }]

};

const copy = {
  he: "ההרכב מבית OPA שנוצר כדי ללוות את הרגעים הכי משמעותיים שלכם. שילוב מדויק של סקסופון, דג'מבה וגיטרה שנבנה בדיוק לפי הטעם והוויב שלכם – מליווי אישי ומרגש בכסא הכלה והחופה ועד מעטפת לייב-און-דיג'יי שמעיפה את הרחבה.",
  en: "OPA's in-house ensemble was created for your most meaningful moments. A precise blend of saxophone, djembe, and guitar tailored to your vibe—from emotional chuppah accompaniment to a full live-on-DJ experience that elevates the party."
};

const RonaSection = ({ lang }: RonaSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="rona" className="section-padding bg-background">
      <div ref={ref} className={`max-w-5xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden p-6 md:p-10 ${isVisible ? "" : "opacity-0"}`}>
        <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <img

            alt="RONA by OPA"
            className="h-72 md:h-[28rem] mx-auto object-fill text-4xl -mb-8 md:-mb-14" src={ronaHero} />
          
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
              <span className="font-body text-sm md:text-base text-muted-foreground font-medium text-center">
                {item.label}
              </span>
            </div>
          )}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}
          style={{ animationDelay: "400ms" }}>
          
          <p className="text-muted-foreground leading-relaxed font-body max-w-xl mx-auto">{copy[lang]}</p>
        </div>

        {/* Band photo strip */}
        <div
          className={`mt-12 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}
          style={{ animationDelay: "500ms" }}>
          
        <div className="overflow-hidden rounded-xl" style={{ boxShadow: "0 8px 24px -4px rgba(0,0,0,0.15)" }}>
            <img
              src={ronaBandPhoto}
              alt={lang === "he" ? "נגני רונה בהופעה" : "RONA musicians performing"}
              className="w-full h-40 md:h-56 object-cover object-center" />
            
          </div>
        </div>
      </div>
    </section>);

};

export default RonaSection;