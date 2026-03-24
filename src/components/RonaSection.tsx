import { useScrollReveal } from "./useScrollReveal";
import { Drum, Guitar } from "lucide-react";
import ronaLogo from "@/assets/rona-logo.png";

const instruments = [
  {
    icon: () => (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10 md:w-14 md:h-14 text-primary" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="18" cy="48" rx="10" ry="6" />
        <path d="M28 48V18" />
        <path d="M28 18 C28 18, 38 12, 38 6" />
        <path d="M28 24 C28 24, 40 18, 42 10" />
        <path d="M28 30 C28 30, 42 24, 46 14" />
        <rect x="26" y="14" width="4" height="4" rx="1" />
      </svg>
    ),
    label: "סקסופון",
  },
  { icon: Drum, label: "ג'מבה" },
  { icon: Guitar, label: "גיטרה" },
];

const RonaSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="rona" className="section-padding bg-background">
      <div ref={ref} className={`max-w-6xl mx-auto ${isVisible ? "" : "opacity-0"}`}>
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <img
            src={ronaLogo}
            alt="רונה - להקת חתונות מבית OPA"
            className="h-24 md:h-32 mx-auto object-contain"
          />
        </div>

        <div
          className={`grid grid-cols-3 gap-6 md:gap-10 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}
          style={{ animationDelay: "200ms" }}
        >
          {instruments.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center gap-4 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <Icon className="w-8 h-8 md:w-12 md:h-12 text-primary" />
              </div>
              <span className="font-body text-sm md:text-base text-muted-foreground font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}
          style={{ animationDelay: "400ms" }}
        >
          <p className="text-muted-foreground leading-relaxed font-body max-w-xl mx-auto">
            ההרכב מבית Opa שנוצר כדי ללוות את הרגעים הכי משמעותיים שלכם. שילוב מדויק של סקסופון, דג'מבה וגיטרה שנבנה בדיוק לפי הטעם והוויב שלכם מליווי אישי ומרגש בכסא הכלה והחופה, ועד מעטפת לייב-און-דיג'יי שמעיפה את הרחבה.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RonaSection;
