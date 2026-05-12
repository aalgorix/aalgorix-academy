"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Mail, X } from "lucide-react";

const GOLD = "#c9a45c";

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#c9a45c] focus:ring-2 focus:ring-[#c9a45c]/25 dark:border-white/12 dark:bg-black/45 dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#c9a45c]";
const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-white/75";

type BrochureStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; emailSent: boolean; message?: string }
  | { state: "error"; message: string };

export type BrochureDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function BrochureDialog({ open, onClose }: BrochureDialogProps) {
  const uid = useId();
  const nameId = `${uid}-brochure-name`;
  const emailId = `${uid}-brochure-email`;
  const mobileId = `${uid}-brochure-mobile`;

  const [brochureStatus, setBrochureStatus] = useState<BrochureStatus>({ state: "idle" });
  const [brochureForm, setBrochureForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (!open) return;
    setBrochureStatus({ state: "idle" });
    setBrochureForm({ name: "", email: "", mobile: "" });
  }, [open]);

  async function submitBrochureRequest(e: React.FormEvent) {
    e.preventDefault();
    if (brochureStatus.state === "submitting") return;

    const name = brochureForm.name.trim();
    const email = brochureForm.email.trim();
    const mobile = brochureForm.mobile.trim();

    if (!name || !email || !mobile) {
      setBrochureStatus({ state: "error", message: "Please fill name, email, and mobile number." });
      return;
    }

    setBrochureStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, mobile }),
      });
      const data = (await res.json()) as
        | { ok: true; downloadUrl: string; emailSent: boolean; message?: string }
        | { ok: false; error: string; downloadUrl?: string; emailSent?: boolean; message?: string };

      if (!res.ok || !("ok" in data) || data.ok === false) {
        setBrochureStatus({
          state: "error",
          message: (data as { error?: string })?.error || "Failed to submit. Please try again.",
        });
        return;
      }

      setBrochureStatus({
        state: "success",
        emailSent: data.emailSent,
        message: data.message,
      });
    } catch {
      setBrochureStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex min-h-[100dvh] w-full items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Get brochure"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative mx-auto flex max-h-[min(90dvh,640px)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-[#0b2c4a]/95 dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <div className="h-1 shrink-0" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200/80 px-5 pb-4 pt-5 sm:px-6 dark:border-white/10">
          <div className="min-w-0 flex-1 text-left">
            <h3 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl dark:text-white">Get the brochure</h3>
            <p className="mt-1.5 text-left text-sm leading-relaxed text-slate-600 dark:text-white/70">
              Enter your details and we’ll email you the brochure PDF.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 text-slate-600 transition hover:bg-slate-100 dark:border-white/15 dark:text-white/80 dark:hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={submitBrochureRequest} className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5 sm:px-6">
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={nameId} className={labelClass}>
                Full name
              </label>
              <input
                id={nameId}
                value={brochureForm.name}
                onChange={(e) => setBrochureForm((p) => ({ ...p, name: e.target.value }))}
                className={inputClass}
                placeholder="e.g. Priya Sharma"
                autoComplete="name"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
              <div className="flex min-w-0 flex-col gap-1.5 sm:col-span-1">
                <label htmlFor={emailId} className={labelClass}>
                  Email
                </label>
                <input
                  id={emailId}
                  value={brochureForm.email}
                  onChange={(e) => setBrochureForm((p) => ({ ...p, email: e.target.value }))}
                  className={inputClass}
                  placeholder="you@example.com"
                  autoComplete="email"
                  type="email"
                  required
                />
              </div>
              <div className="flex min-w-0 flex-col gap-1.5 sm:col-span-1">
                <label htmlFor={mobileId} className={labelClass}>
                  Mobile
                </label>
                <input
                  id={mobileId}
                  value={brochureForm.mobile}
                  onChange={(e) => setBrochureForm((p) => ({ ...p, mobile: e.target.value }))}
                  className={inputClass}
                  placeholder="+91 or local number"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </div>
            </div>

            {brochureStatus.state === "error" && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm leading-snug text-red-800 dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-100"
              >
                {brochureStatus.message}
              </div>
            )}

            {brochureStatus.state === "success" && (
              <div
                role="status"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm leading-snug text-emerald-900 dark:border-emerald-500/25 dark:bg-emerald-500/12 dark:text-emerald-50"
              >
                {brochureStatus.emailSent
                  ? "Sent! Check your inbox (and spam) for the brochure."
                  : "We saved your details. Email delivery isn’t configured on the server yet—please contact admissions if you don’t hear from us."}
                {brochureStatus.message ? (
                  <p className="mt-2 text-xs leading-relaxed opacity-85">{brochureStatus.message}</p>
                ) : null}
              </div>
            )}
          </div>

          <div className="mt-6 shrink-0 border-t border-slate-200/80 pt-5 dark:border-white/10">
            <button
              type="submit"
              disabled={brochureStatus.state === "submitting"}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white shadow-md transition enabled:hover:opacity-95 disabled:opacity-55 sm:mx-auto sm:max-w-sm"
              style={{ background: "linear-gradient(135deg, rgba(201,164,92,1) 0%, rgba(201,164,92,0.78) 100%)" }}
            >
              <Mail className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
              {brochureStatus.state === "submitting" ? "Sending…" : "Email brochure"}
            </button>
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500 sm:text-left dark:text-white/45">
            By continuing, you agree we may contact you about admissions and programmes.
          </p>
        </form>
      </div>
    </div>,
    document.body,
  );
}
