import type { ReactNode } from "react";

const GITHUB_URL = "https://github.com/fadhilmufid/helmsman";

const ROOT_AGENTS_SAMPLE = `# Agent instructions

## What is Helmsman
Helmsman is a reusable instruction pack at helmsman-agent/ …
This file is a thin pointer. Full workflow: helmsman-agent/helmsman-agent.md

## How to use Helmsman
1. Read helmsman-agent/helmsman-agent.md in full (HARD STOP, gates A–F)
2. Read helmsman-agent/instructions/rules.md (integrated rulebook)
3. Run Gate A: scan helmsman-agent/project/
…

## Do not
- Copy helmsman-agent/instructions/, helmsman-agent/project/, or full helmsman-agent/helmsman-agent.md to root
- Flatten or move helmsman-agent/. Use it in place.
…`;

const features: { title: string; body: string }[] = [
  {
    title: "📋 Plan before you code",
    body: "The agent writes a plan and a step-by-step task list before changing any files. No jumping straight into code.",
  },
  {
    title: "🌱 Start new apps the right way",
    body: "Building from scratch? Helmsman helps set up databases, APIs, and web apps, then checks that everything runs together.",
  },
  {
    title: "🔍 Learn existing projects first",
    body: "Already have an app? On first use, Helmsman reads your codebase and writes down how it works before touching features.",
  },
  {
    title: "📝 Keep notes in one place",
    body: "Plans, feature docs, and project settings live in a single folder the agent maintains for you.",
  },
  {
    title: "⚖️ One rulebook for all code",
    body: "Shared standards for style and quality mean the agent writes code the same way every time.",
  },
  {
    title: "🔄 Fresh start each session",
    body: "Every new chat begins with a quick re-read of the rules, so the agent does not forget how your project works.",
  },
];

const gates: { id: string; action: string; waits: string }[] = [
  {
    id: "A",
    action: "Read the playbook and project notes",
    waits: "Editing app code, platforms/, deploy/",
  },
  {
    id: "B",
    action: "Answer open questions and write a project overview",
    waits: "Starting implementation",
  },
  {
    id: "C",
    action: "Write feature specs and design notes",
    waits: "Scaffolding, platforms/, deploy/",
  },
  {
    id: "D",
    action: "Create a plan for the work",
    waits: "Writing tasks or coding",
  },
  {
    id: "E",
    action: "Write a detailed task checklist",
    waits: "Editing application files",
  },
  {
    id: "F",
    action: "Run tests and verify end-to-end",
    waits: "Marking the task complete",
  },
];

