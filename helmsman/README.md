# Instruction Pack

Reusable **agent guidance** — one **integrated system**. In an app: clone as `helmsman/`, then agents read [`helmsman/AGENTS.md`](AGENTS.md) and [`helmsman/instructions/RULES.md`](instructions/RULES.md). Default: **production-grade** unless you ask for MVP.

## What this is

A structured instruction set that helps **agents**:

- **Blueprint** work with `project/plans/` then **exhaustive standalone** `project/tasks/` before coding — **Application map** (§1.4a) then file-level steps; no shorthand (§1.4); follow §5.1; re-open active task each work block while `in_progress` ([`instructions/TASK.md`](instructions/TASK.md) §1.9)
- **Build** greenfield apps with `platforms/` (postgresql, minio, web, api, …) and E2E Docker verify
- **Understand** existing repos through discovery and local documentation
- **Document** features, changes, and project config in a local `project/` workspace
- **Write code** per [`instructions/CODE.md`](instructions/CODE.md) — all languages with comments; agents **re-read CODE.md at every coding task**
- **Re-enter helmsman every session** — HARD STOP + Gate A when the pack is present ([`AGENTS.md`](AGENTS.md))
- **Default UI theme** when user silent — neutral grayscale light per [`instructions/DESIGN.md`](instructions/DESIGN.md) §3; responsive strategy per §10

## Who it's for

Developers using **Cursor** (or similar tools) who want consistent **agent** behavior across projects.

## How to use it

1. Inside your app repo (`{root}`): `git clone <this-repo-url> helmsman` — folder name **`helmsman`**.
2. Create or update **`{root}/AGENTS.md`** — copy [`templates/root-AGENTS.md`](templates/root-AGENTS.md) or the [repo-root template](../AGENTS.md); merge the **For agents** block if you already have a root `AGENTS.md`.
3. Agents read **[`helmsman/AGENTS.md`](AGENTS.md)** for the full workflow (gates, plans, tasks, code). **Every session:** re-read this file and run Gate A when the pack is present.
4. Agents **use `helmsman/` in place** — read `helmsman/instructions/`, write to `helmsman/project/`. **Allowed at `{root}`:** thin `AGENTS.md` pointer only. **Forbidden:** copy full pack `AGENTS.md`, `instructions/`, or `project/` to `{root}`.
5. Greenfield app code (`platforms/`, `deploy/`, etc.) is created as a **sibling** of `helmsman/` at `{root}`.
6. Optionally drop reference material into [`other-references/`](other-references/) inside `helmsman/`.

**Do not** flatten or hoist the pack to `{root}`. Clone as `helmsman/` and leave it there.

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
