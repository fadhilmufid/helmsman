# API Specification Document

- **Feature:** Todo Management
- **Last updated:** 2026-06-18
- **Status:** active

## Summary

REST endpoints for todos. Every response includes `code` per [`CODE.MD`](../../../CODE.MD) section 8. All routes except auth and `/health` require authentication.

## Response envelope

**Success:**

```json
{ "success": true, "code": "TODO_LIST_FETCHED", "data": { } }
```

**Error:**

```json
{ "success": false, "error": { "code": "VALIDATION_FAILED", "message": "Title is required" } }
```

---

## GET /api/todos

List current user's non-deleted todos.

**Query:** `page`, `limit`, `search`, `filter`, `sort`, `order` — see technical-documentation.

| HTTP | code | Frontend scenario |
|------|------|-------------------|
| 200 | `TODO_LIST_FETCHED` | Render list |
| 401 | `UNAUTHORIZED` | Redirect `/login` |
| 500 | `INTERNAL_ERROR` | Error Alert |

**data shape:**

```json
{
  "items": [{ "id", "title", "description", "completed", "dueAt", "createdAt", "updatedAt" }],
  "pagination": { "page", "limit", "total", "totalPages" }
}
```

---

## POST /api/todos

Create todo for current user.

**Body:** `{ "title": string, "description"?: string, "dueAt"?: string (ISO) }`

| HTTP | code | Frontend scenario |
|------|------|-------------------|
| 201 | `TODO_CREATED` | Redirect `/todos/:id` |
| 400 | `VALIDATION_FAILED` | Inline field errors + error Alert |
| 401 | `UNAUTHORIZED` | Redirect `/login` |

---

## GET /api/todos/:id

Detail one todo.

| HTTP | code | Frontend scenario |
|------|------|-------------------|
| 200 | `TODO_FETCHED` | Render detail |
| 401 | `UNAUTHORIZED` | Redirect `/login` |
| 404 | `TODO_NOT_FOUND` | Error Alert + redirect `/todos` |

---

## PATCH /api/todos/:id

Update todo. Partial body allowed.

**Body:** `{ "title"?, "description"?, "completed"?, "dueAt"? }`

| HTTP | code | Frontend scenario |
|------|------|-------------------|
| 200 | `TODO_UPDATED` | Redirect `/todos/:id` or refresh detail |
| 400 | `VALIDATION_FAILED` | Inline errors + error Alert |
| 401 | `UNAUTHORIZED` | Redirect `/login` |
| 404 | `TODO_NOT_FOUND` | Error Alert + redirect `/todos` |

---

## DELETE /api/todos/:id

Soft delete — sets `deleted_at`.

| HTTP | code | Frontend scenario |
|------|------|-------------------|
| 200 | `TODO_DELETED` | Redirect `/todos` (optional success toast) |
| 401 | `UNAUTHORIZED` | Redirect `/login` |
| 404 | `TODO_NOT_FOUND` | Error Alert + redirect `/todos` |

---

## Auth endpoints (scaffold)

Document actual paths after auth scaffold install. Minimum scenarios:

| code | Frontend scenario |
|------|-------------------|
| `UNAUTHORIZED` | Redirect `/login` |
| `VALIDATION_FAILED` | Error Alert on form |
| `USER_REGISTERED` / login success | Redirect `/todos` |

## Related

- [`functional-specification-document.md`](functional-specification-document.md)
- [`user-interface-specification-document.md`](user-interface-specification-document.md)
