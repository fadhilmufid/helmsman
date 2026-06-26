# Agent Entry — Helmsman

This repo contains a Helmsman instruction pack at `helmsman-agent/`. **Every session starts here.** Agents read this file first, then [`instructions/RULES.md`](instructions/RULES.md). Users: see [`README.md`](README.md).

New to the terms `{root}`, `{pack}`, gates A–F, or "Application map"? See the glossary in [`instructions/README.md`](instructions/README.md).

---

## Quickstart (if you read nothing else)

1. **Re-enter every session.** Run the HARD STOP block below before any non-trivial work — even if a previous chat already did it. Chat memory does not count as a fresh read.
2. **Read the pack in order** (§1.4): this file → `{root}/AGENTS.md` → [`RULES.md`](instructions/RULES.md) → [`README.md`](instructions/README.md) → mode guide → the gate-flow templates.
3. **Pick a mode** (§1): new app → [`GREENFIELD.md`](instructions/GREENFIELD.md); existing code → [`BROWNFIELD.md`](instructions/BROWNFIELD.md).
4. **Follow gates A–F** (§1.5; full table in [`RULES.md`](instructions/RULES.md) §2): read → clarify → docs/design → plan → task → code → verify. **No application code until Gate A passes.**
5. **Write to `helmsman-agent/project/`**, never the repo root. **Never copy the pack into `{root}`** (§0).

---

## HARD STOP — re-entry (every session)

While `helmsman-agent/` exists, run this block at the start of every session and before every non-trivial task — including after greenfield bootstrap. Prior chat context does not replace a fresh read.

