# Technical Documentation

- **Feature:** Todo Management
- **Last updated:** 2026-06-18
- **Status:** active

## Summary

Data model, ownership rules, and implementation notes for the todo feature. UUID PK and soft delete per [`CODE.MD`](../../../CODE.MD) section 11.

## Data model

### User (auth scaffold)

Provided by auth scaffold. Minimum fields for reference:

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | PK |
| `email` | string | unique |
| `password_hash` | string | never exposed in API |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

### Todo

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | PK — `@default(uuid())` |
| `user_id` | UUID | FK → User; indexed |
| `title` | string | required, max 255 |
| `description` | text | nullable |
| `completed` | boolean | default `false` |
| `due_at` | timestamp | nullable |
| `deleted_at` | timestamp | nullable — soft delete |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

### Prisma schema (reference)

```prisma
model Todo {
  id          String    @id @default(uuid())
  userId      String    @map("user_id")
  title       String    @db.VarChar(255)
  description String?
  completed   Boolean   @default(false)
  dueAt       DateTime? @map("due_at")
  deletedAt   DateTime? @map("deleted_at")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  user        User      @relation(fields: [userId], references: [id])

  @@index([userId])
  @@map("todos")
}
```

## Ownership rules

- All list/detail/update/delete queries filter `user_id = authenticated user` AND `deleted_at IS NULL`
- Cross-user access returns `404` with `TODO_NOT_FOUND` (do not leak existence)

## Index API query params

| Param | Default | Values |
|-------|---------|--------|
| `page` | `1` | positive integer |
| `limit` | `20` | 1–100 |
| `search` | — | substring match on title |
| `filter` | `all` | `all` \| `active` \| `completed` |
| `sort` | `created_at` | `created_at` \| `due_at` \| `title` |
| `order` | `desc` | `asc` \| `desc` |

## Seeds (dev)

`prisma db seed` creates:

- Demo user: `demo@example.com` / `password123` (document in root README)
- 3–5 sample todos for demo user (mix of completed/active, one with due date)

## Code paths (fill on bootstrap)

| Layer | Path |
|-------|------|
| Prisma schema | `platforms/api/prisma/schema.prisma` |
| Todo module | `platforms/api/src/todos/` |
| Web pages | `platforms/web/src/app/todos/` |
| API client | `platforms/web/src/lib/api.ts` |

## Related

- [`api-specification-document.md`](api-specification-document.md)
- `platforms/api/prisma/` — migrations and seeds
