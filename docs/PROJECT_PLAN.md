# RankDoors — Project Plan

> Product: a self-managed replacement for the school's paid CollegeDoors
> service. School: **Sagar Public School, Bhopal (Saket Nagar)**.
> Name/tagline: **RankDoors** / "Your Door to a Better Rank".

## 1. Why this exists

SPS currently uses CollegeDoors as a paid service (live portal:
`spssn.collegedoors.com`) and it costs the school a lot. The school wants to
self-handle the same capability. RankDoors is that redesign + redevelop:
same kind of test-and-analytics platform, owned by the school, with a
cleaner single-site design (the original splits its dashboard across two
different websites and leaves Home empty — RankDoors is one site, one design).

## 2. Scope

- **In scope:** Classes 9–12 only. Nursery–Class 8 is not a focus.
- **Main product:** JEE preparation. Classes 11–12 = full JEE Main;
  Classes 9–10 = JEE Foundation (Maths/Science).
- **Phase 2 only:** CBSE Boards features, JEE Advanced, WhatsApp parent
  reports, native mobile app.
- **Out of scope for v1:** payments/commerce, SMS gateways, camera OMR
  scanning, video calling (live classes are scheduled links only — Zoom/Meet,
  exactly as the original does it), multi-school tenancy (build with a
  `school_id` discipline from day one, but only one school is onboarded).

## 3. Users and roles

- **Student:** takes scheduled/self tests, views PAR/CTR, bookmarks
  questions, views announcements, manages own account (change password).
- **Teacher:** builds papers (TIPS-style), schedules tests for batches,
  uploads own questions, views PAR/BPR/CTR.
- **Parent:** read-only. Views the child's reports (CTR). Cannot reopen
  a test. Sees only their own child.
- **Admin/Master:** users, batches, and batch access management. Last panel
  to be built.

## 4. Phase 1 MVP features

1. NTA-style JEE Main test player (timer, palette, mark for review,
   auto-submit, instant scoring).
2. PCM chapter-wise question bank with PYQ tagging (verified tags only)
   and numerical-answer questions.
3. TIPS-style paper builder (teacher picks by subject/chapter/topic/
   difficulty/pattern, reviews, sets duration, schedules).
4. PAR report + percentile/rank **within the SPS batch only**, honestly
   labelled — never All-India.
5. Topic-wise weakness heatmap (from attempt data).
6. SPS-branded PDF papers (question paper + solutions + answer key).
7. Parent read-only view of the child's reports.
8. Scheduled tests with **test windows** and the 5 status tabs (see
   Reference Blueprint): Active / Upcoming / Missed / Completed /
   Left In Between.
9. Announcements module and bookmarked questions (with filters).

### Phase 1.5

Mistake Book / weak-topic practice sets, deeper analytics, announcements
list and bookmarked questions fully wired into the Mistake Book work.

### Phase 2

JEE Advanced (including partial marking), Boards add-on, WhatsApp parent
reports, PDF paper export polish (randomised sets), live-class scheduling
page (links only).

### Phase 3

Multi-campus, native app (PWA first), ATM-style auto paper generation
(stratified random by chapter/difficulty — labelled honestly, not claimed
to match real-exam calibration).

## 5. Screens / Pages

Landing (splash) · Login · Student Dashboard · My Scheduled Tests ·
PAR Report · CTR Report · Question Bank · Test Player · Announcements
(Latest Updates) · Bookmarked Questions · Change Password · Teacher
Dashboard + Paper Builder · Parent Dashboard (read-only report) ·
Admin Dashboard (users/batches) · Mission Admission / Explore (placeholder
list, as in the original).

## 6. Database design (planned — Supabase/Postgres at the end)

- `questions`: id, subject, chapter, topic, class_level, type
  (mcq_single / mcq_multi / numeric), difficulty, pattern, source
  (own/platform), pyq_year (null unless verified), body, options_json,
  correct_answer, `numerical_answer`, solution, used_count.
- `tests`: id, title, exam, mode (standard/tips/atm), duration_min,
  marking_scheme, `window_start`, `window_end`, scheduled_by, batch,
  status.
- `test_questions`: test_id, question_id, section, seq.
- `attempts`: id, test_id, student_id, started_at, submitted_at, status,
  score, max_score.
- `attempt_answers`: attempt_id, question_id, selected, is_correct,
  marks, time_spent_sec, visits, marked_review.
- `users`: id, role, name, login_id/email/contact, class/batch.
  `batches`, `batch_students`, `student_guardians` (parent mapping),
  `bookmarks`, `announcements`.

Sample/local data first; these tables are created when Supabase joins.

## 7. Test player specification

- Start screen → test screen → result screen.
- 30-minute timer for the sample test (configurable per test); red under
  5 minutes; auto-submit at 0.
- Palette: white = not visited, red = visited-not-answered, green =
  answered, purple = marked for review (purple wins over green/red).
- An answer is saved only when the student clicks Save & Next (or the
  equivalent save action) — clicking an option alone does not save it.
