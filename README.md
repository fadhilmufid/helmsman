# Instruction Pack

Reusable **agent guidance** — one **integrated system**. Agents read [`AGENTS.md`](AGENTS.md) then [`instructions/RULES.md`](instructions/RULES.md). Default: **production-grade** unless you ask for MVP.

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

1. Copy this entire folder into your repository root (`{root}`).
2. Configure Cursor (or your tool) to read **[`AGENTS.md`](AGENTS.md)** at repo root — **not** this README.
3. Agents resolve **greenfield** vs **brownfield** and populate `project/*` per the mode guides in [`instructions/`](instructions/).
4. Optionally drop reference material (specs, wireframes, notes) into [`other-references/`](other-references/).

## Folder overview

| Path | Purpose |
|------|---------|
| [`AGENTS.md`](AGENTS.md) | **Agent entry** — mode, gates A–F |
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
