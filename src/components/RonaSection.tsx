import { useScrollReveal } from "./useScrollReveal";
import ronaBand from "@/assets/rona-band.jpg";

const RonaSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="rona" className="section-padding bg-background">
      <div ref={ref} className={`max-w-6xl mx-auto ${isVisible ? "" : "opacity-0"}`}>
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">RONA</h2>
          <p className="text-muted-foreground text-lg font-body">להקת הבית של הופה</p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className={`grid md:grid-cols-2 gap-10 items-center transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`} style={{ animationDelay: "200ms" }}>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={ronaBand}
              alt="להקת רונא - להקת הבית של הופה"
              loading="lazy"
              width={1280}
              height={720}
              className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="font-body">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">הרכב חי. רגש אמיתי.</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              רונא היא להקת החתונות של הופה — הרכב מוזיקלי חי שמביא את האנרגיה, הרגש והשמחה לכל רגע באירוע.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              מטקס החופה ועד כסא כלה, הלהקה שלנו יודעת להתאים את עצמה לכל רגע — עם רפרטואר עשיר שכולל מזרחית, פופ, רוק ושירי נשמה.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              כי כשמשלבים די-ג'יי מטורף עם להקה חיה — קורה קסם.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RonaSection;