const steps: { n: string; title: string; body: ReactNode }[] = [
  {
    n: "1",
    title: "Clone and copy the pack",
    body: (
      <>
        Clone the repository, then copy the{" "}
        <code className="font-mono text-zinc-800">helmsman-agent/</code> folder into
        your project:
        <br />
        <code className="mt-2 block font-mono text-zinc-800">
          git clone {GITHUB_URL}
        </code>
      </>
    ),
  },
  {
    n: "2",
    title: "Add a short guide at the project root",
    body: (
      <>
        Create <code className="font-mono text-zinc-800">AGENTS.md</code> at the top
        level of your repo. It tells the AI where to find Helmsman. Copy from{" "}
        <code className="font-mono text-zinc-800">
          helmsman-agent/templates/root-agents.md
        </code>{" "}
        in the pack (or <code className="font-mono text-zinc-800">AGENTS.md</code> from
        a full monorepo clone). If you already have a root{" "}
        <code className="font-mono text-zinc-800">AGENTS.md</code>, merge in the
        Helmsman sections.
      </>
    ),
  },
  {
    n: "3",
    title: "Point your AI at the playbook",
    body: (
      <>
        Your agent reads{" "}
        <code className="font-mono text-zinc-800">helmsman-agent/helmsman-agent.md</code> and{" "}
        <code className="font-mono text-zinc-800">
          helmsman-agent/instructions/rules.md
        </code>
        , then works through checkpoints A–F before writing application code.
      </>
    ),
  },
  {
    n: "4",
    title: "Leave the folder where it is",
    body: (
      <>
        Keep instructions in{" "}
        <code className="font-mono text-zinc-800">helmsman-agent/instructions/</code> and
        project notes in{" "}
        <code className="font-mono text-zinc-800">helmsman-agent/project/</code>. Do not
        move or copy the pack to your repo root.
      </>
    ),
  },
];

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
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
        {intro ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600">{intro}</p>
        ) : null}
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
              How it works
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
              🧭 Steady results, every project
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
              A playbook for your AI coding assistant.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Helmsman is a folder of instructions you add to any software project.
              It tells your AI to plan first, follow shared rules, write things down,
              and check its work, so you get reliable output instead of guesswork.
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
              git clone {GITHUB_URL}
            </div>
          </div>
        </section>

        {/* Features */}
        <Section
          id="features"
          eyebrow="What it does"
          title="Six habits, one system ⚡"
          intro="Helmsman bundles the practices that keep AI-assisted development predictable: plan, document, follow rules, and verify before calling something done."
        >
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
        <Section
          id="modes"
          eyebrow="Two ways to use it"
          title="New project or existing code? 🗺️"
          intro="Helmsman adapts to whether you are starting fresh or joining a codebase that already exists."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-7">
              <h3 className="text-lg font-semibold text-zinc-900">🌱 Starting fresh</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
                Greenfield
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                You are building something new. Helmsman helps set up the pieces (database,
                API, web app), wire them together, and confirm they run before moving on.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                Technical: scaffolds <code className="font-mono">platforms/</code> and
                verifies with Docker per{" "}
                <code className="font-mono">greenfield.md</code>.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-7">
              <h3 className="text-lg font-semibold text-zinc-900">🏗️ Already have code</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
                Brownfield
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                You already have an app. On first use, Helmsman reads your repo,
                writes a summary of how it is built, and only then starts new
                feature work.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                Technical: fills <code className="font-mono">helmsman-agent/project/</code>{" "}
                (<code className="font-mono">overview.md</code>,{" "}
                <code className="font-mono">infrastructure.md</code>, design index) per{" "}
                <code className="font-mono">brownfield.md</code>.
              </p>
            </div>
          </div>
        </Section>

        {/* Gates */}
        <Section
          id="gates"
          eyebrow="Built-in checkpoints"
          title="Six steps from read to ship 🚦"
          intro="Checkpoints keep the agent from skipping ahead. It must pass each one in order: read first, plan second, code last, test before finishing."
        >
          <div className="overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Step</th>
                  <th className="px-5 py-3 font-medium">What happens</th>
                  <th className="px-5 py-3 font-medium">What waits</th>
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
                    <td className="px-5 py-3 text-zinc-900">{g.action}</td>
                    <td className="px-5 py-3 text-zinc-600">{g.waits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Examples */}
        <Section
          id="examples"
          eyebrow="What you add to your repo"
          title="A small file at the project root 📄"
          intro="You need one short file called AGENTS.md at the top of your project. It tells the AI where Helmsman lives. After setup, day-to-day dev commands live in helmsman-agent/project/AGENTS.md."
        >
          <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-900 p-5 font-mono text-sm leading-relaxed text-zinc-100 shadow-sm">
            {ROOT_AGENTS_SAMPLE}
          </pre>
        </Section>

        {/* Get started */}
        <Section
          id="start"
          eyebrow="Setup"
          title="Four steps to get started 🚀"
          intro="You do not need to memorize the full playbook. Clone the repo, copy the helmsman-agent/ folder, add the root guide, and let your AI follow the instructions inside."
        >
          <p className="mb-8 max-w-2xl rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-600">
            <span className="font-medium text-zinc-800">Trying Helmsman in this repo?</span>{" "}
            In Cursor, use{" "}
            <code className="font-mono text-zinc-800">@helmsman-agent/</code> first for the
            workflow, then{" "}
            <code className="font-mono text-zinc-800">@helmsman-website/</code> for edits to
            this app.
          </p>
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
            <span className="font-semibold text-zinc-700">Helmsman 🧭</span>. Instructions
            for AI coding assistants. MIT licensed.
          </p>
          <a className="transition hover:text-zinc-900" href={GITHUB_URL}>
            github.com/fadhilmufid/helmsman
          </a>
        </div>
      </footer>
    </>
  );
}
