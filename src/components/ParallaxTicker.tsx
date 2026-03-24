import { useEffect, useRef } from "react";
import logoBlack from "@/assets/logo-black.png";

const ParallaxTicker = () => {
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (strip1Ref.current) {
        strip1Ref.current.style.transform = `translateX(${scrollY * -0.4}px)`;
      }
      if (strip2Ref.current) {
        strip2Ref.current.style.transform = `translateX(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLogos = (count: number) =>
    Array.from({ length: count }).map((_, i) => (
      <img
        key={i}
        src={logoBlack}
        alt="OPA"
        className={`h-12 md:h-16 transition-opacity duration-300 object-contain ${
          i % 2 === 0 ? "opacity-80" : "opacity-50"
        }`}
        style={i % 2 === 1 ? { filter: "brightness(0.3) sepia(1) hue-rotate(300deg) saturate(3)" } : undefined}
      />
    ));

  return (
    <div className="overflow-hidden py-4 md:py-6 relative" style={{
      background: "linear-gradient(135deg, hsla(334,100%,70%,0.12) 0%, hsla(334,80%,85%,0.2) 50%, hsla(334,100%,70%,0.08) 100%)"
    }}>
      {/* Row 1 — moves left on scroll, slight clockwise tilt */}
      <div
        ref={strip1Ref}
        className="gap-8 md:gap-14 whitespace-nowrap will-change-transform flex items-center mb-3"
        style={{ width: "max-content", transform: "rotate(-2deg)" }}
      >
        {renderLogos(50)}
      </div>

      {/* Row 2 — moves right on scroll, slight counter-clockwise tilt */}
      <div
        ref={strip2Ref}
        className="gap-8 md:gap-14 whitespace-nowrap will-change-transform flex items-center"
        style={{ width: "max-content", transform: "rotate(2deg)", marginLeft: "-200px" }}
      >
        {renderLogos(50)}
      </div>
    </div>
  );
};

export default ParallaxTicker;
