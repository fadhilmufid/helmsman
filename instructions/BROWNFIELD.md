# Brownfield Guide

**Integration:** Discovery feeds `project/plans/` (Gate D) then `project/tasks/` (Gate E). Platform paths may differ from greenfield — document actual layout. See [`RULES.md`](RULES.md).

**Read-only template** — understand, document, and safely change an **existing** codebase.

For building a **new** app from scratch, use [`GREENFIELD.md`](GREENFIELD.md) instead.

---

## 0. Purpose

Brownfield mode: **understand → document in `project/*` → plan tasks → change safely**.

| Rule | Detail |
|------|--------|
| **Execution gates** | Follow [`AGENTS.md`](../AGENTS.md) §0.5 — read-first, documents/design, plan, exhaustive task, then code |
| **Discover first** | Scan the repo before large edits; record findings in `project/*` |
| **Document actual paths** | `project/INFRASTRUCTURE.md` reflects **what exists** — not a forced `platforms/` layout |
| **Adapt to conventions** | Follow existing folder layout, stack, and patterns unless the user asks to change them |
| **No silent restructure** | Do not auto-scaffold `platforms/` or `deploy/` unless the user explicitly wants greenfield-style layout |
| **Plan before change** | Non-trivial work uses [`PLAN.md`](PLAN.md) (`project/plans/`, Gate D) and [`TASK.md`](TASK.md) (`project/tasks/`, Gate E); feature specs use [`DOCUMENT.md`](DOCUMENT.md) |
| **Production on touched work** | New or changed code, UI, and infra meet production bar per [`RULES.md`](RULES.md) §5 — adapt legacy patterns, don't ship stubs on surfaces you touch |

---

## 1. Discovery workflow

Run discovery **before** meaningful code or config edits when `project/*` is missing or stale. Discovery satisfies AGENTS Gate A — it does **not** replace Gates C–E (documents/design, blueprint plan, exhaustive task) before code.

### 1.1 Scan order (adapt to repo)

1. **Root manifests** — `package.json`, `go.mod`, `Cargo.toml`, `pyproject.toml`, `pom.xml`, `docker-compose.yml`, `Makefile`, root `README`, CI configs (`.github/workflows/`, etc.)
2. **Application layout** — entrypoints, apps/packages, API routes, frontend roots, shared libraries
3. **Data layer** — DB config, ORM, migration folders, seed scripts
4. **Deploy / runtime** — Docker, Kubernetes, serverless, PaaS configs, env examples
5. **Dev workflow** — install, run, test, lint, typecheck commands per app or package
6. **UI** — component library, CSS framework, theme tokens, responsive patterns (if applicable)
7. **`other-references/`** — user-provided specs, wireframes, notes (see [`other-references/README.md`](other-references/README.md))

### 1.2 Discovery output

Draft findings in the active task file or notes before editing. Capture:

- What the app does (inferred purpose)
- Runnable units (services, apps, packages) and their paths
- Stack per unit (language, framework, major libraries)
- How to run locally and in CI
- Gaps, risks, and unknowns

### 1.3 Optional onboarding task

For first-time adoption, create:

`project/tasks/{timestamp}_brownfield-onboarding.md`

with `Status: planning` → discovery steps → populate `project/*` → verify commands → `Status: complete`.

---

## 2. Populate `project/*` from discovery

Write or **merge** into local config files (gitignored). Do not overwrite existing user decisions without clarify.

| File | Brownfield content |
|------|-------------------|
| `project/OVERVIEW.md` | Inferred purpose, slug (or repo name), scope notes, known gaps |
| `project/INFRASTRUCTURE.md` | **Actual** paths: apps, docker, deploy, db, migrations, ports, env file locations |
| `project/AGENTS.md` | Discovered dev, lint, test, and CI commands — verify they run |
| `project/DESIGN.md` | Design index — existing UI library, theme, breakpoints; links to `project/design/` — or note that UI is N/A |

### `project/INFRASTRUCTURE.md` in brownfield

Record the **real** layout. Examples (not prescriptions):

