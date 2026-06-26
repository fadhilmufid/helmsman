# Instruction Pack

Reusable **agent guidance** — one **integrated system**. In an app: clone the `helmsman` repository, copy the `helmsman-agent/` folder to `{root}/helmsman-agent/`, and use the pack in place. Agents read [`helmsman-agent/HELMSMAN-AGENT.md`](HELMSMAN-AGENT.md) and [`helmsman-agent/instructions/RULES.md`](instructions/RULES.md). Default: **production-grade** unless you ask for MVP.

## What this is

A structured instruction set that helps **agents**:

- **Blueprint** work with `project/plans/` then **exhaustive standalone** `project/tasks/` before coding — **Application map** (§1.4a) then file-level steps; no shorthand (§1.4); follow §5.1; re-open active task each work block while `in_progress` ([`instructions/TASK.md`](instructions/TASK.md) §1.9)
- **Build** greenfield apps with `platforms/` (postgresql, minio, web, api, …) and E2E Docker verify
- **Understand** existing repos through discovery — on first use, mandatory onboarding scans the codebase and populates `project/*` before feature work ([`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1)
- **Document** features, changes, and project config in a local `project/` workspace
- **Write code** per [`instructions/CODE.md`](instructions/CODE.md) — all languages with comments; agents **re-read CODE.md at every coding task**
- **Re-enter helmsman every session** — HARD STOP + §1.4 read-all before Gate B when the pack is present ([`HELMSMAN-AGENT.md`](HELMSMAN-AGENT.md))
- **Default UI theme** when user silent — neutral grayscale light per [`instructions/DESIGN.md`](instructions/DESIGN.md) §3; responsive strategy per §10

## Who it's for

Developers using **Cursor** (or similar tools) who want consistent **agent** behavior across projects.

## How to use it

1. Clone this repository: `git clone <this-repo-url>`. Copy the **`helmsman-agent/`** folder into your app repo at `{root}/helmsman-agent/`.
2. **Required:** create or update **`{root}/AGENTS.md`** — copy [`templates/root-AGENTS.md`](templates/root-AGENTS.md) (or the [monorepo template](../AGENTS.md) from a full clone); merge the **Helmsman** sections if you already have a root `AGENTS.md`. Agents auto-create from the template if missing. Agent-only template sections: What is Helmsman, How to use Helmsman, Do not.
3. Agents read **[`helmsman-agent/HELMSMAN-AGENT.md`](HELMSMAN-AGENT.md)** for the full workflow (gates, plans, tasks, code). **Every session:** complete §1.4 Phases 1–3 (read all instructions) before Gate B when the pack is present.
4. Agents **use `helmsman-agent/` in place** — read `helmsman-agent/instructions/`, write to `helmsman-agent/project/`. **Required at `{root}`:** `AGENTS.md` from [`templates/root-AGENTS.md`](templates/root-AGENTS.md) (Helmsman sections only). **Forbidden:** copy full pack `HELMSMAN-AGENT.md`, `instructions/`, or `project/` to `{root}`.
5. Optionally drop reference material into [`other-references/`](other-references/) inside `helmsman-agent/`.

**Do not** flatten or hoist the pack to `{root}`. Keep it at `{root}/helmsman-agent/`.

## Folder overview

Paths below are **inside `{pack}`** (`helmsman-agent/` when present in an app). See [`HELMSMAN-AGENT.md`](HELMSMAN-AGENT.md) §0.

| Path | Purpose |
|------|---------|
| [`HELMSMAN-AGENT.md`](HELMSMAN-AGENT.md) | **Agent entry** — HARD STOP re-entry every session, mode, gates A–F |
| [`instructions/RULES.md`](instructions/RULES.md) | **Integrated rulebook** — read second |
| [`instructions/`](instructions/) | Domain templates — `PLAN.md`, `TASK.md`, `CODE.md`, `DESIGN.md`, `DOCUMENT.md`, `HISTORY.md`, `INFRASTRUCTURE.md`, `GREENFIELD.md`, `BROWNFIELD.md`, `README.md` (index) |
| [`project/plans/`](project/plans/) | Blueprint plans (gitignored except README) |
| [`project/`](project/) | Local agent workspace — config, tasks, histories, feature docs (mostly gitignored) |
| [`other-references/`](other-references/) | Optional user reference dumps (gitignored except README) |

## Operating modes

| Mode | When | Guide |
|------|------|-------|
| **Greenfield** | New app from scratch | [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) |
| **Brownfield** | Existing codebase | [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md) |

## License

MIT — see [LICENSE](LICENSE).
