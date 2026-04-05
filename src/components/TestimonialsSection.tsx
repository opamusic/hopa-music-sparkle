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

const testimonials = [
  "אמאלה איזה ערב היה לנוווו לא נרגעיםםםם",
  "החלטה הכי טובה שלנווו אתם פשוט רמה מעל כולם",
  "וואי וואי איזו אווירההה לא הפסקנו לרקוד לרגע",
  "כולםםם לא מפסיקים לשאול מי הדיג׳ייי היה פשוט מטורף",
  "תקשיבו זה היה פשוט חלוום הכל היה מושלםםם",
  "אין דברים כאלה בעולםם כולם בטירוף על האירוע",
];

interface DismissedCard {
  text: string;
  id: number;
  side: "left" | "right";
  rotation: number;
  offsetY: number;
  isPink: boolean;
}

interface SwipeCardProps {
  text: string;
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
  stackIndex: number;
  isPink: boolean;
}

const SwipeCard = ({ text, onSwipe, isTop, stackIndex, isPink }: SwipeCardProps) => {
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
        className="relative w-full h-full rounded-3xl p-8 md:p-10 flex items-center justify-center overflow-hidden"
        style={{
          background: isPink
            ? "rgba(195, 35, 105, 0.55)"
            : "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: isPink
            ? "1px solid rgba(255, 255, 255, 0.25)"
            : "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: isPink
            ? "0 8px 32px rgba(195, 35, 105, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        }}
      >
        <p
          className="text-lg md:text-2xl font-body font-semibold text-center leading-relaxed"
          dir="rtl"
          style={{ color: isPink ? "#ffffff" : "#c32369" }}
        >
          "{text}"
        </p>
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
        text: testimonials[currentIndex % testimonials.length],
        id: currentIndex,
        side: dir,
        rotation: (Math.random() - 0.5) * 30,
        offsetY: Math.random() * 60 - 30,
        isPink: currentIndex % 2 === 1,
      };
      setDismissed((prev) => [...prev, card]);
      setCurrentIndex((prev) => prev + 1);
    },
    [currentIndex],
  );

  const visibleCards = Array.from({ length: 3 }, (_, i) => {
    const globalIdx = currentIndex + i;
    const idx = globalIdx % testimonials.length;
    return { text: testimonials[idx], key: globalIdx, isPink: globalIdx % 2 === 1 };
  });

  return (
    <section id="yourlove" className="py-14 md:py-20 px-6 md:px-12 lg:px-20 bg-background relative overflow-hidden">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        <div className="text-center mb-12">
          <h2 className="font-heading md:text-5xl text-foreground mb-2 text-4xl font-normal">
            Your Love
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative w-full mx-auto" style={{ height: "280px", maxWidth: "440px" }}>
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
                className="w-full h-full rounded-3xl p-6 flex items-center justify-center"
                style={{
                  background: card.isPink
                    ? "rgba(195, 35, 105, 0.3)"
                    : "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <p
                  className="text-sm font-body text-center opacity-60"
                  dir="rtl"
                  style={{ color: card.isPink ? "#ffffff" : "#c32369" }}
                >
                  "{card.text}"
                </p>
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
                      text={card.text}
                      onSwipe={handleSwipe}
                      isTop={stackIndex === 0}
                      stackIndex={stackIndex}
                      isPink={card.isPink}
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
          {testimonials.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  currentIndex % testimonials.length === i
                    ? "#c32369"
                    : "hsl(var(--muted))",
                transform:
                  currentIndex % testimonials.length === i
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
