# Documents

Local **feature reference documentation** for this project. Rules: [`DOCUMENT.md`](../../instructions/DOCUMENT.md) in `instructions/`.

**Required before application code** — per AGENTS §0.5 Gate C and DOCUMENT.md.

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

| | tasks | documents | histories |
|---|-------|-----------|-----------|
| **Purpose** | Step plan for one request | Persistent feature specs | Change log after work |

## Git

All feature folders and files here are **gitignored** except this README. The system creates and updates specs locally during feature work.
