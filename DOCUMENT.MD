# Feature Documentation

Rules for living feature reference documentation. **Read-only template** — content lives in [`PROJECT/DOCUMENT/`](PROJECT/DOCUMENT/).

Related: [`README.MD`](README.MD), [`AGENTS.MD`](AGENTS.MD), [`CODE.MD`](CODE.MD), [`DESIGN.MD`](DESIGN.MD), [`HISTORY.MD`](HISTORY.MD), [`GREENFIELD.MD`](GREENFIELD.MD) (greenfield feature specs).

## 1. Purpose

Living **feature reference documentation** — distinct from [`PROJECT/HISTORY/`](PROJECT/HISTORY/):

| | HISTORY | DOCUMENT |
|---|---------|----------|
| **What** | Chronological AI change log | Feature specs and reference docs |
| **When** | After every AI code/config change | When building or updating a feature |
| **Shape** | One file per change event | One folder per feature, many doc files inside |

- **AI-readable reference** — agents read feature docs before and during implementation
- **Evolves with the app** — update docs as the feature is built, not only at the end
- **No file cap** — create as many full-name documents as the feature needs

## 2. Folder Layout

```
PROJECT/
└── DOCUMENT/
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
| Location | `PROJECT/DOCUMENT/{feature-slug}/` |

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

**Required** when the user asks to build or significantly change a feature — after clarification per [`AGENTS.MD`](AGENTS.MD) section 2 is complete:

1. **Identify the feature slug** — create `PROJECT/DOCUMENT/{feature-slug}/` if new
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
4. **Cross-link** — HISTORY entries should reference `PROJECT/DOCUMENT/{feature}/` paths when applicable

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

- `PROJECT/HISTORY/...` — relevant change entries
- Other `PROJECT/DOCUMENT/{feature}/` files
- Code paths under `platforms/`
```

## 5. Agent Workflow

### Before feature work

1. Read this file
2. Confirm feature scope and open decisions were clarified per [`AGENTS.MD`](AGENTS.MD) section 2
3. If `PROJECT/DOCUMENT/{feature-slug}/` exists, read all files in that folder
4. Read recent `PROJECT/HISTORY/` entries for the same feature

### During feature work

1. Update or create DOCUMENT files in the same turn as code when decisions are made
2. Keep `Last updated` and `Status` current
3. Add cross-links to code paths and HISTORY entries

### After feature work

1. Ensure docs reflect final implementation state
2. Append `PROJECT/HISTORY/{timestamp}_{title}.md` per [`HISTORY.MD`](HISTORY.MD)
3. Reference `PROJECT/DOCUMENT/{feature}/` paths in the history entry when feature docs were touched

## 6. Do's and Don'ts

### Do

- Organize docs by feature folder under `PROJECT/DOCUMENT/`
- Use full descriptive filenames — never abbreviations
- Create only the document types the feature needs
- Update docs as the feature evolves, not only when finished
- Cross-link between DOCUMENT files, HISTORY entries, and `platforms/` code paths

### Don't

- Don't put feature specs in `PROJECT/HISTORY/` — HISTORY is a change log, not a spec library
- Don't use abbreviated doc filenames (`brd.md`, `fsd.md`, etc.)
- Don't let DOCUMENT files drift from the implemented code
- Don't edit general rule files (`DOCUMENT.MD`, `AGENTS.MD`, etc.) when a PROJECT/DOCUMENT update suffices

## 7. Agent Checklist

1. Feature scope clarified per [`AGENTS.MD`](AGENTS.MD) section 2 before coding?
2. Feature slug folder exists at `PROJECT/DOCUMENT/{feature-slug}/` when building a feature?
3. Filenames use full names only (no abbreviations)?
4. Right document types chosen for feature complexity?
5. Docs created before implementation and updated during, not deferred to the end?
6. `Last updated` and `Status` reflect current state?
7. HISTORY entry references DOCUMENT paths when applicable?
