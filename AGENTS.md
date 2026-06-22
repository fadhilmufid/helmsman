# Agent Instructions

**Agents: read this file first.** Users: see [`README.md`](README.md).

General agent workflow for any project using this instruction set. **Read-only gate** — do not edit during normal project work. Rule templates live in [`instructions/`](instructions/). Project-specific config: [`project/`](project/).

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

## 0.5 Execution gates (hard STOP)

**No application work until each gate passes.** Gates are sequential — do not skip or reorder.

| Gate | Requirement | Blocks until complete |
|------|-------------|----------------------|
| **A — Read-first** | Read every file in §1 Gate A checklist (full read, not skim) | Any edit under `platforms/`, application source, `deploy/`, migrations, Dockerfiles, or target-project root `README.md` |
| **B — Clarify and record** | Resolve open decisions per §2; write `project/OVERVIEW.md`, `INFRASTRUCTURE.md`, `AGENTS.md`, `DESIGN.md` | Implementation edits |
| **C — Documents before code** | Create `project/documents/{feature-slug}/` with required files per [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md) | Application source, scaffold, `platforms/`, `deploy/` |
| **D — Task before code** | Create `project/tasks/{timestamp}_{task-slug}.md` with `Status: planning`, filled Approach + steps, and **Context read** listing every file from Gate A | Setting `Status: in_progress` or any implementation edit |
| **E — Quality bar** | Build per §2.5 during and after implementation | Marking task or bootstrap complete |

**Gate D unlocks code:** Set `Status: in_progress` only after Gates A–C pass. List every file read in the task **Context read** section.

**Exceptions:** Instruction-pack maintenance in this repo (`instructions/`, root `AGENTS.md`, tracked `project/*/README.md`) — not target application work.

---

## 1. Before You Start (Gate A checklist)

Complete **every item** before Gate B. Read each file in full — do not skim.

1. Resolve mode per **§0**
2. [`instructions/README.md`](instructions/README.md) — index and terminology
3. Active mode guide: [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) or [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md)
4. [`instructions/INFRASTRUCTURE.md`](instructions/INFRASTRUCTURE.md), [`instructions/TASK.md`](instructions/TASK.md), [`instructions/CODE.md`](instructions/CODE.md), [`instructions/DESIGN.md`](instructions/DESIGN.md), [`instructions/HISTORY.md`](instructions/HISTORY.md), [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md)
5. [`other-references/`](other-references/) — read all content when folder is non-empty (see [`other-references/README.md`](other-references/README.md))
6. [`project/OVERVIEW.md`](project/OVERVIEW.md) → [`project/INFRASTRUCTURE.md`](project/INFRASTRUCTURE.md) → [`project/AGENTS.md`](project/AGENTS.md) → [`project/DESIGN.md`](project/DESIGN.md) when those files exist
7. [`project/histories/`](project/histories/) — newest entries first
8. [`project/tasks/`](project/tasks/) — active or blocked tasks (`planning`, `blocked`, `in_progress`)
9. [`project/documents/{feature}/`](project/documents/) — all files for the feature in scope
10. **Brownfield:** if `project/*` is missing or stale, run discovery per [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md) — discovery is part of Gate A, not a substitute for Gates C–D

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
| Purpose and scope | What the app/feature does; delivery scope and quality expectations |
| Feature docs | Which `project/documents/` files per [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md) — when building or changing features |
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

1. Write decisions to the right `project/*` files (`OVERVIEW`, `INFRASTRUCTURE`, `AGENTS`, `DESIGN`) and `project/documents/{feature}/` when building a feature
2. Record answers in the active `project/tasks/` file Clarification log
3. Then proceed per active mode guide

### When clarification can be skipped

- The user already specified the detail in the current message or a prior turn
- `project/*` already documents it and the task does not change it
- Truly trivial typo or format-only edits with zero behavioral or config impact

---

## 2.5 Build quality standard

**Default to full production quality — never strip down to MVP, stubs, or skeleton unless the user explicitly asks for MVP.**

| Rule | Detail |
|------|--------|
| **Within the user's ask** | Implement completely and production-ready — not bare minimum |
| **No placeholders** | No stub pages, placeholder handlers, or "TODO later" for in-scope features |
| **UI states** | Full error, loading, and empty states per [`instructions/DESIGN.md`](instructions/DESIGN.md) |
| **API quality** | Production baseline per [`instructions/CODE.md`](instructions/CODE.md) section 16; response `code` per section 8 |
| **CRUD completeness** | When entity management is in scope, full UX per CODE section 11 — every page and flow documented and built |
| **Proactive improvements** | Add sensible enhancements (validation, accessibility, observability, seed data) that raise quality without changing the core goal — record in task Clarification log or `project/documents/` |
| **Scope changes** | Do not expand the core goal without user confirm |

### Production bar by domain

