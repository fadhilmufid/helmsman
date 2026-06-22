# Documents

Local **feature reference documentation** for this project. Rules: [`DOCUMENT.md`](../../instructions/DOCUMENT.md) in `instructions/`.

**Required before application code** — per AGENTS §1.5 Gate C and DOCUMENT.md.

For UI depth (tokens, components, screens), see [`project/design/`](../design/). Platform inventory lives in [`project/plans/`](../plans/) and `project/INFRASTRUCTURE.md`.

## Folder layout

```
project/documents/
└── {feature-slug}/
    ├── business-requirements-document.md
    ├── functional-specification-document.md
    └── ... (full descriptive names — never abbreviations)
```

| Part | Rule |
|------|------|
| `{feature-slug}` | Lowercase kebab-case (e.g. `user-authentication`) |
| Doc files | Lowercase kebab-case, full names only |

## Distinction from other layers

| | plans | tasks | documents | histories | design |
|---|-------|-------|-----------|-----------|--------|
| **Purpose** | Blueprint (platforms, E2E) | **Exhaustive standalone** step-by-step execution | Feature specs | Change log | Design system |

## Git

All feature folders and files here are **gitignored** except this README. The system creates and updates specs locally during feature work.
