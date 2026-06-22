# AI Change History

Rules for writing change log entries. **Read-only template** — entries go in [`project/histories/`](project/histories/).

Related: [`README.md`](../README.md), [`AGENTS.md`](../AGENTS.md), [`TASK.md`](TASK.md), [`CODE.md`](CODE.md), [`DOCUMENT.md`](DOCUMENT.md), [`DESIGN.md`](DESIGN.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md).

## 1. Purpose

- **Agent-readable history** — like database migrations, but for agent-driven changes
- **Context on demand** — agents read recent entries before starting work
- **Traceback** — read entries oldest → newest to follow project evolution
- **Latest state** — most recent entry = highest timestamp (sort filenames descending)

Distinct from [`project/tasks/`](project/tasks/) (forward-looking step plans) and [`project/documents/`](project/documents/) (feature specs).

## 2. When to Create an Entry

**Required** for any AI task that adds, modifies, or deletes:

- Application source code (scope per app name in `project/INFRASTRUCTURE.md` — e.g. `web`, `api`, `backend`, or `multi`)
- Container definitions (docker requirement — scope `docker`)
- Build, compose, or deployment scripts (deploy/build requirement — scope `deploy`)
- Database schema, migration files, or seeds (db requirement — scope `db`)
- Migration runner app (scope `migration` — only when user explicitly requested standalone `platforms/migration/`)
- Feature documentation under `project/documents/` (scope `document`)
- Task plan files under `project/tasks/` when the task drove significant work (scope `task`)
- Files under `project/` (local workspace)

Paths for each concern: see [`project/INFRASTRUCTURE.md`](project/INFRASTRUCTURE.md). Brownfield onboarding entries: see [`BROWNFIELD.md`](BROWNFIELD.md) §5.

When feature work touches `project/documents/`, reference those paths in the history entry body.

When work was driven by a task plan, link `project/tasks/{timestamp}_{task-slug}.md` in Summary or Related.

**Optional to skip** for trivial typo-only fixes with zero behavioral impact.

**Never** create duplicate entries for the same completed task.

## 3. Filename Format

```
{timestamp}_{title}.md
```

| Part | Rule |
|------|------|
| `timestamp` | Server time: `YYYYMMDD_HHmmss` (24-hour, zero-padded) |
| `title` | Lowercase slug, words separated by `-`, no spaces, max ~60 chars |
| Location | `project/histories/{timestamp}_{title}.md` |

**Example:** `project/histories/20260617_143052_scaffold-express-api.md`

### Finding entries

| Goal | How |
|------|-----|
| **Latest change** | Sort `project/histories/` filenames **descending** |
| **Full traceback** | Sort **ascending** — read oldest → newest |
| **Correct a mistake** | Append new entry — never edit or rename old entries |

## 4. Entry Body Template

```markdown
# {Human-readable title}

- **Timestamp:** {ISO-8601 datetime matching filename}
- **Scope:** web | api | migration | db | docker | deploy | docs | document | task | multi

## Summary

One paragraph: what changed and why.

## Changes

- Concrete change one
- Concrete change two

## Files touched

- `path/to/file` — brief note

## Notes for future agents

- Decisions, gotchas, follow-ups, breaking changes

## Related

- `project/tasks/...` — task plan that drove this work (if applicable)
- `project/documents/...` — feature docs touched (if applicable)
```

### Scope values

Scope labels (`web`, `api`, `backend`, etc.) reflect app names in `project/INFRASTRUCTURE.md` — not prescriptive folder names.

| Scope | Use when |
|-------|----------|
| `web` | Frontend app code |
| `api` | Backend API code |
| `migration` | Standalone migration runner app (e.g. `platforms/migration/`) — only when user explicitly requested |
| `db` | Database schema, migration files, seeds |
| `docker` | Dockerfiles and container config |
| `deploy` | Compose files, build/export scripts, backup/restore |
| `docs` | AI instruction or project config docs |
| `document` | Feature reference docs under `project/documents/` |
| `task` | Task plan under `project/tasks/` created or substantially updated |
| `multi` | Changes span two or more areas |

## 5. Agent Workflow

### Before starting work

1. Read this file
2. List `project/histories/` sorted **descending**
3. Read the 1–3 most recent entries
4. Scan `project/tasks/` for active tasks per [`TASK.md`](TASK.md)
5. Read `project/*` and `instructions/` templates as needed

### After completing work

1. Get server timestamp: `YYYYMMDD_HHmmss`
2. Create `project/histories/{timestamp}_{title}.md` locally
3. Link the driving `project/tasks/` file when applicable

Entries are **gitignored** — write locally; do not expect them in version control.

### Get timestamp

```powershell
Get-Date -Format 'yyyyMMdd_HHmmss'
```

```bash
date +%Y%m%d_%H%M%S
```

## 6. Do's and Don'ts

### Do
- Write history entries locally after work completes
- Keep summaries factual — name files, features, decisions
- Add notes for future agents when non-obvious
- Reference `project/documents/{feature}/` paths when feature docs were created or updated
- Link `project/tasks/` when a task plan drove the work

### Don't
- Don't delete, rename, or rewrite past entries
- Don't write entries outside `project/histories/`
- Don't edit instruction templates (`instructions/*.md`, root `AGENTS.md`) when a history entry suffices
- Don't put step-by-step plans in HISTORY — use `project/tasks/` per [`TASK.md`](TASK.md)

## 7. Agent Checklist

1. Filename follows `{timestamp}_{title}.md` in `project/histories/`?
2. Body includes Summary, Changes, Files touched, Notes?
3. Task file linked when work was driven by a task plan?
4. Entry written locally (gitignored)?
