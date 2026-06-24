# Infrastructure

**Integration:** Doc-layer rules connect via [`rules.md`](rules.md). Platform model (service + application) in RULES §3 and [`greenfield.md`](greenfield.md) §1. Blueprints in `project/plans/` ([`plan.md`](plan.md)).

Documentation architecture for this instruction set. **Read-only template** — how to organize project docs and what to record in [`project/infrastructure.md`](project/infrastructure.md).

**Mode-specific technical rules:**

- **Greenfield** (new app) → [`greenfield.md`](greenfield.md) — `platforms/`, Docker, deploy pipeline
- **Brownfield** (existing repo) → [`brownfield.md`](brownfield.md) — discovery, actual paths, adapt conventions

Related: [`../readme.md`](../readme.md) (user), [`../helmsman-agent.md`](../helmsman-agent.md) (agent gate), [`task.md`](task.md), [`code.md`](code.md), [`design.md`](design.md), [`history.md`](history.md), [`document.md`](document.md), [`greenfield.md`](greenfield.md), [`brownfield.md`](brownfield.md).

UI design system rules remain in [`design.md`](design.md) — not duplicated here.

---

## 0. Production-grade infrastructure (hard default)

Per [`rules.md`](rules.md) §5 — infrastructure targets **production deployability**, not "works on my machine" only.

| Rule | Detail |
|------|--------|
| **Greenfield** | All four concerns per [`greenfield.md`](greenfield.md) for production use — healthchecks, `depends_on` order, `.env.example`, backup strategy, image export/rollback when using pipeline |
| **Brownfield** | Document what exists; when adding or changing infra, meet production bar — note gaps in `project/infrastructure.md` |
| **project/infrastructure.md** | Record health endpoints, migration/startup order, backup location, ports, secrets pattern |
| **Never unless asked** | Dev-only compose with no healthchecks, no env examples, no backup path, or local-hardcoded secrets |

**Don't default to dev-only infra** when bootstrap or deploy is in scope.

---

## Part A — Documentation architecture

### Two-tier system (app + helmsman pack)

When installed in an app, documentation spans **`{root}`** (app) and **`{pack}`** (`helmsman-agent/`):

```
{root}/                           ← app repository
├── AGENTS.md                     ← required root Helmsman guide (templates/root-agents.md: What is / How to use / Do not)
├── helmsman-agent/                     ← {pack} — instruction pack (use in place)
│   ├── helmsman-agent.md                 ← agent gate
│   ├── readme.md
│   ├── license
│   ├── .gitignore
│   ├── instructions/             ← rule templates
│   │   ├── readme.md
│   │   ├── rules.md
│   │   └── …
│   ├── other-references/
│   └── project/                  ← agent workspace (mostly gitignored)
│       ├── overview.md
│       ├── plans/
│       ├── tasks/
│       └── …
├── platforms/                    ← greenfield app (at {root}, not in helmsman-agent/)
└── deploy/
```

**Hard rule:** never copy `{pack}` contents to `{root}` (except **required** `{root}/AGENTS.md` from [`templates/root-agents.md`](../templates/root-agents.md)). See [`../helmsman-agent.md`](../helmsman-agent.md) §0.

When this repo **is** `{pack}` (paths relative to pack root):

```
{pack}/
├── helmsman-agent.md
├── instructions/
├── project/
└── other-references/
```

### Folder naming

| Kind | Convention | Examples |
|------|------------|----------|
| Folders | lowercase | `project`, `histories`, `documents`, `tasks`, `plans`, `design`, `other-references` |
| App folders (greenfield) | lowercase kebab-case under `platforms/` | `web`, `api`, `postgresql`, `minio` — per [`greenfield.md`](greenfield.md) |
| App folders (brownfield) | whatever the repo uses | `src/`, `backend/`, `apps/web/` — per [`brownfield.md`](brownfield.md) |
| Instruction templates | `lowercase.md` in `instructions/` | `instructions/code.md`, `instructions/task.md` |
| Agent gate | `{pack}/helmsman-agent.md` (e.g. `helmsman-agent/helmsman-agent.md`) | `helmsman-agent.md` inside pack |
| Root Helmsman guide | `{root}/AGENTS.md` | **Required** agent-only guide — [`templates/root-agents.md`](../templates/root-agents.md) (What is / How to use / Do not); copy or merge if missing; not the full pack file |
| Project config files | `lowercase.md` in `project/` (except `AGENTS.md`) | `project/overview.md`, `project/AGENTS.md`, `project/infrastructure.md` |
| Generated entries | `{timestamp}_{slug}.md` | `project/histories/20260622_143052_bootstrap.md` |

### Local reference folders

| Folder | Tracked | Purpose |
|--------|---------|---------|
| `other-references/` | `readme.md` only | User-provided reference dumps (PDFs, specs, notes) |
| `project/histories/` | `readme.md` only | Change log entries |
| `project/documents/` | `readme.md` only | Feature reference specs |
| `project/design/` | `readme.md` only | Detailed design system specs |
| `project/plans/` | `readme.md` only | Blueprint plans (platform inventory, E2E) |
| `project/tasks/` | `readme.md` only | Exhaustive standalone task plans |
| `project/overview.md`, `project/AGENTS.md`, `project/infrastructure.md`, `project/design.md` | None (gitignored) | Per-project config agents create locally |

Agents **read and write** all `project/` paths inside `{pack}` during work. Instruction templates in `instructions/` and pack `helmsman-agent.md` are version-controlled — **never copy them to `{root}`**.

### Read-only vs editable

