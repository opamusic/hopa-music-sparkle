import { useRef, useEffect, useState } from "react";
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

const TestimonialsSection = ({ lang }: TestimonialsSectionProps) => {
  const { ref, isVisible } = useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = 0;

    const step = () => {
      if (!isPaused && el) {
        scrollPos += 0.5;
        // When we've scrolled past half (the original set), reset seamlessly
        if (scrollPos >= el.scrollWidth / 2) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Double the cards for infinite illusion
  const allCards = [...testimonials, ...testimonials];

  return (
    <section id="yourlove" className="section-padding bg-background">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-700 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
          Your Love
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-hidden cursor-grab"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allCards.map((text, i) => (
            <div
              key={i}
              className="min-w-[280px] md:min-w-[340px] bg-card rounded-3xl shadow-md p-6 md:p-8 flex flex-col justify-between shrink-0 border border-border/50 relative overflow-hidden"
            >
              <p className="text-foreground font-body text-sm md:text-base leading-relaxed mb-4" dir="rtl">
                "{text}"
              </p>
              {/* Brand accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                style={{ background: "#c32369" }}
              />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8 max-w-xs mx-auto h-0.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              background: "#c32369",
              width: "40%",
              animation: "progressSlide 8s linear infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes progressSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
