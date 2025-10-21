# MindCare – Prototype + Beta

Live: https://mindcare-bw9t.onrender.com

MindCare is a simple mindfulness app to practice breathing, log sessions, and send feedback. Built with Express + EJS + MongoDB Atlas and deployed on Render.

## Stack
- Node.js, Express, EJS
- MongoDB Atlas + Mongoose + connect-mongo (sessions)
- Bootstrap 5 + Bootstrap Icons
- Custom CSS with animations (scroll reveal, breathing keyframes)
- Render (deploy)

## Features
- Responsive hero and navigation (Bootstrap)
- Exercises: 4-7-8, Box Breathing, Deep Breathing (modals + timer)
- Session logging: POST /api/sessions (type, duration, mood, notes)
- Tracker: list and delete sessions
- Home: statistics (Total Sessions, Time Practiced, Current Streak) with count-up
- Feedback: form persisted in Mongo
- Resources: view with dynamic quote
- Accessibility: respects prefers-reduced-motion

## Main Routes
- GET /, /exercises, /tracker, /resources, /feedback
- POST /api/sessions, DELETE /api/sessions/:id
- POST /api/feedback

## Models (summary)
- Session: { userId, exerciseType, duration, mood, notes, createdAt }
- Feedback: { name, email, message, createdAt }

## Local Setup (Windows)
1) Clone and install
- git clone https://github.com/ant069/Project-Prototype_Team-4.git
- cd Project-Prototype_Team-4
- npm install

2) .env variables
- MONGODB_URI=your_atlas_uri
- SESSION_SECRET=your_secret
- NODE_ENV=development

3) Run
- npm run dev
- Open http://localhost:3000

Render notes
- Do not define PORT in Render. Let Express use process.env.PORT.
- Ensure Atlas Network Access allows 0.0.0.0/0.
- Check logs for “✅ MongoDB Connected”.

---

## Dev Log: Antonio Enriquez

Date: 20/10 – 21/10  
Project: MindCare (Prototype + Beta)

Goals
- Finish responsive design with Bootstrap
- Fix hero and card symmetry
- Add animations and scroll reveal
- Keep deploy stable on Render

Tasks Completed
- CSS cleanup (removed merge markers, deduplicated keyframes).
- Hero gap removed (no global body padding-top).
- Equalized card heights (stats and exercises) via equal-cols utilities.
- Scroll reveal with IntersectionObserver (public/js/main.js) and stat counter.
- Restored third stat card (Current Streak).

Use of Gen AI
- Quick questions on git conflicts and keyframes.
- Generated CSS utilities and reveal pattern.

What I Learned
- Fine control of Bootstrap grid (row-cols, h-100, g-4) for symmetry.
- Animation best practices and prefers-reduced-motion.
- Rebase/cherry-pick flow and safe push (--force-with-lease).

Challenges & Bugs
- ❌ style.css conflicts and HTML inside CSS.
- ✅ Fixed by cleaning markers and closing missing @keyframes.
- ❌ Hero gap due to body padding-top.
- ✅ Fixed by applying padding only to non-hero sections.

---

## Dev Log: Gael Rodriguez

Date: 20/10  
Project: MindCare

Goals
- Reusable EJS views
- Consistent navbar, footer, and sections

Tasks Completed
- Navbar/footer partials; included in all views.
- Grid adjustments in Home and Exercises.
- Cleaned resources.ejs (pure HTML/EJS, no server JS).

Use of Gen AI
- EJS syntax and include patterns.

What I Learned
- Separation of concerns (view vs server).
- Keeping visual consistency with Bootstrap utilities.

Challenges & Bugs
- ❌ “Something broke” in Resources due to server JS inside EJS.
- ✅ Moved logic to server.js and passed quote via render.

---

## Dev Log: Diego Arias

Date: 21/10  
Project: MindCare

Goals
- Connect MongoDB and persist sessions/feedback
- Finalize exercises flow (timer + modal)

Tasks Completed
- Mongoose connection + session store (connect-mongo).
- REST routes: POST/DELETE sessions, POST feedback.
- exercises.js: timer, safe stop, and save-session modal.

Use of Gen AI
- Fetch/JSON patterns and error handling.

What I Learned
- Minimal validation in endpoints and 400/500 handling.
- How to compute basic stats and prepare data for EJS.

Challenges & Bugs
- ❌ “Failed to save session” due to incomplete payload.
- ✅ Send { exerciseType, duration, mood, notes } correctly.

---

## Dev Log (Group)

Date: 20/10 – 21/10  
Project: MindCare

Goals
- Complete Prototype + Beta with production deploy
- Ensure all views work correctly

Tasks Completed
- Final design with animations and hover states.
- Stats with count-up and visual symmetry.
- Exercises with modals, stop, and session saving.
- Persistent feedback and stable Resources with quote.
- Deploy on Render and log verification.

Use of Gen AI
- Accelerate git conflict resolution and CSS refactor.
- Accessibility suggestions and micro-animations.

What We Learned
- Keep front/back separated; no server JS in EJS.
- Minimize flicker and ensure symmetry with simple utilities.
- Production flow: env vars, logs, and remote DB.

Challenges & Bugs
- ❌ Complex rebase and detached HEAD.
- ✅ Cherry-pick and safe push with --force-with-lease.
- ❌ Card misalignment and hero gap.
- ✅ Equal-cols + padding adjustments solved it.

Next Steps
- Confirm dialog before deleting a session (modal).
- Simple chart in tracker (Chart.js).
- Basic route tests (supertest).

---

## Changelog (highlights)
- Fix: CSS conflicts and missing @keyframes braces.
- Feat: main.js (reveal + count-up).
- Feat: exercises.js (timer, stop, save session).
- Fix: Resources without server JS in EJS.
- Feat: 3rd stat card (Streak) and grid symmetry.
