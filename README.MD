# AI Instruction — Read Me First

Reusable AI agent instructions for any project. Copy the entire `AI INSTRUCTION/` folder into `{root}` when starting a new repo.

## Terminology

| Term | Meaning |
|------|---------|
| `{root}` | Repository root directory — layout details in `PROJECT/AGENTS.MD` |
| `{project}` | Project slug for Docker tags, backups, PR titles — set in [`PROJECT/OVERVIEW.MD`](PROJECT/OVERVIEW.MD) |
| `platforms/` | Fixed parent folder at `{root}/platforms/` for all runnable apps (always plural) |

## Document Index

| File | Purpose |
|------|---------|
| [`AGENTS.MD`](AGENTS.MD) | Workflow, clarify-before-build, minimum requirements, Docker/deploy/backup rules |
| [`CODE.MD`](CODE.MD) | Block comments, Logic-N steps, scaffold-first, auth scaffold-first, package-first, UUID/soft-delete/CRUD, API response codes and frontend scenario handling, production API baseline |
| [`DESIGN.MD`](DESIGN.MD) | Design system template — mobile-first layout, component library first for web (tokens in PROJECT) |
| [`HISTORY.MD`](HISTORY.MD) | How to write change log entries |
| [`DOCUMENT.MD`](DOCUMENT.MD) | How to write feature reference documentation |
| [`GREENFIELD.MD`](GREENFIELD.MD) | Greenfield **recommendations** for clarify-before-build (Go api, Next.js web, playbook, deploy examples) — always ask first; does not ship `deploy/` |
| [`PROJECT/`](PROJECT/) | This project's stack, layout, design, history, and feature docs |

## New Project Setup

When copying `AI INSTRUCTION/` to a new repo:

1. Copy the entire `AI INSTRUCTION/` folder to `{root}`
2. Edit [`PROJECT/OVERVIEW.MD`](PROJECT/OVERVIEW.MD) — slug, domain, purpose
3. Edit [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD) — requirement mapping, full tree, stack, commands
4. Edit [`PROJECT/DESIGN.MD`](PROJECT/DESIGN.MD) — colors, typography, components
5. Clear or replace [`PROJECT/HISTORY/`](PROJECT/HISTORY/) entries (keep folder; remove the previous project's history)
6. Clear or replace [`PROJECT/DOCUMENT/`](PROJECT/DOCUMENT/) feature folders (keep folder; remove the previous project's feature docs)
7. Do **not** edit top-level general files unless updating the shared template for all future projects

## Two-Tier System

```
AI INSTRUCTION/
├── README.MD          ← you are here
├── AGENTS.MD          ← general rules (read-only)
├── CODE.MD            ← general rules (read-only)
├── DESIGN.MD          ← general template (read-only)
├── HISTORY.MD         ← general rules (read-only)
├── DOCUMENT.MD        ← general rules (read-only)
├── GREENFIELD.MD      ← greenfield recommendations (read-only; no deploy/ folder)
└── PROJECT/           ← per-project config (agents MAY edit)
    ├── OVERVIEW.MD
    ├── AGENTS.MD
    ├── DESIGN.MD
    ├── HISTORY/
    └── DOCUMENT/
        └── {feature-slug}/
            └── ... (full-name doc files)
```

### Read-only (general rules)

Top-level `AGENTS.MD`, `CODE.MD`, `DESIGN.MD`, `HISTORY.MD`, `DOCUMENT.MD`, and `GREENFIELD.MD` are **reusable templates**. Do **not** modify them during normal project work unless the user explicitly asks to update the shared template.

### Editable (project-specific)

Everything under `PROJECT/` describes **this** project: stack, folder layout, design tokens, domain, change history, and feature documentation. Agents may read and write here.

## Minimum App Requirements

Every project must cover four concerns. Runnable apps always live under `{root}/platforms/` (fixed name). Which child apps exist (`web`, `api`, `db`, etc.) and where docker/deploy paths live are per-project — document them in [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD).

| Requirement | Covers |
|-------------|--------|
| **App** | Application source code under `platforms/` |
| **Docker** | Every runnable platform app must be dockerizable — scaffold Docker or `platforms/<app>/docker/` when added |
| **Deploy / Build** | Build, compose, deployment, backup/restore — created in the **built project** (`deploy/`); examples in [`GREENFIELD.MD`](GREENFIELD.MD) section 8 |
| **DB** | DB infra (run PostgreSQL) and migrations (default in backend; standalone migration app only when user requests) |

See [`AGENTS.MD`](AGENTS.MD) for the DB infra vs migrations split.

## Read Order

1. This file (`README.MD`)
2. General rules: `AGENTS.MD` → `CODE.MD` → `DESIGN.MD` → `HISTORY.MD` → `DOCUMENT.MD`
3. **Greenfield tasks:** [`GREENFIELD.MD`](GREENFIELD.MD) — read for **Recommended:** answers; clarify before first `platforms/` code
4. Project config: `PROJECT/OVERVIEW.MD` → `PROJECT/AGENTS.MD` → `PROJECT/DESIGN.MD`
5. Recent context: `PROJECT/HISTORY/` sorted by filename **descending** (newest first)
6. Feature context: `PROJECT/DOCUMENT/{feature}/` when working on a known feature

## Write Rules

| Action | Where |
|--------|-------|
| Append AI change log entry | `PROJECT/HISTORY/{timestamp}_{title}.md` |
| Create or update feature documentation | `PROJECT/DOCUMENT/{feature-slug}/` per `DOCUMENT.MD` |
| Update stack, env, folder layout, Docker names | `PROJECT/AGENTS.MD` |
| Update colors, UI tokens, components | `PROJECT/DESIGN.MD` |
| Update project purpose and goals | `PROJECT/OVERVIEW.MD` |
| Update reusable templates | Only when user explicitly requests |

## Agent Checklist

Before starting:

1. Read general rules (do not edit)
2. Read all `PROJECT/*` files for this repo's context
3. Scan `PROJECT/HISTORY/` newest first
4. Scan `PROJECT/DOCUMENT/{feature}/` when working on a known feature
5. Resolve unspecified decisions per [`AGENTS.MD`](AGENTS.MD) section 2 before writing code
6. Greenfield: read [`GREENFIELD.MD`](GREENFIELD.MD) for recommendations; clarify first; then follow bootstrap playbook after user confirms

After completing work:

1. Append entry to `PROJECT/HISTORY/` per `HISTORY.MD`
2. Update `PROJECT/DOCUMENT/` per `DOCUMENT.MD` when building or changing features
3. Update `PROJECT/*` only if project requirements changed
4. Never hardcode project names in general rule files
