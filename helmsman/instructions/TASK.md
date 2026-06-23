# Task Plans

**Integration:** TASK is Gate E — expands Gate D blueprint ([`PLAN.md`](PLAN.md)). Every implementation step needs **Plan ref** + **Spec ref** + **Code ref**. Re-read [`CODE.md`](CODE.md) at task start per [`RULES.md`](RULES.md) §8.

Rules for **exhaustive standalone** task files in [`project/tasks/`](../project/tasks/). One task per request — unlimited steps, no parent/child split. **Read-only template**.

Related: [`RULES.md`](RULES.md), [`PLAN.md`](PLAN.md), [`../AGENTS.md`](../AGENTS.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`HISTORY.md`](HISTORY.md), [`DOCUMENT.md`](DOCUMENT.md), [`CODE.md`](CODE.md), [`DESIGN.md`](DESIGN.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md).

## 1. Purpose

Forward-looking **change plan** for a single user request — distinct from other project doc layers:

| | PLAN | TASK | DOCUMENT | HISTORY |
|---|------|------|----------|---------|
| **What** | Blueprint: platforms, phases, E2E | Exhaustive standalone execution steps | Feature specs | Change log |
| **When** | Gate D | Gate E | Gate C | After Gate F |
| **Shape** | One file per request | **One standalone file** — exhaustive step list | Folder per feature | One file per event |

### Blueprint vs task vs execution

| | PLAN (`project/plans/`) | TASK (`project/tasks/`) | Execution |
|---|-------------------------|-------------------------|-----------|
| **When** | Gate D — after specs | Gate E — after plan | After TASK `in_progress` |
| **Output** | Platform inventory, phases, E2E matrix | **Application map** + exhaustive file-level steps (no step ceiling) | Code, config, history |
| **Granularity** | Phases and platforms | One deliverable per step — as many steps as needed | Check off TASK steps |

- TASK file = **standalone exhaustive execution plan** derived from Gate D blueprint — **one file per user request**
- Spend Gate E drafting **maximum detail** — 50, 100, or 200+ steps is expected for large bootstrap; more steps is better
- `Status: planning` until Application map (§1.4a) and all implementation steps are written; `in_progress` only after Gates A–D and TASK §1.6 gates
- **Change-oriented steps** — every step names files/paths and describes the change, not vague goals
- **Ask when blocked** — one batch with **Recommended:** default per [`AGENTS.md`](../AGENTS.md) section 3

## 1.4 Forbidden shorthand format (hard STOP)

Agents sometimes collapse Gate E into **phase-level summaries** instead of file-level steps. This format is **forbidden** — do not write tasks like this:

```markdown
# Task: Bootstrap SplitBill Web App

**Status:** in_progress

### Step 1 — Scaffold Next.js
**How:** Run official create-next-app in platforms/web
**Checklist:** [ ] App runs on :3000

### Step 2 — Settlement library
**How:** Implement types, settlement, storage
**Checklist:** [ ] Tests pass

### Step 3 — UI
**How:** Build split bill page with shadcn components
**Checklist:** [ ] All sections work

### Step 4 — Docker & README
**How:** Dockerfile, compose, root README
**Checklist:** [ ] docker compose up works
```

| Forbidden | Required instead |
|-----------|------------------|
| `### Step N — {phase title}` | `### Phase: {name}` then numbered `1. [ ] **{exact/path}** — ...` |
| `**How:**` one line | `How to do it:` with **3–8 numbered sub-steps** |
| `**Checklist:** [ ]` one item | `Step checklist:` with **3–6 checkboxes** + `Done when:` + `Verify:` |
| Bundling "Scaffold", "UI", "Docker" as 4 mega-steps | **One step per file/route/page/component** (§1.7) |
| `Status: in_progress` with fewer than ~10 implementation steps for a bootstrap | `Status: planning` until Application map (§1.4a) + all steps written |

**Compliant excerpt** — "Scaffold Next.js" alone expands to many steps (not one):

