'use client';

/**
 * TeacherDashboard — Aalgorix World Academy Teacher Portal
 *
 * Light-theme professional admin UI.
 * Tabs: Overview · Courses · Students · Submissions · Settings
 *
 * Data source: GET /api/teacher/dashboard?userId=X
 * Auth:        Authorization: Bearer <moodleToken> (stored in localStorage)
 */

import { useEffect, useState, useCallback } from 'react';
import { useRouter }                        from 'next/navigation';
import {
  LayoutDashboard, BookOpen, Users, ClipboardList,
  Settings, LogOut, Menu, RefreshCw, Bell,
  ChevronRight, Clock, CheckCircle2, AlertCircle,
  TrendingUp, GraduationCap, FileText, UserCheck,
  X, ChevronDown, Search, Award, BarChart3,
} from 'lucide-react';
import { getSession, clearSession } from '@/lib/api';

// ─── Config ───────────────────────────────────────────────────────────────────

const TEACHER_API = '/api/teacher/dashboard';

// ─── Style tokens ─────────────────────────────────────────────────────────────

const pageBg   = '#f8fafc';
const sidebarBg = '#0f172a';
const accent   = '#3b82f6';

const card = {
  background:   '#ffffff',
  borderRadius: 16,
  border:       '1px solid #e2e8f0',
  boxShadow:    '0 1px 3px rgba(0,0,0,0.06)',
};

const TODAY_STRING = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', day: 'numeric', month: 'short',
});

