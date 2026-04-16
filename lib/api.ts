/**
 * lib/api.ts — centralised API client for all backend calls.
 *
 * Session shape stored in localStorage under SESSION_KEY:
 * {
 *   token:     string   // Moodle session token
 *   userId:    number
 *   username:  string
 *   firstname: string
 *   lastname:  string
 *   fullname:  string
 *   timestamp: number
 * }
 */

export const SESSION_KEY = 'aalgorix_session';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3000';

// ─── Session helpers ──────────────────────────────────────────────────────────

export interface Session {
  token:     string;
  userId:    number;
  username:  string;
  firstname: string;
  lastname:  string;
  fullname:  string;
  timestamp: number;
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Session;
    if (!s?.token || s.token === 'aalgorix-local-auth') return null;
    return s;
  } catch {
    return null;
  }
}

export function saveSession(data: Omit<Session, 'timestamp'>): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ...data, timestamp: Date.now() }));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardData {
  student: {
    id:              number;
    username:        string;
    firstname:       string;
    lastname:        string;
    fullname:        string;
    email:           string;
    profileimageurl: string | null;
  };
  enrolledCourses: Course[];
  assignments:     Assignment[];
  upcomingEvents:  CalendarEvent[];
  primaryCourse:   (Course & { gradeItems: GradeItem[] }) | null;
  stats: {
    totalCourses:      number;
    completedCourses:  number;
    inProgressCourses: number;
    avgProgress:       number;
    pendingAssignments: number;
  };
}

export interface Course {
  id:          number;
  fullname:    string;
  shortname:   string;
  summary:     string;
  progress:    number | null;
  startdate:   number | null;
  enddate:     number | null;
  courseimage: string | null;
  grades:      unknown;
}

export interface Assignment {
  id:           number;
  name:         string;
  duedate:      number;
  allowsubmissionsfromdate: number;
  courseid:     number;
  coursename:   string;
  intro:        string;
  nosubmissions: number;
}

export interface CalendarEvent {
  id:          number;
  name:        string;
  timestart:   number;
  timeduration: number;
  description: string;
  eventtype:   string;
  courseid:    number;
}

export interface GradeItem {
  itemname:             string | null;
  gradeformatted:       string;
  percentageformatted:  string;
}

/**
 * GET /api/v1/student-dashboard-summary
 * Requires a valid JWT in session. Falls back to ?userId= if no token.
 */
export async function getDashboardSummary(userId: number, token?: string): Promise<DashboardData> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(
    `${BACKEND_URL}/api/v1/student-dashboard-summary?userId=${userId}`,
    { headers }
  );

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message ?? 'Failed to load dashboard data.');
  }

  return json.data as DashboardData;
}
