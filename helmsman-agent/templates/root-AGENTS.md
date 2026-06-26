# Agent instructions

**Required at `{root}` when the `helmsman-agent/` folder exists.** Copy this file to your app repository root as `AGENTS.md`, or merge these sections into an existing root `AGENTS.md`.

## What is Helmsman

Helmsman is a **folder of Markdown instructions** at `helmsman-agent/` in this repository (`HELMSMAN-AGENT.md`, `instructions/`, `project/`) — no runtime, no build step. It defines how coding agents work here: session re-entry, gates A–F, blueprint plans, exhaustive tasks, code rules, and a `helmsman-agent/project/` workspace for plans, tasks, histories, and project config.

This file is a thin pointer at the repository root. The full workflow lives in [`helmsman-agent/HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md).

## How to use Helmsman

Every session, before non-trivial work:

1. **Read [`helmsman-agent/HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md) in full** (pack entry, HARD STOP re-entry, mode selection, gates A–F).
2. **Read [`helmsman-agent/instructions/RULES.md`](helmsman-agent/instructions/RULES.md)** (integrated rulebook after the pack entry).
3. **Read all instructions** — Phases 1–3 per [`helmsman-agent/HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md) §1.4 (hard STOP; gate-flow order; every file in `helmsman-agent/instructions/` in full).
4. **Scan `helmsman-agent/project/`** — Phase 4 per [`helmsman-agent/HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md) §1.4 (config, plans, tasks, histories, documents, design in scope).
5. **Write to `helmsman-agent/project/`** for plans, tasks, histories, and project config. Do not write these to the repo root.
6. **Ensure `{root}/AGENTS.md` exists** when the `helmsman-agent/` folder exists. Copy or merge from [`helmsman-agent/templates/root-AGENTS.md`](helmsman-agent/templates/root-AGENTS.md) if missing (see pack HARD STOP step 2).
7. **Brownfield with a blank `helmsman-agent/project/`:** scan the existing repo and populate `helmsman-agent/project/` from code before other app work ([`helmsman-agent/instructions/BROWNFIELD.md`](helmsman-agent/instructions/BROWNFIELD.md) §0.1).

When they exist, app-specific dev, lint, test, and PR commands are in [`helmsman-agent/project/PROJECT-AGENTS.md`](helmsman-agent/project/PROJECT-AGENTS.md).

## Hard rules (when `helmsman-agent/` exists)

**No application code changes** (`platforms/`, `deploy/`, app source) until all of the following:

1. **Re-read instructions** — complete [`HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md) §1.4 Phases 1–3 every session and before every non-trivial task (gate-flow order through every `instructions/` file). When touching application source, re-read `instructions/CODE.md` per the active task.
2. **Update `helmsman-agent/project/`** — keep workspace current per gates: `PROJECT-*` config, active `project/tasks/` (step checklists), `project/plans/`, specs/design in scope, and `project/histories/` after completed work. Do not edit app code without a Gate E task when the work is non-trivial.

Prior chat context does not replace a fresh read. Detail: [`helmsman-agent/HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md) §1.4–§1.5 and [`helmsman-agent/instructions/RULES.md`](helmsman-agent/instructions/RULES.md) §2.

## Do not

- Copy `helmsman-agent/instructions/`, `helmsman-agent/project/`, or the full `helmsman-agent/HELMSMAN-AGENT.md` to the repo root.
- Move, flatten, duplicate, or symlink the `helmsman-agent/` folder. Use it in place under `{root}`.
- Edit application source until instructions are re-read, `helmsman-agent/project/` is updated per gates, and the pack gates allow it (see [`helmsman-agent/HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md) §1.4–§1.5).
