# Brownfield Guide

Understand, document, and safely change an **existing** codebase. For building a new app from scratch, use [`GREENFIELD.md`](GREENFIELD.md) instead.

**Read-only template.** Gates and read order: [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md). Production bar (applies to new/touched work): [`RULES.md`](RULES.md) §5. Pack isolation: [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) §0.

---

## 0. Purpose

Brownfield mode: **understand → document in `project/*` → plan tasks → change safely.**

| Rule | Detail |
|------|--------|
| **Discover first** | Scan the repo before large edits; record findings in `project/*` |
| **Document actual paths** | `project/PROJECT-INFRASTRUCTURE.md` reflects **what exists** — not a forced `platforms/` layout |
| **Adapt to conventions** | Follow existing folder layout, stack, and patterns unless the user asks to change them |
| **No silent restructure** | Do not auto-scaffold `platforms/` or `deploy/` unless the user explicitly wants greenfield-style layout |
| **Plan before change** | Non-trivial work uses [`PLAN.md`](PLAN.md) (Gate D) and [`TASK.md`](TASK.md) (Gate E); feature specs use [`DOCUMENT.md`](DOCUMENT.md) |
| **Production on touched work** | New or changed code, UI, and infra meet the production bar ([`RULES.md`](RULES.md) §5) — adapt legacy patterns, don't ship stubs on surfaces you touch |

### 0.1 Fresh adoption (mandatory first-run)

When Helmsman is **newly added** at `{root}/helmsman-agent/` in an **existing** app and `project/*` is still blank, agents **must onboard before any other app work** — even if the user already asked for a feature.

| Signal | Meaning |
|--------|---------|
| Missing `project/PROJECT-OVERVIEW.md` **or** `project/PROJECT-INFRASTRUCTURE.md` | Core workspace not built |
| Only tracked `project/*/README.md` files exist under `project/` | Fresh pack install |
| Substantial app source at `{root}` (manifests, `src/`, `apps/`, …) | Brownfield — not greenfield |
| No `project/histories/*_brownfield-onboarding.md` | Onboarding not yet recorded |

When **all** signals match → mandatory first-run onboarding (§1.3) before any other non-trivial app task.

**Park the user's request:** record their verbatim request in the onboarding task (`User request` + `Parked request` fields), tell the user onboarding runs first, and do **not** start the user's feature, task, or app edits until §5 DoD passes.

**Skip only when:** the user explicitly says skip onboarding, or the work is pack-only (`instructions/`, `HELMSMAN-AGENT.md`, tracked `project/*/README.md`).

---

## 1. Discovery workflow

Run discovery **before** meaningful code or config edits when `project/*` is missing or stale — required on fresh adoption (§0.1). Discovery satisfies Gate A and, for fresh adoption, **is** Gate B (plus partial Gate C for repo-level docs). It does **not** replace Gates C–E (documents/design, plan, task) before feature code.

### 1.1 Scan order (adapt to repo)

0. **Park user request** — if asked for something during fresh adoption, record it verbatim for execution after §5 DoD.
0b. **`{root}/AGENTS.md`** — confirm or create from [`templates/root-AGENTS.md`](../templates/root-AGENTS.md); merge Helmsman sections if it exists.
1. **Root manifests** — `package.json`, `go.mod`, `Cargo.toml`, `pyproject.toml`, `pom.xml`, `docker-compose.yml`, `Makefile`, app `README`, CI configs — at `{root}`, not inside `helmsman-agent/`.
2. **`helmsman-agent/` pack** — if present, read for agent rules; do not treat as app source; do not copy to `{root}`.
3. **Application layout** — entrypoints, apps/packages, API routes, frontend roots, shared libraries.
4. **Data layer** — DB config, ORM, migration folders, seed scripts.
5. **Deploy / runtime** — Docker, Kubernetes, serverless, PaaS configs, env examples.
6. **Dev workflow** — install, run, test, lint, typecheck commands per app or package.
7. **UI** — component library, CSS framework, theme tokens, responsive patterns (if applicable).
8. **`other-references/`** — user-provided specs, wireframes, notes ([`other-references/README.md`](../other-references/README.md)).

### 1.2 Discovery output

Draft findings in the active task file or notes before editing. Capture: what the app does (inferred purpose); runnable units and their paths; stack per unit; how to run locally and in CI; gaps, risks, and unknowns.

### 1.3 Required onboarding task

On fresh adoption (§0.1), create **before** any other app task:

`project/tasks/{timestamp}_brownfield-onboarding.md`

| Field | Content |
|-------|---------|
| `User request` | Onboarding scope |
| `Parked request` | Verbatim user message if they asked for something else — execute after onboarding |
| `Status` | `planning` → discovery + populate `project/*` → verify commands → `complete` |

Follow [`TASK.md`](TASK.md) §5.2 for exhaustive step drafting. Onboarding may proceed **without** a Gate D plan — it **is** Gate B for fresh adoption.

---

## 2. Populate `project/*` from discovery

Write or **merge** into local config files (gitignored). Do not overwrite existing user decisions without clarify.

