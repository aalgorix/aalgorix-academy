"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { LogIn } from "lucide-react";

const GOLD = "#c9a45c";

const dropdownMenus = {
  Academics: [
    { label: "Boards", items: ["Primary", "Secondary"] },
    { label: "Languages", items: ["French", "Spanish", "German", "Italian", "Russian"] },
    { label: "Life Skills", items: ["Public speaking", "Communication skills", "Social skills"] },
    { label: "Competitive", items: ["Olympiad", "Robotics", "Scholarship Exams", "Interschool Quizzes"] },
  ],
};

/** Anchor targets on `/why-us` — keep in sync with `app/why-us/page.tsx` section ids */
const whyUsNavLinks = [
  { href: "/why-us#why-homeschooling", label: "Why homeschooling", desc: "Benefits of structured home learning" },
  { href: "/why-us#why-aalgorix", label: "Why Aalgorix", desc: "Outcomes, accreditation, and our system" },
  { href: "/why-us#expectations", label: "What to expect", desc: "Plans, progress, and partnership" },
  { href: "/why-us#differentiators", label: "What sets us apart", desc: "AI Tutor, faculty, coaching, and more" },
  { href: "/why-us#who-thrives", label: "Who thrives here", desc: "Families we serve best" },
  { href: "/why-us#faq", label: "Parent FAQs", desc: "Common questions, clear answers" },
];

/* ── Login button ── */
function LoginButton({ isHeroTop }) {
  const router = useRouter();

  function handleClick() {
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-[16px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: "rgba(201, 164, 92, 0.55)",
        color: isHeroTop ? "rgba(255,255,255,0.95)" : "var(--foreground)",
        background: "transparent",
      }}
    >
      <LogIn className="h-4 w-4" />
      Login
    </button>
  );
}

/* ── Mobile login link ── */
function MobileLoginLink({ onClose }) {
  const router = useRouter();

  function handleClick() {
    onClose();
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:bg-slate-900/5 hover:text-slate-900 dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white">
        <LogIn className="h-4 w-4" />
      </span>
      Login
    </button>
  );
}

