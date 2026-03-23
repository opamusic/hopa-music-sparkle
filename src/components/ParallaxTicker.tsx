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
    <div className="overflow-hidden py-8 bg-primary/10 backdrop-blur-sm">
      <div
        ref={stripRef}
        className="flex items-center gap-16 whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <img
            key={i}
            src={logoBlack}
            alt="OPA"
            className="h-8 md:h-10 opacity-30"
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxTicker;
