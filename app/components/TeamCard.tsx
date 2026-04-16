"use client";

interface TeamCardProps {
  name: string;
  role: string;
  initials: string;
  photo: string;
  gradient: string;
}

export default function TeamCard({ name, role, initials, photo, gradient }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative h-[300px] w-[220px] overflow-hidden rounded-2xl border border-[#3B82F6]/20 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={name}
          className="h-full w-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (fb) fb.style.display = "flex";
          }}
        />
        {/* Fallback shown only when image fails to load */}
        <div
          className={`absolute inset-0 hidden items-center justify-center bg-gradient-to-br ${gradient}`}
        >
          <span className="text-4xl font-bold text-white/80">{initials}</span>
        </div>
      </div>

      <div>
        <p className="text-lg font-bold text-[#112240]">{name}</p>
        <p className="mt-0.5 text-sm font-semibold uppercase tracking-widest text-[#112240]">
          {role}
        </p>
      </div>
    </div>
  );
}
