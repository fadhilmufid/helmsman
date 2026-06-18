# Project Design System

Editable per-project tokens and UI specs. Example values from [`GREENFIELD.MD`](../GREENFIELD.MD) — confirm via clarify-before-build.

## Component library

| Field | Value |
|-------|-------|
| **Library** | shadcn/ui + Radix primitives |
| **Shared components path** | `platforms/web/src/components/ui/` |
| **Icons** | lucide-react |
| **Alert wrapper** | `platforms/web/src/components/Alert.tsx` |

## Theme

- Mood: dark, content-first
- Philosophy: "Calm productivity — readable lists, clear actions, minimal chrome"

## Colors (CSS variables)

| Token | Value | Role |
|-------|-------|------|
| `--bg-base` | `#0a0a0b` | Page background |
| `--bg-surface` | `#141416` | Cards, panels |
| `--bg-elevated` | `#1c1c1f` | Modals, dropdowns |
| `--text-primary` | `#f4f4f5` | Headings, body |
| `--text-muted` | `#a1a1aa` | Secondary text |
| `--accent-primary` | `#3b82f6` | Primary actions, links |
| `--accent-primary-hover` | `#2563eb` | Primary hover |
| `--border-default` | `#27272a` | Borders |
| `--semantic-error` | `#ef4444` | Errors, destructive |
| `--semantic-success` | `#22c55e` | Success states |

Map to shadcn theme variables in `platforms/web/src/app/globals.css`.

## Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Title | system-ui, sans-serif | 1.5rem | 600 |
| Body | system-ui, sans-serif | 1rem | 400 |
| Caption | system-ui, sans-serif | 0.875rem | 400 |

Button labels: sentence case.

## Responsive breakpoints (mobile-first)

| Name | Min width | Notes |
|------|-----------|-------|
| mobile | (default) | Single column, stacked cards, collapsible filters |
| tablet | `768px` | Wider toolbar, optional side nav |
| desktop | `1024px` | Max-width container, sidebar nav |

## Key components

| Component | Notes |
|-----------|-------|
| Button | primary, secondary, destructive, ghost |
| Input / Textarea | full-width on mobile forms |
| Dialog | delete confirmation — title, body, cancel/confirm |
| Card | todo list items on mobile |
| Alert | inline API errors via Alert wrapper |
| Switch | completed toggle on edit/detail |

## Build order

base tokens → surface tokens → accent → install shadcn/ui → themed components → CRUD pages

## Related

- [`DESIGN.MD`](../DESIGN.MD) — general design rules
- [`DOCUMENT/todo-management/user-interface-specification-document.md`](DOCUMENT/todo-management/user-interface-specification-document.md)
