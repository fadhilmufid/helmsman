# Instruction Index

Agent guidance index — terminology, document index, and read order. **Agents:** start at [`../AGENTS.md`](../AGENTS.md), not the user [`../README.md`](../README.md).

## Terminology

| Term | Meaning |
|------|---------|
| `{root}` | Repository root — layout in `project/INFRASTRUCTURE.md` |
| `{project}` | Project slug for Docker tags, backups, PR titles — `project/OVERVIEW.md` |
| `platforms/` | **Greenfield only** — fixed parent folder for runnable apps; see [`GREENFIELD.md`](GREENFIELD.md) |
| `other-references/` | Optional user reference dumps — local only ([`../other-references/README.md`](../other-references/README.md)) |
| `project/` | Local agent workspace — config, histories, docs, tasks (mostly gitignored) |

## Production-grade default (all instructions)

Every file in `instructions/` assumes **production-ready delivery** unless the user explicitly asks for MVP.

| Principle | Rule |
|-----------|------|
| **Default target** | Production-ready — deployable, polished, complete for in-scope work |
| **Never unless asked** | MVP, stubs, skeleton UIs, dev-only infra, unbounded APIs, placeholder specs |
| **Applies to** | Code, design/UI, infrastructure, documents, tasks, verification |
| **Authority** | [`AGENTS.md`](../AGENTS.md) §2.5 — domain detail in each `instructions/*.md` |

## Document index

| File | Purpose |
|------|---------|
| [`../AGENTS.md`](../AGENTS.md) | Agent gate — mode, execution gates (§0.5), clarify, task workflow, quality bar |
| [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) | Documentation architecture + production infra bar |
| [`GREENFIELD.md`](GREENFIELD.md) | New app bootstrap — `platforms/`, Docker, deploy (production deployability) |
| [`BROWNFIELD.md`](BROWNFIELD.md) | Existing codebase — discovery, document, adapt (production on touched work) |
| [`TASK.md`](TASK.md) | Step-by-step task plan rules + production verification |
| [`CODE.md`](CODE.md) | Block comments, API codes, CRUD, production baseline |
| [`DESIGN.md`](DESIGN.md) | UI design system — production-grade mobile-first UI |
| [`HISTORY.md`](HISTORY.md) | Change log entries + production verification notes |
| [`DOCUMENT.md`](DOCUMENT.md) | Feature specs that define production-ready behavior |

## Two-tier system

```
{root}/
├── README.md              ← user (GitHub) — not for agent read order
├── LICENSE
├── AGENTS.md              ← agent gate (start here)
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
├── other-references/
└── project/
    ├── OVERVIEW.md        ← gitignored
    ├── INFRASTRUCTURE.md  ← gitignored
    ├── AGENTS.md          ← gitignored
    ├── DESIGN.md          ← gitignored
    ├── histories/README.md
    ├── documents/README.md
    └── tasks/README.md
```

### Read-only (instruction templates)

Files in `instructions/` are **reusable guidance**. Do **not** modify them during normal project work unless the user explicitly asks to update the instruction set. Root [`AGENTS.md`](../AGENTS.md) is the agent gate only.

### Local workspace

Agents read and write `project/` and `other-references/` during work. Almost all content is **gitignored** — only folder README explainers are tracked. See [`.gitignore`](../.gitignore).

## Four concerns (abstract)

Every project involves: **app**, **containerization**, **deploy/build**, and **data**. Document what applies in `project/INFRASTRUCTURE.md`.

| Mode | Expectation |
|------|-------------|
| Greenfield | All four addressed by bootstrap complete — [`GREENFIELD.md`](GREENFIELD.md) |
| Brownfield | Document what exists; note gaps — [`BROWNFIELD.md`](BROWNFIELD.md) |

### Agent read order

1. [`../AGENTS.md`](../AGENTS.md) — resolve mode (§0) and **execution gates (§0.5)**
2. This file — index and terminology
3. **Greenfield** → [`GREENFIELD.md`](GREENFIELD.md) · **Brownfield** → [`BROWNFIELD.md`](BROWNFIELD.md)
4. Universal: `INFRASTRUCTURE.md` → `TASK.md` → `CODE.md` → `DESIGN.md` → `HISTORY.md` → `DOCUMENT.md`
5. `other-references/` when user has reference material
6. Local config: `project/OVERVIEW.md` → `project/INFRASTRUCTURE.md` → `project/AGENTS.md` → `project/DESIGN.md`
7. Active tasks: `project/tasks/` — newest first
8. Recent context: `project/histories/` descending
9. Feature context: `project/documents/{feature}/`
10. **Only after read order complete:** create documents → task plan → then code (AGENTS §0.5)

## Write rules

| Action | Where | Git |
|--------|-------|-----|
| User reference dumps | `other-references/` | Gitignored (except README) |
| Create/update task plan | `project/tasks/{timestamp}_{task-slug}.md` — **before** application code (AGENTS Gate D) | Gitignored |
| Feature documentation | `project/documents/{feature-slug}/` — **before** application code (AGENTS Gate C) | Gitignored |
| Append change log entry | `project/histories/{timestamp}_{title}.md` | Gitignored |
| App paths, Docker, deploy, db | `project/INFRASTRUCTURE.md` | Gitignored |
| Dev commands, lint/test, PR/CI | `project/AGENTS.md` | Gitignored |
| Design tokens | `project/DESIGN.md` | Gitignored |
| Project purpose and mode | `project/OVERVIEW.md` | Gitignored |
| Update instruction templates | `instructions/*.md` | Only when user explicitly requests |
