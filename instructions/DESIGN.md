# Design System Template

**Integration:** Gate C design layer — feeds PLAN and TASK Spec refs. Index in `project/DESIGN.md`; detail in `project/design/`. See [`RULES.md`](RULES.md) §4.

Related: [`PLAN.md`](PLAN.md), [`TASK.md`](TASK.md), [`DOCUMENT.md`](DOCUMENT.md), [`CODE.md`](CODE.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`HISTORY.md`](HISTORY.md), [`../AGENTS.md`](../AGENTS.md).

General guide for defining a project design system. **Read-only template** — the **index** lives in [`project/DESIGN.md`](project/DESIGN.md); **detailed specs** live in [`project/design/`](project/design/).

**Brownfield:** document existing UI in `project/DESIGN.md` + `project/design/` before imposing new patterns. **Greenfield:** create design files at clarify per [`GREENFIELD.md`](GREENFIELD.md) before UI code.

## 0. Production-grade UI (hard default)

Per [`RULES.md`](RULES.md) §5 — UI work targets **production quality**, not wireframes or MVP shells.

| Rule | Detail |
|------|--------|
| **Finished screens** | Ship polished UI for in-scope screens — not gray boxes, lorem ipsum placeholders, or "style later" |
| **Required states** | Loading, error, empty, and success feedback for every async flow |
| **Accessibility** | Focus visible, keyboard usable, touch targets per §10 table |
| **CRUD** | Full index/create/edit/detail/delete flows with confirmation modals — per [`CODE.md`](CODE.md) section 11 |
| **Polish** | Consistent spacing, hover/focus, responsive breakpoints — document in `project/design/` |
| **Proactive** | Sensible enhancements (accessibility, responsive edge cases) that raise quality without changing core goal |

**Don't default to MVP/wireframe UI** unless the user explicitly asks for MVP.

## 1. Folder layout

```
project/
├── DESIGN.md              ← index only (gitignored) — links + quick token cheat sheet
└── design/
    ├── color-palette-and-tokens.md
    ├── typography-system.md
    ├── spacing-layout-and-grid.md
    ├── elevation-and-shadow-system.md
    ├── component-library-and-theming.md
    ├── buttons-and-actions.md
    ├── forms-and-inputs.md
    ├── modals-and-dialogs.md
    ├── navigation-and-shell.md
    ├── tables-lists-and-pagination.md
    ├── feedback-states-and-alerts.md
    ├── responsive-breakpoints.md
    ├── accessibility-guidelines.md
    └── screens/
        └── {screen-slug}.md
```

| When | Required |
|------|----------|
| Greenfield + web UI | All root-level `project/design/*.md` files above; add `screens/{slug}.md` per major screen |
| Brownfield UI change | Read existing; update only touched design files |
| API-only / no UI | `project/design/` N/A — note in `project/DESIGN.md` |

Each file must include: token values, states (default/hover/focus/disabled/error), mobile + desktop notes, and component library mapping.

**Hard gate:** No UI application code until required `project/design/` files exist — per AGENTS §1.5 Gate C.

## 2. project/DESIGN.md (index only)

Agents create locally. Keep it short:

- One-paragraph design philosophy
- Component library choice + version
- Link table to every file in `project/design/`
- Optional quick hex/token cheat sheet

All depth belongs in `project/design/*.md` — not in the index file.

## 3. Visual Theme & Atmosphere

Define in `project/DESIGN.md` (summary) and `project/design/color-palette-and-tokens.md` (detail):

- Overall mood (dark/light, professional/casual, dense/spacious)
- Design philosophy in one sentence (e.g. "content-first darkness")
- Primary functional accent color role
- Secondary/premium accent color role (if any)
- Key geometric patterns (pill buttons, rounded cards, etc.)

## 4. Color Palette & Roles

Document in `project/design/color-palette-and-tokens.md`:

