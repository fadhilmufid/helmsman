# Task Plans

**Integration:** TASK is Gate E — expands Gate D blueprint ([`PLAN.md`](PLAN.md)). Every implementation step needs **Plan ref** + **Spec ref** + **Code ref**. Re-read [`CODE.md`](CODE.md) at task start per [`RULES.md`](RULES.md) §8.

Rules for **exhaustive standalone** task files in [`project/tasks/`](../project/tasks/). One task per request — unlimited steps, no parent/child split. **Read-only template**.

Related: [`RULES.md`](RULES.md), [`PLAN.md`](PLAN.md), [`../AGENTS.md`](../AGENTS.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`HISTORY.md`](HISTORY.md), [`DOCUMENT.md`](DOCUMENT.md), [`CODE.md`](CODE.md), [`DESIGN.md`](DESIGN.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md).

## 1. Purpose

Forward-looking **change plan** for a single user request — distinct from other project doc layers:

| | PLAN | TASK | DOCUMENT | HISTORY |
|---|------|------|----------|---------|
| **What** | Blueprint: platforms, phases, E2E | Exhaustive standalone execution steps | Feature specs | Change log |
| **When** | Gate D | Gate E | Gate C | After Gate F |
| **Shape** | One file per request | **One standalone file** — exhaustive step list | Folder per feature | One file per event |

### Blueprint vs task vs execution

| | PLAN (`project/plans/`) | TASK (`project/tasks/`) | Execution |
|---|-------------------------|-------------------------|-----------|
| **When** | Gate D — after specs | Gate E — after plan | After TASK `in_progress` |
| **Output** | Platform inventory, phases, E2E matrix | **Exhaustive** file-level steps (no step ceiling) | Code, config, history |
| **Granularity** | Phases and platforms | One deliverable per step — as many steps as needed | Check off TASK steps |

- TASK file = **standalone exhaustive execution plan** derived from Gate D blueprint — **one file per user request**
- Spend Gate E drafting **maximum detail** — 50, 100, or 200+ steps is expected for large bootstrap; more steps is better
- `Status: planning` until steps are written; `in_progress` only after Gates A–D
- **Change-oriented steps** — every step names files/paths and describes the change, not vague goals
- **Ask when blocked** — one batch with **Recommended:** default per [`AGENTS.md`](../AGENTS.md) section 3

## 1.5 Task step format (required)

Each step must be **change-oriented**:

```markdown
1. [ ] **{path}** — {what to change and why}
   - Plan ref: project/plans/...#{section}
   - Spec ref: project/documents/... or project/design/...
   - Code ref: instructions/CODE.md §1-2 (always on app source); §8 if API; §11 if CRUD; §9 if auth
   - Before: {current behavior or "new file"}
   - After: {target behavior}
   - Verify: {command or check}
```

**Good (greenfield):** `platforms/api/internal/handlers/todo.go` — add handler; verify per `project/AGENTS.md`

**Good (brownfield):** `backend/src/routes/orders.ts` — add route; verify per `project/AGENTS.md`

**Bad:** "Implement delete API"

List paths in scope from `project/INFRASTRUCTURE.md` (e.g. `platforms/api/` greenfield, or `backend/` brownfield).

## 1.6 Execution gates (hard STOP)

Mirror [`AGENTS.md`](../AGENTS.md) §1.5 and [`RULES.md`](RULES.md) §2.

| Forbidden until gate passes | Requirement |
|----------------------------|-------------|
| Creating TASK file | Gate D — `project/plans/{slug}.md` exists with platform inventory and E2E matrix |
| `Status: in_progress` | Gate A — Context read lists every file read (not empty) |
| `Status: in_progress` | Gate C — documents + design (when UI) complete |
| `Status: in_progress` | Coding task: **re-read `instructions/CODE.md`** for scope; sections listed in Context read ([`RULES.md`](RULES.md) §8) |
| `Status: in_progress` | Plan ref + spec ref + code ref (on app source steps); §1.7 granularity |
| Marking application-source step complete | Touched file passes CODE §1–2 (block comment + inline journal) |
| `Status: in_progress` | **Files expected to change** table matches implementation steps 1:1 (§1.8); exhaustive scope covered |
| Any application code edit | Gates A–D complete; user confirmed for bootstrap/new apps |

