

interface HeroSectionProps {
  lang: "he" | "en";
}

const HeroSection = ({ lang }: HeroSectionProps) => {
  const ctaLabel = lang === "he" ? "צרו קשר" : "Contact Us";
  const imageAlt = lang === "he" ? "הופה מוזיקה - צוות דיג׳ייז" : "OPA Music Group DJ crew";

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <img
        src="/lovable-uploads/bdd84adf-4f86-4fc7-988a-5f52309e12c7.jpg"
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        width={1080}
        height={1620} />
      

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/15 to-transparent" />

      {/* CTA button in lower third */}
      <div className="absolute bottom-[20%] left-0 right-0 z-10 flex justify-center px-6">
        <a
          href="#contact"
          className="px-10 py-3 bg-white/70 text-black font-medium text-base rounded-[4px] shadow-md hover:bg-white/85 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm">
          {ctaLabel}
        </a>
      </div>
    </section>);

};

export default HeroSection;