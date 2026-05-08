"use client";

import { useEffect, useMemo, useState } from "react";

type HeroSlide = {
  kicker?: string;
  title: string;
  highlight?: string;
  suffix?: string;
  body?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function HeroTextSlider({
  intervalMs = 4200,
}: {
  intervalMs?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();

  const slides: HeroSlide[] = useMemo(
    () => [
      {
        kicker: "Grade 3–12 · Future-ready homeschooling",
        title: "AI Tutor +",
        highlight: "personalised learning",
        suffix: "",
        body:
          "A structured learning plan that adapts to pace and level, closes gaps, and builds mastery—without overload.",
      },
      {
        kicker: "Mentorship that builds consistency",
        title: "Industry-trained",
        highlight: "faculty",
        suffix: " + Life Coach",
        body:
          "Clear teaching, strong standards, and coaching that builds discipline, confidence, and learning habits.",
      },
      {
        kicker: "Learn from the safety of home",
        title: "Supplementary",
        highlight: "courses",
        suffix: " for mastery",
        body:
          "Targeted modules that strengthen weak areas and accelerate strengths—so concepts stay solid across grades.",
      },
      {
        kicker: "Beyond academics",
        title: "Life skills +",
        highlight: "real-world skills",
        suffix: "",
        body:
          "Communication, leadership, and problem-solving—so learning translates into outcomes students can apply.",
      },
      {
        kicker: "Discover strengths early",
        title: "Talent",
        highlight: "farming",
        suffix: " approach",
        body:
          "Identify strengths, build a portfolio, and prepare for an algorithmic world with an AI-first curriculum.",
      },
      {
        kicker: "Support that adapts",
        title: "Special",
        highlight: "learning needs",
        suffix: " included",
        body:
          "Individual attention, flexible pace, and structured routines—built for learners who need extra care and guidance.",
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const animMs = 700;

  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % slides.length;
        setPrevIndex(i);
        window.setTimeout(() => setPrevIndex(null), animMs);
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, reducedMotion, slides.length]);

  const slide = slides[index] ?? slides[0];
  const prevSlide = prevIndex === null ? null : slides[prevIndex];

  return (
    <div className="relative mt-3 min-h-[210px] md:min-h-[230px]">
      <div className="relative">
        {/* Previous slide (fades out) */}
        {prevSlide && !reducedMotion && (
          <div
            className="absolute inset-0 transition-all duration-700 ease-out opacity-0 -translate-y-2"
            aria-hidden="true"
          >             
            {prevSlide.kicker && (
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                {prevSlide.kicker}
              </p>
            )}
            <h1 className="text-3xl font-bold leading-tight tracking-tight drop-shadow-lg md:text-5xl">
              <span className="text-white">{prevSlide.title}</span>{" "}
              {prevSlide.highlight && (
                <>
                  <span className="font-extrabold text-white">{prevSlide.highlight}</span>{" "}
                </>
              )}
              {prevSlide.suffix && <span className="text-white">{prevSlide.suffix}</span>}
            </h1>
            {prevSlide.body && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 drop-shadow md:text-lg">
                {prevSlide.body}
              </p>
            )}
          </div>
        )}

        {/* Current slide (slides in) */}
        <div
          key={index}
          className={
            reducedMotion
              ? undefined
              : "transition-all duration-700 ease-out opacity-100 translate-y-0"
          }
          aria-live="polite"
          style={!reducedMotion ? { transform: "translateY(0)" } : undefined}
        >
          {slide.kicker && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              {slide.kicker}
            </p>
          )}

          <h1 className="text-3xl font-bold leading-tight tracking-tight drop-shadow-lg md:text-5xl">
            <span className="text-white">{slide.title}</span>{" "}
            {slide.highlight && (
              <>
                <span className="font-extrabold text-white">{slide.highlight}</span>{" "}
              </>
            )}
            {slide.suffix && <span className="text-white">{slide.suffix}</span>}
          </h1>

          {slide.body && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 drop-shadow md:text-lg">
              {slide.body}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

