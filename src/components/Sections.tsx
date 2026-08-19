import Image from "next/image";
import Reveal from "./Reveal";
import Logo from "./Logo";
import { PROJECTS, PROCESS, SERVICES, BRAND } from "@/lib/site";

// ── Stats strip ────────────────────────────────────────────────
export function Stats() {
  const items = [
    { n: "120+", label: "Projects delivered" },
    { n: "18", label: "Years building" },
    { n: "40k", label: "Sq.m built" },
    { n: "98%", label: "On-time handover" },
  ];
  return (
    <section className="border-b border-foreground/10 bg-background">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-foreground/10 md:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="px-6 py-10 text-center sm:py-14">
            <p className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-none">{s.n}</p>
            <p className="label mt-3 text-[9px] text-muted-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Services ───────────────────────────────────────────────────
export function Services() {
  return (
    <section id="services" className="bg-ink px-6 py-28 text-white sm:px-10 sm:py-40 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label mb-5 text-[10px] text-gold">What we do</p>
            <h2 className="font-display text-balance text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[.94] tracking-[-.035em]">
              From concept to concrete.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-white/55">
              One team covering design, build and management — so the vision survives contact with the site.
            </p>
          </Reveal>
        </div>
        <div className="divide-y divide-white/10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.key} delay={i * 40}>
              <article className="grid gap-6 py-9 sm:py-11 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-1">
                  <span className="font-display text-xl text-white/25">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="font-display text-2xl sm:text-3xl">{s.title}</h3>
                </div>
                <div className="lg:col-span-5">
                  <p className="max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">{s.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────────
export function Projects() {
  return (
    <section id="work" className="bg-background px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label mb-5 text-[10px] text-accent">Selected work</p>
            <h2 className="font-display text-[clamp(2.4rem,5.2vw,5rem)] leading-[1.05] tracking-[-.025em]">
              Built to last,<br />
              designed to inspire.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-muted">A look at recent Cubix projects across residential, commercial and interiors.</p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[280px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[240px] lg:gap-4">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.key}
              effect="reveal-scale"
              delay={(i % 4) * 70}
              className={`group relative overflow-hidden bg-cream ${i === 0 ? "lg:col-span-7 lg:row-span-2" : i === 1 ? "lg:col-span-5" : "lg:col-span-6"}`}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width:1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.045]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-85" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                <div>
                  <p className="label text-[8px] text-white/65">{p.category} · {p.location}</p>
                  <p className="mt-1 font-display text-xl">{p.title}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 transition group-hover:bg-white group-hover:text-black">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Process ────────────────────────────────────────────────────
export function Process() {
  return (
    <section id="process" className="bg-cream px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="label mb-5 text-[10px] text-accent">How we work</p>
            <h2 className="font-display text-[clamp(2.7rem,5.5vw,5rem)] leading-[.95] tracking-[-.035em]">
              A clear path from idea to keys.
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-8 lg:flex lg:items-end">
            <p className="text-sm leading-relaxed text-muted">No surprises. One accountable team and a process you can follow at every stage.</p>
          </Reveal>
        </div>
        <div className="mt-20 grid gap-px bg-foreground/10 sm:grid-cols-4">
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="bg-cream p-7 sm:min-h-[300px] sm:p-9">
              <span className="font-display text-5xl text-accent/35">{s.n}</span>
              <div className="mt-16 border-t border-foreground/10 pt-6">
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="bg-background px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-3">
            <p className="label text-[10px] text-accent">Why Cubix</p>
          </Reveal>
          <Reveal className="lg:col-span-8 lg:col-start-4">
            <h2 className="font-display text-[clamp(2.4rem,5.6vw,5.6rem)] font-medium leading-[1.08] tracking-[-.02em]">
              Design and construction,<br />
              <span className="italic text-black/40">under one roof.</span>
            </h2>
          </Reveal>
          <div className="hidden lg:col-span-3 lg:block" />
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-4">
            <div className="max-w-xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Cubix is a construction and architectural company built on a simple belief: great spaces come from
                closing the gap between the drawing and the build. We design it, and we build it — so nothing is lost
                in translation.
              </p>
              <p>
                Every project is delivered by one accountable team, with craftsmanship, transparent budgets and a
                relentless focus on the finished space.
              </p>
            </div>
          </Reveal>
          <Reveal delay={180} className="lg:col-span-3 lg:col-start-10 lg:flex lg:justify-end">
            <div className="mt-1 border-l border-foreground/15 pl-5">
              <span className="label text-[9px] text-muted-2">Based in</span>
              <p className="mt-2 font-display text-2xl">{BRAND.location}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────
export function Testimonials() {
  const items = [
    {
      quote: "Cubix took us from a sketch to a finished home without a single surprise on budget. Extraordinary to watch the build come together.",
      name: "Residential client",
      role: "Abuja",
    },
    {
      quote: "The design team and the builders actually talk to each other. That shows in the finished space.",
      name: "Commercial client",
      role: "Port Harcourt",
    },
    {
      quote: "On time, on budget, and the quality speaks for itself. We'll be back for the next project.",
      name: "Developer",
      role: "Abuja",
    },
  ];
  return (
    <section className="bg-ink px-6 py-28 text-white sm:px-10 sm:py-40 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="label mb-5 text-[10px] text-gold">Kind words</p>
          <h2 className="font-display max-w-3xl text-balance text-[clamp(2.6rem,5vw,4.5rem)] leading-[.95] tracking-[-.03em]">
            What clients say about building with Cubix.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 90} className="bg-ink p-8 sm:p-10">
              <p className="font-display text-xl leading-relaxed text-white/85">“{t.quote}”</p>
              <p className="mt-8 font-display text-lg text-white">{t.name}</p>
              <p className="label mt-1 text-[9px] text-white/45">{t.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ────────────────────────────────────────────────────────
export function FinalCTA({ onQuote }: { onQuote: () => void }) {
  return (
    <section id="contact" className="relative min-h-[70vh] overflow-hidden bg-ink px-6 py-32 sm:px-10 lg:px-16">
      <Image src="/seq/frame-05.jpg" alt="" fill sizes="100vw" className="object-cover opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,.4),rgba(10,9,8,.78)_70%,rgba(10,9,8,.94))]" />
      <div className="relative flex min-h-[55vh] items-end justify-center text-center">
        <div className="max-w-4xl">
          <Reveal effect="reveal-clip">
            <p className="label mb-6 text-[10px] text-gold">Let&apos;s build together</p>
            <h2 className="font-display text-balance text-[clamp(3.2rem,8vw,7.5rem)] leading-[.9] tracking-[-.045em] text-white">
              Your next project <span className="italic text-white/65">starts here.</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Tell us what you&apos;re planning — we&apos;ll get back to you with the next steps.
            </p>
          </Reveal>
          <Reveal delay={260} className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={onQuote}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-9 py-4.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-accent-strong hover:text-white"
            >
              Start a project
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-background px-6 pb-8 pt-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 border-b border-foreground/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Logo size={44} dark={false} />
              <div>
                <p className="label text-[8px] text-muted-2">{BRAND.tagline}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Design-led construction and architecture — building spaces that last and inspire.
            </p>
          </div>
          <div className="lg:col-span-3">
            <p className="label mb-4 text-[9px] text-muted-2">Contact</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="w-fit hover:text-accent">{BRAND.phone}</a>
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-fit hover:text-accent">WhatsApp</a>
              <a href={`mailto:${BRAND.email}`} className="w-fit hover:text-accent">{BRAND.email}</a>
              <span className="text-muted">{BRAND.location}</span>
            </div>
          </div>
          <div className="lg:col-span-2">
            <p className="label mb-4 text-[9px] text-muted-2">Explore</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#services" className="w-fit hover:text-accent">Services</a>
              <a href="#work" className="w-fit hover:text-accent">Projects</a>
              <a href="#about" className="w-fit hover:text-accent">About</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-[10px] uppercase tracking-[.14em] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name}</p>
          <p>{BRAND.location}</p>
        </div>
      </div>
    </footer>
  );
}