| Repo style | Example paths to document |
|------------|---------------------------|
| Monorepo | `apps/web/`, `apps/api/`, `packages/shared/` |
| Classic split | `frontend/`, `backend/` |
| Single app | `src/`, root `Dockerfile` |
| Instruction greenfield | `platforms/web/`, `platforms/api/`, `deploy/` |

Include whatever containerization, deploy, and data tooling **already exists** — or note absence as a gap.

When the repo has a web UI, discovery also populates **`project/design/`** from existing styles, components, and screens per [`DESIGN.md`](DESIGN.md) §1 — update only files that match what exists; do not invent a new design system unless the user requests alignment.

---

## 3. Document before change

**Hard gate:** Non-trivial work requires `project/plans/` (Gate D), `project/tasks/` (Gate E), and `project/documents/{feature}/` when building features — per AGENTS §0.5 and [`RULES.md`](RULES.md).

| Need | Use |
|------|-----|
| Blueprint | [`PLAN.md`](PLAN.md) — `project/plans/` |
| Exhaustive standalone steps | [`TASK.md`](TASK.md) — `project/tasks/` |
| Feature behavior | [`DOCUMENT.md`](DOCUMENT.md) — `project/documents/` |
| After work | [`HISTORY.md`](HISTORY.md) — link plan, task, E2E results |

Discovery findings feed:

- `project/documents/{feature}/technical-documentation.md`
- `project/documents/{feature}/system-design-document.md`

when documenting architecture or onboarding.

---

## 4. Adapt vs align

### Adapt (default)

- Match existing naming, folder layout, and stack
- Extend patterns already in the codebase
- Use paths from `project/INFRASTRUCTURE.md`, not assumptions from [`GREENFIELD.md`](GREENFIELD.md)

### Align (only when user requests)

Gradually apply [`CODE.md`](CODE.md) and [`DESIGN.md`](DESIGN.md) conventions on **new or touched** code — **§1–2 comment discipline applies in any language** (§0), even when legacy files lack it; plus API `code` field, UUID PKs, mobile-first UI. Re-read CODE.md at each coding task start per [`RULES.md`](RULES.md) §8. Never silent mass refactors.

### Do not

- Impose `platforms/` layout on an existing repo without explicit user approval
- Replace the stack because GREENFIELD recommends a different one
- Skip documenting discovered commands in `project/AGENTS.md`

---

## 5. Brownfield Definition of Done (onboarding)

Onboarding is complete when **all** pass:

| # | Gate |
|---|------|
| 1 | `project/INFRASTRUCTURE.md` reflects the **actual** repo layout and infra — note when discovered infra is **not** production-ready (missing health, backup, env examples) as a documented gap |
| 2 | `project/AGENTS.md` lists dev/lint/test commands that were verified |
| 3 | `project/OVERVIEW.md` states purpose, slug, and notable gaps or risks |
| 4 | `project/DESIGN.md` index exists; `project/design/` populated from existing UI or N/A is explicitly noted |
| 5 | Onboarding task (if used) is `Status: complete` |
| 6 | `project/histories/{timestamp}_brownfield-onboarding.md` appended — links task file |

After onboarding, follow [`AGENTS.md`](../AGENTS.md) for ongoing tasks.

---

## 6. Agent rules

**Do:**

- Resolve brownfield mode per AGENTS §0 before assuming greenfield layout
- Pass AGENTS §0.5 execution gates before non-trivial application edits
- Run discovery when `project/*` is empty or contradicts the repo
- Record actual paths in `project/INFRASTRUCTURE.md`
- Create `project/plans/`, one exhaustive standalone `project/tasks/` file, and `project/documents/{feature}/` before non-trivial edits
- Build at full production quality per [`RULES.md`](RULES.md) §5 — not bare minimum
- Update `project/documents/` when building or significantly changing features

**Don't:**

- Assume `platforms/`, `deploy/`, or any path from GREENFIELD without verification
- Overwrite populated `project/*` files without user confirmation
- Bootstrap a new app layout when the user only asked to work in the existing codebase

---

## Related

- [`../README.md`](../README.md) — user-facing repo overview
- [`../AGENTS.md`](../AGENTS.md) — agent gate, clarify, task workflow
- [`GREENFIELD.md`](GREENFIELD.md) — new app bootstrap (not brownfield)
- [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) — documentation architecture and four concerns
