import Reveal from "@/components/ui/Reveal";

export default function BrandIntro(){return <section id="about" className="bg-background px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
  <div className="mx-auto max-w-[1400px]">
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <Reveal effect="reveal" className="lg:col-span-3"><p className="label text-[10px] text-accent">The Nufty Standard</p></Reveal>
      <Reveal effect="reveal-clip" className="lg:col-span-8 lg:col-start-4">
        <h2 className="font-display text-balance text-[clamp(2.7rem,6.2vw,6.2rem)] font-medium leading-[.95] tracking-[-.035em]">Your event deserves <span className="italic text-black/45">a great setting.</span></h2>
      </Reveal>
      <div className="hidden lg:col-span-3 lg:block"/>
      <Reveal effect="reveal" delay={120} className="lg:col-span-6 lg:col-start-4">
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">From the first canopy pole to the final finishing touch, Nufty creates event spaces that feel considered, comfortable and ready for the moment.</p>
      </Reveal>
      <Reveal effect="reveal" delay={180} className="lg:col-span-3 lg:col-start-10 lg:flex lg:justify-end">
        <div className="mt-1 border-l border-foreground/15 pl-5"><span className="label text-[9px] text-muted-2">Based in</span><p className="mt-2 font-display text-2xl">Rumuigbo</p><p className="text-xs text-muted">Port Harcourt</p></div>
      </Reveal>
    </div>
  </div>
</section>}
