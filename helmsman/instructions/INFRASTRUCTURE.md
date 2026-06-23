# Infrastructure

**Integration:** Doc-layer rules connect via [`RULES.md`](RULES.md). Platform model (service + application) in RULES §3 and [`GREENFIELD.md`](GREENFIELD.md) §1. Blueprints in `project/plans/` ([`PLAN.md`](PLAN.md)).

Documentation architecture for this instruction set. **Read-only template** — how to organize project docs and what to record in [`project/INFRASTRUCTURE.md`](project/INFRASTRUCTURE.md).

**Mode-specific technical rules:**

- **Greenfield** (new app) → [`GREENFIELD.md`](GREENFIELD.md) — `platforms/`, Docker, deploy pipeline
- **Brownfield** (existing repo) → [`BROWNFIELD.md`](BROWNFIELD.md) — discovery, actual paths, adapt conventions

Related: [`../README.md`](../README.md) (user), [`../AGENTS.md`](../AGENTS.md) (agent gate), [`TASK.md`](TASK.md), [`CODE.md`](CODE.md), [`DESIGN.md`](DESIGN.md), [`HISTORY.md`](HISTORY.md), [`DOCUMENT.md`](DOCUMENT.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md).

UI design system rules remain in [`DESIGN.md`](DESIGN.md) — not duplicated here.

---

## 0. Production-grade infrastructure (hard default)

Per [`RULES.md`](RULES.md) §5 — infrastructure targets **production deployability**, not "works on my machine" only.

| Rule | Detail |
|------|--------|
| **Greenfield** | All four concerns per [`GREENFIELD.md`](GREENFIELD.md) for production use — healthchecks, `depends_on` order, `.env.example`, backup strategy, image export/rollback when using pipeline |
| **Brownfield** | Document what exists; when adding or changing infra, meet production bar — note gaps in `project/INFRASTRUCTURE.md` |
| **project/INFRASTRUCTURE.md** | Record health endpoints, migration/startup order, backup location, ports, secrets pattern |
| **Never unless asked** | Dev-only compose with no healthchecks, no env examples, no backup path, or local-hardcoded secrets |

**Don't default to dev-only infra** when bootstrap or deploy is in scope.

---

## Part A — Documentation architecture

### Two-tier system (app + helmsman pack)

When installed in an app, documentation spans **`{root}`** (app) and **`{pack}`** (`helmsman/`):

```
{root}/                           ← app repository
├── helmsman/                     ← {pack} — cloned instruction repo (use in place)
│   ├── AGENTS.md                 ← agent gate
│   ├── README.md
│   ├── LICENSE
│   ├── .gitignore
│   ├── instructions/             ← rule templates
│   │   ├── README.md
│   │   ├── RULES.md
│   │   └── …
│   ├── other-references/
│   └── project/                  ← agent workspace (mostly gitignored)
│       ├── OVERVIEW.md
│       ├── plans/
│       ├── tasks/
│       └── …
├── platforms/                    ← greenfield app (at {root}, not in helmsman/)
└── deploy/
```

**Hard rule:** never copy `{pack}` contents to `{root}`. See [`../AGENTS.md`](../AGENTS.md) §0.

When this repo **is** `{pack}` (paths relative to pack root):

```
{pack}/
├── AGENTS.md
├── instructions/
├── project/
└── other-references/
```

### Folder naming

| Kind | Convention | Examples |
|------|------------|----------|
| Folders | lowercase | `project`, `histories`, `documents`, `tasks`, `plans`, `design`, `other-references` |
| App folders (greenfield) | lowercase kebab-case under `platforms/` | `web`, `api`, `postgresql`, `minio` — per [`GREENFIELD.md`](GREENFIELD.md) |
| App folders (brownfield) | whatever the repo uses | `src/`, `backend/`, `apps/web/` — per [`BROWNFIELD.md`](BROWNFIELD.md) |
| Instruction templates | `CAPITAL.md` in `instructions/` | `instructions/CODE.md`, `instructions/TASK.md` |
| Agent gate | `{pack}/AGENTS.md` (e.g. `helmsman/AGENTS.md`) | `AGENTS.md` inside pack |
| Project config files | `CAPITAL.md` in `project/` | `project/OVERVIEW.md`, `project/AGENTS.md`, `project/INFRASTRUCTURE.md` |
| Generated entries | `{timestamp}_{slug}.md` | `project/histories/20260622_143052_bootstrap.md` |

### Local reference folders

| Folder | Tracked | Purpose |
|--------|---------|---------|
| `other-references/` | `README.md` only | User-provided reference dumps (PDFs, specs, notes) |
| `project/histories/` | `README.md` only | Change log entries |
| `project/documents/` | `README.md` only | Feature reference specs |
| `project/design/` | `README.md` only | Detailed design system specs |
| `project/plans/` | `README.md` only | Blueprint plans (platform inventory, E2E) |
| `project/tasks/` | `README.md` only | Exhaustive standalone task plans |
| `project/OVERVIEW.md`, `project/AGENTS.md`, `project/INFRASTRUCTURE.md`, `project/DESIGN.md` | None (gitignored) | Per-project config agents create locally |

Agents **read and write** all `project/` paths inside `{pack}` during work. Instruction templates in `instructions/` and pack `AGENTS.md` are version-controlled — **never copy them to `{root}`**.

### Read-only vs editable

| Tier | Location | Git |
|------|----------|-----|
| Instruction templates | `instructions/*.md` | Tracked — edit only when user requests template updates |
| Agent gate | `AGENTS.md` (inside `{pack}`) | Tracked |
| Folder READMEs | `other-references/README.md`, `project/histories|documents|tasks|plans|design/README.md`, `instructions/README.md` | Tracked |
| Project workspace | All other `project/` and `other-references/` content | Gitignored — local only |

