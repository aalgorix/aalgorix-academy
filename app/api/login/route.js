/**
 * app/api/login/route.js — Server-side Moodle authentication middleman.
 *
 * Flow:
 *  1. Trade credentials for Moodle user token via /login/token.php
 *  2. Fetch profile via core_webservice_get_site_info (user's own token)
 *  3. Detect role (admin / teacher / student) using admin token
 *  4. Set role + auth cookies (readable by middleware for route protection)
 *  5. Return clean session data — Moodle URL never leaves this server
 */

import { NextResponse } from 'next/server';
import { moodleCall, moodleCallSafe, detectRole, tryAdminToken } from '@/lib/moodle';

const MOODLE_URL = process.env.MOODLE_URL ?? 'https://aalgorixacademy.moodlecloud.com';

// ─── Shared cookie options ────────────────────────────────────────────────────

/** Max-age 7 days. SameSite=Lax so it travels on top-level navigations. */
function cookieOpts(maxAge = 60 * 60 * 24 * 7) {
  return {
    httpOnly: false, // middleware + client JS both need to read these
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/',
    maxAge,
  };
}

// ─── POST /api/login ──────────────────────────────────────────────────────────

export async function POST(request) {
  // ── Parse body ─────────────────────────────────────────────────────────────
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const { username, password } = body ?? {};

  if (!username?.trim()) {
    return NextResponse.json(
      { success: false, message: 'Username is required.' },
      { status: 400 }
    );
  }
  if (!password) {
    return NextResponse.json(
      { success: false, message: 'Password is required.' },
      { status: 400 }
    );
  }

  try {
    // ── Step 1: Exchange credentials for Moodle token ─────────────────────────
    const tokenEndpoint = new URL(`${MOODLE_URL}/login/token.php`);
    tokenEndpoint.searchParams.set('username', username.trim());
    tokenEndpoint.searchParams.set('password', password);
    tokenEndpoint.searchParams.set('service',  'moodle_mobile_app');

    const tokenRes  = await fetch(tokenEndpoint.toString(), { cache: 'no-store' });
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      const msg = (tokenData.error ?? '').toLowerCase();
      const isCredentialError =
        msg.includes('invalid login') ||
        msg.includes('username')      ||
        msg.includes('password');

      return NextResponse.json(
        {
          success: false,
          message: isCredentialError
            ? 'Invalid username or password.'
            : `Moodle error: ${tokenData.error}`,
        },
        { status: isCredentialError ? 401 : 502 }
      );
    }

    if (!tokenData.token) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Moodle did not return a token. Ensure the Mobile App web service is enabled.',
        },
        { status: 502 }
      );
    }

    const moodleToken = tokenData.token;

    // ── Step 2: Fetch user profile (using their own token — no admin needed) ──
    let siteInfo;
    let userId, moodleUsername, fullname;

    try {
      siteInfo       = await moodleCall('core_webservice_get_site_info', {}, moodleToken);
      userId         = siteInfo.userid;
      moodleUsername = siteInfo.username;
      fullname       = siteInfo.fullname ?? '';
    } catch (infoErr) {
      console.warn('[/api/login] core_webservice_get_site_info failed:', infoErr.message);
      moodleUsername = username.trim();
      fullname       = username.trim();
      userId         = null;
      siteInfo       = null;
    }

    const nameParts = fullname.trim().split(/\s+/);
    const firstname = nameParts[0]              ?? '';
    const lastname  = nameParts.slice(1).join(' ');

    // ── Step 3: Detect role (admin / teacher / student) ───────────────────────
    let role = 'student';
    if (userId) {
      try {
        role = await detectRole(userId, moodleToken, siteInfo);
      } catch (roleErr) {
        console.warn('[/api/login] Role detection failed:', roleErr.message);
      }
    }

    // ── Step 4: Build response with cookies ───────────────────────────────────
    const responsePayload = {
      success: true,
      message: 'Login successful.',
      data: {
        token:     moodleToken,
        userId,
        username:  moodleUsername,
        firstname,
        lastname,
        fullname,
        role,
      },
    };

    const response = NextResponse.json(responsePayload);

    // Set lightweight indicator cookies (middleware reads these for routing).
    // The actual Moodle token lives in localStorage — never in cookies.
    response.cookies.set('aalgorix_auth', '1',    cookieOpts());
    response.cookies.set('aalgorix_role', role,   cookieOpts());

    return response;

  } catch (err) {
    console.error('[/api/login] Unexpected error:', err.message);
    return NextResponse.json(
      { success: false, message: 'Login service unavailable. Please try again later.' },
      { status: 500 }
    );
  }
}

// ─── DELETE /api/login (logout — clears cookies) ─────────────────────────────

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('aalgorix_auth', '', { ...cookieOpts(0), maxAge: 0 });
  response.cookies.set('aalgorix_role', '', { ...cookieOpts(0), maxAge: 0 });
  return response;
}
