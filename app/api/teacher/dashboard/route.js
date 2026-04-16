/**
 * app/api/teacher/dashboard/route.js — Teacher dashboard data aggregator.
 *
 * Security:
 *   - Validates the user's token via core_webservice_get_site_info.
 *   - Confirms the token belongs to the requested userId (prevents IDOR).
 *   - Uses admin token server-side to fetch cross-user data (student lists,
 *     submissions). Admin token is NEVER sent to the browser.
 *
 * GET /api/teacher/dashboard?userId=<number>
 * Authorization: Bearer <moodleToken>
 *
 * Returns:
 *   teacher       — profile
 *   courses       — each course + its students + assignments + submission counts
 *   stats         — aggregate totals
 *   recentSubmissions — last 20 submissions across all courses
 */

import { NextResponse }                                    from 'next/server';
import { moodleCall, moodleCallSafe, stripHtml, getAdminToken } from '@/lib/moodle';

// ─── GET /api/teacher/dashboard ───────────────────────────────────────────────

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'userId is required.' },
      { status: 400 }
    );
  }

  const authHeader = request.headers.get('authorization') ?? '';
  const userToken  = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!userToken) {
    return NextResponse.json(
      { success: false, message: 'Missing Authorization header.' },
      { status: 401 }
    );
  }

  let adminToken;
  try {
    adminToken = getAdminToken();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server misconfiguration: MOODLE_TOKEN is not set.' },
      { status: 500 }
    );
  }

  try {
    // ── Validate token: confirm it belongs to the requested userId ─────────────
    const siteInfo = await moodleCall('core_webservice_get_site_info', {}, userToken);
    if (String(siteInfo.userid) !== String(userId)) {
      return NextResponse.json(
        { success: false, message: 'Token does not match the requested userId.' },
        { status: 403 }
      );
    }

    // ── Wave 1: teacher profile + courses in parallel ─────────────────────────
    const [profileResult, rawCourses] = await Promise.all([
      moodleCallSafe(
        'core_user_get_users_by_field',
        { field: 'id', 'values[0]': userId },
        adminToken
      ),
      moodleCall('core_enrol_get_users_courses', { userid: userId }, adminToken),
    ]);

    const profileRaw = Array.isArray(profileResult) ? profileResult[0] : null;
    const teacher = profileRaw ?? {
      id:              siteInfo.userid,
      username:        siteInfo.username,
      firstname:       siteInfo.fullname?.split(' ')[0] ?? '',
      lastname:        siteInfo.fullname?.split(' ').slice(1).join(' ') ?? '',
      fullname:        siteInfo.fullname ?? '',
      email:           siteInfo.useremail ?? '',
      profileimageurl: siteInfo.userpictureurl ?? null,
    };

    const courses = Array.isArray(rawCourses) ? rawCourses : [];

    if (courses.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          teacher,
          courses: [],
          stats: { totalStudents: 0, totalCourses: 0, totalAssignments: 0, pendingGrading: 0 },
          recentSubmissions: [],
        },
      });
    }

    // ── Wave 2: enrolled students + bulk assignments in parallel ──────────────
    const assignParams = {};
    courses.forEach((c, i) => { assignParams[`courseids[${i}]`] = c.id; });

    const [enrollmentResults, assignResult] = await Promise.all([
      // Fetch students for every course concurrently
      Promise.all(
        courses.map((c) =>
          moodleCallSafe(
            'core_course_get_enrolled_users',
            {
              courseid:              c.id,
              'options[0][name]':    'onlyactive',
              'options[0][value]':   1,
              'options[1][name]':    'userfields',
              'options[1][value]':   'id,firstname,lastname,fullname,email,lastaccess,profileimageurl',
            },
            adminToken
          )
        )
      ),
      moodleCallSafe('mod_assign_get_assignments', assignParams, adminToken),
    ]);

    // Build course → assignments map
    const assignByCourse = {};
    for (const ac of (assignResult?.courses ?? [])) {
      assignByCourse[ac.id] = ac.assignments ?? [];
    }

    // ── Wave 3: submissions for all assignments (one batched call) ─────────────
    const allAssignIds = Object.values(assignByCourse).flat().map((a) => a.id);
    let submissionMap = {}; // assignmentId → submissions[]

    if (allAssignIds.length > 0) {
      const subParams = {};
      allAssignIds.forEach((id, i) => { subParams[`assignmentids[${i}]`] = id; });

      const subResult = await moodleCallSafe(
        'mod_assign_get_submissions',
        subParams,
        adminToken
      );

      for (const as of (subResult?.assignments ?? [])) {
        submissionMap[as.assignmentid] = as.submissions ?? [];
      }
    }

    // ── Assemble rich course objects ──────────────────────────────────────────
    const TEACHER_ROLE_SHORTNAMES = ['editingteacher', 'teacher', 'manager', 'coursecreator'];
    const uniqueStudentIds = new Set();
    let totalAssignments = 0;
    let totalPendingGrading = 0;

    const richCourses = courses.map((c, idx) => {
      const allUsers    = Array.isArray(enrollmentResults[idx]) ? enrollmentResults[idx] : [];
      const students    = allUsers.filter((u) => {
        // Exclude teacher/manager roles; keep students
        const roles = u.roles ?? [];
        if (roles.length === 0) return String(u.id) !== String(userId); // exclude self
        return !roles.some((r) => TEACHER_ROLE_SHORTNAMES.includes(r.shortname));
      });

      students.forEach((s) => uniqueStudentIds.add(s.id));

      const assignments = (assignByCourse[c.id] ?? []).map((a) => {
        const subs       = submissionMap[a.id] ?? [];
        const submitted  = subs.filter((s) => s.status === 'submitted').length;
        const notGraded  = subs.filter(
          (s) => s.status === 'submitted' && s.gradingstatus === 'notgraded'
        ).length;

        totalPendingGrading += notGraded;

        return {
          id:           a.id,
          name:         a.name,
          duedate:      a.duedate ?? 0,
          intro:        stripHtml(a.intro ?? ''),
          submittedCount:  submitted,
          pendingCount:    notGraded,
          totalStudents:   students.length,
        };
      });

      totalAssignments += assignments.length;

      return {
        id:          c.id,
        fullname:    c.fullname,
        shortname:   c.shortname,
        summary:     stripHtml(c.summary ?? ''),
        startdate:   c.startdate   ?? null,
        enddate:     c.enddate     ?? null,
        courseimage: c.courseimage ?? null,
        students,
        assignments,
      };
    });

    // ── Recent submissions (last 20 across all courses) ───────────────────────
    const studentById = {};
    richCourses.forEach((rc) => {
      rc.students.forEach((s) => { studentById[s.id] = s; });
    });

    const assignNameMap = {};
    const assignCourseMap = {};
    richCourses.forEach((rc) => {
      rc.assignments.forEach((a) => {
        assignNameMap[a.id]   = a.name;
        assignCourseMap[a.id] = rc.fullname;
      });
    });

    const recentSubmissions = Object.entries(submissionMap)
      .flatMap(([assignId, subs]) =>
        subs
          .filter((s) => s.status === 'submitted')
          .map((s) => {
            const student = studentById[s.userid];
            return {
              id:             s.id,
              studentId:      s.userid,
              studentName:    student?.fullname ?? `User ${s.userid}`,
              assignmentId:   Number(assignId),
              assignmentName: assignNameMap[assignId] ?? 'Assignment',
              courseName:     assignCourseMap[assignId] ?? '',
              timeModified:   s.timemodified ?? 0,
              status:         s.status,
              gradingStatus:  s.gradingstatus ?? 'notgraded',
            };
          })
      )
      .sort((a, b) => b.timeModified - a.timeModified)
      .slice(0, 20);

    return NextResponse.json({
      success: true,
      data: {
        teacher: {
          id:              teacher.id,
          username:        teacher.username,
          firstname:       teacher.firstname,
          lastname:        teacher.lastname,
          fullname:        teacher.fullname,
          email:           teacher.email,
          profileimageurl: teacher.profileimageurl ?? null,
        },
        courses: richCourses,
        stats: {
          totalStudents:    uniqueStudentIds.size,
          totalCourses:     richCourses.length,
          totalAssignments,
          pendingGrading:   totalPendingGrading,
        },
        recentSubmissions,
      },
    });

  } catch (err) {
    console.error('[/api/teacher/dashboard]', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to load teacher dashboard.' },
      { status: err.message?.includes('Token') ? 403 : 500 }
    );
  }
}
