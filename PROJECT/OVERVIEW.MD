# Project Overview

Editable per-project config. Defaults below match [`GREENFIELD.MD`](../GREENFIELD.MD) — customize when starting a real project.

## Identity

| Field | Value |
|-------|-------|
| **Project slug** (`{project}`) | `todo-app` |
| **Name** | Todo App |
| **Domain / purpose** | Personal task manager: authenticated users create, complete, edit, and soft-delete their own todos. Mobile-first web UI with REST API backend. |

## Goals

- Primary goal: Deliver authenticated full CRUD for todos with production-ready Docker deploy
- MVP scope: Register/login, todo index (search/filter/sort/pagination), create, edit, detail, delete with confirmation modal

## Feature documentation

- Reference spec: [`DOCUMENT/todo-management/`](DOCUMENT/todo-management/) — adapt when building todo features
- Greenfield playbook: [`GREENFIELD.MD`](../GREENFIELD.MD)

## Notes

- Update after clarify-before-build decisions per [`AGENTS.MD`](../AGENTS.MD) section 2
- Replace placeholder slug/name when copying template to a different project