### File naming convention

Rule templates and project config files use **`CAPITAL.md`**: uppercase basename, lowercase `.md` extension.

| Location | Examples |
|----------|----------|
| Instruction templates (`instructions/`) | `instructions/CODE.md`, `instructions/TASK.md`, `instructions/GREENFIELD.md` |
| Agent gate (`{pack}`) | `AGENTS.md` |
| Pack README | `README.md` (inside `{pack}`) |
| Project config (`project/`) | `project/OVERVIEW.md`, `project/AGENTS.md`, `project/INFRASTRUCTURE.md`, `project/DESIGN.md` |
| Generated entries | `project/histories/{timestamp}_{slug}.md`, `project/plans/{timestamp}_{slug}.md`, `project/tasks/{timestamp}_{slug}.md` |

### Project config files

| File | Purpose |
|------|---------|
| `project/OVERVIEW.md` | Mode (greenfield/brownfield), slug, purpose, delivery scope, gaps |
| `project/INFRASTRUCTURE.md` | **Project-specific map**: platform inventory (service + app), docker, deploy, migrations, build/backup |
| `project/AGENTS.md` | Dev commands, lint/test, PR/CI conventions, scaffold notes |
| `project/DESIGN.md` | UI design index — links to `project/design/` |

Write **mode** to `project/OVERVIEW.md` first — from [`../AGENTS.md`](../AGENTS.md) §3 clarify (greenfield) or BROWNFIELD discovery (brownfield).

**Source of content:**

| Mode | How `project/INFRASTRUCTURE.md` is populated |
|------|-----------------------------------------------|
| Greenfield | Written from clarify decisions — see [`GREENFIELD.md`](GREENFIELD.md) |
| Brownfield | Written from repo discovery — see [`BROWNFIELD.md`](BROWNFIELD.md) |

### Document layers under project/

| Layer | Path | Timing | Purpose |
|-------|------|--------|---------|
| **PLAN** | `project/plans/{timestamp}_{slug}.md` | After specs, before TASK (Gate D) | Blueprint: platforms, phases, E2E matrix |
| **TASK** | `project/tasks/{timestamp}_{task-slug}.md` | After plan (Gate E) | Application map + file-level execution steps |
| **DOCUMENT** | `project/documents/{feature-slug}/` | Before code (Gate C) | Persistent feature specs |
| **DESIGN** | `project/design/*.md` (+ optional `screens/`) | Before UI code | Design system specs |
| **HISTORY** | `project/histories/{timestamp}_{title}.md` | After work | Change log |

See [`PLAN.md`](PLAN.md), [`TASK.md`](TASK.md), [`DOCUMENT.md`](DOCUMENT.md), and [`HISTORY.md`](HISTORY.md).

### Read/write matrix

| Action | Where |
|--------|-------|
| Create/update blueprint plan | `project/plans/{timestamp}_{slug}.md` per [`PLAN.md`](PLAN.md) |
| Create/update task plan | `project/tasks/{timestamp}_{task-slug}.md` per [`TASK.md`](TASK.md) |
| Append change log entry | `project/histories/{timestamp}_{title}.md` per [`HISTORY.md`](HISTORY.md) |
| Create or update feature documentation | `project/documents/{feature-slug}/` per [`DOCUMENT.md`](DOCUMENT.md) |
| Create or update design system specs | `project/design/` per [`DESIGN.md`](DESIGN.md); index in `project/DESIGN.md` |
| Update app paths, Docker, deploy, db, migrations, build/backup | `project/INFRASTRUCTURE.md` |
| Update dev commands, lint/test, PR/CI | `project/AGENTS.md` |
| Update design index (tokens cheat sheet, links) | `project/DESIGN.md` |
| Update project purpose and goals | `project/OVERVIEW.md` |
| Update instruction templates | `instructions/*.md` — only when user explicitly requests |

---

## Part B — Four concerns (abstract)

Every software project involves these concerns. **This tier does not prescribe folder names** — record what applies (or what is missing) in `project/INFRASTRUCTURE.md`.

| Concern | What agents document |
|---------|---------------------|
| **App** | Application platforms under `platforms/` (e.g. `web`, `api`) |
| **Containerization** | Service platforms (`postgresql`, `minio`, …) + app Dockerfiles |
| **Deploy / Build** | How artifacts are built, composed, deployed, and rolled back |
| **Data** | Database or persistence; migrations; seeds; backup strategy |

| Mode | Completeness expectation |
|------|-------------------------|
| **Greenfield** | All four addressed before bootstrap is complete — see [`GREENFIELD.md`](GREENFIELD.md) |
| **Brownfield** | Document what **exists**; note gaps — see [`BROWNFIELD.md`](BROWNFIELD.md) |

Top-level [`instructions/INFRASTRUCTURE.md`](INFRASTRUCTURE.md) explains **how to organize** project documentation. `project/INFRASTRUCTURE.md` is the **project-specific map** — whether paths are `platforms/api/`, `backend/`, or something else.

---

## Agent checklist

1. AGENTS §1.5 execution gates understood and followed?
2. Mode resolved per [`../AGENTS.md`](../AGENTS.md) §1 (greenfield vs brownfield)?
3. `project/INFRASTRUCTURE.md` populated from clarify (greenfield) or discovery (brownfield)?
4. Specs (`documents/`, `design/`) → plan → task → code; E2E verify per [`RULES.md`](RULES.md) §6; changes in `project/histories/`?
5. Greenfield technical gates verified per [`GREENFIELD.md`](GREENFIELD.md) when building new apps?
6. Brownfield onboarding gates verified per [`BROWNFIELD.md`](BROWNFIELD.md) when adopting existing repos?
7. Infra documented and production-ready (health, backup, env examples) when in scope?