```markdown
### Phase: Web scaffold

1. [ ] **platforms/web/package.json** — Next.js 16 app manifest
   - Plan ref: project/plans/20250623_bootstrap-splitbill.md#platform-web
   - Spec ref: project/documents/bill-splitting/overview.md
   - Code ref: instructions/CODE.md §1-2
   - Before: new file
   - After: next, react, react-dom, typescript, tailwind deps pinned per GREENFIELD
   - Done when: package.json matches plan inventory; Verify passes
   - How to do it:
     1. Run `npx create-next-app@latest` in `platforms/web` per plan flags (App Router, TS, Tailwind)
     2. Remove boilerplate pages not in spec
     3. Pin versions to match project/INFRASTRUCTURE.md
     4. Add scripts: dev, build, lint, test
   - Step checklist:
     - [ ] Plan platform inventory row for web read
     - [ ] Spec client-only constraint noted (no API)
     - [ ] package.json matches planned stack
     - [ ] Verify command below passes
   - Verify: `cd platforms/web && npm install && npm run build`

2. [ ] **platforms/web/src/app/layout.tsx** — root layout, fonts, metadata
   ...
3. [ ] **platforms/web/src/app/page.tsx** — shell for split bill UI (sections wired in later steps)
   ...
```

A greenfield bootstrap task typically has **50–200+** such steps — not 4.

## 1.4a Application map (required for every task)

**Before writing implementation steps**, every task file must include an **Application map** section derived from `project/plans/`, `project/documents/`, and `project/design/` — not invented during execution.

| Task type | Application map must include |
|-----------|------------------------------|
| **Web / UI** | Every route/page, navigation order, screen purpose, spec ref per screen |
| **API-only** | Every endpoint/module, request/response flow, service dependencies |
| **Library-only** | Public exports, consumer files, data flow between modules |
| **Infra-only** | Services, ports, healthchecks, deploy/load sequence |

Place **Application map** after **Approach** and before **Agent execution checklist** (§4 template).

```markdown
## Application map

### User / data flow
1. User opens `/` → enters bill items and participants
2. App reads/writes `localStorage` key `splitbill:v1`
3. Settlement runs client-side → results render in summary section
{mermaid diagram optional}

### Routes and pages (web) OR modules and endpoints (API-only)
| Path / module | Purpose | Reads from | Writes to | Spec ref |
|---------------|---------|------------|-----------|----------|
| `/` | Split bill form + results | localStorage | localStorage | project/documents/bill-splitting/ui.md |
| `lib/settlement.ts` | Calculate who owes whom | Bill[], Participant[] | Settlement[] | project/documents/bill-splitting/settlement.md |

### Component / module tree
| Parent | Children (file paths) |
|--------|----------------------|
| `platforms/web/src/app/page.tsx` | `components/BillForm.tsx`, `components/ParticipantList.tsx`, `components/SettlementSummary.tsx` |
| `platforms/web/src/lib/` | `types.ts`, `settlement.ts`, `storage.ts` |

### Build sequence
1. Types (`lib/types.ts`)
2. Core logic (`lib/settlement.ts`) + tests
3. Storage (`lib/storage.ts`) + tests
4. UI components (leaf → page)
5. Docker + compose + README
```

**Forbidden:** skipping Application map; leaving route/module table empty; writing implementation steps before the map is complete.

## 1.5 Task step format (required)

Each step must be **change-oriented** and **procedural** — not only what to change, but how to do it:

```markdown
1. [ ] **{path}** — {what to change and why}
   - Plan ref: project/plans/...#{section}
   - Spec ref: project/documents/... or project/design/...
   - Code ref: instructions/CODE.md §1-2 (always on app source); §8 if API; §11 if CRUD; §9 if auth
   - Before: {current behavior or "new file"}
   - After: {target behavior}
   - Done when: {explicit completion criteria tying Before/After/Verify}
   - How to do it:
     1. {open/create file; add imports; wire dependency}
     2. {implement core change per spec}
     3. {register route/export; update parent file if needed}
   - Step checklist:
     - [ ] Spec section for this deliverable read
     - [ ] CODE §1–2 block + inline journal (when app source)
     - [ ] Change matches spec/design
     - [ ] Verify command below passes
   - Verify: {command or check}
```

| Field | Required | Detail |
|-------|----------|--------|
| **How to do it** | Yes | 3–8 numbered sub-steps: files to open, what to add/change, commands, dependencies on prior steps |
| **Step checklist** | Yes | 3–6 checkboxes — tick **in the task file** before marking the step `[x]` |
| **Done when** | Yes | One line — when Before/After/Verify are satisfied |

**Forbidden:** steps with only a one-line summary and no **How to do it** sub-steps; marking `[x]` without all **Step checklist** items checked in the task file.

**Bad:** "Implement delete API"

