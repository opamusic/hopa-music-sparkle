import { useEffect, useRef } from "react";
import logoBlack from "@/assets/logo-black.png";

const ParallaxTicker = () => {
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (strip1Ref.current) {
        strip1Ref.current.style.transform = `translateX(${scrollY * -0.4}px)`;
      }
      if (strip2Ref.current) {
        strip2Ref.current.style.transform = `translateX(${scrollY * 0.4 - 600}px)`;
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
          className="h-10 md:h-16 lg:h-20 object-contain shrink-0"
          style={style}
        />
      );
    });

  return (
    <div ref={sectionRef} className="overflow-hidden py-4 md:py-8 relative bg-background">
      {/* Strip 1 — Black bg, pink+white logos, -15deg */}
      <div
        className="relative mb-3"
        style={{
          background: "hsl(0, 0%, 5%)",
          width: "200vw",
          left: "-50vw",
          transform: "rotate(-15deg)",
          transformOrigin: "center center",
        }}
      >
        <div
          ref={strip1Ref}
          className="gap-4 md:gap-8 whitespace-nowrap will-change-transform flex items-center py-3 md:py-5"
          style={{ width: "max-content" }}
        >
          {renderLogos(300, ["pink", "white"])}
        </div>
      </div>

      {/* Strip 2 — Pink bg, black+white logos, 20deg */}
      <div
        className="relative"
        style={{
          background: "#ff64ae",
          width: "200vw",
          left: "-50vw",
          transform: "rotate(20deg)",
          transformOrigin: "center center",
        }}
      >
        <div
          ref={strip2Ref}
          className="gap-4 md:gap-8 whitespace-nowrap will-change-transform flex items-center py-3 md:py-5"
          style={{ width: "max-content" }}
        >
          {renderLogos(300, ["black", "white", "black"])}
        </div>
      </div>
    </div>
  );
};

export default ParallaxTicker;
