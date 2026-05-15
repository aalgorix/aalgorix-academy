import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics | Aalgorix World Academy",
  description:
    "Explore Aalgorix academics: international board pathway (IA 441), Grades 3–12, talent farming, languages, life skills, and competitive programs.",
};

const scrollMt =
  "scroll-mt-[calc(var(--aa-topbar-h)+var(--aa-navbar-h)+12px)]";

const gradeBands = [
  {
    band: "Grade 3–5",
    stage: "Foundations",
    focus: "Literacy, numeracy, curiosity, and confident routines at home.",
    subjects: ["English & reading", "Mathematics", "Science basics", "Social awareness", "Creative projects"],
  },
  {
    band: "Grade 6–8",
    stage: "Explore",
    focus: "Concept depth, study habits, and early strength discovery.",
    subjects: ["Core sciences", "Mathematics (pre-algebra onward)", "Languages", "Digital literacy", "Project-based learning"],
  },
  {
    band: "Grade 9–10",
    stage: "Build",
    focus: "Exam readiness, supplementary courses, and closing learning gaps.",
    subjects: ["Board-aligned core subjects", "Supplementary mastery tracks", "Research & writing", "Talent pathways begin to specialise"],
  },
  {
    band: "Grade 11–12",
    stage: "Future ready",
    focus: "Portfolio, outcomes, and preparation for university or career pathways.",
    subjects: ["Senior board subjects", "Advanced electives", "Portfolio & capstone projects", "Career & communication skills"],
  },
];

const boards = [
  {
    id: "boards-primary",
    title: "Primary",
    grades: "Grades 3–5",
    desc: "Strong fundamentals in literacy, numeracy, and inquiry—delivered with short, focused sessions and offline practice so young learners build confidence without overload.",
    highlights: ["Structured daily rhythm", "AI Tutor for guided practice", "Parent-friendly progress updates"],
  },
  {
    id: "boards-secondary",
    title: "Secondary",
    grades: "Grades 6–12",
    desc: "Rigorous, internationally aligned academics with clear milestones, exam preparation where relevant, and supplementary courses to strengthen weak areas.",
    highlights: ["Board-aligned sequencing", "Faculty-led concept sessions", "Exam & portfolio readiness"],
  },
];

const languages = [
  { id: "languages-french", name: "French", note: "Foundations through conversational confidence; ideal for international mobility." },
  { id: "languages-spanish", name: "Spanish", note: "Widely spoken global language with cultural and academic breadth." },
  { id: "languages-german", name: "German", note: "Strong for STEM pathways and European higher education." },
  { id: "languages-italian", name: "Italian", note: "Arts, culture, and humanities enrichment alongside core academics." },
  { id: "languages-russian", name: "Russian", note: "Structured progression for families seeking this pathway." },
];

const lifeSkills = [
  { id: "life-skills-public-speaking", title: "Public speaking", desc: "Structure, voice, and presence—practice in safe, small settings from home." },
  { id: "life-skills-communication-skills", title: "Communication skills", desc: "Listening, clarity, and collaboration for school, family, and future work." },
  { id: "life-skills-social-skills", title: "Social skills", desc: "Empathy, boundaries, and teamwork taught alongside academics." },
];

