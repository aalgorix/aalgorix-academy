"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

/* ── Dropdown data ── */
const dropdownMenus = {
  Programs: [
    { label: "Hybrid School Program", href: "/program#hybrid-school" },
    { label: "Online + Offline Learning", href: "/program#blended-learning" },
    { label: "Curriculum Details", href: "/program#curriculum" },
  ],
  Upskilling: [
    { label: "Short-term Courses", href: "/courses" },
    { label: "Professional Certifications", href: "/courses" },
    { label: "Skill Development Programs", href: "/courses" },
  ],
  Admissions: [
    { label: "How to Apply", href: "/contact" },
    { label: "Eligibility", href: "/contact" },
    { label: "Fees & Scholarships", href: "/contact" },
  ],
};

/* ── Dashboard / Login smart button ── */
function DashboardButton() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const session = localStorage.getItem("aalgorix_session");
      if (session) {
        const { token } = JSON.parse(session);
        if (token) setLoggedIn(true);
      }
    } catch {}
  }, []);

  function handleClick() {
    router.push("/dashboard");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-1.5 rounded-full border border-[#00BFFF]/60 bg-transparent px-4 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:border-[#00BFFF] hover:bg-[#00BFFF]/10 hover:text-[#00BFFF]"
    >
      {/* grid/dashboard icon */}
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
      Dashboard
    </button>
  );
}

/* ── Mobile dashboard / login link (reads localStorage after mount) ── */
function MobileDashboardLink({ onClose }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const session = localStorage.getItem("aalgorix_session");
      if (session) {
        const { token } = JSON.parse(session);
        if (token) setLoggedIn(true);
      }
    } catch {}
  }, []);

  function handleClick() {
    onClose();
    router.push("/dashboard");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-[#00BFFF]/10 hover:text-[#00BFFF]"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#00BFFF]/10 text-[#00BFFF]">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </span>
      {loggedIn ? "Go to Dashboard" : "Dashboard / Login"}
    </button>
  );
}

/* ── Single dropdown item ── */
function DropdownMenu({ label, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          open ? "text-[#00BFFF]" : "text-white/90 hover:text-[#00BFFF]"
        }`}
      >
        {label}
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180 text-[#00BFFF]" : ""}`}
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
        <div className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-white/10 bg-[#0D1F3C] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Sky-blue top accent line */}
          <div className="h-[2px] w-full bg-[#00BFFF]" />
          <ul className="py-1">
            {items.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-white/80 transition-colors hover:bg-[#00BFFF]/10 hover:text-[#00BFFF]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00BFFF]/50" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
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

  const simpleLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "linear-gradient(90deg, #0A1428 0%, #0D1F3C 100%)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
        borderBottom: "1px solid rgba(0,191,255,0.12)",
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">

        {/* ── Logo ── */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-base font-extrabold text-white"
            style={{ background: "linear-gradient(135deg, #00BFFF 0%, #0070C0 100%)" }}
          >
            A
          </div>
          <span className="hidden sm:block">
            <span className="block text-base font-bold leading-tight text-white">
              Aalgorix <span className="text-[#00BFFF]">Academy</span>
            </span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
              Hybrid Schooling &amp; Upskilling
            </span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-7 md:flex">
          {simpleLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-[#00BFFF]"
                  : "text-white/90 hover:text-[#00BFFF]"
              }`}
              style={
                pathname === href
                  ? { borderBottom: "2px solid #00BFFF", paddingBottom: "2px" }
                  : {}
              }
            >
              {label}
            </Link>
          ))}

          {Object.entries(dropdownMenus).map(([label, items]) => (
            <DropdownMenu key={label} label={label} items={items} />
          ))}

          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${
              pathname === "/contact"
                ? "text-[#00BFFF]"
                : "text-white/90 hover:text-[#00BFFF]"
            }`}
            style={
              pathname === "/contact"
                ? { borderBottom: "2px solid #00BFFF", paddingBottom: "2px" }
                : {}
            }
          >
            Contact Us
          </Link>
        </nav>

        {/* ── Desktop right-side actions ── */}
        <div className="hidden items-center gap-3 md:flex">
          <DashboardButton />
          <Link
            href="/contact"
            className="shrink-0 items-center rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-[0_0_16px_rgba(0,191,255,0.5)] flex"
            style={{ background: "linear-gradient(135deg, #00BFFF 0%, #0070C0 100%)" }}
          >
            Book a Demo
          </Link>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md border border-white/10 bg-white/5 md:hidden"
        >
          <span
            className={`h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          className="border-t border-white/10 px-4 pb-4 pt-2 md:hidden"
          style={{ background: "#0D1F3C" }}
        >
          <nav className="flex flex-col gap-1">
            {simpleLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-[#00BFFF]/10 text-[#00BFFF]"
                    : "text-white/80 hover:bg-white/5 hover:text-[#00BFFF]"
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
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-[#00BFFF]"
                >
                  {label}
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileExpanded === label ? "rotate-180 text-[#00BFFF]" : ""}`}
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
                  <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-[#00BFFF]/20 pl-3">
                    {items.map(({ label: itemLabel, href }) => (
                      <Link
                        key={itemLabel}
                        href={href}
                        onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                        className="rounded-md px-2 py-2 text-[13px] text-white/60 hover:text-[#00BFFF]"
                      >
                        {itemLabel}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === "/contact"
                  ? "bg-[#00BFFF]/10 text-[#00BFFF]"
                  : "text-white/80 hover:bg-white/5 hover:text-[#00BFFF]"
              }`}
            >
              Contact Us
            </Link>

            {/* Mobile Dashboard button */}
            <div className="mt-1 border-t border-white/10 pt-2">
              <MobileDashboardLink onClose={() => setMobileOpen(false)} />
            </div>

            {/* Mobile CTA */}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #00BFFF 0%, #0070C0 100%)" }}
            >
              Book a Demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
