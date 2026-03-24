import { useScrollReveal } from "./useScrollReveal";

interface AboutSectionProps {
  lang: "he" | "en";
}

const copy = {
  he: {
    title: "מי אנחנו",
    body: "אנחנו Opa Music Group מזקקים קרוב לעשור של ניסיון בחיבור המדויק שבין מסורת לטירוף של המועדון. בחתונות דתיות ומעורבות, המטרה שלנו היא שכולם ירגישו שייכים – מהחופה ועד הסט האחרון של הלילה.",
    tagline: "Just Say Opa",
  },
  en: {
    title: "ABOUT US",
    body: "At OPA Music Group, we bring nearly a decade of experience in blending tradition with dancefloor energy. For religious and mixed weddings, our mission is simple: make everyone feel part of the celebration from chuppah to the final set.",
    tagline: "Just Say Opa",
  },
};

const AboutSection = ({ lang }: AboutSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const content = copy[lang];

  return (
    <section id="about" className="section-padding bg-primary">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
        isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"}`
        }>
        
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-2 text-primary-foreground">
          {content.title}
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8" />
        <p className="text-lg md:text-xl leading-relaxed font-body text-primary-foreground">
          {content.body}
        

        </p>
        <p className="mt-6 text-lg md:text-xl leading-relaxed font-body text-center text-secondary-foreground">
          {content.tagline}
        
        </p>
      </div>
    </section>);

};

export default AboutSection;