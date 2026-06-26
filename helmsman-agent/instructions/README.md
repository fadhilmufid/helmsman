# Instruction Index + Glossary

The map of the pack. **Agents start at [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) → [`RULES.md`](RULES.md)** — not the user-facing [`../README.md`](../README.md). The full flow diagram and gates live in [`RULES.md`](RULES.md) §1–§2.

## Glossary

| Term | Meaning |
|------|---------|
| `{root}` | App repository root — parent of `helmsman-agent/`. Greenfield `platforms/` and `deploy/` live here. |
| `{pack}` | `helmsman-agent/` — this instruction pack at `{root}/helmsman-agent/`. Holds `HELMSMAN-AGENT.md`, `instructions/`, `project/`. |
| `{project}` | Project slug — recorded in `project/PROJECT-OVERVIEW.md`. |
| **Gates A–F** | The ordered checkpoints from read → clarify → docs/design → plan → task → code → verify. Full table: [`RULES.md`](RULES.md) §2. |
| `platforms/` | Greenfield runnable units at `{root}/platforms/` — service (`postgresql`, `minio`) + application (`web`, `api`). |
| `project/plans/` | Blueprint (platform inventory, phases, E2E) written before tasks (Gate D). |
| `project/tasks/` | One standalone exhaustive execution file per request (Gate E). |
| **Application map** | The required header of a TASK file — routes/modules, data flow, build order — written before any implementation step ([`TASK.md`](TASK.md) §1.4a). |
| **Plan / Spec / Code ref** | The three links every TASK step carries: to `project/plans/`, to `project/documents/` or `project/design/`, and (for app source) to `CODE.md` sections. |
| **Production bar** | The default quality level — production-ready unless the user asks for MVP ([`RULES.md`](RULES.md) §5). |

**Nothing is standalone** — every layer links to the next ([`RULES.md`](RULES.md) §1). A *standalone task* means one `project/tasks/` file per request (no parent/child split); it still links plan, specs, and CODE.

## Document index

| File | Purpose |
|------|---------|
| [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) | Entry — re-entry, mode, read order, gates A–F |
| [`RULES.md`](RULES.md) | Rulebook — flow, gates, production bar, E2E, code gate |
| [`OVERVIEW.md`](OVERVIEW.md) | Project overview template → `project/PROJECT-OVERVIEW.md` |
| [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) | Doc architecture + folder tree + infra bar |
| [`DOCUMENT.md`](DOCUMENT.md) | Feature specs → `project/documents/` |
| [`DESIGN.md`](DESIGN.md) | UI design system → `project/design/` |
| [`PLAN.md`](PLAN.md) | Blueprint plans → `project/plans/` |
| [`TASK.md`](TASK.md) | Exhaustive tasks → `project/tasks/` |
| [`CODE.md`](CODE.md) | Code style, API, CRUD — re-read every coding task |
| [`HISTORY.md`](HISTORY.md) | Change log → `project/histories/` |
| [`GREENFIELD.md`](GREENFIELD.md) | New app — `platforms/`, service-first, E2E |
| [`BROWNFIELD.md`](BROWNFIELD.md) | Existing codebase + fresh adoption |

## Read order

Per [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) §1.4 (STOP before Gate B): Phase 1 entry → Phase 2 mode → Phase 3 gate-flow templates → Phase 4 context scan, then specs → plan (D) → task (E) → code → E2E (F).

## Where to write

| Action | Where | Gate |
|--------|-------|------|
| Feature specs | `project/documents/` | C |
| Design specs | `project/design/` + `project/PROJECT-DESIGN.md` | C |
| Blueprint | `project/plans/` | D |
| Exhaustive task steps | `project/tasks/` | E |
| Change log | `project/histories/` | After F |

All generated entries are gitignored except folder READMEs (see [`.gitignore`](../.gitignore)). Full folder tree and naming conventions: [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md).
