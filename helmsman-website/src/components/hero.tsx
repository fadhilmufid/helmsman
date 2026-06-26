"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/icons";
import { CopyButton } from "@/components/copy-button";
import { CLONE_COMMAND, GITHUB_URL, GATES } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };
  const item = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid hero-glow mask-fade-b pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="min-w-0"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open source · steady results, every project
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl"
            >
              A playbook for your{" "}
              <span className="text-gradient">AI coding assistant.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600"
            >
              Helmsman is a folder of instructions you add to any project. It
              teaches your AI to plan first, follow shared rules, write things
              down, and verify its work — so you get reliable output instead of
              guesswork.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#start"
                className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-50 shadow-sm transition hover:bg-zinc-700"
              >
                Get started
                <Icon name="arrowRight" width={16} height={16} />
              </a>
              <a
                href={GITHUB_URL}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                <Icon name="github" width={16} height={16} />
                View on GitHub
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex w-full max-w-md items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-900 py-2.5 pl-4 pr-2.5 font-mono text-sm text-zinc-100 shadow-md"
            >
              <span className="min-w-0 truncate">
                <span className="select-none text-zinc-500">$ </span>
                {CLONE_COMMAND}
              </span>
              <CopyButton value={CLONE_COMMAND} label="Copy" className="shrink-0" />
            </motion.div>
          </motion.div>

          <HeroVisual reduce={reduce ?? false} />
        </div>
      </div>
    </section>
  );
}

function HeroVisual({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.97, y: 12 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full min-w-0 max-w-md"
    >
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg">
        <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          <span className="ml-2 font-mono text-xs text-zinc-500">AGENTS.md</span>
        </div>

        <div className="space-y-4 p-5">
          <div className="font-mono text-xs leading-relaxed text-zinc-500">
            <span className="text-zinc-400"># </span>
            <span className="text-zinc-700">Agent instructions</span>
            <br />
            Read <span className="text-zinc-900">helmsman-agent/</span> first.
          </div>

          <div className="rule-fade" />

          <ul className="space-y-2.5">
            {GATES.map((gate, i) => (
              <motion.li
                key={gate.id}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={reduce ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-zinc-900 font-mono text-[11px] font-medium text-zinc-50">
                  {gate.id}
                </span>
                <span className="text-sm text-zinc-700">{gate.title}</span>
                <span className="ml-auto">
                  <Icon
                    name="check"
                    width={15}
                    height={15}
                    className="text-emerald-500"
                  />
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full bg-zinc-300/40 blur-3xl"
      />
    </motion.div>
  );
}