**User confirm required** for greenfield bootstrap and any request that creates new apps — not only when scope is "large or ambiguous."

## 1.7 Step granularity (hard default)

**One step = one deliverable** — a single file, migration, route, page, component, or compose service. Not a folder wildcard.

| Rule | Detail |
|------|--------|
| **Forbidden** | `all API routes`, `Drive UI components`, `pages (drive, docs, auth)`, paths ending in `/**` |
| **Spec ref required** | Every step links `project/documents/...` or `project/design/...` |
| **Plan ref required** | Every step links a section in `project/plans/...` |
| **Code ref required** | Every step that touches application source links `instructions/CODE.md` sections |
| **Bootstrap minimum** | Greenfield bootstrap must list **every** planned file/route/page/component/platform slug as its own step in **this task file** |
| **Entity coverage** | Each DB model/migration, API route, page, and shared component → own step |

**Bad:**

```markdown
6. [ ] **platforms/kardus/src/app/api/** — all API routes
7. [ ] **platforms/kardus/src/components/** — Drive UI components
```

**Good:**

```markdown
6. [ ] **platforms/kardus/src/app/api/files/route.ts** — GET list, POST upload
   - Plan ref: project/plans/20260622_bootstrap-kardus.md#phase-api
   - Spec ref: project/documents/kardus-drive/api-specification-document.md
   - Code ref: instructions/CODE.md §1-2, §8
   - Before: new file
   - After: paginated list + multipart upload handler
   - Verify: curl + integration test per project/AGENTS.md
```

Group steps by phase: Clarify → Docs → Design → **Service platforms** → Apps → Wire compose → **E2E verify** — all inside **one task file**.

## 1.8 Exhaustive task (hard default)

**One standalone task with as many steps as needed** — never split because the list is long.

| Rule | Detail |
|------|--------|
| **Default** | Single `project/tasks/{timestamp}_{slug}.md` covering the **full** scope of the user request |
| **Planning time** | Over-specify steps during `Status: planning` — agents should enumerate every deliverable, not summarize |
| **Derive from** | Plan platform inventory + `project/documents/` + `project/design/` + **Files expected to change** table |
| **No step ceiling** | Step count is not a reason to split; add more steps to the same file |
| **Coverage** | Every row in **Files expected to change** must have a matching implementation step (or justify merges in Decisions) |
| **Phases** | Group steps by phase inside one file — do not create separate task files per phase |
| **Forbidden** | Parent/child task files; splitting at N steps; folder-wildcard steps; "implement later" placeholders |

### Standalone only

- One `project/tasks/{timestamp}_{slug}.md` per user request — update in-progress file instead of duplicating
- Never `parent`, `child`, or `-phase-` task filenames
- Huge scope → more steps in the **same file**, not a new task file

## 2. When to Create a Task File

**Required** after Gate D plan exists for any non-trivial request that will touch:

- Application source (paths from `project/INFRASTRUCTURE.md`)
- Deploy, build, or container config (when applicable)
- Database schema, migrations, or seeds
- `project/` config, feature docs, or instruction templates (when user explicitly requests template updates)

Includes greenfield bootstrap, brownfield onboarding, new features, refactors, and multi-file fixes.

**Optional to skip** — same bar as [`HISTORY.md`](HISTORY.md): trivial typo or format-only edits with zero behavioral impact.

**Never** create duplicate task files for the same active request — update the existing in-progress task instead.

## 3. Filename Format

```
{timestamp}_{task-slug}.md
```

| Part | Rule |
|------|------|
| `timestamp` | Server time: `YYYYMMDD_HHmmss` (24-hour, zero-padded) — same as HISTORY |
| `task-slug` | Lowercase kebab-case, words separated by `-`, no spaces, max ~60 chars |
| Location | `project/tasks/{timestamp}_{task-slug}.md` |

