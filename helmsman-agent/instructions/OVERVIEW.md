# Project Overview Template

**Integration:** Gate B — write [`project/PROJECT-OVERVIEW.md`](project/PROJECT-OVERVIEW.md) **first** among project config files. Mode and clarify decisions feed [`PROJECT-INFRASTRUCTURE.md`](project/PROJECT-INFRASTRUCTURE.md), [`PROJECT-AGENTS.md`](project/PROJECT-AGENTS.md), and [`PROJECT-DESIGN.md`](project/PROJECT-DESIGN.md). See [`RULES.md`](RULES.md) §2 Gate B and [`../HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) §3.

Related: [`RULES.md`](RULES.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`DESIGN.md`](DESIGN.md), [`PLAN.md`](PLAN.md), [`TASK.md`](TASK.md), [`DOCUMENT.md`](DOCUMENT.md).

**Read-only template** — agents create the **project-specific** file at [`project/PROJECT-OVERVIEW.md`](project/PROJECT-OVERVIEW.md) (gitignored). Do **not** confuse with this file (`instructions/OVERVIEW.md`).

---

## 0. Purpose

`project/PROJECT-OVERVIEW.md` is the **single source of truth** for what this project is, how Helmsman mode applies, and what quality bar applies — before paths, dev commands, or design details are recorded elsewhere.

| Rule | Detail |
|------|--------|
| **Write first** | Create or update at Gate B clarify — before `PROJECT-INFRASTRUCTURE.md` and other `PROJECT-*` files |
| **Mode recorded here** | `greenfield` or `brownfield` — per [`HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) §1 |
| **No infra paths** | Platform inventory, Docker, deploy → [`PROJECT-INFRASTRUCTURE.md`](project/PROJECT-INFRASTRUCTURE.md) per [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) |
| **No dev commands** | Lint, test, run, PR/CI → [`PROJECT-AGENTS.md`](project/PROJECT-AGENTS.md) |
| **No UI tokens** | Theme, library, breakpoints → [`PROJECT-DESIGN.md`](project/PROJECT-DESIGN.md) + `project/design/` per [`DESIGN.md`](DESIGN.md) |
| **Production default** | Quality bar is **production-ready** unless user explicitly asks for MVP — per [`RULES.md`](RULES.md) §5 |

---

## 1. When to create or update

| When | Action |
|------|--------|
| **Greenfield Gate B** | After AGENTS §3 clarify; before `project/plans/` or application scaffold |
| **Brownfield fresh adoption** | During §0.1 onboarding — before parked user request work |
| **Brownfield ongoing** | When purpose, scope, or quality bar changes materially |
| **Mode switch** | Rare — only when user explicitly changes greenfield ↔ brownfield; record rationale |

**Hard gate:** Gate B blocks implementation until `project/PROJECT-OVERVIEW.md` exists with mode and slug filled.

---

## 2. Required fields

Agents must populate every row below. Use **inferred** values in brownfield only when evidence exists in `{root}` code or docs — note confidence in **Gaps and risks**.

| Field | Content |
|-------|---------|
| **Mode** | `greenfield` \| `brownfield` |
| **Project slug** | `{project}` — kebab-case (e.g. `kardus-drive`) |
| **Purpose** | One paragraph — what the app does and for whom |
| **Delivery scope** | What the current initiative includes and excludes |
| **Quality bar** | `production-ready` (default) \| `mvp` (only if user explicitly asked) |
| **Audience / use context** | Who uses it, primary devices — feeds responsive strategy in [`PROJECT-DESIGN.md`](project/PROJECT-DESIGN.md) |
| **Gaps and risks** | Unknowns, legacy debt, missing prod infra — especially brownfield |
| **Parked request** | Verbatim user message held until onboarding completes — brownfield §0.1 only; omit or `none` otherwise |

### Greenfield-specific (clarify per [`GREENFIELD.md`](GREENFIELD.md) §2)

Record decisions that affect overview but not infra detail:

- Confirmed **service** and **application** platform slugs (inventory detail → `PROJECT-INFRASTRUCTURE.md`)
- Delivery scope tied to user request
- Feature doc slugs planned under `project/documents/` (list names only)

### Brownfield-specific (discovery per [`BROWNFIELD.md`](BROWNFIELD.md) §1)

- Inferred purpose from manifests, README, and entrypoints
- Slug from repo name or product name
- Notable gaps (missing tests, no Docker, unclear deploy)
- **Parked request** when §0.1 applies

---

## 3. `project/PROJECT-OVERVIEW.md` body template

Agents create locally at `{pack}/project/PROJECT-OVERVIEW.md`. Replace `{placeholders}`.

```markdown
# Project overview — {project-slug}

- **Mode:** greenfield | brownfield
- **Slug:** {project-slug}
- **Last updated:** {ISO-8601 date}
- **Quality bar:** production-ready | mvp

## Purpose

{One paragraph — what the app does and for whom.}

## Delivery scope

**In scope:** {bullets}
**Out of scope:** {bullets or "none noted"}

## Audience and use context

{Who uses it; primary devices; any constraints for responsive/UI decisions.}

## Clarification summary

| Topic | Decision |
|-------|----------|
| {topic from clarify} | {recorded choice} |

## Gaps and risks

- {gap or risk — brownfield: inferred from code; greenfield: open items before bootstrap}

## Parked request

{Verbatim user message during brownfield fresh adoption — or "none"}
```

Keep this file **short**. Deep detail belongs in `PROJECT-INFRASTRUCTURE.md`, feature specs, plans, and tasks.

---

## 4. Relationships to other `PROJECT-*` files

Write in this order at Gate B:

1. **`project/PROJECT-OVERVIEW.md`** — this file (mode, slug, purpose, scope, quality)
2. **`project/PROJECT-INFRASTRUCTURE.md`** — paths, platform inventory, docker, deploy — per [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md)
3. **`project/PROJECT-AGENTS.md`** — dev, lint, test, PR/CI commands
4. **`project/PROJECT-DESIGN.md`** — UI index when web UI in scope — per [`DESIGN.md`](DESIGN.md)

| Need | File |
|------|------|
| What / why / mode / scope | `project/PROJECT-OVERVIEW.md` |
| Where code and infra live | `project/PROJECT-INFRASTRUCTURE.md` |
| How to run and verify locally | `project/PROJECT-AGENTS.md` |
| How UI should look and behave | `project/PROJECT-DESIGN.md` + `project/design/` |

---

## 5. Agent checklist

1. `instructions/OVERVIEW.md` (this file) read?
2. Mode resolved and recorded in `project/PROJECT-OVERVIEW.md`?
3. Slug, purpose, delivery scope, and quality bar filled?
4. Audience / use context recorded when web UI is in scope?
5. Gaps and risks noted (brownfield)?
6. Parked request recorded when brownfield §0.1 applies?
7. `PROJECT-INFRASTRUCTURE.md`, `PROJECT-AGENTS.md`, `PROJECT-DESIGN.md` drafted next — not before overview?
