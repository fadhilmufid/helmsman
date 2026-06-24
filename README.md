# Helmsman 🧭

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/fadhilmufid/helmsman)](https://github.com/fadhilmufid/helmsman/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Helmsman** is a playbook for AI coding assistants. Drop it into any software project and your agent gets clear instructions: plan before coding, follow shared rules, write things down, and check work before calling it done.

The name comes from the person who steers a ship. Here, Helmsman keeps your agent pointed in the right direction.

## What is in this repo?

| Path | In plain terms | Technical detail |
|------|----------------|------------------|
| [`helmsman-agent/`](helmsman-agent/) | The instruction pack you add to your own app | Agent guidance (`helmsman-agent.md`, `instructions/`, `project/` workspace). Place at `{root}/helmsman-agent/`. |
| [`helmsman-website/`](helmsman-website/) | The public website, and the **tester app** when you try Helmsman in this repo | Next.js landing page (App Router, TypeScript, Tailwind CSS v4) |

## Use in your project 🚀

### 1. Clone the repository 📦

```bash
git clone https://github.com/fadhilmufid/helmsman.git
```

Copy the **`helmsman-agent/`** folder from the clone into your app repository root (`{root}/helmsman-agent/`).

### 2. Create or update root `AGENTS.md` 📌

At **`{root}/AGENTS.md`** (your app repository root, not inside `helmsman-agent/`). This is a short pointer file that tells your AI where the full playbook lives.

- **No existing `AGENTS.md`:** copy from [`helmsman-agent/templates/root-agents.md`](helmsman-agent/templates/root-agents.md) inside the pack (or [`AGENTS.md`](AGENTS.md) from a full monorepo clone).
- **Already have `AGENTS.md`:** merge the **Helmsman** sections from that template into your existing file; keep your other rules.

Template sections: What is Helmsman, How to use Helmsman, Do not.

### 3. Point your agent at Helmsman 🤖

Ensure your agent tool loads **`{root}/AGENTS.md`** (required when `helmsman-agent/` is installed), and that agents follow **[`helmsman-agent/helmsman-agent.md`](helmsman-agent/helmsman-agent.md)** for the full workflow (gates A–F, plans, tasks, code rules).

**Greenfield** (new app) vs **brownfield** (existing code) is chosen inside the pack:

- New app: [`helmsman-agent/instructions/greenfield.md`](helmsman-agent/instructions/greenfield.md)
- Existing repo: [`helmsman-agent/instructions/brownfield.md`](helmsman-agent/instructions/brownfield.md)

More detail: [`helmsman-agent/readme.md`](helmsman-agent/readme.md).

### 4. Keep the pack in its folder 📂

Leave instructions in `helmsman-agent/instructions/` and project notes in `helmsman-agent/project/`. Do not move or flatten the pack to your repo root.

## Try it in this repo 🧪

Want to test Helmsman before adding it to your own project? **This monorepo is a ready-made sandbox.**

- [`helmsman-agent/`](helmsman-agent/) and root [`AGENTS.md`](AGENTS.md) are already here. No copying required.
- Use [`helmsman-website/`](helmsman-website/) as the app your agent edits (brownfield-style changes to an existing Next.js app).
- In Cursor, load the pack for rules first, then scope edits to the website folder. Example prompt:

```
Follow @helmsman-agent/ for the Helmsman workflow.
Then edit @helmsman-website/, e.g. update the hero copy on the landing page.
```

Preview changes locally:

```bash
cd helmsman-website
npm install
npm run dev      # http://localhost:3000
```

When you are ready to use Helmsman on a real project, follow **Use in your project** above (clone the repo and copy the `helmsman-agent/` folder into your app).

## helmsman-agent/ · the instruction pack 📚

**In plain terms:** a structured set of Markdown files that teach coding agents the same habits on every project: plan, document, follow one rulebook, and verify before finishing.

**How agents use it:** start at [`helmsman-agent/helmsman-agent.md`](helmsman-agent/helmsman-agent.md), then [`helmsman-agent/instructions/rules.md`](helmsman-agent/instructions/rules.md).

**Brownfield first use:** if `helmsman-agent/project/` is empty in an existing app, agents scan the repo and build `project/` knowledge from your code before other work. See [`helmsman-agent/instructions/brownfield.md`](helmsman-agent/instructions/brownfield.md) §0.1.

## helmsman-website/ · the landing page 🌐

The friendly overview site for visitors who want to understand Helmsman without reading the full pack.

```bash
cd helmsman-website
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Developing this repository 🛠️

This GitHub repo holds the instruction pack and landing page. Treat them separately.

### `helmsman-agent/` (instruction pack)

- Documentation only: Markdown plus `license`. Nothing to install, build, run, or unit-test.
- Sanity check is internal Markdown link validity. Links into `helmsman-agent/project/` (e.g.
  `infrastructure.md`, `design.md`, `project/design/`, `project/documents/`) are **expected to be
  missing** in a fresh clone. Those files are gitignored; agents generate them at runtime.

### `helmsman-website/` (Next.js landing page)

- Stack: Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. Package manager: npm.
- All commands run **inside `helmsman-website/`**:
  `npm run dev` (port 3000), `npm run build`, `npm run start`, `npm run lint`.
- `npm install` for the site is handled by the startup update script; if you add dependencies,
  re-run `npm install` in `helmsman-website/`.
- Fonts are loaded via `next/font/google` at build time, so the first dev build needs network
  access; subsequent builds are cached.

## Contributing 🤝

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to report issues and submit pull requests.

## License

MIT. See [LICENSE](LICENSE).