List paths in scope from `project/INFRASTRUCTURE.md` (e.g. `platforms/api/` greenfield, or `backend/` brownfield).

## 1.6 Execution gates (hard STOP)

Mirror [`AGENTS.md`](../AGENTS.md) §1.5 and [`RULES.md`](RULES.md) §2.

| Forbidden until gate passes | Requirement |
|----------------------------|-------------|
| Creating TASK file | Gate D — `project/plans/{slug}.md` exists with platform inventory and E2E matrix |
| `Status: in_progress` | Gate A — Context read lists every file read (not empty) |
| `Status: in_progress` | Gate C — documents + design (when UI) complete |
| `Status: in_progress` | Coding task: **re-read `instructions/CODE.md`** for scope; sections listed in Context read ([`RULES.md`](RULES.md) §8) |
| `Status: in_progress` | Plan ref + spec ref + code ref (on app source steps); §1.7 granularity |
| `Status: in_progress` | **Application map** (§1.4a) complete — user/data flow + route/module table + build sequence |
| `Status: in_progress` | Zero steps using forbidden shorthand (§1.4); every step has 3+ **How to do it** sub-steps |
| Marking application-source step complete | Touched file passes CODE §1–2 (block comment + inline journal) |
| `Status: in_progress` | **Files expected to change** table matches implementation steps 1:1 (§1.8); exhaustive scope covered |
| Any application code edit | Gates A–D complete; user confirmed for bootstrap/new apps |
| Any application code edit while `in_progress` | Active task file re-opened; **Agent execution checklist** run this work block (§1.9) |
| Marking implementation step `[x]` | That step's **Step checklist** all checked; **Verify** passed |
| `Status: complete` | Every implementation step `[x]`; **Task completion checklist** all checked (§4) |

**User confirm required** for greenfield bootstrap and any request that creates new apps — not only when scope is "large or ambiguous."

## 1.7 Step granularity (hard default)

**One step = one deliverable** — a single file, migration, route, page, component, or compose service. Not a folder wildcard.

| Rule | Detail |
|------|--------|
| **Forbidden** | `all API routes`, `Drive UI components`, `pages (drive, docs, auth)`, paths ending in `/**` |
| **Spec ref required** | Every step links `project/documents/...` or `project/design/...` |
| **Plan ref required** | Every step links a section in `project/plans/...` |
| **Code ref required** | Every step that touches application source links `instructions/CODE.md` sections |
| **Bootstrap minimum** | Greenfield bootstrap must list **every** planned file/route/page/component/platform slug as its own step in **this task file** |
| **Entity coverage** | Each DB model/migration, API route, page, and shared component → own step |
| **How to do it required** | Every step includes numbered procedural sub-steps (§1.5) |
| **Step checklist required** | Every step includes checkboxes ticked before marking `[x]` |

**Bad:**

```markdown
6. [ ] **platforms/kardus/src/app/api/** — all API routes
7. [ ] **platforms/kardus/src/components/** — Drive UI components
```

**Good:**

```markdown
6. [ ] **platforms/kardus/src/app/api/files/route.ts** — GET list, POST upload
   - Plan ref: project/plans/20260622_bootstrap-kardus.md#phase-api
   - Spec ref: project/documents/kardus-drive/api-specification-document.md
   - Code ref: instructions/CODE.md §1-2, §8
   - Before: new file
   - After: paginated list + multipart upload handler
   - Done when: both methods registered, responses match spec, Verify passes
   - How to do it:
     1. Create `route.ts`; add block comment per CODE §1
     2. Implement GET: parse page/limit query, call service, return `{ code, data }` envelope
     3. Implement POST: parse multipart, validate MIME/size per spec, store via service
     4. Wire exports; ensure parent router imports this file (see step N)
   - Step checklist:
     - [ ] Spec section for list + upload read
     - [ ] CODE §1–2 block + inline journal on handlers
     - [ ] Response shapes match api-specification-document.md
     - [ ] Verify command below passes
   - Verify: curl + integration test per project/AGENTS.md
```

Group steps by phase: Clarify → Docs → Design → **Service platforms** → Apps → Wire compose → **E2E verify** — all inside **one task file**.

## 1.8 Exhaustive task (hard default)

**One standalone task with as many steps as needed** — never split because the list is long.

