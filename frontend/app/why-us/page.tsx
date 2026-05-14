import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Aalgorix | Aalgorix World Academy",
  description:
    "Why homeschooling can work for your family—and why families choose Aalgorix: international pathway (IA 441), AI Tutor plus faculty, life skills coaching, and a clear plan from Grade 3 to Grade 12.",
};

const expectations = [
  {
    t: "Clear learning plan",
    d: "A structured path with the right sequence and pace—so you always know what comes next and why it matters.",
  },
  {
    t: "Visible progress",
    d: "Straightforward tracking and updates: strengths, gaps, and next steps without guesswork or spreadsheet overload.",
  },
  {
    t: "Balanced screen time",
    d: "Focused live and guided sessions paired with offline practice and projects—learning stays active, not passive scrolling.",
  },
  {
    t: "Support for diverse learners",
    d: "Flexible pacing, predictable routines, and closer guidance when needed. Share context at admission so we plan support early.",
  },
];

const differentiators: {
  icon: string;
  t: string;
  d: string;
  bullets: string[];
  href?: string;
  cta?: string;
}[] = [
  {
    icon: "🤖",
    t: "AI Tutor + personalised learning",
    d: "Adaptive explanations and practice match your child’s level and pace. Instant feedback closes gaps before they compound.",
    bullets: ["Right level, every session", "Practice that adapts", "Confidence through mastery"],
    href: "/ai-tutor",
    cta: "Explore AI Tutor",
  },
  {
    icon: "🌍",
    t: "International pathway alignment",
    d: "We affiliate with International Education (accreditation IA 441)—a serious academic backbone alongside modern, skill-forward learning.",
    bullets: ["Globally recognised standards", "Strong fundamentals", "Clear progression across grades"],
    href: "/about",
    cta: "Our accreditation story",
  },
  {
    icon: "👩‍🏫",
    t: "Industry-trained faculty",
    d: "Teachers who explain clearly, hold high standards, and teach students how to think—not only what to memorise for the next test.",
    bullets: ["Small-batch attention", "Exam readiness where it counts", "Questions welcomed"],
  },
  {
    icon: "🌱",
    t: "Life coach + life skills",
    d: "Discipline, communication, leadership, and mindset are taught on purpose—habits that support academics long after a lesson ends.",
    bullets: ["Consistency and focus", "Confidence in communication", "Decision-making under pressure"],
  },
  {
    icon: "🎯",
    t: "Talent farming",
    d: "We help learners discover strengths early and build evidence through projects and portfolios—especially relevant in an algorithmic, project-driven world.",
    bullets: ["Strength discovery", "Portfolio-ready work", "Future-ready curiosity"],
  },
  {
    icon: "🏠",
    t: "Learn from the safety of home",
    d: "Structured homeschooling without the daily commute: a calmer routine, fewer disruptions, and a setup parents can align with work and family life.",
    bullets: ["Predictable schedule", "Safe, familiar environment", "Parent-friendly operations"],
  },
];

const whoThrives = [
  {
    title: "Parents who want clarity",
    body: "You want a plan you can trust, updates you can understand, and a partner who handles instructional load without you becoming a full-time tutor.",
  },
  {
    title: "Learners who need the right pace",
    body: "Whether accelerating or needing more time, your child benefits from adaptive practice, patient explanations, and routines that build consistency.",
  },
  {
    title: "Families planning ahead",
    body: "From middle school through senior years, you value a single coherent journey—academics, skills, and readiness for what comes next.",
  },
];

const faqs = [
  {
    q: "Is this only self-paced videos?",
    a: "No. Aalgorix combines live faculty support, structured milestones, and an AI Tutor for practice and remediation. Your child is guided—not left alone with a playlist.",
  },
  {
    q: "How much time should parents expect to spend each week?",
    a: "It varies by age and goals, but the system is built to reduce daily micro-management. Admissions can outline a realistic rhythm for your family during a call.",
  },
  {
    q: "Can you support special learning needs?",
    a: "We offer flexible pacing, structured routines, and closer guidance in many cases. The best next step is to share your context during admission so we can recommend the right setup.",
  },
];

const scrollMt =
  "scroll-mt-[calc(var(--aa-topbar-h)+var(--aa-navbar-h)+12px)]";

