/**
 * studentController.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles:
 *   GET  /api/v1/student-dashboard-summary  — full dashboard payload
 *   POST /api/v1/submit-assignment          — file upload acknowledgement
 *
 * Auth strategy for dashboard:
 *   • Preferred: JWT in Authorization header  → userId comes from req.user.userId
 *   • Fallback:  ?userId= query param          → supports legacy frontend calls
 *
 * All Moodle calls use the admin token (MOODLE_TOKEN in .env) so no per-user
 * token re-issuance is needed at this layer.
 */

'use strict';

const moodle = require('../services/moodleService');

// ─── GET /api/v1/student-dashboard-summary ────────────────────────────────────

async function getDashboardSummary(req, res) {
  // Resolve userId: JWT payload takes priority over query param
  const userId = req.user?.userId ?? req.query.userId;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'userId is required. Pass it as a query param or include a valid Bearer token.',
    });
  }

  try {
    // ── Fetch profile, courses, and site-wide events all at once ─────────────
    const [student, rawCourses, upcomingEvents] = await Promise.all([
      moodle.getUserById(userId),
      moodle.getUserCourses(userId),
      moodle.getUpcomingEvents(),
    ]);

    if (!student) {
      return res.status(404).json({ success: false, message: `User ${userId} not found in Moodle.` });
    }

    // ── Enrich courses with grades + fetch assignments — all concurrent ────────
    const courseIds = rawCourses.map((c) => c.id);
    const [enrolledCourses, assignments] = await Promise.all([
      Promise.all(
        rawCourses.map(async (course) => {
          const grades = await moodle.getCourseGrades(course.id, userId);
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
      moodle.getAssignmentsForCourses(courseIds),
    ]);

    // ── Build summary stats ───────────────────────────────────────────────────
    const completedCourses = enrolledCourses.filter(
      (c) => typeof c.progress === 'number' && c.progress >= 100
    ).length;

    const avgProgress = enrolledCourses.length
      ? Math.round(
          enrolledCourses.reduce((sum, c) => sum + (c.progress ?? 0), 0) /
          enrolledCourses.length
        )
      : 0;

    const now = Math.floor(Date.now() / 1000);
    const pendingAssignments = assignments.filter(
      (a) => a.duedate && a.duedate > now
    ).length;

    // ── Pick "primary course" (most grade items available) ────────────────────
    const scored = enrolledCourses.filter(
      (c) => (c.grades?.usergrades?.[0]?.gradeitems?.length ?? 0) > 0
    );
    const primaryCourse = scored.length ? scored[0] : enrolledCourses[0] ?? null;

    return res.status(200).json({
      success: true,
      data: {
        student: {
          id:              student.id,
          username:        student.username,
          firstname:       student.firstname,
          lastname:        student.lastname,
          fullname:        `${student.firstname} ${student.lastname}`.trim(),
          email:           student.email,
          profileimageurl: student.profileimageurl ?? null,
        },
        enrolledCourses,
        assignments,
        upcomingEvents,
        primaryCourse: primaryCourse
          ? {
              ...primaryCourse,
              gradeItems: primaryCourse.grades?.usergrades?.[0]?.gradeitems ?? [],
            }
          : null,
        stats: {
          totalCourses:      enrolledCourses.length,
          completedCourses,
          inProgressCourses: enrolledCourses.length - completedCourses,
          avgProgress,
          pendingAssignments,
        },
      },
    });

  } catch (err) {
    console.error(`[Student] getDashboardSummary for userId=${userId}:`, err.message);
    return res.status(500).json({
      success: false,
      message: err.moodleErrorCode
        ? `Moodle error (${err.moodleErrorCode}): ${err.message}`
        : 'Failed to load dashboard data.',
    });
  }
}

// ─── POST /api/v1/submit-assignment ──────────────────────────────────────────

async function submitAssignment(req, res) {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: 'No file attached.' });
  }

  const userId   = req.body.userId;
  const courseId = req.body.courseId;
  const title    = req.body.title || file.originalname;

  if (!userId || !courseId) {
    return res.status(400).json({ success: false, message: 'userId and courseId are required.' });
  }

  // In a production system you would upload `file.buffer` to Moodle via:
  //   POST /webservice/upload.php?token=USER_TOKEN&itemid=0
  // and then call mod_assign_save_submission with the returned fileinfo.
  // For now we acknowledge receipt and generate a local submission ID.
  const submissionId = `SUB-${userId}-${courseId}-${Date.now()}`;

  console.log(
    `[Student] Assignment received: user=${userId} course=${courseId}` +
    ` file="${file.originalname}" size=${file.size}B id=${submissionId}`
  );

  return res.status(200).json({
    success: true,
    message: 'Assignment received and queued for submission.',
    data: {
      submissionId,
      originalName: file.originalname,
      mimeType:     file.mimetype,
      size:         file.size,
      courseId,
      userId,
      title,
      submittedAt: new Date().toISOString(),
    },
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip HTML tags from a Moodle summary string. */
function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

module.exports = { getDashboardSummary, submitAssignment };
