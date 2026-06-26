"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { BrandMark } from "@/components/brand-mark";
import { GITHUB_URL, NAV_LINKS } from "@/lib/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-zinc-200 bg-[#fbfbfa]/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-zinc-900"
        >
          <BrandMark className="h-8 w-8" />
          Helmsman
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                active === link.href
                  ? "text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            className="hidden items-center gap-2 rounded-md bg-zinc-900 px-3.5 py-2 text-sm font-medium text-zinc-50 transition hover:bg-zinc-700 sm:inline-flex"
          >
            <Icon name="github" width={16} height={16} />
            GitHub
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md border border-zinc-300 text-zinc-700 transition hover:border-zinc-400 md:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-zinc-200 bg-[#fbfbfa] md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-3.5 py-2.5 text-sm font-medium text-zinc-50"
            >
              <Icon name="github" width={16} height={16} />
              View on GitHub
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
