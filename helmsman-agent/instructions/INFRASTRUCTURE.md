# Infrastructure & Documentation Architecture

How to organize project documentation, the full folder tree, and what to record in `project/PROJECT-INFRASTRUCTURE.md`. **Read-only template.**

**Mode-specific technical rules:** greenfield (`platforms/`, Docker, deploy) → [`GREENFIELD.md`](GREENFIELD.md); brownfield (discovery, actual paths) → [`BROWNFIELD.md`](BROWNFIELD.md). Production infra bar: [`RULES.md`](RULES.md) §5. UI design rules: [`DESIGN.md`](DESIGN.md). Pack isolation: [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) §0.

---

## 0. Production-grade infrastructure

Per [`RULES.md`](RULES.md) §5, infrastructure targets **production deployability**, not "works on my machine." Greenfield: all four concerns ([`GREENFIELD.md`](GREENFIELD.md) §1) with healthchecks, `depends_on` order, `.env.example`, backup, image export/rollback. Brownfield: document what exists; meet the production bar when adding or changing infra; note gaps in `project/PROJECT-INFRASTRUCTURE.md`. Record health endpoints, migration/startup order, backup location, ports, and the secrets pattern.

---

## 1. Folder tree

The tree below shows an app repo (`{root}`) with the pack installed. **When the workspace is the pack itself, ignore the `{root}/` wrapper** and read from `helmsman-agent/` down. Generated `project/*` content is gitignored except folder READMEs.

```
{root}/                                    ← app repository
├── AGENTS.md                              ← required thin pointer (from templates/root-AGENTS.md)
├── README.md                              ← app readme (greenfield; not {pack}/README.md)
├── helmsman-agent/                        ← {pack} — use in place; never copy to {root}
│   ├── HELMSMAN-AGENT.md                  ← agent entry — read every session
│   ├── README.md                          ← pack user guide
│   ├── LICENSE, .gitignore
│   ├── templates/
│   │   └── root-AGENTS.md                 ← copy to {root}/AGENTS.md when missing
│   ├── instructions/                      ← rule templates (tracked; read, never copy to {root})
│   │   ├── README.md  RULES.md  OVERVIEW.md  INFRASTRUCTURE.md
│   │   ├── DOCUMENT.md  DESIGN.md  PLAN.md  TASK.md  CODE.md  HISTORY.md
│   │   └── GREENFIELD.md  BROWNFIELD.md
│   ├── other-references/                  ← optional user reference dumps
│   │   └── README.md                      ← tracked
│   └── project/                           ← agent workspace (mostly gitignored)
│       ├── PROJECT-OVERVIEW.md            ← mode, slug, purpose, scope (Gate B)
│       ├── PROJECT-INFRASTRUCTURE.md      ← platform inventory, docker, deploy, paths (Gate B)
│       ├── PROJECT-AGENTS.md              ← dev/lint/test/PR commands (Gate B)
│       ├── PROJECT-DESIGN.md              ← UI design index (Gate B when web UI)
│       ├── plans/        (README + {timestamp}_{slug}.md — Gate D)
│       ├── tasks/        (README + {timestamp}_{slug}.md — Gate E)
│       ├── histories/    (README + {timestamp}_{title}.md — after Gate F)
│       ├── documents/
│       │   ├── README.md
│       │   ├── repo/                      ← brownfield whole-repo specs (onboarding)
│       │   │   ├── technical-documentation.md
│       │   │   └── system-design-document.md
│       │   └── {feature-slug}/            ← per-feature specs (Gate C)
│       │       ├── business-requirements-document.md
│       │       ├── functional-specification-document.md
│       │       ├── technical-documentation.md
│       │       ├── business-solution-document.md
│       │       ├── system-design-document.md
│       │       ├── api-specification-document.md
│       │       └── user-interface-specification-document.md
│       └── design/                        ← detailed UI specs (Gate C when web UI)
│           ├── README.md
│           ├── color-palette-and-tokens.md  typography-system.md
│           ├── spacing-layout-and-grid.md  elevation-and-shadow-system.md
│           ├── component-library-and-theming.md  buttons-and-actions.md
│           ├── forms-and-inputs.md  modals-and-dialogs.md
│           ├── navigation-and-shell.md  tables-lists-and-pagination.md
│           ├── feedback-states-and-alerts.md  responsive-breakpoints.md
│           ├── accessibility-guidelines.md
│           └── screens/{screen-slug}.md
├── platforms/                             ← greenfield app (at {root}, never inside {pack})
│   ├── {service-slug}/  (docker/, .env.example)   ← e.g. postgresql, minio, redis
│   └── {app-slug}/      (Dockerfile, .env.example) ← e.g. web, api, worker
└── deploy/                                ← greenfield compose, scripts, rollback
    ├── docker-compose.yml
    └── .env.example
```

---

## 2. Naming conventions

