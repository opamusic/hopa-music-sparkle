import { useEffect, useRef } from "react";
import logoBlack from "@/assets/logo-black.png";

const ParallaxTicker = () => {
  const strip1Ref = useRef<HTMLDivElement>(null);
  const strip2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updatePositions = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      if (strip1Ref.current) {
        strip1Ref.current.style.transform = `translate3d(${scrollY * -0.5}px, 0, 0)`;
      }
      if (strip2Ref.current) {
        strip2Ref.current.style.transform = `translate3d(${scrollY * 0.45 - 400}px, 0, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePositions);
        ticking = true;
      }
    };

    updatePositions();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      aria-hidden="true"
      className="relative bg-background"
      style={{ paddingTop: "2rem", paddingBottom: "2rem", pointerEvents: "none" }}
    >
      <div className="relative overflow-hidden" style={{ height: "clamp(9rem, 24vw, 15rem)" }}>
        <div
          className="absolute left-[-80%] right-[-80%] top-[18%]"
          style={{
            background: "hsl(var(--foreground))",
            transform: "rotate(-15deg) scale(1.54)",
            transformOrigin: "center center",
          }}
        >
          <div
            ref={strip1Ref}
            className="gap-4 md:gap-8 whitespace-nowrap flex items-center py-3 md:py-5"
            style={{ width: "max-content", willChange: "transform" }}
          >
            {renderLogos(200, ["pink", "white"])}
          </div>
        </div>

        <div
          className="absolute left-[-80%] right-[-80%] bottom-[18%]"
          style={{
            background: "hsl(var(--primary))",
            transform: "rotate(20deg) scale(1.54)",
            transformOrigin: "center center",
          }}
        >
          <div
            ref={strip2Ref}
            className="gap-4 md:gap-8 whitespace-nowrap flex items-center py-3 md:py-5"
            style={{ width: "max-content", willChange: "transform" }}
          >
            {renderLogos(200, ["pink", "white"])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxTicker;
