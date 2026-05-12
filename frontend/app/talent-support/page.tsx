import Link from "next/link";

export default function TalentSupportPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-20">
        <section className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="badge-ai mb-4 inline-block">Talent Support</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Support for strengths, pace, and confidence
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Talent support combines personalised learning, mentoring, and skill-building so learners
              can discover strengths early and grow consistently—academics + real-world skills + life
              skills.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
              >
                Talk to Our Team
              </Link>
              <Link
                href="/ai-tutor"
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
              >
                Explore AI Tutor
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-7 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
              What’s included
            </p>
            <div className="mt-5 grid gap-3">
              {[
                { t: "Strength discovery", d: "Identify strengths and interests early (talent farming approach)." },
                { t: "Supplementary support", d: "Extra modules to close gaps and build mastery." },
                { t: "Life skills coaching", d: "Confidence, communication, discipline, and mindset." },
                { t: "Special learning needs", d: "Flexible pacing and structured routines with closer guidance when needed." },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-black/30"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-white/90">{x.t}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/65">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

