import heroImage from "@/assets/hero-image.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <img
        src={heroImage}
        alt="הופה מוזיקה - DJ crew"
        className="absolute inset-0 w-full h-full object-cover"
        width={1080}
        height={1620}
      />

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* CTA button in lower third */}
      <div className="absolute bottom-[20%] left-0 right-0 z-10 flex justify-center px-6">
        <a
          href="#contact"
          className="px-10 py-3 bg-white/70 text-black font-medium text-base rounded-[4px] shadow-md hover:bg-white/85 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm"
        >
          צרו קשר
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
