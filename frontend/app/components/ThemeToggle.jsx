"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem("aa_theme");
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  } catch {
    return "light";
  }
}

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem("aa_theme", theme);
    } catch {}
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold",
        "transition-colors",
        "border-slate-200 bg-white/70 text-slate-800 hover:bg-white",
        "dark:border-white/10 dark:bg-black/30 dark:text-white/90 dark:hover:bg-black/40",
        className,
      ].join(" ")}
    >
      {isDark ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}

