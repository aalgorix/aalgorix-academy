/**
 * lib/moodle.ts — Server-side Moodle REST API helper.
 * Import ONLY in API route files (Node.js runtime). Never in client components.
 */

const MOODLE_URL =
  process.env.MOODLE_URL ?? 'https://aalgorixacademy.moodlecloud.com';

type Params = Record<string, string | number | boolean>;

// ─── Core caller ─────────────────────────────────────────────────────────────

export async function moodleCall(
  wsfunction: string,
  params: Params = {},
  token: string
): Promise<any> {
  const url = new URL(`${MOODLE_URL}/webservice/rest/server.php`);
  url.searchParams.set('wstoken', token);
  url.searchParams.set('wsfunction', wsfunction);
  url.searchParams.set('moodlewsrestformat', 'json');
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }

  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error(`Moodle HTTP ${res.status} for ${wsfunction}`);

  const data = await res.json();
  if (data?.exception) {
    const err = new Error(data.message ?? `Moodle error: ${wsfunction}`);
    (err as any).errorcode = data.errorcode;
    throw err;
  }
  return data;
}

/** Same as moodleCall but returns null instead of throwing. */
export async function moodleCallSafe(
  wsfunction: string,
  params: Params = {},
  token: string
): Promise<any> {
  try {
    return await moodleCall(wsfunction, params, token);
  } catch {
    return null;
  }
}

// ─── Env helpers ──────────────────────────────────────────────────────────────

/** Returns the server-side admin token. Throws if unset (misconfiguration). */
export function getAdminToken(): string {
  const t = process.env.MOODLE_TOKEN ?? '';
  if (!t) throw new Error('MOODLE_TOKEN is not configured on the server.');
  return t;
}

/** Returns admin token or empty string (safe variant — caller decides). */
export function tryAdminToken(): string {
  return process.env.MOODLE_TOKEN ?? '';
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export function stripHtml(html: string): string {
  return (html ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Validate that `token` really belongs to `expectedUserId` by calling
 * core_webservice_get_site_info. Returns siteInfo on success, throws on mismatch.
 */
export async function validateUserToken(
  token: string,
  expectedUserId: number | string
): Promise<any> {
  const info = await moodleCall('core_webservice_get_site_info', {}, token);
  if (String(info.userid) !== String(expectedUserId)) {
    throw new Error('Token does not belong to the requested userId.');
  }
  return info;
}

/**
 * Detect user role.
 * Returns 'admin' | 'teacher' | 'student'.
 * Requires MOODLE_TOKEN to be set; falls back to 'student' if not.
 */
export async function detectRole(
  userId: number,
  userToken: string,
  siteInfo: any
): Promise<'admin' | 'teacher' | 'student'> {
  if (siteInfo?.userissiteadmin) return 'admin';

  const adminToken = tryAdminToken();
  if (!adminToken) return 'student';

  try {
    // Get first enrolled course for this user
    const courses = await moodleCallSafe(
      'core_enrol_get_users_courses',
      { userid: userId },
      adminToken
    );
    if (!Array.isArray(courses) || courses.length === 0) return 'student';

    // Check if user appears as a teacher in that course
    const enrolledUsers = await moodleCallSafe(
      'core_course_get_enrolled_users',
      {
        courseid: courses[0].id,
        'options[0][name]': 'withcapability',
        'options[0][value]': 'moodle/course:update',
        'options[1][name]': 'userfields',
        'options[1][value]': 'id',
      },
      adminToken
    );

    const isTeacher = Array.isArray(enrolledUsers) &&
      enrolledUsers.some((u: any) => String(u.id) === String(userId));

    return isTeacher ? 'teacher' : 'student';
  } catch {
    return 'student';
  }
}
