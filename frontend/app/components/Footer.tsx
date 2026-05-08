import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b2c4a] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-20 md:px-8">
        <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1.05fr_1.95fr]">
          {/* LEFT: Brand */}
          <div className="flex items-start gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-[#c9a45c]/40 bg-white/5">
              <Image
                src="/aalgorix-logo.svg"
                alt="Aalgorix World Academy"
                fill
                className="object-contain p-2"
                sizes="56px"
                unoptimized
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/80">
                Aalgorix World Academy
              </p>
              <h2
                className="mt-1 text-4xl font-semibold leading-[1.05] tracking-[0.02em] md:text-[44px]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Aalgorix
              </h2>
              <p className="mt-3 text-[13px] uppercase tracking-[0.24em] text-white/85">
                WORLD ACADEMY
              </p>
            </div>
          </div>

          {/* RIGHT: Quick Links */}
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-white/85">
              Quick Links
            </div>

            <div
              className="mt-3 text-[13.5px] font-medium leading-[1.9] tracking-[0.02em] text-white/90"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <a className="transition-colors hover:text-[#c9a45c]" href="/">
                HOME
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#aalgorix-world-academy">
                AALGORIX WORLD ACADEMY
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#academics">
                ACADEMICS
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#pastoral-boarding">
                PASTORAL &amp; BOARDING
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#co-curricular">
                CO-CURRICULAR
              </a>
              <br />
              <a className="transition-colors hover:text-[#c9a45c]" href="#admissions">
                ADMISSIONS
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#newsroom">
                NEWSROOM
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#connect-with-us">
                CONNECT WITH US
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#campuses">
                CAMPUSES
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#faq">
                FAQ
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#apply-now">
                APPLY NOW
              </a>
              <br />
              <a className="transition-colors hover:text-[#c9a45c]" href="#application-form">
                APPLICATION FORM
              </a>
              <span className="mx-2.5 inline-block select-none text-white/35">|</span>
              <a className="transition-colors hover:text-[#c9a45c]" href="#policies">
                POLICIES
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Connect */}
        <div className="mt-11 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6">
          <p
            className="text-xs font-medium uppercase tracking-[0.16em] text-white/85"
            style={{ fontFamily: "var(--font-inter)" }}
            id="connect-with-us"
          >
            Connect with us
          </p>

          <nav className="flex items-center gap-3" aria-label="Social media">
            {[
              { label: "Facebook", href: "#facebook", icon: FacebookIcon },
              { label: "Instagram", href: "#instagram", icon: InstagramIcon },
              { label: "LinkedIn", href: "#linkedin", icon: LinkedInIcon },
              { label: "X (Twitter)", href: "#x", icon: XIcon },
              { label: "YouTube", href: "#youtube", icon: YouTubeIcon },
              { label: "Vimeo", href: "#vimeo", icon: VimeoIcon },
            ].map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 transition hover:-translate-y-0.5 hover:border-[#c9a45c]/55 hover:bg-[#c9a45c]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a45c]/70"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </nav>
        </div>

        {/* Divider: thin line + centered gold decorative element */}
        <div className="relative mt-6 pb-2">
          <div className="h-px w-full bg-white/20" />
          <div className="absolute left-1/2 top-0 h-2.5 w-[52px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(201,164,92,0)_0%,rgba(201,164,92,0.95)_22%,rgba(201,164,92,0.95)_78%,rgba(201,164,92,0)_100%)] drop-shadow-[0_10px_18px_rgba(201,164,92,0.18)]" />
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M13.6 21v-7H16l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6h1.4V4.8c-.2 0-1.1-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.3v7h3.3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z" />
      <path d="M12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6z" />
      <path d="M17.6 6.4a1.1 1.1 0 1 1-2.2 0a1.1 1.1 0 0 1 2.2 0z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M6.5 9H3.8v12h2.7V9zM5.1 3.8A1.6 1.6 0 1 0 5.1 7a1.6 1.6 0 0 0 0-3.2zM20.2 21h-2.7v-6.3c0-1.5-.6-2.5-2-2.5-1.1 0-1.7.7-2 1.4-.1.2-.1.6-.1.9V21h-2.7s0-10.3 0-12h2.7v1.7c.4-.7 1.4-1.9 3.3-1.9 2.4 0 4.2 1.6 4.2 5V21z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.7 3H21l-6.7 7.7L22 21h-6.2l-4.9-6.4L5.2 21H3l7.2-8.3L2 3h6.3l4.4 5.8L18.7 3zm-1.1 16h1.3L7.2 4.9H5.8L17.6 19z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M21.6 7.3a3 3 0 0 0-2.1-2.1C17.7 4.7 12 4.7 12 4.7s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.3a31.3 31.3 0 0 0-.5 4.7c0 1.6.2 3.2.5 4.7a3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1c.3-1.5.5-3.1.5-4.7s-.2-3.2-.5-4.7zM10.2 15V9.1L15.6 12l-5.4 3z" />
    </svg>
  );
}

function VimeoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M21.9 7.3c-.1 2.9-2.2 6.9-6.2 12.1-2.1 2.7-3.8 4-5.2 4-.9 0-1.7-.8-2.3-2.4L5.8 12c-.5-1.6-.9-2.4-1.5-2.4-.1 0-.6.3-1.4.9L2 9.1c1.5-1.3 3-2.7 4.6-4 1.1-1 2-1.5 2.8-1.5 1 0 1.6.6 2 1.9l2.6 8.2c.3.9.6 1.4.9 1.4.3 0 .7-.5 1.3-1.4.6-.9.9-1.6 1-2.1.1-.8-.2-1.2-1-1.2-.4 0-.8.1-1.2.3.8-2.6 2.2-3.8 4.3-3.7 1.6.1 2.4 1.1 2.3 3z" />
    </svg>
  );
}