**Example:** `project/tasks/20260622_143052_bootstrap-app.md`

### Finding task files

| Goal | How |
|------|-----|
| **Latest task** | Sort `project/tasks/` filenames **descending** |
| **Active work** | Read newest files with `Status: planning`, `blocked`, or `in_progress` |
| **Correct a mistake** | Append a new task file or HISTORY entry — never rewrite completed task files |

## 4. Entry Body Template

```markdown
# {Human-readable task title}

- **Timestamp:** {ISO-8601 datetime matching filename}
- **Status:** planning | blocked | in_progress | complete | cancelled
- **Plan ref:** project/plans/{timestamp}_{slug}.md
- **User request:** {verbatim or summary}
- **Scope:** {apps/paths from project/INFRASTRUCTURE.md} | docker | deploy | docs | document | task | multi
- **Paths in scope:** `{path}/`, ... (from `project/INFRASTRUCTURE.md`)

## Context read

- `instructions/CODE.md` — **re-read §{list} for this task** (required when touching application source; §1–2 always)
- `instructions/RULES.md`, `PLAN.md`, `README.md`, active mode guide, `INFRASTRUCTURE.md`, `TASK.md`, `DESIGN.md`, `HISTORY.md`, `DOCUMENT.md` — all read
- `project/plans/{slug}.md` — {plan read; created before this task}
- `other-references/` — {entries read, or "empty"}
- `project/OVERVIEW.md`, `project/INFRASTRUCTURE.md`, `project/AGENTS.md`, `project/DESIGN.md` — {read or "not yet created"}
- `project/design/` — {all required files read, or "created this task"; N/A if no web UI}
- `project/histories/` — {entries scanned}
- `project/documents/{feature}/` — {all files read, or "created this task"}
- `project/tasks/` — {prior related tasks if any}

## Clarification log

| Question | Recommended | User answer | Recorded in |
|----------|-------------|-------------|-------------|
| {what is missing} | {default choice} | {user reply} | project/OVERVIEW.md, etc. |

## Decisions

- {Locked choices before implementation}

## Approach

{1–3 sentences: strategy, which paths/apps are touched}

## Implementation steps

**Exhaustive — minimum one step per file.** Group by phase inside this single task file. Enumerate every deliverable before `in_progress`.

### Phase: {name}

1. [ ] **{path}** — {change summary}
   - Plan ref: project/plans/...#{section}
   - Spec ref: project/documents/... or project/design/...
   - Code ref: instructions/CODE.md §... (required when path is application source)
   - Before: ...
   - After: ...
   - Verify: ...

### Phase: E2E verify

1. [ ] **deploy/docker-compose.yml** — local cycle
   - Plan ref: project/plans/...#e2e-local
   - Verify: compose up → health → smoke → compose down
2. [ ] **deploy/platforms/** — deploy cycle (greenfield bootstrap)
   - Plan ref: project/plans/...#e2e-deploy
   - Verify: build all images → save → load → compose up → smoke

## Files expected to change

| Path | Change |
|------|--------|
| `{app-path}/...` | ... |
| `deploy/...` | ... (when applicable) |

## Open questions

- {If blocked: question, why it matters, **Recommended:** default}

## Verification

- [ ] CODE.md re-read at task start; sections listed in Context read
- [ ] Every step has Code ref on application-source steps
- [ ] Every touched source file: block comment + Var/Logic inline journal per CODE §1–2
- [ ] CODE §14 agent checklist passed for touched code
- [ ] Every step has Plan ref to `project/plans/`
- [ ] Every step has Spec ref to `project/documents/` or `project/design/`
- [ ] Task is standalone — no parent/child split (§1.8)
- [ ] Step count covers full scope — no step-count ceiling (§1.8)
- [ ] Files expected to change table matches implementation steps 1:1
- [ ] No folder-wildcard steps (§1.7)
- [ ] **Local E2E:** compose up → health → smoke → compose down (when compose exists)
- [ ] **Deploy E2E:** build all platform images → save → load → compose up → smoke (greenfield bootstrap)
- [ ] Lint/typecheck per [`CODE.md`](CODE.md) section 15
- [ ] Tests run
- [ ] Production-grade UI per [`DESIGN.md`](DESIGN.md) (states, responsive, modals)
- [ ] Production-grade infra per [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) / [`GREENFIELD.md`](GREENFIELD.md) (health, env, backup when in scope)
- [ ] Production-grade API per [`CODE.md`](CODE.md) §8, §11, §16
- [ ] No in-scope stubs or MVP shortcuts unless user explicitly requested MVP
- [ ] `project/documents/` updated if feature work
- [ ] `project/histories/{timestamp}_{title}.md` appended
- [ ] Task status → `complete`

## Related

- `project/plans/...`
- `project/histories/...`
- `project/documents/...`
- `project/tasks/...` (prior tasks if relevant)
```

