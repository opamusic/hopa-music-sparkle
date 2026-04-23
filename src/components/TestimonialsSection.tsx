import { useState, useCallback, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  PanInfo,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";
import whatsappIlay1 from "@/assets/whatsapp/whatsapp-ilay-1.jpeg";
import whatsappIlay2 from "@/assets/whatsapp/whatsapp-ilay-2.jpeg";
import whatsappIlay3 from "@/assets/whatsapp/whatsapp-ilay-3.jpeg";
import whatsappIlay4 from "@/assets/whatsapp/whatsapp-ilay-4.jpeg";
import whatsappIlay5 from "@/assets/whatsapp/whatsapp-ilay-5.jpeg";
import whatsappIlay6 from "@/assets/whatsapp/whatsapp-ilay-6.jpg";
import whatsappOri1 from "@/assets/whatsapp/whatsapp-ori-1.jpeg";
import whatsappOri2 from "@/assets/whatsapp/whatsapp-ori-2.jpeg";
import whatsappOri3 from "@/assets/whatsapp/whatsapp-ori-3.jpeg";
import whatsappOri4 from "@/assets/whatsapp/whatsapp-ori-4.jpeg";
import whatsappHollander1 from "@/assets/whatsapp/whatsapp-hollander-1.jpeg";
import whatsappHollander2 from "@/assets/whatsapp/whatsapp-hollander-2.jpeg";

interface TestimonialsSectionProps {
  lang: "he" | "en";
}

interface Screenshot {
  src: string;
  alt: string;
}

const screenshots: Screenshot[] = [
  { src: whatsappIlay1, alt: "WhatsApp screenshot from Ilay 1" },
  { src: whatsappOri1, alt: "WhatsApp screenshot from Ori 1" },
  { src: whatsappHollander1, alt: "WhatsApp screenshot from Hollander 1" },
  { src: whatsappIlay2, alt: "WhatsApp screenshot from Ilay 2" },
  { src: whatsappOri2, alt: "WhatsApp screenshot from Ori 2" },
  { src: whatsappHollander2, alt: "WhatsApp screenshot from Hollander 2" },
  { src: whatsappIlay3, alt: "WhatsApp screenshot from Ilay 3" },
  { src: whatsappOri3, alt: "WhatsApp screenshot from Ori 3" },
  { src: whatsappIlay4, alt: "WhatsApp screenshot from Ilay 4" },
  { src: whatsappOri4, alt: "WhatsApp screenshot from Ori 4" },
  { src: whatsappIlay5, alt: "WhatsApp screenshot from Ilay 5" },
  { src: whatsappIlay6, alt: "WhatsApp screenshot from Ilay 6" },
];

const DEFAULT_ASPECT_RATIO = 9 / 19.5;

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
  aspectRatio: number;
}

const SwipeCard = ({ screenshot, onSwipe, isTop, stackIndex, aspectRatio }: SwipeCardProps) => {
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
  const stackOpacity = stackIndex === 0 ? 1 : stackIndex === 1 ? 0.5 : stackIndex === 2 ? 0.25 : 0;

  return (
    <motion.div
      className="cursor-grab active:cursor-grabbing touch-none"
      style={{
        gridArea: "1 / 1",
        width: "100%",
        aspectRatio,
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: 10 - stackIndex,
      }}
      initial={{ scale, y: yOffset, opacity: stackOpacity }}
      animate={{ scale, y: yOffset, opacity: stackOpacity }}
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
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    screenshots.forEach((s) => {
      const img = new Image();
      img.onload = () => {
        setAspectRatios((prev) =>
          prev[s.src] ? prev : { ...prev, [s.src]: img.naturalWidth / img.naturalHeight },
        );
      };
      img.src = s.src;
    });
  }, []);

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

  const loadedRatios = Object.values(aspectRatios);
  const tallestAspectRatio =
    loadedRatios.length === screenshots.length
      ? Math.min(...loadedRatios)
      : DEFAULT_ASPECT_RATIO;

  const sectionLabel = lang === "he" ? "המלצות לקוחות" : "Customer testimonials";
  const prevLabel = lang === "he" ? "המלצה קודמת" : "Previous testimonial";
  const nextLabel = lang === "he" ? "המלצה הבאה" : "Next testimonial";
  const positionLabel = (idx: number) =>
    lang === "he" ? `תמונה ${idx + 1} מתוך ${screenshots.length}` : `Image ${idx + 1} of ${screenshots.length}`;
  const currentDisplayIdx = currentIndex % screenshots.length;

  return (
    <section
      id="yourlove"
      className="pt-14 md:pt-20 pb-6 md:pb-8 px-6 md:px-12 lg:px-20 bg-background relative overflow-hidden"
      aria-label={sectionLabel}
    >
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        <div className="text-center mb-10">
          <h2 lang="en" className="font-heading md:text-5xl text-foreground mb-2 text-4xl font-normal">
            Your Love
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div
          role="region"
          aria-roledescription={lang === "he" ? "קרוסלת המלצות" : "testimonial carousel"}
          aria-label={sectionLabel}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              handleSwipe(lang === "he" ? "right" : "left");
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              handleSwipe(lang === "he" ? "left" : "right");
            }
          }}
          className="relative w-full mx-auto rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          style={{ maxWidth: "260px", aspectRatio: tallestAspectRatio }}
        >
          <span className="sr-only-a11y" aria-live="polite">{positionLabel(currentDisplayIdx)}</span>
          {dismissed.slice(-4).map((card) => {
            const cardRatio = aspectRatios[card.screenshot.src] ?? DEFAULT_ASPECT_RATIO;
            return (
              <div
                key={card.id}
                className="absolute inset-0 grid place-items-center pointer-events-none"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 0.5,
                    x: card.side === "right" ? "calc(100% + 16px)" : "calc(-100% - 16px)",
                    y: card.offsetY,
                    rotate: card.rotation,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  style={{ width: "100%", aspectRatio: cardRatio }}
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
              </div>
            );
          })}

          <motion.div
            className="absolute inset-0 grid place-items-center"
            animate={reducedMotion ? { y: 0 } : { y: [0, -6, 0] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence>
              {visibleCards
                .slice()
                .reverse()
                .map((card, reverseIdx) => {
                  const stackIndex = 2 - reverseIdx;
                  const cardRatio =
                    aspectRatios[card.screenshot.src] ?? DEFAULT_ASPECT_RATIO;
                  return (
                    <SwipeCard
                      key={card.key}
                      screenshot={card.screenshot}
                      onSwipe={handleSwipe}
                      isTop={stackIndex === 0}
                      stackIndex={stackIndex}
                      aspectRatio={cardRatio}
                    />
                  );
                })}
            </AnimatePresence>
          </motion.div>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8 font-body">
          {lang === "he" ? "← החליקו לצדדים או השתמשו בחיצים →" : "← Swipe or use arrow keys →"}
        </p>

        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => handleSwipe(lang === "he" ? "right" : "left")}
            aria-label={prevLabel}
            className="w-10 h-10 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center transition-colors"
          >
            {lang === "he" ? (
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleSwipe(lang === "he" ? "left" : "right")}
            aria-label={nextLabel}
            className="w-10 h-10 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center transition-colors"
          >
            {lang === "he" ? (
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            ) : (
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4" aria-hidden="true">
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
