# Tasks

**Plan-mode task files** for this project — step-by-step change plans (what to change, where, and why) written **before** implementation, like Cursor plan mode. Rules: [`TASK.md`](../../instructions/TASK.md) in `instructions/`.

**Required before application code** — per AGENTS §0.5 Gate D and TASK.md.

## Filename format

```
{timestamp}_{task-slug}.md
```

| Part | Rule |
|------|------|
| `timestamp` | `YYYYMMDD_HHmmss` (same as histories) |
| `task-slug` | Lowercase kebab-case, max ~60 chars |

**Example:** `20260622_143052_brownfield-onboarding.md`

## Workflow

1. Draft plan (`Status: planning`) — Approach, steps, files expected to change
2. Clarify and confirm with user if needed
3. Execute (`Status: in_progress`) — check off steps
4. Complete — verification + `project/histories/` entry

## Git

All task entries are **gitignored** except this README. The system maintains plans locally — do not expect these files in version control.
