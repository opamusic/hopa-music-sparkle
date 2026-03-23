import { useScrollReveal } from "./useScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "למה דווקא הופה?",
    items: [
      {
        q: "מה מבדיל את הופה מדי-ג'ייז אחרים?",
        a: "אנחנו לא רק שמים מוזיקה — אנחנו יוצרים חוויה. כל די-ג'יי בהופה עובר תהליך מקצועי, ואנחנו מתאימים את הסגנון המוזיקלי בדיוק לזוג ולאירוע.",
      },
      {
        q: "האם אתם מתאימים גם לאירועים קטנים?",
        a: "בהחלט! אנחנו מאמינים שכל אירוע ראוי לחוויה מטורפת, בין אם מדובר ב-50 או 500 אורחים.",
      },
      {
        q: "מה כולל חבילת הופה?",
        a: "כל חבילה כוללת פגישת תיאום, התאמה מוזיקלית מלאה, ציוד סאונד ותאורה מקצועי, ואת האנרגיה האינסופית שלנו.",
      },
    ],
  },
  {
    title: "שאלות טכניות",
    items: [
      {
        q: "כמה זמן מראש צריך להזמין?",
        a: "אנחנו ממליצים לפחות 3-6 חודשים מראש, במיוחד בעונת החתונות. אבל תמיד שווה לשאול — לפעמים יש הפתעות.",
      },
      {
        q: "האם אתם מביאים ציוד סאונד ותאורה?",
        a: "כן! אנחנו מגיעים עם ציוד מקצועי שמותאם לגודל האירוע ולמקום. הכל כלול.",
      },
      {
        q: "איך נראית פגישת התיאום?",
        a: "פגישה אישית (או זום) שבה אנחנו מכירים אתכם, מבינים את הסגנון שלכם, ובונים יחד את המסע המוזיקלי של האירוע.",
      },
    ],
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="faq" className="section-padding bg-muted/30">
      <div ref={ref} className={`max-w-3xl mx-auto ${isVisible ? "" : "opacity-0"}`}>
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">שואלים אותנו</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className={`space-y-10 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`} style={{ animationDelay: "200ms" }}>
          {faqCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">{cat.title}</h3>
              <Accordion type="single" collapsible className="space-y-2">
                {cat.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${cat.title}-${i}`}
                    className="bg-card rounded-xl border-none px-5 shadow-sm"
                  >
                    <AccordionTrigger className="text-right font-body font-medium text-foreground hover:text-primary hover:no-underline py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