| Rule | Detail |
|------|--------|
| **Default** | Single `project/tasks/{timestamp}_{slug}.md` covering the **full** scope of the user request |
| **Planning time** | Over-specify steps during `Status: planning` — agents should enumerate every deliverable, not summarize |
| **Derive from** | Plan platform inventory + `project/documents/` + `project/design/` + **Files expected to change** table |
| **No step ceiling** | Step count is not a reason to split; add more steps to the same file |
| **Coverage** | Every row in **Files expected to change** must have a matching implementation step (or justify merges in Decisions) |
| **Phases** | Group steps by phase inside one file — do not create separate task files per phase |
| **Forbidden** | Parent/child task files; splitting at N steps; folder-wildcard steps; "implement later" placeholders |

### Standalone only

- One `project/tasks/{timestamp}_{slug}.md` per user request — update in-progress file instead of duplicating
- Never `parent`, `child`, or `-phase-` task filenames
- Huge scope → more steps in the **same file**, not a new task file

## 1.9 Task-driven execution (hard STOP)

**While `Status: in_progress`**, agents follow this loop — prior chat context does not replace the task file.

1. **Re-open** the active `project/tasks/{timestamp}_{slug}.md` at the **start of every work block** (every agent session / before any app edit)
2. **Run** the **Agent execution checklist** section in that file (§4 template)
3. **Execute only** the next unchecked implementation step — in order unless Decisions document reordering
4. **Read** that step's Plan ref, Spec ref, and Code ref before editing
5. **Follow** **How to do it** sub-steps; tick **Step checklist** in the task file
6. **Run Verify**; only then mark the implementation step `[x]` in the task file
7. **Save** the task file before the next step or end of session

**Forbidden while `in_progress`:** application edits with no active task file re-read this work block; skipping unchecked steps; marking task `complete` with unchecked implementation steps or incomplete **Task completion checklist**.

Detail: §1.6 execution gates table.

## 2. When to Create a Task File

**Brownfield fresh adoption (required):** When [`BROWNFIELD.md`](BROWNFIELD.md) §0.1 signals are true, create `project/tasks/{timestamp}_brownfield-onboarding.md` **before** any other app task — including the user's parked request. Onboarding **does not** require a Gate D plan; it **is** Gate B. Follow §5.2 for drafting.

**Required** after Gate D plan exists for any other non-trivial request that will touch:

- Application source (paths from `project/INFRASTRUCTURE.md`)
- Deploy, build, or container config (when applicable)
- Database schema, migrations, or seeds
- `project/` config, feature docs, or instruction templates (when user explicitly requests template updates)

Includes greenfield bootstrap, brownfield onboarding, new features, refactors, and multi-file fixes.

**Optional to skip** — same bar as [`HISTORY.md`](HISTORY.md): trivial typo or format-only edits with zero behavioral impact.

**Never** create duplicate task files for the same active request — update the existing in-progress task instead.

## 3. Filename Format

```
{timestamp}_{task-slug}.md
```

| Part | Rule |
|------|------|
| `timestamp` | Server time: `YYYYMMDD_HHmmss` (24-hour, zero-padded) — same as HISTORY |
| `task-slug` | Lowercase kebab-case, words separated by `-`, no spaces, max ~60 chars |
| Location | `project/tasks/{timestamp}_{task-slug}.md` |

**Example:** `project/tasks/20260622_143052_bootstrap-app.md`

### Finding task files

| Goal | How |
|------|-----|
| **Latest task** | Sort `project/tasks/` filenames **descending** |
| **Active work** | Read newest files with `Status: planning`, `blocked`, or `in_progress` |
| **Correct a mistake** | Append a new task file or HISTORY entry — never rewrite completed task files |

## 4. Entry Body Template

