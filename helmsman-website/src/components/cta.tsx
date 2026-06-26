import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icons";
import { CopyButton } from "@/components/copy-button";
import { CLONE_COMMAND, GITHUB_URL } from "@/lib/content";

export function Cta() {
  return (
    <section className="border-t border-zinc-200 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 px-8 py-14 text-center shadow-lg sm:px-16">
            <div
              aria-hidden
              className="bg-grid-lines mask-fade-b pointer-events-none absolute inset-0 opacity-60"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 -z-0 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                Give your coding agent a steady hand.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
                Free and open source. Drop in one folder and your AI starts
                planning, documenting, and verifying from the very first prompt.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={GITHUB_URL}
                  className="inline-flex items-center gap-2 rounded-md bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-white"
                >
                  <Icon name="github" width={16} height={16} />
                  Get it on GitHub
                </a>
                <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-white/15 bg-white/5 py-2.5 pl-4 pr-2.5 font-mono text-sm text-zinc-200">
                  <span className="select-none text-zinc-500">$ </span>
                  <span className="hidden min-w-0 truncate sm:inline">
                    {CLONE_COMMAND}
                  </span>
                  <span className="sm:hidden">git clone …</span>
                  <CopyButton value={CLONE_COMMAND} className="shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
