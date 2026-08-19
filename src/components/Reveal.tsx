"use client";

import { useEffect, useRef, type ElementType, type JSX, type ReactNode } from "react";

type Effect = "reveal" | "reveal-clip" | "reveal-scale";

export default function Reveal({
  children,
  as: Tag = "div",
  effect = "reveal",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  effect?: Effect;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as unknown as ElementType;
  return (
    <Component ref={ref} className={`${effect} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Component>
  );
}
