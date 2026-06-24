# Plans

**Blueprint plan files** for this project — platform inventory, phases, and E2E verification matrix written **before** the **exhaustive standalone** task file. Rules: [`plan.md`](../../instructions/plan.md) in `instructions/`.

**Required before task file** — per AGENTS Gate D and plan.md (every non-trivial request).

## Filename format

```
{timestamp}_{plan-slug}.md
```

| Part | Rule |
|------|------|
| `timestamp` | `YYYYMMDD_HHmmss` (same as tasks and histories) |
| `plan-slug` | Lowercase kebab-case, max ~60 chars |

**Example:** `20260622_140000_bootstrap-kardus.md`

## Workflow

1. Draft blueprint (`Status: drafting`) — platform inventory, phases, E2E matrix
2. Confirm with user if needed (greenfield bootstrap)
3. Create **one exhaustive standalone** `project/tasks/...` from this plan — every deliverable as a step; each step has **Plan ref** + **Spec ref** + **Code ref** when applicable
4. Complete when linked task and E2E checks are done

## Distinction from tasks

| | plans | tasks |
|---|-------|-------|
| **Purpose** | Architectural blueprint | **Exhaustive standalone** execution — unlimited steps, one file |
| **Granularity** | Phases, platforms, E2E | One step per file/route/page — full scope before `in_progress` |

## Git

All plan entries are **gitignored** except this README. Agents maintain plans locally.
