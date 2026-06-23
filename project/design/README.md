# Design

Detailed **design system specifications** for this project. Rules: [`DESIGN.md`](../../instructions/DESIGN.md) in `instructions/`.

**Required before UI code** — per AGENTS §1.5 Gate C and DESIGN.md §1.

The **index** (philosophy, library choice, links) lives in `project/DESIGN.md` (gitignored). All token, component, and screen detail lives here in `project/design/`.

## Required files (greenfield + web UI)

| File | Purpose |
|------|---------|
| `color-palette-and-tokens.md` | Colors, CSS variables, semantic roles — use pack default from [`DESIGN.md`](../../instructions/DESIGN.md) §3 when user silent on theme |
| `typography-system.md` | Fonts, type scale, hierarchy |
| `spacing-layout-and-grid.md` | Spacing scale, grid, containers |
| `elevation-and-shadow-system.md` | Shadows, elevation levels |
| `component-library-and-theming.md` | Library choice, theme mapping |
| `buttons-and-actions.md` | Button variants and states |
| `forms-and-inputs.md` | Inputs, validation display |
| `modals-and-dialogs.md` | Confirmation modals, dialogs |
| `navigation-and-shell.md` | Nav, shell, app chrome |
| `tables-lists-and-pagination.md` | CRUD index, tables, pagination |
| `feedback-states-and-alerts.md` | Loading, error, empty, success |
| `responsive-breakpoints.md` | Chosen responsive strategy + breakpoints |
| `accessibility-guidelines.md` | Focus, keyboard, touch targets |
| `screens/{screen-slug}.md` | Per-screen specs (add per major screen) |

## Git

All files here are **gitignored** except this README. Agents create and update specs locally before and during UI work.
