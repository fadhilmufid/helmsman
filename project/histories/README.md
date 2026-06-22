# Histories

Local **change log** for this project. Rules: [`HISTORY.md`](../../instructions/HISTORY.md) in `instructions/`.

**Summary must state production verification** — per AGENTS §2.5; note when the production bar was met or list known gaps when infra/UI/API were in scope.

## Filename format

```
{timestamp}_{title}.md
```

| Part | Rule |
|------|------|
| `timestamp` | `YYYYMMDD_HHmmss` (24-hour, zero-padded) |
| `title` | Lowercase kebab-case slug, max ~60 chars |

**Example:** `20260622_143052_bootstrap-app.md`

Brownfield onboarding entries: see [`BROWNFIELD.md`](../../instructions/BROWNFIELD.md) §5.

## Sorting

- **Newest first:** sort filenames descending
- **Full traceback:** sort ascending (oldest → newest)

## Git

All entries in this folder are **gitignored** except this README. The system writes history locally after work completes — do not expect these files in version control.
