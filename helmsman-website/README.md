# Helmsman website

The public landing page for [Helmsman](../README.md): a Next.js app that explains what the instruction pack does and how to get started. In this monorepo it also serves as the **tester app** — see [Try it in this repo](../README.md#try-it-in-this-repo) in the root README.

## Try Helmsman here

If you cloned the full `helmsman` repo, `helmsman-agent/` is already included. In Cursor, load the pack for rules first, then scope edits to this folder:

```
Follow @helmsman-agent/ for the Helmsman workflow.
Then edit @helmsman-website/, e.g. update the hero copy on the landing page.
```

More detail: [Try it in this repo](../README.md#try-it-in-this-repo) in the root README.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.

## Development

From the repository root:

```bash
cd helmsman-website
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

For repo layout, the instruction pack, and contributing, see the [root README](../README.md).
