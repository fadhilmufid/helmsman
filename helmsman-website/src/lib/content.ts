import type { IconName } from "@/components/icons";

export const GITHUB_URL = "https://github.com/fadhilmufid/helmsman";
export const GITHUB_LABEL = "github.com/fadhilmufid/helmsman";
export const CLONE_COMMAND = `git clone ${GITHUB_URL}`;

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "#features", label: "Features" },
  { href: "#modes", label: "Modes" },
  { href: "#flow", label: "How it works" },
  { href: "#examples", label: "Examples" },
  { href: "#faq", label: "FAQ" },
];

export type Feature = {
  icon: IconName;
  title: string;
  body: string;
  /** Spans two columns in the bento grid when true. */
  wide?: boolean;
};

export const FEATURES: Feature[] = [
  {
    icon: "clipboard",
    title: "Plan before you code",
    body: "The agent writes a blueprint plan and a step-by-step task list before changing any files. No jumping straight into code.",
    wide: true,
  },
  {
    icon: "sprout",
    title: "Start new apps the right way",
    body: "Building from scratch? Helmsman scaffolds databases, APIs, and web apps, then checks that everything runs together.",
  },
  {
    icon: "search",
    title: "Learn existing projects first",
    body: "Already have an app? On first use, Helmsman reads your codebase and documents how it works before touching features.",
  },
  {
    icon: "folder",
    title: "Keep notes in one place",
    body: "Plans, feature docs, histories, and project settings live in a single folder the agent maintains for you.",
  },
  {
    icon: "scale",
    title: "One rulebook for all code",
    body: "Shared standards for style and quality mean the agent writes code the same way every time.",
  },
  {
    icon: "refresh",
    title: "Fresh start each session",
    body: "Every new chat begins with a quick re-read of the rules, so the agent never forgets how your project works.",
    wide: true,
  },
];

export type Mode = {
  icon: IconName;
  name: string;
  label: string;
  body: string;
  technical: string;
  points: string[];
};

export const MODES: Mode[] = [
  {
    icon: "sprout",
    name: "Starting fresh",
    label: "Greenfield",
    body: "You are building something new. Helmsman helps set up the pieces — database, API, web app — wire them together, and confirm they run before moving on.",
    technical:
      "Scaffolds platforms/ and verifies with Docker per helmsman-agent/instructions/GREENFIELD.md.",
    points: [
      "Platform-by-platform bootstrap",
      "End-to-end verification before done",
      "Production bar by default",
    ],
  },
  {
    icon: "building",
    name: "Already have code",
    label: "Brownfield",
    body: "You already have an app. On first use, Helmsman reads your repo, writes a summary of how it is built, and only then starts new feature work.",
    technical:
      "Fills helmsman-agent/project/ (PROJECT-OVERVIEW, PROJECT-INFRASTRUCTURE, PROJECT-DESIGN) per helmsman-agent/instructions/BROWNFIELD.md.",
    points: [
      "Scans and maps the codebase first",
      "Documents before it changes anything",
      "Safe, incremental feature work",
    ],
  },
];

export type Gate = {
  id: string;
  title: string;
  action: string;
  waits: string;
};

export const GATES: Gate[] = [
  {
    id: "A",
    title: "Read first",
    action: "Read the playbook and scan project notes.",
    waits: "Editing app code, platforms/, deploy/",
  },
  {
    id: "B",
    title: "Clarify",
    action: "Answer open questions and write a project overview.",
    waits: "Starting implementation",
  },
  {
    id: "C",
    title: "Document & design",
    action: "Write feature specs and design notes in scope.",
    waits: "Scaffolding, platforms/, deploy/",
  },
  {
    id: "D",
    title: "Plan",
    action: "Create a blueprint plan for the work.",
    waits: "Writing tasks or code",
  },
  {
    id: "E",
    title: "Task",
    action: "Write a detailed, exhaustive task checklist.",
    waits: "Editing application files",
  },
  {
    id: "F",
    title: "Verify",
    action: "Run quality checks and verify end-to-end.",
    waits: "Marking the task complete",
  },
];

export type ComparisonRow = { without: string; with: string };

export const COMPARISON: ComparisonRow[] = [
  {
    without: "Jumps straight into code on the first prompt",
    with: "Reads the playbook and plans before any edit",
  },
  {
    without: "Forgets project conventions between chats",
    with: "Re-reads the rulebook at the start of every session",
  },
  {
    without: "Style and structure drift across files",
    with: "One shared rulebook keeps code consistent",
  },
  {
    without: "Context lives only in the chat history",
    with: "Plans, docs, and histories persist in one folder",
  },
  {
    without: "“Done” means it compiled once",
    with: "“Done” means verified end-to-end",
  },
];

