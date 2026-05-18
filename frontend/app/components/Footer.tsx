import Link from "next/link";
import BrandLogo from "./BrandLogo";
import {
  footerCompanyLinks,
  footerGetHelpLinks,
  footerPopularLinks,
  footerProductsLinks,
} from "../lib/site-nav";
import { getWhatsAppHref } from "../lib/whatsapp";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c9a45c]">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-sm text-white/75 transition hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GetHelpColumn({
  links,
  whatsappHref,
}: {
  links: readonly { href: string; label: string }[];
  whatsappHref: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c9a45c]">Get Help</p>
      <ul className="mt-4 space-y-2.5">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-sm text-white/75 transition hover:text-white">
              {label}
            </Link>
          </li>
        ))}
        <li>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/75 transition hover:text-white"
          >
            Chat on WhatsApp
          </a>
        </li>
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = getWhatsAppHref();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white dark:border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-16">
        {/* Brand */}
        <div className="max-w-md">
          <BrandLogo href="/" light showTagline />
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            AI-powered homeschooling for Grade 3–12—personalised learning, expert faculty, and life
            skills from home.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-[#c9a45c] px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-[#d4ae6a]"
          >
            Talk to admissions
          </Link>
        </div>

        {/* Link columns */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Company" links={footerCompanyLinks} />
          <GetHelpColumn links={footerGetHelpLinks} whatsappHref={whatsappHref} />
          <FooterColumn title="Products" links={footerProductsLinks} />
          <FooterColumn title="Popular links" links={footerPopularLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-white/50 sm:text-left">
            © {year} Aalgorix World Academy. All rights reserved.
          </p>
          <p className="text-center text-xs text-white/45">
            International Education affiliation · Accreditation IA 441
          </p>
        </div>
      </div>
    </footer>
  );
}
