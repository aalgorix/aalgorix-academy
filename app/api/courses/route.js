/**
 * app/api/courses/route.js — Reusable enrolled-courses endpoint.
 *
 * GET /api/courses?userId=<number>
 * Authorization: Bearer <moodleToken>
 *
 * Returns the user's enrolled courses with progress info.
 * Uses the user's own token — no admin token required.
 */

import { NextResponse }                        from 'next/server';
import { moodleCall, moodleCallSafe, stripHtml } from '@/lib/moodle';

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

  try {
    // Validate token ownership
    const siteInfo = await moodleCall('core_webservice_get_site_info', {}, userToken);
    if (String(siteInfo.userid) !== String(userId)) {
      return NextResponse.json(
        { success: false, message: 'Token / userId mismatch.' },
        { status: 403 }
      );
    }

    const rawCourses = await moodleCall(
      'core_enrol_get_users_courses',
      { userid: userId },
      userToken
    );

    const courses = Array.isArray(rawCourses) ? rawCourses : [];

    // Enrich with grade items in parallel
    const enriched = await Promise.all(
      courses.map(async (c) => {
        const grades = await moodleCallSafe(
          'gradereport_user_get_grade_items',
          { courseid: c.id, userid: userId },
          userToken
        );
        return {
          id:          c.id,
          fullname:    c.fullname,
          shortname:   c.shortname,
          summary:     stripHtml(c.summary ?? ''),
          progress:    typeof c.progress === 'number' ? c.progress : null,
          startdate:   c.startdate   ?? null,
          enddate:     c.enddate     ?? null,
          courseimage: c.courseimage ?? null,
          grades,
        };
      })
    );

    return NextResponse.json({ success: true, data: enriched });
  } catch (err) {
    console.error('[/api/courses]', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to load courses.' },
      { status: err.message?.includes('mismatch') ? 403 : 500 }
    );
  }
}
