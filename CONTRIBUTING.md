# Contributing to Helmsman

Thank you for your interest in contributing. Helmsman is open source under the
[MIT License](LICENSE). All contributions are welcome: documentation
improvements, landing page updates, bug reports, and clarifications.

## Ways to contribute

- **Instruction pack:** improve or extend Markdown in [`helmsman-agent/`](helmsman-agent/)
  (agent rules, templates, README).
- **Landing page:** update the Next.js app in [`helmsman-website/`](helmsman-website/).
- **Bug reports:** file an issue when something is wrong or unclear.
- **Suggestions:** propose new features or workflow improvements via issues or
  pull requests.

## Report issues

Use [GitHub Issues](https://github.com/fadhilmufid/helmsman/issues) to report
bugs or ask questions.

Please include:

- **Area:** `helmsman-agent/` (instruction pack) or `helmsman-website/` (landing page).
- **What you expected** vs **what happened**.
- **Steps to reproduce** (for bugs in `helmsman-website/`, include browser and commands run).
- **Screenshots or logs** when helpful.

## Pull request workflow

1. **Fork** the repository and clone your fork.
2. **Branch** from `main` (e.g. `fix/readme-typo`, `feat/website-hero-copy`).
3. **Make focused changes.** Prefer one logical change per PR when possible.
4. **Run checks** for the area you changed (see below).
5. **Open a pull request** against `main` with:
   - A short summary of what changed and why.
   - Test notes (commands run, manual checks).

## Development checks

This repo has two independent parts. Only run checks for the area you modify.

### `helmsman-agent/` (instruction pack)

Documentation only. No install, build, or unit tests.

- Verify Markdown links in files you changed.
- Match the existing tone and structure in [`helmsman-agent/instructions/`](helmsman-agent/instructions/).
- **Note:** paths under `helmsman-agent/project/` are gitignored and expected to be
  missing in a fresh clone. Agents generate those at runtime. Do not treat
  missing `project/` files as broken links.

### `helmsman-website/` (landing page)

Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.

From the repo root:

```bash
cd helmsman-website
npm install
npm run lint
npm run build
```

For UI changes, also run `npm run dev` and verify at http://localhost:3000.

## Style notes

- **helmsman-agent/:** keep instructions precise and actionable; follow patterns in
  existing files like [`helmsman-agent/HELMSMAN-AGENT.md`](helmsman-agent/HELMSMAN-AGENT.md) and
  [`helmsman-agent/instructions/RULES.md`](helmsman-agent/instructions/RULES.md).
- **helmsman-website/:** follow existing TypeScript and Tailwind conventions in
  [`helmsman-website/src/`](helmsman-website/src/).

## License

By contributing, you agree that your contributions will be licensed under the
same [MIT License](LICENSE) as the rest of the project.
