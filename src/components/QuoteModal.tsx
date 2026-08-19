"use client";

import { useEffect, useState } from "react";
import {
  BUDGETS,
  PROJECT_TYPES,
  SCOPE_OPTIONS,
  buildQuoteWhatsAppLink,
  emptyQuote,
  type QuoteData,
  type Scope,
} from "@/lib/quote";
import { BRAND } from "@/lib/site";

const input =
  "w-full rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-2 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</span>
      {children}
    </label>
  );
}

export default function QuoteModal({ onClose }: { onClose: () => void }) {
  const [d, setD] = useState<QuoteData>(emptyQuote);
  const [step, setStep] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const update = (patch: Partial<QuoteData>) => setD((s) => ({ ...s, ...patch }));
  const toggleScope = (s: Scope) =>
    setD((cur) => ({ ...cur, scope: cur.scope.includes(s) ? cur.scope.filter((x) => x !== s) : [...cur.scope, s] }));

  const waLink = buildQuoteWhatsAppLink(d, BRAND.whatsapp);

  const chips = (list: readonly string[], active: string | string[], onClick: (v: string) => void) => (
    <div className="mt-2 flex flex-wrap gap-2">
      {list.map((item) => {
        const on = Array.isArray(active) ? active.includes(item) : active === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onClick(item)}
            aria-pressed={on}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
              on ? "border-accent bg-accent-soft text-accent" : "border-border bg-white/60 text-foreground hover:border-accent/40"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Start a project with Cubix"
        className="animate-modal-in relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-surface shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-border px-6 pb-4 pt-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="h-9 w-1.5 rounded-full bg-gold" />
            <div className="leading-tight">
              <p className="font-display text-xl leading-none">Start a project</p>
              <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-muted-2">cubix</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-2 transition hover:border-foreground/30 hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
          <Field label="Your name">
            <input className={input} value={d.name} onChange={(e) => update({ name: e.target.value })} placeholder="Full name" />
          </Field>
          <div>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Project type</span>
            {chips(PROJECT_TYPES, d.projectType, (v) => update({ projectType: v as QuoteData["projectType"] }))}
          </div>
          <div>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">What do you need?</span>
            {chips(SCOPE_OPTIONS, d.scope, (v) => toggleScope(v as Scope))}
          </div>
          <Field label="Location">
            <input className={input} value={d.location} onChange={(e) => update({ location: e.target.value })} placeholder="Project location" />
          </Field>
          <div>
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Budget range</span>
            {chips(BUDGETS, d.budget, (v) => update({ budget: v }))}
          </div>
          <Field label="Timeline (optional)">
            <input className={input} value={d.timeline} onChange={(e) => update({ timeline: e.target.value })} placeholder="e.g. Q3 2026" />
          </Field>
          <Field label="Project details (optional)">
            <textarea
              rows={3}
              className={`${input} resize-none`}
              value={d.message}
              onChange={(e) => update({ message: e.target.value })}
              placeholder="Tell us a little about the project"
            />
          </Field>
        </div>

        <div className="border-t border-border bg-background/60 px-6 py-4 sm:px-8">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#1da851]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Send enquiry →
          </a>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
