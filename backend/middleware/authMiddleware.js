/**
 * authMiddleware.js
 * ─────────────────────────────────────────────────────────────────────────────
 * JWT verification middleware.
 *
 * verifyToken   – hard gate: rejects requests with no/invalid/expired token.
 * optionalToken – soft gate: populates req.user if a valid token is present,
 *                 but never blocks the request. Useful for endpoints that can
 *                 fall back to a userId query param (legacy support).
 */

'use strict';

const jwt = require('jsonwebtoken');

/** Attach decoded payload to req.user and call next(); else 401. */
function verifyToken(req, res, next) {
  const token = extractBearer(req);

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    const msg = err.name === 'TokenExpiredError'
      ? 'Session expired. Please log in again.'
      : 'Invalid token. Please log in again.';
    return res.status(401).json({ success: false, message: msg });
  }
}

/** Populate req.user if a valid token is present; never blocks. */
function optionalToken(req, res, next) {
  const token = extractBearer(req);

  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      // Invalid token — ignore silently, endpoint will fall back to userId param
    }
  }

  next();
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function extractBearer(req) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7).trim();
  return null;
}

module.exports = { verifyToken, optionalToken };
