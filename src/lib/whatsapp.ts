// Central WhatsApp configuration for Nufty Rental Service.
// Every enquiry on the site routes through WhatsApp — there is no
// booking system, no payments, and no accounts.

export const WHATSAPP_NUMBER = "2348033448671";

export const PHONE_NUMBERS = ["08033448671", "08054782270"];

export const ADDRESS = {
  line1: "609 Ikwere Road",
  line2: "Rumuigbo",
  line3: "Port Harcourt, Nigeria",
};

export const WHATSAPP_MESSAGES = {
  general:
    "Hello Nufty Rental Service, I found your website and I'd like to enquire about your event rental services.",
  canopy:
    "Hello Nufty Rental Service, I'd like to enquire about renting a canopy for my event.",
  wedding:
    "Hello Nufty Rental Service, I'd like to enquire about canopy and rental services for my wedding.",
  corporate:
    "Hello Nufty Rental Service, I'd like to enquire about renting a canopy and equipment for a corporate event.",
  party:
    "Hello Nufty Rental Service, I'd like to enquire about renting a canopy for a party or celebration.",
  setup:
    "Hello Nufty Rental Service, I'd like to enquire about full event setup and decor services.",
  equipment:
    "Hello Nufty Rental Service, I'd like to enquire about renting event chairs, tables and equipment.",
  quote:
    "Hello Nufty Rental Service, I'd like to get a quote for an upcoming event.",
} as const;

export type WhatsAppMessageKey = keyof typeof WHATSAPP_MESSAGES;

export function getWhatsAppLink(messageKey: WhatsAppMessageKey = "general") {
  const text = encodeURIComponent(WHATSAPP_MESSAGES[messageKey]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
