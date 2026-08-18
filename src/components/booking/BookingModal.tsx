"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  BOOKING_SERVICES,
  EVENT_TYPES,
  buildBookingWhatsAppLink,
  emptyBookingData,
  eventLabel,
  formatDate,
  servicesLabel,
  type BookingData,
  type BookingPrefill,
  type EventType,
  type ServiceType,
} from "@/lib/booking";

const STEPS = ["Event", "Services", "Details", "Review"];

const inputClass =
  "w-full rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-2 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

// ── Icons ──────────────────────────────────────────────────────────────
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      {children}
    </svg>
  );
}

const EVENT_ICONS: Record<EventType, ReactNode> = {
  Wedding: (
    <Icon>
      <circle cx="9.2" cy="15" r="5" />
      <circle cx="14.8" cy="15" r="5" />
      <path d="M12 5.5v2.5" />
    </Icon>
  ),
  "Birthday / Party": (
    <Icon>
      <path d="M12 4c-2.8 0-5 2.3-5 5 0 .9.3 1.7.8 2.3.9 1.1 2.7 1.2 4.2 1.2s3.3-.1 4.2-1.2c.5-.6.8-1.4.8-2.3 0-2.7-2.2-5-5-5z" />
      <path d="M12 12.5V19M8.5 21h7" />
    </Icon>
  ),
  Corporate: (
    <Icon>
      <rect x="3" y="7.5" width="18" height="13" rx="2" />
      <path d="M8.5 7.5v-2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3 12.5h18" />
    </Icon>
  ),
  "Burial / Memorial": (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5V4M12 20v-1M5 12H4M20 12h-1M7.05 7.05l-.7-.7M16.95 16.95l-.7-.7M16.95 7.05l-.7-.7M7.05 16.95l-.7-.7" />
    </Icon>
  ),
  "Outdoor Event": (
    <Icon>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </Icon>
  ),
  Other: (
    <Icon>
      <circle cx="6" cy="12" r="1.2" />
      <circle cx="12" cy="12" r="1.2" />
      <circle cx="18" cy="12" r="1.2" />
    </Icon>
  ),
};

const SERVICE_ICONS: Record<ServiceType, ReactNode> = {
  "Canopy / Tent": (
    <Icon>
      <path d="M12 4 3 20h18L12 4z" />
      <path d="M12 4v16" />
    </Icon>
  ),
  Chairs: (
    <Icon>
      <path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
      <path d="M5 11a2 2 0 1 0 0 4h14a2 2 0 1 0 0-4" />
      <path d="M5 15v4M19 15v4" />
    </Icon>
  ),
  Tables: (
    <Icon>
      <path d="M3 8h18" />
      <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </Icon>
  ),
  Decoration: (
    <Icon>
      <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
    </Icon>
  ),
  Lighting: (
    <Icon>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.6.5 1 1.3 1 2V16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-.5c0-.7.4-1.5 1-2A6 6 0 0 0 12 3z" />
    </Icon>
  ),
  Other: (
    <Icon>
      <circle cx="6" cy="12" r="1.2" />
      <circle cx="12" cy="12" r="1.2" />
      <circle cx="18" cy="12" r="1.2" />
    </Icon>
  ),
};

// ── Small building blocks ─────────────────────────────────────────────
function SelectCard({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "relative flex flex-col items-center justify-center gap-2.5 rounded-2xl border px-3 py-4 text-center transition-all duration-200",
        selected
          ? "border-accent bg-accent-soft/60 text-accent"
          : "border-border bg-white/60 text-foreground hover:border-accent/40 hover:bg-white",
      ].join(" ")}
    >
      {selected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            <path d="M5 12l4 4L19 6" />
          </svg>
        </span>
      )}
      <span className={selected ? "text-accent" : "text-muted-2"}>{icon}</span>
      <span className="text-xs font-medium leading-tight">{label}</span>
    </button>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-0">
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">
        {label}
      </span>
      <span className="text-right text-sm text-foreground">{value}</span>
    </div>
  );
}

// ── Validation ────────────────────────────────────────────────────────
function validate(step: number, data: BookingData): string | null {
  if (step === 0 && !data.eventType) return "Please choose an event type to continue.";
  if (step === 1 && data.services.length === 0) return "Please select at least one service.";
  if (step === 2) {
    if (!data.date) return "Please choose your event date.";
    if (!data.location.trim()) return "Please tell us where the event will take place.";
    const g = Number(data.guests);
    if (!data.guests.trim() || !Number.isFinite(g) || g < 1)
      return "Please enter an estimated number of guests.";
  }
  return null;
}