const TAB_LABELS = {
  overview:    'Overview',
  courses:     'Courses',
  students:    'Students',
  submissions: 'Submissions',
  settings:    'Settings',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(unix) {
  if (!unix) return '—';
  return new Date(unix * 1000).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function timeAgo(unix) {
  if (!unix) return '—';
  const diff = Date.now() - unix * 1000;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs  < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function getInitials(name = '') {
  return name.trim().split(/\s+/).map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'overview',    icon: LayoutDashboard, label: 'Overview'    },
  { id: 'courses',     icon: BookOpen,        label: 'Courses'     },
  { id: 'students',    icon: Users,           label: 'Students'    },
  { id: 'submissions', icon: ClipboardList,   label: 'Submissions' },
  { id: 'settings',    icon: Settings,        label: 'Settings'    },
];

function TeacherSidebar({ teacher, activeTab, onTab, onLogout, pendingGrading }) {
  return (
    <aside
      className="flex h-full flex-col justify-between"
      style={{ background: sidebarBg, width: 240, borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
          >
            A
          </div>
          <div>
            <p className="text-sm font-bold leading-tight text-white">Aalgorix</p>
            <p className="text-[10px] font-medium text-slate-500">Teacher Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="mt-3 flex flex-col gap-0.5 px-2">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onTab(id)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-left transition-all duration-150"
                style={active
                  ? { background: `${accent}18`, color: accent }
                  : { color: '#64748b' }
                }
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#cbd5e1'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#64748b'; }}
              >
                <Icon size={17} className="shrink-0" />
                <span className="flex-1">{label}</span>
                {id === 'submissions' && pendingGrading > 0 && (
                  <span
                    className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white"
                    style={{ background: '#f59e0b' }}
                  >
                    {pendingGrading}
                  </span>
                )}
                {active && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User + Logout */}
      <div className="px-2 pb-4">
        <div className="mb-2 rounded-xl p-3 border border-white/5" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
            >
              {getInitials(teacher?.fullname ?? 'T')}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">
                {teacher?.firstname ?? 'Teacher'} {teacher?.lastname ?? ''}
              </p>
              <p className="text-[10px] text-slate-500">Instructor</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={16} className="shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}

// ─── Top Bar ─────────────────────────────────────────────────────────────────

function TopBar({ teacher, activeTab, onRefresh, refreshing, pendingGrading }) {
  return (
    <div
      className="sticky top-0 z-10 flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-white shadow-sm"
    >
      <div>
        <h1 className="text-base font-bold text-slate-900">{TAB_LABELS[activeTab]}</h1>
        <p className="text-[11px] text-slate-400">{TODAY_STRING}</p>
      </div>

      <div className="flex items-center gap-3">
        {pendingGrading > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: '#fef3c7', color: '#92400e' }}>
            <AlertCircle size={12} />
            {pendingGrading} pending
          </div>
        )}

        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          <Bell size={16} />
          {pendingGrading > 0 && (
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
          )}
        </button>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
          >
            {getInitials(teacher?.fullname ?? 'T')}
          </div>
          <span className="hidden sm:block text-sm font-semibold text-slate-700">
            {teacher?.firstname ?? 'Teacher'}
          </span>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="ml-1 text-slate-400 hover:text-slate-600 disabled:opacity-40 transition-opacity"
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3" style={{ background: pageBg }}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      <p className="text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}

function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center" style={{ background: pageBg }}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full text-2xl"
           style={{ background: 'rgba(239,68,68,0.1)' }}>⚠️</div>
      <h2 className="text-lg font-bold text-slate-800">Failed to load portal</h2>
      <p className="max-w-sm text-sm text-slate-500">{message}</p>
      <button
        onClick={onRetry}
        className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        style={{ background: accent }}
      >
        Retry
      </button>
    </div>
  );
}

function ProgressBar({ value = 0, colorClass = 'bg-blue-500' }) {
  const pct = Math.min(Math.max(Number(value) || 0, 0), 100);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full transition-all duration-700 ${colorClass}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Avatar({ name, size = 8 }) {
  const bg = [
    'from-blue-500 to-indigo-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-pink-500 to-rose-500',
    'from-purple-500 to-violet-500',
  ];
  const idx = (name?.charCodeAt(0) ?? 0) % bg.length;
  return (
    <div
      className={`flex h-${size} w-${size} shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${bg[idx]} text-xs font-bold text-white`}
    >
      {getInitials(name)}
    </div>
  );
}

// ─── Tab: Overview ────────────────────────────────────────────────────────────

function TabOverview({ data, onTabChange }) {
  const { teacher, stats, recentSubmissions = [], courses = [] } = data;

  const STAT_CARDS = [
    {
      label: 'Total Students', value: stats.totalStudents, icon: Users,
      gradient: 'linear-gradient(135deg,#dbeafe,#eff6ff)',
      iconBg: '#2563eb', sublabel: `across ${stats.totalCourses} courses`,
    },
    {
      label: 'Active Courses', value: stats.totalCourses, icon: BookOpen,
      gradient: 'linear-gradient(135deg,#ede9fe,#f5f3ff)',
      iconBg: '#7c3aed', sublabel: 'you currently teach',
    },
    {
      label: 'Needs Grading', value: stats.pendingGrading, icon: ClipboardList,
      gradient: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
      iconBg: '#d97706', sublabel: stats.pendingGrading > 0 ? 'action required' : 'all caught up',
    },
    {
      label: 'Total Assignments', value: stats.totalAssignments, icon: FileText,
      gradient: 'linear-gradient(135deg,#d1fae5,#ecfdf5)',
      iconBg: '#059669', sublabel: 'across all courses',
    },
  ];

  const gradeingRate = stats.totalStudents > 0
    ? Math.round(((stats.totalStudents - stats.pendingGrading) / stats.totalStudents) * 100)
    : 100;

  return (
    <div className="p-6 space-y-6">

      {/* Welcome banner */}
      <div
        className="rounded-2xl px-6 py-5 text-white"
        style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)' }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-bold">
              Welcome back, {teacher?.firstname ?? 'Teacher'}! 👋
            </p>
            <p className="mt-1 text-sm text-blue-100">
              You have{' '}
              <span className="font-bold text-white">{stats.pendingGrading}</span> submission{stats.pendingGrading !== 1 ? 's' : ''} waiting to be graded
              · <span className="font-bold text-white">{stats.totalStudents}</span> active students
            </p>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
            <GraduationCap size={18} className="text-blue-100" />
            <div>
              <p className="text-xs text-blue-100 font-medium">Grading rate</p>
              <p className="text-lg font-bold">{gradeingRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {STAT_CARDS.map(({ label, value, icon: Icon, gradient, iconBg, sublabel }) => (
          <div key={label} style={card} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: gradient }}
              >
                <Icon size={20} color={iconBg} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">{label}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{sublabel}</p>
          </div>
        ))}
      </div>

      {/* Two-column: recent submissions + course health */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Recent submissions */}
        <div className="xl:col-span-2" style={card}>
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-bold text-slate-800">Recent Submissions</h2>
            <button
              type="button"
              onClick={() => onTabChange('submissions')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View all
            </button>
          </div>

          {recentSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 size={32} className="text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-500">No submissions yet</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-50">
              {recentSubmissions.slice(0, 8).map((s, i) => (
                <li key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
                  <Avatar name={s.studentName} size={8} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-800 truncate">{s.studentName}</p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {s.assignmentName} · {s.courseName}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={
                        s.gradingStatus === 'graded'
                          ? { background: '#d1fae5', color: '#065f46' }
                          : { background: '#fef3c7', color: '#92400e' }
                      }
                    >
                      {s.gradingStatus === 'graded' ? 'Graded' : 'Needs grading'}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock size={9} />
                      {timeAgo(s.timeModified)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Course health */}
        <div style={card}>
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-bold text-slate-800">Course Health</h2>
            <BarChart3 size={14} className="text-slate-400" />
          </div>
          <div className="p-5 space-y-4">
            {courses.length === 0 ? (
              <p className="text-sm text-slate-400">No courses found.</p>
            ) : (
              courses.map((c) => {
                const total  = c.assignments.length;
                const graded = c.assignments.reduce((acc, a) => acc + (a.submittedCount - a.pendingCount), 0);
                const pct    = total > 0 ? Math.round((graded / Math.max(total * c.students.length, 1)) * 100) : 0;
                return (
                  <div key={c.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-700 truncate mr-2">{c.shortname || c.fullname}</span>
                      <span className="shrink-0 font-bold" style={{ color: pct > 60 ? '#059669' : pct > 30 ? '#d97706' : '#dc2626' }}>
                        {c.students.length} students
                      </span>
                    </div>
                    <ProgressBar
                      value={Math.min(pct, 100)}
                      colorClass={pct > 60 ? 'bg-emerald-500' : pct > 30 ? 'bg-amber-500' : 'bg-blue-500'}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Courses ─────────────────────────────────────────────────────────────

function TabCourses({ courses, onViewStudents }) {
  return (
    <div className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Your Courses</h2>
        <span className="rounded-full px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700">
          {courses.length} active
        </span>
      </div>

      {courses.length === 0 ? (
        <div style={card} className="p-10 text-center">
          <BookOpen size={40} className="mx-auto mb-3 text-slate-300" />
          <p className="font-medium text-slate-600">No courses found</p>
          <p className="text-sm text-slate-400 mt-1">You are not enrolled as a teacher in any course.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((c) => {
            const submitted = c.assignments.reduce((a, b) => a + b.submittedCount, 0);
            const pending   = c.assignments.reduce((a, b) => a + b.pendingCount, 0);
            return (
              <div
                key={c.id}
                style={card}
                className="p-5 flex flex-col hover:shadow-md transition-shadow group"
              >
                {/* Header */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 leading-snug">{c.fullname}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.shortname}</p>
                    {c.summary && (
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">{c.summary}</p>
                    )}
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1">
                    <Users size={11} className="text-blue-400" />
                    {c.students.length} students
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText size={11} className="text-indigo-400" />
                    {c.assignments.length} assignments
                  </span>
                  {pending > 0 && (
                    <span className="flex items-center gap-1 ml-auto font-semibold text-amber-600">
                      <AlertCircle size={11} />
                      {pending} pending
                    </span>
                  )}
                </div>

                {/* Submission progress */}
                {c.assignments.length > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span>Submissions graded</span>
                      <span>{submitted - pending} / {submitted}</span>
                    </div>
                    <ProgressBar
                      value={submitted > 0 ? ((submitted - pending) / submitted) * 100 : 0}
                      colorClass="bg-emerald-500"
                    />
                  </div>
                )}

                {/* Dates */}
                {c.startdate && (
                  <p className="mt-3 text-[10px] text-slate-400">
                    {fmtDate(c.startdate)} → {c.enddate ? fmtDate(c.enddate) : 'Ongoing'}
                  </p>
                )}

                {/* Action */}
                <button
                  type="button"
                  onClick={() => onViewStudents(c.id)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  <Users size={13} />
                  View Students
                  <ChevronRight size={13} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Tab: Students ────────────────────────────────────────────────────────────

function TabStudents({ courses, initialCourseId }) {
  const [selectedId, setSelectedId] = useState(
    initialCourseId ?? (courses[0]?.id ?? null)
  );
  const [search, setSearch] = useState('');

  const selectedCourse = courses.find((c) => c.id === selectedId) ?? courses[0] ?? null;

  const students = selectedCourse?.students ?? [];
  const filtered = students.filter((s) =>
    !search || s.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Controls */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-bold text-slate-800">Students</h2>
        <div className="flex flex-wrap items-center gap-2">

          {/* Search */}
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search students…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      {/* Course tabs */}
      {courses.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {courses.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedId(c.id)}
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all"
              style={
                selectedId === c.id
                  ? { background: accent, color: '#fff' }
                  : { background: '#f1f5f9', color: '#475569' }
              }
            >
              {c.shortname || c.fullname}
              <span className="ml-1.5 opacity-70">({c.students.length})</span>
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      {!selectedCourse ? (
        <div style={card} className="p-10 text-center">
          <Users size={40} className="mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500">No courses to show students for.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={card} className="p-10 text-center">
          <UserCheck size={40} className="mx-auto mb-3 text-slate-300" />
          <p className="font-medium text-slate-600">No students found</p>
          {search && <p className="text-sm text-slate-400 mt-1">Try a different search term.</p>}
        </div>
      ) : (
        <div style={card} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-slate-400">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.fullname} size={8} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800">{s.fullname}</p>
                          <p className="text-xs text-slate-400 sm:hidden">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 hidden sm:table-cell">{s.email || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-400 hidden md:table-cell">
                      {s.lastaccess ? timeAgo(s.lastaccess) : 'Never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
            <p className="text-[11px] text-slate-400">
              Showing {filtered.length} of {students.length} students in <span className="font-medium text-slate-600">{selectedCourse.fullname}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Submissions ─────────────────────────────────────────────────────────

function TabSubmissions({ recentSubmissions = [], courses = [] }) {
  const [filter, setFilter]     = useState('all'); // all | needs_grading | graded
  const [courseFilter, setCF]   = useState('all');

  const courseNames = [...new Set(recentSubmissions.map((s) => s.courseName))];

  const visible = recentSubmissions.filter((s) => {
    const matchCourse = courseFilter === 'all' || s.courseName === courseFilter;
    const matchStatus =
      filter === 'all'          ? true :
      filter === 'needs_grading' ? s.gradingStatus !== 'graded' :
      s.gradingStatus === 'graded';
    return matchCourse && matchStatus;
  });

  const counts = {
    all:           recentSubmissions.length,
    needs_grading: recentSubmissions.filter((s) => s.gradingStatus !== 'graded').length,
    graded:        recentSubmissions.filter((s) => s.gradingStatus === 'graded').length,
  };

  const FILTERS = [
    { key: 'all',          label: 'All',           count: counts.all           },
    { key: 'needs_grading', label: 'Needs Grading', count: counts.needs_grading },
    { key: 'graded',       label: 'Graded',         count: counts.graded        },
  ];

  // Assignment-level summary from courses data
  const assignmentSummaries = courses.flatMap((c) =>
    c.assignments.map((a) => ({
      ...a,
      courseName: c.fullname,
      courseShortname: c.shortname,
    }))
  ).filter((a) => a.submittedCount > 0 || a.pendingCount > 0);

  return (
    <div className="p-6 space-y-5">

      {/* Assignment completion overview */}
      {assignmentSummaries.length > 0 && (
        <div style={card}>
          <div className="border-b border-slate-100 px-5 py-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Assignment Overview</h2>
            <span className="text-xs text-slate-400">{assignmentSummaries.length} assignments</span>
          </div>
          <div className="divide-y divide-slate-50">
            {assignmentSummaries.slice(0, 8).map((a) => (
              <div key={a.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <FileText size={14} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-semibold text-slate-800 truncate mr-2">{a.name}</p>
                    <span className="shrink-0 text-[10px] text-slate-400">{a.courseShortname}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="text-emerald-600 font-medium">{a.submittedCount - a.pendingCount} graded</span>
                    {a.pendingCount > 0 && (
                      <span className="text-amber-600 font-medium">{a.pendingCount} pending</span>
                    )}
                    <span>{a.totalStudents} enrolled</span>
                  </div>
                </div>
                {a.duedate > 0 && (
                  <span className="shrink-0 text-[10px] text-slate-400">Due {fmtDate(a.duedate)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent submissions list */}
      <div style={card}>
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-5 py-3">
          {/* Status filter pills */}
          <div className="flex items-center gap-1.5">
            {FILTERS.map(({ key, label, count }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all"
                style={
                  filter === key
                    ? { background: accent, color: '#fff' }
                    : { background: '#f1f5f9', color: '#64748b' }
                }
              >
                {label}
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                  style={
                    filter === key
                      ? { background: 'rgba(255,255,255,0.25)', color: '#fff' }
                      : { background: '#e2e8f0', color: '#475569' }
                  }
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Course filter */}
          {courseNames.length > 1 && (
            <div className="ml-auto relative">
              <select
                value={courseFilter}
                onChange={(e) => setCF(e.target.value)}
                className="h-8 rounded-lg border border-slate-200 bg-white pl-3 pr-7 text-xs text-slate-600 outline-none focus:border-blue-400 appearance-none"
              >
                <option value="all">All courses</option>
                {courseNames.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <ChevronDown size={11} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          )}
        </div>

        {/* List */}
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 size={36} className="text-slate-300 mb-2" />
            <p className="font-medium text-slate-500">No submissions match this filter</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {visible.map((s, i) => (
              <li key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <Avatar name={s.studentName} size={9} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">{s.studentName}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {s.assignmentName}
                    <span className="mx-1.5 text-slate-300">·</span>
                    {s.courseName}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                    style={
                      s.gradingStatus === 'graded'
                        ? { background: '#d1fae5', color: '#065f46' }
                        : { background: '#fef3c7', color: '#92400e' }
                    }
                  >
                    {s.gradingStatus === 'graded' ? '✓ Graded' : '⏳ Needs grading'}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={9} />
                    {timeAgo(s.timeModified)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Tab: Settings ────────────────────────────────────────────────────────────

function TabSettings({ teacher, onLogout }) {
  const rows = [
    { label: 'Full Name',  value: teacher?.fullname  ?? '—' },
    { label: 'Username',   value: teacher?.username  ?? '—' },
    { label: 'Email',      value: teacher?.email     ?? '—' },
    { label: 'User ID',    value: teacher?.id        ?? '—' },
    { label: 'Role',       value: 'Instructor / Teacher'   },
  ];

  return (
    <div className="p-6 max-w-lg space-y-6">
      <h2 className="text-base font-bold text-slate-800">Account Settings</h2>

      {/* Profile card */}
      <div style={card} className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
          >
            {getInitials(teacher?.fullname ?? 'T')}
          </div>
          <div>
            <p className="text-base font-bold text-slate-900">{teacher?.fullname ?? 'Teacher'}</p>
            <p className="text-xs text-slate-400 mt-0.5">Instructor · Aalgorix World Academy</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
              <Award size={10} />
              Verified Educator
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3">
              <span className="text-sm text-slate-500">{label}</span>
              <span className="text-sm font-medium text-slate-800">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Session */}
      <div style={card} className="p-5">
        <h3 className="mb-2 text-sm font-bold text-slate-800">Session</h3>
        <p className="mb-4 text-sm text-slate-500">
          You are securely signed in as an instructor. Your session token is stored
          locally and validated server-side on each request.
        </p>
        <button
          onClick={onLogout}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TeacherDashboard() {
  const router = useRouter();

  const [session,       setSession]       = useState(null);
  const [data,          setData]          = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [refreshKey,    setRefreshKey]    = useState(0);
  const [refreshing,    setRefreshing]    = useState(false);
  const [activeTab,     setActiveTab]     = useState('overview');
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [viewStudentId, setViewStudentId] = useState(null); // course id for students tab

  // ── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const s = getSession();
    if (!s) { router.replace('/login'); return; }
    if (s.role === 'student') { router.replace('/student'); return; }
    setSession(s);
  }, [router]);

  // ── Data fetch ─────────────────────────────────────────────────────────────
  const loadData = useCallback((s, isRefresh = false) => {
    if (!s) return () => {};
    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError(null);

    const controller = new AbortController();

    fetch(`${TEACHER_API}?userId=${s.userId}`, {
      signal:  controller.signal,
      headers: { Authorization: `Bearer ${s.token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!json.success) throw new Error(json.message || 'API error');
        setData(json.data);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!session) return;
    const cleanup = loadData(session, refreshKey > 0);
    return cleanup;
  }, [session, loadData, refreshKey]);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    try { await fetch('/api/login', { method: 'DELETE' }); } catch {}
    clearSession();
    router.replace('/login');
  }, [router]);

  // ── Tab navigation with side-effects ──────────────────────────────────────
  function handleTab(id) {
    setActiveTab(id);
    setMobileOpen(false);
  }

  function handleViewStudents(courseId) {
    setViewStudentId(courseId);
    setActiveTab('students');
    setMobileOpen(false);
  }

  // ── Guards ─────────────────────────────────────────────────────────────────
  if (!session || loading) return <Spinner label="Loading Teacher Portal…" />;
  if (error)  return <ErrorBanner message={error} onRetry={() => setRefreshKey((k) => k + 1)} />;
  if (!data)  return <ErrorBanner message="No data received. Check backend." onRetry={() => setRefreshKey((k) => k + 1)} />;

  const { teacher, courses = [], stats, recentSubmissions = [] } = data;
  const pendingGrading = stats?.pendingGrading ?? 0;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: pageBg, minHeight: '100vh' }}>

      {/* Mobile top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 lg:hidden border-b border-slate-200 bg-white"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
          >
            A
          </div>
          <span className="text-sm font-bold text-slate-800">Teacher Portal</span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMobileOpen(false)}
        >
          <div className="h-full w-60 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <TeacherSidebar
              teacher={teacher}
              activeTab={activeTab}
              onTab={handleTab}
              onLogout={handleLogout}
              pendingGrading={pendingGrading}
            />
          </div>
          <button
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow"
            onClick={() => setMobileOpen(false)}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex" style={{ minHeight: 'calc(100vh - 56px)' }}>

        {/* Desktop sidebar */}
        <div className="sticky top-0 hidden h-screen shrink-0 lg:block" style={{ width: 240 }}>
          <TeacherSidebar
            teacher={teacher}
            activeTab={activeTab}
            onTab={handleTab}
            onLogout={handleLogout}
            pendingGrading={pendingGrading}
          />
        </div>

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar
            teacher={teacher}
            activeTab={activeTab}
            onRefresh={() => setRefreshKey((k) => k + 1)}
            refreshing={refreshing}
            pendingGrading={pendingGrading}
          />

          <div className="flex-1 overflow-y-auto">
            {activeTab === 'overview'    && (
              <TabOverview data={data} onTabChange={handleTab} />
            )}
            {activeTab === 'courses'     && (
              <TabCourses courses={courses} onViewStudents={handleViewStudents} />
            )}
            {activeTab === 'students'    && (
              <TabStudents courses={courses} initialCourseId={viewStudentId} />
            )}
            {activeTab === 'submissions' && (
              <TabSubmissions recentSubmissions={recentSubmissions} courses={courses} />
            )}
            {activeTab === 'settings'    && (
              <TabSettings teacher={teacher} onLogout={handleLogout} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
