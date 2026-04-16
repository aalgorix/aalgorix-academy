/**
 * app/teacher/page.js — Server component wrapper.
 * Metadata lives here; all hooks and client logic live in TeacherDashboard.jsx.
 */

import { Suspense } from 'react';
import TeacherDashboard from './TeacherDashboard';

export const metadata = {
  title: 'Teacher Portal | Aalgorix Academy',
  description: 'Manage your courses, students, and assignments.',
};

export default function TeacherPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
            <p className="text-sm font-medium">Loading Teacher Portal…</p>
          </div>
        </div>
      }
    >
      <TeacherDashboard />
    </Suspense>
  );
}