| Tier | Location | Git |
|------|----------|-----|
| Instruction templates | `instructions/*.md` | Tracked — edit only when user requests template updates |
| Agent gate | `helmsman-agent.md` (inside `{pack}`) | Tracked |
| Folder READMEs | `other-references/readme.md`, `project/histories|documents|tasks|plans|design/readme.md`, `instructions/readme.md` | Tracked |
| Project workspace | All other `project/` and `other-references/` content | Gitignored — local only |

### File naming convention

Rule templates and project config files use **`lowercase.md`**: lowercase basename, lowercase `.md` extension. **`AGENTS.md`** is the only exception (root and `project/`).

| Location | Examples |
|----------|----------|
| Instruction templates (`instructions/`) | `instructions/code.md`, `instructions/task.md`, `instructions/greenfield.md` |
| Agent gate (`{pack}`) | `helmsman-agent.md` |
| Pack README | `readme.md` (inside `{pack}`) |
| Project config (`project/`) | `project/overview.md`, `project/AGENTS.md`, `project/infrastructure.md`, `project/design.md` |
| Generated entries | `project/histories/{timestamp}_{slug}.md`, `project/plans/{timestamp}_{slug}.md`, `project/tasks/{timestamp}_{slug}.md` |

### Project config files

| File | Purpose |
|------|---------|
| `project/overview.md` | Mode (greenfield/brownfield), slug, purpose, delivery scope, gaps |
| `project/infrastructure.md` | **Project-specific map**: platform inventory (service + app), docker, deploy, migrations, build/backup |
| `project/AGENTS.md` | Dev commands, lint/test, PR/CI conventions, scaffold notes |
| `project/design.md` | UI design index — links to `project/design/` |

Write **mode** to `project/overview.md` first — from [`../helmsman-agent.md`](../helmsman-agent.md) §3 clarify (greenfield) or BROWNFIELD discovery (brownfield).

**Source of content:**

| Mode | How `project/infrastructure.md` is populated |
|------|-----------------------------------------------|
| Greenfield | Written from clarify decisions — see [`greenfield.md`](greenfield.md) |
| Brownfield | Written from repo discovery — see [`brownfield.md`](brownfield.md) |

### Document layers under project/

| Layer | Path | Timing | Purpose |
|-------|------|--------|---------|
| **PLAN** | `project/plans/{timestamp}_{slug}.md` | After specs, before TASK (Gate D) | Blueprint: platforms, phases, E2E matrix |
| **TASK** | `project/tasks/{timestamp}_{task-slug}.md` | After plan (Gate E) | Application map + file-level execution steps |
| **DOCUMENT** | `project/documents/{feature-slug}/` | Before code (Gate C) | Persistent feature specs |
| **DESIGN** | `project/design/*.md` (+ optional `screens/`) | Before UI code | Design system specs |
| **HISTORY** | `project/histories/{timestamp}_{title}.md` | After work | Change log |

See [`plan.md`](plan.md), [`task.md`](task.md), [`document.md`](document.md), and [`history.md`](history.md).

### Read/write matrix

| Action | Where |
|--------|-------|
| Create/update blueprint plan | `project/plans/{timestamp}_{slug}.md` per [`plan.md`](plan.md) |
| Create/update task plan | `project/tasks/{timestamp}_{task-slug}.md` per [`task.md`](task.md) |
| Append change log entry | `project/histories/{timestamp}_{title}.md` per [`history.md`](history.md) |
| Create or update feature documentation | `project/documents/{feature-slug}/` per [`document.md`](document.md) |
| Create or update design system specs | `project/design/` per [`design.md`](design.md); index in `project/design.md` |
| Update app paths, Docker, deploy, db, migrations, build/backup | `project/infrastructure.md` |
| Update dev commands, lint/test, PR/CI | `project/AGENTS.md` |
| Update design index (tokens cheat sheet, links) | `project/design.md` |
| Update project purpose and goals | `project/overview.md` |
| Update instruction templates | `instructions/*.md` — only when user explicitly requests |

---

## Part B — Four concerns (abstract)

Every software project involves these concerns. **This tier does not prescribe folder names** — record what applies (or what is missing) in `project/infrastructure.md`.

| Concern | What agents document |
|---------|---------------------|
| **App** | Application platforms under `platforms/` (e.g. `web`, `api`) |
| **Containerization** | Service platforms (`postgresql`, `minio`, …) + app Dockerfiles |
| **Deploy / Build** | How artifacts are built, composed, deployed, and rolled back |
| **Data** | Database or persistence; migrations; seeds; backup strategy |

| Mode | Completeness expectation |
|------|-------------------------|
| **Greenfield** | All four addressed before bootstrap is complete — see [`greenfield.md`](greenfield.md) |
| **Brownfield** | Document what **exists**; note gaps — see [`brownfield.md`](brownfield.md) |

Top-level [`instructions/infrastructure.md`](infrastructure.md) explains **how to organize** project documentation. `project/infrastructure.md` is the **project-specific map** — whether paths are `platforms/api/`, `backend/`, or something else.

---

## Agent checklist

1. AGENTS §1.5 execution gates understood and followed?
2. Mode resolved per [`../helmsman-agent.md`](../helmsman-agent.md) §1 (greenfield vs brownfield)?
3. `project/infrastructure.md` populated from clarify (greenfield) or discovery (brownfield)?
4. Specs (`documents/`, `design/`) → plan → task → code; E2E verify per [`rules.md`](rules.md) §6; changes in `project/histories/`?
5. Greenfield technical gates verified per [`greenfield.md`](greenfield.md) when building new apps?
6. Brownfield onboarding gates verified per [`brownfield.md`](brownfield.md) when adopting existing repos?
7. Infra documented and production-ready (health, backup, env examples) when in scope?
