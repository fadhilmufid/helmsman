# AI Change History

Rules for writing AI change log entries. **Read-only template** — entries go in [`PROJECT/HISTORY/`](PROJECT/HISTORY/).

Related: [`README.MD`](README.MD), [`AGENTS.MD`](AGENTS.MD), [`CODE.MD`](CODE.MD), [`DOCUMENT.MD`](DOCUMENT.MD).

## 1. Purpose

- **AI-readable history** — like database migrations, but for all AI-driven changes
- **Context on demand** — agents read recent entries before starting work
- **Traceback** — read entries oldest → newest to follow project evolution
- **Latest state** — most recent entry = highest timestamp (sort filenames descending)

## 2. When to Create an Entry

**Required** for any AI task that adds, modifies, or deletes:

- Application source code (app requirement — scope `web`, `api`, `migration`, or `multi`)
- Container definitions (docker requirement — scope `docker`)
- Build, compose, or deployment scripts (deploy/build requirement — scope `deploy`)
- Database schema, migration files, or seeds (db requirement — scope `db`)
- Migration runner app (scope `migration` — only when user explicitly requested standalone `platforms/migration/`)
- Feature documentation under `PROJECT/DOCUMENT/` (scope `document`)
- Files under `AI INSTRUCTION/PROJECT/`

Paths for each concern: see [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD).

When feature work touches `PROJECT/DOCUMENT/`, reference those paths in the history entry body.

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
| Location | `PROJECT/HISTORY/{timestamp}_{title}.md` |

**Example:** `PROJECT/HISTORY/20260617_143052_scaffold-express-api.md`

### Finding entries

| Goal | How |
|------|-----|
| **Latest change** | Sort `PROJECT/HISTORY/` filenames **descending** |
| **Full traceback** | Sort **ascending** — read oldest → newest |
| **Correct a mistake** | Append new entry — never edit or rename old entries |

## 4. Entry Body Template

```markdown
# {Human-readable title}

- **Timestamp:** {ISO-8601 datetime matching filename}
- **Scope:** web | api | migration | db | docker | deploy | docs | document | multi

## Summary

One paragraph: what changed and why.

## Changes

- Concrete change one
- Concrete change two

## Files touched

- `path/to/file` — brief note

## Notes for future agents

- Decisions, gotchas, follow-ups, breaking changes
```

### Scope values

| Scope | Use when |
|-------|----------|
| `web` | Frontend app code |
| `api` | Backend API code |
| `migration` | Standalone migration runner app (e.g. `platforms/migration/`) — only when user explicitly requested |
| `db` | Database schema, migration files, seeds |
| `docker` | Dockerfiles and container config |
| `deploy` | Compose files, build/export scripts, backup/restore |
| `docs` | AI instruction or project config docs |
| `document` | Feature reference docs under `PROJECT/DOCUMENT/` |
| `multi` | Changes span two or more areas |

## 5. Agent Workflow

### Before starting work

1. Read this file
2. List `PROJECT/HISTORY/` sorted **descending**
3. Read the 1–3 most recent entries
4. Read `PROJECT/*` and general rules as needed

### After completing work

1. Get server timestamp: `YYYYMMDD_HHmmss`
2. Create `PROJECT/HISTORY/{timestamp}_{title}.md`
3. Commit entry **in the same commit** as the changes it describes

### Get timestamp

```powershell
Get-Date -Format 'yyyyMMdd_HHmmss'
```

```bash
date +%Y%m%d_%H%M%S
```

## 6. Do's and Don'ts

### Do
- Commit history entries alongside the changes they describe
- Keep summaries factual — name files, features, decisions
- Add notes for future agents when non-obvious
- Reference `PROJECT/DOCUMENT/{feature}/` paths when feature docs were created or updated

### Don't
- Don't delete, rename, or rewrite past entries
- Don't write entries outside `PROJECT/HISTORY/`
- Don't edit general rule files (`AGENTS.MD`, `CODE.MD`, etc.) when a history entry suffices

## 7. Agent Checklist

1. Filename follows `{timestamp}_{title}.md` in `PROJECT/HISTORY/`?
2. Body includes Summary, Changes, Files touched, Notes?
3. Entry committed with related code/doc changes?
