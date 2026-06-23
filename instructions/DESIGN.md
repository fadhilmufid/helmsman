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
- **Visual theme** — user preference, or pack default neutral grayscale (light) per §3
- **Responsive strategy** — mobile-first / desktop-first / balanced + one-line rationale
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

**If the user specifies nothing about theme or colors, use the pack default below and record in `project/DESIGN.md`.**

### Default visual theme (when user specifies nothing)

When the user is silent on design or says *"use your recommendations"*, apply a **clean, simple, light-mode neutral grayscale** theme — the aesthetic shared by Notion, Vercel, Cursor, and OpenAI: content-first, minimal chrome, subtle borders, near-monochrome UI with color reserved for semantics and primary actions.

**Decision order:** (1) user stated theme/colors → (2) existing brownfield UI → (3) **pack default below** — do not ask a clarify question for theme when the user is silent or delegates.

Record in `project/DESIGN.md`:

```markdown
**Visual theme:** Default neutral grayscale (light) — per helmsman DESIGN.md §3 default; user did not specify custom branding.
```

#### Aesthetic principles

| Principle | Detail |
|-----------|--------|
| Mood | Professional, calm, content-first — not playful or high-saturation |
| Palette | Neutral grays only for chrome; near-black primary text; white/off-white surfaces |
| Accent | Single near-black (or very dark gray) for primary buttons/links — not a brand color |
| Color use | Semantic only for error/warning/success/info states |
| Density | Comfortable spacing; not cramped admin, not oversized marketing |
| Chrome | Subtle 1px borders over heavy shadows; light elevation on modals/dropdowns |
| Radius | Moderate — ~6–8px cards/inputs, ~4px badges (shadcn-like) |
| Typography | Inter (preferred) or `system-ui` stack; clear hierarchy, no decorative fonts |

#### Starter token table

Copy/adapt into `project/design/color-palette-and-tokens.md` when the user is silent:

| Token | Light default | Role |
|-------|---------------|------|
| `--bg-base` | `#ffffff` | Page background |
| `--bg-surface` | `#fafafa` | Cards, panels |
| `--bg-muted` | `#f4f4f5` | Hover rows, secondary areas |
| `--border-default` | `#e4e4e7` | Dividers, input borders |
| `--border-muted` | `#f4f4f5` | Subtle separators |
| `--text-primary` | `#18181b` | Headings, body |
| `--text-muted` | `#71717a` | Secondary labels |
| `--text-subtle` | `#a1a1aa` | Placeholders, hints |
| `--accent-primary` | `#18181b` | Primary button bg, active nav |
| `--accent-primary-hover` | `#27272a` | Primary hover |
| `--accent-on-primary` | `#fafafa` | Text on primary button |
| Semantic | Standard accessible red/amber/green/blue | Errors, warnings, success, info only |

**Typography default:** Inter 14px body / 600 weight headings; mono for code (`ui-monospace` or Geist Mono if stack provides it) — document in `typography-system.md`.

**Elevation default:** prefer borders over shadows; use `0 1px 3px rgba(0,0,0,0.08)` on dropdowns/modals only — document in `elevation-and-shadow-system.md`.

**Component library default:** when frontend is **React + Tailwind** and the user did not pick a library, **Recommended:** shadcn/ui with default neutral theme (see §6).

**Still required:** create full `project/design/` files at Gate C — default tokens are starting values, not a skip for design docs. User brand colors, dark mode, or custom themes override this block. **Brownfield:** document existing theme first; do not impose default on legacy UI unless the user asks.

## 4. Color Palette & Roles

Document in `project/design/color-palette-and-tokens.md`. When applying the pack default from §3, populate groups from the starter token table there.

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

Define in `project/design/typography-system.md`. **Default font:** Inter or `system-ui` per §3 when the user specifies nothing.

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
| Responsive / viewport fit | Works across chosen strategy viewports; touch-friendly (§10) |
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

- **Responsive strategy (web apps):** follow the strategy recorded in `project/DESIGN.md` (mobile-first, desktop-first, or balanced) — see §10; never desktop-only layouts that break on mobile
- **Spacing default (when user silent):** 4px base unit; scale 4 / 8 / 12 / 16 / 24 / 32 / 48
- Grid and container structure
- Whitespace philosophy
- Border radius scale

## 8. Depth & Elevation

Document in `project/design/elevation-and-shadow-system.md`:

Elevation table: base, surface, elevated, dialog, inset borders.

Shadow philosophy: opacity, blur, and when to use each level.