```markdown
# {Human-readable task title}

- **Timestamp:** {ISO-8601 datetime matching filename}
- **Status:** planning | blocked | in_progress | complete | cancelled
- **Plan ref:** project/plans/{timestamp}_{slug}.md
- **User request:** {verbatim or summary}
- **Parked request:** {verbatim user message to execute after onboarding — brownfield onboarding only; omit or "none"}
- **Scope:** {apps/paths from project/INFRASTRUCTURE.md} | docker | deploy | docs | document | task | multi
- **Paths in scope:** `{path}/`, ... (from `project/INFRASTRUCTURE.md`)

## Context read

- `instructions/CODE.md` — **re-read §{list} for this task** (required when touching application source; §1–2 always)
- `instructions/RULES.md`, `PLAN.md`, `README.md`, active mode guide, `INFRASTRUCTURE.md`, `TASK.md`, `DESIGN.md`, `HISTORY.md`, `DOCUMENT.md` — all read
- `project/plans/{slug}.md` — {plan read; created before this task}
- `other-references/` — {entries read, or "empty"}
- `project/OVERVIEW.md`, `project/INFRASTRUCTURE.md`, `project/AGENTS.md`, `project/DESIGN.md` — {read or "not yet created"}
- `project/design/` — {all required files read, or "created this task"; N/A if no web UI}
- `project/histories/` — {entries scanned}
- `project/documents/{feature}/` — {all files read, or "created this task"}
- `project/tasks/` — {prior related tasks if any}

## Clarification log

| Question | Recommended | User answer | Recorded in |
|----------|-------------|-------------|-------------|
| {what is missing} | {default choice} | {user reply} | project/OVERVIEW.md, etc. |

## Decisions

- {Locked choices before implementation}

## Approach

{1–3 sentences: strategy, which paths/apps are touched}

## Application map

### User / data flow
{numbered flow or mermaid — every screen, API call, or service interaction}

### Routes and pages (web) OR modules and endpoints (API-only)
| Path / module | Purpose | Reads from | Writes to | Spec ref |
|---------------|---------|------------|-----------|----------|

### Component / module tree
{table — parent → children with file paths; N/A if single-file change}

### Build sequence
1. {dependency order — e.g. types → lib → storage → pages → docker}

## Agent execution checklist

**Hard rule — re-read and tick this section at the start of every work block while `Status: in_progress`.**

- [ ] Active task file: `project/tasks/{timestamp}_{slug}.md` (this file)
- [ ] `Status:` is `in_progress` (not `planning`)
- [ ] Context read + CODE.md re-read sections noted for this session
- [ ] Application map read this session — next step matches mapped flow
- [ ] Next unchecked implementation step: #{number} — **{path}**
- [ ] That step's Plan ref, Spec ref, Code ref read this session
- [ ] After work: step #{number} Step checklist complete; step marked `[x]`
- [ ] Task file saved before next step or session end

## Implementation steps

**Exhaustive — minimum one step per file.** Every step must include **How to do it**, **Step checklist**, and **Done when** (§1.5) before `Status: in_progress`. No forbidden shorthand (§1.4). Group by phase inside this single task file.

### Phase: {name}

1. [ ] **{path}** — {change summary}
   - Plan ref: project/plans/...#{section}
   - Spec ref: project/documents/... or project/design/...
   - Code ref: instructions/CODE.md §... (required when path is application source)
   - Before: ...
   - After: ...
   - Done when: ...
   - How to do it:
     1. ...
     2. ...
   - Step checklist:
     - [ ] ...
     - [ ] ...
   - Verify: ...

### Phase: E2E verify

1. [ ] **deploy/docker-compose.yml** — local cycle
   - Plan ref: project/plans/...#e2e-local
   - Done when: compose up → health → smoke → compose down passes
   - How to do it:
     1. Run `docker compose -f deploy/docker-compose.yml up -d --build`
     2. Wait for healthchecks; run smoke tests per plan E2E matrix
     3. Run `docker compose down`
   - Step checklist:
     - [ ] All services healthy
     - [ ] Smoke tests pass
     - [ ] Clean teardown
   - Verify: compose up → health → smoke → compose down
2. [ ] **deploy/platforms/** — deploy cycle (greenfield bootstrap)
   - Plan ref: project/plans/...#e2e-deploy
   - Done when: build → save → load → compose up → smoke passes
   - How to do it:
     1. Build every platform image per project/INFRASTRUCTURE.md
     2. Save/load per GREENFIELD §3
     3. Compose up and smoke test
   - Step checklist:
     - [ ] All images built and exported
     - [ ] Loaded compose smoke passes
   - Verify: build all images → save → load → compose up → smoke

## Files expected to change

| Path | Change |
|------|--------|
| `{app-path}/...` | ... |
| `deploy/...` | ... (when applicable) |

## Open questions

- {If blocked: question, why it matters, **Recommended:** default}

## Task completion checklist

- [ ] Every implementation step marked `[x]` with Step checklist complete
- [ ] Agent execution checklist re-run at start of final work block
- [ ] CODE.md re-read at task start; sections listed in Context read
- [ ] Every step has Code ref on application-source steps
- [ ] Every touched source file: block comment + Var/Logic inline journal per CODE §1–2
- [ ] CODE §14 agent checklist passed for touched code
- [ ] Every step has Plan ref to `project/plans/`
- [ ] Every step has Spec ref to `project/documents/` or `project/design/`
- [ ] Task is standalone — no parent/child split (§1.8)
- [ ] Step count covers full scope — no step-count ceiling (§1.8)
- [ ] Files expected to change table matches implementation steps 1:1
- [ ] No folder-wildcard steps (§1.7)
- [ ] Application map complete — every route/page or endpoint/module listed with spec refs (§1.4a)
- [ ] No forbidden shorthand steps (§1.4)
- [ ] **Local E2E:** compose up → health → smoke → compose down (when compose exists)
- [ ] **Deploy E2E:** build all platform images → save → load → compose up → smoke (greenfield bootstrap)
- [ ] Lint/typecheck per [`CODE.md`](CODE.md) section 15
- [ ] Tests run
- [ ] Production-grade UI per [`DESIGN.md`](DESIGN.md) (states, responsive, modals)
- [ ] Production-grade infra per [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md) / [`GREENFIELD.md`](GREENFIELD.md) (health, env, backup when in scope)
- [ ] Production-grade API per [`CODE.md`](CODE.md) §8, §11, §16
- [ ] No in-scope stubs or MVP shortcuts unless user explicitly requested MVP
- [ ] `project/documents/` updated if feature work
- [ ] `project/histories/{timestamp}_{title}.md` appended
- [ ] Task status → `complete`

## Related

- `project/plans/...`
- `project/histories/...`
- `project/documents/...`
- `project/tasks/...` (prior tasks if relevant)
```

