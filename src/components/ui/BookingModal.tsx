"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WA_NUMBER = "2348033448571";

const EVENT_TYPES = [
  { id: "wedding",   label: "Wedding",          icon: "💍" },
  { id: "birthday",  label: "Birthday / Party",  icon: "🎉" },
  { id: "corporate", label: "Corporate",          icon: "🏢" },
  { id: "burial",    label: "Burial / Memorial",  icon: "🕊" },
  { id: "outdoor",   label: "Outdoor Event",      icon: "🌿" },
  { id: "other",     label: "Other",              icon: "✦"  },
] as const;

const SERVICES = [
  { id: "canopy",     label: "Canopy / Tent"   },
  { id: "chairs",     label: "Chairs"          },
  { id: "tables",     label: "Tables"          },
  { id: "decoration", label: "Decoration"      },
  { id: "generator",  label: "Generator"       },
  { id: "lighting",   label: "Lighting"        },
  { id: "catering",   label: "Catering"        },
  { id: "ac",         label: "Air Conditioning" },
  { id: "other",      label: "Other"           },
] as const;

type Step = "event" | "services" | "details" | "review";

const STEPS: Step[] = ["event", "services", "details", "review"];
const STEP_LABELS = ["Event", "Services", "Details", "Review"];

interface FormState {
  eventType: string;
  services: string[];
  date: string;
  location: string;
  guests: string;
  message: string;
}

const EMPTY: FormState = {
  eventType: "", services: [], date: "", location: "", guests: "", message: "",
};

interface Props { open: boolean; onClose: () => void; }

