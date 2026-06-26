import { Icon } from "@/components/icons";
import { BrandMark } from "@/components/brand-mark";
import { GITHUB_URL, GITHUB_LABEL, NAV_LINKS } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5 font-semibold text-zinc-900">
              <BrandMark className="h-8 w-8" />
              Helmsman
            </a>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              A folder of Markdown instructions that teaches AI coding agents to
              plan, document, and verify. No runtime, no build step — just text.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-2">
            <span className="col-span-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Explore
            </span>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-zinc-600 transition hover:text-zinc-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              className="text-zinc-600 transition hover:text-zinc-900"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-6 text-sm text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Helmsman · MIT licensed.</p>
          <a
            href={GITHUB_URL}
            className="inline-flex items-center gap-2 transition hover:text-zinc-900"
          >
            <Icon name="github" width={16} height={16} />
            {GITHUB_LABEL}
          </a>
        </div>
      </div>
    </footer>
  );
}
