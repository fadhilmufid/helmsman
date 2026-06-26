"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/icons";
import { GATES } from "@/lib/content";

export function GateFlow() {
  const reduce = useReducedMotion();

  return (
    <section id="flow" className="scroll-mt-20 border-t border-zinc-200 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Built-in checkpoints
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Six gates from read to ship
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            Gates keep the agent from skipping ahead. It must clear each one in
            order — read first, plan in the middle, code last, and verify before
            finishing.
          </p>
        </div>

        <ol className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-200 sm:left-[23px]"
          />
          {GATES.map((gate, i) => (
            <motion.li
              key={gate.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative flex gap-5 pb-8 last:pb-0"
            >
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-zinc-300 bg-white font-mono text-sm font-semibold text-zinc-900 shadow-sm sm:h-12 sm:w-12">
                {gate.id}
              </span>
              <div className="flex-1 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-zinc-900">
                    {gate.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500">
                    <Icon name="x" width={12} height={12} />
                    waits: {gate.waits}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                  {gate.action}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
