# Agent Instructions

## HARD STOP — Helmsman re-entry (every session)

**As long as `helmsman-agent/` exists in the repo, agents MUST run this block at the start of every session and before every non-trivial task** — including after greenfield bootstrap is complete. Prior chat context does not replace a fresh read.

1. **Discover `{pack}`** — workspace is `{root}` → `{pack}` = `{root}/helmsman-agent/`; workspace is `{pack}` → use this folder.
2. **Ensure `{root}/AGENTS.md`** — required when `{pack}` exists. If missing, copy [`templates/root-agents.md`](templates/root-agents.md) to `{root}/AGENTS.md`. If present without Helmsman sections (What is / How to use / Do not), merge from that template. **Hard STOP** until satisfied — before onboarding, bootstrap, or feature work.
3. **Read `{pack}/helmsman-agent.md` (this file) and `{pack}/instructions/rules.md` in full.**
4. **Run Gate A (§2 checklist)** — re-read instruction templates and scan `{pack}/project/` (`overview.md`, `infrastructure.md`, `AGENTS.md`, `design.md`, active `plans/`, `tasks/`, newest `histories/`, in-scope `documents/` and `design/`).
5. **If fresh brownfield adoption** ([`instructions/brownfield.md`](instructions/brownfield.md) §0.1) → run **mandatory onboarding**; park other requests until BROWNFIELD §5 DoD passes.
6. **If** an active task has `Status: in_progress`, run [`instructions/task.md`](instructions/task.md) §1.9 — **Agent execution checklist** in that file before any app edit.
7. **Follow gates A–F for this session** — do not edit `{root}/platforms/`, `{root}/deploy/`, or app source until Gate A is satisfied.

**Exception:** instruction-pack maintenance only (`{pack}/instructions/`, pack `helmsman-agent.md`, tracked `{pack}/project/*/readme.md`).

---

**Agents: read this file first.** Then [`instructions/rules.md`](instructions/rules.md) — the integrated rulebook. Users: see [`readme.md`](readme.md).

**Read-only gate** — do not edit during normal project work. Rule templates: [`instructions/`](instructions/). Project config: [`project/`](project/).

---

## 0. Helmsman pack (use in place — hard STOP)

When the pack is **installed at `{root}/helmsman-agent/`** (copy `helmsman-agent/` from a clone or monorepo), agents **use it in place**. Do **not** copy, move, or flatten its contents to the app repository root.

| Term | Meaning |
|------|---------|
| **`{pack}`** | This folder — e.g. `{root}/helmsman-agent/` after copying `helmsman-agent/` from a clone |
| **`{root}`** | App repository root — parent of `{pack}` |

**Typical app layout:**

```
{root}/
├── AGENTS.md          ← required root Helmsman guide (templates/root-agents.md: What is / How to use / Do not)
├── helmsman-agent/          ← {pack} — this instruction repo (use in place)
│   ├── helmsman-agent.md
│   ├── readme.md
│   ├── license
│   ├── .gitignore
│   ├── instructions/
│   ├── project/       ← write plans, tasks, config HERE
│   └── other-references/
├── platforms/         ← greenfield app (sibling of helmsman-agent/, not inside it)
└── deploy/
```

**Do (use in place):**

- Read `{pack}/helmsman-agent.md` — this file when inside `helmsman-agent/`
- Read templates from `{pack}/instructions/`
- Write plans, tasks, histories, and project config to `{pack}/project/`
- **Required:** `{root}/AGENTS.md` — agent-only Helmsman guide from [`templates/root-agents.md`](templates/root-agents.md) (What is Helmsman, How to use Helmsman, Do not). Copy if missing; merge Helmsman sections if the file exists. **Only** allowed `{root}` file from the pack (not the full pack `helmsman-agent.md`).

**Don't (never copy to `{root}`):**

- Do **not** create `{root}/instructions/`, `{root}/project/`, or `{root}/other-references/`
- Do **not** copy the **full** pack `helmsman-agent.md` (this file), `{pack}/readme.md`, `{pack}/license`, or `{pack}/.gitignore` to `{root}` — use the **thin** [`templates/root-agents.md`](templates/root-agents.md) at `{root}/AGENTS.md` instead
- Do **not** move, duplicate, symlink, or flatten `helmsman-agent/` — it stays one folder under `{root}`
- Do **not** put app code (`platforms/`, `deploy/`, application source) inside `{pack}`

**Pack discovery:** workspace is `{root}` → `{pack}` = `{root}/helmsman-agent/`. Workspace is `{pack}` → `{root}` = parent of `helmsman-agent/`.

