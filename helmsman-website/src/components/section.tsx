import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** Remove the top hairline divider (used for the first section). */
  divider?: boolean;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  divider = true,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-20 sm:py-28 ${
        divider ? "border-t border-zinc-200" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 text-base leading-relaxed text-zinc-600">{intro}</p>
            ) : null}
          </div>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
