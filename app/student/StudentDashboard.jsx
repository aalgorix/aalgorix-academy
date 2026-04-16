'use client';

/**
 * StudentDashboard — Aalgorix Academy Student Portal
 *
 * Palette
 *   Background   #0a192f   (deep navy)
 *   Sidebar/Cards #112240  (dark blue)
 *   Accent        #007bff  (bright blue)
 *   Text primary  #ccd6f6  (off-white)
 *   Text muted    #8892b0  (slate blue)
 *   Border        rgba(255,255,255,0.08)
 *
 * Tabs: Dashboard · Courses · Assignments · Settings
 */

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, clearSession } from '@/lib/api';

// ─── Config ───────────────────────────────────────────────────────────────────
// Calls the Next.js API route — no Express backend required
const DASHBOARD_API = '/api/dashboard';

// ─── Style tokens ─────────────────────────────────────────────────────────────
const accent = '#007bff';
const card   = { background: '#112240', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' };
const muted  = { color: '#8892b0' };
const txt    = { color: '#ccd6f6' };
const pageBg = '#0a192f';

// Computed once at module load — never changes during a session
const TODAY_STRING = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', day: 'numeric', month: 'short',
});

const TAB_TITLES = {
  dashboard:   'Dashboard',
  courses:     'My Courses',
  assignments: 'Assignments',
  settings:    'Settings',
};

function fmtDate(unix) {
  if (!unix) return '—';
  return new Date(unix * 1000).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function fmtDateTime(unix) {
  if (!unix) return '—';
  return new Date(unix * 1000).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

function daysUntil(unix) {
  if (!unix) return null;
  const diff = unix * 1000 - Date.now();
  return Math.ceil(diff / 86_400_000);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Spinner({ label = 'Loading…' }) {
  return (
    <div style={{ background: pageBg }} className="flex min-h-screen flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10"
           style={{ borderTopColor: accent }} />
      <p className="text-sm font-medium" style={muted}>{label}</p>
    </div>
  );
}

function ErrorBanner({ message, onRetry }) {
  return (
    <div style={{ background: pageBg }}
         className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full text-2xl"
           style={{ background: 'rgba(239,68,68,0.15)' }}>⚠️</div>
      <h2 className="text-lg font-bold" style={txt}>Failed to load dashboard</h2>
      <p className="max-w-sm text-sm" style={muted}>{message}</p>
      <button onClick={onRetry}
              className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ background: accent }}>
        Retry
      </button>
    </div>
  );
}

function ProgressBar({ value = 0, color = accent }) {
  const pct = Math.min(Math.max(Number(value) || 0, 0), 100);
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full"
         style={{ background: 'rgba(255,255,255,0.08)' }}>
      <div className="h-full rounded-full transition-all duration-700"
           style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'dashboard',   icon: IcoDashboard,   label: 'Dashboard'   },
  { id: 'courses',     icon: IcoCourses,     label: 'Courses'     },
  { id: 'assignments', icon: IcoAssignments, label: 'Assignments' },
  { id: 'settings',    icon: IcoSettings,    label: 'Settings'    },
];

