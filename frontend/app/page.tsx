import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import HeroTextSlider from "./components/HeroTextSlider";
import FloatingBannerVideo from "./components/FloatingBannerVideo";

/** Featured hero video — https://youtu.be/AA55pkP_4-0 */
const HERO_VIDEO_ID = "AA55pkP_4-0";

export default function Home() {
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/[^\d]/g, "");
  const whatsappMessage = [
    "Hi Aalgorix World Academy team,",
    "",
    "I want to enroll. Please share details about:",
    "- Program (Grade / Age):",
    "- City / Location:",
    "- Preferred timetable:",
    "",
    "Thank you!",
  ].join("\n");
  const whatsappHref = whatsappNumber
    ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

  const faqs: Array<{ q: string; a: ReactNode }> = [
    {
      q: "What is Aalgorix World Academy?",
      a: (
        <>
          Aalgorix World Academy is an online learning and homeschooling platform for{" "}
          <strong>Grade 3 to Grade 12</strong>—powered by an <strong>AI Tutor</strong> and guided by{" "}
          <strong>industry-trained faculty</strong>. We focus on personalised learning,
          supplementary courses, life skills, and real-world outcomes.
        </>
      ),
    },
    {
      q: "Which grades and age groups do you support?",
      a: (
        <>
          Our core learning path supports <strong>Grade 3 through Grade 12</strong>, with
          programs designed for learners in the <strong>8–18</strong> age group.
        </>
      ),
    },
    {
      q: "How does your AI-powered learning work?",
      a: (
        <>
          Our <strong>AI Tutor</strong> adapts learning pace and level, recommends practice and
          supplementary modules, and helps students build strong foundations. A dedicated{" "}
          <strong>life coach</strong> and faculty guidance keep learners consistent and motivated.
        </>
      ),
    },
    {
      q: "Do you support learners with special learning needs?",
      a: (
        <>
          Yes. We can support many learners who need extra attention through{" "}
          <strong>personalised pacing</strong>, structured routines, and closer mentor guidance. Share
          your child’s needs during admission so we can recommend the right plan and support setup.
        </>
      ),
    },
    {
      q: "What is the Hybrid School Program?",
      a: (
        <>
          The Hybrid School Program blends offline campus days with live online learning,
          small batches, and regular assessments. You can explore program details on the{" "}
          <Link href="/program" className="font-semibold text-[#0369A1] underline underline-offset-4">
            Programs
          </Link>{" "}
          page.
        </>
      ),
    },
    {
      q: "How do you manage screen time?",
      a: (
        <>
          We focus on <strong>regulated screen time</strong> by balancing guided learning
          with self-study and offline activities, keeping students engaged without
          excessive screen exposure.
        </>
      ),
    },
    {
      q: "Is this suitable for homeschooling?",
      a: (
        <>
          Yes. Students can <strong>learn from the safety of their home</strong> with a structured
          plan, personalised learning paths, and progress tracking—so parents get clarity without
          needing to supervise every session.
        </>
      ),
    },
    {
      q: "What makes your program future-ready?",
      a: (
        <>
          We prepare students for an <strong>algorithmic world</strong> with an{" "}
          <strong>AI-first curriculum</strong>, focus on real-world skills, and a balanced approach to{" "}
          <strong>talent farming</strong>—helping each learner discover strengths and build a portfolio.
        </>
      ),
    },
    {
      q: "Do you offer progress reports and assessments?",
      a: (
        <>
          Yes. Students get regular assessments and progress tracking. Parents can follow
          growth through clear updates and reports as learning advances.
        </>
      ),
    },
    {
      q: "How can I enroll or talk to admissions?",
      a: (
        <>
          You can reach our admissions team from the{" "}
          <Link href="/contact" className="font-semibold text-[#0369A1] underline underline-offset-4">
            Contact
          </Link>{" "}
          page. We’ll guide you on program fit, next steps, and onboarding.
        </>
      ),
    },
  ];

  return (
    <>
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <main>
        {/* ── Hero ── */}
        <section className="relative h-[100svh] min-h-[100svh] w-full overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
              style={{ minWidth: "100%", minHeight: "100%" }}
            >
              <source src="hero-video3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Overlays — keep video visible but text readable */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

          {/* Floating banner video (ad-style) */}
          <FloatingBannerVideo src="/banner-video.mp4" />

          {/* Hero Content */}
          <div className="pointer-events-none relative z-[2] mx-auto flex h-full max-w-7xl items-end px-4 pb-7 md:px-8 md:pb-10">
            <div className="max-w-2xl pointer-events-auto">
              <div className="mb-5 inline-flex rounded-full border border-white/15 bg-black/25 px-7 py-3 text-center text-lg font-extrabold tracking-wide backdrop-blur md:px-9 md:py-4 md:text-2xl">
                <span style={{ color: "#c9a45c" }}>Prepare your child for an Algorithmic World</span>
              </div>
              <HeroTextSlider />

              <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {/* Primary CTA */}
                <button
                  type="button"
                   className="h-11 w-full rounded-full border border-white/25 bg-white/5 px-7 text-center text-sm font-bold leading-[44px] text-white/95 backdrop-blur-sm transition hover:border-white/45 hover:bg-white/10 hover:text-white active:scale-[0.985] sm:w-auto sm:leading-normal sm:py-3"
                >
                  Explore
                </button>
                {/* Secondary CTA */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-full rounded-full border border-white/30 bg-white/10 px-7 text-center text-sm font-bold leading-[44px] text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/15 hover:text-[#c9a45c] active:scale-[0.985] sm:w-auto sm:leading-normal sm:py-3"
                >
                  Enroll Now
                </a>

                <Link
                  href="/try-it"
                  className="h-11 w-full rounded-full border border-white/25 bg-white/5 px-7 text-center text-sm font-bold leading-[44px] text-white/95 backdrop-blur-sm transition hover:border-white/45 hover:bg-white/10 hover:text-white active:scale-[0.985] sm:w-auto sm:leading-normal sm:py-3"
                >
                  Try AI Tutor
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Social sidebar */}
        <div className="fixed right-1 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 md:flex">
          {[
            { label: "Facebook", symbol: "f" },
            { label: "LinkedIn", symbol: "in" },
            { label: "YouTube", symbol: "yt" },
            { label: "Instagram", symbol: "ig" },
          ].map(({ label, symbol }) => (
            <a
              key={label}
              href="#"
              className="aa-soft-lift flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white/80 text-xs font-semibold text-slate-900 transition hover:border-slate-400/60 hover:bg-slate-900 hover:text-white dark:border-white/10 dark:bg-black/30 dark:text-white/80 dark:hover:bg-white/10"
              aria-label={label}
            >
              {symbol}
            </a>
          ))}
        </div>
      </main>

      {/* ── Value props ── */}
      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">Future-ready homeschooling</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Strong academics. Real-world skills.
              <br className="hidden md:block" /> Powered by an <span className="shiny-heading">AI Tutor</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Designed for <strong>Grade 3 to Grade 12</strong>. Learn from the safety of your home with
              personalised learning paths, supplementary courses, and mentorship that builds life skills.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "AI Tutor", body: "Adaptive learning that matches pace, level, and goals." },
              { title: "Industry-trained faculty", body: "Clear explanations, high standards, and expert mentoring." },
              { title: "Life Coach + life skills", body: "Discipline, confidence, communication, and leadership." },
              { title: "Talent farming", body: "Identify strengths early and nurture them consistently." },
              { title: "Special learning needs", body: "Flexible pacing and extra support for learners who need more care." },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
              >
                <p className="text-base font-bold text-slate-900 dark:text-white/90">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[color:var(--aa-bg-section)] py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <p className="badge-ai mb-4 inline-block">How it works</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">A simple system that delivers results</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Personalised learning isn’t just “more content”. It’s the right sequence, the right pace,
              and the right support—so your child builds mastery and confidence.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                { k: "01", t: "Assess", d: "Baseline check to understand level, gaps, and strengths." },
                { k: "02", t: "Personalise", d: "AI-first curriculum + supplementary course plan for mastery." },
                { k: "03", t: "Coach", d: "Faculty guidance + life coach for consistency and motivation." },
                { k: "04", t: "Track", d: "Progress updates for parents—clear, simple, actionable." },
              ].map((s) => (
                <div
                  key={s.k}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
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

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}`}
                title="Aalgorix World Academy — How Our Learning Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Grades + curriculum ── */}
      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">Grade 3 to Grade 12</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              AI-first curriculum with international board affiliation
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Built to prepare children for an <strong>algorithmic world</strong>—with a strong academic
              base and a consistent focus on real-world skills and life skills.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { band: "Grade 3–5", label: "Foundations", desc: "Confidence in basics + curiosity-led learning." },
              { band: "Grade 6–8", label: "Explore", desc: "Concept depth, projects, and structured habits." },
              { band: "Grade 9–10", label: "Build Concepts", desc: "Mastery + supplementary courses to close gaps." },
              { band: "Grade 11–12", label: "Future Ready", desc: "Real-world skills, portfolio, and outcomes." },
            ].map((b) => (
              <div
                key={b.band}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
                  {b.band}
                </p>
                <p className="mt-2 text-base font-bold text-slate-900 dark:text-white/90">{b.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              { t: "Supplementary Course", d: "Targeted modules that strengthen weak areas and accelerate strengths." },
              { t: "Focus on real-world skills", d: "Projects, communication, leadership, and practical application." },
              { t: "Learn from safety of your home", d: "Structured schedule + support—without daily commuting." },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
              >
                <p className="text-base font-bold text-slate-900 dark:text-white/90">{x.t}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/65">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/program"
              className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
            >
              Explore Programs
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-300 bg-white px-8 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
            >
              Talk to Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-[var(--background)] py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
          <div className="mb-10 text-center">
            <p className="badge-ai mb-4 inline-block">FAQ</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
              Frequently Asked{" "}
              <span className="shiny-heading">Questions</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Quick answers about AI Tutor, personalised learning, life skills, and admissions.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1">
                  <span className="text-base font-semibold text-slate-900 md:text-lg dark:text-white/90">
                    {item.q}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-900 transition group-open:rotate-45 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                    +
                  </span>
                </summary>
                <div className="pt-3 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/program"
              className="rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
            >
              Explore Programs
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-300 bg-white px-8 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
            >
              Talk to Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[color:var(--aa-bg-section)] py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="badge-ai mb-4 inline-block">Next step</p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Ready to build a future-ready learning path?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                  Talk to admissions to find the right program for Grade 3 to 12. We’ll recommend a personalised
                  plan, supplementary courses, and the right mix of academics + real-world skills.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-slate-900 px-8 py-3 text-center text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
                >
                  Enroll / Chat Now
                </a>
                <Link
                  href="/try-it"
                  className="rounded-xl border border-slate-300 bg-white px-8 py-3 text-center text-sm font-bold text-slate-900 transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
                >
                  Try AI Assistant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
