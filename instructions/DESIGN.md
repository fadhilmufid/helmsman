# Design System Template

Related: [`README.md`](../README.md), [`AGENTS.md`](../AGENTS.md), [`GREENFIELD.md`](GREENFIELD.md), [`BROWNFIELD.md`](BROWNFIELD.md), [`CODE.md`](CODE.md), [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md), [`TASK.md`](TASK.md), [`DOCUMENT.md`](DOCUMENT.md), [`HISTORY.md`](HISTORY.md).

General guide for defining a project design system. **Read-only template** — actual tokens and components for this project live in [`project/DESIGN.md`](project/DESIGN.md).

**Brownfield:** document existing UI library and tokens in `project/DESIGN.md` before imposing new patterns. **Greenfield:** define tokens and library choice at clarify per [`GREENFIELD.md`](GREENFIELD.md).

## 0. Production-grade UI (hard default)

Per [`AGENTS.md`](../AGENTS.md) §2.5 — UI work targets **production quality**, not wireframes or MVP shells.

| Rule | Detail |
|------|--------|
| **Finished screens** | Ship polished UI for in-scope screens — not gray boxes, lorem ipsum placeholders, or "style later" |
| **Required states** | Loading, error, empty, and success feedback for every async flow |
| **Accessibility** | Focus visible, keyboard usable, touch targets per §8 table |
| **CRUD** | Full index/create/edit/detail/delete flows with confirmation modals — per [`CODE.md`](CODE.md) section 11 |
| **Polish** | Consistent spacing, hover/focus, responsive breakpoints — document in `project/DESIGN.md` |
| **Proactive** | Sensible enhancements (accessibility, responsive edge cases) that raise quality without changing core goal |

**Don't default to MVP/wireframe UI** unless the user explicitly asks for MVP.

## 1. Visual Theme & Atmosphere

Define in `project/DESIGN.md`:

- Overall mood (dark/light, professional/casual, dense/spacious)
- Design philosophy in one sentence (e.g. "content-first darkness")
- Primary functional accent color role
- Secondary/premium accent color role (if any)
- Key geometric patterns (pill buttons, rounded cards, etc.)

## 2. Color Palette & Roles

Document these token groups in `project/DESIGN.md`:

| Group | Examples |
|-------|----------|
| Primary brand | Main accent, hover, muted variants |
| Backgrounds | Base, surface, elevated, interactive |
| Text | Primary, muted, subtle |
| Semantic | Error, warning, success, info |
| Borders | Default, muted, accent variants |
| Shadows | Heavy, medium, inset |

Use CSS custom property names (e.g. `--bg-base`, `--accent-primary`) consistently.

## 3. Typography Rules

Define in `project/DESIGN.md`:

- Font families (title, body, mono if needed)
- Type scale table: role, size, weight, line-height, letter-spacing
- Principles: hierarchy approach, button label casing, compact vs relaxed

## 4. Component Stylings

Document each component variant in `project/DESIGN.md`:

- Buttons (primary, secondary, outlined, icon)
- Cards and containers
- Inputs and search/command bars
- Navigation patterns
- Badges and status indicators
- **Confirmation modal** — destructive actions (delete); title, body, cancel/confirm buttons; uses dialog elevation tokens from section 6
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
| Mobile-first | Works on small viewports; touch-friendly (section 8) |
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

#### Relationship to project/DESIGN.md

`project/DESIGN.md` must record:

- Chosen component library (or headless + styling approach)
- How project tokens map to library theme variables
- Which shared UI components live in the frontend app (path per `project/INFRASTRUCTURE.md`)

Include: background, text color, radius, padding, hover/focus states, and usage notes.

## 5. Layout Principles

- **Mobile-first (web apps):** default styles target the smallest viewport; use `min-width` media queries to add tablet/desktop layout — never desktop-only layouts that break on mobile
- Spacing system (base unit and scale)
- Grid and container structure
- Whitespace philosophy
- Border radius scale

## 6. Depth & Elevation

Elevation table: base, surface, elevated, dialog, inset borders.

Shadow philosophy: opacity, blur, and when to use each level.

## 7. Do's and Don'ts

Project-specific do's and don'ts belong in `project/DESIGN.md`. General guidance:

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

## 8. Responsive Behavior

**Greenfield / new UI work:** frontend apps are **mobile-first** — design and implement for small screens first, then enhance for tablet and desktop. **Brownfield:** document existing responsive behavior in `project/DESIGN.md` before changing breakpoints.

Document in `project/DESIGN.md`:

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

## 9. Agent Prompt Guide

`project/DESIGN.md` should include:

- Quick color reference (hex values)
- Example component prompts agents can copy
- Iteration guide (build order: base → surface → accent → component library → themed components)

## Agent Checklist

Before UI work:

1. Read this template for structure
2. Read [`project/DESIGN.md`](project/DESIGN.md) for actual tokens and specs (**brownfield:** document existing UI first if missing)
3. Use hex/CSS vars from project file — not invented colors
4. CRUD index pages include filter, search, sort, pagination per project spec; delete uses confirmation modal
5. Web UI built mobile-first with responsive breakpoints documented in `project/DESIGN.md`?
6. UI primitives sourced from a popular component library (or documented reason custom)?
7. Every in-scope screen has loading, error, and empty states — not happy-path only?
8. UI is production-polished (responsive, accessible, themed) — not wireframe or MVP shell?
