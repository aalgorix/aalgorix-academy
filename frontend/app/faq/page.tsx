import Link from "next/link";
import type { Metadata } from "next";
import { siteFaqs } from "../lib/faqs";

export const metadata: Metadata = {
  title: "FAQ | Aalgorix World Academy",
  description:
    "Frequently asked questions about Aalgorix homeschooling, AI Tutor, grades, admissions, and special learning needs.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-28 md:px-8 md:pb-20">
        <p className="badge-ai mb-4 inline-block">FAQ</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
          Quick answers about AI Tutor, personalised learning, life skills, and admissions.
        </p>

        <div className="mt-10 space-y-3">
          {siteFaqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-0.5">
                <span className="text-sm font-semibold text-slate-900 dark:text-white/90 md:text-base">
                  {item.q}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition group-open:rotate-45 dark:border-white/15 dark:text-white/80">
                  +
                </span>
              </summary>
              <p className="pt-3 text-sm leading-relaxed text-slate-600 dark:text-white/65">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/program"
            className="rounded-xl bg-slate-900 px-7 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white/90 dark:text-black"
          >
            Explore programs
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-slate-300 bg-white px-7 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85"
          >
            Contact admissions
          </Link>
        </div>
      </main>
    </div>
  );
}
