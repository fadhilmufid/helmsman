# Design System Template

General guide for defining a project design system. **Read-only template** — actual tokens and components for this project live in [`PROJECT/DESIGN.MD`](PROJECT/DESIGN.MD).

## 1. Visual Theme & Atmosphere

Define in `PROJECT/DESIGN.MD`:

- Overall mood (dark/light, professional/casual, dense/spacious)
- Design philosophy in one sentence (e.g. "content-first darkness")
- Primary functional accent color role
- Secondary/premium accent color role (if any)
- Key geometric patterns (pill buttons, rounded cards, etc.)

## 2. Color Palette & Roles

Document these token groups in `PROJECT/DESIGN.MD`:

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

Define in `PROJECT/DESIGN.MD`:

- Font families (title, body, mono if needed)
- Type scale table: role, size, weight, line-height, letter-spacing
- Principles: hierarchy approach, button label casing, compact vs relaxed

## 4. Component Stylings

Document each component variant in `PROJECT/DESIGN.MD`:

- Buttons (primary, secondary, outlined, icon)
- Cards and containers
- Inputs and search/command bars
- Navigation patterns
- Badges and status indicators
- **Confirmation modal** — destructive actions (delete); title, body, cancel/confirm buttons; uses dialog elevation tokens from section 6
- **Index/list page** — search bar, filter controls, sortable table headers, pagination footer (per [`CODE.MD`](CODE.MD) section 11)
- **Form pages** — create/edit layout, validation error placement, submit/cancel actions

### Component library first (platforms/web)

**Never hand-roll solved UI primitives.** Before creating custom `Button`, `Modal`, `Dialog`, `Table`, `Select`, `Dropdown`, `Toast`, etc., search for a popular component library that fits the stack.

#### Workflow

1. Read stack from [`PROJECT/AGENTS.MD`](PROJECT/AGENTS.MD) and any library already chosen in [`PROJECT/DESIGN.MD`](PROJECT/DESIGN.MD)
2. **Search** npm, GitHub, and framework docs — prefer libraries with high stars/downloads and recent releases
3. **Evaluate** using criteria below
4. **Install** in `platforms/web` per [`CODE.MD`](CODE.MD) section 10 (install before import)
5. **Theme** components with project tokens from `PROJECT/DESIGN.MD` — customize, don't reimplement
6. **Document** the library choice in `PROJECT/DESIGN.MD` and `PROJECT/HISTORY/` when first adopted

#### Evaluation criteria

| Criterion | Guidance |
|-----------|----------|
| Popularity | High npm weekly downloads and/or GitHub stars |
| Maintenance | Recent releases, active issues/PRs |
| Stack fit | React/Next.js/Vue/etc. per PROJECT |
| Mobile-first | Works on small viewports; touch-friendly (section 8) |
| Accessibility | Keyboard focus, ARIA patterns built-in |
| Theming | Supports design tokens / CSS variables / Tailwind |

#### Illustrative directions (search fresh each time)

| Need | Typical direction |
|------|-----------------|
| React + Tailwind | shadcn/ui (Radix primitives), Headless UI |
| Full component suite | MUI, Chakra UI, Mantine |
| Headless primitives only | Radix UI, React Aria |
| Icons | lucide-react, react-icons (per [`CODE.MD`](CODE.MD)) |

#### When custom components are allowed

- No suitable library after documented search — note why in `PROJECT/DESIGN.MD` or history
- Thin wrappers around installed library components (preferred)
- Project-specific composite layouts built **from** library primitives
- Brand-new pattern no generic library covers

#### Relationship to PROJECT/DESIGN.MD

`PROJECT/DESIGN.MD` must record:

- Chosen component library (or headless + styling approach)
- How project tokens map to library theme variables
- Which shared components live in `platforms/web` (e.g. `@/components/ui/*` from shadcn)

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

Project-specific do's and don'ts belong in `PROJECT/DESIGN.MD`. General guidance:

- Do define accent color roles clearly (functional vs decorative)
- Do keep semantic colors separate from brand accents
- Do use a styled confirmation modal for delete actions — not browser dialogs
- Do design and build `platforms/web` mobile-first; ensure every page works on phone and desktop
- Do use a popular component library for buttons, modals, tables, forms, and navigation before hand-rolling
- Do install UI packages in `platforms/web` before importing (see [`CODE.MD`](CODE.MD) section 10)
- Don't add ad-hoc colors outside the defined palette
- Don't skip hover/focus states on interactive elements
- Don't use browser `window.confirm` or `window.alert` for delete or API feedback
- Don't ship desktop-only layouts, fixed widths that overflow mobile, or hover-only interactions with no touch equivalent
- Don't rebuild accessible modal/table/select primitives when a maintained library exists
- Don't mix multiple full component suites without documenting why in PROJECT

## 8. Responsive Behavior

**Hard rule:** `platforms/web` is always **mobile-first** — design and implement for small screens first, then enhance for tablet and desktop.

Document in `PROJECT/DESIGN.MD`:

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
- CRUD index pages (per [`CODE.MD`](CODE.MD) section 11) must remain usable on mobile — filters/search may collapse into a drawer or accordion

## 9. Agent Prompt Guide

`PROJECT/DESIGN.MD` should include:

- Quick color reference (hex values)
- Example component prompts agents can copy
- Iteration guide (build order: base → surface → accent → component library → themed components)

## Agent Checklist

Before UI work:

1. Read this template for structure
2. Read [`PROJECT/DESIGN.MD`](PROJECT/DESIGN.MD) for actual tokens and specs
3. Use hex/CSS vars from project file — not invented colors
4. CRUD index pages include filter, search, sort, pagination per project spec; delete uses confirmation modal
5. Web UI built mobile-first with responsive breakpoints documented in `PROJECT/DESIGN.MD`?
6. UI primitives sourced from a popular component library (or documented reason custom)?
