# Agent instructions

**Required at `{root}` when `helmsman-agent/` is installed.** Copy this file to your app repository root as `AGENTS.md`, or merge these sections into an existing root `AGENTS.md`.

## What is Helmsman

Helmsman is a reusable instruction pack installed at `helmsman-agent/` in this repository. It defines how coding agents work here: session re-entry, gates A–F, blueprint plans, exhaustive tasks, code rules, and a `helmsman-agent/project/` workspace for plans, tasks, histories, and project config.

This file is a thin pointer at the repository root. The full workflow lives in [`helmsman-agent/helmsman-agent.md`](helmsman-agent/helmsman-agent.md).

## How to use Helmsman

Every session, before non-trivial work:

1. **Read [`helmsman-agent/helmsman-agent.md`](helmsman-agent/helmsman-agent.md) in full** (pack entry, HARD STOP re-entry, mode selection, gates A–F).
2. **Read [`helmsman-agent/instructions/rules.md`](helmsman-agent/instructions/rules.md)** (integrated rulebook after the pack entry).
3. **Run Gate A** per the pack: re-read instruction templates and scan `helmsman-agent/project/` (`overview.md`, `infrastructure.md`, `AGENTS.md`, `design.md`, active `plans/`, `tasks/`, in-scope `documents/` and `design/`).
4. **Read templates from `helmsman-agent/instructions/`** as gates require (`plan.md`, `task.md`, `code.md`, `greenfield.md` or `brownfield.md`, etc.).
5. **Write to `helmsman-agent/project/`** for plans, tasks, histories, and project config. Do not write these to the repo root.
6. **Ensure `{root}/AGENTS.md` exists** when `helmsman-agent/` is installed. Copy or merge from [`helmsman-agent/templates/root-agents.md`](helmsman-agent/templates/root-agents.md) if missing (see pack HARD STOP step 2).
7. **Brownfield with a blank `helmsman-agent/project/`:** scan the existing repo and populate `helmsman-agent/project/` from code before other app work ([`helmsman-agent/instructions/brownfield.md`](helmsman-agent/instructions/brownfield.md) §0.1).

When they exist, app-specific dev, lint, test, and PR commands are in [`helmsman-agent/project/AGENTS.md`](helmsman-agent/project/AGENTS.md).

## Do not

- Copy `helmsman-agent/instructions/`, `helmsman-agent/project/`, or the full `helmsman-agent/helmsman-agent.md` to the repo root.
- Move, flatten, duplicate, or symlink the `helmsman-agent/` folder. Use it in place under `{root}`.
- Edit application source until the pack gates allow it (see `helmsman-agent/helmsman-agent.md` §1.5).
