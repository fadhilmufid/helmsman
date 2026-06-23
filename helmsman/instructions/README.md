# Instruction Index

Agent guidance index — **one integrated system**. **Agents:** start at [`../AGENTS.md`](../AGENTS.md) → [`RULES.md`](RULES.md) — not the user [`../README.md`](../README.md).

## Terminology

| Term | Meaning |
|------|---------|
| `{root}` | App repository root — parent of `helmsman/`; greenfield `platforms/` and `deploy/` live here |
| `{pack}` | `helmsman/` — cloned instruction repo; `AGENTS.md`, `instructions/`, `project/` live here |
| `{project}` | Project slug — `project/OVERVIEW.md` (inside `{pack}`) |
| `platforms/` | **Greenfield** — `{root}/platforms/` — service + application platforms |
| `project/plans/` | Inside `{pack}` — blueprint before tasks |
| `project/tasks/` | Inside `{pack}` — **exhaustive standalone** execution steps |

## Integrated flow

```mermaid
flowchart LR
  specs[documents + design] --> plans[project/plans]
  plans --> tasks[project/tasks]
  tasks --> code[platforms + deploy]
  code --> e2e[E2E verify]
  e2e --> hist[histories]
```

**Nothing is standalone** — every layer links to the next. See [`RULES.md`](RULES.md) §1. **Note:** a **standalone task** means one `project/tasks/` file per request (not parent/child split) — it still links plan, specs, and CODE.

## Document index

| File | Purpose |
|------|---------|
| [`../AGENTS.md`](../AGENTS.md) | Entry — HARD STOP re-entry every session, mode, gates A–F |
| [`RULES.md`](RULES.md) | **Integrated rulebook** — read second |
| [`PLAN.md`](PLAN.md) | Blueprint plans → `project/plans/` |
| [`TASK.md`](TASK.md) | Exhaustive tasks → `project/tasks/` — Application map (§1.4a), file-level steps, no shorthand (§1.4), §5.1 drafting prompt, §1.9 execution loop |
| [`GREENFIELD.md`](GREENFIELD.md) | New app — `platforms/`, service-first, E2E |
| [`BROWNFIELD.md`](BROWNFIELD.md) | Existing codebase |
| [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) | Doc architecture + infra bar |
| [`DOCUMENT.md`](DOCUMENT.md) | Feature specs |
| [`DESIGN.md`](DESIGN.md) | UI design system |
| [`CODE.md`](CODE.md) | Code style, API, CRUD — **re-read every coding task** (all languages, §0) |
| [`HISTORY.md`](HISTORY.md) | Change log |

## Two-tier system (app + helmsman)

```
{root}/                    ← app repository
├── helmsman/              ← {pack} — use in place (never copy to {root})
│   ├── AGENTS.md
│   ├── instructions/
│   └── project/
├── platforms/             ← greenfield app
└── deploy/
```

Paths `project/`, `instructions/` are inside `{pack}` unless prefixed with `{root}/`. See [`../AGENTS.md`](../AGENTS.md) §0.

## Agent read order

1. [`../AGENTS.md`](../AGENTS.md) — mode + gates
2. [`RULES.md`](RULES.md) — integrated rules
3. This file — index
4. Mode guide: GREENFIELD or BROWNFIELD
5. PLAN, TASK, INFRASTRUCTURE, CODE, DESIGN, HISTORY, DOCUMENT
6. `project/*` config, plans, tasks, histories, documents, design
7. **Then:** specs → plan (Gate D) → task (Gate E) → code → E2E (Gate F)

## Write rules

| Action | Where | Gate |
|--------|-------|------|
| Feature specs | `project/documents/` | C |
| Design specs | `project/design/` + `DESIGN.md` | C |
| Blueprint | `project/plans/` | D |
| Exhaustive task steps | `project/tasks/` | E |
| Change log | `project/histories/` | After F |

All generated entries gitignored except folder READMEs. See [`.gitignore`](../.gitignore).
