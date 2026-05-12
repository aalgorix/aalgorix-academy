"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { LogIn } from "lucide-react";

const GOLD = "#c9a45c";

/* ── Dropdown data ── */
const dropdownMenus = {
  Academics: [
    { label: "Boards", items: ["Primary", "Secondary"] },
    { label: "Languages", items: ["French", "Spanish", "German", "Italian", "Russian"] },
    { label: "Life Skills", items: ["Public speaking", "Communication skills", "Social skills"] },
    { label: "Competitive", items: ["Olympiad", "Robotics", "Scholarship Exams", "Interschool Quizzes"] },
  ],
};

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
        className={`flex items-center gap-1 text-[16px] font-medium transition-colors duration-300 ${
          open
            ? "text-[#c9a45c]"
            : isHeroTop
              ? "text-white hover:text-[#c9a45c]"
              : "text-slate-700 hover:text-slate-900 dark:text-white/85 dark:hover:text-white"
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

  const navTextClass = isHeroTop
    ? "text-white"
    : "text-slate-900 dark:text-white";

  const navSubTextClass = isHeroTop
    ? "text-white/75"
    : "text-slate-600 dark:text-white/65";

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
      <div className="mx-auto flex w-full max-w-[180rem] items-center justify-between px-6 py-4 md:px-16">

        {/* ── Logo ── */}
        <Link href="/" className="flex shrink-0 itemss-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl text-base font-black tracking-tight text-slate-900 md:h-10 md:w-10 md:text-lg dark:text-black"
            style={{
              background: "linear-gradient(135deg, rgba(201,164,92,1) 0%, rgba(201,164,92,0.78) 100%)",
              boxShadow: "0 10px 26px rgba(201,164,92,0.16)",
            }}
          >
            A
          </div>
          <span className="hidden sm:flex flex-col items-start">
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

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/why-us"
            className={`text-[16px] font-medium transition-colors duration-300 ${
              pathname === "/why-us"
                ? isHeroTop
                  ? "text-white"
                  : "text-slate-900 dark:text-white"
                : isHeroTop
                  ? "text-white/85 hover:text-white"
                  : "text-slate-700 hover:text-slate-900 dark:text-white/75 dark:hover:text-white"
            }`}
            style={pathname === "/why-us" ? { borderBottom: `2px solid ${GOLD}`, paddingBottom: "2px" } : {}}
          >
            Why Us
          </Link>
          {Object.entries(dropdownMenus).map(([label, items]) => (
            <DropdownMenu key={label} label={label} items={items} isHeroTop={isHeroTop} />
          ))}

          {primaryLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-[16px] font-medium transition-colors duration-300 ${
                pathname === href
                  ? isHeroTop
                    ? "text-white"
                    : "text-slate-900 dark:text-white"
                  : isHeroTop
                    ? "text-white/85 hover:text-white"
                    : "text-slate-700 hover:text-slate-900 dark:text-white/75 dark:hover:text-white"
              }`}
              style={
                pathname === href
                  ? { borderBottom: `2px solid ${GOLD}`, paddingBottom: "2px" }
                  : {}
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop right-side actions ── */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle
            className={
              isHeroTop
                ? "border-white/20 bg-white/10 text-white hover:bg-white/15 dark:border-white/20 dark:bg-white/10 dark:text-white"
                : ""
            }
          />
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className={[
            "flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl border md:hidden",
            isHeroTop
              ? "border-white/20 bg-white/10"
              : "border-slate-200 bg-white/70 dark:border-white/10 dark:bg-black/30",
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

            <Link
              href="/why-us"
              onClick={() => setMobileOpen(false)}
              className={`rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-300 ${
                pathname === "/why-us"
                  ? "bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white"
                  : "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              Why Us
            </Link>

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