| Item | Convention | Examples |
|------|------------|----------|
| Folders | lowercase | `project`, `histories`, `documents`, `tasks`, `plans`, `design` |
| App folders (greenfield) | kebab-case under `platforms/` | `web`, `api`, `postgresql`, `minio` |
| App folders (brownfield) | whatever the repo uses | `src/`, `backend/`, `apps/web/` |
| Core templates | `instructions/{NAME}.md` (UPPERCASE) | `instructions/CODE.md`, `instructions/TASK.md` |
| Agent entry | `{pack}/HELMSMAN-AGENT.md` | — |
| Root guide | `{root}/AGENTS.md` | thin pointer from [`templates/root-AGENTS.md`](../templates/root-AGENTS.md) — not the full pack file |
| Generated config | `project/PROJECT-{NAME}.md` | `project/PROJECT-OVERVIEW.md`, `project/PROJECT-AGENTS.md` |
| Generated entries | `{timestamp}_{slug}.md` | `project/histories/20260622_143052_bootstrap.md` |
| Feature/design files | kebab-case full names | `api-specification-document.md`, `color-palette-and-tokens.md` |

The two-tier naming (`instructions/{NAME}.md` template vs `project/PROJECT-{NAME}.md` generated config) avoids collisions between read-only templates and per-project files. **Exception:** the root guide stays `{root}/AGENTS.md` — not `project/PROJECT-AGENTS.md`.

---

## 3. What is tracked vs local

| Tier | Location | Git |
|------|----------|-----|
| Instruction templates + agent entry | `instructions/*.md`, `HELMSMAN-AGENT.md` | Tracked — edit only when the user requests template updates |
| Folder READMEs | `other-references/README.md`, `project/*/README.md`, `instructions/README.md` | Tracked |
| Project workspace | All other `project/` and `other-references/` content | Gitignored — local only |

Agents **read and write** all `project/` paths inside `{pack}`. Instruction templates and `HELMSMAN-AGENT.md` are version-controlled — **never copy them to `{root}`**.

---

## 4. Project config files

| File | Purpose | Populated from |
|------|---------|----------------|
| `project/PROJECT-OVERVIEW.md` | Mode, slug, purpose, delivery scope, gaps | Clarify (greenfield) / discovery (brownfield) — write **first** |
| `project/PROJECT-INFRASTRUCTURE.md` | Platform inventory (service + app), docker, deploy, migrations, build/backup, paths | [`GREENFIELD.md`](GREENFIELD.md) clarify or [`BROWNFIELD.md`](BROWNFIELD.md) discovery |
| `project/PROJECT-AGENTS.md` | Dev commands, lint/test, PR/CI conventions, scaffold notes | Clarify / discovery |
| `project/PROJECT-DESIGN.md` | UI design index — links to `project/design/` | [`DESIGN.md`](DESIGN.md) |

This file (`instructions/INFRASTRUCTURE.md`) explains **how to organize** docs; `project/PROJECT-INFRASTRUCTURE.md` is the **project-specific map** — whether paths are `platforms/api/`, `backend/`, or something else.

---

## 5. Document layers and where to write

| Layer | Path | Timing | Purpose |
|-------|------|--------|---------|
| PLAN | `project/plans/{timestamp}_{slug}.md` | After specs, before TASK (Gate D) | Blueprint: platforms, phases, E2E matrix |
| TASK | `project/tasks/{timestamp}_{slug}.md` | After plan (Gate E) | Application map + file-level steps |
| DOCUMENT | `project/documents/{feature-slug}/` | Before code (Gate C) | Persistent feature specs |
| DESIGN | `project/design/*.md` (+ `screens/`) | Before UI code (Gate C) | Design system specs |
| HISTORY | `project/histories/{timestamp}_{title}.md` | After work (after Gate F) | Change log |

Also: update app paths/Docker/deploy/db/migrations/build/backup in `project/PROJECT-INFRASTRUCTURE.md`; dev/lint/test/PR in `project/PROJECT-AGENTS.md`; design index in `project/PROJECT-DESIGN.md`; purpose/goals in `project/PROJECT-OVERVIEW.md`. Edit `instructions/*.md` **only** when the user explicitly requests template changes.

---

## 6. The four concerns (abstract)

Every project involves these. This tier does **not** prescribe folder names — record what applies (or what is missing) in `project/PROJECT-INFRASTRUCTURE.md`.

| Concern | What agents document |
|---------|---------------------|
| **App** | Application platforms (e.g. `web`, `api`) |
| **Containerization** | Service platforms (`postgresql`, `minio`, …) + app Dockerfiles |
| **Deploy / Build** | How artifacts are built, composed, deployed, rolled back |
| **Data** | Database/persistence; migrations; seeds; backup strategy |

Greenfield: all four addressed before bootstrap completes ([`GREENFIELD.md`](GREENFIELD.md)). Brownfield: document what **exists**; note gaps ([`BROWNFIELD.md`](BROWNFIELD.md)).

---

## 7. Agent checklist

1. Mode resolved and recorded in `project/PROJECT-OVERVIEW.md`?
2. `project/PROJECT-INFRASTRUCTURE.md` populated from clarify (greenfield) or discovery (brownfield)?
3. Specs → plan → task → code; E2E verify ([`RULES.md`](RULES.md) §6); changes logged in `project/histories/`?
4. Greenfield gates verified ([`GREENFIELD.md`](GREENFIELD.md) §5) or brownfield onboarding verified ([`BROWNFIELD.md`](BROWNFIELD.md) §5) when applicable?
5. Infra documented and production-ready (health, backup, env examples) when in scope?
