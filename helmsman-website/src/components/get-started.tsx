import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CopyButton } from "@/components/copy-button";
import { STEPS } from "@/lib/content";

export function GetStarted() {
  return (
    <Section
      id="start"
      eyebrow="Setup"
      title="Four steps to get started"
      intro="You do not need to memorize the playbook. Clone the repo, copy the helmsman-agent/ folder, add the root guide, and let your AI follow the instructions inside."
    >
      <div className="mb-8 max-w-2xl rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-600">
        <span className="font-medium text-zinc-800">
          Trying Helmsman in this repo?
        </span>{" "}
        In Cursor, use{" "}
        <code className="font-mono text-zinc-800">@helmsman-agent/</code> first for
        the workflow, then{" "}
        <code className="font-mono text-zinc-800">@helmsman-website/</code> for edits
        to this app.
      </div>

      <ol className="grid gap-4 sm:grid-cols-2">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.06} as="li" className="min-w-0">
            <div className="flex h-full gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-zinc-900 font-mono text-sm font-medium text-zinc-50">
                {step.n}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-zinc-900">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                  {step.body}
                </p>
                {step.code ? (
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-zinc-200 bg-zinc-900 py-2 pl-3 pr-2 font-mono text-xs text-zinc-100">
                    <span className="min-w-0 truncate">
                      <span className="select-none text-zinc-500">$ </span>
                      {step.code}
                    </span>
                    <CopyButton value={step.code} className="shrink-0" />
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
