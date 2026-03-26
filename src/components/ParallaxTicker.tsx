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
          className="h-10 md:h-16 lg:h-20 object-contain shrink-0"
          style={style}
        />
      );
    });

  return (
    <div
      className="relative bg-background"
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        overflow: "hidden",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 0,
      }}
    >
      {/* Strip 1 — Black bg, pink+white logos, rotated -15deg */}
      <div
        className="absolute"
        style={{
          background: "hsl(0, 0%, 5%)",
          transform: "rotate(-15deg)",
          width: "150vw",
          left: "-25vw",
          top: "25%",
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

      {/* Strip 2 — Pink bg, black+white logos, rotated 20deg */}
      <div
        className="absolute"
        style={{
          background: "hsl(334, 100%, 55%)",
          transform: "rotate(20deg)",
          width: "150vw",
          left: "-25vw",
          top: "45%",
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