- Confirm dialog before submit. Scoring +4/−1/0; numerical answers with
  ±0.01 tolerance. Review list shows every question with the correct
  answer and explanation.
- The player records per-question time spent and view counts, and saves
  the attempt (latest + history) for the PAR/CTR pages.

## 8. Report specifications

### PAR (Performance Analysis Report, per test)

Total Score card; subject/section marks; question-level metric cards:
Questions, Answered, Correct, **Correct Within Target Time**,
Incorrect, Visited But Not Answered, Not Visited, **Viewed More Than
Twice**. "Choose Test Analysis" filter: All / Incorrect / Not Answered /
Correct / Partially Correct (partially-correct applies only to Advanced
patterns — omit it for JEE Main). Question-level review shows time spent,
view count, the student's answer, the correct answer, and the explanation.

### CTR (Cumulative Test Report, all tests)

Filters: Period From/To (PDF export capped at a 3-month range). Columns:
Test Scheduled On, Test Taken On, Exam, Test Description, Total Marks,
Highest Marks, Subject Marks, Highest Subject Marks, Rank shown as
`rank / total students who attempted`, Time Taken. Tests not taken show
"Absent" in red. Batch comparison figures are sample data until the real
database exists and must be labelled as such.

## 9. Design system

Matte school theme. Wine-maroon `#722F37` accent, deep-maroon `#451E24`
header band, warm stone neutrals + slate ink. Matched light/dark pair
(never pure black/white), floating theme toggle on every page, 300 ms
colour transition. Functional colours untouched (see README). Full token
pairs are listed in the README and in `ANTIGRAVITY.md`.

## 10. Reference Blueprint — School's Live Portal (explored Oct 2026)

> Source: view-only exploration of `spssn.collegedoors.com` on 2026-10-23
> (public pages + one student-pattern account, "HR DEP", member since Sep
> 2026 — most likely the school HR department's demo/test account). Zero
> changes were made: no test started, no form submitted, nothing edited.
> The teacher/admin side was **never seen** and must not be guessed at.
> This blueprint is the only source for inside-portal behaviour; do not
> attempt to log into the portal to re-check it.

### Public pages

- Splash landing: dark navy header bar, school logo top-left, single blue
  Login button top-right; centre = school crest, "SAGAR PUBLIC SCHOOL" in
  maroon, school motto line, school website text. Nothing else — no menus,
  no footer.
- Login card: school logo on top; ONE combined field "User Id/Email/
  Contact"; password field with eye show/hide toggle; pre-checked
  "Keep Me Logged In" checkbox (stays signed in 6 hours); full-width blue
  LOGIN button. No forgot-password link, no OTP, no role selection, no
  signup. A network-speed-check dialog fires on portal load.
- No public About/Contact/Terms/support pages; no "Powered by
  CollegeDoors" text anywhere. The only school-specific element is the
  logo asset itself — everything else is the generic white-label template.

### Student sidebar (after login), in this order

1. Mission Admission → Explore (university banner list — empty for
   this account).
2. Latest Updates — announcements: filters (update type, date, search) +
   table with columns Update, Date, Preview. ("No Updates Found".)
3. Home — school logo only.
4. Dashboard — jumps out to a legacy tests site: 4 stat cards (total
   Tests, Last Attempt Date, Last Attempt Score, Best Score) + tests
   table (Session Id, Test Mode, Date & Time, Exam Type, Test Name,
   Score, Time, View Syllabus, Notes, View Activities, View Report).
5. Reports → "View Test Sessions Activities" (lookup by Test Session ID)
   and "CTR".
6. My Scheduled Test — Desktop + Mobile help-video links; 5 tabs:
   Active / Upcoming / Missed / Completed / Left In Between. Columns:
   Scheduled Test Name, Scheduled By ("Sagar Public School - Saket
   Nagar"), Test Window Start Time, Test Window End Time, Test Duration,
   Paper Description, Comments, Action. A test stays open for a WINDOW
   of time (observed example: 03-Oct-2026 12:45 PM → 06-Oct-2026
   12:30 PM), not a single fixed start moment. Completed tests show
   "View Report". One completed test observed: "Physics FRT 3 October",
   60 min.
7. My Account → Bookmarked Questions (filters: Exam, Subject, Chapter,
   Difficulty; Download Excel; table: Test Id, Test Date Time, Bookmark
   Date Time, Subject, Chapter, Outcome, Comments, Actions — empty for
   this account) and Change Password (Old/New/Confirm, eye toggles).
- User menu (top-right): account name, "Member since" line, Sign out.
- **Not present in this account:** no study-material/library section, no
  live-classes section. Exam focus seen: JEE Main only (all CTR rows were
  JEE Main "FRT" Physics/Maths tests; 4 of 5 marked Absent in red).

### PAR and CTR (as observed)

See §8. Observed PAR example: Questions 25, Answered 22, Correct 21,
Correct Within Target Time 2, Incorrect 1, Visited But Not Answered 3,
Not Visited 0, Viewed More Than Twice 1.
