"use client";
import Image from "next/image";
import { useCallback,useEffect,useState } from "react";
import Reveal from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { FEATURED_WORK } from "@/lib/assets";

const LAYOUT=["lg:col-span-7 lg:row-span-2","lg:col-span-5","lg:col-span-5","lg:col-span-5","lg:col-span-5","lg:col-span-5","lg:col-span-7"];
const CAPTIONS=["Wedding reception","Ceiling detail","Entrance & arrival","Wedding interior","Outdoor celebration","Marquee interior","Event draping"];
export default function FeaturedWork(){
 const [open,setOpen]=useState<number|null>(null);
 const close=useCallback(()=>setOpen(null),[]); const next=useCallback(()=>setOpen(i=>i===null?null:(i+1)%FEATURED_WORK.length),[]); const prev=useCallback(()=>setOpen(i=>i===null?null:(i-1+FEATURED_WORK.length)%FEATURED_WORK.length),[]);
 useEffect(()=>{if(open===null)return; document.body.style.overflow="hidden"; const key=(e:KeyboardEvent)=>{if(e.key==="Escape")close();if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev();};window.addEventListener("keydown",key);return()=>{document.body.style.overflow="";window.removeEventListener("keydown",key)}},[open,close,next,prev]);
 return <section id="work" className="bg-background px-6 py-28 sm:px-10 sm:py-40 lg:px-16"><div className="mx-auto max-w-[1400px]">
   <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end"><Reveal effect="reveal" className="lg:col-span-7"><p className="label mb-5 text-[10px] text-accent">Selected work</p><h2 className="font-display text-balance text-[clamp(2.8rem,5.8vw,5.4rem)] leading-[.93] tracking-[-.035em]">See what the setting can become.</h2></Reveal><Reveal effect="reveal" delay={120} className="lg:col-span-4 lg:col-start-9"><p className="text-sm leading-relaxed text-muted">A curated look at canopy structures, dressed interiors and event spaces from Nufty.</p></Reveal></div>
   <div className="grid auto-rows-[260px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[220px] lg:gap-4">
    {FEATURED_WORK.map((item,i)=><Reveal key={item.src+i} effect="reveal-scale" delay={(i%4)*70} className={`group relative overflow-hidden bg-cream ${LAYOUT[i]??"lg:col-span-4"}`}><button type="button" onClick={()=>setOpen(i)} className="absolute inset-0 h-full w-full text-left" aria-label={`View ${CAPTIONS[i]}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover transition-transform duration-1000 group-hover:scale-[1.045]"/><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80"/><div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white"><div><p className="label text-[8px] text-white/65">0{i+1}</p><p className="mt-1 font-display text-xl">{CAPTIONS[i]}</p></div><span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-sm transition group-hover:bg-white group-hover:text-black">↗</span></div></button></Reveal>)}
   </div>
   <div className="mt-12 flex flex-col items-center gap-5 text-center"><p className="text-sm text-muted">Planning something similar?</p><WhatsAppButton messageKey="general" variant="outline">Talk to Nufty</WhatsAppButton></div>
 </div>
 {open!==null&&<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-5" role="dialog" aria-modal="true"><button onClick={close} className="absolute right-5 top-5 h-11 w-11 rounded-full border border-white/20 text-2xl text-white">×</button><button onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 text-3xl text-white/70">←</button><div className="relative h-[78vh] w-full max-w-6xl"><Image src={FEATURED_WORK[open].src} alt={FEATURED_WORK[open].alt} fill sizes="95vw" className="object-contain" priority/></div><button onClick={next} aria-label="Next" className="absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 text-3xl text-white/70">→</button><p className="absolute bottom-6 left-0 right-0 text-center font-display text-xl text-white">{CAPTIONS[open]}</p></div>}
 </section>
}
