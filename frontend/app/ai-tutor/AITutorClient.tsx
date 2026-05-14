"use client";

import Link from "next/link";

export default function AITutorClient() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-20">
        {/* Hero */}
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="badge-ai mb-4 inline-block">AI Tutor</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              A personal AI tutor that adapts to your child
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Our AI tutoring system supports <strong>Grade 3 to Grade 12</strong> with personalised
              learning paths, instant feedback, and clear progress tracking—so parents get clarity and
              students build confidence.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/try-it"
                className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
              >
                Try AI Assistant
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
              >
                Talk to Admissions
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { t: "Personalised learning", d: "Pace, level, and practice adjust to the learner." },
                { t: "Instant feedback", d: "Hints, explanations, and targeted practice." },
                { t: "Progress visibility", d: "Parents see growth, gaps, and next steps." },
                { t: "Special learning needs", d: "Flexible routines and extra support when needed." },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-white/90">{x.t}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/65">{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <video
                className="aspect-video w-full object-contain"
                controls
                playsInline
                preload="metadata"
                aria-label="AI Tutor product demo video"
              >
                <source src="/ai-tutor-demo.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 text-center text-xs text-slate-500 dark:text-white/50">
              Demo: see how the AI Tutor guides practice and feedback.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none md:mt-16 md:p-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
                How the AI Tutor helps
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                A simple loop: assess → teach → practice → track
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                The AI Tutor works like a patient guide. It finds the right starting point, teaches in
                small steps, and keeps students moving forward with the right practice.
              </p>
            </div>

            <div className="grid gap-4 lg:col-span-2 md:grid-cols-2">
              {[
                {
                  t: "1) Diagnose level & gaps",
                  d: "Quick checks identify what the learner knows, what’s missing, and what’s next.",
                },
                {
                  t: "2) Explain in the right way",
                  d: "Multiple explanations + examples until the concept clicks.",
                },
                {
                  t: "3) Practice with guidance",
                  d: "Adaptive questions, hints, and step-by-step solutions build mastery.",
                },
                {
                  t: "4) Track progress for parents",
                  d: "Clear reports that show growth, consistency, and areas needing attention.",
                },
              ].map((s) => (
                <div
                  key={s.t}
                  className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-black/20"
                >
                  <p className="text-base font-bold text-slate-900 dark:text-white/90">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety + reliability */}
        <section className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3">
          {[
            {
              t: "Human in the loop",
              d: "AI supports learning, while faculty + life coach provide structure, motivation, and standards.",
            },
            {
              t: "Designed for home learning",
              d: "Short sessions, regulated screen time, and practical offline suggestions for balance.",
            },
            {
              t: "Built for diverse learners",
              d: "Personalised pacing and routines can be adjusted for many special learning needs.",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
            >
              <p className="text-base font-bold text-slate-900 dark:text-white/90">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{c.d}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-8 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none md:mt-16 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Want to see it in action?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                Try the assistant, then talk to admissions for the right plan for your child.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/try-it"
                className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
              >
                Try AI Assistant
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

