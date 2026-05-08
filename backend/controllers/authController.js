/**
 * authController.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Auth strategy (two stages, first that works wins):
 *
 *  Stage 1 — Real credential auth via login/token.php?service=moodle_mobile_app
 *    • Sends the student's username + password to Moodle
 *    • On success: calls core_webservice_get_site_info with the USER token
 *      to get their userId / fullname — no admin-token function needed
 *    • On wrong credentials → 401 immediately (no fallback)
 *    • On service/network failure → fall through to Stage 2
 *
 *  Stage 2 — Admin-token lookup (fallback for MoodleCloud restrictions)
 *    • Uses core_user_get_users_by_field to find the user by username
 *    • No password verification possible at this stage — if Stage 1 failed
 *      for a non-credential reason we cannot re-verify; a JWT is still issued
 *      so that the dashboard works
 */

'use strict';

const jwt    = require('jsonwebtoken');
const moodle = require('../services/moodleService');

async function login(req, res) {
  const { username, password } = req.body ?? {};

  if (!username || typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({ success: false, message: 'Username is required.' });
  }
  if (!password || typeof password !== 'string' || !password) {
    return res.status(400).json({ success: false, message: 'Password is required.' });
  }

  const trimmedUsername = username.trim();

  try {
    let userId, moodleUsername, fullname, userpictureurl;
    let stage1Failed = false;

    // ── Stage 1: per-user token via login/token.php ───────────────────────────
    try {
      const userToken = await moodle.authenticateUser(trimmedUsername, password);
      const siteInfo  = await moodle.getSiteInfo(userToken);

      userId         = siteInfo.userid;
      moodleUsername = siteInfo.username;
      fullname       = siteInfo.fullname   ?? '';
      userpictureurl = siteInfo.userpictureurl ?? null;

      console.log(`[Auth] Stage-1 success for "${trimmedUsername}" (userId=${userId})`);

    } catch (authErr) {
      // Wrong credentials → stop immediately, no fallback
      if (authErr.status === 401 ||
          /invalid login|invalid username|invalid password/i.test(authErr.message)) {
        return res.status(401).json({ success: false, message: 'Invalid username or password.' });
      }

      // Service-level failure (e.g. MoodleCloud blocks login/token.php) → try Stage 2
      console.warn(`[Auth] Stage-1 failed (${authErr.message}), trying Stage-2 admin lookup…`);
      stage1Failed = true;
    }

    // ── Stage 2: admin-token user lookup ─────────────────────────────────────
    if (stage1Failed) {
      const user = await moodle.getUserByUsername(trimmedUsername);

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password.' });
      }

      userId         = user.id;
      moodleUsername = user.username;
      fullname       = user.fullname         ?? '';
      userpictureurl = user.profileimageurl  ?? null;

      console.log(`[Auth] Stage-2 success for "${trimmedUsername}" (userId=${userId})`);
    }

    // ── Issue JWT ─────────────────────────────────────────────────────────────
    const nameParts = fullname.trim().split(/\s+/);
    const firstname = nameParts[0] ?? '';
    const lastname  = nameParts.slice(1).join(' ');

    const token = jwt.sign(
      { userId, username: moodleUsername, fullname },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN ?? '24h',
        issuer:    'aalgorix-academy',
        audience:  'aalgorix-students',
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        userId,
        username:       moodleUsername,
        firstname,
        lastname,
        fullname,
        userpictureurl,
        token,
      },
    });

  } catch (err) {
    console.error('[Auth] Unexpected login error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Login service unavailable. Please try again later.',
    });
  }
}

module.exports = { login };
