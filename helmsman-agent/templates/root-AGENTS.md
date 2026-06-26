# Agent instructions

*This is the thin pointer Helmsman requires at the repo root. No `AGENTS.md` yet? Copy this whole file to
`{root}/AGENTS.md`. Already have one? Copy only the block between the markers below into it. Keep it in sync with this
template.*

<!-- ═══════════════ HELMSMAN:START — copy everything below into your existing AGENTS.md ═══════════════ -->

> **This repository uses Helmsman.** Before any non-trivial work, read the pack at
> [`helmsman-agent/`](helmsman-agent/) — starting with [`helmsman-agent/HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md).
> Prior chat memory never substitutes for a fresh read.

## What is Helmsman

A **folder of Markdown instructions** at `helmsman-agent/` — no runtime, no build step. It defines how coding agents
work in this repo: session re-entry, execution gates A–F, blueprint plans, exhaustive tasks, shared code rules, and a
`helmsman-agent/project/` workspace for plans, tasks, histories, and project config. The full workflow lives in
[`helmsman-agent/HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md); the rulebook is
[`helmsman-agent/instructions/RULES.md`](helmsman-agent/instructions/RULES.md).

## Start every session here

Run this before any non-trivial task — every session, including after greenfield bootstrap.

1. **Ensure this `AGENTS.md` exists** at the repo root with the Helmsman sections. If missing or partial, copy or merge
   from [`helmsman-agent/templates/root-AGENTS.md`](helmsman-agent/templates/root-AGENTS.md).
2. **Read the pack in order** — [`HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md) in full, then Phases 1–3 of its
   §1.4 (every file in [`helmsman-agent/instructions/`](helmsman-agent/instructions/), in gate-flow order).
3. **Pick a mode** — new app → [`GREENFIELD.md`](helmsman-agent/instructions/GREENFIELD.md); existing code →
   [`BROWNFIELD.md`](helmsman-agent/instructions/BROWNFIELD.md).
4. **Scan the workspace** — `helmsman-agent/project/` (config `PROJECT-*`, active `plans/` and `tasks/`, newest
   `histories/`, in-scope `documents/` and `design/`), per §1.4 Phase 4.
5. **Then work the gates A–F** below. Write all plans, tasks, histories, and config **into `helmsman-agent/project/`** —
   never the repo root.

> First-time brownfield adoption (existing app, empty `helmsman-agent/project/`): run the mandatory onboarding in
> [`BROWNFIELD.md`](helmsman-agent/instructions/BROWNFIELD.md) §0.1 before any other app work.

## Gates A–F — no application code until they pass, in order

| Gate | Requirement (one line) |
|------|------------------------|
| **A — Read first** | Pack + instructions read; this `AGENTS.md` present; `project/` scanned |
| **B — Clarify** | Resolve open decisions; write `project/PROJECT-OVERVIEW.md` + other `PROJECT-*` config |
| **C — Documents & design** | `project/documents/`; `project/design/` when there is a web UI |
| **D — Plan** | Blueprint plan in `project/plans/` |
| **E — Task** | One exhaustive, standalone task file in `project/tasks/`; re-read [`CODE.md`](helmsman-agent/instructions/CODE.md) for each coding block |
| **F — Verify** | Production bar + end-to-end verification before marking complete |

Full table and blocking detail: [`RULES.md`](helmsman-agent/instructions/RULES.md) §2.
**Exception:** pack maintenance (`helmsman-agent/instructions/`, `HELMSMAN-AGENT.md`, tracked `project/*/README.md`).

## Hard rules

- **No application code** (`platforms/`, `deploy/`, app source) until Gate A passes and a Gate E task exists for
  non-trivial work.
- **Re-read every session** — complete §1.4 Phases 1–3 fresh; re-read [`CODE.md`](helmsman-agent/instructions/CODE.md)
  before touching any source. Chat context does not count.
- **Workspace is the source of truth** — keep `PROJECT-*` config, active `project/tasks/`, `project/plans/`, in-scope
  specs/design, and `project/histories/` current as you pass each gate.

## Do not

- Copy `helmsman-agent/instructions/`, `helmsman-agent/project/`, or the full `HELMSMAN-AGENT.md` to the repo root. This
  thin `AGENTS.md` is the only pack-derived file allowed there.
- Move, flatten, duplicate, or symlink `helmsman-agent/`. Use it in place under the repo root.
- Put application code (`platforms/`, `deploy/`, source) inside `helmsman-agent/`.

## Where things live

- **Dev / lint / test / PR commands:** [`helmsman-agent/project/PROJECT-AGENTS.md`](helmsman-agent/project/PROJECT-AGENTS.md) (when present).
- **Plans, tasks, histories, project config:** `helmsman-agent/project/`.
- **Glossary** (`{root}`, `{pack}`, gates, "Application map") and index: [`helmsman-agent/instructions/README.md`](helmsman-agent/instructions/README.md).

<!-- ═══════════════ HELMSMAN:END ═══════════════ -->

