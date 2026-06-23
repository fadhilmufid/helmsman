# Helmsman

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/fadhilmufid/helmsman)](https://github.com/fadhilmufid/helmsman/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

This repository contains two things:

| Path | What it is |
|------|------------|
| [`helmsman/`](helmsman/) | The **Helmsman instruction pack** — reusable agent guidance (AGENTS.md, instructions, project workspace). Clone it into your own app as `helmsman/`. |
| [`site/`](site/) | The **landing page** — a Next.js app that explains what Helmsman is. |

## Use in your project

### 1. Clone the pack

Inside your app repo (`{root}`), folder name must be **`helmsman`**:

```bash
git clone https://github.com/fadhilmufid/helmsman.git helmsman
```

### 2. Create or update root `AGENTS.md` (required)

At **`{root}/AGENTS.md`** (your app repository root, not inside `helmsman/`). Agents will **copy or merge** from the template if this file is missing.

- **No existing `AGENTS.md`** — copy the template from [`AGENTS.md`](AGENTS.md) in this repo, or from [`helmsman/templates/root-AGENTS.md`](helmsman/templates/root-AGENTS.md) inside the clone.
- **Already have `AGENTS.md`** — merge the **Helmsman** sections from that template into your existing file; keep your other rules.

Agent-only template sections: What is Helmsman, How to use Helmsman, Do not.

### 3. Point your agent at Helmsman

Ensure your agent tool loads **`{root}/AGENTS.md`** (required when `helmsman/` is installed), and that agents follow **[`helmsman/AGENTS.md`](helmsman/AGENTS.md)** for the full workflow (gates, plans, tasks, code rules).

App layout (greenfield vs brownfield) is defined in the pack after you choose a mode — see [`helmsman/instructions/GREENFIELD.md`](helmsman/instructions/GREENFIELD.md) or [`BROWNFIELD.md`](helmsman/instructions/BROWNFIELD.md).

More detail: [`helmsman/README.md`](helmsman/README.md).

## helmsman/ — the instruction pack

A structured instruction set that gives coding agents consistent, production-grade
behavior across projects: blueprint work, build greenfield apps, understand existing
repos, document features, and write code by a single set of rules.

Agents start at [`helmsman/AGENTS.md`](helmsman/AGENTS.md), then
[`helmsman/instructions/RULES.md`](helmsman/instructions/RULES.md).

**Brownfield first use:** if `helmsman/project/` is blank in an existing app, agents scan the repo and build `project/` knowledge from code before other work — see [`helmsman/instructions/BROWNFIELD.md`](helmsman/instructions/BROWNFIELD.md) §0.1.

## site/ — the landing page

A [Next.js](https://nextjs.org) app (App Router, TypeScript, Tailwind CSS v4) that
presents Helmsman to visitors.

```bash
cd site
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Developing this repository

This GitHub repo holds the instruction pack and landing page. Treat them separately.

### `helmsman/` (instruction pack)

- Documentation only: Markdown plus `LICENSE`. Nothing to install, build, run, or unit-test.
- Sanity check is internal Markdown link validity. Links into `helmsman/project/` (e.g.
  `INFRASTRUCTURE.md`, `DESIGN.md`, `project/design/`, `project/documents/`) are **expected to be
  missing** in a fresh clone — they are gitignored, per-project files agents generate at runtime.

### `site/` (Next.js landing page)

- Stack: Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. Package manager: npm.
- All commands run **inside `site/`**:
  `npm run dev` (port 3000), `npm run build`, `npm run start`, `npm run lint`.
- `npm install` for the site is handled by the startup update script; if you add dependencies,
  re-run `npm install` in `site/`.
- Fonts are loaded via `next/font/google` at build time, so the first dev build needs network
  access; subsequent builds are cached.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to report issues and submit pull requests.

## License

MIT — see [LICENSE](LICENSE).