const competitive = [
  { id: "competitive-olympiad", title: "Olympiad", desc: "Math, science, and logical reasoning prep with targeted practice and faculty guidance." },
  { id: "competitive-robotics", title: "Robotics", desc: "Hands-on problem solving, coding, and team projects aligned with talent farming." },
  { id: "competitive-scholarship-exams", title: "Scholarship exams", desc: "Structured prep plans, mock cycles, and gap-closing before key dates." },
  { id: "competitive-interschool-quizzes", title: "Interschool quizzes", desc: "General knowledge and quick-thinking drills with healthy competition." },
];

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-20">
        {/* Hero */}
        <section className={`mx-auto max-w-3xl text-center ${scrollMt}`}>
          <p className="badge-ai mb-4 inline-block">Academics</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            A complete academic pathway—from foundations to future-ready
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
            Aalgorix World Academy combines an <strong>internationally affiliated board pathway</strong> (
            <strong>IA 441</strong>), personalised learning with an <strong>AI Tutor</strong>,{" "}
            <strong>talent farming</strong>, languages, life skills, and competitive enrichment—for homeschoolers in{" "}
            <strong>Grade 3 through Grade 12</strong>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/program"
              className="rounded-xl bg-slate-900 px-7 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
            >
              View programs
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
            >
              Talk to admissions
            </Link>
          </div>
        </section>

        {/* Quick nav */}
        <nav
          aria-label="Academics sections"
          className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2"
        >
          {[
            { href: "#grades", label: "Grades" },
            { href: "#pathway", label: "Board & accreditation" },
            { href: "#boards", label: "Boards" },
            { href: "#talent", label: "Talent" },
            { href: "#languages", label: "Languages" },
            { href: "#life-skills", label: "Life skills" },
            { href: "#competitive", label: "Competitive" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/15 dark:bg-black/30 dark:text-white/85 dark:hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Grades */}
        <section id="grades" className={`mt-16 md:mt-20 ${scrollMt}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">Grade 3 to Grade 12</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Learning bands that grow with your child</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Each band has clear goals, the right level of challenge, and a balance of live teaching, AI-guided practice,
              and offline work—so progress stays visible year over year.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {gradeBands.map((g) => (
              <div
                key={g.band}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
                  {g.band}
                </p>
                <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white/90">{g.stage}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{g.focus}</p>
                <ul className="mt-4 space-y-2">
                  {g.subjects.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-slate-700 dark:text-white/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a45c]/90" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Board pathway */}
        <section
          id="pathway"
          className={`mt-16 rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-8 dark:border-white/10 dark:bg-black/20 md:mt-20 md:p-12 ${scrollMt}`}
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="badge-ai mb-4 inline-block">International pathway</p>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Board affiliation with globally recognised standards
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                We affiliate with <strong>International Education</strong> (accreditation{" "}
                <strong>IA 441</strong>)—a serious academic backbone for families who want homeschooling with
                international-grade expectations, not an ad-hoc curriculum.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                Core subjects follow a coherent sequence; supplementary courses and the AI Tutor close gaps; faculty
                sessions keep standards high and explanations clear.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex text-sm font-bold text-slate-900 underline decoration-slate-300 underline-offset-4 dark:text-white/90 dark:decoration-white/25"
              >
                Read about our accreditation
              </Link>
            </div>
            <div className="card-ai flex flex-col items-center gap-3 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c9a45c]/40 bg-white text-2xl dark:bg-black/40">
                🎓
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
                Accreditation
              </p>
              <p className="text-4xl font-bold text-slate-900 dark:text-white">IA 441</p>
              <p className="max-w-xs text-sm leading-relaxed text-slate-600 dark:text-white/65">
                Internationally recognised standards across the learning journey.
              </p>
            </div>
          </div>
        </section>

        {/* Boards */}
        <section id="boards" className={`mt-16 md:mt-20 ${scrollMt}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">Boards</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Primary and secondary pathways</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Two clear stages—each with age-appropriate rigour, pacing, and support from home.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {boards.map((b) => (
              <article
                key={b.id}
                id={b.id}
                className={`rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none ${scrollMt}`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b8924a] dark:text-[#c9a45c]">
                  {b.grades}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white/90">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-white/65">{b.desc}</p>
                <ul className="mt-5 space-y-2">
                  {b.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-700 dark:text-white/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a45c]/90" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Talent */}
        <section
          id="talent"
          className={`mt-16 rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-8 dark:border-white/10 dark:bg-black/20 md:mt-20 md:p-12 ${scrollMt}`}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="badge-ai mb-4 inline-block">Talent farming</p>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Academics plus deliberate talent growth
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                We use <strong>talent farming</strong> to mean spotting strengths early, building depth through practice
                and projects, and turning growth into portfolio-ready work—not labelling students once and moving on.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                The AI Tutor surfaces where learners accelerate or stall; faculty and talent pathways turn those signals
                into the right next challenge—Olympiad track, robotics, creative portfolio, or advanced electives.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/ai-tutor"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/15 dark:bg-black/30 dark:text-white/90 dark:hover:bg-white/10"
                >
                  AI Tutor
                </Link>
                <Link
                  href="/talent-support"
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 dark:bg-[#c9a45c] dark:text-slate-950"
                >
                  Talent support
                </Link>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { t: "Strength discovery", d: "Interests show up in practice patterns—not only test scores." },
                { t: "Depth & projects", d: "Reps, feedback, and stretch work build real skill." },
                { t: "Portfolio evidence", d: "Artefacts students can show as they grow." },
                { t: "Partner pathways", d: "Talent partners extend specialist coaching where needed." },
              ].map((item) => (
                <li
                  key={item.t}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-black/35"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-white/90">{item.t}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/65">{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Languages */}
        <section id="languages" className={`mt-16 md:mt-20 ${scrollMt}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">Languages</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">World languages as part of the journey</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Supplementary language tracks sit alongside core academics—structured for steady progress from home.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {languages.map((lang) => (
              <div
                key={lang.id}
                id={lang.id}
                className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none ${scrollMt}`}
              >
                <p className="text-lg font-bold text-slate-900 dark:text-white/90">{lang.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{lang.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Life skills */}
        <section id="life-skills" className={`mt-16 md:mt-20 ${scrollMt}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">Life skills</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Skills that travel beyond the exam hall</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Taught on purpose with a life coach—so confidence, communication, and habits support every subject.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {lifeSkills.map((skill) => (
              <article
                key={skill.id}
                id={skill.id}
                className={`rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-7 dark:border-white/10 dark:bg-black/25 ${scrollMt}`}
              >
                <p className="text-lg font-bold text-slate-900 dark:text-white/90">{skill.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{skill.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Competitive */}
        <section id="competitive" className={`mt-16 md:mt-20 ${scrollMt}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="badge-ai mb-4 inline-block">Competitive & enrichment</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Stretch goals for ambitious learners</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
              Optional tracks for students who want extra challenge—always with structure, not chaos.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {competitive.map((c) => (
              <article
                key={c.id}
                id={c.id}
                className={`rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none ${scrollMt}`}
              >
                <p className="text-xl font-bold text-slate-900 dark:text-white/90">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/65">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl border border-slate-200 bg-[color:var(--aa-bg-section)] p-8 shadow-sm dark:border-white/10 dark:bg-black/20 dark:shadow-none md:mt-20 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Not sure which track fits?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
                Admissions can map grade, board stage, talent interests, and support needs to a sensible weekly plan.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/learning-model"
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
              >
                Learning model
              </Link>
              <Link
                href="/contact"
                className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
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
