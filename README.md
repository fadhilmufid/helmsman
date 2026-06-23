# Instruction Pack

Reusable **agent guidance** — one **integrated system**. In an app: clone as `helmsman/`, then agents read [`helmsman/AGENTS.md`](AGENTS.md) and [`helmsman/instructions/RULES.md`](instructions/RULES.md). Default: **production-grade** unless you ask for MVP.

## What this is

A structured instruction set that helps **agents**:

- **Blueprint** work with `project/plans/` then **exhaustive standalone** `project/tasks/` before coding
- **Build** greenfield apps with `platforms/` (postgresql, minio, web, api, …) and E2E Docker verify
- **Understand** existing repos through discovery and local documentation
- **Document** features, changes, and project config in a local `project/` workspace
- **Write code** per [`instructions/CODE.md`](instructions/CODE.md) — all languages with comments; agents **re-read CODE.md at every coding task**

## Who it's for

Developers using **Cursor** (or similar tools) who want consistent **agent** behavior across projects.

## How to use it

1. Inside your app repo (`{root}`): `git clone <this-repo-url> helmsman` — folder name **`helmsman`**.
2. Configure Cursor (or your tool) to read **[`helmsman/AGENTS.md`](AGENTS.md)** — **not** this README, and **not** a root-level copy.
3. Agents **use `helmsman/` in place** — read `helmsman/instructions/`, write to `helmsman/project/`. They must **not** copy `instructions/`, `project/`, or `AGENTS.md` to `{root}`. **Every session:** agents re-read [`helmsman/AGENTS.md`](AGENTS.md) and run Gate A when the pack is present — including after bootstrap is complete.
4. Greenfield app code (`platforms/`, `deploy/`, etc.) is created as a **sibling** of `helmsman/` at `{root}`.
5. Optionally drop reference material into [`other-references/`](other-references/) inside `helmsman/`.

**Do not** copy this entire folder into `{root}` — that causes agents to hoist the pack. Clone as `helmsman/` and leave it there.

## Folder overview

Paths below are **inside `{pack}`** (`helmsman/` when installed in an app). See [`AGENTS.md`](AGENTS.md) §0.

| Path | Purpose |
|------|---------|
| [`AGENTS.md`](AGENTS.md) | **Agent entry** — HARD STOP re-entry every session, mode, gates A–F |
| [`instructions/RULES.md`](instructions/RULES.md) | **Integrated rulebook** — read second |
| [`instructions/`](instructions/) | Domain templates (PLAN, TASK, CODE, …) |
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
