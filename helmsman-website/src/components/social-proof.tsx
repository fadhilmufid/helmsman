import { TOOLS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function SocialProof() {
  const row = [...TOOLS, ...TOOLS];

  return (
    <section className="border-t border-zinc-200 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-center text-sm text-zinc-500">
            Plain Markdown — works with any agent that reads an{" "}
            <code className="font-mono text-zinc-700">AGENTS.md</code>
          </p>
        </Reveal>
        <div className="mask-fade-x relative mt-8 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-3">
            {row.map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="whitespace-nowrap rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
