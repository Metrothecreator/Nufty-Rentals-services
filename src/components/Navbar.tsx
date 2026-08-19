"use client";

import { useEffect, useState } from "react";
import { useQuote } from "./QuoteProvider";
import Logo from "./Logo";
import { BRAND } from "@/lib/site";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openQuote } = useQuote();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 flex h-[72px] items-center justify-between transition-all duration-500",
        "px-4 md:px-14",
        scrolled ? "bg-black/95 shadow-[0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl" : "bg-transparent",
      ].join(" ")}
    >
      <a href="#home" className="flex items-center gap-3">
        <Logo size={44} />
        <span className="hidden leading-tight sm:block">
          <span className="block text-[9px] font-medium uppercase tracking-[0.22em] text-[#9a9089]">{BRAND.tagline}</span>
        </span>
      </a>

      <ul className="hidden gap-9 md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#9a9089] transition-colors hover:text-[#f5f0eb]">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={openQuote}
        className="flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-accent-strong hover:text-white"
      >
        Start a project
      </button>
    </nav>
  );
}