### Status values

| Status | Use when |
|--------|----------|
| `planning` | Drafting Application map, Approach, and implementation steps — no implementation edits yet |
| `blocked` | Waiting on user answer or external dependency |
| `in_progress` | Executing plan steps |
| `complete` | All steps and verification done; HISTORY entry appended |
| `cancelled` | User abandoned or superseded the request |

### Scope field

Use **paths and app slugs** from `project/INFRASTRUCTURE.md`. Add `docker`, `deploy`, `docs`, `document`, `task`, or `multi` as needed.

## 5. Agent Workflow (plan mode sequence)

1. **Plan exists** (Gate D) — `project/plans/...` with platform inventory?
2. **CODE.md re-read** — sections listed in Context read when task touches application source?
3. **Draft exhaustive task** (`Status: planning`) — follow §5.1 drafting prompt; write Application map (§1.4a) then enumerate **every** deliverable; match Files expected to change
4. **Clarify** — Open questions → Clarification log
5. **Confirm** — greenfield bootstrap / new apps / large scope
6. **Execute** (`Status: in_progress`) — §1.9 loop: re-open task → Agent execution checklist → next step → How to do it → Step checklist → Verify → mark `[x]` → repeat
7. **Complete** — Gate F E2E + Task completion checklist; HISTORY links plan + task

### Get timestamp

```powershell
Get-Date -Format 'yyyyMMdd_HHmmss'
```

```bash
date +%Y%m%d_%H%M%S
```

## 5.1 Gate E drafting prompt (literal block)

**When drafting** `Status: planning` task files, agents follow this prompt — do not substitute a shorter format:

```markdown
You are drafting Gate E task file project/tasks/{timestamp}_{slug}.md.

HARD RULES:
1. Read project/plans/{slug}.md platform inventory and E2E matrix.
2. Write ## Application map (§1.4a) — full user/data flow before any implementation step.
3. Expand EVERY planned file, route, page, component, migration, and compose service into its own numbered step.
4. Each step MUST have: Plan ref, Spec ref, Code ref (if app source), Before, After, Done when, How to do it (3–8 sub-steps), Step checklist (3–6 items), Verify.
5. FORBIDDEN: phase-only steps, ### Step N headers, one-line How, single-checkbox Checklist.
6. Minimum step count: match Files expected to change table 1:1; greenfield bootstrap typically 50–200+ steps.
7. Stay Status: planning until Application map + all implementation steps are written.
```

After drafting, self-check against §1.4 (no shorthand), §1.4a (map complete), and §1.7 (one step per file).

## 5.2 Brownfield onboarding drafting prompt (literal block)