| Group | Examples |
|-------|----------|
| Primary brand | Main accent, hover, muted variants |
| Backgrounds | Base, surface, elevated, interactive |
| Text | Primary, muted, subtle |
| Semantic | Error, warning, success, info |
| Borders | Default, muted, accent variants |
| Shadows | Heavy, medium, inset |

Use CSS custom property names (e.g. `--bg-base`, `--accent-primary`) consistently.

## 5. Typography Rules

Define in `project/design/typography-system.md`:

- Font families (title, body, mono if needed)
- Type scale table: role, size, weight, line-height, letter-spacing
- Principles: hierarchy approach, button label casing, compact vs relaxed

## 6. Component Stylings

Document in `project/design/buttons-and-actions.md`, `forms-and-inputs.md`, `modals-and-dialogs.md`, `navigation-and-shell.md`, `tables-lists-and-pagination.md`, and `feedback-states-and-alerts.md`:

- Buttons (primary, secondary, outlined, icon)
- Cards and containers
- Inputs and search/command bars
- Navigation patterns
- Badges and status indicators
- **Confirmation modal** — destructive actions (delete); document in `project/design/modals-and-dialogs.md`
- **Index/list page** — search bar, filter controls, sortable table headers, pagination footer (per [`CODE.md`](CODE.md) section 11)
- **Form pages** — create/edit layout, validation error placement, submit/cancel actions

### Component library first (web / frontend apps)

**Greenfield or new UI work:** never hand-roll solved UI primitives. Before creating custom `Button`, `Modal`, `Dialog`, `Table`, etc., search for a popular component library that fits the stack.

**Brownfield:** prefer the library already in the codebase; document it in `project/DESIGN.md`.

#### Workflow

1. Read stack from [`project/INFRASTRUCTURE.md`](project/INFRASTRUCTURE.md) and any library already chosen in [`project/DESIGN.md`](project/DESIGN.md)
2. **Search** npm, GitHub, and framework docs — prefer libraries with high stars/downloads and recent releases
3. **Evaluate** using criteria below
4. **Install** in the frontend app path per `project/INFRASTRUCTURE.md` and [`CODE.md`](CODE.md) section 10 (install before import)
5. **Theme** components with project tokens from `project/DESIGN.md` — customize, don't reimplement
6. **Document** the library choice in `project/DESIGN.md` and `project/histories/` when first adopted

#### Evaluation criteria

| Criterion | Guidance |
|-----------|----------|
| Popularity | High npm weekly downloads and/or GitHub stars |
| Maintenance | Recent releases, active issues/PRs |
| Stack fit | React/Next.js/Vue/etc. per project |
| Mobile-first | Works on small viewports; touch-friendly (§10) |
| Accessibility | Keyboard focus, ARIA patterns built-in |
| Theming | Supports design tokens / CSS variables / Tailwind |

#### Illustrative directions (search fresh each time)

| Need | Typical direction |
|------|-----------------|
| React + Tailwind | shadcn/ui (Radix primitives), Headless UI |
| Full component suite | MUI, Chakra UI, Mantine |
| Headless primitives only | Radix UI, React Aria |
| Icons | lucide-react, react-icons (per [`CODE.md`](CODE.md)) |

#### When custom components are allowed

- No suitable library after documented search — note why in `project/DESIGN.md` or history
- Thin wrappers around installed library components (preferred)
- Project-specific composite layouts built **from** library primitives
- Brand-new pattern no generic library covers

#### Relationship to project/design/

`project/DESIGN.md` index must link to all design files. `project/design/component-library-and-theming.md` must record:

- Chosen component library (or headless + styling approach)
- How project tokens map to library theme variables
- Which shared UI components live in the frontend app (path per `project/INFRASTRUCTURE.md`)

Include: background, text color, radius, padding, hover/focus states, and usage notes.

## 7. Layout Principles

Document in `project/design/spacing-layout-and-grid.md`:

