import Link from "next/link";

/* ────────── tiny reusable components ────────── */

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00BFFF]/25 bg-[#00BFFF]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#00BFFF]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#00BFFF]" />
      {children}
    </span>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-white/70">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00BFFF]/15">
        <svg className="h-3 w-3 text-[#00BFFF]" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {text}
    </li>
  );
}

function SkillPill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#00BFFF]/20 bg-[#00BFFF]/8 px-4 py-2.5">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium text-white/80">{label}</span>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#00BFFF]/5 p-5 text-center">
      <p className="text-2xl font-extrabold text-[#00BFFF]">{value}</p>
      <p className="mt-1 text-xs text-white/50">{label}</p>
    </div>
  );
}

/* ────────── page ────────── */

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#0A1428] text-white">

      {/* ══ HERO ══ */}
      <section
        className="relative overflow-hidden pb-20 pt-32 text-center"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(0,191,255,0.10) 0%, transparent 70%), linear-gradient(180deg,#0A1428 0%,#0D1F3C 100%)",
        }}
      >
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#00BFFF]/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#00BFFF]/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6">
          <SectionBadge>Aalgorix Academy · Programs</SectionBadge>
          <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Choose Your{" "}
            <span className="text-[#00BFFF]">Learning Journey</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/55">
            Hybrid Schooling and Future-Ready Programs for Ages 8–18, blending the best of
            campus life with cutting-edge digital learning.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#hybrid-school"
              className="rounded-xl px-9 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(0,191,255,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(0,191,255,0.55)]"
              style={{ background: "linear-gradient(135deg,#00BFFF 0%,#0070C0 100%)" }}
            >
              Explore Hybrid School
            </Link>
            <Link
              href="#blended-learning"
              className="rounded-xl border border-white/25 bg-white/5 px-9 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:border-[#00BFFF]/60 hover:bg-[#00BFFF]/10 hover:text-[#00BFFF]"
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

      {/* ══════════════════════════════════════════
          SECTION 1 — HYBRID SCHOOL PROGRAM
      ══════════════════════════════════════════ */}
      <section id="hybrid-school" className="scroll-mt-20 border-t border-white/8 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left: text */}
            <div>
              <SectionBadge>Grades 3 – 12</SectionBadge>
              <h2 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
                Hybrid School <span className="text-[#00BFFF]">Program</span>
              </h2>
              <p className="mb-6 leading-relaxed text-white/60">
                Our flagship Hybrid School Program combines rigorous academics with
                personalised attention in small batches. Students experience the social and
                hands-on benefits of campus life alongside the flexibility and depth of live
                online instruction — giving them the absolute best of both worlds.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  "50% offline campus days & 50% live online classes",
                  "Maximum 15 students per batch for personalised attention",
                  "Certified, experienced teachers and AI-assisted learning tools",
                  "Regular assessments with detailed progress reports",
                  "Strong CBSE / ICSE academic curriculum backbone",
                  "Extracurriculars, sports, and campus events included",
                ].map((t) => (
                  <CheckItem key={t} text={t} />
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,191,255,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(0,191,255,0.5)]"
                style={{ background: "linear-gradient(135deg,#00BFFF 0%,#0070C0 100%)" }}
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
                  className="rounded-xl border border-white/8 bg-[#0D1F3C] p-5 transition-all hover:border-[#00BFFF]/30 hover:shadow-[0_4px_20px_rgba(0,191,255,0.08)]"
                >
                  <span className="mb-2 block text-3xl">{icon}</span>
                  <p className="mb-1 text-sm font-bold text-white">{title}</p>
                  <p className="text-xs leading-relaxed text-white/50">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — ONLINE + OFFLINE LEARNING
      ══════════════════════════════════════════ */}
      <section
        id="blended-learning"
        className="scroll-mt-20 border-t border-white/8 py-24"
        style={{ background: "linear-gradient(180deg,#0D1F3C 0%,#0A1428 100%)" }}
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
                      style={{ background: "linear-gradient(135deg,#00BFFF,#0070C0)" }}
                    >
                      {step}
                    </div>
                    <div className="mt-1 w-px flex-1 bg-[#00BFFF]/15" />
                  </div>
                  <div className="pb-4">
                    <p className="mb-1 text-sm font-bold text-white">{title}</p>
                    <p className="text-xs leading-relaxed text-white/50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: text */}
            <div className="order-1 lg:order-2">
              <SectionBadge>Flexible Schedule</SectionBadge>
              <h2 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
                Online + Offline <span className="text-[#00BFFF]">Learning</span>
              </h2>
              <p className="mb-6 leading-relaxed text-white/60">
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
                  "No geographical restriction — learn from anywhere",
                ].map((t) => (
                  <CheckItem key={t} text={t} />
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,191,255,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(0,191,255,0.5)]"
                style={{ background: "linear-gradient(135deg,#00BFFF 0%,#0070C0 100%)" }}
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

      {/* ══════════════════════════════════════════
          SECTION 3 — CURRICULUM DETAILS
      ══════════════════════════════════════════ */}
      <section id="curriculum" className="scroll-mt-20 border-t border-white/8 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <SectionBadge>Future-Ready Curriculum</SectionBadge>
            <h2 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Curriculum <span className="text-[#00BFFF]">Details</span>
            </h2>
            <p className="mx-auto max-w-2xl leading-relaxed text-white/55">
              We go beyond textbooks. Our curriculum pairs strong academics with
              21st-century skills so every student graduates future-ready.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">

            {/* Core academics */}
            <div className="rounded-2xl border border-white/8 bg-[#0D1F3C] p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="text-3xl">📖</span>
                <h3 className="text-lg font-bold text-white">Core Academics</h3>
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
            <div className="rounded-2xl border border-[#00BFFF]/20 bg-[#00BFFF]/5 p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="text-3xl">🚀</span>
                <h3 className="text-lg font-bold text-white">Future-Ready Skills</h3>
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
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
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
              className="inline-flex items-center gap-2 rounded-xl px-10 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,191,255,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(0,191,255,0.5)]"
              style={{ background: "linear-gradient(135deg,#00BFFF 0%,#0070C0 100%)" }}
            >
              Download Full Curriculum
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v7M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section
        className="relative overflow-hidden py-24 text-center"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%,rgba(0,191,255,0.08) 0%,transparent 70%),#0D1F3C",
        }}
      >
        <div className="relative mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-4xl font-extrabold md:text-5xl">
            Ready to <span className="text-[#00BFFF]">Begin?</span>
          </h2>
          <p className="mb-10 leading-relaxed text-white/55">
            Join Aalgorix Academy and give your child the perfect blend of strong academics
            and future-ready skills. Seats fill fast — apply today.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-xl px-10 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(0,191,255,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(0,191,255,0.6)]"
              style={{ background: "linear-gradient(135deg,#00BFFF 0%,#0070C0 100%)" }}
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/20 bg-white/5 px-10 py-3.5 text-sm font-bold text-white/80 transition-all hover:border-[#00BFFF]/50 hover:text-[#00BFFF]"
            >
              Talk to Admissions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
