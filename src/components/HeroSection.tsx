import heroImage from "@/assets/hero-image.png";
import heroDesktop from "@/assets/hero-desktop.png";

interface HeroSectionProps {
  lang: "he" | "en";
}

const HeroSection = ({ lang }: HeroSectionProps) => {
  const ctaLabel = lang === "he" ? "צרו קשר" : "Contact Us";
  const imageAlt = lang === "he" ? "הופה מוזיקה - צוות דיג׳ייז" : "OPA Music Group DJ crew";

  return (
    <section id="hero" className="relative h-screen overflow-hidden" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only-a11y">
        {lang === "he" ? "OPA Music Group — צוות הדיג'ייז המוביל לאירועים" : "OPA Music Group — Leading DJ crew for events"}
      </h1>
      {/* Mobile hero */}
      <img
        src={heroImage}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        width={1080}
        height={1620} />
      {/* Desktop hero */}
      <img
        src={heroDesktop}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        width={1920}
        height={1080} />
      

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/15 to-transparent" />

      {/* CTA button in lower third */}
      <div className="absolute bottom-[20%] left-0 right-0 z-10 flex justify-center px-6">
        <a
          href="#contact"
          className="px-10 py-3 bg-white text-black font-medium text-base rounded-[4px] shadow-md hover:bg-white/95 hover:shadow-lg hover:scale-105 transition-all duration-300">
          {ctaLabel}
        </a>
      </div>
    </section>);

};

export default HeroSection;