export default function BookingModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>("event");
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "services_min", string>>>({});
  const [waFailed, setWaFailed] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLButtonElement>(null);

  const stepIdx = STEPS.indexOf(step);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep("event"); setForm(EMPTY); setErrors({}); setWaFailed(false);
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  const validate = useCallback((): boolean => {
    const e: typeof errors = {};
    if (step === "event" && !form.eventType) e.eventType = "Please select your event type.";
    if (step === "services" && form.services.length === 0) e.services_min = "Please select at least one service.";
    if (step === "details") {
      if (!form.date) e.date = "Please select your event date.";
      if (!form.location.trim()) e.location = "Please enter your event location.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [step, form]);

  const next = () => { if (validate()) setStep(STEPS[stepIdx + 1]); };
  const back = () => { setErrors({}); setStep(STEPS[stepIdx - 1]); };

  const toggleService = (id: string) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(id) ? f.services.filter(s => s !== id) : [...f.services, id],
    }));
    setErrors(e => ({ ...e, services_min: undefined }));
  };

  const buildMessage = () => {
    const eventLabel = EVENT_TYPES.find(e => e.id === form.eventType)?.label ?? form.eventType;
    const serviceLabels = form.services
      .map(id => SERVICES.find(s => s.id === id)?.label ?? id)
      .join(", ");
    const dateStr = form.date
      ? new Date(form.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
      : "TBD";

    let msg = `Hello Nufty Rentals 👋\n\nI'd like to make an enquiry for an event.\n\n`;
    msg += `Event: ${eventLabel}\n`;
    msg += `Date: ${dateStr}\n`;
    msg += `Location: ${form.location.trim()}\n`;
    if (form.guests) msg += `Guests: ${form.guests}\n`;
    msg += `\nServices needed:\n${form.services.map(id => `• ${SERVICES.find(s => s.id === id)?.label ?? id}`).join("\n")}`;
    if (form.message.trim()) msg += `\n\nAdditional details:\n${form.message.trim()}`;
    msg += `\n\nI'd like to know your availability and quotation.\n\nThank you.`;
    return msg;
  };

  const handleWhatsApp = () => {
    const msg = buildMessage();
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) setWaFailed(true);
    else onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Book with Nufty Rentals"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-lg bg-background rounded-t-[24px] sm:rounded-[20px] shadow-2xl flex flex-col"
        style={{
          maxHeight: "min(92dvh, 700px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-foreground/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-border">
          <div>
            <p className="label text-[9px] text-accent">Nufty Rentals</p>
            <p className="font-display text-xl mt-0.5">Book an Event</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center gap-1.5">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1.5 flex-1">
                <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= stepIdx ? "bg-accent" : "bg-border"}`} />
                {i < STEPS.length - 1 && null}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {STEP_LABELS.map((l, i) => (
              <span key={l} className={`label text-[8px] transition-colors ${i === stepIdx ? "text-accent" : i < stepIdx ? "text-muted" : "text-muted-2"}`}>{l}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">

          {/* ── STEP 1: EVENT TYPE ── */}
          {step === "event" && (
            <div>
              <h2 className="font-display text-2xl mb-1">What are you planning?</h2>
              <p className="text-sm text-muted mb-5">Select your event type to get started.</p>
              <div className="grid grid-cols-2 gap-2.5">
                {EVENT_TYPES.map((e, i) => (
                  <button
                    key={e.id}
                    ref={i === 0 ? firstInputRef : undefined}
                    onClick={() => { setForm(f => ({ ...f, eventType: e.id })); setErrors({}); }}
                    className={[
                      "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200",
                      form.eventType === e.id
                        ? "border-accent bg-accent/5 shadow-sm"
                        : "border-border hover:border-foreground/25 hover:bg-surface",
                    ].join(" ")}
                  >
                    <span className="text-xl leading-none">{e.icon}</span>
                    <span className={`text-sm font-medium leading-tight ${form.eventType === e.id ? "text-accent" : "text-foreground"}`}>{e.label}</span>
                    {form.eventType === e.id && (
                      <span className="ml-auto h-4 w-4 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="h-2.5 w-2.5"><path d="M5 13l4 4L19 7"/></svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {errors.eventType && <p className="mt-3 text-sm text-red-600">{errors.eventType}</p>}
            </div>
          )}

          {/* ── STEP 2: SERVICES ── */}
          {step === "services" && (
            <div>
              <h2 className="font-display text-2xl mb-1">What do you need?</h2>
              <p className="text-sm text-muted mb-5">Select all that apply — you can pick multiple.</p>
              <div className="grid grid-cols-2 gap-2.5">
                {SERVICES.map(s => {
                  const active = form.services.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={[
                        "flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200",
                        active ? "border-accent bg-accent/5" : "border-border hover:border-foreground/25 hover:bg-surface",
                      ].join(" ")}
                    >
                      <span className={`text-sm font-medium ${active ? "text-accent" : "text-foreground"}`}>{s.label}</span>
                      <span className={[
                        "h-4 w-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all",
                        active ? "bg-accent border-accent" : "border-border",
                      ].join(" ")}>
                        {active && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="h-2.5 w-2.5"><path d="M5 13l4 4L19 7"/></svg>}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.services_min && <p className="mt-3 text-sm text-red-600">{errors.services_min}</p>}
            </div>
          )}

          {/* ── STEP 3: DETAILS ── */}
          {step === "details" && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-display text-2xl mb-1">Event details</h2>
                <p className="text-sm text-muted mb-4">Just the basics — we'll handle the rest on WhatsApp.</p>
              </div>
              <div>
                <label className="label text-[9px] text-muted-2 block mb-1.5">Event Date *</label>
                <input
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={e => { setForm(f => ({ ...f, date: e.target.value })); setErrors(er => ({ ...er, date: undefined })); }}
                  className={`w-full rounded-xl border-2 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent ${errors.date ? "border-red-400" : "border-border"}`}
                />
                {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
              </div>
              <div>
                <label className="label text-[9px] text-muted-2 block mb-1.5">Event Location *</label>
                <input
                  type="text"
                  value={form.location}
                  placeholder="e.g. Port Harcourt, Rivers State"
                  onChange={e => { setForm(f => ({ ...f, location: e.target.value })); setErrors(er => ({ ...er, location: undefined })); }}
                  className={`w-full rounded-xl border-2 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent ${errors.location ? "border-red-400" : "border-border"}`}
                />
                {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
              </div>
              <div>
                <label className="label text-[9px] text-muted-2 block mb-1.5">Estimated Guests</label>
                <input
                  type="number"
                  value={form.guests}
                  placeholder="e.g. 200"
                  min="1"
                  onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label className="label text-[9px] text-muted-2 block mb-1.5">Additional Message <span className="normal-case tracking-normal font-normal">(optional)</span></label>
                <textarea
                  value={form.message}
                  placeholder="Any specific requirements or questions..."
                  rows={3}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent resize-none"
                />
              </div>
            </div>
          )}

          {/* ── STEP 4: REVIEW ── */}
          {step === "review" && (
            <div>
              <h2 className="font-display text-2xl mb-1">Review your enquiry</h2>
              <p className="text-sm text-muted mb-5">Everything looks good? We'll send this to Nufty on WhatsApp.</p>
              <div className="rounded-2xl border border-border bg-surface divide-y divide-border overflow-hidden">
                <div className="px-4 py-3.5">
                  <p className="label text-[9px] text-muted-2 mb-1">Event Type</p>
                  <p className="text-sm font-medium">{EVENT_TYPES.find(e => e.id === form.eventType)?.label}</p>
                </div>
                <div className="px-4 py-3.5">
                  <p className="label text-[9px] text-muted-2 mb-1.5">Services</p>
                  <div className="flex flex-wrap gap-1.5">
                    {form.services.map(id => (
                      <span key={id} className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                        {SERVICES.find(s => s.id === id)?.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-3.5">
                  <p className="label text-[9px] text-muted-2 mb-1">Date</p>
                  <p className="text-sm font-medium">
                    {form.date ? new Date(form.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—"}
                  </p>
                </div>
                <div className="px-4 py-3.5">
                  <p className="label text-[9px] text-muted-2 mb-1">Location</p>
                  <p className="text-sm font-medium">{form.location}</p>
                </div>
                {form.guests && (
                  <div className="px-4 py-3.5">
                    <p className="label text-[9px] text-muted-2 mb-1">Guests</p>
                    <p className="text-sm font-medium">{form.guests}</p>
                  </div>
                )}
                {form.message && (
                  <div className="px-4 py-3.5">
                    <p className="label text-[9px] text-muted-2 mb-1">Additional Details</p>
                    <p className="text-sm text-muted">{form.message}</p>
                  </div>
                )}
              </div>
              {waFailed && (
                <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-sm text-red-700">WhatsApp couldn't open. Your enquiry is ready — tap below to try again.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 pt-3 pb-5 border-t border-border flex gap-3">
          {stepIdx > 0 && (
            <button
              onClick={back}
              className="flex-shrink-0 h-12 px-5 rounded-full border-2 border-border text-sm font-semibold hover:border-foreground/40 transition-colors"
            >
              ← Back
            </button>
          )}
          {step !== "review" ? (
            <button
              onClick={next}
              className="flex-1 h-12 rounded-full bg-accent text-white text-sm font-semibold tracking-wide hover:bg-accent-strong transition-colors"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleWhatsApp}
              className="flex-1 h-12 rounded-full bg-[#25D366] text-white text-sm font-semibold tracking-wide hover:bg-[#1da851] transition-colors flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-white flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Continue to WhatsApp →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
