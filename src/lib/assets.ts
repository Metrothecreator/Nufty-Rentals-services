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
