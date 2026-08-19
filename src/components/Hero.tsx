"use client";

import { useEffect, useRef } from "react";
import ScrollSequence, { type ScrollSequenceHandle } from "./ScrollSequence";

const FRAMES = [
  { src: "/seq/frame-06.jpg", alt: "Empty site at dawn" },
  { src: "/seq/frame-07.jpg", alt: "Foundation pour" },
  { src: "/seq/frame-01.jpg", alt: "Foundation and steel columns" },
  { src: "/seq/frame-08.jpg", alt: "Steel frame skeleton" },
  { src: "/seq/frame-02.jpg", alt: "Concrete shell" },
  { src: "/seq/frame-09.jpg", alt: "Scaffolding and cladding" },
  { src: "/seq/frame-03.jpg", alt: "Facade taking shape" },
  { src: "/seq/frame-10.jpg", alt: "Glazing and windows" },
  { src: "/seq/frame-04.jpg", alt: "Finished interior" },
  { src: "/seq/frame-11.jpg", alt: "Kitchen interior" },
  { src: "/seq/frame-05.jpg", alt: "Completed building" },
  { src: "/seq/frame-12.jpg", alt: "Night view" },
  { src: "/seq/frame-13.jpg", alt: "Final aerial view" },
];

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function Hero({ onQuote }: { onQuote: () => void }) {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const seqRef = useRef<ScrollSequenceHandle | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        const distance = Math.max(1, wrapper.offsetHeight - window.innerHeight);
        const progress = clamp(-rect.top / distance, 0, 1);
        seqRef.current?.render(progress);
        if (textRef.current) {
          const intro = 1 - clamp((progress - 0.02) / 0.2, 0, 1);
          textRef.current.style.opacity = String(intro);
          textRef.current.style.transform = `translate3d(0,${progress * -60}px,0)`;
          textRef.current.style.pointerEvents = intro < 0.05 ? "none" : "auto";
        }
        if (cueRef.current) {
          cueRef.current.style.opacity = String(1 - clamp(progress / 0.08, 0, 1));
        }
      }
      if (activeRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
        if (activeRef.current && !rafRef.current) rafRef.current = requestAnimationFrame(tick);
        if (!activeRef.current && rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0 },
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
      className="relative h-[560vh] motion-reduce:h-auto"
      aria-label="Cubix construction and architecture"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-ink motion-reduce:static motion-reduce:h-[88dvh]">
        <ScrollSequence ref={seqRef} frames={FRAMES} className="absolute inset-0" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,.66)_0%,rgba(8,8,7,.12)_36%,rgba(8,8,7,.18)_58%,rgba(8,8,7,.85)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,transparent_0%,rgba(0,0,0,.28)_70%,rgba(0,0,0,.5)_100%)]" />

        {/* top bar */}
        <div className="absolute left-6 right-6 top-24 z-10 flex items-center justify-between sm:left-10 sm:right-10 lg:left-16 lg:right-16">
          <div className="flex items-center gap-3 text-white/75">
            <span className="h-px w-7 bg-gold" />
            <span className="label text-[9px] sm:text-[10px]">Construction · Architecture</span>
          </div>
          <span className="label text-[9px] text-white/50">Scroll to explore</span>
        </div>

        {/* hero text */}
        <div
          ref={textRef}
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28"
          style={{ transition: "opacity .12s linear, transform .12s linear" }}
        >
          <div className="max-w-5xl">
            <p className="label mb-5 text-[10px] text-white/65">cubix</p>
            <h1 className="font-display max-w-4xl text-[clamp(3.2rem,9.5vw,8.5rem)] font-medium leading-[.9] tracking-[-.04em] text-white">
              We build the<br />
              <span className="italic text-white/72">extraordinary.</span>
            </h1>
            <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-white/72 sm:text-base">
                Design-led construction and architecture — from concept to handover, delivered by one accountable team.
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={onQuote}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-accent-strong hover:text-white"
                >
                  Start a project
                </button>
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

        {/* scroll cue */}
        <div
          ref={cueRef}
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55"
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
