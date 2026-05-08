import Image from "next/image";
import InquiryPage from "../components/InquiryPage";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* ── Hero Banner ── */}
      <section className="relative w-full h-[58vh] md:h-[62vh]">
        <Image
          src="/contact.jpg"
          alt="Contact Aalgorix World Academy"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay — keep slight dark for text readability */}
        <div className="absolute inset-0 bg-[#0F172A]/50 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              <span className="shiny-heading-hero">Apply Now</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-lg mx-auto px-4 drop-shadow">
              Curious about AI Avatar-aided learning with human mentorship?
              Talk to us — We&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <InquiryPage />

    </div>
  );
}