- **Mobile-first (web apps):** default styles target the smallest viewport; use `min-width` media queries to add tablet/desktop layout — never desktop-only layouts that break on mobile
- Spacing system (base unit and scale)
- Grid and container structure
- Whitespace philosophy
- Border radius scale

## 8. Depth & Elevation

Document in `project/design/elevation-and-shadow-system.md`:

Elevation table: base, surface, elevated, dialog, inset borders.

Shadow philosophy: opacity, blur, and when to use each level.

## 9. Do's and Don'ts

Project-specific do's and don'ts belong in `project/design/` files and `project/DESIGN.md` index. General guidance:

- Do define accent color roles clearly (functional vs decorative)
- Do keep semantic colors separate from brand accents
- Do use a styled confirmation modal for delete actions — not browser dialogs
- Do design and build frontend apps **mobile-first** when web UI is in scope; ensure pages work on phone and desktop
- Do use a popular component library for buttons, modals, tables, forms, and navigation before hand-rolling
- Do install UI packages in the frontend app path (per `project/INFRASTRUCTURE.md`) before importing (see [`CODE.md`](CODE.md) section 10)
- Don't add ad-hoc colors outside the defined palette
- Don't skip hover/focus states on interactive elements
- Don't use browser `window.confirm` or `window.alert` for delete or API feedback
- Don't ship desktop-only layouts, fixed widths that overflow mobile, or hover-only interactions with no touch equivalent
- Don't rebuild accessible modal/table/select primitives when a maintained library exists
- Don't mix multiple full component suites without documenting why in project
- Don't ship unstyled or single-state pages for in-scope features
- Don't defer mobile layout or error states to a later pass
- Don't use MVP/wireframe UI unless user explicitly asks for MVP

## 10. Responsive Behavior

**Greenfield / new UI work:** frontend apps are **mobile-first** — design and implement for small screens first, then enhance for tablet and desktop. **Brownfield:** document existing responsive behavior in `project/DESIGN.md` before changing breakpoints.

Document in `project/design/responsive-breakpoints.md`:

| Item | What to define |
|------|----------------|
| Breakpoint table | Mobile (default), tablet, desktop — min-width values |
| Layout strategy | Single column default; multi-column only at larger breakpoints |
| Navigation | Mobile: bottom nav, hamburger, or collapsible drawer; desktop: sidebar or top nav |
| Touch targets | Minimum tap size on mobile (e.g. 44px) |
| Tables / CRUD index | Horizontal scroll, stacked cards, or column hiding on small screens |

**Implementation guidance (general):**

- Write base CSS/Tailwind for mobile; add `sm:` / `md:` / `lg:` (or `@media (min-width: ...)`) for larger screens
- Test layout at mobile width before considering desktop polish
- CRUD index pages (per [`CODE.md`](CODE.md) section 11) must remain usable on mobile — filters/search may collapse into a drawer or accordion

## 11. Agent Prompt Guide

`project/DESIGN.md` index should include:

- Quick color reference (hex values)
- Example component prompts agents can copy
- Iteration guide (build order: base → surface → accent → component library → themed components)

## Agent Checklist

Before UI work:

1. Read this template for structure
2. Read [`project/DESIGN.md`](project/DESIGN.md) index and **all** required files in [`project/design/`](project/design/) (**brownfield:** document existing UI first if missing)
3. Use hex/CSS vars from `project/design/` — not invented colors
4. CRUD index pages include filter, search, sort, pagination per project spec; delete uses confirmation modal
5. Web UI built mobile-first with breakpoints in `project/design/responsive-breakpoints.md`?
6. UI primitives sourced from a popular component library (or documented reason in `project/design/component-library-and-theming.md`)?
7. Every in-scope screen has loading, error, and empty states — not happy-path only?
8. UI is production-polished (responsive, accessible, themed) — not wireframe or MVP shell?
9. `project/design/accessibility-guidelines.md` applied for keyboard, focus, and touch targets?
