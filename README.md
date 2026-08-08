# CampusConnect

A lean Smart Campus Management Platform built for DevFusion 4.0 (Problem
Statement 1). Scoped intentionally for a solo, time-boxed build: two roles
(Student, Faculty), two core modules (Attendance, Assignments), full auth,
and a polished, responsive UI.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (dark mode, custom campus-ledger palette)
- MongoDB + Mongoose
- JWT auth in an httpOnly cookie, bcrypt password hashing
- react-hot-toast for notifications

## Features

- Email + password signup/login, role selection (Student / Faculty)
- Protected `/dashboard/*` routes via middleware
- **Attendance**: faculty create a session per subject/date and mark every
  student present/absent; students see a live percentage per subject
- **Assignments**: faculty post assignments with a deadline; students submit
  a link or text answer; faculty see submission counts
- Dark/light mode, loading skeletons, empty states, toast notifications

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in MONGODB_URI and JWT_SECRET
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string (free tier is fine) |
| `JWT_SECRET` | Any long random string used to sign auth tokens |

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add `MONGODB_URI` and `JWT_SECRET` as environment variables in the
   Vercel project settings.
4. Deploy. Vercel builds and serves both the frontend and the API routes.

## Test credentials

After deploying, sign up two accounts to demo both roles:

- **Faculty**: create via `/signup`, choose "Faculty"
- **Student**: create via `/signup`, choose "Student"

Log in as Faculty first to create an attendance session and post an
assignment, then log in as Student to see attendance % and submit the
assignment.

## What's intentionally out of scope

To ship a working, polished app solo in ~48 hours, the following were left
out of this build (all easy "future work" talking points for a demo/README):
Google OAuth, OTP/email verification, Coordinator/Admin roles, Events,
Placements, Club activities, file uploads (submissions use a link/text
field instead of S3/Cloudinary), Swagger docs, Docker, CI/CD.