Paths like `project/`, `instructions/` in this instruction set mean **inside `{pack}`** unless explicitly prefixed with `{root}/`.

Detail: [`instructions/rules.md`](instructions/rules.md) §1.1.

---

## 1. Choose mode (first)

| Mode | When | Guide |
|------|------|-------|
| **Greenfield** | New app from scratch | [`instructions/greenfield.md`](instructions/greenfield.md) |
| **Brownfield** | Existing codebase | [`instructions/brownfield.md`](instructions/brownfield.md) |

| User signal | Mode |
|-------------|------|
| *"Create … app"*, empty repo + new product | Greenfield |
| *"Understand this repo"*, substantial existing code | Brownfield |
| Fresh pack install at `{root}/helmsman-agent/` + existing app code at `{root}` | Brownfield — mandatory onboarding ([`brownfield.md`](instructions/brownfield.md) §0.1) |
| Populated `project/*` | Mode in `project/overview.md` |

**Ambiguous?** Ask once: Greenfield vs Brownfield (**Recommended:** brownfield if substantial app code exists).

Record mode in `project/overview.md`.

---

## 1.5 Execution gates (hard STOP)

Sequential — detail in [`instructions/rules.md`](instructions/rules.md) §2.

| Gate | Requirement | Blocks |
|------|-------------|--------|
| **A — Read-first** | AGENTS §2 checklist — full read; **`{root}/AGENTS.md`** with Helmsman sections (copy or merge from [`templates/root-agents.md`](templates/root-agents.md) if missing) | `platforms/`, `deploy/`, app source, Dockerfiles |
| **B — Clarify and record** | §3; write `project/overview.md`, `project/infrastructure.md`, `project/AGENTS.md`, `project/design.md`. **Brownfield fresh adoption:** repo discovery + core `project/*` + `project/documents/repo/` per [`brownfield.md`](instructions/brownfield.md) §0.1–§2 — blocks implementation (including parked user request) until done | Implementation |
| **C — Documents and design** | `project/documents/`; `project/design/` when web UI | Scaffold, `platforms/`, `deploy/` |
| **D — Blueprint plan** | `project/plans/` per [`instructions/plan.md`](instructions/plan.md) | TASK, implementation |
| **E — Task before code** | One **exhaustive standalone** `project/tasks/` with **Application map** ([`task.md`](instructions/task.md) §1.4a), file-level steps (**How to do it** + **Step checklist**; no shorthand §1.4); follow §5.1; Plan + Spec + Code refs; re-read [`code.md`](instructions/code.md) + active task each work block (§1.9); `in_progress` after A–D | Application edits |
| **F — Quality + E2E** | Production bar + compose/deploy verify per RULES §6 | Marking complete |

**Exceptions:** Instruction-pack maintenance (`instructions/`, pack `helmsman-agent.md`, tracked `project/*/readme.md`).

---

## 2. Before You Start (Gate A checklist)

Read each file **in full** before Gate B.

1. [`instructions/rules.md`](instructions/rules.md) — integrated map
2. **`{root}/AGENTS.md`** — required; read after ensuring Helmsman sections exist (HARD STOP step 2)
3. [`instructions/readme.md`](instructions/readme.md) — index
4. Mode guide: [`greenfield.md`](instructions/greenfield.md) or [`brownfield.md`](instructions/brownfield.md)
5. [`plan.md`](instructions/plan.md), [`task.md`](instructions/task.md), [`infrastructure.md`](instructions/infrastructure.md), [`code.md`](instructions/code.md), [`design.md`](instructions/design.md), [`history.md`](instructions/history.md), [`document.md`](instructions/document.md)
6. [`other-references/`](other-references/) when non-empty
7. `project/overview.md` → `project/infrastructure.md` → `project/AGENTS.md` → `project/design.md` when they exist
8. `project/plans/` — active plans; `project/tasks/` — active tasks
9. `project/histories/` — newest first
10. `project/documents/{feature}/` — feature in scope
11. `project/design/` — when web UI in scope
12. **Fresh brownfield adoption** → mandatory onboarding ([`brownfield.md`](instructions/brownfield.md) §0.1–§1.3) before any other app task; park user request until BROWNFIELD §5 DoD passes

---

## 3. Clarify Before Build

**Ask first, code second.** Do not edit application code until unspecified decisions are resolved.

If user says *"use your recommendations"* — apply mode-guide defaults, record in `project/*`, proceed.

### Shared checklist

