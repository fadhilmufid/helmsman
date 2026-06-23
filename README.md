# Helmsman

This repository contains two things:

| Path | What it is |
|------|------------|
| [`helmsman/`](helmsman/) | The **Helmsman instruction pack** — reusable agent guidance (AGENTS.md, instructions, project workspace). Clone it into your own app as `helmsman/`. |
| [`site/`](site/) | The **landing page** — a Next.js app that explains what Helmsman is. |

## helmsman/ — the instruction pack

A structured instruction set that gives coding agents consistent, production-grade
behavior across projects: blueprint work, build greenfield apps, understand existing
repos, document features, and write code by a single set of rules.

Start at [`helmsman/AGENTS.md`](helmsman/AGENTS.md), then
[`helmsman/instructions/RULES.md`](helmsman/instructions/RULES.md). Full usage is in
[`helmsman/README.md`](helmsman/README.md).

To use it in your own project:

```bash
git clone <this-repo-url> helmsman
```

Then point your agent at `helmsman/AGENTS.md`.

## site/ — the landing page

A [Next.js](https://nextjs.org) app (App Router, TypeScript, Tailwind CSS v4) that
presents Helmsman to visitors.

```bash
cd site
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## License

MIT — see [LICENSE](LICENSE).
