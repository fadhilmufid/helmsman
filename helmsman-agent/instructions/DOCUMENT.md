# Feature Documentation

**Integration:** Specs feed Gate D plans and Gate E tasks (Plan ref + Spec ref on every step). UI detail may also live in `project/design/`. See [`RULES.md`](RULES.md) §4. Project config: [`OVERVIEW.md`](OVERVIEW.md) → `project/PROJECT-OVERVIEW.md`.

Rules for feature reference documentation in [`project/documents/`](project/documents/). **Read-only template**.

## 0. Production-grade specs

Per the production bar ([`RULES.md`](RULES.md) §5): feature docs define **production-ready behavior** — error cases, edge states, auth boundaries, mobile + desktop UX. `api-specification-document.md` lists every response `code`, HTTP status, and frontend scenario; `user-interface-specification-document.md` covers loading/error/empty states per screen. Specs define what "complete" means at production quality — never happy-path-only sketches that justify stubs.

## 1. Purpose

Living **feature reference documentation** — distinct from other project doc layers:

| | TASK | DOCUMENT | HISTORY |
|---|------|----------|---------|
| **What** | Exhaustive standalone execution plan | Feature specs and reference docs | Chronological change log |
| **When** | Before/during a user request | When building or updating a feature | After work completes |
| **Shape** | One file per task — exhaustive, one file per request | One folder per feature, many doc files | One file per change event |

- **Agent-readable reference** — agents read feature docs before and during implementation
- **Evolves with the app** — update docs as the feature is built, not only at the end
- **No file cap** — create as many full-name documents as the feature needs

Use [`TASK.md`](TASK.md) for execution steps; use DOCUMENT for persistent specs that outlive a single request.

**Brownfield:** discovery feeds `technical-documentation.md` and `system-design-document.md` when onboarding or documenting architecture — see [`BROWNFIELD.md`](BROWNFIELD.md).

## 2. Folder Layout

```
project/
└── documents/
    └── {feature-slug}/
        ├── business-requirements-document.md
        ├── functional-specification-document.md
        ├── technical-documentation.md
        └── ... (as needed)
```

| Part | Rule |
|------|------|
| `{feature-slug}` | Lowercase kebab-case (e.g. `user-authentication`, `inventory-management`) |
| Doc files | Lowercase kebab-case, **full names only — never abbreviate** |
| Location | `project/documents/{feature-slug}/` |

### Codebase-wide slug `repo` (brownfield onboarding)

For **whole-repo knowledge** on fresh Helmsman adoption — not a product feature:

```
project/documents/repo/
├── technical-documentation.md
└── system-design-document.md
```

Required when [`BROWNFIELD.md`](BROWNFIELD.md) §0.1 applies and the app is non-trivial. Content must be **inferred from `{root}` code** during discovery — do not invent architecture the repo does not have.

### Allowed document filenames (full names)

Use these when applicable — add others with full descriptive names when useful:

| Filename | Use when |
|----------|----------|
| `business-requirements-document.md` | Business goals, stakeholders, scope, constraints |
| `functional-specification-document.md` | User flows, behavior, acceptance criteria; for CRUD features list every page (index, create, edit, detail, delete flow) and API operations before coding |
| `business-solution-document.md` | Solution approach, alternatives, trade-offs |
| `technical-documentation.md` | Implementation overview, data model, dependencies |
| `system-design-document.md` | Architecture, components, integration points |
| `api-specification-document.md` | Endpoints, request/response shapes; every success and error **code**, HTTP status, and frontend scenario (Alert / redirect / modal) |
| `user-interface-specification-document.md` | Screens, states, interactions, design notes — screen-level visual detail may also live in `project/design/screens/`; must not contradict |

**Never** use abbreviated filenames such as `brd.md`, `fsd.md`, or `bsd.md`.

## 3. When to Create or Update

**Hard gate:** No application source edits until required DOCUMENT files exist for the feature. Per [`HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) §1.5 Gate C.

**Required** when the user asks to build or significantly change a feature — after clarification per [`HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) section 3 is complete:

### Greenfield bootstrap required documents

For each feature slug, create **before** `platforms/`, `deploy/`, or application code:

| File | When required |
|------|---------------|
| `business-requirements-document.md` | Always |
| `functional-specification-document.md` | Always |
| `technical-documentation.md` | Always |
| `api-specification-document.md` | When API is in scope |
| `user-interface-specification-document.md` | When web UI is in scope |

See [`GREENFIELD.md`](GREENFIELD.md) Phase A.5.

### Feature work steps

