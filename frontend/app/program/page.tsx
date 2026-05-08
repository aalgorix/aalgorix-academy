import Link from "next/link";

/* ────────── tiny reusable components ────────── */

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-300/40 bg-slate-100 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-900">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
      {children}
    </span>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-[#1E3A8A]/80">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
        <svg className="h-3 w-3 text-slate-900" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {text}
    </li>
  );
}

function SkillPill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 transition hover:-translate-y-0.5 hover:shadow-sm">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium text-[#1E3A8A]">{label}</span>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-[#1E3A8A]/60">{label}</p>
    </div>
  );
}

/* ────────── page ────────── */

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ══ HERO ══ */}
      <section
        className="relative overflow-hidden pb-20 pt-32 text-center"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(15,23,42,0.08) 0%, transparent 70%), linear-gradient(180deg, #FAF7F0 0%, #EFF9FF 100%)",
        }}
      >
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-slate-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6">
          <SectionBadge>Aalgorix World Academy · Programs</SectionBadge>
          <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight text-[#0F172A] md:text-6xl">
            Choose Your{" "}
            <span className="shiny-heading">Learning Journey</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#1E3A8A]/70">
            Future-ready homeschooling and hybrid schooling for{" "}
            <strong>Grade 3 to Grade 12</strong>—with an <strong>AI Tutor</strong>, industry-trained
            faculty, life skills, and supplementary courses that build real-world outcomes.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#hybrid-school"
              className="rounded-xl px-9 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(15,23,42,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(15,23,42,0.55)]"
              style={{ background: "linear-gradient(135deg, #0F172A 0%, #0369A1 100%)" }}
            >
              Explore Hybrid School
            </Link>
            <Link
              href="#blended-learning"
              className="rounded-xl border border-slate-300 bg-white px-9 py-3.5 text-sm font-bold tracking-wide text-[#1E3A8A] shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
            >
              Browse Upskilling
            </Link>
          </div>
        </div>

        {/* Quick stats */}
        <div className="relative mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 px-6 md:grid-cols-4">
          {[
            { value: "15", label: "Max Batch Size" },
            { value: "8–18", label: "Age Group" },
            { value: "50/50", label: "Online / Offline" },
            { value: "3–12", label: "Grade Range" },
          ].map((s) => (
            <StatBox key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ══ SECTION 1 — HYBRID SCHOOL PROGRAM ══ */}
      <section id="hybrid-school" className="scroll-mt-20 border-t border-slate-100 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left: text */}
            <div>
              <SectionBadge>Grades 3 – 12</SectionBadge>
              <h2 className="mb-4 text-4xl font-extrabold leading-tight text-[#0F172A] md:text-5xl">
                Hybrid School{" "}
                <span className="shiny-heading">Program</span>
              </h2>
              <p className="mb-6 leading-relaxed text-[#1E3A8A]/70">
                Our flagship Hybrid School Program combines rigorous academics with
                personalised attention in small batches. Students experience the social and
                hands-on benefits of campus life alongside the flexibility and depth of live
                online instruction — giving them the absolute best of both worlds.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  "50% offline campus days & 50% live online classes",
                  "Maximum 15 students per batch for personalised attention",
                  "Industry-trained faculty, AI Tutor, and personalised learning plans",
                  "Regular assessments with detailed progress reports",
                  "International board affiliation and strong academic foundation",
                  "Extracurriculars, sports, and campus events included",
                ].map((t) => (
                  <CheckItem key={t} text={t} />
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(15,23,42,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(15,23,42,0.5)]"
                style={{ background: "linear-gradient(135deg, #0F172A 0%, #0369A1 100%)" }}
              >
                Enroll Now
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Right: feature cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏫", title: "Campus Days", desc: "Real classroom experience 3 days a week with labs and peer learning." },
                { icon: "💻", title: "Live Online", desc: "Interactive live sessions from home on remaining days — no commute." },
                { icon: "👥", title: "Small Batches", desc: "Max 15 students ensures every child gets individual attention." },
                { icon: "📊", title: "Progress Tracking", desc: "Weekly reports and parent dashboards to monitor growth." },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(15,23,42,0.1)]"
                >
                  <span className="mb-2 block text-3xl">{icon}</span>
                  <p className="mb-1 text-sm font-bold text-[#0F172A]">{title}</p>
                  <p className="text-xs leading-relaxed text-[#1E3A8A]/60">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — ONLINE + OFFLINE LEARNING ══ */}
      <section
        id="blended-learning"
        className="scroll-mt-20 border-t border-slate-100 py-24"
        style={{ background: "linear-gradient(180deg, #EFF9FF 0%, #FAF7F0 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left: visual timeline */}
            <div className="order-2 lg:order-1 space-y-4">
              {[
                { step: "01", title: "Recorded Lectures", desc: "Access high-quality recorded lessons anytime, at your own pace." },
                { step: "02", title: "Live Doubt Sessions", desc: "Join interactive live doubt-clearing sessions with expert teachers." },
                { step: "03", title: "Campus Activity Days", desc: "Regular hands-on campus days for labs, sports, and collaboration." },
                { step: "04", title: "Weekly Assessments", desc: "Structured quizzes and assignments to reinforce learning." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
                      style={{ background: "linear-gradient(135deg, #0F172A, #0369A1)" }}
                    >
                      {step}
                    </div>
                    <div className="mt-1 w-px flex-1 bg-slate-200" />
                  </div>
                  <div className="pb-4">
                    <p className="mb-1 text-sm font-bold text-[#0F172A]">{title}</p>
                    <p className="text-xs leading-relaxed text-[#1E3A8A]/60">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: text */}
            <div className="order-1 lg:order-2">
              <SectionBadge>Flexible Schedule</SectionBadge>
              <h2 className="mb-4 text-4xl font-extrabold leading-tight text-[#0F172A] md:text-5xl">
                Online + Offline{" "}
                <span className="shiny-heading">Learning</span>
              </h2>
              <p className="mb-6 leading-relaxed text-[#1E3A8A]/70">
                Our blended learning model removes the all-or-nothing choice between
                traditional school and online education. Students enjoy recorded lectures they
                can revisit, live sessions for real-time interaction, and regular campus days
                for socialisation and hands-on learning.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  "Learn at your own pace with HD recorded lectures",
                  "Live teacher-led sessions for real-time engagement",
                  "Campus days for labs, sports, and group projects",
                  "Parent portal with real-time academic updates",
                  "Learn from safety of your home — from anywhere",
                ].map((t) => (
                  <CheckItem key={t} text={t} />
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(15,23,42,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(15,23,42,0.5)]"
                style={{ background: "linear-gradient(135deg, #0F172A 0%, #0369A1 100%)" }}
              >
                Learn More
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — CURRICULUM DETAILS ══ */}
      <section id="curriculum" className="scroll-mt-20 border-t border-slate-100 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <SectionBadge>Future-Ready Curriculum</SectionBadge>
            <h2 className="mb-4 text-4xl font-extrabold leading-tight text-[#0F172A] md:text-5xl">
              Curriculum{" "}
              <span className="shiny-heading">Details</span>
            </h2>
            <p className="mx-auto max-w-2xl leading-relaxed text-[#1E3A8A]/70">
              We go beyond textbooks. Our curriculum pairs strong academics with
              21st-century skills so every student graduates future-ready.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">

            {/* Core academics */}
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <span className="text-3xl">📖</span>
                <h3 className="text-lg font-bold text-[#0F172A]">Core Academics</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Mathematics — conceptual mastery, not rote learning",
                  "Science — Physics, Chemistry, Biology with lab work",
                  "Languages — English, Hindi + regional options",
                  "Social Studies — critical thinking and global awareness",
                  "Arts, Physical Education & Life Skills",
                ].map((t) => <CheckItem key={t} text={t} />)}
              </ul>
            </div>

            {/* Future skills */}
            <div className="rounded-2xl border border-slate-300 bg-slate-50 p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <span className="text-3xl">🚀</span>
                <h3 className="text-lg font-bold text-[#0F172A]">Future-Ready Skills</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Coding & Programming — Python, Scratch, Web basics",
                  "Robotics — build, programme, and compete",
                  "Artificial Intelligence — concepts and hands-on projects",
                  "Drone Technology — design, fly, and code drones",
                  "Quantum Knowledge — foundational quantum concepts",
                  "Entrepreneurship — ideation, pitching, and product thinking",
                ].map((t) => <CheckItem key={t} text={t} />)}
              </ul>
            </div>
          </div>

          {/* Skill pills */}
          <div className="mt-10">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-[#1E3A8A]/50">
              Skill Areas Covered
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: "💻", label: "Coding" },
                { icon: "🤖", label: "Robotics" },
                { icon: "🧠", label: "Artificial Intelligence" },
                { icon: "🚁", label: "Drone Technology" },
                { icon: "⚛️", label: "Quantum Knowledge" },
                { icon: "🎨", label: "Design Thinking" },
                { icon: "💡", label: "Entrepreneurship" },
                { icon: "🌐", label: "Digital Literacy" },
              ].map((p) => (
                <SkillPill key={p.label} {...p} />
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-10 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(15,23,42,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(15,23,42,0.5)]"
              style={{ background: "linear-gradient(135deg, #0F172A 0%, #0369A1 100%)" }}
            >
              Download Full Curriculum
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v7M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Dropdowns: Boards / Languages / Life Skills / Competitive */}
          <div className="mt-16">
            <div className="mb-8 text-center">
              <SectionBadge>Explore Options</SectionBadge>
              <h3 className="text-2xl font-extrabold tracking-tight text-[#0F172A] md:text-3xl">
                Programs by Category
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#1E3A8A]/70">
                Click a category to view the available options.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-4">
              {[
                {
                  title: "Boards",
                  items: ["Primary", "Secondary"],
                },
                {
                  title: "Languages",
                  items: ["French", "Spanish", "German", "Italian", "Russian"],
                },
                {
                  title: "Life Skills",
                  items: ["Public speaking", "Communication skills", "Social skills"],
                },
                {
                  title: "Competitive",
                  items: ["Olympiad", "Robotics", "Scholarship Exams", "Interschool Quizzes"],
                },
              ].map(({ title, items }) => (
                <details
                  key={title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-base font-bold text-slate-900">{title}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition group-open:rotate-180">
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M4 6l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {items.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-sm text-[#1E3A8A]/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-900/70" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section
        className="relative overflow-hidden py-24 text-center"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(15,23,42,0.07) 0%, transparent 70%), #EFF9FF",
        }}
      >
        <div className="relative mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-4xl font-extrabold text-[#0F172A] md:text-5xl">
            Ready to{" "}
            <span className="shiny-heading">Begin?</span>
          </h2>
          <p className="mb-10 leading-relaxed text-[#1E3A8A]/70">
            Join Aalgorix World Academy and give your child the perfect blend of strong academics
            and future-ready skills. Seats fill fast — apply today.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-xl px-10 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(15,23,42,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(15,23,42,0.6)]"
              style={{ background: "linear-gradient(135deg, #0F172A 0%, #0369A1 100%)" }}
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-300 bg-white px-10 py-3.5 text-sm font-bold text-[#1E3A8A] shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
            >
              Talk to Admissions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
