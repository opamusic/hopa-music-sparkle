import logoBlack from "@/assets/logo-black.png";

const ParallaxTicker = () => {
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

  const logoSet1 = renderLogos(40, ["pink", "white"]);
  const logoSet2 = renderLogos(40, ["black", "white", "black"]);

  return (
    <div className="overflow-hidden py-6 md:py-10 relative bg-background" style={{ minHeight: "280px" }}>
      {/* Strip 1 — -15deg, black bg, pink+white logos */}
      <div
        className="absolute left-1/2 w-[300vw] -translate-x-1/2 mb-4"
        style={{
          background: "hsl(0, 0%, 5%)",
          transform: "translateX(-50%) rotate(-15deg)",
          top: "10%",
        }}
      >
        <div
          className="flex items-center gap-4 md:gap-8 py-3 md:py-5 animate-ticker-left"
          style={{ width: "max-content" }}
        >
          {logoSet1}
          {logoSet1}
          {logoSet1}
        </div>
      </div>

      {/* Strip 2 — 20deg opposite, pink bg, black+white logos */}
      <div
        className="absolute left-1/2 w-[300vw] -translate-x-1/2"
        style={{
          background: "hsl(334, 100%, 55%)",
          transform: "translateX(-50%) rotate(20deg)",
          bottom: "5%",
        }}
      >
        <div
          className="flex items-center gap-4 md:gap-8 py-3 md:py-5 animate-ticker-right"
          style={{ width: "max-content" }}
        >
          {logoSet2}
          {logoSet2}
          {logoSet2}
        </div>
      </div>
    </div>
  );
};

export default ParallaxTicker;