| File | Brownfield content |
|------|-------------------|
| `{root}/AGENTS.md` | Required — copy or merge from [`templates/root-AGENTS.md`](../templates/root-AGENTS.md) |
| `project/PROJECT-OVERVIEW.md` | Per [`OVERVIEW.md`](OVERVIEW.md) — inferred purpose, slug (or repo name), scope notes, known gaps |
| `project/PROJECT-INFRASTRUCTURE.md` | **Actual** paths: apps, docker, deploy, db, migrations, ports, env file locations |
| `project/PROJECT-AGENTS.md` | Discovered dev, lint, test, and CI commands — verify they run |
| `project/PROJECT-DESIGN.md` | Existing UI library, theme, breakpoints; links to `project/design/` — or note UI is N/A |
| `project/documents/repo/technical-documentation.md` | Whole-repo implementation overview — inferred from code |
| `project/documents/repo/system-design-document.md` | Whole-repo architecture, components, integration — inferred from code |

**Use the `repo` slug** for codebase-wide knowledge captured during onboarding (not a product feature). Required on fresh adoption when the app is non-trivial; content must reflect **what exists in `{root}`** after the §1.1 scan.

Record the **real** layout in `project/PROJECT-INFRASTRUCTURE.md` — e.g. monorepo (`apps/web/`, `packages/shared/`), classic split (`frontend/`, `backend/`), single app (`src/`), or instruction-greenfield (`platforms/`). Include whatever containerization, deploy, and data tooling already exists — or note absence as a gap. When the repo has a web UI, also populate `project/design/` from existing styles per [`DESIGN.md`](DESIGN.md) §1; do not invent a new design system unless the user requests alignment.

---

## 3. Document before change

Non-trivial work requires `project/plans/` (Gate D), `project/tasks/` (Gate E), and `project/documents/{feature}/` when building features. **Fresh-adoption exception:** §0.1 onboarding satisfies Gate B and partial Gate C (via core `project/*` + `project/documents/repo/`); feature-specific docs are still required later per user feature.

| Need | Use |
|------|-----|
| Blueprint | [`PLAN.md`](PLAN.md) — `project/plans/` |
| Exhaustive standalone steps | [`TASK.md`](TASK.md) — `project/tasks/` |
| Feature behavior | [`DOCUMENT.md`](DOCUMENT.md) — `project/documents/` |
| After work | [`HISTORY.md`](HISTORY.md) — link plan, task, E2E results |

---

## 4. Adapt vs align

**Adapt (default):** match existing naming, layout, and stack; extend patterns already in the codebase; use paths from `project/PROJECT-INFRASTRUCTURE.md`, not GREENFIELD assumptions.

**Align (only when the user requests):** gradually apply [`CODE.md`](CODE.md) and [`DESIGN.md`](DESIGN.md) conventions on **new or touched** code — CODE §1–2 comment discipline applies in any language even when legacy files lack it; plus API `code` field, UUID PKs, and responsive strategy. Re-read CODE.md at each coding task start ([`RULES.md`](RULES.md) §8). **Never** do silent mass refactors.

**Do not:** impose `platforms/` on an existing repo without explicit approval; replace the stack because GREENFIELD recommends another; skip documenting discovered commands in `project/PROJECT-AGENTS.md`.

---

## 5. Brownfield Definition of Done (onboarding)

| # | Gate |
|---|------|
| 0 | `{root}/AGENTS.md` exists with Helmsman sections |
| 1 | `project/PROJECT-INFRASTRUCTURE.md` reflects the **actual** layout and infra — note non-production gaps (missing health, backup, env examples) |
| 2 | `project/PROJECT-AGENTS.md` lists dev/lint/test commands that were verified |
| 3 | `project/PROJECT-OVERVIEW.md` states purpose, slug, and notable gaps or risks |
| 4 | `project/PROJECT-DESIGN.md` index exists; `project/design/` populated from existing UI, or N/A noted |
| 5 | `project/documents/repo/` has `technical-documentation.md` and `system-design-document.md` when app is non-trivial |
| 6 | Onboarding task is `Status: complete` |
| 7 | `project/histories/{timestamp}_brownfield-onboarding.md` appended — links the task file |

After onboarding, follow [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) for ongoing tasks.

---

## 6. Agent rules

**Do:** resolve brownfield mode before assuming greenfield layout; pass gates A–F before non-trivial edits; run discovery when `project/*` is empty or contradicts the repo; complete mandatory onboarding before a parked request on fresh adoption; record actual paths; create plan + one exhaustive standalone task + feature docs before non-trivial edits; build at full production quality on touched surfaces; update `project/documents/` when changing features.

**Don't:** assume `platforms/`, `deploy/`, or any GREENFIELD path without verification; overwrite populated `project/*` without confirmation; bootstrap a new layout when the user only asked to work in the existing codebase; start the user's feature while fresh-adoption signals (§0.1) are still true.

---

## Related

- [`GREENFIELD.md`](GREENFIELD.md) — new app bootstrap (not brownfield)
- [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) — documentation architecture
- [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) — gates, clarify, task workflow
- [`../README.md`](../README.md) — user-facing repo overview