/* ── Single dropdown item ── */
function DropdownMenu({ label, items, isHeroTop }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setOpenGroup(null);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-10 items-center gap-1 border-b-2 pb-0 text-[16px] font-medium transition-colors duration-300 ${
          open ? "border-[#c9a45c] text-[#c9a45c]" : "border-transparent"
        } ${
          open
            ? ""
            : isHeroTop
              ? "text-white hover:border-white/30 hover:text-[#c9a45c]"
              : "text-slate-700 hover:border-slate-300 hover:text-slate-900 dark:text-white/85 dark:hover:border-white/20 dark:hover:text-white"
        }`}
      >
        {label}
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-[#c9a45c]" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border bg-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur"
          style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(11, 44, 74, 0.92)" }}
        >
          {/* Gold top accent line */}
          <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, rgba(201,164,92,0), rgba(201,164,92,1), rgba(201,164,92,0))" }} />
          {"items" in (items?.[0] ?? {}) ? (
            <ul className="py-1">
              {items.map((group) => {
                const expanded = openGroup === group.label;
                return (
                  <li key={group.label}>
                    <button
                      type="button"
                      onClick={() => setOpenGroup((v) => (v === group.label ? null : group.label))}
                      className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-[13px] text-white/90 transition-colors duration-300 hover:bg-white/10 hover:text-[#c9a45c]"
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a45c]/80" />
                        {group.label}
                      </span>
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180 text-[#c9a45c]" : "text-white/70"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {expanded && (
                      <ul className="mb-1 mt-0.5 border-l pl-4" style={{ borderLeftColor: "rgba(255,255,255,0.14)" }}>
                        {group.items.map((t) => (
                          <li key={t}>
                            <span className="flex items-center gap-2 px-4 py-2 text-[13px] text-white/75">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" />
                              {t}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="py-1">
              {items.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-white/90 transition-colors duration-300 hover:bg-white/10 hover:text-[#c9a45c]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a45c]/80" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Why Us: desktop hover panel with in-page anchors ── */
function WhyUsHoverNav({ isHeroTop, pathname }) {
  const active = pathname === "/why-us";
  const linkClass = [
    "inline-flex h-10 shrink-0 items-center border-b-2 border-transparent pb-0 text-[15px] font-medium transition-colors duration-200 sm:text-[16px]",
    active ? "border-[#c9a45c]" : isHeroTop ? "hover:border-white/35" : "hover:border-slate-300 dark:hover:border-white/25",
    active
      ? isHeroTop
        ? "text-white"
        : "text-slate-900 dark:text-white"
      : isHeroTop
        ? "text-white/90 hover:text-white"
        : "text-slate-700 hover:text-slate-900 dark:text-white/80 dark:hover:text-white",
  ].join(" ");

  const panelClass = isHeroTop
    ? "rounded-2xl border border-white/15 bg-[rgba(11,44,74,0.96)] p-4 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md"
    : "rounded-2xl border border-slate-200/90 bg-white p-4 text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950/96 dark:text-white dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)]";

  const itemClass = isHeroTop
    ? "block rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/10"
    : "block rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/10";

  const titleMuted = isHeroTop ? "text-white/75" : "text-slate-600 dark:text-white/65";
  const itemTitle = isHeroTop ? "text-[13px] font-semibold text-white/95" : "text-[13px] font-semibold text-slate-900 dark:text-white/90";
  const itemDesc = isHeroTop ? "mt-0.5 block text-[11px] leading-snug text-white/65" : "mt-0.5 block text-[11px] leading-snug text-slate-500 dark:text-white/55";
  const footerClass = isHeroTop
    ? "mt-3 flex items-center justify-center rounded-xl border border-white/20 px-3 py-2 text-center text-[12px] font-bold text-white/90 transition-colors hover:bg-white/10"
    : "mt-3 flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-center text-[12px] font-bold text-slate-900 transition-colors hover:bg-slate-50 dark:border-white/15 dark:text-white dark:hover:bg-white/10";

  return (
    <div className="group relative shrink-0">
      <Link href="/why-us" className={linkClass}>
        Why Us
      </Link>
      <div
        className="invisible absolute left-1/2 top-[calc(100%-10px)] z-[70] w-[min(calc(100vw-2rem),22rem)] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:opacity-100"
        role="region"
        aria-label="Why Us page sections"
      >
        <div className={panelClass}>
          <div
            className="h-[2px] w-full rounded-full"
            style={{ background: "linear-gradient(90deg, rgba(201,164,92,0), rgba(201,164,92,1), rgba(201,164,92,0))" }}
          />
          <p className={`mt-3 text-xs leading-relaxed ${titleMuted}`}>
            Why homeschooling, what to expect from Aalgorix.
          </p>
          <nav className="mt-3 max-h-[min(70vh,22rem)] space-y-1 overflow-y-auto overscroll-contain pr-0.5">
            {whyUsNavLinks.map((item) => (
              <Link key={item.href} href={item.href} className={itemClass}>
                <span className={itemTitle}>{item.label}</span>
                <span className={itemDesc}>{item.desc}</span>
              </Link>
            ))}
          </nav>
          <Link href="/why-us" className={footerClass}>
            View full Why Us page
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const isHeroTop = isHome && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const primaryLinks = [
    { href: "/ai-tutor", label: "AI Tutor" },
    { href: "/learning-model", label: "Learning Model" },
    { href: "/talent-partners", label: "Talent Partners" },
    { href: "/talent-support", label: "Talent Support" },
    { href: "/#faq", label: "FAQ" },
  ];

  const navTextClass = isHeroTop ? "text-white" : "text-slate-900 dark:text-white";

  const navSubTextClass = isHeroTop ? "text-white/75" : "text-slate-600 dark:text-white/65";

  return (
    <header
      className={[
        "fixed z-50 w-full transition-all duration-300",
        // Hero top (home): transparent, no blur. Else: glass blur.
        isHeroTop ? "bg-transparent" : "backdrop-blur-md bg-white/10 dark:bg-black/20",
        // Subtle border always, stronger when scrolled
        isHeroTop
          ? "border-b border-transparent shadow-none"
          : scrolled
            ? "border-b border-white/25 shadow-sm dark:shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
            : "border-b border-white/15 shadow-none",
      ].join(" ")}
      style={{ top: "var(--aa-topbar-h)" }}
    >
      <div className="mx-auto grid min-h-[var(--aa-navbar-h)] w-full max-w-[180rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 px-4 py-2.5 sm:px-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-5 md:px-10 lg:gap-x-6 lg:px-16">
        {/* ── Logo (text wordmark) ── */}
        <Link
          href="/"
          className="group relative z-20 flex min-w-0 shrink-0 items-center gap-3 justify-self-start outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#c9a45c]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base font-black tracking-tight text-slate-900 md:h-10 md:w-10 md:text-lg dark:text-black"
            style={{
              background: "linear-gradient(135deg, rgba(201,164,92,1) 0%, rgba(201,164,92,0.78) 100%)",
              boxShadow: "0 10px 26px rgba(201,164,92,0.16)",
            }}
          >
            A
          </div>
          <span className="hidden min-w-0 flex-col items-start sm:flex">
            <span className={`block text-xl font-bold leading-tight md:text-2xl ${navTextClass} whitespace-nowrap`}>
              Aalgorix <span style={{ color: GOLD }}>World Academy</span>
            </span>
            <span
              className={[
                "mt-0.5 block whitespace-nowrap text-left font-medium uppercase",
                "text-[clamp(15px,0.85vw,13px)] tracking-[0.18em] leading-tight",
                navSubTextClass,
              ].join(" ")}
            >
              AI Powered Home School
            </span>
          </span>
        </Link>

        {/* ── Desktop Nav (center column) — Why Us outside scroll strip so hover panel is not clipped ── */}
        <nav className="hidden min-h-0 min-w-0 max-w-full items-center justify-center justify-self-center gap-x-3 gap-y-1 whitespace-nowrap md:flex md:gap-x-4 lg:gap-x-6 xl:gap-x-7">
          <WhyUsHoverNav isHeroTop={isHeroTop} pathname={pathname} />
          <div className="flex min-h-0 min-w-0 max-w-full items-center justify-center gap-x-3 overflow-x-auto overflow-y-visible overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:gap-x-4 lg:gap-x-6 xl:gap-x-7 [&::-webkit-scrollbar]:hidden">
          {Object.entries(dropdownMenus).map(([label, items]) => (
            <DropdownMenu key={label} label={label} items={items} isHeroTop={isHeroTop} />
          ))}

          {primaryLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                "inline-flex h-10 shrink-0 items-center border-b-2 border-transparent pb-0 text-[15px] font-medium transition-colors duration-200 sm:text-[16px]",
                pathname === href ? "border-[#c9a45c]" : isHeroTop ? "hover:border-white/35" : "hover:border-slate-300 dark:hover:border-white/25",
                pathname === href
                  ? isHeroTop
                    ? "text-white"
                    : "text-slate-900 dark:text-white"
                  : isHeroTop
                    ? "text-white/90 hover:text-white"
                    : "text-slate-700 hover:text-slate-900 dark:text-white/80 dark:hover:text-white",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
          </div>
        </nav>

        {/* ── Theme + mobile menu ── */}
        <div className="relative z-20 flex shrink-0 items-center justify-end gap-2 justify-self-end md:gap-3">
          <div className="hidden h-10 items-center md:flex">
            <ThemeToggle
              className={
                isHeroTop
                  ? "h-10 border-white/25 bg-white/12 px-3.5 text-white hover:bg-white/18 dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                  : "h-10 px-3.5"
              }
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className={[
              "inline-flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-xl border md:hidden",
              isHeroTop
                ? "border-white/25 bg-white/12 shadow-sm"
                : "border-slate-200 bg-white/90 shadow-sm dark:border-white/12 dark:bg-black/40",
            ].join(" ")}
          >
            <span
              className={`h-[2px] w-5 rounded-full transition-all duration-300 ${isHeroTop ? "bg-white" : "bg-slate-900 dark:bg-white"} ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-[2px] w-5 rounded-full transition-all duration-300 ${isHeroTop ? "bg-white" : "bg-slate-900 dark:bg-white"} ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[2px] w-5 rounded-full transition-all duration-300 ${isHeroTop ? "bg-white" : "bg-slate-900 dark:bg-white"} ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden border-t px-4 transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ borderTopColor: "rgba(148,163,184,0.35)" }}
        aria-hidden={!mobileOpen}
      >
        <div
          className={[
            "pb-4 pt-2.5 transition-transform duration-300 ease-out",
            mobileOpen ? "translate-y-0" : "-translate-y-2",
          ].join(" ")}
        >
          <nav className="flex flex-col gap-1">
            <div className="mb-2 flex items-center justify-between rounded-xl border border-slate-200 bg-white/70 p-2 dark:border-white/10 dark:bg-black/30">
              <span className="px-2 text-xs font-semibold text-slate-700 dark:text-white/75">Theme</span>
              <ThemeToggle className="py-1.5" />
            </div>

            <div className="rounded-md border border-slate-200/80 dark:border-white/10">
              <button
                type="button"
                onClick={() => setMobileExpanded((v) => (v === "Why Us" ? null : "Why Us"))}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  pathname === "/why-us"
                    ? "bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white"
                    : "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                Why Us
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileExpanded === "Why Us" ? "rotate-180 text-[#c9a45c]" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {mobileExpanded === "Why Us" && (
                <div className="border-t border-slate-200/80 px-2 py-2 dark:border-white/10">
                  <p className="px-2 pb-2 text-[11px] leading-relaxed text-slate-600 dark:text-white/55">
                    Jump to a section on Why Us—homeschooling benefits, what we offer, and FAQs.
                  </p>
                  <Link
                    href="/why-us"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileExpanded(null);
                    }}
                    className="block rounded-md px-3 py-2 text-[12px] font-semibold text-slate-900 dark:text-white"
                  >
                    Open full page
                  </Link>
                  <div className="mt-1 max-h-[40vh] space-y-0.5 overflow-y-auto border-t border-slate-200/60 pt-2 dark:border-white/10">
                    {whyUsNavLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileExpanded(null);
                        }}
                        className="block rounded-md px-3 py-2 text-left text-[12px] text-slate-700 transition-colors hover:bg-slate-900/5 dark:text-white/80 dark:hover:bg-white/10"
                      >
                        <span className="font-semibold text-slate-900 dark:text-white/90">{item.label}</span>
                        <span className="mt-0.5 block text-[11px] text-slate-500 dark:text-white/50">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {primaryLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  pathname === href
                    ? "bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white"
                    : "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Mobile dropdowns */}
            {Object.entries(dropdownMenus).map(([label, items]) => (
              <div key={label}>
                <button
                  type="button"
                  onClick={() => setMobileExpanded((v) => (v === label ? null : label))}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-[13px] font-medium text-slate-700 transition-colors duration-300 hover:bg-slate-900/5 hover:text-slate-900 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {label}
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileExpanded === label ? "rotate-180 text-[#c9a45c]" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {mobileExpanded === label && (
                  <div className="ml-4 mt-1 border-l pl-3" style={{ borderLeftColor: "rgba(148,163,184,0.35)" }}>
                    {"items" in (items?.[0] ?? {}) ? (
                      <div className="flex flex-col gap-0.5 py-1">
                        {items.map((group) => {
                          const expanded = mobileExpanded === `${label}:${group.label}`;
                          return (
                            <div key={group.label}>
                              <button
                                type="button"
                                onClick={() => setMobileExpanded((v) => (v === `${label}:${group.label}` ? label : `${label}:${group.label}`))}
                                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-[13px] font-medium text-slate-700 transition-colors duration-300 hover:bg-slate-900/5 hover:text-slate-900 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                              >
                                <span className="flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a45c]/80" />
                                  {group.label}
                                </span>
                                <svg
                                  className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180 text-[#c9a45c]" : ""}`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                              {expanded && (
                                <div className="ml-3 border-l pl-3" style={{ borderLeftColor: "rgba(148,163,184,0.35)" }}>
                                  {group.items.map((t) => (
                                    <div key={t} className="flex items-center gap-2 px-2 py-2 text-[13px] text-slate-600 dark:text-white/60">
                                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" />
                                      {t}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-0.5">
                        {items.map(({ label: itemLabel, href }) => (
                          <Link
                            key={itemLabel}
                            href={href}
                            onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                            className="rounded-md px-2 py-2 text-[13px] text-slate-600 transition-colors duration-300 hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
                          >
                            {itemLabel}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Login button */}
            <div className="mt-3">
              <MobileLoginLink onClose={() => setMobileOpen(false)} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
