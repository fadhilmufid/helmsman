"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { Icon } from "@/components/icons";
import { FAQS } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      eyebrow="Questions"
      title="Frequently asked"
      intro="Helmsman is intentionally simple — here is what most people want to know before trying it."
    >
      <div className="mx-auto max-w-3xl divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white shadow-sm">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;
          return (
            <div key={faq.q}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
                >
                  {faq.q}
                  <Icon
                    name="chevron"
                    width={18}
                    height={18}
                    className={`shrink-0 text-zinc-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-5 pb-5 text-sm leading-relaxed text-zinc-600"
              >
                {faq.a}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
