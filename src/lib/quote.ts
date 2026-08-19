// Quote flow config for Cubix.

export const PROJECT_TYPES = [
  "New Build",
  "Renovation",
  "Commercial Fit-out",
  "Interior Design",
  "Extension",
  "Other",
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const SCOPE_OPTIONS = [
  "Architectural Design",
  "Full Construction",
  "Renovation / Fit-out",
  "Project Management",
  "Interior Design",
  "Consulting",
] as const;
export type Scope = (typeof SCOPE_OPTIONS)[number];

export const BUDGETS = [
  "Under $50k",
  "$50k – $150k",
  "$150k – $500k",
  "$500k – $1M",
  "$1M+",
] as const;

export type QuoteData = {
  name: string;
  projectType: ProjectType | "";
  scope: Scope[];
  location: string;
  budget: string;
  timeline: string;
  message: string;
};

export const emptyQuote = (): QuoteData => ({
  name: "",
  projectType: "",
  scope: [],
  location: "",
  budget: "",
  timeline: "",
  message: "",
});

export function buildQuoteMessage(d: QuoteData): string {
  const lines = [
    "Hello Cubix 👋",
    "",
    "I'd like to discuss a project.",
    "",
    `Name: ${d.name.trim()}`,
    `Project type: ${d.projectType}`,
    `Services needed: ${d.scope.join(", ") || "—"}`,
    `Location: ${d.location.trim()}`,
    `Budget: ${d.budget}`,
    `Timeline: ${d.timeline.trim() || "—"}`,
  ];
  if (d.message.trim()) lines.push("", d.message.trim());
  lines.push("", "Please get back to me with availability and next steps.", "", "Thank you.");
  return lines.join("\n");
}

export function buildQuoteWhatsAppLink(d: QuoteData, number: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(buildQuoteMessage(d))}`;
}
