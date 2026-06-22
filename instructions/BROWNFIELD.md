# Brownfield Guide

**Read-only template** — how to **understand**, **document**, and **safely change** an **existing** codebase when this instruction set is dropped into a repo that already has application code.

Related: [`README.md`](../README.md), [`AGENTS.md`](../AGENTS.md) section 0 (mode gate), [`GREENFIELD.md`](GREENFIELD.md), [`TASK.md`](TASK.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`DOCUMENT.md`](DOCUMENT.md), [`CODE.md`](CODE.md), [`DESIGN.md`](DESIGN.md), [`HISTORY.md`](HISTORY.md).

For building a **new** app from scratch, use [`GREENFIELD.md`](GREENFIELD.md) instead.

---

## 0. Purpose

Brownfield mode: **understand → document in `project/*` → plan tasks → change safely**.

| Rule | Detail |
|------|--------|
| **Discover first** | Scan the repo before large edits; record findings in `project/*` |
| **Document actual paths** | `project/INFRASTRUCTURE.md` reflects **what exists** — not a forced `platforms/` layout |
| **Adapt to conventions** | Follow existing folder layout, stack, and patterns unless the user asks to change them |
| **No silent restructure** | Do not auto-scaffold `platforms/` or `deploy/` unless the user explicitly wants greenfield-style layout |
| **Plan before change** | Non-trivial work uses [`TASK.md`](TASK.md); feature specs use [`DOCUMENT.md`](DOCUMENT.md) |

---

## 1. Discovery workflow

Run discovery **before** meaningful code or config edits when `project/*` is missing or stale.

### 1.1 Scan order (adapt to repo)

1. **Root manifests** — `package.json`, `go.mod`, `Cargo.toml`, `pyproject.toml`, `pom.xml`, `docker-compose.yml`, `Makefile`, root `README`, CI configs (`.github/workflows/`, etc.)
2. **Application layout** — entrypoints, apps/packages, API routes, frontend roots, shared libraries
3. **Data layer** — DB config, ORM, migration folders, seed scripts
4. **Deploy / runtime** — Docker, Kubernetes, serverless, PaaS configs, env examples
5. **Dev workflow** — install, run, test, lint, typecheck commands per app or package
6. **UI** — component library, CSS framework, theme tokens, responsive patterns (if applicable)
7. **`ai_references/`** — user-provided specs, wireframes, notes (see [`ai_references/README.md`](ai_references/README.md))

### 1.2 Discovery output

Draft findings in the active task file or notes before editing. Capture:

- What the app does (inferred purpose)
- Runnable units (services, apps, packages) and their paths
- Stack per unit (language, framework, major libraries)
- How to run locally and in CI
- Gaps, risks, and unknowns

### 1.3 Optional onboarding task

For first-time adoption, create:

`project/task/{timestamp}_brownfield-onboarding.md`

with `Status: planning` → discovery steps → populate `project/*` → verify commands → `Status: complete`.

---

## 2. Populate `project/*` from discovery

Write or **merge** into local config files (gitignored). Do not overwrite existing user decisions without clarify.

| File | Brownfield content |
|------|-------------------|
| `project/OVERVIEW.md` | Inferred purpose, slug (or repo name), scope notes, known gaps |
| `project/INFRASTRUCTURE.md` | **Actual** paths: apps, docker, deploy, db, migrations, ports, env file locations |
| `project/AGENTS.md` | Discovered dev, lint, test, and CI commands — verify they run |
| `project/DESIGN.md` | Existing UI library, theme, breakpoints — or note that UI is N/A |

### `project/INFRASTRUCTURE.md` in brownfield

Record the **real** layout. Examples (not prescriptions):

| Repo style | Example paths to document |
|------------|---------------------------|
| Monorepo | `apps/web/`, `apps/api/`, `packages/shared/` |
| Classic split | `frontend/`, `backend/` |
| Single app | `src/`, root `Dockerfile` |
| Instruction greenfield | `platforms/web/`, `platforms/api/`, `deploy/` |

Include whatever containerization, deploy, and data tooling **already exists** — or note absence as a gap.

---

## 3. Document before change

| Need | Use |
|------|-----|
| Non-trivial implementation | [`TASK.md`](TASK.md) — plan-mode task in `project/task/` |
| New or changed feature behavior | [`DOCUMENT.md`](DOCUMENT.md) — `project/document/{feature-slug}/` |
| After work completes | [`HISTORY.md`](HISTORY.md) — `project/history/` entry |

Discovery findings feed:

- `project/document/{feature}/technical-documentation.md`
- `project/document/{feature}/system-design-document.md`

when documenting architecture or onboarding.

---

## 4. Adapt vs align

### Adapt (default)

- Match existing naming, folder layout, and stack
- Extend patterns already in the codebase
- Use paths from `project/INFRASTRUCTURE.md`, not assumptions from [`GREENFIELD.md`](GREENFIELD.md)

### Align (only when user requests)

Gradually apply [`CODE.md`](CODE.md) and [`DESIGN.md`](DESIGN.md) conventions on **new or touched** code — e.g. API `code` field, UUID PKs, mobile-first UI. Never silent mass refactors.

### Do not

- Impose `platforms/` layout on an existing repo without explicit user approval
- Replace the stack because GREENFIELD recommends a different one
- Skip documenting discovered commands in `project/AGENTS.md`

---

## 5. Brownfield Definition of Done (onboarding)

Onboarding is complete when **all** pass:

| # | Gate |
|---|------|
| 1 | `project/INFRASTRUCTURE.md` reflects the **actual** repo layout and infra |
| 2 | `project/AGENTS.md` lists dev/lint/test commands that were verified |
| 3 | `project/OVERVIEW.md` states purpose, slug, and notable gaps or risks |
| 4 | `project/DESIGN.md` exists or N/A is explicitly noted |
| 5 | Onboarding task (if used) is `Status: complete` |
| 6 | `project/history/{timestamp}_brownfield-onboarding.md` appended — links task file |

After onboarding, follow [`AGENTS.md`](../AGENTS.md) for ongoing tasks.

---

## 6. Agent rules

**Do:**

- Resolve brownfield mode per AGENTS §0 before assuming greenfield layout
- Run discovery when `project/*` is empty or contradicts the repo
- Record actual paths in `project/INFRASTRUCTURE.md`
- Create a task plan before non-trivial edits
- Update `project/document/` when building or significantly changing features

**Don't:**

- Assume `platforms/`, `deploy/`, or any path from GREENFIELD without verification
- Overwrite populated `project/*` files without user confirmation
- Bootstrap a new app layout when the user only asked to work in the existing codebase

---

## Related

- [`../README.md`](../README.md) — user-facing repo overview
- [`../AGENTS.md`](../AGENTS.md) — system gate, clarify, task workflow
- [`GREENFIELD.md`](GREENFIELD.md) — new app bootstrap (not brownfield)
- [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) — documentation architecture and four concerns
