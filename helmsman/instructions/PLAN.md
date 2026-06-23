# Blueprint Plans

Rules for **architectural blueprint** files in [`project/plans/`](../project/plans/). **Read-only template** — every non-trivial request needs a plan **before** the **exhaustive standalone** task file ([`TASK.md`](TASK.md)).

**Integration:** PLAN sits between specs (Gate C) and execution steps (Gate E). TASK expands PLAN to **exhaustive standalone** steps. See [`RULES.md`](RULES.md).

Related: [`../AGENTS.md`](../AGENTS.md), [`TASK.md`](TASK.md), [`GREENFIELD.md`](GREENFIELD.md), [`DOCUMENT.md`](DOCUMENT.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md).

---

## 1. Purpose

| | PLAN | TASK |
|---|------|------|
| **What** | Blueprint: platforms, phases, E2E matrix | File-level change steps |
| **When** | Gate D — after docs/design, before TASK | Gate E — after PLAN |
| **Granularity** | Phases, platform inventory, dependencies | **Exhaustive** file-level steps — unlimited count, one standalone task file |

Do **not** put file-level implementation steps in PLAN — those belong in TASK.

---

## 2. When required

**Required** for every non-trivial request (same bar as [`TASK.md`](TASK.md) §2):

- Greenfield bootstrap
- Brownfield features, infra, or deploy changes
- Any work touching `platforms/`, `deploy/`, db, docker, or multi-file app source

**Optional to skip:** trivial typo or format-only edits with zero behavioral impact.

---

## 3. Filename format

```
{timestamp}_{plan-slug}.md
```

| Part | Rule |
|------|------|
| `timestamp` | `YYYYMMDD_HHmmss` (same as tasks/histories) |
| `plan-slug` | Lowercase kebab-case, max ~60 chars |
| Location | `project/plans/{timestamp}_{plan-slug}.md` |

**Example:** `project/plans/20260622_140000_bootstrap-kardus.md`

One plan per request — do not split into parent/child plan files.

---

## 4. Entry body template

```markdown
# {Human-readable plan title}

- **Timestamp:** {ISO-8601}
- **Status:** drafting | ready | in_progress | complete | cancelled
- **User request:** {summary}
- **Scope:** {from project/INFRASTRUCTURE.md}

## Context read

- Specs: project/documents/{feature}/ — {files read}
- Design: project/design/ — {files read or N/A}
- project/INFRASTRUCTURE.md, project/OVERVIEW.md — {read or "drafting"}

## Spec refs

- project/documents/...
- project/design/...

## Platform inventory

| Slug | Kind | Image / build | Ports | Depends on |
|------|------|---------------|-------|------------|
| postgresql | service | postgres:16 | 5432 | — |
| minio | service | minio/minio | 9000, 9001 | — |
| api | application | platforms/api/docker/Dockerfile | 3001 | postgresql |
| web | application | platforms/web/docker/Dockerfile | 3000 | api |

## Dependency and startup order

1. Service platforms healthy (postgresql, minio, …)
2. Migrations complete
3. Backend applications
4. Frontend applications

## Phase map

### Phase 1: Service platforms
- Create platforms/postgresql, platforms/minio, …
- deploy/docker-compose.yml with healthchecks

### Phase 2: Applications

- Scaffold api, web, … — **all application code per [`CODE.md`](CODE.md) §1–2** (block + inline journal; any language per §0)

### Phase 3: Wire and scripts
- Dockerfiles, build/backup scripts

### Phase 4: E2E verify
- See E2E matrix below

## E2E matrix

### Local
- [ ] `docker compose -f deploy/docker-compose.yml up -d --build`
- [ ] All healthchecks pass
- [ ] Smoke test: {flows}
- [ ] `docker compose down`

### Deploy (greenfield bootstrap)
- [ ] Build all platform images
- [ ] `docker save` to deploy/platforms/<slug>/
- [ ] `docker load` + compose up from exports
- [ ] Smoke test again

## Task derivation

Create **one standalone exhaustive** TASK file: `project/tasks/{timestamp}_{slug}.md`.

Expand this plan to **every** file-level step — no step-count ceiling, no parent/child task split. Each TASK step references a section above (Plan ref), a spec (Spec ref), and **CODE.md sections (Code ref)** on application-source steps.

## Related

- project/tasks/...
- project/documents/...
```

---

## 5. Gate D workflow

1. **Draft** plan (`Status: drafting`) after Gate C — platform inventory, phases, E2E matrix
2. **Confirm** — required for greenfield bootstrap; present summary to user
3. **Ready** — `Status: ready`; create **one exhaustive standalone** TASK file derived from this plan
4. **Complete** — when linked TASK is complete and E2E matrix checked

---

## 6. Do's and Don'ts

### Do

- List **every** `platforms/<slug>` in platform inventory
- Include E2E local and deploy cycles when compose exists
- Link to `project/documents/` and `project/design/` in Spec refs
- Note "TASK expands this plan" in Task derivation section

### Don't

- Don't skip PLAN for non-trivial work
- Don't put file-level steps in PLAN (use TASK)
- Don't invent platforms not recorded in clarify / `project/INFRASTRUCTURE.md`
- Don't mark plan complete without E2E matrix results in TASK/history

---

## 7. Agent checklist

1. Gate C passed before drafting plan?
2. Platform inventory complete (service + application platforms)?
3. E2E matrix includes compose up/down and deploy image cycle (when applicable)?
4. **One exhaustive standalone** TASK file created from this plan — every deliverable as a step with **How to do it** + **Step checklist**; Plan ref on each step?
5. HISTORY links this plan when work completes?
