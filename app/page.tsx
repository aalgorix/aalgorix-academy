import Image from "next/image";

/** Featured hero video — https://youtu.be/AA55pkP_4-0 */
const HERO_VIDEO_ID = "AA55pkP_4-0";

export default function Home() {
  return (
    <>
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <main>
        <section className="relative h-[90vh] min-h-[520px] w-full overflow-hidden">
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
      <source src="hero-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Lighter overlay — video stays clearly visible */}
  <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/30 to-transparent" />
  <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#0A192F]/75 via-[#0A192F]/25 to-transparent" />

  {/* Hero Content — vertically centered */}
  <div className="pointer-events-none relative z-[2] mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
    <div className="max-w-2xl pointer-events-auto">
      <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/30 bg-[#0A192F]/70 px-5 py-2 text-xs font-bold tracking-[0.22em] text-[#22D3EE] backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-[#22D3EE]" />
        FUTURE-READY LEARNING
      </p>

      <h1 className="text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg md:text-6xl">
        Learn smarter with{" "}
        <span className="text-[#22D3EE]">
          AI-guided
        </span>{" "}
        education.
      </h1>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 drop-shadow md:text-lg">
        Aalgorix Academy blends adaptive content, thoughtful feedback, and premium learning
        experiences to help students move from curiosity to mastery.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          className="rounded-full bg-[#22D3EE] px-7 py-3 text-sm font-bold text-[#0A192F] shadow-[0_0_20px_rgba(34,211,238,0.4)] transition hover:bg-[#38e8ff] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] active:scale-[0.985]"
        >
          Book a Demo
        </button>
        <button
          type="button"
          className="rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-[#22D3EE]/60 hover:bg-white/15 hover:text-[#22D3EE] active:scale-[0.985]"
        >
          Explore Programs
        </button>
      </div>
    </div>
  </div>
</section>

        <div className="fixed right-1 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 md:flex">
          <a
            href="#"
            className="aa-soft-lift flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 bg-cream/95 text-xs font-semibold text-accent transition hover:border-accent/40"
            aria-label="Facebook"
          >
            f
          </a>
          <a
            href="#"
            className="aa-soft-lift flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 bg-cream/95 text-xs font-semibold text-accent transition hover:border-accent/40"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a
            href="#"
            className="aa-soft-lift flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 bg-cream/95 text-xs font-semibold text-accent transition hover:border-accent/40"
            aria-label="YouTube"
          >
            yt
          </a>
          <a
            href="#"
            className="aa-soft-lift flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 bg-cream/95 text-xs font-semibold text-accent transition hover:border-accent/40"
            aria-label="Instagram"
          >
            ig
          </a>
        </div>
      </main>

      {/* Future-Ready Section */}
      <section className="bg-white py-12 px-4">
        <div className="mx-auto max-w-7xl">

          {/* ── Heading ── */}
          <h2 className="mb-8 text-center text-2xl font-semibold md:text-3xl">
            <span className="text-[#0B1E3C]">Future Ready At </span>
            <span className="text-[#38BDF8]">Hybrid Schooling</span>
          </h2>

          {/* ── Cards ── */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {/* Card 1 */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src="1-Expert-Faculty.jpg"
                alt="Expert Faculty"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src="2-Book-Session.jpg"
                alt="Book Session"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Card 3 — Globe */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src="3-Educating-Learners-Across-The-Globe.jpg"
                alt="Educating Learners Across The Globe"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Card 4 */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src="4-Focused-Batch-Size.jpg"
                alt="Focused Batch Size"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two Things to Learn Section */}
      <section className="bg-[#3eeef7] py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          {/* Left Content */}
          <div>
            <h2 className="mb-8 text-3xl font-bold uppercase leading-tight tracking-tight text-[#0B1E3C] md:text-4xl">
              Your Kid Needs Two Things to Learn
            </h2>

            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-[#0B1E3C]">
                Academics at the right level and pace
              </h3>
              <p className="text-sm leading-relaxed text-[#0B1E3C]">
                Our AI tutor gives students 1:1 personalized education, providing coursework at their individual pace and the appropriate level. Students progress with concept-based mastery and without any knowledge gaps.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-[#0B1E3C]">
                Motivation with the right reward
              </h3>
              <p className="text-sm leading-relaxed text-[#0B1E3C]">
                We motivate kids by giving them the gift of time to pursue the things they want to do and develop life skills. Adults in the room support motivated students to foster a growth mindset and independent learning.
              </p>
            </div>
          </div>

          {/* Right: YouTube Video Embed */}
          <div className="overflow-hidden rounded-xl border border-[#3B82F6]/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}`}
                title="Aalgorix Academy — How Our Learning Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flexible Child-Paced Learning Section */}
      <section className="flex min-h-[480px] flex-col md:flex-row">
        {/* Left: Text Content */}
        <div className="flex flex-1 items-center bg-[#061A45] px-10 py-16 md:px-16 md:py-20">
          <div className="max-w-lg">
            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[#22D3EE] md:text-4xl">
              Flexible, child-paced learning
            </h2>
            <p className="text-sm leading-relaxed text-[#CBD5F5] md:text-base">
              Flexible, child-paced learning allows children to learn at their own speed, based on their individual abilities, interests, and understanding. Instead of following a fixed timeline, students can spend more time on concepts they find challenging and move quickly through topics they grasp easily. This approach builds{" "}
              <strong className="text-white">confidence</strong>, reduces pressure, and encourages deeper understanding, making learning more{" "}
              <em className="font-semibold italic text-[#22D3EE]">engaging</em>, personalized, and effective.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative flex-1 min-h-[320px] md:min-h-0">
          <Image
            src="/flexible-child-paced.jpg"
            alt="Child engaged in flexible paced learning"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Expert-Designed Curriculum Section */}
      <section className="flex min-h-[480px] flex-col md:flex-row">
        {/* Left: Image */}
        <div className="relative flex-1 min-h-[320px] md:min-h-0">
          <Image
            src="/expert-curriculum-child.jpg"
            alt="Expert-designed curriculum for children"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-1 items-center bg-[#3eeef7] px-10 py-16 md:px-16 md:py-20">
          <div className="max-w-lg">
            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[#061A45] md:text-4xl">
              Expert-designed curriculum
            </h2>
            <p className="text-sm leading-relaxed text-[#061A45] md:text-base">
              An expert-designed curriculum is thoughtfully created by experienced educators and subject specialists to ensure high-quality, structured, and effective learning. It follows proven teaching methods, aligns with academic standards, and focuses on building strong foundational concepts along with practical skills. This approach ensures that learners receive reliable, well-organized content that supports their overall development and prepares them for future{" "}
              <strong className="text-[#061A45]">challenges</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Parent Support + Community Section */}
      <section className="flex min-h-[480px] flex-col md:flex-row">
        {/* Left: Text Content */}
        <div className="flex flex-1 items-center bg-[#112240] px-10 py-16 md:px-16 md:py-20">
          <div className="max-w-lg">
            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[#22D3EE] md:text-4xl">
              Parent support + community
            </h2>
            <p className="text-sm leading-relaxed text-[#CBD5F5] md:text-base">
              Parent support and community play a vital role in a child's learning journey by creating a strong network of guidance, encouragement, and collaboration. When parents are actively involved and connected with a supportive community, children benefit from shared experiences, resources, and consistent motivation. This environment fosters{" "}
              <strong className="text-white">confidence</strong>, improves communication, and ensures that learning continues beyond the classroom in a positive and{" "}
              <em className="font-semibold italic text-[#22D3EE]">engaging</em> way.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative flex-1 min-h-[320px] md:min-h-0">
          <Image
            src="/parents-curriculum.jpg"
            alt="Parent support and community"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Aalgorix Guides Section */}
      <section className="bg-[#3eeef7] py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-12 px-4 md:grid-cols-2 md:px-8">

          {/* Left: Text Content */}
          <div>
            <h2 className="mb-6 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              The Aalgorix Guides
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-[#0B1E3C] md:text-base">
              At Aalgorix Academy, teachers shift from traditional roles like grading and writing lesson plans, to supporting students&apos; emotional and motivational needs and teaching life skills. This impactful transformation frees up teachers to mentor, motivate, and coach students to become self-driven learners.
            </p>

            <div className="mb-6">
              <h3 className="mb-2 text-base font-semibold text-[#0B1E3C]">Guidance:</h3>
              <p className="text-sm leading-relaxed text-[#0B1E3C]">
                Adults, whether teachers or parents, become &apos;Guides,&apos; shifting the traditional teacher-student relationship to offer motivational and emotional support.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-base font-semibold text-[#0B1E3C]">Support:</h3>
              <p className="text-sm leading-relaxed text-[#0B1E3C]">
                Assist students with AI-powered learning, help them develop life skills, and pursue their passions.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-[#0B1E3C]">Motivation:</h3>
              <p className="text-sm leading-relaxed text-[#0B1E3C]">
                We motivate kids by giving them the gift of time to pursue the things they want to do and develop life skills. Adults in the room support motivated students to foster a growth mindset and independent learning.
              </p>
            </div>
          </div>

          {/* Right: Guide Card + Button */}
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0B1E3C] px-10 py-10 text-center shadow-lg">
              {/* Nav Arrows */}
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-white/70 transition hover:text-white"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-white/70 transition hover:text-white"
                aria-label="Next"
              >
                ›
              </button>

              {/* Circular Avatar */}
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-white/30 bg-white/10">
                <span className="text-2xl font-bold text-white">AA</span>
              </div>

              <h3 className="mb-1 text-lg font-bold uppercase tracking-wide text-white">
                Aalgorix Expert
              </h3>
              <p className="mb-4 text-sm text-[#3eeef7]">Lead AI Education Guide</p>
              <p className="text-sm leading-relaxed text-white/80">
                Our expert guides are education leaders and AI advocates with a passion for bridging technology and personalized learning for every student.
              </p>
            </div>

            <button
              type="button"
              className="relative rounded-full bg-[#0B1E3C] px-8 py-3 text-sm font-semibold tracking-widest text-white transition hover:bg-[#1F3A5F]"
              style={{
                boxShadow: '0 0 0 2px #3eeef7, 0 0 12px 2px rgba(62,238,247,0.45), 0 0 28px 4px rgba(62,238,247,0.2)',
              }}
            >
              EXPLORE OUR PROGRAM
            </button>
          </div>

        </div>
      </section>

    </div>

    </>
  );
}
