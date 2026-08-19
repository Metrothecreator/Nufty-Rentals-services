# Cubix — Construction & Architecture

Design-led construction and architecture marketing site with a scroll-driven
3D showcase animation.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS 4
- TypeScript

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

- `src/components/Hero.tsx` — scroll-driven animation hero
- `src/components/ScrollSequence.tsx` — canvas keyframe crossfade engine
- `src/components/QuoteModal.tsx` / `QuoteProvider.tsx` — enquiry flow (WhatsApp)
- `src/components/Sections.tsx` — services, projects, process, about, testimonials, CTA, footer
- `src/lib/site.ts` — brand + content config (swap placeholders here)

## TODO (placeholders to replace)

- `public/logo.png` — generated placeholder mark
- `public/seq/frame-*.jpg` — generated placeholder imagery
- `src/lib/site.ts` — real contact details, location, founded year
