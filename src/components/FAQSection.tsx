import { useScrollReveal } from "./useScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  lang: "he" | "en";
}

const faqItems = {
  he: [
    {
      q: "איך מתבצעת בחירת המוזיקה? אנחנו חלק מהתהליך?",
      a: "חד משמעית כן. האירוע הוא שלכם, והקו המוזיקלי חייב לשקף את הטעם האישי שלכם. כחלק מהתהליך נקיים פגישת תיאום מוזיקלי מעמיקה, בה נגדיר יחד את הסגנונות המועדפים, נבנה את האווירה לכל שלב בערב (קבלת פנים, חופה ומסיבה), ונדייק את הפלייליסט כך שתרגישו הכי בנוח על הרחבה.",
    },
    {
      q: "אנחנו זוג דתי/מסורתי וחשוב לנו שהמסיבה תהיה מטורפת. זה משתלב?",
      a: "זה לא רק משתלב, זה ה-DNA של Opa. המומחיות שלנו היא בדיוק בנקודת החיבור הזו – יצירת איזון מושלם בין עולמות. אנחנו יודעים לתת את המקום המכובד למסורת ולמוזיקה היהודית/חסידית, ולבצע מעבר חלק וטבעי למסיבת מיינסטרים עדכנית ואנרגטית. המטרה שלנו היא שכל האורחים שלכם ירגישו חלק מהחגיגה, בלי פשרות על הרמה המוזיקלית.",
    },
    {
      q: "מה היתרון בשילוב של להקה בקבלת הפנים והחופה?",
      a: 'זה השילוב שמעניק לכם פתרון שלם ומנצח. הלהקה (בין אם זו להקת "כיסא כלה וחופה" או הרכבים שאנחנו עובדים איתם) מספקת מענה חי, מרגש ואותנטי ברגעים המרגשים של תחילת הערב. מיד לאחר מכן, ה-DJ שלנו נכנס לעמדה כדי להרים את האנרגיה למקסימום. אתם נהנים מכל העולמות – לייב מרגש בהתחלה, ומסיבת DJ מדויקת ומקפיצה בהמשך.',
    },
    {
      q: "אפשר להעביר רשימת שירים ספציפיים?",
      a: 'בוודאי. אנחנו מאוד אוהבים לקבל מהזוגות שלנו רשימת שירים שהם אוהבים במיוחד - זה ה"מצפן" שלנו להבנת הטעם שלכם לעומק. במהלך האירוע נשלב את הבקשות שלכם תוך קריאת הקהל בזמן אמת, כדי להבטיח שהרחבה תישאר מלאה והאנרגיה תהיה בשיא.',
    },
    {
      q: "איך משריינים איתנו את התאריך?",
      a: "הכל מתחיל בשיחת היכרות קצרה כדי להרגיש את ה-Vibe ולהבין את אופי האירוע שלכם. לאחר מכן נשלח הצעת מחיר מסודרת, ולאחר סגירת התאריך נתאם את פגישת המוזיקה שבה נצלול לפרטים הקטנים ונתכנן את הערב המושלם עבורכם.",
    },
    {
      q: "האם יש הגבלה של שעות?",
      a: "ב-Opa אין הגבלת שעות. אנחנו מלווים אתכם מהרגע הראשון ועד שאחרון הרוקדים. אנחנו שם כדי לתת את הערב הכי שמח שיש.",
    },
    {
      q: "היכן אתם עובדים בארץ?",
      a: "אנחנו מגיעים לכל מקום שבו יש רחבה להעיף אתכם!",
    },
  ],
  en: [
    {
      q: "How does the music selection work? Are we part of the process?",
      a: "Absolutely yes. It's your event, and the musical direction must reflect your personal taste. As part of the process, we hold an in-depth music coordination meeting where we define preferred styles together, build the atmosphere for each stage of the evening (cocktail hour, ceremony, and party), and fine-tune the playlist so you feel completely comfortable on the dance floor.",
    },
    {
      q: "We're a religious/traditional couple and want an amazing party. Does that work?",
      a: "It doesn't just work — it's Opa's DNA. Our expertise is exactly at this connection point — creating a perfect balance between worlds. We know how to give proper respect to tradition and Jewish/Hasidic music, and make a smooth, natural transition to an up-to-date, energetic mainstream party. Our goal is for all your guests to feel part of the celebration, without compromising on musical quality.",
    },
    {
      q: "What's the advantage of combining a band for the cocktail hour and ceremony?",
      a: "It's the combination that gives you a complete winning solution. The band provides a live, emotional, and authentic experience during the touching moments at the start of the evening. Right after, our DJ takes the stage to push the energy to the max. You enjoy the best of both worlds — an emotional live start, and a precise, pumping DJ party to follow.",
    },
    {
      q: "Can we submit a specific song list?",
      a: "Of course. We love receiving song lists from our couples — it's our compass for understanding your taste deeply. During the event, we'll incorporate your requests while reading the crowd in real time, ensuring the dance floor stays full and the energy peaks.",
    },
    {
      q: "How do we reserve our date?",
      a: "It all starts with a short introductory call to feel the vibe and understand your event's character. Then we'll send a detailed quote, and after locking in the date, we'll schedule the music meeting where we dive into the details and plan the perfect evening for you.",
    },
    {
      q: "Is there a time limit?",
      a: "At Opa, there's no time limit. We're with you from the very first moment until the last dancer leaves. We're there to give you the happiest night possible.",
    },
    {
      q: "Where do you work in the country?",
      a: "We come to anywhere there's a dance floor to rock!",
    },
  ],
};

const FAQSection = ({ lang }: FAQSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const title = lang === "he" ? "שואלים אותנו" : "FAQ";

  return (
    <section id="faq" className="section-padding bg-muted/30">
      <div ref={ref} className={`max-w-3xl mx-auto ${isVisible ? "" : "opacity-0"}`}>
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`}>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">{title}</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className={`space-y-10 transition-all duration-700 ${isVisible ? "animate-fade-up" : ""}`} style={{ animationDelay: "200ms" }}>
          {faqCategories[lang].map((cat) => (
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
