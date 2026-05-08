/**
 * routes/moodle.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Mounted at:  /api/moodle
 *
 *   GET  /api/moodle/user      → authenticated user's Moodle profile
 *   GET  /api/moodle/courses   → authenticated user's enrolled courses + grades
 *
 * All routes require a valid Bearer JWT (issued by /api/v1/auth/login).
 */

'use strict';

const express           = require('express');
const moodleController  = require('../controllers/moodleController');
const { verifyToken }   = require('../middleware/authMiddleware');

const router = express.Router();

// Apply JWT guard to the entire /api/moodle namespace
router.use(verifyToken);

router.get('/user',    moodleController.getUser);
router.get('/courses', moodleController.getCourses);

module.exports = router;
