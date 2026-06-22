# Instruction Index

System guidance book — terminology, document index, and read order. **System:** start at [`../AGENTS.md`](../AGENTS.md), not the user [`../README.md`](../README.md).

## Terminology

| Term | Meaning |
|------|---------|
| `{root}` | Repository root — layout in `project/INFRASTRUCTURE.md` |
| `{project}` | Project slug for Docker tags, backups, PR titles — `project/OVERVIEW.md` |
| `platforms/` | **Greenfield only** — fixed parent folder for runnable apps; see [`GREENFIELD.md`](GREENFIELD.md) |
| `ai_references/` | Optional user reference dumps — local only ([`../ai_references/README.md`](../ai_references/README.md)) |
| `project/` | Local system workspace — config, history, docs, tasks (mostly gitignored) |

## Document index

| File | Purpose |
|------|---------|
| [`../AGENTS.md`](../AGENTS.md) | System gate — mode, clarify, task workflow, testing, checklist |
| [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) | Documentation architecture + abstract four concerns |
| [`GREENFIELD.md`](GREENFIELD.md) | New app bootstrap — `platforms/`, Docker, deploy |
| [`BROWNFIELD.md`](BROWNFIELD.md) | Existing codebase — discovery, document, adapt |
| [`TASK.md`](TASK.md) | Step-by-step task plan rules |
| [`CODE.md`](CODE.md) | Block comments, journal comments, scaffold-first, API codes |
| [`DESIGN.md`](DESIGN.md) | UI design system — mobile-first, component library first |
| [`HISTORY.md`](HISTORY.md) | How to write change log entries |
| [`DOCUMENT.md`](DOCUMENT.md) | How to write feature reference documentation |

## Two-tier system

```
{root}/
├── README.md              ← user (GitHub) — not for system read order
├── LICENSE
├── AGENTS.md              ← system gate (start here)
├── instructions/          ← rule templates (this folder)
│   ├── README.md
│   ├── INFRASTRUCTURE.md
│   ├── GREENFIELD.md
│   ├── BROWNFIELD.md
│   ├── TASK.md
│   ├── CODE.md
│   ├── DESIGN.md
│   ├── HISTORY.md
│   └── DOCUMENT.md
├── ai_references/
└── project/
    ├── OVERVIEW.md        ← gitignored
    ├── INFRASTRUCTURE.md  ← gitignored
    ├── AGENTS.md          ← gitignored
    ├── DESIGN.md          ← gitignored
    ├── history/README.md
    ├── document/README.md
    └── task/README.md
```

### Read-only (instruction templates)

Files in `instructions/` are **reusable guidance**. Do **not** modify them during normal project work unless the user explicitly asks to update the instruction set. Root [`AGENTS.md`](../AGENTS.md) is the system gate only.

### Local workspace

The system reads and writes `project/` and `ai_references/` during work. Almost all content is **gitignored** — only folder README explainers are tracked. See [`.gitignore`](../.gitignore).

## Four concerns (abstract)

Every project involves: **app**, **containerization**, **deploy/build**, and **data**. Document what applies in `project/INFRASTRUCTURE.md`.

| Mode | Expectation |
|------|-------------|
| Greenfield | All four addressed by bootstrap complete — [`GREENFIELD.md`](GREENFIELD.md) |
| Brownfield | Document what exists; note gaps — [`BROWNFIELD.md`](BROWNFIELD.md) |

### System read order

1. [`../AGENTS.md`](../AGENTS.md) — resolve mode (§0)
2. This file — index and terminology
3. **Greenfield** → [`GREENFIELD.md`](GREENFIELD.md) · **Brownfield** → [`BROWNFIELD.md`](BROWNFIELD.md)
4. Universal: `INFRASTRUCTURE.md` → `TASK.md` → `CODE.md` → `DESIGN.md` → `HISTORY.md` → `DOCUMENT.md`
5. `ai_references/` when user has reference material
6. Local config: `project/OVERVIEW.md` → `project/INFRASTRUCTURE.md` → `project/AGENTS.md` → `project/DESIGN.md`
7. Active tasks: `project/task/` — newest first
8. Recent context: `project/history/` descending
9. Feature context: `project/document/{feature}/`

## Write rules

| Action | Where | Git |
|--------|-------|-----|
| User reference dumps | `ai_references/` | Gitignored (except README) |
| Create/update task plan | `project/task/{timestamp}_{task-slug}.md` | Gitignored |
| Append change log entry | `project/history/{timestamp}_{title}.md` | Gitignored |
| Feature documentation | `project/document/{feature-slug}/` | Gitignored |
| App paths, Docker, deploy, db | `project/INFRASTRUCTURE.md` | Gitignored |
| Dev commands, lint/test, PR/CI | `project/AGENTS.md` | Gitignored |
| Design tokens | `project/DESIGN.md` | Gitignored |
| Project purpose and mode | `project/OVERVIEW.md` | Gitignored |
| Update instruction templates | `instructions/*.md` | Only when user explicitly requests |
