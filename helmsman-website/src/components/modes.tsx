import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icons";
import { MODES } from "@/lib/content";

export function Modes() {
  return (
    <Section
      id="modes"
      eyebrow="Two ways to use it"
      title="New project or existing code?"
      intro="Helmsman adapts to whether you are starting fresh or joining a codebase that already exists."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {MODES.map((mode, i) => (
          <Reveal key={mode.label} delay={i * 0.08} className="min-w-0">
            <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition duration-300 hover:border-zinc-300 hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-zinc-900 text-zinc-50">
                  <Icon name={mode.icon} width={22} height={22} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {mode.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    {mode.label}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                {mode.body}
              </p>

              <ul className="mt-5 space-y-2.5">
                {mode.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-zinc-700">
                    <Icon
                      name="check"
                      width={16}
                      height={16}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="mt-6 break-words border-t border-zinc-100 pt-4 font-mono text-xs leading-relaxed text-zinc-500">
                {mode.technical}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
