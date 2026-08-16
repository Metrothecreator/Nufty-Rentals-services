// Curated visual assets for Nufty Rental Service.
// All real brand photography — no stock imagery used below.
// Hero slides: actual Nufty canopy setups (exterior).
// Services: real event photography matching each service type.
// Featured Work: real decorated event interiors, watermark-cropped.

// Logo — the real RNS brand mark
export const LOGO_SRC = "/images/logo-nufty.png";

export type GalleryImage = {
  src: string;
  alt: string;
  credit?: string;
};

// ---------------------------------------------------------------------------
// Cinematic Hero — scroll-image sequence fallback stages.
// Used by ScrollImageSequence when /sequences/canopy frames aren't present.
// We use the real Nufty hero photos as a 3-stage cinematic slideshow fallback.
// ---------------------------------------------------------------------------
export const CANOPY_FALLBACK_STAGES: GalleryImage[] = [
  {
    src: "/images/hero/hero-1-double-pagoda.jpg",
    alt: "Twin Nufty pagoda canopies dressed with tables and palm greenery — a grand outdoor event setup.",
  },
  {
    src: "/images/hero/hero-2-stadium-marquee.jpg",
    alt: "A large Nufty marquee tent erected at an outdoor stadium venue, showing event-scale capacity.",
  },
  {
    src: "/images/hero/hero-3-long-marquee.jpg",
    alt: "A long Nufty marquee structure with arched windows, seen from above at a residential venue.",
  },
];

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
export const SERVICES: {
  key: "canopy" | "setup" | "wedding" | "corporate" | "party" | "equipment";
  title: string;
  description: string;
  image: GalleryImage;
}[] = [
  {
    key: "canopy",
    title: "Canopy & Tent Rental",
    description:
      "Pagoda and marquee canopies built to shelter and shape any event — from intimate ceremonies to full-scale celebrations.",
    image: {
      src: "/images/hero/hero-1-double-pagoda.jpg",
      alt: "Twin Nufty pagoda canopies with decorated tables and palms for an outdoor event.",
    },
  },
  {
    key: "setup",
    title: "Event Setup & Décor",
    description:
      "From ceiling draping to floral centrepieces and Chiavari chairs, we dress every canopy so the space feels complete.",
    image: {
      src: "/images/work/work-interior-2.jpg",
      alt: "Inside a Nufty canopy dressed with peach ceiling draping, chandeliers, and floral centrepieces.",
    },
  },
  {
    key: "wedding",
    title: "Wedding Events",
    description:
      "We build the backdrop for the day itself — a canopy dressed for vows, receptions and everything after.",
    image: {
      src: "/images/services/service-wedding.jpg",
      alt: "A Nufty pagoda canopy with red carpet and tropical greenery set for a wedding celebration.",
    },
  },
  {
    key: "corporate",
    title: "Corporate Events",
    description:
      "Clean, professional canopy setups for conferences, product launches and company gatherings of any size.",
    image: {
      src: "/images/services/service-corporate.jpg",
      alt: "A single Nufty pagoda canopy set up at an outdoor corporate event with a lectern and floral display.",
    },
  },
  {
    key: "party",
    title: "Parties & Celebrations",
    description:
      "Birthdays, anniversaries and owambe — we bring the canopy, the ambience and all the finishing touches.",
    image: {
      src: "/images/work/work-outdoor-pagoda-row.jpg",
      alt: "A row of Nufty pagoda canopies dressed in red and white for a live outdoor celebration.",
    },
  },
  {
    key: "equipment",
    title: "Event Equipment Rental",
    description:
      "Chiavari chairs, banquet tables, linens and the small details that turn a canopy into a finished venue.",
    image: {
      src: "/images/work/work-interior-1.jpg",
      alt: "Inside a Nufty marquee — gold Chiavari chairs, round tables with floral centrepieces.",
    },
  },
];

// ---------------------------------------------------------------------------
// Featured Work — real client event photography
// Layout: [large-left, small-right, small-right, medium, medium, tall-right, wide-bottom]
// ---------------------------------------------------------------------------
export const FEATURED_WORK: GalleryImage[] = [
  {
    // Slot 0 — large hero card (col-span-4, row-span-2)
    src: "/images/work/work-interior-1.jpg",
    alt: "A fully dressed Nufty marquee interior — gold chairs, floral centrepieces and peach ceiling draping.",
  },
  {
    // Slot 1 — small (col-span-2)
    src: "/images/work/work-interior-2.jpg",
    alt: "Ceiling detail of a Nufty canopy — peach and white layered draping with a hanging chandelier.",
  },
  {
    // Slot 2 — small (col-span-2)
    src: "/images/work/work-outdoor-arch.jpg",
    alt: "Branded entrance arch for Lady Beatrice Wobo Nyeche — a full Nufty memorial event setup.",
  },
  {
    // Slot 3 — medium (col-span-3)
    src: "/images/work/work-interior-3.jpg",
    alt: "Wide view of a Nufty wedding reception — hundreds of gold chairs and white floral arrangements.",
  },
  {
    // Slot 4 — medium (col-span-3)
    src: "/images/work/work-outdoor-pagoda-row.jpg",
    alt: "Nufty pagoda row with live guests at an outdoor owambe celebration in Port Harcourt.",
  },
  {
    // Slot 5 — tall card (col-span-2, row-span-2)
    src: "/images/work/work-interior-4.jpg",
    alt: "Stage end of a Nufty marquee — decorated backdrop, flowers and rows of dressed tables.",
  },
  {
    // Slot 6 — wide bottom (col-span-4)
    src: "/images/work/work-interior-2.jpg",
    alt: "Close-up of peach ceiling draping and chandelier inside a Nufty decorated event marquee.",
  },
];
