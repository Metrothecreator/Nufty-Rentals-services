// Central brand + content config for Cubix.
// Swap these placeholders with real values/assets as they arrive.

export const BRAND = {
  name: "cubix",
  displayName: "Cubix",
  tagline: "Construction & Architecture",
  phone: "0707 839 6158",
  phoneIntl: "+234 707 839 6158",
  whatsapp: "2347078396158",
  email: "Ziiarchitecture00@gmail.com",
  location: "Abuja · Port Harcourt",
  founded: "",
};

// Neon golden-yellow accent used across the UI (matches the brand's golden hex icon).
export const ACCENT = "#ffc619";

export const LOGO_SRC = "/logo.png";

export type Project = {
  key: string;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
};

export const PROJECTS: Project[] = [
  {
    key: "residential",
    title: "Modern Family Residence",
    category: "Residential",
    location: "Abuja",
    image: "/seq/frame-03.jpg",
    description:
      "A warm, minimalist home built around natural light, durable materials and clean architectural lines.",
  },
  {
    key: "interior",
    title: "Penthouse Interior",
    category: "Interior",
    location: "Port Harcourt",
    image: "/seq/frame-04.jpg",
    description:
      "A double-height living space finished in concrete, oak and brass — crafted end-to-end by our team.",
  },
  {
    key: "commercial",
    title: "Commercial Headquarters",
    category: "Commercial",
    location: "Abuja",
    image: "/seq/frame-05.jpg",
    description:
      "A landmark commercial building delivered on time and on budget, from foundation to facade.",
  },
  {
    key: "structure",
    title: "Structural Build",
    category: "Construction",
    location: "Port Harcourt",
    image: "/seq/frame-02.jpg",
    description:
      "Precision structural engineering and site management for a complex multi-storey concrete build.",
  },
];

export const SERVICES = [
  {
    key: "architectural",
    title: "Architectural Design",
    description:
      "Concept, planning and detailed drawings that turn a brief into a buildable, beautiful space.",
  },
  {
    key: "construction",
    title: "Construction",
    description:
      "Full build delivery — foundations to finishes — managed by one accountable team.",
  },
  {
    key: "renovation",
    title: "Renovation & Fit-out",
    description:
      "Transforming existing spaces with considered refurbishment and interior fit-out.",
  },
  {
    key: "management",
    title: "Project Management",
    description:
      "Budgets, schedules, contractors and quality — coordinated so you don't have to.",
  },
  {
    key: "interior",
    title: "Interior Design",
    description:
      "Materials, lighting and finishes that make a finished build feel considered.",
  },
  {
    key: "consulting",
    title: "Consulting & Surveys",
    description:
      "Feasibility, site surveys and cost planning before a single spade hits the ground.",
  },
];

export const PROCESS = [
  {
    n: "01",
    title: "Consult",
    copy: "We listen, walk the site and turn your goals into a clear, costed brief.",
  },
  {
    n: "02",
    title: "Design",
    copy: "Concepts and drawings, refined with you until every detail is right.",
  },
  {
    n: "03",
    title: "Build",
    copy: "Our team delivers the build to specification, schedule and budget.",
  },
  {
    n: "04",
    title: "Handover",
    copy: "We walk you through the finished space and stand behind the work.",
  },
];
