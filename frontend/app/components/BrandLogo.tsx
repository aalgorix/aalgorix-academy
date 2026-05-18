import Link from "next/link";

const GOLD = "#c9a45c";

type BrandLogoProps = {
  href?: string;
  className?: string;
  /** Light text for dark / transparent backgrounds (hero, footer) */
  light?: boolean;
  showTagline?: boolean;
};

export default function BrandLogo({
  href = "/",
  className = "",
  light = false,
  showTagline = true,
}: BrandLogoProps) {
  const titleClass = light ? "text-white" : "text-slate-900 dark:text-white";
  const taglineClass = light ? "text-white/75" : "text-slate-600 dark:text-white/65";

  const content = (
    <>
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base font-black tracking-tight text-slate-900 md:h-10 md:w-10 md:text-lg dark:text-black"
        style={{
          background: "linear-gradient(135deg, rgba(201,164,92,1) 0%, rgba(201,164,92,0.78) 100%)",
          boxShadow: "0 10px 26px rgba(201,164,92,0.16)",
        }}
        aria-hidden
      >
        A
      </div>
      <span className="hidden min-w-0 flex-col items-start sm:flex">
        <span className={`block text-xl font-bold leading-tight md:text-2xl ${titleClass} whitespace-nowrap`}>
          Aalgorix <span style={{ color: GOLD }}>World Academy</span>
        </span>
        {showTagline && (
          <span
            className={[
              "mt-0.5 block whitespace-nowrap text-left font-medium uppercase",
              "text-[clamp(11px,0.85vw,13px)] tracking-[0.18em] leading-tight",
              taglineClass,
            ].join(" ")}
          >
            AI Powered Home School
          </span>
        )}
      </span>
    </>
  );

  const wrapClass = `group flex min-w-0 shrink-0 items-center gap-3 ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${wrapClass} outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#c9a45c]/70 focus-visible:ring-offset-2`}
      >
        {content}
      </Link>
    );
  }

  return <div className={wrapClass}>{content}</div>;
}
