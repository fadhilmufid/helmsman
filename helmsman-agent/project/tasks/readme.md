# Tasks

**Exhaustive standalone execution plans** — one detailed task file per request, derived from [`project/plans/`](../plans/). Rules: [`task.md`](../../instructions/task.md).

**Gate E** — required after Gate D plan. **No parent/child split** — add as many steps as needed in one file.

## Workflow

1. **Re-read code.md** — at task start when touching application source ([`rules.md`](../../instructions/rules.md) §8)
2. **Plan first** — `project/plans/{timestamp}_{slug}.md` per [`plan.md`](../../instructions/plan.md)
3. **Draft exhaustive task** — write **Application map** (§1.4a) first; enumerate **every** file, route, page, platform, and config change as its own step; no forbidden shorthand (§1.4); each step includes **How to do it**, **Step checklist**, and **Done when** (§1.5); follow §5.1 drafting prompt
4. **Match coverage** — `Files expected to change` table must match implementation steps 1:1
5. **Plan ref** + **Spec ref** + **Code ref** on every application-source step
6. **Execute in order** — §1.9: re-open task file each work block; run **Agent execution checklist**; complete per-step **Step checklist** before marking `[x]`
7. **E2E verify** — final phase: compose up/down + deploy image cycle (Gate F)
8. Complete — **Task completion checklist** all checked; `project/histories/` links plan + task + E2E + CODE compliance

## Principle

More steps is better. Large bootstrap tasks may have 50–200+ steps — that is expected. Never split because the list is long.

## Git

All task entries are **gitignored** except this README.
