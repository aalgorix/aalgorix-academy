import TryItClient from "./try-it-client";
import TryItHeaderActions from "./try-it-header-actions";

export default function TryItOutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#0F172A]">
      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-8 md:py-14">
        <div className="mb-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-700">
            Try it out
          </p>
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Talk to our AI guide
            </h1>
            <TryItHeaderActions />
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
            Click the mic and start speaking. Make sure your browser allows microphone access.
          </p>
        </div>

        <TryItClient />
      </main>
    </div>
  );
}

