# ANTIGRAVITY.md — Mission Pack for RankDoors

You are the coding agent building RankDoors. Read this whole file first, then
`docs/PROJECT_PLAN.md` and `docs/RESEARCH_BRIEF.md`, before writing any code.

## The job in one paragraph

Recreate CollegeDoors.com — redesigned and redeveloped — as **RankDoors**, a
self-managed platform for Sagar Public School, Bhopal, so the school stops
paying for the external CollegeDoors service. JEE-first, Classes 9–12.
You do **all** the research and **all** the development. The owner reviews
after every step. Deployment happens later, only when the owner says so.

## Phase 0 — Research (do this FIRST, write no app code yet)

1. Do fresh web research on CollegeDoors.com from its **public** pages only:
   homepage, Offerings, About, Terms of Use, Privacy Policy, FAQ, Release
   Notes, Foundation subdomain, and the app-store listings.
2. Verify, correct, or extend `docs/RESEARCH_BRIEF.md` with what you find.
   Keep facts and recommendations clearly separated. Cite a URL for every
   factual claim about CollegeDoors. If you cannot verify something, say so —
   never guess, and never quote the 2017 ₹340–2,500 figures as current pricing.
3. **Do NOT touch the live school portal** (`spssn.collegedoors.com`):
   do not log in, do not ask for credentials, do not submit anything. The
   inside-portal behaviour is already mapped in the Reference Blueprint
   section of `docs/PROJECT_PLAN.md` — treat that as your source of truth
   for it, and flag anything in it that your public research contradicts.
4. Report back before building: a short summary of what you verified,
   what you corrected, and the final Phase 1 feature list you will build.
   Wait for the owner's go-ahead if anything in the plan looks wrong.

## Phase 1 — Build, in small verified steps

Work through these steps **in order**. One step at a time: implement it, run
the build, run the manual checks, commit, report. Do not start the next step
until the current one is verified.

1. **Scaffold.** Next.js (App Router) + TypeScript + Tailwind. The project
   folder/package name must be lowercase `rankdoors` (npm rejects capitals);
   the brand name shown in the site stays "RankDoors". Landing page with the
   four role cards (Student / Teacher / Parent / Admin) and the design
   system from the README (maroon theme, matched light/dark pair, floating
   theme toggle, 300 ms colour transition). Build must pass.
2. **Question bank.** Data model + seed questions + `/questions` page
   (answers hidden). Every seed question must have a verified answer key and
   explanation. A `pyqTag` is allowed only on a genuinely verified
   previous-year question. Include numerical-answer questions with a stored
   numerical answer.
3. **NTA-style test player** (`/test`): start/test/result phases, countdown
   timer (red under 5 minutes, auto-submit at 0), 4-colour question palette
   (white = not visited, red = visited-not-answered, green = answered,
   purple = marked for review, purple wins), answers saved only on
   Save & Next, confirm before submit, scoring +4/−1/0 with ±0.01 tolerance
   for numerical answers, review list with explanations.
4. **Demo login + role dashboards.** `/login` with demo accounts (exact
   match, session in localStorage, no password stored), a dashboard per
   role with a role guard ("Please login first" on mismatch) and Logout.
   Real Supabase auth comes later — do not build it in this step.
5. **Student dashboard.** Stat cards (total tests, last attempt date, last
   attempt score, best score) + My Scheduled Tests with the 5 status tabs
   (Active / Upcoming / Missed / Completed / Left In Between) and test
   windows (a test stays open between a start and end time, not at one
   instant). Sample data only.
6. **Attempt tracking.** The test player records per-question time spent
   and view counts, and saves the attempt (latest attempt + full attempt
   history) in localStorage.
7. **PAR report page** (`/report`): total score card, subject-wise marks,
   the 8 blueprint metrics (Questions, Answered, Correct, Correct Within
   Target Time, Incorrect, Visited But Not Answered, Not Visited, Viewed
   More Than Twice), "Choose Test Analysis" filter, question-level review
   with time, views, and explanations.
8. **CTR page** (`/ctr`): cumulative table across all attempts (Taken On,
   Exam, Description, Score, Highest Marks, Subject Marks, Highest Subject
   Marks, Rank as rank/total, Time Taken) + print-to-PDF via the browser
   print dialog. Batch comparison figures (Highest/Rank) are sample data
   until the real database exists — label them as such, never invent them
   as real.
9. **Teacher panel + TIPS-style test builder.** Filter by subject, chapter,
   topic, difficulty, pattern, used/unused; pick questions; paper summary;
   duration; schedule with a date/time window and batch targeting.
10. **Parent panel** (read-only child report) and **Admin panel** (users and
    batches management).
11. **Real data.** Replace demo logins and sample data with Supabase Auth +
    Postgres, keeping every screen working exactly as before.

## Working rules (non-negotiable)

- **Small steps, verified.** After every step: `npm run build` must pass,
  and you must list the exact manual checks for the owner to run.
  A step is not done until the owner confirms the checks.
- **Git is the safety net.** Commit after every verified step with a clear
  message (`RankDoors: <what changed>`). Never rewrite history, never force
  push.
- **Design tokens exactly as specified.** Maroon `#722F37`, header
  `#451E24`, stone/slate neutrals, matched light/dark pairs. Functional
  colours (test palette, status colours, difficulty badges) are never
  recoloured.
- **Honest labels only.** Percentile and rank are within the school batch
  only. Sample/batch figures are labelled "sample data". No fake PYQ tags.
- **No paid anything** without the owner asking. No deployment, no hosting
  setup, no domain purchase in this mission.
- **No secrets anywhere.** No password, API key, or token in chat, code,
  commits, or screenshots. Login credentials for any external portal are
  never requested or used.
- **English UI.** Code, comments, and UI text in English. (The owner speaks
  Hinglish in chat; that does not change the product language.)
- If a step fails, stop and report the exact error. Do not silently work
  around it with a different design, and do not invent data to make a
  check pass.

## After every step, report

Files created/edited · build result · the manual checks the owner should run
· anything you could not verify. Keep it short.
