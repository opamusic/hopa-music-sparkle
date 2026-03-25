import { useEffect, useRef } from "react";
import logoBlack from "@/assets/logo-black.png";

const ParallaxTicker = () => {
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (strip1Ref.current) {
        strip1Ref.current.style.transform = `translateX(${scrollY * -0.5}px)`;
      }
      if (strip2Ref.current) {
        strip2Ref.current.style.transform = `translateX(${scrollY * 0.45 - 400}px)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLogos = (count: number, colorPattern: ("black" | "white" | "pink")[]) =>
    Array.from({ length: count }).map((_, i) => {
      const color = colorPattern[i % colorPattern.length];
      let style: React.CSSProperties = {};
      if (color === "white") {
        style = { filter: "brightness(0) invert(1)", opacity: 0.9 };
      } else if (color === "pink") {
        style = { filter: "brightness(0.35) sepia(1) hue-rotate(295deg) saturate(3.2)", opacity: 0.85 };
      } else {
        style = { opacity: 0.9 };
      }
      return (
        <img
          key={i}
          src={logoBlack}
          alt="OPA"
          className="h-12 md:h-18 lg:h-22 object-contain shrink-0"
          style={style}
        />
      );
    });

  return (
    <div className="overflow-hidden py-4 md:py-8 relative bg-background">
      {/* Strip 1 — 15deg, black bg, white+pink logos */}
      <div
        className="relative mb-3"
        style={{ background: "hsl(0, 0%, 5%)", transform: "rotate(-15deg) scale(1.3)", transformOrigin: "center center", marginLeft: "-20%", marginRight: "-20%" }}
      >
        <div
          ref={strip1Ref}
          className="gap-6 md:gap-10 whitespace-nowrap will-change-transform flex items-center py-4 md:py-5"
          style={{ width: "max-content" }}
        >
          {renderLogos(150, ["white", "pink", "white"])}
        </div>
      </div>

      {/* Strip 2 — 20deg opposite, pink bg, black+white logos */}
      <div
        className="relative"
        style={{ background: "hsl(334, 100%, 55%)", transform: "rotate(20deg) scale(1.3)", transformOrigin: "center center", marginLeft: "-20%", marginRight: "-20%" }}
      >
        <div
          ref={strip2Ref}
          className="gap-6 md:gap-10 whitespace-nowrap will-change-transform flex items-center py-4 md:py-5"
          style={{ width: "max-content" }}
        >
          {renderLogos(150, ["black", "white", "black"])}
        </div>
      </div>
    </div>
  );
};

export default ParallaxTicker;