export type Step = {
  n: string;
  title: string;
  body: string;
  code?: string;
};

export const STEPS: Step[] = [
  {
    n: "1",
    title: "Clone and copy the pack",
    body: "Clone the repository, then copy the helmsman-agent/ folder into your project.",
    code: CLONE_COMMAND,
  },
  {
    n: "2",
    title: "Add a short guide at the root",
    body: "Create AGENTS.md at the top of your repo so the AI knows where Helmsman lives. No AGENTS.md yet? Copy helmsman-agent/templates/root-AGENTS.md as-is. Already have one? Paste just the marked HELMSMAN block into it.",
  },
  {
    n: "3",
    title: "Point your AI at the playbook",
    body: "Your agent reads helmsman-agent/HELMSMAN-AGENT.md and instructions/RULES.md, then works through checkpoints A–F before writing application code.",
  },
  {
    n: "4",
    title: "Leave the folder where it is",
    body: "Keep instructions in helmsman-agent/instructions/ and project notes in helmsman-agent/project/. Do not move or copy the pack to your repo root.",
  },
];

export const TOOLS: string[] = [
  "Cursor",
  "Claude Code",
  "GitHub Copilot",
  "Windsurf",
  "Codex",
  "Gemini CLI",
  "Cline",
  "Aider",
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What exactly is Helmsman?",
    a: "It is a folder of Markdown instructions — no runtime, no build step, no dependency. You drop helmsman-agent/ into any repository and your AI coding agent reads it to learn how to work in your project.",
  },
  {
    q: "Does it cost anything?",
    a: "No. Helmsman is free and open source under the MIT license. It is just plain text files you copy into your repo.",
  },
  {
    q: "Which AI agents does it work with?",
    a: "Any agent that reads an AGENTS.md or instruction files — including Cursor, Claude Code, GitHub Copilot, Windsurf, Codex, and others. Helmsman is plain Markdown, so there is nothing to integrate.",
  },
  {
    q: "Won't all this planning slow me down?",
    a: "For one-line tweaks, the agent skips the heavy steps. For real features, the upfront planning and verification save far more time than they cost by avoiding rework and broken builds.",
  },
  {
    q: "How do I remove it later?",
    a: "Delete the helmsman-agent/ folder and the Helmsman sections from your root AGENTS.md. Because it never touches your application code directly, there is nothing else to clean up.",
  },
];

export const ROOT_AGENTS_SAMPLE = `# Agent instructions

<!-- HELMSMAN:START — copy everything below into your existing AGENTS.md -->

> This repository uses Helmsman. Before any non-trivial work, read the
> pack at helmsman-agent/ — start with helmsman-agent/HELMSMAN-AGENT.md.

## What is Helmsman
A folder of Markdown instructions at helmsman-agent/ — no runtime, no
build step. Full workflow: helmsman-agent/HELMSMAN-AGENT.md

## Start every session here
1. Read HELMSMAN-AGENT.md in full (re-entry, gates A–F)
2. Pick a mode — GREENFIELD.md or BROWNFIELD.md
3. Scan helmsman-agent/project/ (plans, tasks, histories, config)
4. Work the gates A–F — no app code until Gate A passes

## Do not
- Copy helmsman-agent/instructions/ or project/ to the repo root
- Move, flatten, or symlink helmsman-agent/. Use it in place.

<!-- HELMSMAN:END -->`;

export const TERMINAL_SAMPLE = `$ git clone ${GITHUB_URL}
$ cp -r helmsman/helmsman-agent your-project/
$ cp helmsman/helmsman-agent/templates/root-AGENTS.md \\
     your-project/AGENTS.md

# open your project in your AI editor and start a chat:
> Read helmsman-agent/HELMSMAN-AGENT.md and begin.`;

export const TREE_SAMPLE = `your-project/
├─ AGENTS.md            ← thin pointer at the root
├─ helmsman-agent/
│  ├─ HELMSMAN-AGENT.md ← entry point + re-entry
│  ├─ instructions/     ← the rulebook (RULES, CODE, …)
│  └─ project/          ← plans, tasks, histories, design
└─ src/                 ← your application code`;
