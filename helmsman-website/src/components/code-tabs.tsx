"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { CopyButton } from "@/components/copy-button";
import {
  ROOT_AGENTS_SAMPLE,
  TERMINAL_SAMPLE,
  TREE_SAMPLE,
} from "@/lib/content";

const TABS = [
  { id: "agents", label: "AGENTS.md", code: ROOT_AGENTS_SAMPLE },
  { id: "terminal", label: "Terminal", code: TERMINAL_SAMPLE },
  { id: "tree", label: "Folder tree", code: TREE_SAMPLE },
] as const;

export function CodeTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("agents");
  const current = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <Section
      id="examples"
      eyebrow="What you add to your repo"
      title="One small file at the root"
      intro="You need a single AGENTS.md at the top of your project — it tells the AI where Helmsman lives. After setup, day-to-day dev commands live in helmsman-agent/project/PROJECT-AGENTS.md."
    >
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-900 shadow-md">
        <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900 px-3 py-2.5">
          <div
            role="tablist"
            aria-label="Code examples"
            className="flex items-center gap-1"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={`rounded-md px-3 py-1.5 font-mono text-xs transition ${
                  active === tab.id
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <CopyButton value={current.code} />
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-zinc-100">
          <code>{current.code}</code>
        </pre>
      </div>
    </Section>
  );
}