| Area | Resolve |
|------|---------|
| Purpose and scope | MVP only if user explicitly asks; else production-ready |
| Feature docs | `project/documents/` per [`document.md`](instructions/document.md) |
| Data / API / CRUD | [`code.md`](instructions/code.md) §8, §11 |
| Visual theme (web UI) | User preference, or **default:** neutral grayscale light per [`design.md`](instructions/design.md) §3 — record in `project/design.md` |
| Responsive strategy (web UI) | mobile-first / desktop-first / balanced — per [`design.md`](instructions/design.md) §10; record in `project/design.md` |

### Greenfield only

| Area | Typical recommendation |
|------|------------------------|
| Project slug | Kebab-case from app name |
| **Service platforms** | `postgresql`, `minio`, `redis`, … — per [`greenfield.md`](instructions/greenfield.md) §1 |
| **Application platforms** | `web`, `api`, `worker`, … |
| Stack | User choice per app; scaffold per CODE §9 |
| Auth, DB, migrations, Docker, deploy, design | Per GREENFIELD §2 |

### Brownfield only

| Area | Typical recommendation |
|------|------------------------|
| Onboarding | **Required first-run** when core `project/*` missing ([`brownfield.md`](instructions/brownfield.md) §0.1); park user request until §5 DoD |
| Change scope | From `project/infrastructure.md` |
| Conventions | Adapt to existing; align only if user asks |
| Restructure to `platforms/` | **No** unless user asks |

**After answers:** write `project/*`, record in plan/task Clarification log, then Gates C–E.

**Skip clarify** only when user already specified or `project/*` documents it, or trivial typo-only edits.

---

## 4. Plan and task (Gates D–E)

Per [`instructions/plan.md`](instructions/plan.md) then [`instructions/task.md`](instructions/task.md):

1. **Plan** (Gate D) — `project/plans/{timestamp}_{slug}.md`: platform inventory, phases, E2E matrix
2. **Task** (Gate E) — **one exhaustive standalone** `project/tasks/...`: **Application map** (§1.4a) then enumerate every deliverable as a step with **How to do it** + **Step checklist**; no forbidden shorthand (§1.4); **Plan ref** + **Spec ref** + **Code ref**; no parent/child split; follow §5.1 drafting prompt
3. **Re-read code.md** — before `in_progress` on any task touching application source; list sections in task Context read ([`rules.md`](instructions/rules.md) §8)
4. **Confirm** — greenfield bootstrap and new apps require user approval
5. **Execute** — `in_progress` only after Gates A–D and CODE re-read recorded; follow [`task.md`](instructions/task.md) §1.9 — re-open task file, run **Agent execution checklist**, complete per-step **Step checklist** before marking steps `[x]`
6. **Complete** — Gate F E2E + **Task completion checklist** in task file; append `project/histories/`

---

## 5. Testing and E2E

Per [`instructions/rules.md`](instructions/rules.md) §6 and [`instructions/greenfield.md`](instructions/greenfield.md) §5:

- Lint and test per `project/AGENTS.md`
- **Local:** `docker compose up` → health → smoke → `compose down`
- **Deploy (bootstrap):** build all images → save → load → compose up → smoke
- Integration tests for critical paths; E2E smoke when web in scope

---

## 6. PR and completion

- PR title: `project/AGENTS.md` — typically `[{project}] <Title>`
- Lint/test green; E2E when infra touched
- UI: `project/design/` + `project/design.md`
- Code: [`code.md`](instructions/code.md)
- Do not commit `project/plans/`, `project/tasks/`, `project/histories/`, `project/documents/` entries

---

## 7. Agent checklist

**Before:** HARD STOP re-entry run this session? Gate A read complete? B clarify? C docs/design? D plan? E **exhaustive standalone** task drafted (**Application map** §1.4a + file-level steps; no shorthand §1.4; §5.1)?

**During:** Active task file re-opened this work block ([`task.md`](instructions/task.md) §1.9)? **Agent execution checklist** run? Next step **Step checklist** complete before moving on? Gate F production quality ([`rules.md`](instructions/rules.md) §5)? **code.md §1–2 on every touched source file?** Paths from `project/infrastructure.md`? Service platforms before apps (greenfield)?

**After:** E2E cycles run? CODE + DESIGN on touched code? HISTORY links plan + task + E2E results?

**Greenfield DoD:** [`greenfield.md`](instructions/greenfield.md) §5. **Brownfield onboarding:** [`brownfield.md`](instructions/brownfield.md) §5.
