# Feature Documentation

Rules for living feature reference documentation. **Read-only template** — content lives in [`project/document/`](project/document/).

Related: [`README.md`](../README.md), [`AGENTS.md`](../AGENTS.md), [`TASK.md`](TASK.md), [`CODE.md`](CODE.md), [`DESIGN.md`](DESIGN.md), [`HISTORY.md`](HISTORY.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md).

## 1. Purpose

Living **feature reference documentation** — distinct from other project doc layers:

| | TASK | DOCUMENT | HISTORY |
|---|------|----------|---------|
| **What** | Step-by-step plan for this request | Feature specs and reference docs | Chronological change log |
| **When** | Before/during a user request | When building or updating a feature | After work completes |
| **Shape** | One file per task | One folder per feature, many doc files | One file per change event |

- **AI-readable reference** — agents read feature docs before and during implementation
- **Evolves with the app** — update docs as the feature is built, not only at the end
- **No file cap** — create as many full-name documents as the feature needs

Use [`TASK.md`](TASK.md) for execution steps; use DOCUMENT for persistent specs that outlive a single request.

**Brownfield:** discovery feeds `technical-documentation.md` and `system-design-document.md` when onboarding or documenting architecture — see [`BROWNFIELD.md`](BROWNFIELD.md).

## 2. Folder Layout

```
project/
└── document/
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
| Location | `project/document/{feature-slug}/` |

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
| `user-interface-specification-document.md` | Screens, states, interactions, design notes |

**Never** use abbreviated filenames such as `brd.md`, `fsd.md`, or `bsd.md`.

## 3. When to Create or Update

**Required** when the user asks to build or significantly change a feature — after clarification per [`AGENTS.md`](../AGENTS.md) section 2 is complete:

1. **Identify the feature slug** — create `project/document/{feature-slug}/` if new
2. **Decide which documents are needed** — AI judgment based on feature complexity:

| Situation | Typical documents |
|-----------|-------------------|
| Simple bugfix / tiny tweak | Skip new DOCUMENT files; note in HISTORY only |
| New user-facing feature | business-requirements + functional-specification + technical-documentation |
| Integration / API feature | Add api-specification-document |
| UI-heavy feature | Add user-interface-specification-document |
| Architecture change | Add system-design-document or business-solution-document |
| CRUD / entity management feature | functional-specification + user-interface-specification + technical-documentation listing all pages, API endpoints, UUID + soft-delete schema |

3. **Create or update** relevant files **before implementation begins** (draft status OK) and **as the feature is built** — docs evolve with decisions, not only at the end
4. **Cross-link** — HISTORY entries should reference `project/document/{feature}/` paths when applicable; TASK files should reference DOCUMENT paths in Context read and Related

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

- `project/task/...` — task plan driving current work (if applicable)
- `project/history/...` — relevant change entries
- Other `project/document/{feature}/` files
- Code paths per `project/INFRASTRUCTURE.md`
```

## 5. Agent Workflow

### Before feature work

1. Read this file
2. Confirm feature scope and open decisions were clarified per [`AGENTS.md`](../AGENTS.md) section 2
3. Create or open task plan per [`TASK.md`](TASK.md)
4. If `project/document/{feature-slug}/` exists, read all files in that folder
5. Read recent `project/history/` entries for the same feature

### During feature work

1. Update or create DOCUMENT files in the same turn as code when decisions are made
2. Keep `Last updated` and `Status` current
3. Add cross-links to code paths, TASK files, and HISTORY entries

### After feature work

1. Ensure docs reflect final implementation state
2. Mark task complete per [`TASK.md`](TASK.md)
3. Append `project/history/{timestamp}_{title}.md` per [`HISTORY.md`](HISTORY.md)
4. Reference `project/document/{feature}/` paths in the history entry when feature docs were touched

## 6. Do's and Don'ts

### Do

- Organize docs by feature folder under `project/document/`
- Use full descriptive filenames — never abbreviations
- Create only the document types the feature needs
- Update docs as the feature evolves, not only when finished
- Cross-link between DOCUMENT files, TASK plans, HISTORY entries, and code paths in `project/INFRASTRUCTURE.md`

### Don't

- Don't put feature specs in `project/history/` — HISTORY is a change log, not a spec library
- Don't put execution steps in DOCUMENT — use `project/task/` per [`TASK.md`](TASK.md)
- Don't use abbreviated doc filenames (`brd.md`, `fsd.md`, etc.)
- Don't let DOCUMENT files drift from the implemented code
- Don't edit instruction templates (`instructions/*.md`, root `AGENTS.md`) when a `project/document/` update suffices

## 7. Agent Checklist

1. Feature scope clarified per [`AGENTS.md`](../AGENTS.md) section 2 before coding?
2. Task plan created per [`TASK.md`](TASK.md)?
3. Feature slug folder exists at `project/document/{feature-slug}/` when building a feature?
4. Filenames use full names only (no abbreviations)?
5. Right document types chosen for feature complexity?
6. Docs created before implementation and updated during, not deferred to the end?
7. `Last updated` and `Status` reflect current state?
8. HISTORY entry references DOCUMENT paths when applicable?