| Domain | Instruction file | Production expectation |
|--------|------------------|------------------------|
| UI / UX | [`instructions/DESIGN.md`](instructions/DESIGN.md) | Polished mobile-first UI; loading/error/empty; accessible components; no wireframe pages |
| Infrastructure | [`instructions/INFRASTRUCTURE.md`](instructions/INFRASTRUCTURE.md) + [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) | Healthchecks, backup/restore, env examples, startup order — not dev-only compose |
| Code / API | [`instructions/CODE.md`](instructions/CODE.md) §8, §11, §16 | Full CRUD, response codes, validation, auth, pagination, logging |
| Specs | [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md) | Specs describe production flows and error cases — not happy-path-only |
| Plans | [`instructions/TASK.md`](instructions/TASK.md) | Verification steps include production checks per domain |
| Change log | [`instructions/HISTORY.md`](instructions/HISTORY.md) | Entries note when production bar was met or gaps remain |

---

## 3. Task Before Build (Gate D)

**Mandatory** for every non-trivial user request per [`instructions/TASK.md`](instructions/TASK.md). `Status: in_progress` is **forbidden** until Gates A–C pass.

1. **Before** first meaningful code or config edit: create `project/tasks/{timestamp}_{task-slug}.md` with `Status: planning`
2. **Context read** — list every instruction and project file read in Gate A (not empty)
3. **Draft** Approach, change-oriented steps (what/where/why per file), paths in scope, and Files expected to change
4. **Confirm** — required for greenfield bootstrap and any request that creates new apps; also when scope is large or ambiguous — present plan summary and wait for user approval (per section 2)
5. **Execute** — set `Status: in_progress` only after Gates A–C pass; check off steps one at a time; update `Status` when blocked
6. **After** work: set `Status: complete`; append `project/histories/` entry linking back to the task file

Do not rewrite completed task files — append a new task or HISTORY entry to correct mistakes.

---

## 4. Testing Instructions

- Run lint and test per app — commands in [`project/AGENTS.md`](project/AGENTS.md)
- Run migrations against a test DB before integration tests (when DB in scope)
- All tests green before merge
- Add or update tests for code you change
- **Greenfield:** verify compose/build per [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) after Docker or deploy changes

### Greenfield testing standard

When bootstrapping per [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md), do not mark complete without:

- Integration tests for critical endpoints/features — no marking complete with failing or missing critical tests
- Lint + typecheck green per app (see [`instructions/CODE.md`](instructions/CODE.md) section 15)
- E2E smoke test when web is in scope

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
- Feature work: update `project/documents/{feature}/` per [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md) when applicable
- `project/` workflow files are local and gitignored — do not commit `project/histories/`, `project/tasks/`, or `project/documents/` entries

---

## 6. Agent checklist

Before starting:

1. **Gate A** — every file in §1 read in full (listed in task Context read)?
2. **Gate B** — clarify complete; `project/OVERVIEW.md`, `INFRASTRUCTURE.md`, `AGENTS.md`, `DESIGN.md` written?
3. **Gate C** — `project/documents/{feature}/` exists with required files per DOCUMENT.md?
4. **Gate D** — task file created with `Status: planning`; steps drafted before `in_progress`?
5. Mode resolved per §0 (or recorded in `project/OVERVIEW.md`)?
6. Unspecified decisions resolved per section 2?
7. User confirmed plan for greenfield bootstrap or new-app creation (when applicable)?

During work:

8. **Gate E** — building at full production quality per §2.5 (not stubs or bare minimum)?
9. Follow paths and stack from [`project/INFRASTRUCTURE.md`](project/INFRASTRUCTURE.md)
10. **Greenfield:** four concerns per [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md); **brownfield:** adapt existing conventions per [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md)
11. New env vars → update paths listed in project
12. Task file steps checked off and `Status` kept current

After work:

13. Followed [`instructions/CODE.md`](instructions/CODE.md) (block comments + inline journal per §1–2) and [`instructions/DESIGN.md`](instructions/DESIGN.md) on touched code?
14. Post-edit verification per [`instructions/CODE.md`](instructions/CODE.md) section 15 — zero errors on changed files/apps?
15. [`project/documents/`](project/documents/) updated for feature work, or consciously skipped per [`instructions/DOCUMENT.md`](instructions/DOCUMENT.md)?
16. Task file `Status: complete` with verification checklist done?
17. Append `project/histories/{timestamp}_{title}.md` per [`instructions/HISTORY.md`](instructions/HISTORY.md)
18. Update `project/*` only if project requirements changed — never edit `instructions/` templates unless user asks
19. Never commit `.env`, `.tar` files, or backup dumps

### Greenfield bootstrap only

When bootstrapping per [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md), also verify Definition of Done (GREENFIELD §5):

20. Deploy path works — services healthy
21. Migrations and seeds (when applicable)
22. Delivery-scope features work at full quality — polished UX, all documented flows, not skeleton; auth when required
23. Build/backup scripts (when using GREENFIELD pipeline)
24. Root `README.md` per GREENFIELD §7 (or equivalent) — user-facing app description

### Brownfield onboarding only

When adopting an existing repo per [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md), verify BROWNFIELD §5 onboarding gates.
