# Agent Instructions

**System: read this file first.** Users: see [`README.md`](README.md).

General system workflow for any project using this instruction set. **Read-only gate** — do not edit during normal project work. Rule templates live in [`instructions/`](instructions/). Project-specific config: [`project/`](project/).

---

## 0. Choose mode (first)

Resolve **greenfield** vs **brownfield** before clarify, scaffold, or large edits.

| Mode | When | Primary guide |
|------|------|---------------|
| **Greenfield** | User wants a **new** app or full greenfield bootstrap | [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) |
| **Brownfield** | Instructions dropped into an **existing** codebase; understand, document, or change what exists | [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md) |

### When mode is already clear

| User signal | Mode |
|-------------|------|
| *"Create … app"*, *"build from scratch"*, empty repo + new product | Greenfield |
| *"Understand this repo"*, *"document the codebase"*, substantial existing app code | Brownfield |
| Feature work in repo with populated `project/*` | Use recorded mode in `project/OVERVIEW.md` or infer from context |

### When ambiguous — ask once

Use structured questions (e.g. Cursor `AskQuestion`) in **one batch**:

| Question | Options | Recommended |
|----------|---------|-------------|
| Project mode | Greenfield (new app) / Brownfield (existing codebase) | **Brownfield** if substantial app code exists and user did not ask to create a new app; **Greenfield** if repo is empty or user explicitly wants a new app |

After mode is known:

- **Greenfield** → read [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md); `platforms/` layout applies; full greenfield clarify checklist
- **Brownfield** → read [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md); discovery first; do **not** assume `platforms/` or instruction layout

Record mode in `project/OVERVIEW.md` when writing project config.

---

## 1. Before You Start

1. Resolve mode per **§0**; read [`instructions/README.md`](instructions/README.md) for index and terminology
2. Read active mode guide: [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) or [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md)
3. Read [`instructions/INFRASTRUCTURE.md`](instructions/INFRASTRUCTURE.md), [`instructions/TASK.md`](instructions/TASK.md), [`instructions/CODE.md`](instructions/CODE.md), [`instructions/DESIGN.md`](instructions/DESIGN.md), [`instructions/HISTORY.md`](instructions/HISTORY.md), [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md)
4. Scan [`ai_references/`](ai_references/) when it has user-provided content (see [`ai_references/README.md`](ai_references/README.md))
5. Read [`project/OVERVIEW.md`](project/OVERVIEW.md) → [`project/INFRASTRUCTURE.md`](project/INFRASTRUCTURE.md) → [`project/AGENTS.md`](project/AGENTS.md) → [`project/DESIGN.md`](project/DESIGN.md) when those files exist locally
6. **Brownfield:** if `project/*` is missing or stale, run discovery per [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md) before large edits
7. Scan [`project/history/`](project/history/) newest first for recent context
8. Scan [`project/task/`](project/task/) for active or blocked tasks (`planning`, `blocked`, `in_progress`)
9. When working on a known feature, scan [`project/document/{feature}/`](project/document/) for existing specs

---

## 2. Clarify Before Build

**Ask first, code second.** On every task, scan what the user request and existing `project/*` files do **not** specify. Do not write or edit application code, deploy config, or `project/` config (except to record answers and task plans) until every unspecified decision needed for the task is resolved.

If the user says *"use your recommendations"*, *"you decide"*, or similar — apply documented defaults from the **active mode guide**, record them in `project/*`, then proceed.

**Mode guides do not bypass clarify.** Wait for confirmation or explicit delegation before meaningful implementation.

### How to ask

- Use structured questions when multiple valid options exist
- Send **one batch** of related questions per turn — do not drip-feed across many turns unless the user answers partially
- Every question must state: what is missing, why it matters (which rule or file it affects), and a **Recommended:** default

### Clarification checklist — shared (both modes)

| Area | What to resolve |
|------|-----------------|
| Purpose and scope | What the app/feature does; MVP or change boundaries |
| Feature docs | Which `project/document/` files per [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md) — when building or changing features |
| Data conventions | Per [`instructions/CODE.md`](instructions/CODE.md) section 11 when writing new domain entities |
| API conventions | Per [`instructions/CODE.md`](instructions/CODE.md) section 8 when adding or changing APIs |
| CRUD scope | Per CODE §11 when adding entity management UI/API |

### Clarification checklist — greenfield only

| Area | What to resolve | Typical recommendation |
|------|-----------------|------------------------|
| Project slug | `{project}` name | Kebab-case from app name |
| Platform apps | `platforms/<app>/` slugs and roles | Per [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) §1 — user-chosen stack |
| Stack | Framework per app | **Ask every greenfield task** — user choice; scaffold per CODE §9 |
| Auth | Needed? Type? | Required for multi-user apps; per CODE §9 |
| Database | Engine, hosting, path | User choice; document in `project/INFRASTRUCTURE.md` |
| Migrations | Path | Inside backend (GREENFIELD default) unless user requests standalone runner |
| Docker | Dockerfile location per app | Scaffold path or `platforms/<app>/docker/` |
| Deploy | Target environment | `deploy/` per GREENFIELD after clarify |
| Design | Theme, component library | `project/DESIGN.md` per [`instructions/DESIGN.md`](instructions/DESIGN.md) |

### Clarification checklist — brownfield only

