# Agent Instructions

## HARD STOP — Helmsman re-entry (every session)

**As long as `helmsman/` exists in the repo, agents MUST run this block at the start of every session and before every non-trivial task** — including after greenfield bootstrap is complete. Prior chat context does not replace a fresh read.

1. **Discover `{pack}`** — workspace is `{root}` → `{pack}` = `{root}/helmsman/`; workspace is `{pack}` → use this folder.
2. **Read `{pack}/AGENTS.md` (this file) and `{pack}/instructions/RULES.md` in full.**
3. **Run Gate A (§2 checklist)** — re-read instruction templates and scan `{pack}/project/` (`OVERVIEW`, `INFRASTRUCTURE`, `AGENTS`, `DESIGN`, active `plans/`, `tasks/`, newest `histories/`, in-scope `documents/` and `design/`).
4. **If fresh brownfield adoption** ([`instructions/BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1) → run **mandatory onboarding**; park other requests until BROWNFIELD §5 DoD passes.
5. **If** an active task has `Status: in_progress`, run [`instructions/TASK.md`](instructions/TASK.md) §1.9 — **Agent execution checklist** in that file before any app edit.
6. **Follow gates A–F for this session** — do not edit `{root}/platforms/`, `{root}/deploy/`, or app source until Gate A is satisfied.

**Exception:** instruction-pack maintenance only (`{pack}/instructions/`, pack `AGENTS.md`, tracked `{pack}/project/*/README.md`).

---

**Agents: read this file first.** Then [`instructions/RULES.md`](instructions/RULES.md) — the integrated rulebook. Users: see [`README.md`](README.md).

**Read-only gate** — do not edit during normal project work. Rule templates: [`instructions/`](instructions/). Project config: [`project/`](project/).

---

## 0. Helmsman pack (use in place — hard STOP)

When this repo is cloned into an app as **`helmsman/`**, agents **use it in place**. Do **not** copy, move, or flatten its contents to the app repository root.

| Term | Meaning |
|------|---------|
| **`{pack}`** | This folder — e.g. `{root}/helmsman/` after `git clone <url> helmsman` |
| **`{root}`** | App repository root — parent of `{pack}` |

**Typical app layout:**

```
{root}/
├── AGENTS.md          ← optional root Helmsman guide (templates/root-AGENTS.md: What is / How to use / Do not)
├── helmsman/          ← {pack} — this instruction repo (use in place)
│   ├── AGENTS.md
│   ├── README.md
│   ├── LICENSE
│   ├── .gitignore
│   ├── instructions/
│   ├── project/       ← write plans, tasks, config HERE
│   └── other-references/
├── platforms/         ← greenfield app (sibling of helmsman/, not inside it)
└── deploy/
```

**Do (use in place):**

- Read `{pack}/AGENTS.md` — this file when inside `helmsman/`
- Read templates from `{pack}/instructions/`
- Write plans, tasks, histories, and project config to `{pack}/project/`
- **Optional:** `{root}/AGENTS.md` as an **agent-only Helmsman guide** — use [`templates/root-AGENTS.md`](templates/root-AGENTS.md) (What is Helmsman, How to use Helmsman, Do not); do not copy this full pack file to `{root}`

**Don't (never copy to `{root}`):**

- Do **not** create `{root}/instructions/`, `{root}/project/`, or `{root}/other-references/`
- Do **not** copy the **full** pack `AGENTS.md`, `{pack}/README.md`, `{pack}/LICENSE`, or `{pack}/.gitignore` to `{root}`
- Do **not** move, duplicate, symlink, or flatten `helmsman/` — it stays one folder under `{root}`
- Do **not** put app code (`platforms/`, `deploy/`, application source) inside `{pack}`

**Pack discovery:** workspace is `{root}` → `{pack}` = `{root}/helmsman/`. Workspace is `{pack}` → `{root}` = parent of `helmsman/`.

Paths like `project/`, `instructions/` in this instruction set mean **inside `{pack}`** unless explicitly prefixed with `{root}/`.

Detail: [`instructions/RULES.md`](instructions/RULES.md) §1.1.

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
| Fresh `helmsman/` clone + existing app code at `{root}` | Brownfield — mandatory onboarding ([`BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1) |
| Populated `project/*` | Mode in `project/OVERVIEW.md` |

**Ambiguous?** Ask once: Greenfield vs Brownfield (**Recommended:** brownfield if substantial app code exists).

Record mode in `project/OVERVIEW.md`.

---

## 1.5 Execution gates (hard STOP)

Sequential — detail in [`instructions/RULES.md`](instructions/RULES.md) §2.

| Gate | Requirement | Blocks |
|------|-------------|--------|
| **A — Read-first** | AGENTS §2 checklist — full read | `platforms/`, `deploy/`, app source, Dockerfiles |
| **B — Clarify and record** | §3; write `project/OVERVIEW`, `INFRASTRUCTURE`, `AGENTS`, `DESIGN`. **Brownfield fresh adoption:** repo discovery + core `project/*` + `project/documents/repo/` per [`BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1–§2 — blocks implementation (including parked user request) until done | Implementation |
| **C — Documents and design** | `project/documents/`; `project/design/` when web UI | Scaffold, `platforms/`, `deploy/` |
| **D — Blueprint plan** | `project/plans/` per [`instructions/PLAN.md`](instructions/PLAN.md) | TASK, implementation |
| **E — Task before code** | One **exhaustive standalone** `project/tasks/` with **Application map** ([`TASK.md`](instructions/TASK.md) §1.4a), file-level steps (**How to do it** + **Step checklist**; no shorthand §1.4); follow §5.1; Plan + Spec + Code refs; re-read [`CODE.md`](instructions/CODE.md) + active task each work block (§1.9); `in_progress` after A–D | Application edits |
| **F — Quality + E2E** | Production bar + compose/deploy verify per RULES §6 | Marking complete |

**Exceptions:** Instruction-pack maintenance (`instructions/`, pack `AGENTS.md`, tracked `project/*/README.md`).

---

## 2. Before You Start (Gate A checklist)

Read each file **in full** before Gate B.

1. [`instructions/RULES.md`](instructions/RULES.md) — integrated map
2. [`instructions/README.md`](instructions/README.md) — index
3. Mode guide: [`GREENFIELD.md`](instructions/GREENFIELD.md) or [`BROWNFIELD.md`](instructions/BROWNFIELD.md)
4. [`PLAN.md`](instructions/PLAN.md), [`TASK.md`](instructions/TASK.md), [`INFRASTRUCTURE.md`](instructions/INFRASTRUCTURE.md), [`CODE.md`](instructions/CODE.md), [`DESIGN.md`](instructions/DESIGN.md), [`HISTORY.md`](instructions/HISTORY.md), [`DOCUMENT.md`](instructions/DOCUMENT.md)
5. [`other-references/`](other-references/) when non-empty
6. `project/OVERVIEW` → `INFRASTRUCTURE` → `AGENTS` → `DESIGN` when they exist
7. `project/plans/` — active plans; `project/tasks/` — active tasks
8. `project/histories/` — newest first
9. `project/documents/{feature}/` — feature in scope
10. `project/design/` — when web UI in scope
11. **Fresh brownfield adoption** → mandatory onboarding ([`BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1–§1.3) before any other app task; park user request until BROWNFIELD §5 DoD passes

---

## 3. Clarify Before Build

**Ask first, code second.** Do not edit application code until unspecified decisions are resolved.

If user says *"use your recommendations"* — apply mode-guide defaults, record in `project/*`, proceed.

### Shared checklist

| Area | Resolve |
|------|---------|
| Purpose and scope | MVP only if user explicitly asks; else production-ready |
| Feature docs | `project/documents/` per [`DOCUMENT.md`](instructions/DOCUMENT.md) |
| Data / API / CRUD | [`CODE.md`](instructions/CODE.md) §8, §11 |
| Visual theme (web UI) | User preference, or **default:** neutral grayscale light per [`DESIGN.md`](instructions/DESIGN.md) §3 — record in `project/DESIGN.md` |
| Responsive strategy (web UI) | mobile-first / desktop-first / balanced — per [`DESIGN.md`](instructions/DESIGN.md) §10; record in `project/DESIGN.md` |

### Greenfield only

| Area | Typical recommendation |
|------|------------------------|
| Project slug | Kebab-case from app name |
| **Service platforms** | `postgresql`, `minio`, `redis`, … — per [`GREENFIELD.md`](instructions/GREENFIELD.md) §1 |
| **Application platforms** | `web`, `api`, `worker`, … |
| Stack | User choice per app; scaffold per CODE §9 |
| Auth, DB, migrations, Docker, deploy, design | Per GREENFIELD §2 |

### Brownfield only

| Area | Typical recommendation |
|------|------------------------|
| Onboarding | **Required first-run** when core `project/*` missing ([`BROWNFIELD.md`](instructions/BROWNFIELD.md) §0.1); park user request until §5 DoD |
| Change scope | From `project/INFRASTRUCTURE.md` |
| Conventions | Adapt to existing; align only if user asks |
| Restructure to `platforms/` | **No** unless user asks |

**After answers:** write `project/*`, record in plan/task Clarification log, then Gates C–E.

**Skip clarify** only when user already specified or `project/*` documents it, or trivial typo-only edits.

---

## 4. Plan and task (Gates D–E)

Per [`instructions/PLAN.md`](instructions/PLAN.md) then [`instructions/TASK.md`](instructions/TASK.md):

1. **Plan** (Gate D) — `project/plans/{timestamp}_{slug}.md`: platform inventory, phases, E2E matrix
2. **Task** (Gate E) — **one exhaustive standalone** `project/tasks/...`: **Application map** (§1.4a) then enumerate every deliverable as a step with **How to do it** + **Step checklist**; no forbidden shorthand (§1.4); **Plan ref** + **Spec ref** + **Code ref**; no parent/child split; follow §5.1 drafting prompt
3. **Re-read CODE.md** — before `in_progress` on any task touching application source; list sections in task Context read ([`RULES.md`](instructions/RULES.md) §8)
4. **Confirm** — greenfield bootstrap and new apps require user approval
5. **Execute** — `in_progress` only after Gates A–D and CODE re-read recorded; follow [`TASK.md`](instructions/TASK.md) §1.9 — re-open task file, run **Agent execution checklist**, complete per-step **Step checklist** before marking steps `[x]`
6. **Complete** — Gate F E2E + **Task completion checklist** in task file; append `project/histories/`

---

## 5. Testing and E2E

Per [`instructions/RULES.md`](instructions/RULES.md) §6 and [`instructions/GREENFIELD.md`](instructions/GREENFIELD.md) §5:

- Lint and test per `project/AGENTS.md`
- **Local:** `docker compose up` → health → smoke → `compose down`
- **Deploy (bootstrap):** build all images → save → load → compose up → smoke
- Integration tests for critical paths; E2E smoke when web in scope

---

## 6. PR and completion

- PR title: `project/AGENTS.md` — typically `[{project}] <Title>`
- Lint/test green; E2E when infra touched
- UI: `project/design/` + `project/DESIGN.md`
- Code: [`CODE.md`](instructions/CODE.md)
- Do not commit `project/plans/`, `project/tasks/`, `project/histories/`, `project/documents/` entries

---

## 7. Agent checklist

**Before:** HARD STOP re-entry run this session? Gate A read complete? B clarify? C docs/design? D plan? E **exhaustive standalone** task drafted (**Application map** §1.4a + file-level steps; no shorthand §1.4; §5.1)?

**During:** Active task file re-opened this work block ([`TASK.md`](instructions/TASK.md) §1.9)? **Agent execution checklist** run? Next step **Step checklist** complete before moving on? Gate F production quality ([`RULES.md`](instructions/RULES.md) §5)? **CODE.md §1–2 on every touched source file?** Paths from `project/INFRASTRUCTURE.md`? Service platforms before apps (greenfield)?

**After:** E2E cycles run? CODE + DESIGN on touched code? HISTORY links plan + task + E2E results?

**Greenfield DoD:** [`GREENFIELD.md`](instructions/GREENFIELD.md) §5. **Brownfield onboarding:** [`BROWNFIELD.md`](instructions/BROWNFIELD.md) §5.
