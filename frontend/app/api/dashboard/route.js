/**
 * app/api/dashboard/route.js — Student dashboard data aggregator.
 *
 * Security model:
 *   - Reads Authorization: Bearer <moodleToken> from the request header.
 *   - Validates that the token belongs to the requested userId via
 *     core_webservice_get_site_info (prevents IDOR / userId spoofing).
 *   - Uses the USER'S own token for all self-service Moodle calls.
 *   - Falls back to admin token only for core_user_get_users_by_field
 *     (profile lookup) which requires elevated access on most instances.
 *
 * GET /api/dashboard?userId=<number>
 * Authorization: Bearer <moodleToken>
 */

import { NextResponse }                            from 'next/server';
import { moodleCall, moodleCallSafe, stripHtml, tryAdminToken } from '@/lib/moodle';

// ─── GET /api/dashboard ───────────────────────────────────────────────────────

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'userId query param is required.' },
      { status: 400 }
    );
  }

  // ── Extract & validate user token ─────────────────────────────────────────
  const authHeader = request.headers.get('authorization') ?? '';
  const userToken  = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!userToken) {
    return NextResponse.json(
      { success: false, message: 'Missing Authorization header.' },
      { status: 401 }
    );
  }

  try {
    // Validate: token must belong to the requested userId
    const siteInfo = await moodleCall('core_webservice_get_site_info', {}, userToken);
    if (String(siteInfo.userid) !== String(userId)) {
      return NextResponse.json(
        { success: false, message: 'Token does not match the requested userId.' },
        { status: 403 }
      );
    }

    const adminToken = tryAdminToken();

    // ── Wave 1: profile + courses + upcoming events (parallel) ────────────────
    const profileToken = adminToken || userToken; // admin for richer profile fields
    const [userResult, rawCourses, upcomingResult] = await Promise.all([
      moodleCallSafe(
        'core_user_get_users_by_field',
        { field: 'id', 'values[0]': userId },
        profileToken
      ),
      moodleCall('core_enrol_get_users_courses', { userid: userId }, userToken),
      moodleCallSafe(
        'core_calendar_get_action_events_by_timesort',
        { timesortfrom: Math.floor(Date.now() / 1000), limitnum: 10 },
        userToken
      ),
    ]);

    const student = Array.isArray(userResult) ? userResult[0] : null;

    // If admin token unavailable, build profile from siteInfo
    const studentProfile = student ?? {
      id:              siteInfo.userid,
      username:        siteInfo.username,
      firstname:       siteInfo.firstname ?? siteInfo.fullname?.split(' ')[0] ?? '',
      lastname:        siteInfo.lastname  ?? '',
      fullname:        siteInfo.fullname  ?? '',
      email:           siteInfo.useremail ?? '',
      profileimageurl: siteInfo.userpictureurl ?? null,
    };

    const courses        = Array.isArray(rawCourses) ? rawCourses : [];
    const upcomingEvents = Array.isArray(upcomingResult?.events) ? upcomingResult.events : [];
    const courseIds      = courses.map((c) => c.id);

    // ── Wave 2: grade enrichment + assignments (parallel) ─────────────────────
    const assignParams = {};
    courseIds.forEach((id, i) => { assignParams[`courseids[${i}]`] = id; });

    const [enrichedCourses, assignResult] = await Promise.all([
      Promise.all(
        courses.map(async (course) => {
          const grades = await moodleCallSafe(
            'gradereport_user_get_grade_items',
            { courseid: course.id, userid: userId },
            userToken
          );
          return {
            id:          course.id,
            fullname:    course.fullname,
            shortname:   course.shortname,
            summary:     stripHtml(course.summary ?? ''),
            progress:    typeof course.progress === 'number' ? course.progress : null,
            startdate:   course.startdate   ?? null,
            enddate:     course.enddate     ?? null,
            courseimage: course.courseimage ?? null,
            grades,
          };
        })
      ),
      courseIds.length > 0
        ? moodleCallSafe('mod_assign_get_assignments', assignParams, userToken)
        : Promise.resolve(null),
    ]);

    // Flatten assignments across all courses
    const assignments = (assignResult?.courses ?? []).flatMap((c) =>
      (c.assignments ?? []).map((a) => ({
        ...a,
        courseid:   c.id,
        coursename: c.fullname,
      }))
    );

    // ── Stats ─────────────────────────────────────────────────────────────────
    const now               = Math.floor(Date.now() / 1000);
    const completedCourses  = enrichedCourses.filter(
      (c) => typeof c.progress === 'number' && c.progress >= 100
    ).length;
    const avgProgress       = enrichedCourses.length
      ? Math.round(
          enrichedCourses.reduce((s, c) => s + (c.progress ?? 0), 0) /
            enrichedCourses.length
        )
      : 0;
    const pendingAssignments = assignments.filter(
      (a) => a.duedate && a.duedate > now
    ).length;

    const primaryCourse =
      enrichedCourses.find(
        (c) => (c.grades?.usergrades?.[0]?.gradeitems?.length ?? 0) > 0
      ) ?? enrichedCourses[0] ?? null;

    return NextResponse.json({
      success: true,
      data: {
        student: {
          id:              studentProfile.id,
          username:        studentProfile.username,
          firstname:       studentProfile.firstname,
          lastname:        studentProfile.lastname,
          fullname:
            studentProfile.fullname ??
            `${studentProfile.firstname} ${studentProfile.lastname}`.trim(),
          email:           studentProfile.email,
          profileimageurl: studentProfile.profileimageurl ?? null,
        },
        enrolledCourses: enrichedCourses,
        assignments,
        upcomingEvents,
        primaryCourse: primaryCourse
          ? {
              ...primaryCourse,
              gradeItems:
                primaryCourse.grades?.usergrades?.[0]?.gradeitems ?? [],
            }
          : null,
        stats: {
          totalCourses:       enrichedCourses.length,
          completedCourses,
          inProgressCourses:  enrichedCourses.length - completedCourses,
          avgProgress,
          pendingAssignments,
        },
      },
    });

  } catch (err) {
    console.error('[/api/dashboard]', err.message);
    return NextResponse.json(
      {
        success: false,
        message: err.errorcode
          ? `Moodle error (${err.errorcode}): ${err.message}`
          : err.message?.includes('Token does not match')
          ? err.message
          : 'Failed to load dashboard data.',
      },
      { status: err.message?.includes('Token') ? 403 : 500 }
    );
  }
}
