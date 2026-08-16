import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { SERVICES } from "@/lib/assets";

export default function Services(){return <section id="services" className="bg-ink px-6 py-28 text-white sm:px-10 sm:py-40 lg:px-16">
  <div className="mx-auto max-w-[1400px]">
    <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-12 lg:items-end">
      <Reveal effect="reveal" className="lg:col-span-7"><p className="label mb-5 text-[10px] text-gold">What we do</p><h2 className="font-display text-balance text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[.94] tracking-[-.035em]">Spaces that make the occasion.</h2></Reveal>
      <Reveal effect="reveal" delay={120} className="lg:col-span-4 lg:col-start-9"><p className="text-sm leading-relaxed text-white/55">Choose the kind of setting you need. Tell us the occasion, date and location and we&apos;ll take it from there.</p></Reveal>
    </div>
    <div className="divide-y divide-white/10">
      {SERVICES.map((service,i)=><Reveal key={service.key} effect="reveal" delay={i*50}><article className="group grid gap-7 py-9 sm:py-11 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-1"><span className="font-display text-xl text-white/25">{String(i+1).padStart(2,"0")}</span></div>
        <div className="relative aspect-[16/10] overflow-hidden lg:col-span-4 lg:aspect-[4/3]"><Image src={service.image.src} alt={service.image.alt} fill sizes="(max-width:1024px) 100vw, 34vw" className="object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-black/10"/></div>
        <div className="lg:col-span-5"><h3 className="font-display text-2xl sm:text-3xl">{service.title}</h3><p className="mt-3 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">{service.description}</p></div>
        <div className="lg:col-span-2 lg:justify-self-end"><WhatsAppButton messageKey={service.key} variant="outline" size="sm">Enquire</WhatsAppButton></div>
      </article></Reveal>)}
    </div>
  </div>
</section>}
