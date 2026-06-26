import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icons";
import { COMPARISON } from "@/lib/content";

export function Comparison() {
  return (
    <Section
      id="comparison"
      eyebrow="Why it helps"
      title="The difference it makes"
      intro="Same model, same editor — a clear, repeatable process is what separates guesswork from steady, production-ready output."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-zinc-200 bg-zinc-50 p-7">
            <h3 className="flex items-center gap-2.5 text-base font-semibold text-zinc-700">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-zinc-200 text-zinc-500">
                <Icon name="x" width={15} height={15} />
              </span>
              Without Helmsman
            </h3>
            <ul className="mt-5 space-y-3.5">
              {COMPARISON.map((row) => (
                <li
                  key={row.without}
                  className="flex items-start gap-3 text-sm leading-relaxed text-zinc-500"
                >
                  <Icon
                    name="x"
                    width={16}
                    height={16}
                    className="mt-0.5 shrink-0 text-zinc-400"
                  />
                  {row.without}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border border-zinc-900 bg-zinc-900 p-7 shadow-lg">
            <h3 className="flex items-center gap-2.5 text-base font-semibold text-zinc-50">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Icon name="check" width={15} height={15} />
              </span>
              With Helmsman
            </h3>
            <ul className="mt-5 space-y-3.5">
              {COMPARISON.map((row) => (
                <li
                  key={row.with}
                  className="flex items-start gap-3 text-sm leading-relaxed text-zinc-200"
                >
                  <Icon
                    name="check"
                    width={16}
                    height={16}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  {row.with}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
