import TeamCard from "../components/TeamCard";

const whyChooseUs = [
  {
    icon: "🤖",
    title: "AI Tutor + AI-first Curriculum",
    body: "Personalised learning with an AI Tutor, practice recommendations, and an AI-first curriculum designed for an algorithmic world.",
  },
  {
    icon: "📚",
    title: "International Board Affiliation",
    body: "International board aligned pathway with strong academics and modern skill development from Grade 3 to Grade 12.",
  },
  {
    icon: "⏱️",
    title: "Learn from Safety of Home",
    body: "Structured learning at home with clear routines, live support, and accountability—without heavy day-to-day supervision.",
  },
  {
    icon: "🧠",
    title: "Real-World Skills",
    body: "Focus on practical skills, critical thinking, and communication—so learning translates into outcomes students can apply.",
  },
  {
    icon: "🏠",
    title: "Life Coach + Life Skills",
    body: "A life coach helps build discipline and confidence while students learn life skills like communication, leadership, and mindset.",
  },
  {
    icon: "🎯",
    title: "Grade 3 to 12",
    body: "A complete learning path with supplementary courses, talent farming, and personalised learning at every stage.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ── Hero / Banner ── */}
      <section className="relative overflow-hidden bg-[color:var(--aa-bg-section)] py-24 px-6 text-center">
        {/* subtle glow blobs */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-slate-300/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-48 w-48 rounded-full bg-blue-400/10 blur-2xl" />

        <p className="badge-ai mb-5 inline-block">Who We Are</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
          Welcome to{" "}
          <span className="glow-text">Aalgorix World Academy</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#1E3A8A]/80">
          We are dedicated to providing top-tier education that seamlessly integrates
          forward-thinking practices — delivering globally recognised standards from
        Grade 3 all the way through Grade 12.
        </p>
      </section>

      {/* ── About Aalgorix World Academy ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Text */}
          <div>
            <p className="badge-ai mb-4 inline-block">About Us</p>
            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[#0F172A] md:text-4xl">
              Proudly Affiliated with{" "}
              <span className="glow-text">International Education</span>
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-[#1E3A8A]/80">
              Aalgorix World Academy proudly affiliates with International Education,
              boasting the accreditation number{" "}
              <span className="font-semibold text-[#0F172A]">IA 441</span>. This affiliation
              is a testament to our unwavering dedication to delivering globally
              recognised educational standards.
            </p>
            <p className="text-sm leading-relaxed text-[#1E3A8A]/80">
              Our foremost commitment is to ensure that our students embark on a
              well-rounded academic journey, characterised by competitiveness and
              excellence. Explore the world of quality education and innovative thinking
              with Aalgorix World Academy — where every student&apos;s potential is nurtured
              for a successful future.
            </p>
          </div>

          {/* Accreditation Badge Card */}
          <div className="card-ai flex flex-col items-center gap-4 py-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-slate-300/50 bg-gradient-to-br from-slate-100 to-slate-50 text-3xl">
              🎓
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-slate-900">
              International Accredited
            </h3>
            <p className="text-3xl font-bold text-[#0F172A]">IA 441</p>
            <p className="max-w-xs text-sm leading-relaxed text-[#1E3A8A]/80">
              Internationally recognised accreditation ensuring world-class academic
              standards for every Aalgorix World Academy student.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-[color:var(--aa-bg-section)] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="badge-ai mb-4 inline-block">Our Purpose</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[#0F172A] md:text-4xl">
              Mission &amp; Vision
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="card-ai border-l-4 border-l-slate-900">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#1E3A8A]/80">
                To make world-class, AI-guided education accessible to every learner —
                personalised to their pace, level, and passion — so that no student is
                ever left behind. We balance guided learning and self-study to build
                confident, independent thinkers ready for tomorrow.
              </p>
            </div>

            {/* Vision */}
            <div className="card-ai border-l-4 border-l-blue-500">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">🔭</span>
                <h3 className="text-xl font-bold text-blue-600">Our Vision</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#1E3A8A]/80">
                A future where every child — from Nursery to Grade 12 — has a dedicated
                AI mentor that understands them deeply and guides them toward becoming
                self-driven, future-ready learners who excel globally through
                competitiveness and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Making a Difference ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="badge-ai mb-4 inline-block">Our Impact</p>
          <h2 className="text-3xl font-bold uppercase tracking-tight text-[#0F172A] md:text-4xl">
            Making a Difference
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-[#1E3A8A]/80">
              Designed through Grade 3 to Grade 12, the{" "}
              <span className="font-semibold text-[#0F172A]">Aalgorix World Academy App</span>{" "}
              aims to provide a balance between Guided Learning &amp; Self-Study. We aim
              at regulating screen time for children while offering fun educational
              content.
            </p>
            <p className="text-sm leading-relaxed text-[#1E3A8A]/80">
              Students learn at their own pace with minimal supervision. Our technology
              identifies real-time progress and provides an adaptive curriculum by
              bridging learning gaps.
            </p>
            <p className="text-sm leading-relaxed text-[#1E3A8A]/80">
              Our Homeschooling in India curriculum hones{" "}
              <span className="font-semibold text-[#0F172A]">Critical Thinking Skills</span>,{" "}
              <span className="font-semibold text-[#0F172A]">Reasoning Skills</span> &amp;{" "}
              <span className="font-semibold text-[#0F172A]">Memory</span> through practice
              exercises, instructional videos, and a personalised learning dashboard that
              empowers learners to study at their own pace — in and outside of the
              classroom.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: "Grade 3–12", label: "Full Learning Path" },
              { stat: "Adaptive", label: "AI Curriculum" },
              { stat: "Real-Time", label: "Progress Tracking" },
              { stat: "Minimal", label: "Supervision Needed" },
            ].map(({ stat, label }) => (
              <div
                key={label}
                className="card-ai flex flex-col items-center justify-center py-8 text-center"
              >
                <p className="text-2xl font-bold text-slate-900">{stat}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#1E3A8A]/70">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-[color:var(--aa-bg-section)] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="badge-ai mb-4 inline-block">Why Aalgorix</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-[#0F172A] md:text-4xl">
              Why Choose Us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#1E3A8A]/80">
              We combine globally recognised academics with cutting-edge AI to give every
              student a truly personalised education.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map(({ icon, title, body }) => (
              <div key={title} className="card-ai flex flex-col gap-3">
                <span className="text-3xl">{icon}</span>
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-[#1E3A8A]/80">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="bg-[var(--background)] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">Team</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">
              We are a cross-functional team of engineers, learning designers, and industry
              collaborators aligned around one goal: building products people actually use and
              trust.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Rohit Verma",
                photo: "/rohit-verma.jpg",
                role: "Founder & CEO of Aalgorix",
                initials: "RV",
                gradient: "from-slate-400 to-slate-700",
              },
              {
                name: "Anshuman Pratyush",
                photo: "/anshuman-pratyush.jpg",
                role: "Partner & Growth Head",
                initials: "AP",
                gradient: "from-slate-300 to-slate-600",
              },
              {
                name: "Sandeep Chatterjee",
                photo: "/sandeep-chatterjee.jpg",
                role: "Senior Academic Advisor",
                initials: "SC",
                gradient: "from-slate-300 to-slate-600",
              },
              {
                name: "Ganga Tikkoo",
                photo: "/ganga-tikkoo.jpg",
                role: "Director-BD & Alliances",
                initials: "GT",
                gradient: "from-slate-300 to-slate-600",
              },
              {
                name: "Nandni",
                photo: "/nandni.jpg",
                role: "Devops Junior Engineer",
                initials: "N",
                gradient: "from-slate-300 to-slate-600",
              },
              {
                name: "Sudhanshu Tyagi",
                photo: "/sudhanshu-tyagi.jpg",
                role: "Project Lead & Developer",
                initials: "ST",
                gradient: "from-slate-300 to-slate-600",
              },
            ].map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
