"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  Settings,
  Bell,
  LogOut,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Menu,
  X,
  GraduationCap,
  ExternalLink,
  Sparkles,
  BarChart3,
  Zap,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const MOODLE_DASHBOARD = `${process.env.NEXT_PUBLIC_MOODLE_URL ?? "https://aalgorixacademy.moodlecloud.com"}/my/`;

// ─── Dummy data ────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Total Students",         value: "1,284", change: "+12%", icon: Users,         color: "blue"   },
  { label: "Active Courses",         value: "34",    change: "+3",   icon: BookOpen,      color: "indigo" },
  { label: "Assignments Completed",  value: "8,920", change: "+5.4%",icon: ClipboardList, color: "sky"    },
  { label: "Avg. Performance",       value: "78%",   change: "+2.1%",icon: TrendingUp,    color: "cyan"   },
];

const RECENT_ACTIVITIES = [
  { user: "Riya Sharma",  action: "submitted Assignment 3 in Python Basics",              time: "5 min ago",  avatar: "RS" },
  { user: "Arjun Mehta", action: "enrolled in Machine Learning Fundamentals",             time: "18 min ago", avatar: "AM" },
  { user: "Priya Singh", action: "completed Module 4 of Web Development",                time: "42 min ago", avatar: "PS" },
  { user: "Karan Joshi", action: "posted a question in Data Structures forum",            time: "1 hr ago",   avatar: "KJ" },
  { user: "Neha Patel",  action: "achieved 100% in Quiz – SQL Basics",                   time: "2 hr ago",   avatar: "NP" },
];

const UPCOMING_CLASSES = [
  { course: "Python Basics",    time: "Today, 11:00 AM",    students: 32, tag: "Live",      tagColor: "bg-green-100 text-green-700"  },
  { course: "Machine Learning", time: "Today, 2:00 PM",     students: 28, tag: "Upcoming",  tagColor: "bg-blue-100 text-blue-700"    },
  { course: "Web Development",  time: "Tomorrow, 10:00 AM", students: 45, tag: "Scheduled", tagColor: "bg-slate-100 text-slate-600"  },
  { course: "Data Structures",  time: "Tomorrow, 3:30 PM",  students: 19, tag: "Scheduled", tagColor: "bg-slate-100 text-slate-600"  },
];

const COURSES_PROGRESS = [
  { name: "Python Basics",    students: 142, progress: 82 },
  { name: "Web Development",  students: 98,  progress: 65 },
  { name: "Machine Learning", students: 74,  progress: 48 },
  { name: "Data Structures",  students: 120, progress: 91 },
  { name: "SQL & Databases",  students: 56,  progress: 37 },
];

const NAV_ITEMS = [
  { label: "Dashboard",   icon: LayoutDashboard, href: "/dashboard"   },
  { label: "Courses",     icon: BookOpen,        href: "/courses"     },
  { label: "Students",    icon: Users,           href: "/students"    },
  { label: "Assignments", icon: ClipboardList,   href: "/assignments" },
  { label: "Settings",    icon: Settings,        href: "/settings"    },
];

const STAT_COLORS: Record<string, { bg: string; icon: string; badge: string }> = {
  blue:   { bg: "bg-blue-50",   icon: "bg-blue-600 text-white",   badge: "bg-blue-100 text-blue-700"   },
  indigo: { bg: "bg-indigo-50", icon: "bg-indigo-600 text-white", badge: "bg-indigo-100 text-indigo-700" },
  sky:    { bg: "bg-sky-50",    icon: "bg-sky-500 text-white",    badge: "bg-sky-100 text-sky-700"     },
  cyan:   { bg: "bg-cyan-50",   icon: "bg-cyan-600 text-white",   badge: "bg-cyan-100 text-cyan-700"   },
};

// ─── Session helpers ──────────────────────────────────────────────────────────

