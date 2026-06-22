# References

Optional folder for **user-provided reference material** — anything you want the system to read while working on this project.

## What to put here

- PDFs, screenshots, wireframes, exports
- Third-party specs, API docs, design files
- Notes, spreadsheets, meeting summaries
- Any folder or file structure you prefer

## What not to put here

- Application source code (paths per `project/INFRASTRUCTURE.md`)
- Deploy scripts (`deploy/`)
- Instruction templates (`instructions/`, root `AGENTS.md`)
- Project workflow files (`project/OVERVIEW.md`, `project/INFRASTRUCTURE.md`, `project/history/`, etc.)

## For the system

1. Scan this folder when it exists and has content — before and during tasks (especially **brownfield** discovery per [`BROWNFIELD.md`](../instructions/BROWNFIELD.md))
2. Treat contents as **user-provided context**, not authoritative over instruction templates or `project/` config
3. Do not move reference files into application source folders or commit them — this folder is gitignored except this README

## Git

Everything under `ai_references/` is **gitignored** except this file. Dump references freely; they stay local to your machine.
