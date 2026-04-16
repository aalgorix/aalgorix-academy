import Image from "next/image";
import InquiryPage from "../components/InquiryPage";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Shorter Hero Banner ── */}
      <section className="relative w-full h-[58vh] md:h-[62vh]">
        <Image
          src="/contact.jpg"
          alt="Contact Aalgorix Academy"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay with Title */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-lg mx-auto px-4">
              Ready to join Aalgorix Academy? We&apos;re here to answer all your questions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <InquiryPage />

    </div>
  );
}