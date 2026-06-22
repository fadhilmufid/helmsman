# Infrastructure

Documentation architecture for this instruction set. **Read-only template** — how to organize project docs and what to record in [`project/INFRASTRUCTURE.md`](project/INFRASTRUCTURE.md).

**Mode-specific technical rules:**

- **Greenfield** (new app) → [`GREENFIELD.md`](GREENFIELD.md) — `platforms/`, Docker, deploy pipeline
- **Brownfield** (existing repo) → [`BROWNFIELD.md`](BROWNFIELD.md) — discovery, actual paths, adapt conventions

Related: [`../README.md`](../README.md) (user), [`../AGENTS.md`](../AGENTS.md) (system gate), [`TASK.md`](TASK.md), [`CODE.md`](CODE.md), [`DESIGN.md`](DESIGN.md), [`HISTORY.md`](HISTORY.md), [`DOCUMENT.md`](DOCUMENT.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md).

UI design system rules remain in [`DESIGN.md`](DESIGN.md) — not duplicated here.

---

## Part A — Documentation architecture

### Two-tier system

```
{root}/
├── README.md              ← user (GitHub)
├── LICENSE
├── AGENTS.md              ← system gate
├── instructions/          ← rule templates (this folder)
│   ├── README.md
│   ├── INFRASTRUCTURE.md
│   ├── GREENFIELD.md
│   ├── BROWNFIELD.md
│   ├── TASK.md
│   ├── CODE.md
│   ├── DESIGN.md
│   ├── HISTORY.md
│   └── DOCUMENT.md
├── ai_references/         ← user reference dumps (README tracked; contents gitignored)
└── project/               ← local workspace (system read/write; mostly gitignored)
    ├── OVERVIEW.md        ← gitignored
    ├── AGENTS.md          ← gitignored
    ├── INFRASTRUCTURE.md  ← gitignored
    ├── DESIGN.md          ← gitignored
    ├── history/         ← README.md tracked; entries gitignored
    ├── document/        ← README.md tracked; feature folders gitignored
    └── task/            ← README.md tracked; entries gitignored
```

### Folder naming

| Kind | Convention | Examples |
|------|------------|----------|
| Folders | lowercase | `project`, `history`, `document`, `task`, `ai_references` |
| App folders (greenfield) | lowercase kebab-case under `platforms/` | `web`, `orders-api`, `app` — per [`GREENFIELD.md`](GREENFIELD.md) |
| App folders (brownfield) | whatever the repo uses | `src/`, `backend/`, `apps/web/` — per [`BROWNFIELD.md`](BROWNFIELD.md) |
| Instruction templates | `CAPITAL.md` in `instructions/` | `instructions/CODE.md`, `instructions/TASK.md` |
| System gate | root `AGENTS.md` | `AGENTS.md` |
| Project config files | `CAPITAL.md` in `project/` | `project/OVERVIEW.md`, `project/AGENTS.md`, `project/INFRASTRUCTURE.md` |
| Generated entries | `{timestamp}_{slug}.md` | `project/history/20260622_143052_bootstrap.md` |

### Local reference folders

| Folder | Tracked | Purpose |
|--------|---------|---------|
| `ai_references/` | `README.md` only | User-provided reference dumps (PDFs, specs, notes) |
| `project/history/` | `README.md` only | Change log entries |
| `project/document/` | `README.md` only | Feature reference specs |
| `project/task/` | `README.md` only | Step-by-step task plans |
| `project/OVERVIEW.md`, `project/AGENTS.md`, `project/INFRASTRUCTURE.md`, `project/DESIGN.md` | None (gitignored) | Per-project config the system creates locally |

The system **reads and writes** all `project/` paths during work. Instruction templates in `instructions/` and root `AGENTS.md` are version-controlled.

### Read-only vs editable

| Tier | Location | Git |
|------|----------|-----|
| Instruction templates | `instructions/*.md` | Tracked — edit only when user requests template updates |
| System gate | `AGENTS.md` (root) | Tracked |
| Folder READMEs | `ai_references/README.md`, `project/history|document|task/README.md`, `instructions/README.md` | Tracked |
| Project workspace | All other `project/` and `ai_references/` content | Gitignored — local only |

### File naming convention

Rule templates and project config files use **`CAPITAL.md`**: uppercase basename, lowercase `.md` extension.