function readSession() {
  try {
    const raw = localStorage.getItem("aalgorix_session");
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s?.token ? s : null;
  } catch {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem("aalgorix_session");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Sidebar({
  active,
  collapsed,
  onNav,
  onLogout,
  userName,
  userInitials,
}: {
  active: string;
  collapsed: boolean;
  onNav: (href: string) => void;
  onLogout: () => void;
  userName: string;
  userInitials: string;
}) {
  return (
    <aside
      className={`flex h-full flex-col justify-between bg-white border-r border-slate-200 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-60"
      }`}
    >
      <div>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-extrabold shadow-md">
            A
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">Aalgorix</p>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Academy Portal</p>
            </div>
          )}
        </div>

        <nav className="mt-3 flex flex-col gap-0.5 px-2">
          {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
            const isActive = active === href;
            return (
              <button
                key={href}
                type="button"
                onClick={() => onNav(href)}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 w-full text-left ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="shrink-0" size={18} />
                {!collapsed && <span>{label}</span>}
                {!collapsed && isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />}
              </button>
            );
          })}

          {/* Open LMS Dashboard link */}
          <a
            href={MOODLE_DASHBOARD}
            target="_blank"
            rel="noopener noreferrer"
            title={collapsed ? "Open LMS" : undefined}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sky-600 hover:bg-sky-50 hover:text-sky-700 transition-all duration-150 w-full mt-1 border border-sky-100"
          >
            <ExternalLink className="shrink-0" size={18} />
            {!collapsed && <span>Open LMS</span>}
          </a>
        </nav>
      </div>

      <div className="px-2 pb-4">
        <div className={`mb-2 rounded-xl bg-slate-50 p-3 border border-slate-100 ${collapsed ? "flex justify-center" : ""}`}>
          {collapsed ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {userInitials}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {userInitials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-slate-800">{userName}</p>
                <p className="text-[10px] text-slate-400">Student</p>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onLogout}
          title={collapsed ? "Logout" : undefined}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function StatCard({ label, value, change, icon: Icon, color }: (typeof STATS)[number]) {
  const c = STAT_COLORS[color];
  return (
    <div className={`flex items-center gap-4 rounded-2xl p-5 ${c.bg} border border-white shadow-sm hover:shadow-md transition-shadow`}>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.icon} shadow`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
      </div>
      <span className={`ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${c.badge}`}>
        {change}
      </span>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ─── Unauthenticated hero / CTA ───────────────────────────────────────────────

function LoginCTA() {
  const FEATURES = [
    { icon: BookOpen,  title: "My Courses",    desc: "Track all your enrolled courses, progress, and upcoming classes in one place." },
    { icon: BarChart3, title: "Progress",      desc: "Visual analytics on assignments, quiz scores, and completion rates." },
    { icon: Sparkles,  title: "AI Insights",   desc: "Personalised recommendations and AI-powered study suggestions." },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #060f1f 0%, #0b1e3c 55%, #0d2a50 100%)" }}
    >
      {/* Minimal top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-extrabold text-white"
            style={{ background: "linear-gradient(135deg, #3AB0FF 0%, #0B6EC7 100%)" }}
          >
            A
          </div>
          <span className="text-sm font-bold text-white">Aalgorix <span style={{ color: "#3AB0FF" }}>Academy</span></span>
        </Link>
        <Link
          href="/login"
          className="rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-all hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #3AB0FF, #0B6EC7)" }}
        >
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" style={{ background: "rgba(58,176,255,0.08)" }} />
          <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full blur-[100px]" style={{ background: "rgba(11,30,60,0.9)" }} />
        </div>

        <div className="relative z-10 max-w-2xl">
          {/* Badge */}
          <span
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
            style={{
              background: "rgba(58,176,255,0.1)",
              border: "1px solid rgba(58,176,255,0.3)",
              color: "#3AB0FF",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#3AB0FF] shadow-[0_0_6px_#3AB0FF]" />
            AI-POWERED STUDENT PORTAL
          </span>

          <h1
            className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Welcome to Your
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #3AB0FF, #7dd3fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Learning Dashboard
            </span>
          </h1>

          <p className="mb-10 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Access your personalised AI-powered learning experience — track courses,
            view progress, and get smart insights, all in one place.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login?from=/dashboard"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(58,176,255,0.4)]"
              style={{ background: "linear-gradient(135deg, #3AB0FF 0%, #0B6EC7 100%)" }}
            >
              <Zap size={16} />
              Login to Continue
            </Link>
            <a
              href={MOODLE_DASHBOARD}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold text-white/80 transition-all hover:border-[#3AB0FF]/60 hover:text-white"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              <ExternalLink size={15} />
              Open LMS Directly
            </a>
          </div>
        </div>

        {/* Feature cards */}
        <div className="relative z-10 mt-20 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(58,176,255,0.12)",
                  border: "1px solid rgba(58,176,255,0.25)",
                }}
              >
                <Icon size={18} style={{ color: "#3AB0FF" }} />
              </div>
              <h3 className="mb-1 text-sm font-bold text-white">{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession]                 = useState<{ firstname?: string; fullname?: string; token?: string } | null>(null);
  const [checked, setChecked]                 = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeNav, setActiveNav]             = useState("/dashboard");

  useEffect(() => {
    const s = readSession();
    setSession(s);
    setChecked(true);
  }, []);

  function handleLogout() {
    clearSession();
    router.push("/");
  }

  function handleNav(href: string) {
    setActiveNav(href);
    setMobileSidebarOpen(false);
    if (href !== "/dashboard") router.push(href);
  }

  // Still reading localStorage — render nothing to avoid flash
  if (!checked) return null;

  // Not logged in → show the hero CTA
  if (!session) return <LoginCTA />;

  // ── Logged-in dashboard ────────────────────────────────────────────────────

  const userName     = session.fullname  || session.firstname || "Student";
  const firstName    = session.firstname || userName.split(" ")[0];
  const userInitials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:flex lg:flex-col h-full">
        <Sidebar
          active={activeNav}
          collapsed={sidebarCollapsed}
          onNav={handleNav}
          onLogout={handleLogout}
          userName={userName}
          userInitials={userInitials}
        />
      </div>

      {/* ── Mobile Sidebar overlay ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-60 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              active={activeNav}
              collapsed={false}
              onNav={handleNav}
              onLogout={handleLogout}
              userName={userName}
              userInitials={userInitials}
            />
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* ── Top header ── */}
        <header className="flex items-center justify-between bg-white border-b border-slate-200 px-5 py-3.5 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={18} />
            </button>
            <button
              type="button"
              onClick={() => setSidebarCollapsed((v) => !v)}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
            >
              {sidebarCollapsed ? <Menu size={18} /> : <X size={18} />}
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-800">Dashboard</h1>
              <p className="text-[11px] text-slate-400">{today}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Open LMS button */}
            <a
              href={MOODLE_DASHBOARD}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: "linear-gradient(135deg, #3AB0FF, #0B6EC7)" }}
            >
              <ExternalLink size={12} />
              Open LMS
            </a>

            {/* Notifications */}
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* User chip */}
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-100 px-3 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                {userInitials}
              </div>
              <span className="hidden sm:block text-sm font-semibold text-slate-700">{firstName}</span>
            </div>
          </div>
        </header>

        {/* ── Scrollable body ── */}
        <main className="flex-1 overflow-y-auto p-5 md:p-7">

          {/* Welcome banner */}
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-5 text-white shadow-lg shadow-blue-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xl font-bold">Welcome back, {firstName}! 👋</p>
                <p className="mt-0.5 text-sm text-blue-100">
                  Here&apos;s what&apos;s happening at Aalgorix Academy today.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 backdrop-blur-sm">
                  <GraduationCap size={18} className="text-blue-100" />
                  <span className="text-sm font-semibold">Spring Semester 2025</span>
                </div>
                <a
                  href={MOODLE_DASHBOARD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <ExternalLink size={14} />
                  Open LMS Dashboard
                </a>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Middle row */}
          <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">

            {/* Recent Activities */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-sm font-bold text-slate-800">Recent Activities</h2>
                <button type="button" className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
              </div>
              <ul className="divide-y divide-slate-50">
                {RECENT_ACTIVITIES.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                      {a.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-700">
                        <span className="font-semibold text-slate-900">{a.user}</span>{" "}{a.action}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock size={10} /> {a.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upcoming Classes */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-sm font-bold text-slate-800">Upcoming Classes</h2>
                <button type="button" className="text-xs font-semibold text-blue-600 hover:underline">Full schedule</button>
              </div>
              <ul className="divide-y divide-slate-50">
                {UPCOMING_CLASSES.map((c, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <BookOpen size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{c.course}</p>
                        <p className="text-[11px] text-slate-400">{c.time} · {c.students} students</p>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${c.tagColor}`}>
                      {c.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Progress */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-sm font-bold text-slate-800">Course Progress Overview</h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Completion rate across active courses</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
                <Award size={14} />
                <span>Top: Data Structures</span>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {COURSES_PROGRESS.map((cp, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 text-[11px] font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-semibold text-slate-800">{cp.name}</p>
                      <span className="text-xs font-bold text-blue-600">{cp.progress}%</span>
                    </div>
                    <ProgressBar value={cp.progress} />
                    <p className="mt-1 text-[11px] text-slate-400">{cp.students} students enrolled</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
