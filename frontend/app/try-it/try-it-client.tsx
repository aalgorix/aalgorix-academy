"use client";

import type React from "react";
import { useEffect, useMemo } from "react";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "elevenlabs-convai": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          "agent-id"?: string;
        };
      }
    }
  }
}

function loadScriptOnce(src: string) {
  if (typeof document === "undefined") return;
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

export default function TryItClient() {
  const agentId = (process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? "").trim();

  const widgetScriptSrc = useMemo(() => {
    return (process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_SRC ?? "").trim();
  }, []);

  useEffect(() => {
    const src =
      widgetScriptSrc ||
      "https://elevenlabs.io/convai-widget/index.js";
    loadScriptOnce(src);
  }, [widgetScriptSrc]);

  if (!agentId) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        <p className="font-semibold">Missing ElevenLabs Agent ID.</p>
        <p className="mt-1 text-amber-900/90">
          Set <code className="font-semibold">NEXT_PUBLIC_ELEVENLABS_AGENT_ID</code>{" "}
          in your environment (for example in <code className="font-semibold">frontend/.env.local</code>),
          then reload this page.
        </p>
      </div>
    );
  }

  return (
    <div
      id="try-it-voice-chat"
      className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 md:text-lg">
            Voice chat
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 md:text-sm">
            If you don’t see the mic, check microphone permissions and refresh.
          </p>
        </div>
      </div>

      <div className="relative min-h-[360px] w-full overflow-hidden rounded-2xl bg-slate-50">
        <elevenlabs-convai agent-id={agentId} />
      </div>
    </div>
  );
}

