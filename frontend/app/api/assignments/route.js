/**
 * app/api/assignments/route.js — Reusable assignments endpoint.
 *
 * GET /api/assignments?userId=<number>
 * Authorization: Bearer <moodleToken>
 *
 * Returns all assignments across the user's enrolled courses,
 * sorted by due date ascending (soonest first).
 * Uses the user's own token — no admin token required.
 */

import { NextResponse }          from 'next/server';
import { moodleCall, moodleCallSafe } from '@/lib/moodle';

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

    // Get enrolled course IDs
    const courses = await moodleCall(
      'core_enrol_get_users_courses',
      { userid: userId },
      userToken
    );

    const courseIds = Array.isArray(courses) ? courses.map((c) => c.id) : [];
    if (courseIds.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Fetch assignments for all courses in one call
    const assignParams = {};
    courseIds.forEach((id, i) => { assignParams[`courseids[${i}]`] = id; });

    const result = await moodleCallSafe(
      'mod_assign_get_assignments',
      assignParams,
      userToken
    );

    // Build a courseId → fullname map for enrichment
    const courseMap = Object.fromEntries(courses.map((c) => [c.id, c.fullname]));

    const assignments = (result?.courses ?? []).flatMap((c) =>
      (c.assignments ?? []).map((a) => ({
        id:           a.id,
        name:         a.name,
        intro:        a.intro ?? '',
        duedate:      a.duedate ?? 0,
        allowsubmissionsfromdate: a.allowsubmissionsfromdate ?? 0,
        nosubmissions: a.nosubmissions ?? 0,
        courseid:     c.id,
        coursename:   courseMap[c.id] ?? c.fullname,
      }))
    );

    // Sort: soonest due first; no-due-date items go last
    assignments.sort((a, b) => {
      if (!a.duedate && !b.duedate) return 0;
      if (!a.duedate) return 1;
      if (!b.duedate) return -1;
      return a.duedate - b.duedate;
    });

    return NextResponse.json({ success: true, data: assignments });
  } catch (err) {
    console.error('[/api/assignments]', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'Failed to load assignments.' },
      { status: err.message?.includes('mismatch') ? 403 : 500 }
    );
  }
}
