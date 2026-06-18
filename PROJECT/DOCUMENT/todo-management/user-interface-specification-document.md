# User Interface Specification Document

- **Feature:** Todo Management
- **Last updated:** 2026-06-18
- **Status:** active

## Summary

Mobile-first UI for todo CRUD. Component library: shadcn/ui per [`PROJECT/DESIGN.MD`](../../DESIGN.MD). Layout rules per [`DESIGN.MD`](../../../DESIGN.MD) sections 5 and 8.

## Global layout

- **Mobile (default):** single column, full-width content, bottom or top nav with Todos + Logout
- **Tablet (768px+):** optional sidebar for nav
- **Desktop (1024px+):** max-width container centered; sidebar nav

Touch targets minimum 44px height on interactive elements.

## Pages

### Login / Register

- Centered card on `--bg-surface`
- Email + password fields (library Input components)
- Submit primary button; link to alternate auth page
- Validation errors below fields + Alert for server errors
- Mobile: full-width card with padding

### Todos index (`/todos`)

| Zone | Mobile | Desktop |
|------|--------|---------|
| Header | Title + New button (icon+label or FAB) | Title left, New button right |
| Search | Full-width search input | Inline with filters |
| Filters | Collapsible row or drawer: All / Active / Completed | Horizontal chip/button group |
| Sort | Select dropdown | Select in toolbar |
| List | Stacked cards (title, due date badge, completed checkbox) | Table or cards — must not overflow |
| Pagination | Prev/Next + page indicator | Full pagination footer |
| Empty state | Illustration/icon + "No todos yet" + New CTA | Same |

Row actions: Edit (navigate), Delete (opens modal). Completed toggle inline on card/row.

### Create / Edit form

- Fields: Title (required), Description (textarea), Due date (date picker from library)
- Edit only: Completed toggle (Switch)
- Footer: Cancel (secondary), Save (primary)
- Mobile: sticky footer actions

### Detail (`/todos/[id]`)

- Title as heading; completed badge
- Description block (or "No description")
- Due date formatted (date-fns)
- Metadata: created/updated timestamps (muted text)
- Actions: Edit, Delete, Toggle complete

### Delete confirmation modal

Per [`DESIGN.MD`](../../../DESIGN.MD) — Dialog component from library:

- Title: "Delete todo?"
- Body: "This cannot be undone from the app." (soft delete — optional note)
- Cancel (secondary), Delete (destructive variant)
- No `window.confirm`

## States

| State | Behavior |
|-------|----------|
| Loading | Skeleton or spinner on list/detail |
| Empty list | Empty state with CTA |
| Error (load) | Alert + retry button |
| Unauthorized | Redirect login (no Alert) |

## Component mapping (shadcn/ui)

| UI need | Component |
|---------|-----------|
| Buttons | `Button` |
| Forms | `Input`, `Textarea`, `Label`, `Switch` |
| Modal | `Dialog` |
| List/table | `Card` or `Table` |
| Feedback | `Alert` (via `@/components/Alert` wrapper) |
| Date | Date picker from shadcn patterns |

## Related

- [`functional-specification-document.md`](functional-specification-document.md)
- [`api-specification-document.md`](api-specification-document.md)
