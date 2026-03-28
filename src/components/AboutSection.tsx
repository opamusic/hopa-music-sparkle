import { useScrollReveal } from "./useScrollReveal";

interface AboutSectionProps {
  lang: "he" | "en";
}

const copy = {
  he: {
    body: "אנחנו Opa. הדי-אן-איי שלנו הוא החיבור המדויק שבין מסורת לטירוף של המועדון. בחתונות דתיות ומעורבות, אנחנו דואגים שכולם ירגישו שייכים – מהחופה ועד הסט האחרון של הלילה. פשוט חגיגה אחת גדולה, מלאה באנרגיה ועריכות מיוחדות, שכולם ידברו עליה הרבה אחרי שהיא תיגמר.",
    tagline: "Just Say Opa"
  },
  en: {
    body: "At OPA Music Group, we bring nearly a decade of experience in blending tradition with dancefloor energy. For religious and mixed weddings, our mission is simple: make everyone feel part of the celebration from chuppah to the final set.",
    tagline: "Just Say Opa"
  }
};

const AboutSection = ({ lang }: AboutSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const content = copy[lang];

  return (
    <section id="about" className="section-padding" style={{ background: "hsl(334, 70%, 45%)" }}>
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
        isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"}`
        }>
        
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-2 text-primary-foreground">
          About Us
        </h2>
        <div className="w-16 h-1 mx-auto rounded-full mb-8" style={{ background: "hsl(334, 70%, 45%)" }} />
        <p className="md:text-xl leading-relaxed font-body text-primary-foreground font-light text-base">
          {content.body}
        </p>
        <p className="mt-6 text-lg md:text-xl leading-relaxed font-body text-center text-primary-foreground/80">
          {content.tagline}
        </p>
      </div>
    </section>);

};

export default AboutSection;