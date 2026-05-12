import Link from "next/link";

export default function TalentPartnersPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-20">
        <section className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="badge-ai mb-4 inline-block">Talent Partners</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Collaborate to build future-ready learners
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              We work with industry and education partners to bring real-world exposure, mentorship,
              and meaningful opportunities to students—aligned with our AI-first curriculum for{" "}
              <strong>Grade 3 to Grade 12</strong>.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
              >
                Become a Partner
              </Link>
              <Link
                href="/learning-model"
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
              >
                See Learning Model
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-7 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
              Partner areas
            </p>
            <div className="mt-5 grid gap-3">
              {[
                { t: "Guest sessions", d: "Talks and demos from industry-trained mentors." },
                { t: "Workshops", d: "Real-world skills: communication, projects, and problem-solving." },
                { t: "Competitions", d: "Olympiads, robotics, quizzes, and challenges." },
                { t: "Mentorship", d: "Career exposure and guidance for long-term growth." },
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

