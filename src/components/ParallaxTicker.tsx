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
        strip2Ref.current.style.transform = `translateX(${scrollY * 0.45 - 520}px)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLogos = (count: number, colorPattern: ("black" | "white" | "pink")[], keyPrefix: string) =>
    Array.from({ length: count }).map((_, i) => {
      const color = colorPattern[i % colorPattern.length];
      let style: React.CSSProperties = {};
      if (color === "white") {
        style = { filter: "brightness(0) invert(1)", opacity: 0.98 };
      } else if (color === "pink") {
        style = {
          filter:
            "brightness(0) saturate(100%) invert(34%) sepia(97%) saturate(6057%) hue-rotate(313deg) brightness(105%) contrast(102%)",
          opacity: 0.98,
        };
      } else {
        style = { opacity: 0.9 };
      }
      return (
        <img
          key={`${keyPrefix}-${i}`}
          src={logoBlack}
          alt="OPA"
          className="h-12 md:h-16 lg:h-20 object-contain shrink-0"
          style={style}
        />
      );
    });

  const blackStripLogos = renderLogos(320, ["pink", "white"], "black-strip");
  const pinkStripLogos = renderLogos(320, ["black", "white", "black"], "pink-strip");

  return (
    <div className="relative bg-background py-2 md:py-3 overflow-x-clip overflow-y-visible">
      {/* Strip 1 — 15deg, black bg, pink+white logos */}
      <div
        className="relative mb-3"
        style={{
          background: "hsl(var(--foreground))",
          transform: "rotate(-15deg) scale(1.9)",
          transformOrigin: "center center",
          marginLeft: "-65%",
          marginRight: "-65%",
        }}
      >
        <div
          ref={strip1Ref}
          className="gap-3 md:gap-6 whitespace-nowrap will-change-transform flex items-center py-4 md:py-6"
          style={{ width: "max-content" }}
        >
          {blackStripLogos}
          {renderLogos(320, ["pink", "white"], "black-strip-loop")}
        </div>
      </div>

      {/* Strip 2 — 20deg opposite, pink bg, black+white logos */}
      <div
        className="relative"
        style={{
          background: "hsl(var(--primary))",
          transform: "rotate(20deg) scale(1.9)",
          transformOrigin: "center center",
          marginLeft: "-65%",
          marginRight: "-65%",
        }}
      >
        <div
          ref={strip2Ref}
          className="gap-3 md:gap-6 whitespace-nowrap will-change-transform flex items-center py-4 md:py-6"
          style={{ width: "max-content" }}
        >
          {pinkStripLogos}
          {renderLogos(320, ["black", "white", "black"], "pink-strip-loop")}
        </div>
      </div>
    </div>
  );
};

export default ParallaxTicker;
