"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const isHeroTop = isHome && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "";
  const phoneE164 = process.env.NEXT_PUBLIC_PHONE_E164 ?? "";

  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/[^\d]/g, "");
  const whatsappPrefill =
    process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ??
    "Hi Aalgorix World Academy team, I want to know more about enrollment for 2027–2028.";

  const whatsappHref = whatsappNumber
    ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappPrefill)}`
    : `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappPrefill)}`;

  const telHref = phoneE164 ? `tel:${phoneE164}` : phoneDisplay ? `tel:${phoneDisplay}` : "";

  const textClass = isHeroTop ? "text-white/90" : "text-slate-700 dark:text-white/75";
  const linkClass = isHeroTop
    ? "text-white underline underline-offset-4"
    : "text-slate-900 dark:text-white underline underline-offset-4";

  const pillClass = isHeroTop
    ? "border-white/15 bg-white/5 text-white/90 hover:bg-white/10"
    : "border-slate-200/70 bg-white/60 text-slate-900 hover:bg-white/75 dark:border-white/10 dark:bg-black/25 dark:text-white/85 dark:hover:bg-black/35";

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

        <div className="flex w-[240px] items-center justify-end gap-2.5">
          {telHref && (
            <a
              href={telHref}
              className={`hidden sm:inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-semibold backdrop-blur transition ${pillClass}`}
            >
              {phoneDisplay || phoneE164}
            </a>
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-semibold backdrop-blur transition ${pillClass}`}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}