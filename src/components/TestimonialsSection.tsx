import { useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";

interface TestimonialsSectionProps {
  lang: "he" | "en";
}

interface Screenshot {
  src: string;
  alt: string;
}

const screenshots: Screenshot[] = [
  { src: "https://picsum.photos/seed/opa-love-1/400/700", alt: "WhatsApp screenshot 1" },
  { src: "https://picsum.photos/seed/opa-love-2/400/700", alt: "WhatsApp screenshot 2" },
  { src: "https://picsum.photos/seed/opa-love-3/400/700", alt: "WhatsApp screenshot 3" },
  { src: "https://picsum.photos/seed/opa-love-4/400/700", alt: "WhatsApp screenshot 4" },
  { src: "https://picsum.photos/seed/opa-love-5/400/700", alt: "WhatsApp screenshot 5" },
  { src: "https://picsum.photos/seed/opa-love-6/400/700", alt: "WhatsApp screenshot 6" },
];

interface DismissedCard {
  screenshot: Screenshot;
  id: number;
  side: "left" | "right";
  rotation: number;
  offsetY: number;
}

interface SwipeCardProps {
  screenshot: Screenshot;
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
  stackIndex: number;
}

const SwipeCard = ({ screenshot, onSwipe, isTop, stackIndex }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const glowOpacity = useTransform(x, [-200, -80, 0, 80, 200], [0.7, 0.3, 0, 0.3, 0.7]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      onSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  const scale = 1 - stackIndex * 0.04;
  const yOffset = stackIndex * 10;

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 10 - stackIndex,
      }}
      initial={{ scale, y: yOffset, opacity: stackIndex > 2 ? 0 : 1 }}
      animate={{ scale, y: yOffset, opacity: stackIndex > 2 ? 0 : 1 }}
      exit={{
        x: x.get() > 0 ? 400 : -400,
        rotate: x.get() > 0 ? 25 : -25,
        opacity: 0,
        transition: { type: "spring", stiffness: 200, damping: 25 },
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {isTop && (
        <motion.div
          className="absolute -inset-4 rounded-[2rem] pointer-events-none"
          style={{
            opacity: glowOpacity,
            background:
              "radial-gradient(ellipse at center, hsl(334, 100%, 45%, 0.35) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      )}

      <div
        className="relative w-full h-full rounded-3xl overflow-hidden p-2"
        style={{
          background: "rgba(255, 255, 255, 0.35)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.55)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        }}
      >
        <img
          src={screenshot.src}
          alt={screenshot.alt}
          draggable={false}
          className="w-full h-full object-cover rounded-2xl bg-muted select-none pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

const TestimonialsSection = ({ lang }: TestimonialsSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState<DismissedCard[]>([]);

  const handleSwipe = useCallback(
    (dir: "left" | "right") => {
      const card: DismissedCard = {
        screenshot: screenshots[currentIndex % screenshots.length],
        id: currentIndex,
        side: dir,
        rotation: (Math.random() - 0.5) * 30,
        offsetY: Math.random() * 60 - 30,
      };
      setDismissed((prev) => [...prev, card]);
      setCurrentIndex((prev) => prev + 1);
    },
    [currentIndex],
  );

  const visibleCards = Array.from({ length: 3 }, (_, i) => {
    const globalIdx = currentIndex + i;
    const idx = globalIdx % screenshots.length;
    return { screenshot: screenshots[idx], key: globalIdx };
  });

  return (
    <section id="yourlove" className="pt-14 md:pt-20 pb-6 md:pb-8 px-6 md:px-12 lg:px-20 bg-background relative overflow-hidden">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        <div className="text-center mb-10">
          <h2 className="font-heading md:text-5xl text-foreground mb-2 text-4xl font-normal">
            Your Love
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative w-full mx-auto" style={{ height: "460px", maxWidth: "260px" }}>
          {dismissed.slice(-4).map((card) => (
            <motion.div
              key={card.id}
              className="absolute top-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.5,
                x: card.side === "right" ? "calc(100% + 16px)" : "calc(-100% - 16px)",
                y: card.offsetY,
                rotate: card.rotation,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              style={{ width: "100%", height: "100%" }}
            >
              <div
                className="w-full h-full rounded-3xl overflow-hidden p-2"
                style={{
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <img
                  src={card.screenshot.src}
                  alt=""
                  aria-hidden
                  className="w-full h-full object-cover rounded-2xl bg-muted opacity-80"
                />
              </div>
            </motion.div>
          ))}

          <motion.div
            className="relative w-full h-full"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence>
              {visibleCards
                .slice()
                .reverse()
                .map((card, reverseIdx) => {
                  const stackIndex = 2 - reverseIdx;
                  return (
                    <SwipeCard
                      key={card.key}
                      screenshot={card.screenshot}
                      onSwipe={handleSwipe}
                      isTop={stackIndex === 0}
                      stackIndex={stackIndex}
                    />
                  );
                })}
            </AnimatePresence>
          </motion.div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8 font-body">
          {lang === "he" ? "← החליקו לצדדים →" : "← Swipe →"}
        </p>

        <div className="flex justify-center gap-2 mt-4">
          {screenshots.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  currentIndex % screenshots.length === i
                    ? "#c32369"
                    : "hsl(var(--muted))",
                transform:
                  currentIndex % screenshots.length === i
                    ? "scale(1.3)"
                    : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
