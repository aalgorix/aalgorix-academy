/**
 * server.js — Aalgorix World Academy Backend
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Endpoint map
 * ┌────────────────────────────────────────┬───────────────────────────────────┐
 * │ Route                                  │ Description                       │
 * ├────────────────────────────────────────┼───────────────────────────────────┤
 * │ POST /api/v1/auth/login                │ Moodle auth → JWT                 │
 * │ GET  /api/moodle/user                  │ Authenticated user profile        │
 * │ GET  /api/moodle/courses               │ Enrolled courses + grades         │
 * │ GET  /api/v1/student-dashboard-summary │ Full dashboard payload            │
 * │ POST /api/v1/submit-assignment         │ File upload acknowledgement       │
 * │ GET  /health                           │ Liveness probe                    │
 * └────────────────────────────────────────┴───────────────────────────────────┘
 *
 * Start:  npm run dev  (nodemon) |  npm start  (production)
 */

'use strict';

require('dotenv').config();

// ── Guard: fail fast on missing env vars ─────────────────────────────────────
const REQUIRED = ['MOODLE_URL', 'MOODLE_TOKEN', 'JWT_SECRET'];
const missing  = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`\n[server] Missing required env vars: ${missing.join(', ')}`);
  console.error('[server] Copy .env.example → .env and fill in the values.\n');
  process.exit(1);
}

const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const morgan    = require('morgan');

// Routes
const authRoutes    = require('./routes/auth');
const moodleRoutes  = require('./routes/moodle');
const studentRoutes = require('./routes/student');

const app  = express();
const PORT = Number(process.env.PORT) || 3000;

// ── Security & logging ────────────────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:3001')
  .split(',')
  .map((s) => s.trim());

app.use(
  cors({
    origin:         allowedOrigins,
    credentials:    true,
    methods:        ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRoutes);      // POST /api/v1/auth/login
app.use('/api/moodle',  moodleRoutes);    // GET  /api/moodle/user  /courses
app.use('/api/v1',      studentRoutes);   // GET  /api/v1/student-dashboard-summary
                                          // POST /api/v1/submit-assignment

// Root
app.get('/', (_req, res) =>
  res.json({
    success: true,
    service: 'aalgorix-academy-backend',
    version: 'v1',
    endpoints: [
      'POST /api/v1/auth/login',
      'GET  /api/moodle/user',
      'GET  /api/moodle/courses',
      'GET  /api/v1/student-dashboard-summary',
      'POST /api/v1/submit-assignment',
      'GET  /health',
    ],
  })
);

// Health probe
app.get('/health', (_req, res) =>
  res.json({
    status:    'ok',
    service:   'aalgorix-academy-backend',
    port:      PORT,
    moodleUrl: process.env.MOODLE_URL,
    timestamp: new Date().toISOString(),
  })
);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) =>
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
  })
);

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[server] Unhandled error:', err.message);
  res.status(err.status ?? 500).json({
    success: false,
    message: err.message ?? 'Internal server error.',
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log('  ║   Aalgorix World Academy — Backend Server          ║');
  console.log(`  ║   http://localhost:${PORT}                       ║`);
  console.log(`  ║   Moodle: ${process.env.MOODLE_URL}  ║`);
  console.log('  ╠══════════════════════════════════════════════╣');
  console.log('  ║  POST /api/v1/auth/login                     ║');
  console.log('  ║  GET  /api/moodle/user                       ║');
  console.log('  ║  GET  /api/moodle/courses                    ║');
  console.log('  ║  GET  /api/v1/student-dashboard-summary      ║');
  console.log('  ║  POST /api/v1/submit-assignment              ║');
  console.log('  ╚══════════════════════════════════════════════╝');
  console.log('');
});
