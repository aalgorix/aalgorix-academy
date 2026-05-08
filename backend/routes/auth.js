/**
 * routes/auth.js
 * POST /api/v1/auth/login
 */

'use strict';

const express        = require('express');
const rateLimit      = require('express-rate-limit');
const authController = require('../controllers/authController');

const router = express.Router();

// Strict rate-limit on login: 10 attempts per IP per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      10,
  message:  { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders:   false,
});

router.post('/login', loginLimiter, authController.login);

module.exports = router;
