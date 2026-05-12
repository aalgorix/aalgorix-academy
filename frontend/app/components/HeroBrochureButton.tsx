"use client";

import { useState } from "react";
import BrochureDialog from "./BrochureDialog";

const heroCtaClass =
  "h-11 w-full rounded-full border border-white/25 bg-white/5 px-7 text-center text-sm font-bold leading-[44px] text-white/95 backdrop-blur-sm transition hover:border-white/45 hover:bg-white/10 hover:text-white active:scale-[0.985] sm:w-auto sm:leading-normal sm:py-3";

export default function HeroBrochureButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={heroCtaClass}>
        Download Brochure
      </button>
      <BrochureDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
