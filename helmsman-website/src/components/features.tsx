import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icons";
import { FEATURES } from "@/lib/content";

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="What it does"
      title="Six habits, one system"
      intro="Helmsman bundles the practices that keep AI-assisted development predictable: plan, document, follow rules, and verify before calling something done."
    >
      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Reveal
            key={feature.title}
            delay={i * 0.05}
            className={feature.wide ? "sm:col-span-2 lg:col-span-2" : ""}
          >
            <article className="group h-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 transition group-hover:border-zinc-300 group-hover:bg-zinc-900 group-hover:text-zinc-50">
                <Icon name={feature.icon} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {feature.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
