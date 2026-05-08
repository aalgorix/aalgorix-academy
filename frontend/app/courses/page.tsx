"use client";

import { useState, useMemo } from "react";

/* ── Course data ── */
const courses = [
  {
    emoji: "🧠",
    title: "Brain + AI Augmentation Skills",
    grade: "Grade 9–12",
    level: "Advanced",
    description:
      "Learn how humans will enhance thinking using AI tools and cognitive systems to unlock new levels of mental performance.",
    skills: ["Cognitive enhancement", "Productivity systems", "AI thinking tools"],
    iconBg: "bg-purple-100",
  },
  {
    emoji: "🧠",
    title: "AI & Human Intelligence",
    grade: "Grade 6–12",
    level: "All Levels",
    description:
      "Learn how to work with AI, not compete with it — prompt engineering, AI tools, and sharp decision-making.",
    skills: ["AI literacy", "Critical thinking", "Human-AI collaboration"],
    iconBg: "bg-slate-100",
  },
  {
    emoji: "🤖",
    title: "Robotics, Automation & Smart Systems",
    grade: "Grade 6–12",
    level: "Intermediate",
    description:
      "Build intelligent machines, IoT systems, and automation workflows that power tomorrow's world.",
    skills: ["Robotics", "Sensors", "Automation logic", "Smart homes"],
    iconBg: "bg-blue-100",
  },
  {
    emoji: "💻",
    title: "Digital Creation & Coding",
    grade: "Grade 6–12",
    level: "Beginner",
    description:
      "From coding basics to building apps, games, and platforms — master the language of the future.",
    skills: ["Python", "Web Dev", "App Dev", "No-code tools"],
    iconBg: "bg-green-100",
  },
  {
    emoji: "📊",
    title: "Data Intelligence & Decision Making",
    grade: "Grade 8–12",
    level: "Advanced",
    description:
      "Understand data, patterns, and predictions using real-world datasets and AI-powered analysis.",
    skills: ["Data analysis", "Visualization", "AI models"],
    iconBg: "bg-purple-100",
  },
  {
    emoji: "🌍",
    title: "Global Awareness & Future Careers",
    grade: "Grade 7–12",
    level: "Beginner",
    description:
      "Understand future industries, global trends, and the careers that will define the world of 2040.",
    skills: ["Adaptability", "Research", "Future readiness"],
    iconBg: "bg-emerald-100",
  },
  {
    emoji: "🗣️",
    title: "Communication & Personal Branding",
    grade: "Grade 6–12",
    level: "All Levels",
    description:
      "Build confidence, public speaking mastery, and a powerful digital presence for the modern world.",
    skills: ["Storytelling", "Presentation", "Leadership"],
    iconBg: "bg-cyan-100",
  },
  {
    emoji: "🛰️",
    title: "Space Science & Astronomy",
    grade: "Grade 6–9",
    level: "Beginner",
    description:
      "Understand planets, stars, galaxies, and how the universe works through interactive exploration.",
    skills: ["Observation", "Curiosity", "Scientific thinking"],
    iconBg: "bg-indigo-100",
  },
  {
    emoji: "💡",
    title: "Innovation, Entrepreneurship & Startups",
    grade: "Grade 8–12",
    level: "All Levels",
    description:
      "Turn ideas into real businesses, products, and impactful solutions with startup-grade thinking.",
    skills: ["Problem-solving", "Business models", "Pitching", "Startup thinking"],
    iconBg: "bg-amber-100",
  },
];

/* ── Level badge styles ── */
const LEVEL_STYLE: Record<string, { badge: string; dot: string; glow: string }> = {
  Beginner: {
    badge: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
    glow: "hover:shadow-[0_8px_32px_rgba(34,197,94,0.15)]",
  },
  Intermediate: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    glow: "hover:shadow-[0_8px_32px_rgba(37,99,235,0.15)]",
  },
  Advanced: {
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
    glow: "hover:shadow-[0_8px_32px_rgba(147,51,234,0.15)]",
  },
  "All Levels": {
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
    dot: "bg-cyan-500",
    glow: "hover:shadow-[0_8px_32px_rgba(6,182,212,0.15)]",
  },
};

const FILTERS = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];

/* ── Search icon ── */
function SearchIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ── Page ── */
export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchFilter = activeFilter === "All" || c.level === activeFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
  }, [activeFilter, search]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ── Hero / Header ── */}
      <section className="bg-gradient-to-b from-[color:var(--aa-bg-section)] to-[var(--background)] px-6 pb-8 pt-20 text-center">
        <span className="badge-ai mb-5 inline-block">Aalgorix World Academy · Curriculum</span>

        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
          Future Ready{" "}
          <span className="text">Skills</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#1E3A8A]/70">
          AI-guided, expertly crafted programs that prepare students for the industries,
          careers, and challenges of tomorrow.
        </p>

        {/* ── Search bar ── */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1E3A8A]/40">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses, skills, topics…"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-[#0F172A] shadow-sm placeholder:text-[#1E3A8A]/40 transition-all focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#1E3A8A]/40 hover:text-[#2563eb] transition-colors"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeFilter === f
                  ? "bg-[#2563eb] text-white shadow-[0_0_16px_rgba(37,99,235,0.35)] scale-[1.04]"
                  : "border border-slate-200 bg-white text-[#1E3A8A] hover:border-[#2563eb]/50 hover:bg-slate-50 hover:text-[#2563eb]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="mt-4 text-xs font-medium text-[#1E3A8A]/45">
          Showing <span className="font-bold text-[#2563eb]">{filtered.length}</span> of {courses.length} programs
        </p>
      </section>

      {/* ── Course Grid ── */}
      <section className="mx-auto max-w-7xl px-4 pb-28 pt-6 md:px-8">
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="mb-3 text-5xl">🔍</p>
            <p className="text-lg font-semibold text-[#1E3A8A]">No courses match your search.</p>
            <p className="mt-1 text-sm text-[#1E3A8A]/55">Try a different keyword or clear the filter.</p>
            <button
              type="button"
              onClick={() => { setSearch(""); setActiveFilter("All"); }}
              className="mt-5 rounded-full bg-[#2563eb] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => {
              const lvl = LEVEL_STYLE[course.level];
              return (
                <div
                  key={course.title}
                  className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.025] hover:border-[#2563eb]/25 dark:border-white/10 dark:bg-black/30 ${lvl.glow}`}
                >
                  {/* Top row: icon + level badge */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div
                      className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-xl text-3xl leading-none ${course.iconBg}`}
                      style={{ width: 52, height: 52 }}
                    >
                      {course.emoji}
                    </div>
                    <span
                      className={`mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide ${lvl.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${lvl.dot}`} />
                      {course.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-1 text-[15px] font-extrabold leading-snug text-[#0F172A] transition-colors group-hover:text-[#2563eb]">
                    {course.title}
                  </h2>

                  {/* Grade */}
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563eb]/65">
                    {course.grade}
                  </p>

                  {/* Divider */}
                  <div className="mb-4 h-px w-full bg-slate-100 dark:bg-white/10" />

                  {/* Description */}
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-[#1E3A8A]/72">
                    {course.description}
                  </p>

                  {/* Skill tags */}
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* CTA button */}
                  <button
                    type="button"
                    className="relative w-full overflow-hidden rounded-xl bg-[#2563eb] py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-[0_0_18px_rgba(37,99,235,0.4)] active:scale-[0.98]"
                  >
                    {/* Shine sweep on hover */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                    Learn More →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}
