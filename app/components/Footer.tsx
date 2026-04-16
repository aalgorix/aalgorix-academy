import Image from "next/image";

export default function Footer() {
  return (
    <footer className="aa-ivory-texture mt-0 border-t border-foreground/10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <a href="/" className="flex items-center gap-3 text-3xl font-semibold tracking-wide text-foreground">
            <Image
              src="/aalgorix-logo.svg"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0"
              unoptimized
            />
            <span>
              <span className="text-accent">Aalgorix</span> Academy
            </span>
          </a>
          <p className="mt-4 text-sm text-muted">Follow Aalgorix Academy on Social Media</p>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="aa-soft-lift flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-surface text-xs font-semibold text-accent transition hover:border-accent/35"
            >
              ig
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="aa-soft-lift flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-surface text-xs font-semibold text-accent transition hover:border-accent/35"
            >
              f
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="aa-soft-lift flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-surface text-xs font-semibold text-accent transition hover:border-accent/35"
            >
              yt
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="aa-soft-lift flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-surface text-xs font-semibold text-accent transition hover:border-accent/35"
            >
              in
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold text-foreground">Helpful Links</h2>
          <ul className="space-y-1.5 text-sm text-muted">
            <li><a href="/courses" className="transition hover:text-accent">Courses for Kids</a></li>
            <li><a href="/courses" className="transition hover:text-accent">Home Schooling</a></li>
            <li><a href="/contact" className="transition hover:text-accent">Register</a></li>
            <li><a href="#" className="transition hover:text-accent">News</a></li>
            <li><a href="/about" className="transition hover:text-accent">About Us</a></li>
            <li><a href="/contact" className="transition hover:text-accent">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold text-foreground">Discover</h2>
          <ul className="space-y-1.5 text-sm text-muted">
            <li><a href="/about" className="transition hover:text-accent">Our Team</a></li>
            <li><a href="#" className="transition hover:text-accent">Director&apos;s Desk</a></li>
            <li><a href="/about" className="transition hover:text-accent">Vision &amp; Mission</a></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold text-foreground">Quick View</h2>
          <ul className="space-y-1.5 text-sm text-muted">
            <li><a href="/contact" className="transition hover:text-accent">How to Enroll</a></li>
            <li><a href="#" className="transition hover:text-accent">Fees</a></li>
            <li><a href="#" className="transition hover:text-accent">Terms and Conditions</a></li>
            <li><a href="#" className="transition hover:text-accent">Privacy Policy</a></li>
            <li><a href="#" className="transition hover:text-accent">Zoom Guide</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-foreground/10 px-4 py-4 text-center text-xs text-muted">
        Aalgorix Academy, 5th Floor, Industry House, HT Parekh Marg, Churchgate, Mumbai, Maharashtra 400020
      </div>
      <div className="border-t border-foreground/10 bg-surface/50 px-4 py-3 text-center text-xs text-foreground/85">
        COPYRIGHT 2023 @ Aalgorix Academy
      </div>
    </footer>
  );
}
