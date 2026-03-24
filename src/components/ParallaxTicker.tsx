import { useEffect, useRef } from "react";
import logoBlack from "@/assets/logo-black.png";

const ParallaxTicker = () => {
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);
  const angle = 9;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (strip1Ref.current) {
        strip1Ref.current.style.transform = `translateX(${scrollY * -0.35}px) rotate(-${angle}deg)`;
      }
      if (strip2Ref.current) {
        strip2Ref.current.style.transform = `translateX(${scrollY * 0.3 - 260}px) rotate(${angle}deg)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLogos = (count: number) =>
    Array.from({ length: count }).map((_, i) => (
      <img
        key={i}
        src={logoBlack}
        alt="OPA"
        className={`h-16 md:h-24 lg:h-28 transition-opacity duration-300 object-contain ${
          i % 2 === 0 ? "opacity-85" : "opacity-65"
        }`}
        style={
          i % 2 === 1
            ? { filter: "brightness(0.35) sepia(1) hue-rotate(295deg) saturate(3.2)" }
            : undefined
        }
      />
    ));

  return (
    <div
      className="overflow-hidden py-16 md:py-20 relative"
      style={{
        background:
          "linear-gradient(135deg, hsla(334,100%,70%,0.18) 0%, hsla(334,80%,85%,0.26) 50%, hsla(334,100%,70%,0.14) 100%)",
      }}
    >
      <div
        ref={strip1Ref}
        className="gap-10 md:gap-16 lg:gap-20 whitespace-nowrap will-change-transform flex items-center mb-12"
        style={{ width: "max-content", transform: `translateX(0px) rotate(-${angle}deg)` }}
      >
        {renderLogos(110)}
      </div>

      <div
        ref={strip2Ref}
        className="gap-10 md:gap-16 lg:gap-20 whitespace-nowrap will-change-transform flex items-center"
        style={{ width: "max-content", transform: `translateX(-260px) rotate(${angle}deg)` }}
      >
        {renderLogos(110)}
      </div>
    </div>
  );
};

export default ParallaxTicker;
