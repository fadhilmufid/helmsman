# Functional Specification Document

- **Feature:** Todo Management
- **Last updated:** 2026-06-18
- **Status:** active

## Summary

Full CRUD surface for todos — API and web pages. Per [`CODE.MD`](../../../CODE.MD) section 11.

## User flows

### Authentication

1. Visitor opens app → redirected to login if no session
2. Register with email + password → auto-login → todos index
3. Login with credentials → todos index
4. Logout → login page

### Index (list)

1. User sees paginated list of their non-deleted todos
2. Search by title (debounced)
3. Filter: all | active | completed
4. Sort: created_at desc (default) | due_at asc | title asc
5. Tap row → detail page
6. Actions: New todo, Edit (row action), Delete (row action → confirmation modal)

### Create

1. User taps New → create form
2. Fields: title (required), description (optional), due_at (optional)
3. Submit → redirect to detail on success; validation errors → inline + Alert
4. Cancel → back to index

### Edit

1. User opens edit from index or detail
2. Same fields as create; completed toggle available
3. Submit → redirect to detail on success
4. Cancel → back to detail or index

### Detail

1. Shows all fields, created/updated timestamps
2. Actions: Edit, Delete (confirmation modal), Mark complete/incomplete

### Delete

1. User confirms in modal (not `window.confirm`)
2. API soft-deletes (`deleted_at` set)
3. Redirect to index with success feedback (optional toast/Alert per scenario matrix)

## Pages (web)

| Route | Purpose |
|-------|---------|
| `/login` | Login form |
| `/register` | Registration form |
| `/todos` | Index — search, filter, sort, pagination |
| `/todos/new` | Create form |
| `/todos/[id]` | Detail view |
| `/todos/[id]/edit` | Edit form |

## API operations

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/todos` | List (paginated, search, filter, sort) |
| POST | `/api/todos` | Create |
| GET | `/api/todos/:id` | Detail |
| PATCH | `/api/todos/:id` | Update |
| DELETE | `/api/todos/:id` | Soft delete |

Auth endpoints per auth scaffold (register, login, me, logout).

## Acceptance criteria

- [ ] All six web routes implemented mobile-first
- [ ] Index supports search, filter (all/active/completed), sort, pagination (default limit 20)
- [ ] Delete uses confirmation modal
- [ ] User cannot access another user's todo (404 or 403 with `TODO_NOT_FOUND` / `FORBIDDEN`)

## Related

- [`api-specification-document.md`](api-specification-document.md)
- [`user-interface-specification-document.md`](user-interface-specification-document.md)
