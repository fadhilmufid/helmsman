# Task Plans

Rules for **plan-mode** task files — the instruction-set equivalent of Cursor plan mode. **Read-only template** — plans live in [`project/tasks/`](project/tasks/).

Related: [`README.md`](../README.md), [`AGENTS.md`](../AGENTS.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`HISTORY.md`](HISTORY.md), [`DOCUMENT.md`](DOCUMENT.md), [`CODE.md`](CODE.md), [`DESIGN.md`](DESIGN.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md).

## 1. Purpose

Forward-looking **change plan** for a single user request — distinct from other project doc layers:

| | TASK | DOCUMENT | HISTORY |
|---|------|----------|---------|
| **What** | Step-by-step plan: what to change, where, why | Feature specs and reference docs | Chronological change log |
| **When** | Before and during work | Before/during feature work | After work completes |
| **Shape** | One file per task | One folder per feature, many doc files | One file per change event |

### Plan mode vs execution

| | Plan mode (TASK) | Execution (agent) |
|---|------------------|-------------------|
| **When** | Before first meaningful code or config edit | After plan is drafted (user confirms if needed) |
| **Output** | Reviewable plan in `project/tasks/` | Code, config, local history |
| **Steps** | What **will** change | Check off steps as done |

- Task file = **the plan** the user can read and correct before work proceeds
- `Status: planning` until Approach and steps are written; `in_progress` only when executing
- **Change-oriented steps** — every step names files/paths and describes the change, not vague goals
- **Ask when blocked** — one batch with **Recommended:** default per [`AGENTS.md`](../AGENTS.md) section 2

## 1.5 Plan step format (required)

Each step must be **change-oriented**:

```markdown
1. [ ] **{path/from/project/INFRASTRUCTURE.md}** — {what to change and why}
   - Before: {current behavior or "new file"}
   - After: {target behavior}
   - Verify: {command or check}
```

**Good (greenfield):** `platforms/api/internal/handlers/todo.go` — add handler; verify per `project/AGENTS.md`

**Good (brownfield):** `backend/src/routes/orders.ts` — add route; verify per `project/AGENTS.md`

**Bad:** "Implement delete API"

Group steps by phase when helpful: Clarify → Docs → Schema → API → UI → Infra → Verify.

List paths in scope from `project/INFRASTRUCTURE.md` (e.g. `platforms/api/` greenfield, or `backend/` brownfield).

## 1.6 Execution gates (hard STOP)

Mirror [`AGENTS.md`](../AGENTS.md) §0.5. The task file is the audit trail.

| Forbidden until gate passes | Requirement |
|----------------------------|-------------|
| `Status: in_progress` | Gate A — Context read lists **every** instruction file and project file read (not empty) |
| `Status: in_progress` | Gate C — `project/documents/{feature}/` exists with required files for feature/bootstrap work |
| `Status: in_progress` | Approach and change-oriented steps drafted |
| Any application code edit | Gates A–D complete; user confirmed plan for greenfield bootstrap or new-app creation |

**User confirm required** for greenfield bootstrap and any request that creates new apps — not only when scope is "large or ambiguous."

## 2. When to Create a Task File

**Required** for any non-trivial user request that will touch:

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
- **User request:** {verbatim or summary}
- **Scope:** {apps/paths from project/INFRASTRUCTURE.md} | docker | deploy | docs | document | task | multi
- **Paths in scope:** `{path}/`, ... (from `project/INFRASTRUCTURE.md`)

## Context read

- `instructions/README.md`, active mode guide (GREENFIELD or BROWNFIELD), `INFRASTRUCTURE.md`, `TASK.md`, `CODE.md`, `DESIGN.md`, `HISTORY.md`, `DOCUMENT.md` — all read
- `other-references/` — {entries read, or "empty"}
- `project/OVERVIEW.md`, `project/INFRASTRUCTURE.md`, `project/AGENTS.md`, `project/DESIGN.md` — {read or "not yet created"}
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

### Phase: {name}

1. [ ] **{path}** — {change summary}
   - Before: ...
   - After: ...
   - Verify: ...

## Files expected to change

| Path | Change |
|------|--------|
| `{app-path}/...` | ... |
| `deploy/...` | ... (when applicable) |

## Open questions

- {If blocked: question, why it matters, **Recommended:** default}

## Verification

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

1. **Draft plan** (`Status: planning`) — no code edits; write Context read (Gate A), Approach, change-oriented steps, paths in scope, Files expected to change
2. **Clarify** — unresolved items → Open questions; user answers → Clarification log and Decisions
3. **Confirm** — required for greenfield bootstrap and new-app creation; also when scope is large or ambiguous — present plan summary and wait for user approval (per AGENTS §2)
4. **Execute** (`Status: in_progress`) — only after Gates A–C pass; one step at a time; check off; add steps when discovered
5. **Complete** — Verification checklist; `project/histories/` entry; `Status: complete`

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

### Don't

- Don't skip task files for non-trivial implementation work
- Don't use vague steps ("implement feature", "fix bug")
- Don't start implementation edits while `Status: planning` and steps are incomplete
- Don't set `Status: in_progress` before Gates A–C pass (see §1.6)
- Don't leave Context read empty — list every file read in Gate A
- Don't put feature specs in TASK — use `project/documents/`
- Don't put change logs in TASK — use `project/histories/` after completion
- Don't rewrite completed task files — append new TASK or HISTORY entries

## 7. Agent Checklist

1. AGENTS Gates A–C passed before `Status: in_progress`?
2. Context read lists every instruction and project file read (not empty)?
3. Task file created before first meaningful code or config edit?
4. Approach, paths in scope, and Files expected to change filled in?
5. Steps change-oriented — path, before/after, verify per step?
6. User confirmed plan for greenfield bootstrap or new-app creation (when applicable)?
7. Status progressed `planning` → `in_progress` → `complete`?
8. Production verification complete per DESIGN, INFRASTRUCTURE/GREENFIELD, CODE (when UI/infra/API in scope)?
9. HISTORY entry links back to this task file when work is done?
