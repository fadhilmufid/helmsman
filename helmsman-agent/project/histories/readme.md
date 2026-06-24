# Histories

Local **change log** for this project. Rules: [`history.md`](../../instructions/history.md) in `instructions/`.

**Summary must state production + E2E verification** — per [`rules.md`](../../instructions/rules.md) §5–§6; link `project/plans/` and **exhaustive standalone** `project/tasks/` when applicable.

## Filename format

```
{timestamp}_{title}.md
```

| Part | Rule |
|------|------|
| `timestamp` | `YYYYMMDD_HHmmss` (24-hour, zero-padded) |
| `title` | Lowercase kebab-case slug, max ~60 chars |

**Example:** `20260622_143052_bootstrap-app.md`

Brownfield onboarding entries: see [`brownfield.md`](../../instructions/brownfield.md) §5.

## Sorting

- **Newest first:** sort filenames descending
- **Full traceback:** sort ascending (oldest → newest)

## Git

All entries in this folder are **gitignored** except this README. The system writes history locally after work completes — do not expect these files in version control.
