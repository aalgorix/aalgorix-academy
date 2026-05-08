/**
 * lib/api.ts — Client-side session utilities and API types.
 * Safe to import in client components and server components alike.
 */

export const SESSION_KEY = 'aalgorix_session';

// ─── Session type ─────────────────────────────────────────────────────────────

export interface Session {
  token:     string;
  userId:    number;
  username:  string;
  firstname: string;
  lastname:  string;
  fullname:  string;
  role:      'student' | 'teacher' | 'admin';
  timestamp: number;
}

// ─── Session helpers ──────────────────────────────────────────────────────────

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Session;
    // Reject legacy / placeholder tokens
    if (!s?.token || s.token === 'aalgorix-local-auth') return null;
    return s;
  } catch {
    return null;
  }
}

export function saveSession(data: Omit<Session, 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ...data, timestamp: Date.now() }));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Sign out: clears localStorage + calls DELETE /api/login to expire cookies.
 * Then redirects to /login.
 */
export async function logout(router: { replace: (path: string) => void }): Promise<void> {
  try { await fetch('/api/login', { method: 'DELETE' }); } catch {}
  clearSession();
  router.replace('/login');
}

// ─── Moodle data types ────────────────────────────────────────────────────────

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
  nosubmissions: number;
  courseid:     number;
  coursename:   string;
  intro:        string;
}

export interface CalendarEvent {
  id:           number;
  name:         string;
  timestart:    number;
  timeduration: number;
  description:  string;
  eventtype:    string;
  courseid:     number;
}

export interface GradeItem {
  itemname:            string | null;
  gradeformatted:      string;
  percentageformatted: string;
}

export interface StudentProfile {
  id:              number;
  username:        string;
  firstname:       string;
  lastname:        string;
  fullname:        string;
  email:           string;
  profileimageurl: string | null;
}

// ─── Dashboard response types ─────────────────────────────────────────────────

export interface StudentDashboardData {
  student:        StudentProfile;
  enrolledCourses: Course[];
  assignments:    Assignment[];
  upcomingEvents: CalendarEvent[];
  primaryCourse:  (Course & { gradeItems: GradeItem[] }) | null;
  stats: {
    totalCourses:       number;
    completedCourses:   number;
    inProgressCourses:  number;
    avgProgress:        number;
    pendingAssignments: number;
  };
}

export interface TeacherCourse extends Omit<Course, 'grades' | 'progress'> {
  students: StudentProfile[];
  assignments: {
    id:            number;
    name:          string;
    duedate:       number;
    submittedCount: number;
    pendingCount:  number;
    totalStudents: number;
  }[];
}

export interface TeacherDashboardData {
  teacher: StudentProfile;
  courses: TeacherCourse[];
  stats: {
    totalStudents:    number;
    totalCourses:     number;
    totalAssignments: number;
    pendingGrading:   number;
  };
  recentSubmissions: {
    id:             number;
    studentId:      number;
    studentName:    string;
    assignmentId:   number;
    assignmentName: string;
    courseName:     string;
    timeModified:   number;
    status:         string;
    gradingStatus:  string;
  }[];
}
