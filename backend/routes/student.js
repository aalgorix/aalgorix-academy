/**
 * routes/student.js
 *
 *   GET  /api/v1/student-dashboard-summary
 *   POST /api/v1/submit-assignment
 */

'use strict';

const express           = require('express');
const multer            = require('multer');
const studentController = require('../controllers/studentController');
const { optionalToken } = require('../middleware/authMiddleware');

const router = express.Router();

// ─── Multer (file uploads) ────────────────────────────────────────────────────
const ALLOWED_MIME_RE = /\.(pdf|doc|docx|ppt|pptx|zip|txt|png|jpg|jpeg)$/i;

const upload = multer({
  storage: multer.memoryStorage(),          // keep in RAM; upload to Moodle later
  limits:  { fileSize: 20 * 1024 * 1024 }, // 20 MB hard cap
  fileFilter(_req, file, cb) {
    if (ALLOWED_MIME_RE.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(Object.assign(
        new Error(`File type not allowed: "${file.originalname}"`),
        { status: 400 }
      ));
    }
  },
});

// ─── Routes ───────────────────────────────────────────────────────────────────

// JWT optional — falls back to ?userId= query param for legacy frontend calls
router.get(
  '/student-dashboard-summary',
  optionalToken,
  studentController.getDashboardSummary
);

// No auth required on submit — the userId in the body is validated server-side
router.post(
  '/submit-assignment',
  upload.single('file'),
  studentController.submitAssignment
);

// ─── Multer error handler ─────────────────────────────────────────────────────
router.use((err, _req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ success: false, message: 'File exceeds 20 MB limit.' });
  }
  return res.status(err.status ?? 400).json({ success: false, message: err.message });
});

module.exports = router;
