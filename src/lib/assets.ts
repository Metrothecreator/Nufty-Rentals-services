export const LOGO_SRC = "/images/logo-rns.png";

export type GalleryImage = {
  src: string;
  alt: string;
  category?: string;
};

export const CANOPY_FALLBACK_STAGES: GalleryImage[] = [
  { src: "/sequences/canopy/frame_0001.jpg", alt: "Canopy setup — opening scene." },
  { src: "/sequences/canopy/frame_0060.jpg", alt: "Canopy setup — early stage." },
  { src: "/sequences/canopy/frame_0120.jpg", alt: "Canopy setup — mid transformation." },
  { src: "/sequences/canopy/frame_0180.jpg", alt: "Canopy setup — near completion." },
  { src: "/sequences/canopy/frame_0240.jpg", alt: "Canopy fully dressed and ready." },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/work/work-memorial-marquee.jpg",    alt: "Custom memorial and civic marquee with branded entrance facade.",  category: "Memorial & Formal" },
  { src: "/images/work/work-wedding-interior-1.jpg",  alt: "Grand hall wedding interior with orange and peach ceiling draping.", category: "Wedding" },
  { src: "/images/work/work-banquet-interior.jpg",    alt: "Luxury banquet table and chiavari seating setup.",                  category: "Wedding" },
  { src: "/images/work/work-pagoda-row.jpg",          alt: "Multi-peak pagoda canopy row on lawn for outdoor reception.",       category: "Outdoor Reception" },
  { src: "/images/work/work-double-pagoda.jpg",       alt: "Twin pagoda VIP venue with glass panels and manicured lawn.",      category: "Corporate & VIP" },
  { src: "/images/work/work-garden-pagoda.jpg",       alt: "Garden ceremony pagoda with arched windows.",                      category: "Ceremonial" },
  { src: "/images/work/work-stadium-marquee.jpg",     alt: "Stadium-scale A-frame marquee for large public gatherings.",       category: "Large Events" },
  { src: "/images/work/work-wedding-interior-2.jpg",  alt: "Draped ceiling reception with gold chairs and floral centrepieces.", category: "Wedding" },
  { src: "/images/work/work-corporate-canopy.jpg",    alt: "Corporate canopy setup for outdoor conference and registration.",   category: "Corporate & VIP" },
];

export const SERVICE_IMAGES: Record<string, string> = {
  canopy:    "/images/work/work-pagoda-row.jpg",
  wedding:   "/images/work/work-wedding-interior-1.jpg",
  memorial:  "/images/work/work-memorial-marquee.jpg",
  corporate: "/images/work/work-double-pagoda.jpg",
  outdoor:   "/images/work/work-garden-pagoda.jpg",
  large:     "/images/work/work-stadium-marquee.jpg",
  equipment: "/images/work/work-banquet-interior.jpg",
};

// ── FEATURED_WORK — used by FeaturedWork.tsx ─────────────
export const FEATURED_WORK: GalleryImage[] = [
  { src: "/images/work/work-wedding-interior-1.jpg", alt: "Wedding reception interior with orange ceiling draping and gold chiavari chairs." },
  { src: "/images/work/work-banquet-interior.jpg",   alt: "Ceiling detail — white and orange draped canopy interior." },
  { src: "/images/work/work-memorial-marquee.jpg",   alt: "Entrance and arrival — branded memorial marquee facade." },
  { src: "/images/work/work-wedding-interior-2.jpg", alt: "Wedding interior with floral centrepieces and round tables." },
  { src: "/images/work/work-pagoda-row.jpg",         alt: "Outdoor celebration — multi-peak pagoda row on lawn." },
  { src: "/images/work/work-double-pagoda.jpg",      alt: "Marquee interior view — twin pagoda VIP venue." },
  { src: "/images/work/work-stadium-marquee.jpg",    alt: "Event draping — stadium-scale marquee exterior." },
];

// ── SERVICES — used by Services.tsx ──────────────────────
export const SERVICES = [
  {
    key: "canopy" as const,
    title: "Canopy & Tent Rental",
    description: "Pagoda and marquee canopies built to shelter any event — from intimate gatherings to full-scale celebrations across Port Harcourt.",
    image: { src: "/images/work/work-pagoda-row.jpg", alt: "Multi-peak pagoda canopy row on a green lawn." },
  },
  {
    key: "wedding" as const,
    title: "Wedding Events",
    description: "Interior décor, draped ceilings, chandeliers and gold Chiavari seating — a canopy dressed for vows, receptions and everything after.",
    image: { src: "/images/work/work-wedding-interior-1.jpg", alt: "Grand wedding interior with orange and peach ceiling draping." },
  },
  {
    key: "setup" as const,
    title: "Memorial & Burial Ceremonies",
    description: "Custom-branded marquees with entrance facades, side drapery and artificial grass flooring for dignified, large-scale ceremonies.",
    image: { src: "/images/work/work-memorial-marquee.jpg", alt: "Branded memorial marquee with custom entrance facade." },
  },
  {
    key: "corporate" as const,
    title: "Corporate & VIP Events",
    description: "Twin pagoda and architectural marquee structures for conferences, product launches and corporate gatherings of any size.",
    image: { src: "/images/work/work-double-pagoda.jpg", alt: "Twin pagoda VIP venue with glass panels." },
  },
  {
    key: "party" as const,
    title: "Outdoor & Garden Events",
    description: "Garden ceremony setups, lawn receptions and any outdoor occasion — we bring shelter, staging and atmosphere.",
    image: { src: "/images/work/work-garden-pagoda.jpg", alt: "Garden ceremony pagoda with arched windows." },
  },
  {
    key: "equipment" as const,
    title: "Event Equipment Rental",
    description: "Chiavari chairs, banquet tables, linens, chargers and the details that make a canopy feel like a finished venue.",
    image: { src: "/images/work/work-banquet-interior.jpg", alt: "Luxury banquet table and chiavari seating setup." },
  },
];
