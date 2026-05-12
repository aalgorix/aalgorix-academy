import Link from "next/link";

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-20">
        {/* Hero */}
        <section className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="badge-ai mb-4 inline-block">Why Aalgorix</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              A modern, parent-friendly homeschooling system
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              We blend strong academics with an <strong>AI Tutor</strong>, industry-trained faculty, and
              life-skills mentoring—so learners grow with clarity, confidence, and real-world readiness
              from <strong>Grade 3 to Grade 12</strong>.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/learning-model"
                className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
              >
                See our learning model
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
              >
                Not convinced yet? Talk to a Homeschooler Parent Today!
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-6 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
              What you can expect
            </p>
            <div className="mt-5 grid gap-3">
              {[
                { t: "Clear learning plan", d: "A structured path with the right sequence and pace." },
                { t: "Visible progress", d: "Simple tracking so parents know what’s improving and what’s next." },
                { t: "Balanced screen time", d: "Short guided sessions + practical offline activities." },
                { t: "Support for diverse learners", d: "Flexible pacing and extra guidance for many special learning needs." },
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

        {/* Reasons */}
        <section className="mt-14 md:mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">What makes us different</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for outcomes, not overload</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              We focus on mastery, consistency, and real-world skills—so learning stays effective and
              sustainable for students and parents.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "AI Tutor + personalised learning",
                d: "Adaptive explanations and practice that match pace and level, with instant feedback to close gaps.",
              },
              {
                t: "Industry-trained faculty",
                d: "Teachers who explain clearly, maintain strong standards, and guide students toward deep understanding.",
              },
              {
                t: "Life coach + life skills",
                d: "Discipline, communication, leadership, and mindset—so students build habits that last.",
              },
              {
                t: "Talent farming",
                d: "Strength discovery + nurturing through projects and portfolios, preparing learners for an algorithmic world.",
              },
              {
                t: "Learn from the safety of home",
                d: "A stable routine without travel stress—supportive, focused, and parent-friendly.",
              },
              {
                t: "Support for special learning needs",
                d: "Flexible pacing, structured routines, and closer guidance—share needs during admission for the right setup.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
              >
                <p className="text-base font-bold text-slate-900 dark:text-white/90">{c.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-8 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none md:mt-16 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Want a plan for your child?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                We’ll recommend a learning path based on level, goals, and support needs.
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

