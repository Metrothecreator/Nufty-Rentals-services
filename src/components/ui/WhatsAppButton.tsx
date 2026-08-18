"use client";
import type { ReactNode } from "react";
import { useBooking } from "./BookingProvider";
import { getWhatsAppLink, type WhatsAppMessageKey } from "@/lib/whatsapp";

type Variant = "solid" | "outline" | "ghost" | "bare";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  solid:   "bg-accent text-white hover:bg-accent-strong border border-accent hover:border-accent-strong",
  outline: "bg-transparent text-current border border-current/40 hover:border-current hover:bg-current/5",
  ghost:   "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm",
  bare:    "bg-transparent text-inherit border-none p-0 hover:opacity-70",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.7rem]",
  md: "px-6 py-3.5 text-[0.75rem]",
  lg: "px-8 py-4.5 text-[0.8rem]",
};

export default function WhatsAppButton({
  messageKey = "general",
  children,
  variant = "solid",
  size = "md",
  className = "",
  icon = true,
  ariaLabel,
  useModal = false,
}: {
  messageKey?: WhatsAppMessageKey;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: boolean;
  ariaLabel?: string;
  useModal?: boolean;
}) {
  const { open } = useBooking();

  const waIcon = (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.1em] w-[1.1em] shrink-0 fill-current transition-transform duration-300 group-hover:scale-110">
      <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.86.5 3.6 1.4 5.1L2 22l5.05-1.36a9.94 9.94 0 0 0 4.97 1.33h.01c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.93-7.07A9.94 9.94 0 0 0 12.02 2Zm5.85 14.28c-.25.7-1.45 1.34-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.2-1.6-1.2-3.05 0-1.46.76-2.17 1.03-2.47.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.01.96.3.15.49.22.56.35.08.13.08.72-.18 1.42Z"/>
    </svg>
  );

  const baseClass = `group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-out ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (useModal) {
    return (
      <button
        type="button"
        onClick={open}
        aria-label={ariaLabel ?? "Book with Nufty Rentals"}
        className={baseClass}
      >
        {icon && waIcon}
        {children}
      </button>
    );
  }

  return (
    <a
      href={getWhatsAppLink(messageKey)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? "Chat with Nufty Rental Service on WhatsApp"}
      className={baseClass}
    >
      {icon && waIcon}
      {children}
    </a>
  );
}
