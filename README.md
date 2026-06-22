# Instruction Pack

Reusable **agent guidance** for software projects — greenfield (new apps) and brownfield (existing codebases). Copy this folder into your repo root and point **agents** at **`AGENTS.md`**.

## What this is

A structured instruction set that helps **agents**:

- **Plan** work with task files and clarification before coding
- **Build** new apps with consistent layout, Docker, and deploy patterns
- **Understand** existing repos through discovery and local documentation
- **Document** features, changes, and project config in a local `project/` workspace

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
| [`AGENTS.md`](AGENTS.md) | **Agent entry gate** — mode, workflow, read order |
| [`instructions/`](instructions/) | Rule templates (CODE, DESIGN, GREENFIELD, etc.) |
| [`project/`](project/) | Local agent workspace — config, tasks, histories, feature docs (mostly gitignored) |
| [`other-references/`](other-references/) | Optional user reference dumps (gitignored except README) |

## Operating modes

| Mode | When | Guide |
|------|------|-------|
| **Greenfield** | New app from scratch | [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) |
| **Brownfield** | Existing codebase | [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md) |

## License

MIT — see [LICENSE](LICENSE).
