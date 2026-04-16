import TeamCard from "../components/TeamCard";

const whyChooseUs = [
  {
    icon: "🤖",
    title: "AI-Powered Learning",
    body: "Our technology identifies real-time progress and delivers an adaptive curriculum that bridges learning gaps automatically.",
  },
  {
    icon: "📚",
    title: "Globally Recognised Standards",
    body: "Affiliated with Cambridge International Education (Accreditation No. IA 441), ensuring a world-class, competitive academic journey.",
  },
  {
    icon: "⏱️",
    title: "Regulated Screen Time",
    body: "We balance guided learning and self-study to keep children engaged with fun educational content without excessive screen exposure.",
  },
  {
    icon: "🧠",
    title: "Critical Thinking Focus",
    body: "Practice exercises, instructional videos, and a personalised dashboard sharpen Reasoning Skills, Memory, and Critical Thinking.",
  },
  {
    icon: "🏠",
    title: "Homeschooling Ready",
    body: "Our India-aligned homeschooling curriculum lets students learn at their own pace with minimal supervision, inside or outside the classroom.",
  },
  {
    icon: "🎯",
    title: "Nursery to Grade 12",
    body: "A complete learning path from Nursery through Grade 12, balancing guided instruction with independent self-study at every stage.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-white">

      {/* ── Hero / Banner ── */}
      <section className="relative overflow-hidden bg-[#112240] py-24 px-6 text-center">
        {/* subtle glow blobs */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#22D3EE]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-48 w-48 rounded-full bg-[#3B82F6]/10 blur-2xl" />

        <p className="badge-ai mb-5 inline-block">Who We Are</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          Welcome to{" "}
          <span className="glow-text text-[#22D3EE]">Aalgorix Academy</span>
        </h1>
        <p className="mx-auto mt-3 text-sm font-semibold uppercase tracking-widest text-[#3B82F6]">
          A Division of Techybrid ThinkTank Private Limited
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#CBD5F5]">
          We are dedicated to providing top-tier education that seamlessly integrates
          forward-thinking practices — delivering globally recognised standards from
          Nursery all the way through Grade 12.
        </p>
      </section>

      {/* ── About Aalgorix Academy ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Text */}
          <div>
            <p className="badge-ai mb-4 inline-block">About Us</p>
            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
              Proudly Affiliated with{" "}
              <span className="text-[#22D3EE]">Cambridge International Education</span>
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-[#CBD5F5]">
              Aalgorix Academy proudly affiliates with Cambridge International Education,
              boasting the accreditation number{" "}
              <span className="font-semibold text-white">IA 441</span>. This affiliation
              is a testament to our unwavering dedication to delivering globally
              recognised educational standards.
            </p>
            <p className="text-sm leading-relaxed text-[#CBD5F5]">
              Our foremost commitment is to ensure that our students embark on a
              well-rounded academic journey, characterised by competitiveness and
              excellence. Explore the world of quality education and innovative thinking
              with Aalgorix Academy — where every student&apos;s potential is nurtured
              for a successful future.
            </p>
          </div>

          {/* Accreditation Badge Card */}
          <div className="card-ai flex flex-col items-center gap-4 py-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#22D3EE]/40 bg-gradient-to-br from-[#1E3A8A] to-[#0A192F] text-3xl">
              🎓
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-[#22D3EE]">
              Cambridge Accredited
            </h3>
            <p className="text-3xl font-bold text-white">IA 441</p>
            <p className="max-w-xs text-sm leading-relaxed text-[#CBD5F5]">
              Internationally recognised accreditation ensuring world-class academic
              standards for every Aalgorix Academy student.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-[#112240] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="badge-ai mb-4 inline-block">Our Purpose</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              Mission &amp; Vision
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="card-ai border-l-4 border-l-[#22D3EE]">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <h3 className="text-xl font-bold text-[#22D3EE]">Our Mission</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#CBD5F5]">
                To make world-class, AI-guided education accessible to every learner —
                personalised to their pace, level, and passion — so that no student is
                ever left behind. We balance guided learning and self-study to build
                confident, independent thinkers ready for tomorrow.
              </p>
            </div>

            {/* Vision */}
            <div className="card-ai border-l-4 border-l-[#3B82F6]">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">🔭</span>
                <h3 className="text-xl font-bold text-[#3B82F6]">Our Vision</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#CBD5F5]">
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
          <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
            Making a Difference
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-[#CBD5F5]">
              Designed through Nursery to Grade 12, the{" "}
              <span className="font-semibold text-white">Aalgorix Academy App</span>{" "}
              aims to provide a balance between Guided Learning &amp; Self-Study. We aim
              at regulating screen time for children while offering fun educational
              content.
            </p>
            <p className="text-sm leading-relaxed text-[#CBD5F5]">
              Students learn at their own pace with minimal supervision. Our technology
              identifies real-time progress and provides an adaptive curriculum by
              bridging learning gaps.
            </p>
            <p className="text-sm leading-relaxed text-[#CBD5F5]">
              Our Homeschooling in India curriculum hones{" "}
              <span className="font-semibold text-white">Critical Thinking Skills</span>,{" "}
              <span className="font-semibold text-white">Reasoning Skills</span> &amp;{" "}
              <span className="font-semibold text-white">Memory</span> through practice
              exercises, instructional videos, and a personalised learning dashboard that
              empowers learners to study at their own pace — in and outside of the
              classroom.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: "Nursery–12", label: "Full Learning Path" },
              { stat: "Adaptive", label: "AI Curriculum" },
              { stat: "Real-Time", label: "Progress Tracking" },
              { stat: "Minimal", label: "Supervision Needed" },
            ].map(({ stat, label }) => (
              <div
                key={label}
                className="card-ai flex flex-col items-center justify-center py-8 text-center"
              >
                <p className="text-2xl font-bold text-[#22D3EE]">{stat}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#CBD5F5]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-[#112240] py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="badge-ai mb-4 inline-block">Why Aalgorix</p>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              Why Choose Us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#CBD5F5]">
              We combine globally recognised academics with cutting-edge AI to give every
              student a truly personalised education.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map(({ icon, title, body }) => (
              <div key={title} className="card-ai flex flex-col gap-3">
                <span className="text-3xl">{icon}</span>
                <h3 className="text-base font-semibold text-[#3B82F6]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#CBD5F5]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      {/* Add team photos to /public/team/ — see filenames below each member */}
      <section className="bg-[#87CEEB] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Heading — matches screenshot style */}
          <h2 className="mb-14 text-center text-4xl font-bold tracking-tight text-[#112240]">
            Our Team
          </h2>

          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row sm:items-start sm:gap-8 lg:gap-16">
            {[
              {
                name: "Nirvaan Birla",
                role: "MD",
                initials: "NB",
                photo: "/team/nirvaan-birla.jpg",
                gradient: "from-[#38BDF8] to-[#0EA5E9]",
              },
              {
                name: "Muddassar Nazar",
                role: "CEO",
                initials: "MN",
                photo: "/team/muddassar-nazar.jpg",
                gradient: "from-[#7DD3FC] to-[#38BDF8]",
              },
              {
                name: "Sarda Murali",
                role: "CFO",
                initials: "SM",
                photo: "/team/sarda-murali.jpg",
                gradient: "from-[#38BDF8] to-[#0EA5E9]",
              },
            ].map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership & BOA ── */}
      <section className="bg-[#87CEEB] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row sm:items-start sm:gap-8 lg:gap-16">
            {[
              {
                name: "Dr. Pushpita Chattopadhyay",
                role: "Director of Academic",
                initials: "PC",
                photo: "/team/pushpita-chattopadhyay.jpg",
                gradient: "from-[#38BDF8] to-[#0EA5E9]",
              },
              {
                name: "Dr. Veena Shrivastava",
                role: "BOA",
                initials: "VS",
                photo: "/team/veena-shrivastava.jpg",
                gradient: "from-[#7DD3FC] to-[#38BDF8]",
              },
              {
                name: "Brian Alex",
                role: "BOA",
                initials: "BA",
                photo: "/team/brian-alex.jpg",
                gradient: "from-[#38BDF8] to-[#0EA5E9]",
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
