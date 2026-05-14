import Link from "next/link";

/** Server-rendered banner so it always appears above the fold on /ai-tutor */
export default function TalentFarmingIntro() {
  return (
    <section
      id="talent-farming"
      className="relative z-10 w-full border-b border-slate-200 bg-white px-4 py-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950 md:px-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 border-l-4 border-[#c9a45c] pl-4 md:pl-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b8924a] dark:text-[#c9a45c]">
            Talent farming
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl dark:text-white">
            We grow talent on purpose—not by accident
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base dark:text-white/75">
            For us, <strong className="text-slate-900 dark:text-white">talent farming</strong> means spotting strengths
            early, building depth through practice and projects, and turning progress into{" "}
            <strong className="text-slate-900 dark:text-white">portfolio-ready work</strong> from Grade 3 through Grade 12.
            The <strong className="text-slate-900 dark:text-white">AI Tutor</strong> is the daily layer that adapts,
            closes gaps, and shows where a learner accelerates or stalls—signals we pair with faculty and talent pathways.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Discover strengths",
              d: "Patterns in practice—not only scores—reveal what to nurture next.",
            },
            {
              t: "Depth over dabbling",
              d: "Reps, feedback, and stretch work beat one-off “talent” events.",
            },
            {
              t: "Visible outcomes",
              d: "Projects and artefacts students can show as they grow.",
            },
            {
              t: "Humans + AI",
              d: "Tutor for pace and practice; coaches and teachers set the frame.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-4 dark:border-white/10 dark:bg-slate-900/80"
            >
              <p className="text-sm font-bold text-slate-900 dark:text-white">{item.t}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-white/65 md:text-sm">{item.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/talent-support"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 dark:bg-[#c9a45c] dark:text-slate-950 dark:hover:bg-[#d4ae6a]"
          >
            Talent support
          </Link>
          <Link
            href="/learning-model"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
          >
            Learning model
          </Link>
        </div>
      </div>
    </section>
  );
}
