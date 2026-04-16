/**
 * SERVER COMPONENT — do NOT add 'use client' here, ever.
 *
 * Rule: metadata + Suspense live here. Zero hooks allowed.
 * All hooks (useSearchParams, useState, useEffect) live in StudentDashboard.jsx.
 */

import { Suspense } from 'react';
import StudentDashboard from './StudentDashboard';

export const metadata = {
  title: 'Student Dashboard | Aalgorix Academy',
  description: 'View your enrolled courses, progress, and AI Mentor insights.',
};

export default function StudentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            <p className="text-sm font-medium">Loading your campus…</p>
          </div>
        </div>
      }
    >
      <StudentDashboard />
    </Suspense>
  );
}