// ── Modal ─────────────────────────────────────────────────────────────
export default function BookingModal({
  prefill,
  onClose,
}: {
  prefill?: BookingPrefill;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(() => ({ ...emptyBookingData(), ...prefill }));
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const update = (patch: Partial<BookingData>) => setData((d) => ({ ...d, ...patch }));

  const toggleService = (s: ServiceType) =>
    setData((d) => ({
      ...d,
      services: d.services.includes(s) ? d.services.filter((x) => x !== s) : [...d.services, s],
    }));

  const error = validate(step, data);

  const goNext = () => {
    if (error) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setAttempted(false);
    setStep((s) => Math.max(0, s - 1));
  };

  const today = new Date().toISOString().split("T")[0];
  const waLink = buildBookingWhatsAppLink(data);

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book Nufty on WhatsApp"
        className="animate-modal-in relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-surface text-foreground shadow-2xl sm:rounded-3xl"
      >
        {/* Header */}
        <div className="border-b border-border px-6 pb-4 pt-5 sm:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-9 w-1.5 rounded-full bg-gold" />
              <div className="leading-tight">
                <p className="font-display text-xl leading-none">Book your event</p>
                <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-muted-2">
                  Nufty Rental Service
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-2 transition hover:border-foreground/30 hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-2">
              <span>
                Step {step + 1} of {STEPS.length}
              </span>
              <span className="text-accent">{STEPS[step]}</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {step === 0 && (
            <div>
              <h3 className="font-display text-2xl">What type of event?</h3>
              <p className="mt-1 text-sm text-muted">Tell us the occasion you&apos;re planning.</p>
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {EVENT_TYPES.map((ev) => (
                  <SelectCard
                    key={ev}
                    selected={data.eventType === ev}
                    onClick={() => update({ eventType: ev })}
                    icon={EVENT_ICONS[ev]}
                    label={ev}
                  />
                ))}
              </div>
              {data.eventType === "Other" && (
                <input
                  type="text"
                  value={data.eventOther}
                  onChange={(e) => update({ eventOther: e.target.value })}
                  placeholder="Please specify your event"
                  className={`${inputClass} mt-3`}
                />
              )}
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="font-display text-2xl">What do you need?</h3>
              <p className="mt-1 text-sm text-muted">Select all that apply.</p>
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {BOOKING_SERVICES.map((s) => (
                  <SelectCard
                    key={s}
                    selected={data.services.includes(s)}
                    onClick={() => toggleService(s)}
                    icon={SERVICE_ICONS[s]}
                    label={s}
                  />
                ))}
              </div>
              {data.services.includes("Other") && (
                <input
                  type="text"
                  value={data.serviceOther}
                  onChange={(e) => update({ serviceOther: e.target.value })}
                  placeholder="Please specify the service"
                  className={`${inputClass} mt-3`}
                />
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-2xl">Event details</h3>
                <p className="mt-1 text-sm text-muted">Date, location and how many guests.</p>
              </div>
              <Field label="Event date" required>
                <input
                  type="date"
                  min={today}
                  value={data.date}
                  onChange={(e) => update({ date: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Event location" required>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => update({ location: e.target.value })}
                  placeholder="e.g. Port Harcourt"
                  className={inputClass}
                />
              </Field>
              <Field label="Estimated guests" required>
                <input
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={data.guests}
                  onChange={(e) => update({ guests: e.target.value })}
                  placeholder="e.g. 150"
                  className={inputClass}
                />
              </Field>
              <Field label="Message (optional)">
                <textarea
                  rows={3}
                  value={data.message}
                  onChange={(e) => update({ message: e.target.value })}
                  placeholder="Anything else we should know?"
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-2xl">Review your enquiry</h3>
              <p className="mt-1 text-sm text-muted">Check everything looks right before sending.</p>
              <div className="mt-5 rounded-2xl border border-border bg-white/60 px-4 py-2">
                <SummaryRow label="Event" value={eventLabel(data.eventType, data.eventOther)} />
                <SummaryRow label="Date" value={formatDate(data.date)} />
                <SummaryRow label="Location" value={data.location.trim()} />
                <SummaryRow label="Guests" value={data.guests.trim()} />
                <SummaryRow label="Services" value={servicesLabel(data.services, data.serviceOther)} />
                {data.message.trim() && <SummaryRow label="Message" value={data.message.trim()} />}
              </div>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-gold">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                Continuing will open WhatsApp with your enquiry pre-filled — you can add more before you send.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-background/60 px-6 py-4 sm:px-8">
          {attempted && error && (
            <p className="mb-3 text-xs font-medium text-accent">{error}</p>
          )}
          <div className="flex items-center gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={goBack}
                className="flex h-12 shrink-0 items-center justify-center rounded-full border border-border px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground transition hover:border-foreground/30"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="flex h-12 shrink-0 items-center justify-center rounded-full border border-border px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition hover:border-foreground/30 hover:text-foreground"
              >
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-accent-strong"
              >
                Continue
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            ) : (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#1da851]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Continue to WhatsApp →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
