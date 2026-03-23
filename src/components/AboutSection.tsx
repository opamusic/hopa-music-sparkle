import { useScrollReveal } from "./useScrollReveal";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="section-padding bg-background">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
        isVisible ? "animate-fade-up" : "opacity-0 translate-y-8"}`
        }>
        
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
          ABOUT US
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8" />
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-body">
          אנחנו Opa Music Group מזקקים קרוב לעשור של ניסיון בחיבור המדויק שבין מסורת לטירוף של המועדון. בחתונות דתיות ומעורבות, המטרה שלנו היא שכולם ירגישו שייכים – מהחופה ועד הסט האחרון של הלילה.
        

        </p>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground font-body text-center">
          Just Say Opa  
        
        </p>
      </div>
    </section>);

};

export default AboutSection;