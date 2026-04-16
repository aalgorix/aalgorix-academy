const courses = [
  {
    title: "AI Foundations",
    grade: "Grade 6–8",
    description: "Introduction to artificial intelligence, machine learning concepts, and hands-on projects using block-based coding.",
    tag: "Beginner",
  },
  {
    title: "Coding with Python",
    grade: "Grade 7–10",
    description: "Learn Python from scratch with real-world projects, algorithmic thinking, and problem-solving challenges.",
    tag: "Intermediate",
  },
  {
    title: "Data Science for Teens",
    grade: "Grade 9–12",
    description: "Explore data visualisation, statistics, and predictive modelling with Python and real datasets.",
    tag: "Advanced",
  },
  {
    title: "Robotics & IoT",
    grade: "Grade 6–9",
    description: "Build and program robots, sensors, and smart devices while developing engineering and design thinking skills.",
    tag: "Beginner",
  },
  {
    title: "Web Development",
    grade: "Grade 8–12",
    description: "Create responsive websites using HTML, CSS, JavaScript, and modern frameworks — build a portfolio by the end.",
    tag: "Intermediate",
  },
  {
    title: "Critical Thinking & Life Skills",
    grade: "Grade 6–12",
    description: "Develop communication, collaboration, time management, and growth mindset skills essential for the future.",
    tag: "All Levels",
  },
];

const tagColor: Record<string, string> = {
  Beginner: "bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/30",
  Intermediate: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30",
  Advanced: "bg-[#1E3A8A]/40 text-white border-[#3B82F6]/30",
  "All Levels": "bg-[#112240] text-[#CBD5F5] border-[#3B82F6]/20",
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      {/* Hero */}
      <section className="bg-[#112240] py-20 px-6 text-center">
        <p className="badge-ai mb-4 inline-block">Our Programs</p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Explore Our <span className="text-[#22D3EE]">Courses</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#CBD5F5]">
          AI-guided, expertly designed courses for students in Grade 6–12. Learn at your
          own pace and build real-world skills that matter.
        </p>
      </section>

      {/* Course Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(({ title, grade, description, tag }) => (
            <div key={title} className="card-ai flex flex-col gap-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-bold text-white">{title}</h2>
                <span
                  className={`shrink-0 rounded-full border px-3 py-0.5 text-xs font-semibold ${tagColor[tag]}`}
                >
                  {tag}
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3B82F6]">
                {grade}
              </p>
              <p className="text-sm leading-relaxed text-[#CBD5F5]">{description}</p>
              <button
                type="button"
                className="mt-auto self-start rounded-full border border-[#22D3EE]/50 px-5 py-1.5 text-xs font-semibold text-[#22D3EE] transition hover:bg-[#22D3EE]/10"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
