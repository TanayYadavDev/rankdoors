# RankDoors — Your Door to a Better Rank

A self-managed JEE test + analytics platform for **Sagar Public School, Bhopal (Saket Nagar)**, Classes 9–12.

RankDoors is a cost-saving replacement for the school's paid CollegeDoors service
(the school's live white-label portal is `spssn.collegedoors.com`). The school
currently pays a lot for that platform; RankDoors lets the school run the same
kind of system itself.

> **Status (31 Oct 2026):** Fresh restart. This repository was created empty of
> application code. It is being rebuilt from scratch with **Google Antigravity**.
> Deployment comes later — nothing here is deployed yet.

## Locked decisions

| Decision | Choice |
|---|---|
| Product name / tagline | **RankDoors** / "Your Door to a Better Rank" |
| School | Sagar Public School, Bhopal — Nursery–12 school; this product covers Classes 9–12 only |
| Main product | JEE preparation. Classes 11–12: full JEE Main. Classes 9–10: JEE Foundation (Maths/Science) |
| Phase 2 only | CBSE Boards features, JEE Advanced, WhatsApp parent reports |
| Stack | Next.js (App Router) + TypeScript + Tailwind CSS. Supabase (Postgres + Auth) joins at the end — see plan |
| Data first | Build the full flow on sample/local data first. Real database and real auth are deferred, not skipped |
| Deployment | Later. Do not deploy until the owner says so |
| Cost rule | No paid service, API, or model may be added without the owner asking for it |

## Design — matte school theme

Maroon is the school's colour (the school uniform / school theme). The design
system is a **matched light/dark pair** — same colour family in both themes,
never pure black or pure white, so it never hurts the eyes:

- Accent (buttons, links, highlights): matte wine-maroon `#722F37`
  (hover `#5F272E`; in dark mode hover `#8A3B44`)
- Header band: deep maroon `#451E24` (dark mode `#38161C`)
- Page background: warm off-white `stone-50` / dark `#0F172A`
- Cards: white / dark `slate-800`; headings `slate-800` / dark `slate-100`;
  body text `slate-600` / dark `slate-300`; borders `stone-200` / dark `slate-700`
- A floating theme toggle (🌙/☀️) appears on every page, remembers the choice,
  and colours fade over 300 ms instead of jumping instantly
- **Functional colours are never recoloured:** the test-player palette
  (green = answered, red = visited-not-answered, purple = marked for review),
  red "Missed"/"Absent" text, and question-bank difficulty badges stay exactly
  as they are — those colours carry meaning, not decoration

## Roles

Student · Teacher · Parent (read-only reports) · Admin/Master (last).

Build order for panels: Teacher first, then Student, then Parent, then Admin —
except the student reporting pages (PAR, CTR) follow the student dashboard,
because their blueprint is fully mapped. See `docs/PROJECT_PLAN.md`.

## How to work in this repo

**If you are Antigravity (or any coding agent): read `ANTIGRAVITY.md` first.**
It is the mission pack: research phase, build phases, working rules, and the
checklist to report after every step. The project plan lives in
`docs/PROJECT_PLAN.md`; the starting research brief to verify is in
`docs/RESEARCH_BRIEF.md`.

## Hard rules

- **Never change anything on the live portal** `spssn.collegedoors.com`.
  It is view-only reference material. The inside-portal blueprint in
  `docs/PROJECT_PLAN.md` is the only source for how it behaves behind login —
  Antigravity must not try to log into it.
- **Never ask for, accept, or store a password or API key in chat or in code.**
- Never invent a fact about the original platform: no question-bank size, no
  current price, no fake "PYQ" tag on a question that is not a verified
  previous-year question. Percentile/rank is always **within the school batch
  only**, honestly labelled — never "All-India".
- Small verified steps. The build must pass after every step, and every step
  ends in a git commit. A step is done only when its manual checks pass.

## License

MIT — see `LICENSE`.