| Location | Examples |
|----------|----------|
| Instruction templates (`instructions/`) | `instructions/CODE.md`, `instructions/TASK.md`, `instructions/GREENFIELD.md` |
| System gate (root) | `AGENTS.md` |
| User README (root) | `README.md` |
| Project config (`project/`) | `project/OVERVIEW.md`, `project/AGENTS.md`, `project/INFRASTRUCTURE.md`, `project/DESIGN.md` |
| Generated entries | `project/history/{timestamp}_{slug}.md`, `project/task/{timestamp}_{slug}.md` |

### Project config files

| File | Purpose |
|------|---------|
| `project/OVERVIEW.md` | Mode (greenfield/brownfield), slug, purpose, MVP scope, gaps |
| `project/INFRASTRUCTURE.md` | **Project-specific map**: apps, paths, docker, deploy, db, migrations, build/backup |
| `project/AGENTS.md` | Dev commands, lint/test, PR/CI conventions, scaffold notes |
| `project/DESIGN.md` | UI tokens, component library, breakpoints |

Write **mode** to `project/OVERVIEW.md` first — from [`../AGENTS.md`](../AGENTS.md) §0 clarify (greenfield) or BROWNFIELD discovery (brownfield).

**Source of content:**

| Mode | How `project/INFRASTRUCTURE.md` is populated |
|------|-----------------------------------------------|
| Greenfield | Written from clarify decisions — see [`GREENFIELD.md`](GREENFIELD.md) |
| Brownfield | Written from repo discovery — see [`BROWNFIELD.md`](BROWNFIELD.md) |

### Document layers under project/

| Layer | Path | Timing | Purpose |
|-------|------|--------|---------|
| **TASK** | `project/task/{timestamp}_{task-slug}.md` | Before/during a user request | Executable step plan |
| **DOCUMENT** | `project/document/{feature-slug}/` | Before/during feature work | Persistent feature specs |
| **HISTORY** | `project/history/{timestamp}_{title}.md` | After work | Change log |

See [`TASK.md`](TASK.md), [`DOCUMENT.md`](DOCUMENT.md), and [`HISTORY.md`](HISTORY.md) for rules on each layer.

### Read/write matrix

| Action | Where |
|--------|-------|
| Create/update task plan | `project/task/{timestamp}_{task-slug}.md` per [`TASK.md`](TASK.md) |
| Append change log entry | `project/history/{timestamp}_{title}.md` per [`HISTORY.md`](HISTORY.md) |
| Create or update feature documentation | `project/document/{feature-slug}/` per [`DOCUMENT.md`](DOCUMENT.md) |
| Update app paths, Docker, deploy, db, migrations, build/backup | `project/INFRASTRUCTURE.md` |
| Update dev commands, lint/test, PR/CI | `project/AGENTS.md` |
| Update colors, UI tokens, components | `project/DESIGN.md` |
| Update project purpose and goals | `project/OVERVIEW.md` |
| Update instruction templates | `instructions/*.md` — only when user explicitly requests |

---

## Part B — Four concerns (abstract)

Every software project involves these concerns. **This tier does not prescribe folder names** — record what applies (or what is missing) in `project/INFRASTRUCTURE.md`.

| Concern | What the system documents |
|---------|---------------------|
| **App** | Where application source lives; runnable units; stack per unit |
| **Containerization** | How apps are built and run in containers (if applicable) |
| **Deploy / Build** | How artifacts are built, composed, deployed, and rolled back |
| **Data** | Database or persistence; migrations; seeds; backup strategy |

| Mode | Completeness expectation |
|------|-------------------------|
| **Greenfield** | All four addressed before bootstrap is complete — see [`GREENFIELD.md`](GREENFIELD.md) |
| **Brownfield** | Document what **exists**; note gaps — see [`BROWNFIELD.md`](BROWNFIELD.md) |

Top-level [`instructions/INFRASTRUCTURE.md`](INFRASTRUCTURE.md) explains **how to organize** project documentation. `project/INFRASTRUCTURE.md` is the **project-specific map** — whether paths are `platforms/api/`, `backend/`, or something else.

---

## System checklist

1. Mode resolved per [`../AGENTS.md`](../AGENTS.md) §0 (greenfield vs brownfield)?
2. `project/INFRASTRUCTURE.md` populated from clarify (greenfield) or discovery (brownfield)?
3. Feature work uses `project/document/`; tasks use `project/task/`; changes logged in `project/history/`?
4. Greenfield technical gates verified per [`GREENFIELD.md`](GREENFIELD.md) when building new apps?
5. Brownfield onboarding gates verified per [`BROWNFIELD.md`](BROWNFIELD.md) when adopting existing repos?