## 9. Do's and Don'ts

Project-specific do's and don'ts belong in `project/design/` files and `project/DESIGN.md` index. General guidance:

- Do apply pack default neutral grayscale (light) when the user did not specify theme — per §3
- Do define accent color roles clearly (functional vs decorative)
- Do keep semantic colors separate from brand accents
- Do use a styled confirmation modal for delete actions — not browser dialogs
- Do record and follow the chosen responsive strategy in `project/DESIGN.md` and `project/design/responsive-breakpoints.md`; ensure pages work on phone and desktop
- Do use a popular component library for buttons, modals, tables, forms, and navigation before hand-rolling
- Do install UI packages in the frontend app path (per `project/INFRASTRUCTURE.md`) before importing (see [`CODE.md`](CODE.md) section 10)
- Don't add ad-hoc colors outside the defined palette
- Don't skip hover/focus states on interactive elements
- Don't use browser `window.confirm` or `window.alert` for delete or API feedback
- Don't ship desktop-only layouts, fixed widths that overflow mobile, or hover-only interactions with no touch equivalent
- Don't rebuild accessible modal/table/select primitives when a maintained library exists
- Don't mix multiple full component suites without documenting why in project
- Don't ship unstyled or single-state pages for in-scope features
- Don't defer responsive layout or error states to a later pass
- Don't use MVP/wireframe UI unless user explicitly asks for MVP

## 10. Responsive Behavior

**Choose and record a responsive strategy** during Gate B clarify / Gate C design — the agent picks the best fit; user preference overrides. **Brownfield:** document existing responsive behavior in `project/DESIGN.md` before changing breakpoints.

### Strategy selection

| Strategy | Agent recommends when | CSS approach |
|----------|----------------------|--------------|
| **mobile-first** | Consumer/field apps, PWA, phone-primary users | Base = smallest viewport; `min-width` for tablet/desktop |
| **desktop-first** | Admin dashboards, data-dense B2B, internal tools, wide tables | Base = desktop layout; simplify/stack/hide columns for small screens |
| **balanced** | General SaaS, marketing + app, unclear audience | Co-design primary breakpoints; neither viewport is an afterthought |

**Decision order:** (1) user stated preference → (2) `project/OVERVIEW.md` audience/use context → (3) app type from feature docs → (4) brownfield existing patterns → (5) if still ambiguous, **ask once** in clarify batch.

**Record in:** `project/DESIGN.md` (one line: chosen strategy + rationale) and `project/design/responsive-breakpoints.md` (full breakpoint table + layout notes).

**Hard floor:** Every web UI must remain **usable on phone and desktop** — no desktop-only layouts that break on mobile, no hover-only interactions without touch equivalents. Strategy affects design priority and CSS approach, not whether mobile works.

Document in `project/design/responsive-breakpoints.md`:

| Item | What to define |
|------|----------------|
| Chosen strategy | mobile-first / desktop-first / balanced + rationale |
| Breakpoint table | Mobile, tablet, desktop — min-width (or max-width) values per strategy |
| Layout strategy | Per strategy — e.g. single column default (mobile-first), stacked cards on small (desktop-first), or co-designed columns (balanced) |
| Navigation | Mobile: bottom nav, hamburger, or collapsible drawer; desktop: sidebar or top nav |
| Touch targets | Minimum tap size on mobile (e.g. 44px) |
| Tables / CRUD index | Horizontal scroll, stacked cards, or column hiding on small screens |

**Implementation guidance (per strategy):**

- **mobile-first:** base CSS/Tailwind for mobile; add `sm:` / `md:` / `lg:` (or `@media (min-width: ...)`) for larger screens
- **desktop-first:** base styles for desktop layout; use `max-width` queries or responsive utilities to stack/simplify for tablet and mobile
- **balanced:** define and test both primary breakpoints during design; avoid treating either viewport as a secondary pass
- Test layout at all documented breakpoints before marking UI complete
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
5. Responsive strategy recorded in `project/DESIGN.md` and `project/design/responsive-breakpoints.md`?
6. If user silent on theme, default neutral grayscale (light) applied and recorded in `project/DESIGN.md`?
7. UI primitives sourced from a popular component library (or documented reason in `project/design/component-library-and-theming.md`)?
8. Every in-scope screen has loading, error, and empty states — not happy-path only?
9. UI is production-polished (responsive, accessible, themed) — not wireframe or MVP shell?
10. `project/design/accessibility-guidelines.md` applied for keyboard, focus, and touch targets?