function Sidebar({ student, activeTab, onTab, onLogout }) {
  return (
    <aside className="flex h-full flex-col justify-between py-6"
           style={{ background: '#112240', width: 240, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      <div>
        {/* Logo */}
        <div className="mb-8 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-extrabold text-white text-sm"
                 style={{ background: accent }}>A</div>
            <div>
              <p className="text-sm font-bold leading-tight text-white">Aalgorix</p>
              <p className="text-[10px] font-medium" style={muted}>Academy Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const active = activeTab === id;
            return (
              <button key={id} onClick={() => onTab(id)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-left transition-all"
                      style={active
                        ? { background: `${accent}22`, color: accent }
                        : { color: '#8892b0' }}
                      onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#ccd6f6'; }}
                      onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#8892b0'; }}>
                <Icon size={16} />
                {label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User + Logout */}
      <div className="px-3">
        <div className="mb-2 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                 style={{ background: accent }}>
              {student?.firstname?.[0]?.toUpperCase() ?? 'S'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold" style={txt}>
                {student?.firstname ?? 'Student'} {student?.lastname ?? ''}
              </p>
              <p className="text-[10px]" style={muted}>Student</p>
            </div>
          </div>
        </div>
        <button onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
                style={{ color: '#8892b0' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#8892b0'; }}>
          <IcoLogout size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

// ─── Mobile header ────────────────────────────────────────────────────────────
function MobileHeader({ onMenu }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 lg:hidden"
         style={{ background: '#112240', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
             style={{ background: accent }}>A</div>
        <span className="text-sm font-bold text-white">Aalgorix Academy</span>
      </div>
      <button onClick={onMenu} className="rounded-lg p-1.5" style={{ color: '#8892b0' }}>
        <IcoMenu size={20} />
      </button>
    </div>
  );
}

// ─── Tab: Dashboard ───────────────────────────────────────────────────────────
function TabDashboard({ data }) {
  const { student, enrolledCourses = [], upcomingEvents = [], stats } = data;
  const totalCourses = stats?.totalCourses ?? enrolledCourses.length;
  const avgProgress  = stats?.avgProgress ?? 0;
  const pending      = stats?.pendingAssignments ?? 0;

  const STATS = [
    { label: 'Enrolled Courses',    value: totalCourses, icon: IcoCourses,     color: accent     },
    { label: 'Assignments Due',     value: pending,      icon: IcoAssignments, color: '#f59e0b'  },
    { label: 'Avg. Progress',       value: `${avgProgress}%`, icon: IcoChart,  color: '#10b981'  },
  ];

  const now = Math.floor(Date.now() / 1000);
  const nextEvents = upcomingEvents
    .filter((e) => e.timestart > now)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl px-6 py-5"
           style={{ background: `linear-gradient(135deg, ${accent}22 0%, #112240 100%)`, border: `1px solid ${accent}33` }}>
        <p className="text-xl font-bold text-white">
          Welcome back, {student?.firstname ?? 'Student'}! 👋
        </p>
        <p className="mt-1 text-sm" style={muted}>
          You have <span className="font-semibold text-white">{totalCourses}</span> active
          course{totalCourses !== 1 ? 's' : ''} · Average progress{' '}
          <span className="font-semibold text-white">{avgProgress}%</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl p-5 transition-all"
               style={card}
               onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color}55`}
               onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                 style={{ background: `${color}22` }}>
              <Icon size={22} color={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs font-medium" style={muted}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two-col: courses overview + upcoming schedule */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Course progress overview */}
        <div className="xl:col-span-2 rounded-2xl p-5" style={card}>
          <h3 className="mb-4 font-bold text-white">Course Progress</h3>
          {enrolledCourses.length === 0 ? (
            <p className="text-sm" style={muted}>No courses enrolled yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {enrolledCourses.map((c) => {
                const pct = Number(c.progress) || 0;
                return (
                  <div key={c.id}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-white truncate mr-4">{c.fullname}</span>
                      <span className="shrink-0 font-bold text-xs"
                            style={{ color: pct >= 100 ? '#10b981' : pct > 0 ? accent : '#8892b0' }}>
                        {pct}%
                      </span>
                    </div>
                    <ProgressBar value={pct} color={pct >= 100 ? '#10b981' : accent} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming schedule */}
        <div className="rounded-2xl p-5" style={card}>
          <h3 className="mb-4 font-bold text-white">Upcoming Schedule</h3>
          {nextEvents.length === 0 ? (
            <p className="text-sm" style={muted}>No upcoming events.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {nextEvents.map((ev) => (
                <div key={ev.id} className="rounded-xl p-3"
                     style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-sm font-medium text-white leading-snug">{ev.name}</p>
                  <p className="mt-0.5 text-xs" style={muted}>{fmtDateTime(ev.timestart)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Courses ─────────────────────────────────────────────────────────────
function TabCourses({ courses }) {
  return (
    <div className="p-6">
      <h2 className="mb-5 text-base font-bold text-white">My Courses</h2>
      {courses.length === 0 ? (
        <div className="rounded-2xl p-10 text-center" style={card}>
          <p className="text-3xl mb-2">📭</p>
          <p className="font-medium text-white">No courses enrolled yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((c) => {
            const pct = Number(c.progress) || 0;
            return (
              <div key={c.id} className="rounded-2xl p-5 transition-all duration-200 flex flex-col"
                   style={card}
                   onMouseEnter={(e) => e.currentTarget.style.borderColor = `${accent}55`}
                   onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>

                {/* Header */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                       style={{ background: `${accent}22` }}>
                    <IcoCourses size={20} color={accent} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-snug text-white">{c.fullname}</p>
                    <p className="mt-0.5 text-xs" style={muted}>{c.shortname || `Course #${c.id}`}</p>
                    {c.summary && (
                      <p className="mt-1.5 text-xs leading-relaxed line-clamp-2" style={muted}>{c.summary}</p>
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1" style={muted}>
                    <span>Progress</span>
                    <span className="font-semibold"
                          style={{ color: pct >= 100 ? '#10b981' : pct > 0 ? accent : '#8892b0' }}>
                      {pct}%
                    </span>
                  </div>
                  <ProgressBar value={pct} color={pct >= 100 ? '#10b981' : accent} />
                </div>

                {/* Dates */}
                {(c.startdate || c.enddate) && (
                  <div className="mt-3 flex gap-4 text-[10px]" style={muted}>
                    {c.startdate && <span>Start: {fmtDate(c.startdate)}</span>}
                    {c.enddate   && <span>End: {fmtDate(c.enddate)}</span>}
                  </div>
                )}

                {/* Grades preview */}
                {Array.isArray(c.grades?.usergrades?.[0]?.gradeitems) &&
                  c.grades.usergrades[0].gradeitems.length > 0 && (
                    <div className="mt-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <p className="text-[10px] font-semibold uppercase tracking-wide mb-2" style={muted}>
                        Recent Grades
                      </p>
                      {c.grades.usergrades[0].gradeitems.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex justify-between text-xs py-1"
                             style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <span className="truncate" style={muted}>{item.itemname || 'Item'}</span>
                          <span className="ml-2 shrink-0 font-bold" style={{ color: accent }}>
                            {item.percentageformatted ?? item.gradeformatted ?? '–'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Assignment card (module-level so reference is stable across renders) ─────
function AssignCard({ a, now }) {
  const days   = daysUntil(a.duedate);
  const isLate = a.duedate && a.duedate < now;

  const badge = !a.duedate
    ? { text: 'No due date',      bg: 'rgba(255,255,255,0.06)', color: '#8892b0' }
    : isLate
    ? { text: 'Overdue',          bg: 'rgba(239,68,68,0.15)',   color: '#ef4444' }
    : days <= 2
    ? { text: `${days}d left`,    bg: 'rgba(245,158,11,0.15)',  color: '#f59e0b' }
    : { text: `${days}d left`,    bg: 'rgba(16,185,129,0.12)',  color: '#10b981' };

  return (
    <div className="rounded-2xl p-5 transition-all duration-200"
         style={card}
         onMouseEnter={(e) => e.currentTarget.style.borderColor = `${accent}55`}
         onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white leading-snug">{a.name}</p>
          <p className="mt-0.5 text-xs" style={muted}>{a.coursename}</p>
          {a.duedate && (
            <p className="mt-1.5 text-xs" style={muted}>
              Due: <span className="text-white">{fmtDateTime(a.duedate)}</span>
            </p>
          )}
        </div>
        <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold"
              style={{ background: badge.bg, color: badge.color }}>
          {badge.text}
        </span>
      </div>
    </div>
  );
}

// ─── Tab: Assignments ─────────────────────────────────────────────────────────
function TabAssignments({ assignments }) {
  const now = Math.floor(Date.now() / 1000);

  const sorted = [...assignments].sort((a, b) => {
    if (!a.duedate && !b.duedate) return 0;
    if (!a.duedate) return 1;
    if (!b.duedate) return -1;
    return a.duedate - b.duedate;
  });

  const overdue  = sorted.filter((a) => a.duedate && a.duedate < now);
  const upcoming = sorted.filter((a) => !a.duedate || a.duedate >= now);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-base font-bold text-white">Assignments</h2>

      {assignments.length === 0 && (
        <div className="rounded-2xl p-10 text-center" style={card}>
          <p className="text-3xl mb-2">✅</p>
          <p className="font-medium text-white">No assignments found.</p>
        </div>
      )}

      {overdue.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide"
             style={{ color: '#ef4444' }}>
            Overdue ({overdue.length})
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {overdue.map((a) => <AssignCard key={a.id} a={a} now={now} />)}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={muted}>
            Upcoming ({upcoming.length})
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {upcoming.map((a) => <AssignCard key={a.id} a={a} now={now} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Settings ────────────────────────────────────────────────────────────
function TabSettings({ student, onLogout }) {
  const rows = [
    { label: 'Full Name',  value: student?.fullname  ?? '—' },
    { label: 'Username',   value: student?.username  ?? '—' },
    { label: 'Email',      value: student?.email     ?? '—' },
    { label: 'User ID',    value: student?.id        ?? '—' },
  ];

  return (
    <div className="p-6 max-w-lg space-y-6">
      <h2 className="text-base font-bold text-white">Account Settings</h2>

      {/* Profile card */}
      <div className="rounded-2xl p-6" style={card}>
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white"
               style={{ background: accent }}>
            {student?.firstname?.[0]?.toUpperCase() ?? 'S'}
          </div>
          <div>
            <p className="font-bold text-white">{student?.fullname ?? 'Student'}</p>
            <p className="text-xs" style={muted}>Student Account</p>
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3">
              <span className="text-sm" style={muted}>{label}</span>
              <span className="text-sm font-medium text-white">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Session */}
      <div className="rounded-2xl p-5" style={card}>
        <h3 className="mb-3 text-sm font-bold text-white">Session</h3>
        <p className="mb-4 text-sm" style={muted}>
          You are securely signed in. Your session is stored locally and does not require
          re-login on page refresh.
        </p>
        <button onClick={onLogout}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.35)', color: '#fca5a5' }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── Inline SVG icons (no external deps) ─────────────────────────────────────
function IcoDashboard({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function IcoCourses({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
function IcoAssignments({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function IcoSettings({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function IcoLogout({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function IcoChart({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
function IcoMenu({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

// ─── Top header bar ───────────────────────────────────────────────────────────
function TopBar({ student, activeTab, refreshing, onRefresh }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
         style={{ background: '#112240', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div>
        <h1 className="text-base font-bold text-white">{TAB_TITLES[activeTab]}</h1>
        <p className="text-xs" style={muted}>Aalgorix Academy · {TODAY_STRING}</p>
      </div>
      <div className="flex items-center gap-3 rounded-xl px-3 py-2"
           style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
             style={{ background: accent }}>
          {student?.firstname?.[0]?.toUpperCase() ?? 'S'}
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-semibold text-white">
            {student?.firstname ?? 'Student'} {student?.lastname ?? ''}
          </p>
          <p className="text-[10px]" style={muted}>{student?.username ?? ''}</p>
        </div>
        <button onClick={onRefresh} disabled={refreshing} title="Refresh"
                className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg transition-opacity hover:opacity-70 disabled:opacity-40"
                style={{ background: 'rgba(255,255,255,0.06)' }}>
          <svg className={`h-3.5 w-3.5 text-white ${refreshing ? 'animate-spin' : ''}`}
               viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0114.36-3.36L23 10M1 14l5.13 4.36A9 9 0 0020.49 15" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const router = useRouter();

  const [session,    setSession]    = useState(null);
  const [data,       setData]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [fetchKey,   setFetchKey]   = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab,  setActiveTab]  = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace('/login');
    } else {
      setSession(s);
    }
  }, [router]);

  // ── Data fetch ─────────────────────────────────────────────────────────────
  const loadData = useCallback((s, isRefresh = false) => {
    if (!s) return () => {};

    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError(null);

    const controller = new AbortController();

    fetch(`${DASHBOARD_API}?userId=${s.userId}`, {
      signal:  controller.signal,
      headers: { Authorization: `Bearer ${s.token}` },
    })
      .then((res) => { if (!res.ok) throw new Error(`Server ${res.status}`); return res.json(); })
      .then((json) => {
        if (!json.success) throw new Error(json.message || 'API error');
        if (!json.data)    throw new Error('Backend returned no data — check Moodle connection.');
        setData(json.data);
      })
      .catch((err) => { if (err.name !== 'AbortError') setError(err.message); })
      .finally(() => { setLoading(false); setRefreshing(false); });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!session) return;
    const cleanup = loadData(session, fetchKey > 0);
    return cleanup;
  }, [session, loadData, fetchKey]);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    clearSession();
    router.replace('/login');
  };

  // ── Guards ─────────────────────────────────────────────────────────────────
  if (!session || loading) return <Spinner label="Loading your campus…" />;
  if (error)  return <ErrorBanner message={error} onRetry={() => setFetchKey((k) => k + 1)} />;
  if (!data)  return <ErrorBanner message="No data received. Is the backend running?" onRetry={() => setFetchKey((k) => k + 1)} />;

  const { student, enrolledCourses = [], assignments = [] } = data;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: pageBg, minHeight: '100vh' }}>

      {/* Mobile header */}
      <MobileHeader onMenu={() => setMobileOpen(true)} />

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden"
             style={{ background: 'rgba(0,0,0,0.6)' }}
             onClick={() => setMobileOpen(false)}>
          <div className="h-full" style={{ width: 240 }} onClick={(e) => e.stopPropagation()}>
            <Sidebar student={student} activeTab={activeTab}
                     onTab={(t) => { setActiveTab(t); setMobileOpen(false); }}
                     onLogout={handleLogout} />
          </div>
        </div>
      )}

      <div className="flex" style={{ minHeight: 'calc(100vh - 56px)' }}>

        {/* Desktop sidebar */}
        <div className="sticky top-0 hidden h-screen shrink-0 lg:block" style={{ width: 240 }}>
          <Sidebar student={student} activeTab={activeTab}
                   onTab={setActiveTab} onLogout={handleLogout} />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-x-hidden flex flex-col">
          <TopBar student={student} activeTab={activeTab}
                  refreshing={refreshing}
                  onRefresh={() => setFetchKey((k) => k + 1)} />

          <div className="flex-1 overflow-y-auto">
            {activeTab === 'dashboard'   && <TabDashboard   data={data} />}
            {activeTab === 'courses'     && <TabCourses     courses={enrolledCourses} />}
            {activeTab === 'assignments' && <TabAssignments assignments={assignments} />}
            {activeTab === 'settings'    && <TabSettings    student={student} onLogout={handleLogout} />}
          </div>
        </div>
      </div>
    </div>
  );
}
