import { useEffect, useRef } from "react";
import heroImage from "@/assets/hero-image.png";

const HeroSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-hero flex items-end justify-center">
      {/* Parallax image */}
      <div ref={imageRef} className="absolute inset-0 flex items-end justify-center will-change-transform">
        <img
          src={heroImage}
          alt="הופה מוזיקה - DJ crew"
          className="w-full max-w-3xl object-contain object-bottom"
          width={1080}
          height={1620}
        />
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* CTA overlay */}
      <div className="relative z-10 text-center mb-32 md:mb-40 px-6">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground drop-shadow-lg">
          OPA<span className="text-gradient"> Music</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto font-body">
          האירוע שלכם. האנרגיה שלנו.
        </p>
        <a
          href="#contact"
          className="inline-block mt-8 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          בואו נדבר
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