export default function WhyUsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Why homeschooling — first, for families comparing options */}
      <section
        id="why-homeschooling"
        className={`border-b border-slate-200/80 bg-[var(--background)] px-4 pb-12 pt-28 dark:border-white/10 md:px-8 md:pb-14 md:pt-32 ${scrollMt}`}
      >
        <div className="relative mx-auto max-w-7xl">
          <p className="badge-ai mb-4 inline-block">Why homeschooling</p>
          <h2 className="max-w-3xl text-2xl font-bold tracking-tight md:text-4xl">
            Home as the classroom: depth, safety, and a rhythm that fits real life
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
            Homeschooling is not “less school”—it is a different way to run learning. When done with structure and the right
            support, it can mean <strong>fewer distractions</strong>, <strong>pace matched to the child</strong>, and{" "}
            <strong>more time for depth</strong> (reading, projects, sleep, and family)—without giving up academic rigour.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Personalisation that sticks",
                body: "Less one-size-fits-all pacing: revisit what was shaky, move faster where there is mastery, and build confidence instead of constant comparison.",
              },
              {
                title: "Wellbeing and safety",
                body: "A predictable base at home can reduce commute stress, illness cycles, and social pressure—while still keeping live teaching, accountability, and clear goals.",
              },
              {
                title: "Parents stay in the loop",
                body: "You are not meant to replace every subject expert. The right program gives you visibility—plans, progress, and people you can talk to—so you lead the journey without burning out.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
              >
                <p className="text-sm font-bold text-slate-900 dark:text-white/90">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-white/60">
            Aalgorix exists for families who want those benefits <strong>with</strong> international-grade academics, live
            faculty, an AI Tutor for practice, and coaching for life skills—so homeschooling feels organised, not improvised.
          </p>
        </div>
      </section>

      {/* Hero band */}
      <section
        id="why-aalgorix"
        className={`relative overflow-hidden border-b border-slate-200/80 bg-[color:var(--aa-bg-section)] px-4 pb-14 pt-12 dark:border-white/10 md:px-8 md:pb-16 md:pt-14 ${scrollMt}`}
      >
        <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-slate-300/20 blur-3xl dark:bg-blue-500/10" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#c9a45c]/10 blur-3xl dark:bg-amber-400/5" />

        <div className="relative mx-auto max-w-7xl">
          <p className="badge-ai mb-4 inline-block">Why Aalgorix</p>
          <h1 className="max-w-4xl text-3xl font-bold tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-tight">
            Homeschooling with{" "}
            <span className="glow-text">outcomes you can see</span>—not homework chaos
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
            Aalgorix World Academy blends an <strong>AI Tutor</strong>, industry-trained teachers, and intentional{" "}
            <strong>life-skills coaching</strong> on an internationally aligned pathway (
            <strong>IA 441</strong>)—so learners from <strong>Grade 3 to Grade 12</strong> grow with clarity, confidence,
            and real-world readiness from home.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/learning-model"
              className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
            >
              See our learning model
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/30 dark:text-white/85 dark:hover:bg-white/10"
            >
              Talk to a homeschool parent advisor
            </Link>
            <Link
              href="/program"
              className="rounded-xl border border-transparent px-7 py-3 text-center text-sm font-bold text-slate-800 underline decoration-slate-300 underline-offset-4 transition-all hover:text-slate-950 dark:text-white/80 dark:decoration-white/25 dark:hover:text-white"
            >
              View programs
            </Link>
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/90 bg-white/80 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-black/25">
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-white/50">Accreditation</dt>
              <dd className="mt-2 text-lg font-bold text-slate-900 dark:text-white/95">IA 441</dd>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-white/60">
                International Education affiliation—globally recognised standards.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white/80 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-black/25">
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-white/50">Span</dt>
              <dd className="mt-2 text-lg font-bold text-slate-900 dark:text-white/95">Grade 3 → 12</dd>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-white/60">
                One continuous journey: academics, skills, and talent development.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white/80 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-black/25">
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-white/50">System</dt>
              <dd className="mt-2 text-lg font-bold text-slate-900 dark:text-white/95">AI + people</dd>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-white/60">
                Tutor, faculty, and life coach working as one structured program.
              </p>
            </div>
          </dl>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12 md:px-8 md:pb-20 md:pt-14">
        {/* Expectations + positioning */}
        <section id="expectations" className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-12 ${scrollMt}`}>
          <div>
            <p className="badge-ai mb-4 inline-block">What you can expect</p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">A partner—not a pile of logins</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Most “online school” stacks leave parents coordinating tools and guessing whether progress is real. We design
              for <strong>mastery, consistency, and transparency</strong>—so learning stays effective and sustainable.
            </p>
            <ul className="mt-8 space-y-4 border-l-2 border-slate-200 pl-6 dark:border-white/15">
              <li>
                <p className="text-sm font-bold text-slate-900 dark:text-white/90">Outcomes over overload</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-white/65">
                  Fewer scattered apps; more coherent sequencing, feedback, and follow-through.
                </p>
              </li>
              <li>
                <p className="text-sm font-bold text-slate-900 dark:text-white/90">Whole-child, whole journey</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-white/65">
                  Academics plus habits and communication—skills that show up in exams and in life.
                </p>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-6 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">On day one</p>
            <div className="mt-5 grid gap-3">
              {expectations.map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-black/30"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-white/90">{x.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-white/65">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section id="differentiators" className={`mt-16 md:mt-20 ${scrollMt}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">What makes us different</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for mastery—not burnout</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Every pillar exists for a reason: together they keep students challenged, supported, and moving forward
              without sacrificing wellbeing at home.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {differentiators.map((c) => (
              <div
                key={c.t}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
              >
                <p className="text-xl font-bold text-slate-900 dark:text-white/90">
                  <span className="mr-2 inline-block" aria-hidden>
                    {c.icon}
                  </span>
                  {c.t}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-white/65 md:text-base">{c.d}</p>
                <ul className="mt-5 grid gap-2 text-sm text-slate-700 dark:text-white/70 sm:grid-cols-1">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a45c]/90" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {c.href && (
                  <div className="mt-6">
                    <Link
                      href={c.href}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
                    >
                      {c.cta ?? "Learn more"}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Who thrives */}
        <section
          id="who-thrives"
          className={`mt-16 rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-8 dark:border-white/10 dark:bg-black/20 md:mt-20 md:p-12 ${scrollMt}`}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">Who thrives here</p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">If this sounds like you, you’re in the right place</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {whoThrives.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-black/30"
              >
                <p className="text-base font-bold text-slate-900 dark:text-white/90">{w.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={`mt-16 md:mt-20 ${scrollMt}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">Straight answers</p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Questions parents ask first</h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-black/30">
            {faqs.map((f) => (
              <div key={f.q} className="p-6 first:rounded-t-2xl last:rounded-b-2xl">
                <p className="text-sm font-bold text-slate-900 dark:text-white/90">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-8 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none md:mt-20 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Want a plan shaped around your child?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                Tell us about level, goals, and learning style—we’ll recommend a sensible path and what a typical week looks
                like.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/program"
                className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
              >
                Explore programs
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
              >
                Book a call
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
