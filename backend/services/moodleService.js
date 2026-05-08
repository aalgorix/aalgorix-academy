/**
 * moodleService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * All communication with the Moodle Web Services REST API lives here.
 *
 * Two token types used:
 *   MOODLE_TOKEN  – admin/service token from .env, used for admin-level calls
 *                   (fetching any user's profile/courses/grades).
 *   userToken     – per-user token obtained by calling login/token.php with the
 *                   student's credentials. Verified during login only.
 */

'use strict';

const axios = require('axios');

const MOODLE_URL   = process.env.MOODLE_URL;
const ADMIN_TOKEN  = process.env.MOODLE_TOKEN;

// ─── Shared REST helper ───────────────────────────────────────────────────────

/**
 * Call a Moodle Web Service function.
 * @param {string} wsfunction   e.g. 'core_enrol_get_users_courses'
 * @param {object} params       additional query params
 * @param {string} [token]      defaults to ADMIN_TOKEN
 */
async function moodleCall(wsfunction, params = {}, token = ADMIN_TOKEN) {
  const { data } = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, {
    params: {
      wstoken:            token,
      wsfunction,
      moodlewsrestformat: 'json',
      ...params,
    },
    timeout: 15_000,
  });

  // Moodle returns HTTP 200 even for errors — check the body
  if (data && data.exception) {
    const err = new Error(data.message || `Moodle error in ${wsfunction}`);
    err.moodleErrorCode = data.errorcode;
    throw err;
  }

  return data;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Authenticate a student/teacher against Moodle by trading credentials for
 * their personal user token. Returns the token string on success.
 *
 * Throws with a user-friendly message on bad credentials.
 */
async function authenticateUser(username, password) {
  const params = new URLSearchParams({
    username,
    password,
    service: 'moodle_mobile_app',
  });

  const { data } = await axios.post(
    `${MOODLE_URL}/login/token.php`,
    params.toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 15_000,
    }
  );

  if (data.error) {
    const msg = data.error.toLowerCase();
    if (msg.includes('invalid login') || msg.includes('username') || msg.includes('password')) {
      throw Object.assign(new Error('Invalid username or password.'), { status: 401 });
    }
    throw new Error(data.error);
  }

  if (!data.token) {
    throw new Error('Moodle did not return a token. Check that the Mobile App service is enabled.');
  }

  return data.token;
}

/**
 * Get the site info for the owner of the given token.
 * Returns: { userid, username, fullname, userpictureurl, sitename, ... }
 */
async function getSiteInfo(userToken) {
  return moodleCall('core_webservice_get_site_info', {}, userToken);
}

/** Shared lookup: returns the first user matching field=value, or null. */
async function getUserByField(field, value) {
  const result = await moodleCall('core_user_get_users_by_field', {
    field,
    'values[0]': value,
  });
  if (!Array.isArray(result) || result.length === 0) return null;
  return result[0];
}

async function getUserById(userId)       { return getUserByField('id',       userId);   }
async function getUserByUsername(username) { return getUserByField('username', username); }

/**
 * Get all courses a user is enrolled in.
 * Returns an array of course objects.
 */
async function getUserCourses(userId) {
  const result = await moodleCall('core_enrol_get_users_courses', { userid: userId });
  return Array.isArray(result) ? result : [];
}

/**
 * Get grade items for a specific course + user (best-effort — null on failure).
 */
async function getCourseGrades(courseId, userId) {
  try {
    return await moodleCall('gradereport_user_get_grade_items', {
      courseid: courseId,
      userid:   userId,
    });
  } catch {
    return null;
  }
}

/** Get all assignment activities in a single course. */
async function getCourseAssignments(courseId) {
  return getAssignmentsForCourses([courseId]);
}

/**
 * Get submission status for a student in a course's assignments.
 */
async function getSubmissionStatus(assignId, userId) {
  try {
    return await moodleCall('mod_assign_get_submission_status', {
      assignid: assignId,
      userid:   userId,
    });
  } catch {
    return null;
  }
}

/**
 * Get upcoming calendar events visible to the admin token holder.
 * Returns an array of event objects (title, timestart, description, etc.)
 */
async function getUpcomingEvents() {
  try {
    const result = await moodleCall('core_calendar_get_action_events_by_timesort', {
      timesortfrom: Math.floor(Date.now() / 1000),
      limitnum:     10,
    });
    return Array.isArray(result?.events) ? result.events : [];
  } catch {
    return [];
  }
}

/**
 * Get assignments across all provided courseIds.
 * Returns a flat array of assignment objects.
 */
async function getAssignmentsForCourses(courseIds) {
  if (!courseIds || courseIds.length === 0) return [];
  try {
    const params = {};
    courseIds.forEach((id, i) => { params[`courseids[${i}]`] = id; });
    const result = await moodleCall('mod_assign_get_assignments', params);
    const courses = result?.courses ?? [];
    return courses.flatMap((c) =>
      (c.assignments ?? []).map((a) => ({
        ...a,
        courseid:   c.id,
        coursename: c.fullname,
      }))
    );
  } catch {
    return [];
  }
}

module.exports = {
  authenticateUser,
  getSiteInfo,
  getUserById,
  getUserByUsername,
  getUserCourses,
  getCourseGrades,
  getCourseAssignments,
  getSubmissionStatus,
  getUpcomingEvents,
  getAssignmentsForCourses,
};
