# Agent instructions

## What is Helmsman

Helmsman is a reusable instruction pack installed at `helmsman/` in this repository. It defines how coding agents work here: session re-entry, gates A–F, blueprint plans, exhaustive tasks, code rules, and a `helmsman/project/` workspace for plans, tasks, histories, and project config.

This file is a thin pointer at the repository root. The full workflow lives in [`helmsman/AGENTS.md`](helmsman/AGENTS.md).

## How to use Helmsman

Every session, before non-trivial work:

1. **Read [`helmsman/AGENTS.md`](helmsman/AGENTS.md) in full** — pack entry, HARD STOP re-entry, mode selection, gates A–F.
2. **Read [`helmsman/instructions/RULES.md`](helmsman/instructions/RULES.md)** — integrated rulebook after the pack entry.
3. **Run Gate A** per the pack — re-read instruction templates and scan `helmsman/project/` (`OVERVIEW`, `INFRASTRUCTURE`, active `plans/`, `tasks/`, in-scope `documents/` and `design/`).
4. **Read templates from `helmsman/instructions/`** as gates require (`PLAN.md`, `TASK.md`, `CODE.md`, `GREENFIELD.md` or `BROWNFIELD.md`, etc.).
5. **Write to `helmsman/project/`** — plans, tasks, histories, and project config. Do not write these to the repo root.
6. **Brownfield + blank `helmsman/project/`** — scan the existing repo and populate `helmsman/project/` from code before other app work ([`helmsman/instructions/BROWNFIELD.md`](helmsman/instructions/BROWNFIELD.md) §0.1).

App-specific dev, lint, test, and PR commands — when they exist — are in [`helmsman/project/AGENTS.md`](helmsman/project/AGENTS.md).

## Do not

- Copy `helmsman/instructions/`, `helmsman/project/`, or the full `helmsman/AGENTS.md` to the repo root.
- Move, flatten, duplicate, or symlink the `helmsman/` folder — use it in place under `{root}`.
- Edit application source until the pack gates allow it (see `helmsman/AGENTS.md` §1.5).
