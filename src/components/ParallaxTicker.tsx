import { useEffect, useRef } from "react";
import logoBlack from "@/assets/logo-black.png";

const ParallaxTicker = () => {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stripRef.current) {
        const scrollY = window.scrollY;
        stripRef.current.style.transform = `translateX(${scrollY * -0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="overflow-hidden py-6 md:py-10 backdrop-blur-sm relative"
      style={{
        background:
          "linear-gradient(135deg, hsla(334,100%,70%,0.15) 0%, hsla(334,80%,85%,0.25) 50%, hsla(334,100%,70%,0.1) 100%)",
      }}
    >
      {/* Top & bottom accent lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-primary/20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-primary/20" />

      <div
        ref={stripRef}
        className="flex items-center gap-12 md:gap-20 whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <img
            key={i}
            src={logoBlack}
            alt="OPA"
            className="h-7 md:h-10 opacity-40 hover:opacity-60 transition-opacity duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxTicker;
