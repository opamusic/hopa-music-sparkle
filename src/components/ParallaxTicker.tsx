import { useEffect, useRef } from "react";
import logoBlack from "@/assets/logo-black.png";

const ParallaxTicker = () => {
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);
  const angle = 7;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (strip1Ref.current) {
        strip1Ref.current.style.transform = `translateX(${scrollY * -0.4}px) rotate(-${angle}deg)`;
      }
      if (strip2Ref.current) {
        strip2Ref.current.style.transform = `translateX(${scrollY * 0.35 - 300}px) rotate(${angle}deg)`;
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
        className="h-14 md:h-20 lg:h-24 object-contain shrink-0"
        style={
          i % 2 === 1
            ? { filter: "brightness(0.35) sepia(1) hue-rotate(295deg) saturate(3.2)", opacity: 0.7 }
            : { opacity: 0.85 }
        }
      />
    ));

  return (
    <div className="overflow-hidden py-6 md:py-10 relative bg-background">
      {/* Strip 1 - rotated negative, black bg */}
      <div
        className="relative -mx-20 mb-4"
        style={{ background: "hsl(0, 0%, 5%)" }}
      >
        <div
          ref={strip1Ref}
          className="gap-8 md:gap-14 whitespace-nowrap will-change-transform flex items-center py-5 md:py-6"
          style={{
            width: "max-content",
            transform: `translateX(0px) rotate(-${angle}deg)`,
            filter: "brightness(0) invert(1)",
          }}
        >
          {renderLogos(120)}
        </div>
      </div>

      {/* Strip 2 - rotated positive, pink bg */}
      <div
        className="relative -mx-20"
        style={{ background: "hsl(334, 100%, 55%)" }}
      >
        <div
          ref={strip2Ref}
          className="gap-8 md:gap-14 whitespace-nowrap will-change-transform flex items-center py-5 md:py-6"
          style={{
            width: "max-content",
            transform: `translateX(-300px) rotate(${angle}deg)`,
            filter: "brightness(0) invert(1)",
          }}
        >
          {renderLogos(120)}
        </div>
      </div>
    </div>
  );
};

export default ParallaxTicker;