### Status values

| Status | Use when |
|--------|----------|
| `planning` | Drafting Approach and steps — no implementation edits yet |
| `blocked` | Waiting on user answer or external dependency |
| `in_progress` | Executing plan steps |
| `complete` | All steps and verification done; HISTORY entry appended |
| `cancelled` | User abandoned or superseded the request |

### Scope field

Use **paths and app slugs** from `project/INFRASTRUCTURE.md`. Add `docker`, `deploy`, `docs`, `document`, `task`, or `multi` as needed.

## 5. Agent Workflow (plan mode sequence)

1. **Plan exists** (Gate D) — `project/plans/...` with platform inventory?
2. **CODE.md re-read** — sections listed in Context read when task touches application source?
3. **Draft exhaustive task** (`Status: planning`) — enumerate **every** deliverable; match Files expected to change
4. **Clarify** — Open questions → Clarification log
5. **Confirm** — greenfield bootstrap / new apps / large scope
6. **Execute** (`Status: in_progress`) — after Gates A–D; one step at a time in order
7. **Complete** — Gate F E2E + verification; HISTORY links plan + task

### Get timestamp

```powershell
Get-Date -Format 'yyyyMMdd_HHmmss'
```

```bash
date +%Y%m%d_%H%M%S
```

## 6. Do's and Don'ts

### Do

- Write plans users can review before implementation — like Cursor plan mode
- Name exact paths and describe before/after for each step
- List paths in scope from `project/INFRASTRUCTURE.md`
- Ask the user when uncertain — one batch, with **Recommended:** defaults
- Write task files locally — gitignored except `project/tasks/README.md`
- Write **exhaustive** standalone tasks — as many detailed steps as the scope requires
- Derive every step from `project/plans/`, `project/documents/`, `project/design/`, and **`instructions/CODE.md`**
- Include **Code ref** on every application-source implementation step
- Include explicit E2E verify steps in final phase

### Don't

- Don't skip task files for non-trivial implementation work
- Don't use vague steps ("implement feature", "fix bug")
- Don't use folder paths with `/**` or bundle "all routes/components/pages" in one step
- Don't start implementation edits while `Status: planning` and steps are incomplete
- Don't create TASK before Gate D plan exists
- Don't set `Status: in_progress` before Gates A–D pass (see §1.6)
- Don't split a task because step count is high — add steps to the same file (§1.8)
- Don't create parent or child task files (§1.8)
- Don't set `Status: in_progress` before Files expected to change matches steps (§1.8)
- Don't leave Context read empty — list every file read in Gate A
- Don't put feature specs in TASK — use `project/documents/`
- Don't put change logs in TASK — use `project/histories/` after completion
- Don't rewrite completed task files — append new TASK or HISTORY entries

## 7. Agent Checklist

1. Gate D plan exists before TASK file?
2. Task is **standalone exhaustive** — full scope in one file (§1.8)?
3. CODE.md re-read at task start (sections in Context read)?
4. AGENTS Gates A–D passed before `Status: in_progress`?
5. Files expected to change matches implementation steps 1:1?
6. Every app-source step has Plan ref + Spec ref + Code ref?
7. CODE §1–2 on every touched source file?
8. E2E local + deploy cycles complete (Gate F)?
9. HISTORY links plan + task + E2E + CODE compliance?
