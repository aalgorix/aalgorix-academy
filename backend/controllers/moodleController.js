/**
 * moodleController.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Handlers for the /api/moodle/* routes.
 *
 *   GET /api/moodle/user      → Moodle core_webservice_get_site_info
 *   GET /api/moodle/courses   → Moodle core_enrol_get_users_courses
 *
 * Auth:
 *   Both endpoints require a valid JWT (set by authMiddleware.verifyToken).
 *   The userId is read from req.user.userId (JWT payload), so the client
 *   never needs to pass it explicitly — it is already embedded in the token.
 *
 * The Moodle admin token (MOODLE_TOKEN in .env) is used for all data fetches.
 */

'use strict';

const moodle = require('../services/moodleService');

// ─── GET /api/moodle/user ─────────────────────────────────────────────────────

async function getUser(req, res) {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorised — no user in token.' });
  }

  try {
    const student = await moodle.getUserById(userId);

    if (!student) {
      return res.status(404).json({ success: false, message: `User ${userId} not found in Moodle.` });
    }

    return res.status(200).json({
      success: true,
      data: {
        id:              student.id,
        username:        student.username,
        firstname:       student.firstname,
        lastname:        student.lastname,
        fullname:        `${student.firstname} ${student.lastname}`.trim(),
        email:           student.email,
        profileimageurl: student.profileimageurl ?? null,
      },
    });
  } catch (err) {
    console.error(`[Moodle] getUser failed for userId=${userId}:`, err.message);
    return res.status(500).json({
      success: false,
      message: err.moodleErrorCode
        ? `Moodle error (${err.moodleErrorCode}): ${err.message}`
        : 'Failed to fetch user from Moodle.',
    });
  }
}

// ─── GET /api/moodle/courses ──────────────────────────────────────────────────

async function getCourses(req, res) {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorised — no user in token.' });
  }

  try {
    const rawCourses = await moodle.getUserCourses(userId);

    // Enrich with grades (best-effort — failure on one course won't break the rest)
    const courses = await Promise.all(
      rawCourses.map(async (course) => {
        const grades = await moodle.getCourseGrades(course.id, userId);
        const gradeItems = grades?.usergrades?.[0]?.gradeitems ?? [];

        return {
          id:          course.id,
          fullname:    course.fullname,
          shortname:   course.shortname,
          summary:     stripHtml(course.summary ?? ''),
          progress:    typeof course.progress === 'number' ? course.progress : null,
          startdate:   course.startdate  ?? null,
          enddate:     course.enddate    ?? null,
          courseimage: course.courseimage ?? null,
          gradeItems,
        };
      })
    );

    return res.status(200).json({
      success: true,
      total:   courses.length,
      data:    courses,
    });
  } catch (err) {
    console.error(`[Moodle] getCourses failed for userId=${userId}:`, err.message);
    return res.status(500).json({
      success: false,
      message: err.moodleErrorCode
        ? `Moodle error (${err.moodleErrorCode}): ${err.message}`
        : 'Failed to fetch courses from Moodle.',
    });
  }
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

module.exports = { getUser, getCourses };
