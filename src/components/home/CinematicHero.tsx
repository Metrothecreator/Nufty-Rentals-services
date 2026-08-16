"use client";

import { useEffect, useRef } from "react";
import ScrollImageSequence, { type ScrollImageSequenceHandle } from "./ScrollImageSequence";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { CANOPY_FALLBACK_STAGES } from "@/lib/assets";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function CinematicHero() {
  const wrapperRef  = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef<ScrollImageSequenceHandle | null>(null);
  const textRef     = useRef<HTMLDivElement | null>(null);
  const cueRef      = useRef<HTMLDivElement | null>(null);
  const rafRef      = useRef<number | null>(null);
  const activeRef   = useRef(false);

  useEffect(() => {
    const tick = () => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        const rect     = wrapper.getBoundingClientRect();
        const distance = Math.max(1, wrapper.offsetHeight - window.innerHeight);
        const progress = clamp(-rect.top / distance, 0, 1);

        sequenceRef.current?.render(progress);

        if (textRef.current) {
          const intro = 1 - clamp((progress - 0.02) / 0.22, 0, 1);
          textRef.current.style.opacity = String(intro);
          textRef.current.style.transform = `translate3d(0,${progress * -55}px,0)`;
          textRef.current.style.pointerEvents = intro < 0.05 ? "none" : "auto";
        }
        if (cueRef.current) {
          cueRef.current.style.opacity = String(1 - clamp(progress / 0.07, 0, 1));
        }
      }
      if (activeRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
        if (activeRef.current && !rafRef.current) {
          rafRef.current = requestAnimationFrame(tick);
        }
        if (!activeRef.current && rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => {
      activeRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="home"
      ref={wrapperRef}
      className="relative h-[430vh] motion-reduce:h-auto"
      aria-label="Nufty cinematic canopy experience"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-ink motion-reduce:static motion-reduce:h-[88dvh]">
        <ScrollImageSequence
          ref={sequenceRef}
          framesBasePath="/sequences/canopy"
          fallbackImages={CANOPY_FALLBACK_STAGES}
          onReady={() => {}} // no gate — content visible immediately
          className="absolute inset-0"
        />

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,.62)_0%,rgba(8,8,7,.05)_34%,rgba(8,8,7,.1)_58%,rgba(8,8,7,.82)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,.18)_65%,rgba(0,0,0,.48)_100%)]" />

        {/* Top bar */}
        <div className="absolute left-6 right-6 top-24 z-10 flex items-center justify-between sm:left-10 sm:right-10 lg:left-16 lg:right-16">
          <div className="flex items-center gap-3 text-white/75">
            <span className="h-px w-7 bg-gold" />
            <span className="label text-[9px] sm:text-[10px]">Port Harcourt · Nigeria</span>
          </div>
          <span className="label text-[9px] text-white/50">Scroll to explore</span>
        </div>

        {/* Hero text — always visible, no ready gate */}
        <div
          ref={textRef}
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28"
          style={{ transition: "opacity .12s linear, transform .12s linear" }}
        >
          <div className="max-w-5xl">
            <p className="label mb-5 text-[10px] text-white/65">Nufty Rental Service</p>
            <h1 className="font-display max-w-4xl text-[clamp(3.5rem,9.8vw,9rem)] font-medium leading-[.88] tracking-[-.045em] text-white">
              We set<br />
              <span className="italic text-white/72">the scene.</span>
            </h1>
            <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-white/72 sm:text-base">
                Canopies, tents and event setups designed to give your occasion the setting it deserves.
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <WhatsAppButton messageKey="quote" size="md">Get a Quote</WhatsAppButton>
                <a
                  href="#work"
                  className="group label border-b border-white/30 pb-2 text-[10px] text-white/75 transition hover:border-white hover:text-white"
                >
                  View our work{" "}
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55 transition-opacity duration-300"
          aria-hidden="true"
        >
          <span className="label text-[8px]">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      </div>
    </section>
  );
}
