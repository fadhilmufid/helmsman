import type { ReactNode } from "react";

const GITHUB_URL = "https://github.com/fadhilmufid/helmsman";

const ROOT_AGENTS_SAMPLE = `# Agent instructions

## What is Helmsman
Helmsman is a reusable instruction pack at helmsman/ …
This file is a thin pointer. Full workflow: helmsman/AGENTS.md

## How to use Helmsman
1. Read helmsman/AGENTS.md in full — HARD STOP, gates A–F
2. Read helmsman/instructions/RULES.md — integrated rulebook
3. Run Gate A — scan helmsman/project/
…

## Do not
- Copy helmsman/instructions/, helmsman/project/, or full helmsman/AGENTS.md to root
- Flatten or move helmsman/ — use it in place
…`;

const features: { title: string; body: string }[] = [
  {
    title: "Blueprint before code",
    body: "Plans then exhaustive task files — Application map first, then file-level steps with How to do it and a checklist before a single line is written.",
  },
  {
    title: "Build greenfield apps",
    body: "Scaffold platforms like postgresql, minio, web and api, then verify everything end-to-end with Docker.",
  },
  {
    title: "Understand existing repos",
    body: "On first use, mandatory onboarding scans the codebase and populates project/ knowledge from your code before any feature work.",
  },
  {
    title: "Document everything",
    body: "Features, changes and project config live in a structured project/ workspace the agent maintains.",
  },
  {
    title: "Write code by the rules",
    body: "A single CODE.md governs every language; agents re-read it at every coding task for consistent quality.",
  },
  {
    title: "Re-enter every session",
    body: "A hard-stop re-entry gate makes agents re-read the rules at the start of every session — even after bootstrap.",
  },
];

const gates: { id: string; name: string; blocks: string }[] = [
  { id: "A", name: "Read-first", blocks: "platforms/, deploy/, app source" },
  { id: "B", name: "Clarify & record", blocks: "implementation" },
  { id: "C", name: "Documents & design", blocks: "scaffold, platforms/, deploy/" },
  { id: "D", name: "Blueprint plan", blocks: "task, implementation" },
  { id: "E", name: "Task before code", blocks: "application edits" },
  { id: "F", name: "Quality + E2E", blocks: "marking complete" },
];