1. **Discover `{pack}`** — workspace is `{root}` → `{pack}` = `{root}/helmsman-agent/`; workspace is `{pack}` → use this folder.
2. **Ensure `{root}/AGENTS.md`** — required when `{pack}` exists. If missing, copy [`templates/root-AGENTS.md`](templates/root-AGENTS.md) to `{root}/AGENTS.md`; if present without the Helmsman sections (What is / How to use / Do not), merge them. **STOP** until satisfied.
3. **Read this file in full.**
4. **Read all instructions** (§1.4 Phases 1–3) in gate-flow order — **STOP** before application work.
5. **Scan `{pack}/project/`** (§1.4 Phase 4) — config, plans, tasks, histories, documents, design in scope.
6. **Fresh brownfield adoption?** ([`BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1) → run mandatory onboarding; park other requests until BROWNFIELD §5 passes.
7. **Active task `in_progress`?** → run [`TASK.md`](instructions/TASK.md) §1.9 before any app edit.
8. **Follow gates A–F** (§1.5) for the rest of the session.

**Exception:** pack maintenance only (`{pack}/instructions/`, this file, tracked `{pack}/project/*/README.md`).

---

## 0. Pack isolation — use in place

The pack **stays at `{root}/helmsman-agent/`** and is used in place. Never copy, move, flatten, or symlink it into the app repo root.

| Term | Meaning |
|------|---------|
| **`{pack}`** | This folder — `{root}/helmsman-agent/` |
| **`{root}`** | App repository root — parent of `{pack}` |

**Typical app layout:**

```
{root}/
├── AGENTS.md          ← required thin pointer (from templates/root-AGENTS.md)
├── helmsman-agent/    ← {pack} — use in place
│   ├── HELMSMAN-AGENT.md, README.md, LICENSE, .gitignore
│   ├── instructions/  ← read-only rule templates
│   ├── project/       ← write plans, tasks, histories, config HERE
│   ├── templates/
│   └── other-references/
├── platforms/         ← greenfield app code (sibling of the pack)
└── deploy/
```

**Do:** read `{pack}/instructions/`; write to `{pack}/project/`; keep `{root}/AGENTS.md` current.

**Don't:** create `{root}/instructions/`, `{root}/project/`, or `{root}/other-references/`; copy the full pack files to `{root}` (the thin `{root}/AGENTS.md` is the only allowed pack-derived file there); put app code (`platforms/`, `deploy/`, source) inside `{pack}`.

Paths like `project/` and `instructions/` mean **inside `{pack}`** unless prefixed with `{root}/`. Full folder tree: [`INFRASTRUCTURE.md`](instructions/INFRASTRUCTURE.md). Detail: [`RULES.md`](instructions/RULES.md) §1.1.

---

## 1. Choose mode (first)

| Mode | When | Guide |
|------|------|-------|
| **Greenfield** | New app from scratch | [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) |
| **Brownfield** | Existing codebase | [`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md) |

| User signal | Mode |
|-------------|------|
| *"Create … app"*, empty repo + new product | Greenfield |
| *"Understand this repo"*, substantial existing code | Brownfield |
| Fresh pack at `{root}/helmsman-agent/` + existing app code | Brownfield — mandatory onboarding ([`BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1) |
| Populated `project/*` | Mode recorded in `project/PROJECT-OVERVIEW.md` |

**Ambiguous?** Ask once (recommend brownfield if substantial app code exists). Record the mode in `project/PROJECT-OVERVIEW.md`.

---

## 1.4 Read all instructions first (STOP before Gate B)

Read **Phases 1–3 in full, in order, every session** and before every non-trivial task. This blocks Gate B and all application work. Prior chat context does not count.

| Phase | Read (in order) |
|-------|-----------------|
| **1 — Entry** | This file → **`{root}/AGENTS.md`** → [`RULES.md`](instructions/RULES.md) → [`README.md`](instructions/README.md) (index + glossary) |
| **2 — Mode** | [`GREENFIELD.md`](instructions/GREENFIELD.md) or [`BROWNFIELD.md`](instructions/BROWNFIELD.md) |
| **3 — Gate-flow** | [`OVERVIEW.md`](instructions/OVERVIEW.md) → [`INFRASTRUCTURE.md`](instructions/INFRASTRUCTURE.md) → [`DOCUMENT.md`](instructions/DOCUMENT.md) + [`DESIGN.md`](instructions/DESIGN.md) → [`PLAN.md`](instructions/PLAN.md) → [`TASK.md`](instructions/TASK.md) → [`CODE.md`](instructions/CODE.md) → [`HISTORY.md`](instructions/HISTORY.md) |
| **4 — Context scan** | [`other-references/`](other-references/) when non-empty → scan `{pack}/project/` (config `PROJECT-*`, active `plans/`, `tasks/`, newest `histories/`, in-scope `documents/` and `design/`) → fresh brownfield adoption check ([`BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1) |

Phase 4 is a **folder scan** — not a full read of every gitignored file, but do not skip it because paths are gitignored. **No Gate B until Phases 1–3 are complete.**

---

## 1.5 Execution gates A–F (STOP)

Sequential — do not skip or reorder. **Full table and blocking detail: [`RULES.md`](instructions/RULES.md) §2.**

| Gate | One-line requirement |
|------|----------------------|
| **A — Read-first** | §1.4 Phases 1–3 read + Phase 4 scan; `{root}/AGENTS.md` present with Helmsman sections |
| **B — Clarify and record** | Resolve open decisions; write `project/PROJECT-OVERVIEW.md` then the other `PROJECT-*` config (§3) |
| **C — Documents and design** | `project/documents/`; `project/design/` when web UI |
| **D — Blueprint plan** | `project/plans/` per [`PLAN.md`](instructions/PLAN.md) |
| **E — Task before code** | One exhaustive standalone `project/tasks/` file per [`TASK.md`](instructions/TASK.md); re-read [`CODE.md`](instructions/CODE.md) each coding block |
| **F — Quality + E2E** | Production bar + compose/deploy verify ([`RULES.md`](instructions/RULES.md) §5–§6) before complete |

**Exception:** pack maintenance (`instructions/`, this file, tracked `project/*/README.md`).

---

## 3. Clarify before build (Gate B)

**Ask first, code second.** Do not edit application code until unspecified decisions are resolved. If the user says *"use your recommendations"*, apply mode-guide defaults, record them in `project/*`, and proceed.

### Shared checklist

| Area | Resolve |
|------|---------|
| Purpose and scope | MVP only if the user explicitly asks; else production-ready |
| Feature docs | `project/documents/` per [`DOCUMENT.md`](instructions/DOCUMENT.md) |
| Data / API / CRUD | [`CODE.md`](instructions/CODE.md) §8, §11 |
| Visual theme (web UI) | User preference, or default neutral grayscale light ([`DESIGN.md`](instructions/DESIGN.md) §3) — record in `project/PROJECT-DESIGN.md` |
| Responsive strategy (web UI) | mobile-first / desktop-first / balanced ([`DESIGN.md`](instructions/DESIGN.md) §10) — record in `project/PROJECT-DESIGN.md` |

### Mode-specific clarify

- **Greenfield:** project slug, service platforms (`postgresql`, `minio`, …), application platforms (`web`, `api`, …), stack, auth, DB, migrations, Docker, deploy, design — full list in [`GREENFIELD.md`](instructions/GREENFIELD.md) §2.
- **Brownfield:** onboarding when core `project/*` is missing ([`BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1); change scope from `project/PROJECT-INFRASTRUCTURE.md`; adapt to existing conventions; restructure to `platforms/` only if the user asks.

**After answers:** write `project/*`, record in the plan/task Clarification log, then proceed through Gates C–E. **Skip clarify** only when the user already specified, `project/*` documents it, or for trivial typo-only edits.

---

## 4. Plan → task → code (Gates D–E)

Per [`PLAN.md`](instructions/PLAN.md) then [`TASK.md`](instructions/TASK.md):

1. **Plan** (Gate D) — `project/plans/{timestamp}_{slug}.md`: platform inventory, phases, E2E matrix.
2. **Task** (Gate E) — one exhaustive standalone `project/tasks/...` file: Application map then a file-level step per deliverable, each with Plan/Spec/Code refs ([`TASK.md`](instructions/TASK.md) §1.4–§1.5).
3. **Re-read CODE.md** before any task touching application source; list sections in the task Context read ([`RULES.md`](instructions/RULES.md) §8).
4. **Confirm** — greenfield bootstrap and new apps require user approval.
5. **Execute** — set `in_progress` only after Gates A–D and the CODE re-read are recorded; follow [`TASK.md`](instructions/TASK.md) §1.9.
6. **Complete** — Gate F verify + Task completion checklist; append `project/histories/`.

---

## 5. Testing, PR, and completion

- **Testing and E2E:** [`RULES.md`](instructions/RULES.md) §6 — lint/test per `project/PROJECT-AGENTS.md`; local `compose up → health → smoke → down`; deploy cycle on greenfield bootstrap.
- **PR:** title per `project/PROJECT-AGENTS.md` (typically `[{project}] <Title>`); lint/test green; E2E when infra touched; UI per `project/design/`; code per [`CODE.md`](instructions/CODE.md).
- **Do not commit** `project/plans/`, `project/tasks/`, `project/histories/`, or `project/documents/` entries (gitignored).

---

## 6. Agent checklist

**Before:** re-entry run this session? §1.4 Phases 1–3 + Phase 4 done? Gate B clarify, C docs/design, D plan, E exhaustive standalone task drafted?

**During:** active task re-opened this work block ([`TASK.md`](instructions/TASK.md) §1.9)? CODE.md §1–2 on every touched source file? Paths from `project/PROJECT-INFRASTRUCTURE.md`? Service platforms before apps (greenfield)?

**After:** E2E run? CODE + DESIGN applied to touched code? HISTORY links plan + task + E2E results?

**Greenfield DoD:** [`GREENFIELD.md`](instructions/GREENFIELD.md) §5. **Brownfield onboarding DoD:** [`BROWNFIELD.md`](instructions/BROWNFIELD.md) §5.
