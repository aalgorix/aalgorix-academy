import Link from "next/link";

export default function LearningModelPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-20">
        {/* Hero */}
        <section className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="badge-ai mb-4 inline-block">Our learning model</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              A modern system for homeschooling success
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Built for <strong>Grade 3 to Grade 12</strong>. We combine an <strong>AI Tutor</strong>,
              industry-trained teachers, and skill-first mentoring to help learners grow academically and
              personally—right from home.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ai-tutor"
                className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
              >
                Explore AI Tutor
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
                { t: "Personalised learning", d: "Right pace, right level, right sequence." },
                { t: "Real-world skills", d: "Projects, communication, and practical outcomes." },
                { t: "Progress clarity", d: "Simple reports parents can actually use." },
                { t: "Special learning needs", d: "Flexible routines + extra guidance when needed." },
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

          <div className="rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-6 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
              What parents get
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">A clear, guided learning journey</h2>
            <div className="mt-6 grid gap-3">
              {[
                { k: "01", t: "Assess", d: "Find level, gaps, strengths, and the best next step." },
                { k: "02", t: "Plan", d: "AI-first curriculum + supplementary course plan for mastery." },
                { k: "03", t: "Teach", d: "Faculty sessions + AI tutor practice to build confidence." },
                { k: "04", t: "Coach", d: "Life coach builds discipline, motivation, and consistency." },
                { k: "05", t: "Track", d: "Progress updates that keep parents informed and in control." },
              ].map((s) => (
                <div
                  key={s.k}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-black/30"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-extrabold text-white dark:bg-white/90 dark:text-black">
                    {s.k}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white/90">{s.t}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-white/65">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="mt-14 md:mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">The 4 pillars</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything works together</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              A great education isn’t only academics. It’s the right pace, the right mentoring, the right
              skills, and the right environment to grow.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "AI Tutor",
                d: "Adaptive practice with instant feedback. Learners get help exactly when they need it—so they build mastery without pressure.",
                bullets: ["Personalised pacing", "Concept clarity", "Targeted practice"],
                href: "/ai-tutor",
                cta: "Learn about AI Tutor",
              },
              {
                t: "Industry-trained faculty",
                d: "Teachers who explain clearly, set high standards, and guide students to think—so learning becomes strong and confident.",
                bullets: ["Small-batch guidance", "Strong fundamentals", "Exam readiness"],
              },
              {
                t: "Talent farming",
                d: "We help learners discover strengths early and nurture them consistently—so they build a portfolio and future-ready skills.",
                bullets: ["Strength discovery", "Projects & portfolios", "Algorithmic-world readiness"],
              },
              {
                t: "Life skills",
                d: "Communication, leadership, and discipline are taught intentionally—so students can apply knowledge in the real world.",
                bullets: ["Confidence & communication", "Decision-making", "Consistency & focus"],
              },
            ].map((p) => (
              <div
                key={p.t}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
              >
                <p className="text-xl font-bold text-slate-900 dark:text-white/90">{p.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-white/65 md:text-base">{p.d}</p>
                <ul className="mt-5 grid gap-2 text-sm text-slate-700 dark:text-white/70 sm:grid-cols-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c9a45c]/90" />
                      {b}
                    </li>
                  ))}
                </ul>
                {p.href && (
                  <div className="mt-6">
                    <Link
                      href={p.href}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
                    >
                      {p.cta ?? "Learn more"}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-8 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none md:mt-16 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ready to choose the right plan?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                We’ll recommend a learning path based on your child’s level, goals, and support needs.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/program"
                className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
              >
                Explore Programs
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

