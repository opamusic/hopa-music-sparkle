import { useScrollReveal } from "./useScrollReveal";
import { Music, Drum, Guitar } from "lucide-react";

const instruments = [
{ icon: Music, label: "סקסופון" },
{ icon: Drum, label: "ג'מבה" },
{ icon: Guitar, label: "גיטרה" }];


const RonaSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="rona" className="section-padding bg-background">
      <div ref={ref} className={`max-w-6xl mx-auto ${isVisible ? "" : "opacity-0"}`}>
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2 font-serif">RONA</h2>
          <p className="text-muted-foreground text-lg font-body">הרכב חופה וכסא כלה מבית OPA</p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className={`grid grid-cols-3 gap-6 md:gap-10 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`} style={{ animationDelay: "200ms" }}>
          {instruments.map(({ icon: Icon, label }, i) =>
          <div
            key={label}
            className="flex flex-col items-center gap-4 group"
            style={{ animationDelay: `${i * 100}ms` }}>
            
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                <Icon className="w-8 h-8 md:w-12 md:h-12 text-primary" />
              </div>
              <span className="font-body text-sm md:text-base text-muted-foreground font-medium">{label}</span>
            </div>
          )}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`} style={{ animationDelay: "400ms" }}>
          <p className="text-muted-foreground leading-relaxed font-body max-w-xl mx-auto">
            ההרכב מבית Opa שנוצר כדי ללוות את הרגעים הכי משמעותיים שלכם. שילוב מדויק של סקסופון, דג'מבה וגיטרה שנבנה בדיוק לפי הטעם והוויב שלכם מליווי אישי ומרגש בכסא הכלה והחופה, ועד מעטפת לייב-און-דיג'יי שמעיפה את הרחבה.
          
          </p>
        </div>
      </div>
    </section>);

};

export default RonaSection;