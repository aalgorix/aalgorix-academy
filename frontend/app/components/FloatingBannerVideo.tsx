"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  src?: string;
};

// Bump keys when behavior changes to avoid stale states.
const STORAGE_CLOSED = "aa_banner_video_closed_v3";
const STORAGE_MODE = "aa_banner_video_mode_v3";

type Mode = "expanded" | "docked";

function readBool(key: string, fallback = false) {
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return v === "1";
  } catch {
    return fallback;
  }
}

function writeBool(key: string, value: boolean) {
  try {
    localStorage.setItem(key, value ? "1" : "0");
  } catch {}
}

export default function FloatingBannerVideo({ src = "/banner-video.mp4" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dockedVideoRef = useRef<HTMLVideoElement | null>(null);
  // Default: show it. If user closes/minimizes we persist.
  const [closed, setClosed] = useState(false);
  const [mode, setMode] = useState<Mode>("expanded");

  useEffect(() => {
    // load from storage after hydration
    setClosed(readBool(STORAGE_CLOSED, false));
    try {
      const saved = localStorage.getItem(STORAGE_MODE);
      if (saved === "docked" || saved === "expanded") setMode(saved);
    } catch {}
  }, []);

  useEffect(() => {
    writeBool(STORAGE_CLOSED, closed);
  }, [closed]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MODE, mode);
    } catch {}
  }, [mode]);

  const frameClass = useMemo(
    () =>
      [
        "pointer-events-auto fixed bottom-4 right-4 z-[70]",
        // ~1.5x larger than previous (24vw/420px)
        "w-[min(36vw,560px)] max-w-[560px] min-w-[320px]",
        "rounded-2xl border border-white/15 bg-black/30 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur",
        "overflow-hidden",
        "transition-all duration-300",
      ].join(" "),
    [],
  );

  // If user closed it, keep a small launcher so it can be reopened.
  if (closed) {
    return (
      <button
        type="button"
        onClick={() => {
          setClosed(false);
          setMode("expanded");
          window.setTimeout(() => videoRef.current?.play?.().catch(() => {}), 50);
        }}
        className="pointer-events-auto fixed bottom-4 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/30 text-base font-black text-white/90 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur transition hover:bg-black/40"
        aria-label="Open banner video"
        title="Open"
      >
        A
      </button>
    );
  }

  if (mode === "docked") {
    return (
      <div
        className={[
          "pointer-events-auto fixed bottom-4 right-4 z-[70]",
          "w-[220px] sm:w-[260px]",
          "rounded-2xl border border-white/15 bg-black/25 shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur",
          "overflow-hidden",
          "transition-all duration-300",
        ].join(" ")}
        onMouseEnter={() => {
          setMode("expanded");
          window.setTimeout(() => {
            const v = videoRef.current;
            if (!v) return;
            try {
              v.currentTime = 0;
            } catch {}
            v.play?.().catch(() => {});
          }, 0);
        }}
        role="button"
        aria-label="Banner video (hover to expand)"
        title="Hover to expand"
      >
        <video
          ref={dockedVideoRef}
          src={src}
          autoPlay
          loop
          playsInline
          muted
          preload="metadata"
          className="aspect-video w-full bg-black"
        />
      </div>
    );
  }

  return (
    <div
      className={frameClass}
      role="dialog"
      aria-label="Banner video"
      onMouseLeave={() => {
        // After it has docked once, user can still shrink by leaving.
        // Keep it expanded unless it has ended; this is controlled by onEnded.
      }}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setClosed(true);
            setMode("expanded");
          }}
          className="absolute right-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/90 backdrop-blur transition hover:bg-black/50"
          aria-label="Close banner video"
          title="Close"
        >
          ×
        </button>

        <video
          ref={videoRef}
          src={src}
          autoPlay
          playsInline
          muted
          controls
          preload="metadata"
          className="aspect-video w-full bg-black"
          onEnded={() => setMode("docked")}
        />

        <div className="flex items-center justify-between gap-3 px-3 py-2">
          <p className="truncate text-[12px] font-semibold text-white/90">Aalgorix Banner</p>
          <button
            type="button"
            onClick={() => setMode("docked")}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            Dock
          </button>
        </div>
      </div>
    </div>
  );
}