| Area | What to resolve | Typical recommendation |
|------|-----------------|------------------------|
| Onboarding needed? | Is `project/*` populated and trustworthy? | Run discovery if missing or contradicts repo |
| Change scope | Which apps/paths are in scope for this task? | From `project/INFRASTRUCTURE.md` or discovery |
| Conventions | Follow existing patterns or align to CODE/DESIGN? | **Adapt** by default; align only if user requests |
| Restructure? | Impose `platforms/` or new layout? | **No** unless user explicitly asks |

### After answers

1. Write decisions to the right `project/*` files (`OVERVIEW`, `INFRASTRUCTURE`, `AGENTS`, `DESIGN`) and `project/document/{feature}/` when building a feature
2. Record answers in the active `project/task/` file Clarification log
3. Then proceed per active mode guide

### When clarification can be skipped

- The user already specified the detail in the current message or a prior turn
- `project/*` already documents it and the task does not change it
- Truly trivial typo or format-only edits with zero behavioral or config impact

---

## 3. Task Before Build

Create and maintain a **plan-mode** task file per [`instructions/TASK.md`](instructions/TASK.md) for every non-trivial user request.

1. **Before** first meaningful code or config edit: create or open `project/task/{timestamp}_{task-slug}.md` with `Status: planning`
2. **Draft** Approach, change-oriented steps (what/where/why per file), paths in scope, and Files expected to change
3. **Confirm** — for large or ambiguous scope, present plan summary and wait for user approval (per section 2)
4. **Execute** — set `Status: in_progress`; check off steps one at a time; update `Status` when blocked
5. **After** work: set `Status: complete`; append `project/history/` entry linking back to the task file

Do not rewrite completed task files — append a new task or HISTORY entry to correct mistakes.

---

## 4. Testing Instructions

- Run lint and test per app — commands in [`project/AGENTS.md`](project/AGENTS.md)
- Run migrations against a test DB before integration tests (when DB in scope)
- All tests green before merge
- Add or update tests for code you change
- **Greenfield:** verify compose/build per [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) after Docker or deploy changes

### Greenfield minimum

When bootstrapping per [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md), do not mark complete without:

- Integration tests for critical endpoints/features
- Lint + typecheck green per app (see [`instructions/CODE.md`](instructions/CODE.md) section 15)
- Optional E2E smoke test when web is in scope

CI: add `.github/workflows/ci.yml` at `{root}` when ready; document path in `project/AGENTS.md`.

---

## 5. PR Instructions

- Title format: see [`project/AGENTS.md`](project/AGENTS.md) — typically `[{project}] <Title>`
- Run lint and test before committing
- Docker/deploy changes: verify build locally per project docs
- DB schema changes: migration in documented path + backup note in PR
- New env vars: update relevant `.env.example` and compose/config files
- UI: comply with [`project/DESIGN.md`](project/DESIGN.md)
- Code: comply with [`instructions/CODE.md`](instructions/CODE.md)
- Feature work: update `project/document/{feature}/` per [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md) when applicable
- `project/` workflow files are local and gitignored — do not commit `project/history/`, `project/task/`, or `project/document/` entries

---

## 6. System checklist

Before starting:

1. Mode resolved per §0 (or recorded in `project/OVERVIEW.md`)?
2. Read [`instructions/README.md`](instructions/README.md) and active mode guide
3. Read local `project/*` if present; **brownfield:** run discovery if missing
4. Scan `project/task/`, `project/history/`, `project/document/{feature}/`
5. Read [`instructions/CODE.md`](instructions/CODE.md) before writing code; [`project/DESIGN.md`](project/DESIGN.md) before UI work
6. Unspecified decisions resolved per section 2?
7. Task file created or opened per section 3?

During work:

8. Follow paths and stack from [`project/INFRASTRUCTURE.md`](project/INFRASTRUCTURE.md)
9. **Greenfield:** four concerns per [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md); **brownfield:** adapt existing conventions per [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md)
10. New env vars → update paths listed in project
11. Task file steps checked off and `Status` kept current

After work:

12. Followed [`instructions/CODE.md`](instructions/CODE.md) (block comments + inline journal per §1–2) and [`instructions/DESIGN.md`](instructions/DESIGN.md) on touched code?
13. Post-edit verification per [`instructions/CODE.md`](instructions/CODE.md) section 15 — zero errors on changed files/apps?
14. [`project/document/`](project/document/) updated for feature work, or consciously skipped per [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md)?
15. Task file `Status: complete` with verification checklist done?
16. Append `project/history/{timestamp}_{title}.md` per [`instructions/HISTORY.md`](instructions/HISTORY.md)
17. Update `project/*` only if project requirements changed — never edit `instructions/` templates unless user asks
18. Never commit `.env`, `.tar` files, or backup dumps

### Greenfield bootstrap only

When bootstrapping per [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md), also verify Definition of Done (GREENFIELD §5):

19. Deploy path works — services healthy
20. Migrations and seeds (when applicable)
21. MVP features work; auth when required
22. Build/backup scripts (when using GREENFIELD pipeline)
23. Root `README.md` per GREENFIELD §7 (or equivalent) — user-facing app description

### Brownfield onboarding only

When adopting an existing repo per [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md), verify BROWNFIELD §5 onboarding gates.