**When fresh adoption** ([`BROWNFIELD.md`](BROWNFIELD.md) §0.1), draft `project/tasks/{timestamp}_brownfield-onboarding.md` with this prompt:

```markdown
You are drafting brownfield onboarding task project/tasks/{timestamp}_brownfield-onboarding.md.

HARD RULES:
1. Record Parked request if the user asked for something else — execute after onboarding.
2. Write ## Application map — repo units, paths, data flow (from code scan, not invented).
3. One numbered step per deliverable file below — each with How to do it (3–8 sub-steps) + Step checklist.
4. Scan order: BROWNFIELD §1.1 (root manifests → app layout → data → deploy → dev workflow → UI → other-references).
5. Deliverables (minimum):
   - {root}/AGENTS.md (copy or merge from templates/root-AGENTS.md)
   - project/OVERVIEW.md
   - project/INFRASTRUCTURE.md
   - project/AGENTS.md (verify dev/lint/test commands)
   - project/DESIGN.md + project/design/ (from existing UI or N/A)
   - project/documents/repo/technical-documentation.md
   - project/documents/repo/system-design-document.md
   - project/histories/{timestamp}_brownfield-onboarding.md
6. Stay Status: planning until all steps written; in_progress only after Gates A + BROWNFIELD §0.1 scope clear.
7. FORBIDDEN: starting the parked user feature; application source edits during onboarding except verify commands.
```

## 6. Do's and Don'ts

### Do

- Write plans users can review before implementation — like Cursor plan mode
- Name exact paths and describe before/after for each step
- List paths in scope from `project/INFRASTRUCTURE.md`
- Ask the user when uncertain — one batch, with **Recommended:** defaults
- Write task files locally — gitignored except `project/tasks/README.md`
- Write **exhaustive** standalone tasks — as many detailed steps as the scope requires
- Derive every step from `project/plans/`, `project/documents/`, `project/design/`, and **`instructions/CODE.md`**
- Include **Code ref** on every application-source implementation step
- Include **How to do it** and **Step checklist** on every implementation step (§1.5)
- Write **Application map** (§1.4a) before implementation steps — every route/page or endpoint/module with spec refs
- Include explicit E2E verify steps in final phase
- Re-open active task file and run **Agent execution checklist** each work block while `in_progress` (§1.9)

### Don't

- Don't skip task files for non-trivial implementation work
- Don't use vague steps ("implement feature", "fix bug")
- Don't use forbidden shorthand: `### Step N —`, `**How:**`, `**Checklist:**` with one line (§1.4)
- Don't use folder paths with `/**` or bundle "all routes/components/pages" in one step
- Don't start implementation edits while `Status: planning` and steps are incomplete
- Don't create TASK before Gate D plan exists
- Don't set `Status: in_progress` before Application map is complete (§1.4a)
- Don't set `Status: in_progress` before Gates A–D pass (see §1.6)
- Don't split a task because step count is high — add steps to the same file (§1.8)
- Don't create parent or child task files (§1.8)
- Don't set `Status: in_progress` before Files expected to change matches steps (§1.8)
- Don't leave Context read empty — list every file read in Gate A
- Don't put feature specs in TASK — use `project/documents/`
- Don't put change logs in TASK — use `project/histories/` after completion
- Don't rewrite completed task files — append new TASK or HISTORY entries
- Don't mark implementation steps complete without **Step checklist** ticked in task file
- Don't implement from memory without re-opening active task file each work block (§1.9)

## 7. Agent Checklist

1. Gate D plan exists before TASK file?
2. **Application map** complete with flow, route/module table, build sequence (§1.4a)?
3. Task is **standalone exhaustive** — full scope in one file (§1.8)?
4. No forbidden shorthand steps — every step has 3+ **How to do it** sub-steps (§1.4)?
5. Step count ≥ **Files expected to change** row count (§1.8)?
6. CODE.md re-read at task start (sections in Context read)?
7. AGENTS Gates A–D passed before `Status: in_progress`?
8. Files expected to change matches implementation steps 1:1?
9. Every app-source step has Plan ref + Spec ref + Code ref?
10. CODE §1–2 on every touched source file?
11. E2E local + deploy cycles complete (Gate F)?
12. Active task file re-opened this work block; step Step checklists complete (§1.9)?
13. Task completion checklist all checked before `Status: complete`?
14. HISTORY links plan + task + E2E + CODE compliance?
