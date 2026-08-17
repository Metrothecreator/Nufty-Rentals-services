// Booking flow configuration for Nufty Rentals.
// Everything here is pure data + helpers so it can be used by both the
// booking modal and any server-rendered component.

import { WHATSAPP_NUMBER } from "./whatsapp";
import type { WhatsAppMessageKey } from "./whatsapp";

export type EventType =
  | "Wedding"
  | "Birthday / Party"
  | "Corporate"
  | "Burial / Memorial"
  | "Outdoor Event"
  | "Other";

export type ServiceType =
  | "Canopy / Tent"
  | "Chairs"
  | "Tables"
  | "Decoration"
  | "Lighting"
  | "Other";

export const EVENT_TYPES: EventType[] = [
  "Wedding",
  "Birthday / Party",
  "Corporate",
  "Burial / Memorial",
  "Outdoor Event",
  "Other",
];

export const BOOKING_SERVICES: ServiceType[] = [
  "Canopy / Tent",
  "Chairs",
  "Tables",
  "Decoration",
  "Lighting",
  "Other",
];

export type BookingPrefill = {
  eventType?: EventType;
  services?: ServiceType[];
};

export type BookingData = {
  eventType: EventType | "";
  eventOther: string;
  services: ServiceType[];
  serviceOther: string;
  date: string;
  location: string;
  guests: string;
  message: string;
};

export function emptyBookingData(): BookingData {
  return {
    eventType: "",
    eventOther: "",
    services: [],
    serviceOther: "",
    date: "",
    location: "",
    guests: "",
    message: "",
  };
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function eventLabel(eventType: EventType | "", eventOther: string): string {
  if (eventType === "Other" && eventOther.trim()) return `Other (${eventOther.trim()})`;
  return eventType;
}

export function servicesLabel(services: ServiceType[], serviceOther: string): string {
  return services
    .map((s) => (s === "Other" && serviceOther.trim() ? `Other (${serviceOther.trim()})` : s))
    .join(", ");
}

export function buildBookingMessage(data: BookingData): string {
  const lines: string[] = [
    "Hello Nufty Rentals 👋",
    "",
    "I'd like to make an enquiry.",
    "",
    `Event: ${eventLabel(data.eventType, data.eventOther)}`,
    `Date: ${formatDate(data.date)}`,
    `Location: ${data.location.trim()}`,
    `Guests: ${data.guests.trim()}`,
    `Services: ${servicesLabel(data.services, data.serviceOther)}`,
  ];

  if (data.message.trim()) {
    lines.push("");
    lines.push(data.message.trim());
  }

  lines.push("", "I'd like to know your availability and quotation.", "", "Thank you.");

  return lines.join("\n");
}

export function buildBookingWhatsAppLink(data: BookingData): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBookingMessage(data))}`;
}

// Map the existing per-section message keys to a sensible prefill so the
// "Enquire" buttons on each service start the flow one step ahead.
export function prefillForMessageKey(key: WhatsAppMessageKey): BookingPrefill {
  switch (key) {
    case "canopy":
      return { services: ["Canopy / Tent"] };
    case "wedding":
      return { eventType: "Wedding", services: ["Canopy / Tent", "Decoration"] };
    case "corporate":
      return { eventType: "Corporate" };
    case "party":
      return { eventType: "Birthday / Party" };
    case "setup":
      return { eventType: "Burial / Memorial" };
    case "equipment":
      return { services: ["Chairs", "Tables"] };
    default:
      return {};
  }
}