1. **Identify the feature slug** — create `project/documents/{feature-slug}/` if new
2. **Decide which documents are needed** — based on feature complexity:

| Situation | Required documents |
|-----------|-------------------|
| Simple bugfix / tiny tweak | Skip new DOCUMENT files; note in HISTORY only |
| New user-facing feature (API + UI in scope) | **All five:** business-requirements + functional-specification + technical-documentation + api-specification + user-interface-specification |
| New user-facing feature (UI only) | business-requirements + functional-specification + technical-documentation + user-interface-specification |
| Integration / API feature (no UI) | business-requirements + functional-specification + technical-documentation + api-specification-document |
| Architecture change | Add system-design-document or business-solution-document |
| CRUD / entity management feature | functional-specification + user-interface-specification + technical-documentation + api-specification — list all pages, API endpoints, UUID + soft-delete schema **before** coding |

3. **Create or update** relevant files **before implementation begins** (draft status OK) and **as the feature is built** — docs evolve with decisions, not only at the end
4. **Cross-link** — PLAN platform inventory references `technical-documentation.md`; TASK/HISTORY link `project/plans/` and `project/documents/`; UI in `project/design/screens/` or `user-interface-specification-document.md` — must not contradict
5. **Application map inputs** — `user-interface-specification-document.md` and `api-specification-document.md` must list routes, screens, endpoints, and flows in enough detail to populate TASK **Application map** ([`TASK.md`](TASK.md) §1.4a)

**Optional to skip** for trivial changes with zero spec impact (same bar as HISTORY optional skip).

## 4. Document Body Template

```markdown
# {Full document title}

- **Feature:** {human-readable feature name}
- **Last updated:** {ISO-8601 date}
- **Status:** draft | active | deprecated

## Summary

One paragraph.

## Content

(Sections appropriate to document type — requirements, flows, APIs, data model, etc.)

## Related

- `project/tasks/...` — task plan driving current work (if applicable)
- `project/histories/...` — relevant change entries
- Other `project/documents/{feature}/` files
- Code paths per `project/PROJECT-INFRASTRUCTURE.md`
```

## 5. Agent Workflow

### Before feature work

1. Read this file
2. Confirm feature scope and open decisions were clarified per [`HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) section 3
3. Create or open task plan per [`TASK.md`](TASK.md)
4. If `project/documents/{feature-slug}/` exists, read all files in that folder
5. Read recent `project/histories/` entries for the same feature

### During feature work

1. Update or create DOCUMENT files in the same turn as code when decisions are made
2. Keep `Last updated` and `Status` current
3. Add cross-links to code paths, TASK files, and HISTORY entries

### After feature work

1. Ensure docs reflect final implementation state
2. Mark task complete per [`TASK.md`](TASK.md)
3. Append `project/histories/{timestamp}_{title}.md` per [`HISTORY.md`](HISTORY.md)
4. Reference `project/documents/{feature}/` paths in the history entry when feature docs were touched

## 6. Do's and Don'ts

### Do

- Organize docs by feature folder under `project/documents/`
- Use full descriptive filenames — never abbreviations
- Create only the document types the feature needs
- Update docs as the feature evolves, not only when finished
- Cross-link between DOCUMENT files, TASK plans, HISTORY entries, and code paths in `project/PROJECT-INFRASTRUCTURE.md`

### Don't

- Don't put feature specs in `project/histories/` — HISTORY is a change log, not a spec library
- Don't put execution steps in DOCUMENT — use `project/tasks/` per [`TASK.md`](TASK.md)
- Don't start scaffold, handlers, or pages before functional-specification and api-specification exist for CRUD/API features
- Don't write happy-path-only specs that justify stub implementations
- Don't use abbreviated doc filenames (`brd.md`, `fsd.md`, etc.)
- Don't let DOCUMENT files drift from the implemented code
- Don't edit instruction templates (`instructions/*.md`, pack `HELMSMAN-AGENT.md`) when a `project/documents/` update suffices

## 7. Agent Checklist

1. AGENTS Gate C passed — required DOCUMENT files exist before application code?
2. Feature scope clarified per [`HELMSMAN-AGENT.md`](../HELMSMAN-AGENT.md) section 3 before coding?
3. Task plan created per [`TASK.md`](TASK.md)?
4. Feature slug folder exists at `project/documents/{feature-slug}/` when building a feature?
5. Filenames use full names only (no abbreviations)?
6. Right document types chosen for feature complexity?
7. Docs created before implementation and updated during, not deferred to the end?
8. `Last updated` and `Status` reflect current state?
9. HISTORY entry references DOCUMENT paths when applicable?
