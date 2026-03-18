"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPreviewWithDelay = () => {
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
    }

    previewTimerRef.current = setTimeout(() => {
      setIsPreviewVisible(true);
      previewTimerRef.current = null;
    }, 200);
  };

  const showPreviewInstant = () => {
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    setIsPreviewVisible(true);
  };

  const hidePreview = () => {
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    setIsPreviewVisible(false);
  };

  useEffect(() => {
    if (!isDemoOpen) {
      return;
    }

    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDemoOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscapeClose);

    return () => {
      window.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isDemoOpen]);

  useEffect(() => {
    return () => {
      if (previewTimerRef.current) {
        clearTimeout(previewTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <video
        className="fixed inset-0 -z-20 h-full w-full object-cover"
        src="/videos/home-bg.mp4"
        poster="/videos/home-bg-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.45),_rgba(5,10,25,0.9)_55%,_rgba(2,6,23,0.98)_100%)]" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#" className="text-xl font-semibold tracking-wide text-cyan-200">
          Aalgorix Academy
        </a>
        <nav className="hidden items-center gap-8 text-sm text-slate-100/90 md:flex">
          <a href="#features" className="transition hover:text-cyan-300">
            Features
          </a>
          <a href="#impact" className="transition hover:text-cyan-300">
            Impact
          </a>
          <a href="#contact" className="transition hover:text-cyan-300">
            Contact
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="rounded-lg border border-white/30 bg-slate-900/40 p-2 text-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1.5 block h-0.5 w-5 bg-current" />
          <span className="mt-1.5 block h-0.5 w-5 bg-current" />
        </button>
      </header>

      {isMobileMenuOpen ? (
        <div className="mx-auto -mt-2 mb-4 w-[calc(100%-3rem)] max-w-6xl rounded-xl border border-white/20 bg-slate-900/80 px-5 py-4 backdrop-blur md:hidden">
          <nav className="flex flex-col gap-3 text-sm text-slate-100">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>
              Features
            </a>
            <a href="#impact" onClick={() => setIsMobileMenuOpen(false)}>
              Impact
            </a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </a>
          </nav>
        </div>
      ) : null}

      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-16 pt-8 md:px-10 md:pt-16">
        <section className="fade-in grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-4 inline-block rounded-full border border-cyan-200/40 bg-cyan-100/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-cyan-100/90">
              AI Education Platform
            </p>
            <h1 className="mb-5 text-4xl font-semibold leading-tight md:text-6xl md:leading-[1.05]">
              Transforming Learning into a
              <span className="block text-cyan-200">Personal AI Journey</span>
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-7 text-slate-100/90 md:text-lg">
              Empower students with adaptive lessons, real-time guidance, and skills-first pathways. Aalgorix Academy helps every learner move from confusion to confidence faster.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div
                className="relative z-40"
                onMouseEnter={showPreviewWithDelay}
                onMouseLeave={hidePreview}
              >
                <button
                  type="button"
                  onClick={() => setIsDemoOpen(true)}
                  onFocus={showPreviewInstant}
                  onBlur={hidePreview}
                  className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200"
                >
                  <span className="flex items-center gap-2">
                    <span className="play-ping relative flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/90">
                      <span className="ml-0.5 h-0 w-0 border-b-[5px] border-l-[8px] border-t-[5px] border-b-transparent border-l-cyan-200 border-t-transparent" />
                    </span>
                    Watch Demo
                  </span>
                </button>

                <div
                  className={`pointer-events-none absolute bottom-[calc(100%+12px)] left-0 z-[70] hidden w-72 overflow-hidden rounded-xl border border-white/20 bg-slate-900/90 shadow-2xl backdrop-blur transition duration-300 md:block ${
                    isPreviewVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <video
                    className="h-40 w-full object-cover"
                    src="/videos/demo.mp4"
                    poster="/videos/demo-poster.jpg"
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                  <p className="px-3 py-2 text-xs text-slate-100/90">Quick preview on hover</p>
                </div>
              </div>
              <a
                href="#features"
                className="rounded-full border border-slate-200/40 bg-slate-900/30 px-7 py-3 text-sm font-medium text-slate-50 backdrop-blur transition hover:bg-slate-800/60"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="slide-up rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
            <h2 className="mb-4 text-2xl font-semibold text-cyan-100">Why learners love it</h2>
            <ul className="space-y-3 text-sm text-slate-100/90 md:text-base">
              <li>Personalized learning plans powered by AI</li>
              <li>Instant doubt solving with smart tutors</li>
              <li>Project-based tracks with measurable outcomes</li>
            </ul>
          </div>
        </section>

        <section id="features" className="mt-16 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-white/20 bg-slate-900/45 p-6 backdrop-blur">
            <h3 className="mb-2 text-lg font-semibold text-cyan-100">Adaptive Lessons</h3>
            <p className="text-sm leading-6 text-slate-100/85">
              Every topic adjusts to each student&apos;s pace and performance.
            </p>
          </article>
          <article className="rounded-2xl border border-white/20 bg-slate-900/45 p-6 backdrop-blur">
            <h3 className="mb-2 text-lg font-semibold text-cyan-100">Progress Intelligence</h3>
            <p className="text-sm leading-6 text-slate-100/85">
              Teachers and parents receive clear growth insights in real time.
            </p>
          </article>
          <article className="rounded-2xl border border-white/20 bg-slate-900/45 p-6 backdrop-blur">
            <h3 className="mb-2 text-lg font-semibold text-cyan-100">Career-Ready Skills</h3>
            <p className="text-sm leading-6 text-slate-100/85">
              Learners build practical skills through guided challenges and labs.
            </p>
          </article>
        </section>

        <section
          id="impact"
          className="mt-16 rounded-2xl border border-white/20 bg-slate-900/45 p-7 text-slate-100/90 backdrop-blur"
        >
          <h2 className="text-2xl font-semibold text-cyan-100">Impact at a glance</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 md:text-base">
            Schools using Aalgorix Academy can deliver more personalized instruction time, improve student consistency, and create stronger outcomes through intelligent feedback loops.
          </p>
        </section>
      </main>

      <footer
        id="contact"
        className="border-t border-white/20 bg-slate-950/70 px-6 py-6 text-center text-sm text-slate-100/85 backdrop-blur md:px-10"
      >
        <p>Built for the future of education. Contact: hello@aalgorixacademy.com</p>
      </footer>

      {isDemoOpen ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setIsDemoOpen(false)}
        >
          <div
            className="w-full max-w-5xl rounded-2xl border border-white/20 bg-slate-950 p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-cyan-200">Platform Demo</p>
              <button
                type="button"
                onClick={() => setIsDemoOpen(false)}
                className="rounded-full border border-white/25 px-3 py-1 text-xs text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="aspect-video max-h-[80vh] w-full overflow-hidden rounded-xl bg-black">
              <video
                className="h-full w-full object-contain"
                src="/videos/demo.mp4"
                poster="/videos/demo-poster.jpg"
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
