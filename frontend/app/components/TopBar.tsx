"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrochureDialog from "./BrochureDialog";

export default function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const isHeroTop = isHome && !scrolled;
  const [brochureOpen, setBrochureOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/[^\d]/g, "");
  const whatsappPrefill =
    process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ??
    "Hi Aalgorix World Academy team, I want to know more about enrollment for 2027–2028.";

  const whatsappHref = whatsappNumber
    ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappPrefill)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappPrefill)}`;

  const textClass = isHeroTop ? "text-white/90" : "text-slate-700 dark:text-white/75";
  const linkClass = isHeroTop
    ? "text-white underline underline-offset-4"
    : "text-slate-900 dark:text-white underline underline-offset-4";

  const pillClass = isHeroTop
    ? "border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
    : "border-slate-200/70 bg-white/60 text-slate-900 hover:bg-white/75 dark:border-white/10 dark:bg-black/25 dark:text-white/85 dark:hover:bg-black/35";

  const pillBase = "h-8 px-3 text-[12px] font-semibold";

  function openBrochure() {
    setBrochureOpen(true);
  }

  function closeBrochure() {
    setBrochureOpen(false);
  }

  return (
    <div
      className={[
        "fixed left-0 right-0 top-0 z-[60]",
        "h-[var(--aa-topbar-h)]",
        "backdrop-blur-md",
        "bg-white/10 dark:bg-black/20",
      ].join(" ")}
    >
      <div className="mx-auto flex h-full w-full max-w-[180rem] items-center justify-between gap-3 px-6 md:px-16">
        <div className="hidden sm:block w-[240px]" />

        <div className="flex flex-1 items-center justify-center">
          <p
            className={[
              "max-w-[min(70ch,100%)] truncate whitespace-nowrap text-center",
              "text-[12px] font-semibold tracking-wide sm:text-[13px]",
              textClass,
            ].join(" ")}
          >
            Enrollment for 2027–2028 school year is open{" "}
            <Link href="/program" className={`font-bold ${linkClass}`}>
              Learn more
            </Link>
          </p>
        </div>

        <div className="flex w-[240px] items-center justify-end gap-2">
          <button
            type="button"
            onClick={openBrochure}
            className={`hidden sm:inline-flex items-center rounded-full border ${pillBase} backdrop-blur transition ${pillClass}`}
          >
            Brochure
          </button>
          <Link
            href="/about"
            className={`hidden sm:inline-flex items-center rounded-full border ${pillBase} backdrop-blur transition ${pillClass}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`hidden sm:inline-flex items-center rounded-full border ${pillBase} backdrop-blur transition ${pillClass}`}
          >
            Enroll
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center rounded-full border ${pillBase} backdrop-blur transition ${pillClass}`}
          >
            WhatsApp
          </a>
          <Link
            href="/login"
            className={`inline-flex items-center rounded-full border ${pillBase} backdrop-blur transition ${pillClass}`}
          >
            Login
          </Link>
        </div>
      </div>

      <BrochureDialog open={brochureOpen} onClose={closeBrochure} />
    </div>
  );
}