const steps: { n: string; title: string; body: ReactNode }[] = [
  {
    n: "1",
    title: "Clone it into your app",
    body: (
      <>
        Inside your repo run{" "}
        <code className="font-mono text-zinc-800">
          git clone &lt;repo-url&gt; helmsman
        </code>{" "}
        — the folder must be named <span className="font-medium">helmsman</span>.
      </>
    ),
  },
  {
    n: "2",
    title: "Add root AGENTS.md",
    body: (
      <>
        Add an <span className="font-medium">agent-only</span> file at your repo
        root — What is Helmsman, How to use Helmsman, Do not. Copy from{" "}
        <code className="font-mono text-zinc-800">AGENTS.md</code> or{" "}
        <code className="font-mono text-zinc-800">
          helmsman/templates/root-AGENTS.md
        </code>
        . If you already have a root file, merge the Helmsman sections.
      </>
    ),
  },
  {
    n: "3",
    title: "Follow the pack entry",
    body: (
      <>
        Agents read{" "}
        <code className="font-mono text-zinc-800">helmsman/AGENTS.md</code> and{" "}
        <code className="font-mono text-zinc-800">
          helmsman/instructions/RULES.md
        </code>
        , then follow gates A–F before implementation.
      </>
    ),
  },
  {
    n: "4",
    title: "Use it in place",
    body: (
      <>
        Read <code className="font-mono text-zinc-800">helmsman/instructions/</code>
        ; write plans, tasks, and config to{" "}
        <code className="font-mono text-zinc-800">helmsman/project/</code>. Do not
        hoist the pack to the repo root.
      </>
    ),
  },
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-zinc-200 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold text-zinc-900">
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-md bg-zinc-900 font-mono text-sm text-zinc-50"
            >
              H
            </span>
            Helmsman
          </a>
          <nav className="hidden items-center gap-7 text-sm text-zinc-600 sm:flex">
            <a className="transition hover:text-zinc-900" href="#features">
              Features
            </a>
            <a className="transition hover:text-zinc-900" href="#modes">
              Modes
            </a>
            <a className="transition hover:text-zinc-900" href="#gates">
              Gates
            </a>
            <a className="transition hover:text-zinc-900" href="#examples">
              Examples
            </a>
            <a className="transition hover:text-zinc-900" href="#start">
              Get started
            </a>
          </nav>
          <a
            href={GITHUB_URL}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            GitHub
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="bg-grid relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Production-grade by default
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
              Consistent agent behavior across every project.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Helmsman is a reusable instruction pack — one integrated system that
              teaches coding agents to blueprint, build, understand, document and
              write code the same way, every time.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#start"
                className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-50 transition hover:bg-zinc-700"
              >
                Get started
              </a>
              <a
                href={GITHUB_URL}
                className="rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                View on GitHub
              </a>
            </div>
            <div className="mt-12 max-w-xl rounded-lg border border-zinc-200 bg-zinc-900 p-4 font-mono text-sm text-zinc-100 shadow-sm">
              <span className="select-none text-zinc-500">$ </span>
              git clone {GITHUB_URL} helmsman
            </div>
          </div>
        </section>

        {/* Features */}
        <Section id="features" eyebrow="What it does" title="One integrated system">
          <div className="grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="bg-zinc-50 p-6">
                <h3 className="text-base font-semibold text-zinc-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Modes */}
        <Section id="modes" eyebrow="Operating modes" title="Greenfield or brownfield">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-7">
              <h3 className="text-lg font-semibold text-zinc-900">Greenfield</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                A new app from scratch. Helmsman drives platform inventory, scaffolds
                service and application platforms, and verifies the whole stack with
                Docker before calling it done.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-7">
              <h3 className="text-lg font-semibold text-zinc-900">Brownfield</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                An existing codebase. On first use Helmsman scans the repo and builds
                `project/` knowledge from your code — OVERVIEW, infrastructure map,
                design index, and repo docs — before taking on feature work.
              </p>
            </div>
          </div>
        </Section>

        {/* Gates */}
        <Section
          id="gates"
          eyebrow="Execution gates"
          title="Six gates from read to ship"
        >
          <div className="overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Gate</th>
                  <th className="px-5 py-3 font-medium">Requirement</th>
                  <th className="px-5 py-3 font-medium">Blocks until satisfied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-zinc-50">
                {gates.map((g) => (
                  <tr key={g.id}>
                    <td className="px-5 py-3">
                      <span className="grid h-6 w-6 place-items-center rounded-md bg-zinc-900 font-mono text-xs text-zinc-50">
                        {g.id}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-medium text-zinc-900">{g.name}</td>
                    <td className="px-5 py-3 text-zinc-600">{g.blocks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Examples */}
        <Section id="examples" eyebrow="Examples" title="Sample root AGENTS.md">
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Place this agent-only guide at your app repository root. It explains
            what Helmsman is and points agents to the full pack — not app dev/test
            commands (those live in{" "}
            <code className="font-mono text-zinc-800">helmsman/project/AGENTS.md</code>{" "}
            after bootstrap).
          </p>
          <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-900 p-5 font-mono text-sm leading-relaxed text-zinc-100 shadow-sm">
            {ROOT_AGENTS_SAMPLE}
          </pre>
        </Section>

        {/* Get started */}
        <Section id="start" eyebrow="How to use it" title="Four steps to ship with Helmsman">
          <ol className="grid gap-6 sm:grid-cols-2">
            {steps.map((s) => (
              <li
                key={s.n}
                className="flex gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-zinc-300 font-mono text-sm text-zinc-700">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-900">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-zinc-500 sm:flex-row">
          <p>
            <span className="font-semibold text-zinc-700">Helmsman</span> — reusable
            agent guidance. MIT licensed.
          </p>
          <a className="transition hover:text-zinc-900" href={GITHUB_URL}>
            github.com/fadhilmufid/helmsman
          </a>
        </div>
      </footer>
    </>
  );
}
