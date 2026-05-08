"use client";

import { useEffect } from "react";

const SLOT_ID = "tryit-widget-cta-slot";

function normalizeText(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function looksLikeWidgetCTA(el: HTMLElement) {
  const aria = normalizeText(el.getAttribute("aria-label") ?? "");
  const title = normalizeText(el.getAttribute("title") ?? "");
  const text = normalizeText(el.textContent ?? "");
  const hay = `${aria} ${title} ${text}`;
  return hay.includes("start a call") || (hay.includes("start") && hay.includes("call"));
}

function isVisible(el: HTMLElement) {
  const cs = window.getComputedStyle(el);
  if (cs.display === "none" || cs.visibility === "hidden") return false;
  if (Number(cs.opacity || "1") === 0) return false;
  const r = el.getBoundingClientRect();
  return r.width > 4 && r.height > 4;
}

function isBottomRight(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.right > window.innerWidth - 260 && rect.bottom > window.innerHeight - 260;
}

function isFloating(el: HTMLElement) {
  const cs = window.getComputedStyle(el);
  return cs.position === "fixed" || cs.position === "absolute";
}

function findWorkingWidgetCTAContainer(): HTMLElement | null {
  const seenRoots = new Set<ParentNode>();
  const queue: ParentNode[] = [document];
  const candidates: HTMLElement[] = [];

  const enqueueShadowRoots = (root: ParentNode) => {
    const els = Array.from((root as ParentNode & { querySelectorAll?: any }).querySelectorAll?.("*") ?? []) as Array<
      HTMLElement & { shadowRoot?: ShadowRoot }
    >;
    for (const el of els) {
      if (el.shadowRoot && !seenRoots.has(el.shadowRoot)) queue.push(el.shadowRoot);
    }
  };

  while (queue.length && seenRoots.size < 60) {
    const root = queue.shift()!;
    if (seenRoots.has(root)) continue;
    seenRoots.add(root);

    const buttons = Array.from(
      (root as ParentNode & { querySelectorAll: any }).querySelectorAll?.("button, [role='button'], a") ?? [],
    ) as HTMLElement[];

    for (const b of buttons) {
      if (!looksLikeWidgetCTA(b)) continue;
      if (!isVisible(b)) continue;
      candidates.push(b);
    }

    enqueueShadowRoots(root);
  }

  // Prefer the floating bottom-right CTA (the one you want shifted).
  const primary =
    candidates.find((c) => isFloating(c) && isBottomRight(c)) ||
    candidates.find((c) => isBottomRight(c)) ||
    candidates.find((c) => isFloating(c)) ||
    candidates[0];

  if (!primary) return null;

  // If CTA lives in a shadow root, move the host element (keeps shadow styles intact).
  const rootNode = primary.getRootNode();
  const base =
    rootNode instanceof ShadowRoot ? (rootNode.host as HTMLElement) : (primary as HTMLElement);

  // Move the nearest floating container in the light DOM (keeps click handlers intact).
  let container: HTMLElement = base;
  let cur: HTMLElement | null = base;
  for (let i = 0; i < 10 && cur; i++) {
    const ccs = window.getComputedStyle(cur);
    if (ccs.position === "fixed" || ccs.position === "absolute") {
      container = cur;
      break;
    }
    cur = cur.parentElement;
  }

  return container;
}

export default function TryItHeaderActions() {
  useEffect(() => {
    const slot = document.getElementById(SLOT_ID);
    if (!slot) return;

    const tryMove = () => {
      if (!slot.isConnected) return;

      const container = findWorkingWidgetCTAContainer();
      if (!container) return;
      if (slot.contains(container)) return;

      slot.replaceChildren(container);
      container.style.setProperty("position", "static", "important");
      container.style.setProperty("inset", "auto", "important");
      container.style.removeProperty("right");
      container.style.removeProperty("bottom");
      container.style.removeProperty("left");
      container.style.removeProperty("top");
      container.style.setProperty("transform", "none", "important");
      container.style.setProperty("margin", "0", "important");
      container.style.setProperty("z-index", "auto", "important");
      container.style.setProperty("width", "auto", "important");
    };

    tryMove();
    const t = window.setInterval(tryMove, 350);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="flex w-full justify-end sm:w-auto">
      <div id={SLOT_ID} className="w-full sm:w-auto" />
    </div>
  );
}

