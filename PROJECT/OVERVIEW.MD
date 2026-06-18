# Project Overview

Editable per-project config. Example values below — **confirm via clarify-before-build** per [`AGENTS.MD`](../AGENTS.MD) section 2 before building.

## Identity

| Field | Value (example) |
|-------|-----------------|
| **Project slug** (`{project}`) | `todo-app` |
| **Name** | Todo App |
| **Domain / purpose** | Personal task manager: authenticated users create, complete, edit, and soft-delete their own todos. Mobile-first web UI with Go REST API. |

## Goals

- Primary goal: Deliver authenticated full CRUD for todos with production-ready Docker deploy
- MVP scope: Register/login, todo index (search/filter/sort/pagination), create, edit, detail, delete with confirmation modal

## Feature documentation

- Reference spec: [`DOCUMENT/todo-management/`](DOCUMENT/todo-management/)
- Greenfield recommendations: [`GREENFIELD.MD`](../GREENFIELD.MD) (ask first — not auto-applied)

## Notes

- Replace example slug/name after clarify
- Do not treat this file as confirmed stack until user approves or delegates to recommendations
