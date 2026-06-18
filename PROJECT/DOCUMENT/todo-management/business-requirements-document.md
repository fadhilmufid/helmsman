# Business Requirements Document

- **Feature:** Todo Management
- **Last updated:** 2026-06-18
- **Status:** active

## Summary

Authenticated users manage personal todo items. Each user sees only their own todos. MVP delivers full CRUD with soft delete — suitable as the reference greenfield feature per [`GREENFIELD.MD`](../../../GREENFIELD.MD).

## Goals

- Users can register, log in, and log out
- Users can create, view, edit, complete, and delete their todos
- Deleted todos are soft-deleted (recoverable in DB; hidden from default lists)
- Mobile-first web UI works on phone and desktop

## Out of scope (MVP)

- Shared/collaborative todo lists
- Categories, tags, attachments
- Push notifications
- Admin panel for other users' data

## Success criteria

- New user can register, create a todo, mark complete, edit, and soft-delete on mobile viewport
- All todos scoped to authenticated user — no cross-user access
- `docker compose up` runs full stack with seeds for demo login

## Related

- [`functional-specification-document.md`](functional-specification-document.md)
- [`technical-documentation.md`](technical-documentation.md)
- [`api-specification-document.md`](api-specification-document.md)
- [`user-interface-specification-document.md`](user-interface-specification-document.md)
