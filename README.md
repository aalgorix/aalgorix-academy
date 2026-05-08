# Aalgorix World Academy — Full-Stack LMS

```
aalgorix-project/
├── backend/          Node.js + Express  →  http://localhost:3000
│   ├── controllers/
│   │   ├── authController.js       POST /api/v1/auth/login
│   │   ├── moodleController.js     GET  /api/moodle/user | /courses
│   │   └── studentController.js    GET  /api/v1/student-dashboard-summary
│   ├── middleware/
│   │   └── authMiddleware.js       JWT verifyToken / optionalToken
│   ├── routes/
│   │   ├── auth.js
│   │   ├── moodle.js
│   │   └── student.js
│   ├── services/
│   │   └── moodleService.js        All Moodle REST calls
│   ├── .env                        ← real credentials (gitignored)
│   ├── .env.example                ← safe template
│   └── server.js
│
├── frontend/         Next.js 16 + Tailwind CSS  →  http://localhost:3001
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar.jsx          Dashboard button (auth-aware)
│   │   │   ├── AuthForm.tsx        Login / Sign-up form
│   │   │   └── AssignmentUpload.jsx
│   │   ├── dashboard/page.tsx      Admin-style stats dashboard
│   │   ├── student/                Student LMS dashboard
│   │   └── login/                  Login pages
│   ├── lib/api.ts                  ← single source of API base URLs
│   ├── .env.local                  NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
│   └── package.json
│
├── package.json      Root scripts — boots both servers with one command
└── .gitignore
```

---

## Quick start

```bash
# 1. Install all dependencies (run once)
cd aalgorix-project
npm install          # installs concurrently at root
npm run install:all  # installs backend + frontend node_modules

# 2. Configure backend credentials
cp backend/.env.example backend/.env
# Edit backend/.env — MOODLE_URL, MOODLE_TOKEN, JWT_SECRET are required

# 3. Start everything
npm run dev
```

| Service  | URL                    | Command (standalone)         |
|----------|------------------------|------------------------------|
| Backend  | http://localhost:3000  | `npm run dev:backend`        |
| Frontend | http://localhost:3001  | `npm run dev:frontend`       |

---

## API Endpoints

| Method | Route                              | Auth     | Description                        |
|--------|------------------------------------|----------|------------------------------------|
| POST   | /api/v1/auth/login                 | —        | Trade Moodle credentials for JWT   |
| GET    | /api/moodle/user                   | JWT      | Authenticated user's profile       |
| GET    | /api/moodle/courses                | JWT      | Enrolled courses + grade items     |
| GET    | /api/v1/student-dashboard-summary  | optional | Full dashboard payload             |
| POST   | /api/v1/submit-assignment          | —        | Assignment file upload             |
| GET    | /health                            | —        | Liveness probe                     |

---

## Authentication flow

```
Browser (port 3001)          Backend (port 3000)          Moodle Cloud
        │                           │                           │
        │── POST /api/v1/auth/login ►│                           │
        │   { username, password }   │── POST /login/token.php ──►│
        │                           │◄──── { moodleToken } ──────│
        │                           │── GET  core_webservice     │
        │                           │        _get_site_info ─────►│
        │                           │◄──── { userId, name } ─────│
        │◄── { JWT, userId, name } ──│                           │
        │   (stored in localStorage) │                           │
        │                           │                           │
        │── GET /api/moodle/courses ─►│                           │
        │   Authorization: Bearer    │── GET  core_enrol         │
        │                           │        _get_users_courses ─►│
        │◄──── courses + grades ─────│◄──── course array ────────│
```

---

## Environment variables

**`backend/.env`**
```
PORT=3000
NODE_ENV=development
MOODLE_URL=https://aalgorixacademy.moodlecloud.com
MOODLE_TOKEN=<admin service token>
JWT_SECRET=<random 64-char string>
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:3001
```

**`frontend/.env.local`**
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_PHONE_DISPLAY=+91 91674 95565
NEXT_PUBLIC_PHONE_E164=+919167495565
NEXT_PUBLIC_WHATSAPP_NUMBER=+919167495565
NEXT_PUBLIC_WHATSAPP_PREFILL=Hello, I’d like to know how to apply for admissions.
```
