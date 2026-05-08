"use client";

interface TeamCardProps {
  name: string;
  role: string;
  initials: string;
  photo?: string;
  gradient?: string;
}

export default function TeamCard({ name, role, initials, photo, gradient }: TeamCardProps) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white px-8 pb-8 pt-10 shadow-sm">
      <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-slate-100 ring-4 ring-white shadow">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (fb) fb.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className={[
            "hidden h-full w-full items-center justify-center",
            "bg-gradient-to-br",
            gradient ?? "from-slate-300 to-slate-500",
            !photo ? "flex" : "",
          ].join(" ")}
        >
          <span className="text-2xl font-semibold text-white/90">{initials}</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-base font-semibold text-slate-900">{name}</p>
        <p className="mt-1 text-sm text-slate-500">{role}</p>
      </div>
    </div>
  );
}
