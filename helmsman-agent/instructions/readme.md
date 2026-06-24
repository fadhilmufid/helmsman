# Instruction Index

Agent guidance index — **one integrated system**. **Agents:** start at [`../helmsman-agent.md`](../helmsman-agent.md) → [`rules.md`](rules.md) — not the user [`../readme.md`](../readme.md).

## Terminology

| Term | Meaning |
|------|---------|
| `{root}` | App repository root — parent of `helmsman-agent/`; greenfield `platforms/` and `deploy/` live here |
| `{pack}` | `helmsman-agent/` — instruction pack at `{root}/helmsman-agent/`; `helmsman-agent.md`, `instructions/`, `project/` live here |
| `{project}` | Project slug — `project/overview.md` (inside `{pack}`) |
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

**Nothing is standalone** — every layer links to the next. See [`rules.md`](rules.md) §1. **Note:** a **standalone task** means one `project/tasks/` file per request (not parent/child split) — it still links plan, specs, and CODE.

## Document index

| File | Purpose |
|------|---------|
| [`../helmsman-agent.md`](../helmsman-agent.md) | Entry — HARD STOP re-entry every session, mode, gates A–F |
| [`rules.md`](rules.md) | **Integrated rulebook** — read second |
| [`plan.md`](plan.md) | Blueprint plans → `project/plans/` |
| [`task.md`](task.md) | Exhaustive tasks → `project/tasks/` — Application map (§1.4a), file-level steps, no shorthand (§1.4), §5.1 drafting prompt, §1.9 execution loop |
| [`greenfield.md`](greenfield.md) | New app — `platforms/`, service-first, E2E |
| [`brownfield.md`](brownfield.md) | Existing codebase |
| [`infrastructure.md`](infrastructure.md) | Doc architecture + infra bar |
| [`document.md`](document.md) | Feature specs |
| [`design.md`](design.md) | UI design system |
| [`code.md`](code.md) | Code style, API, CRUD — **re-read every coding task** (all languages, §0) |
| [`history.md`](history.md) | Change log |

## Two-tier system (app + helmsman)

```
{root}/                    ← app repository
├── AGENTS.md              ← required root Helmsman guide (templates/root-agents.md)
├── helmsman-agent/              ← {pack} — use in place (never copy to {root})
│   ├── helmsman-agent.md
│   ├── instructions/
│   └── project/
├── platforms/             ← greenfield app
└── deploy/
```

Paths `project/`, `instructions/` are inside `{pack}` unless prefixed with `{root}/`. See [`../helmsman-agent.md`](../helmsman-agent.md) §0.

## Agent read order

1. [`../helmsman-agent.md`](../helmsman-agent.md) — mode + gates
2. [`rules.md`](rules.md) — integrated rules
3. This file — index
4. Mode guide: GREENFIELD or BROWNFIELD
5. PLAN, TASK, INFRASTRUCTURE, CODE, DESIGN, HISTORY, DOCUMENT
6. `project/*` config, plans, tasks, histories, documents, design
7. **Then:** specs → plan (Gate D) → task (Gate E) → code → E2E (Gate F)

## Write rules

| Action | Where | Gate |
|--------|-------|------|
| Feature specs | `project/documents/` | C |
| Design specs | `project/design/` + `design.md` | C |
| Blueprint | `project/plans/` | D |
| Exhaustive task steps | `project/tasks/` | E |
| Change log | `project/histories/` | After F |

All generated entries gitignored except folder READMEs. See [`.gitignore`](../.gitignore).
