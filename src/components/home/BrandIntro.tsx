import Reveal from "@/components/ui/Reveal";

const SERVICES_LIST = [
  "Marquee tents",
  "Rope and pole tents",
  "Pagodas",
  "Decorations",
  "Generators",
  "Chairs",
  "Tables",
  "Synthetic rug",
  "Catering services",
  "Air conditioners",
  "Ushers",
  "Cooling",
];

export default function BrandIntro() {
  return (
    <section id="about" className="bg-background px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Intro header */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal effect="reveal" className="lg:col-span-3">
            <p className="label text-[10px] text-accent">The Nufty Standard</p>
          </Reveal>
          <Reveal effect="reveal" className="lg:col-span-8 lg:col-start-4">
            <h2 className="font-display text-[clamp(2.4rem,5.6vw,5.6rem)] font-medium leading-[1.08] tracking-[-.02em]">
              Your event deserves<br />
              <span className="italic text-black/40">a great setting.</span>
            </h2>
          </Reveal>
          <div className="hidden lg:col-span-3 lg:block" />
          <Reveal effect="reveal" delay={120} className="lg:col-span-6 lg:col-start-4">
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              From the first canopy pole to the final finishing touch, Nufty creates event spaces
              that feel considered, comfortable and ready for the moment.
            </p>
          </Reveal>
          <Reveal effect="reveal" delay={180} className="lg:col-span-3 lg:col-start-10 lg:flex lg:justify-end">
            <div className="mt-1 border-l border-foreground/15 pl-5">
              <span className="label text-[9px] text-muted-2">Based in</span>
              <p className="mt-2 font-display text-2xl">Rumuigbo</p>
              <p className="text-xs text-muted">Port Harcourt</p>
              <span className="label mt-5 block text-[9px] text-muted-2">Established</span>
              <p className="mt-1.5 font-display text-2xl">2002</p>
            </div>
          </Reveal>
        </div>

        {/* Introduction */}
        <div className="mt-24 grid gap-10 lg:mt-36 lg:grid-cols-12 lg:gap-8">
          <Reveal effect="reveal" className="lg:col-span-3">
            <p className="label text-[10px] text-accent">Introduction</p>
          </Reveal>
          <Reveal effect="reveal" delay={100} className="lg:col-span-8 lg:col-start-4">
            <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Nufty Services is a home-based outfit, duly registered and incorporated in Nigeria,
                delivering quality and prompt services in the hospitality business.
              </p>
              <p>
                Nufty Services commenced business in October 2002 and boasts of rich 24 years of
                experience in events planning and management. We are undoubtedly one of the biggest
                and most experienced rental services outfits in Nigeria.
              </p>
              <p>
                Nufty Services has a national network and outreach that covers the entire country —
                from Kebbi to Abia, from Edo to Anambra — and our team have over the years made our
                services available in every part of Nigeria.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Vision & Mission */}
        <div className="mt-20 grid gap-px bg-foreground/10 sm:grid-cols-2 lg:mt-28">
          <Reveal effect="reveal" className="bg-background p-8 sm:p-10">
            <p className="label text-[9px] text-accent">Vision Statement</p>
            <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">
              Customer satisfaction driven.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              We are determined to serve our clients with quality, prompt and pocket-friendly
              services.
            </p>
          </Reveal>
          <Reveal effect="reveal" delay={120} className="bg-background p-8 sm:p-10">
            <p className="label text-[9px] text-accent">Mission Statement</p>
            <div className="mt-6 space-y-3">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                To provide cutting-edge services in the hospitality business at the best possible cost.
              </p>
              <p className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                To ensure our clients are served promptly and satisfactorily.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Our Services */}
        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <Reveal effect="reveal" className="lg:col-span-3">
            <p className="label text-[10px] text-accent">Our Services</p>
          </Reveal>
          <Reveal effect="reveal" delay={100} className="lg:col-span-8 lg:col-start-4">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES_LIST.map((service, i) => (
                <li
                  key={service}
                  className="flex items-center gap-3 border-b border-foreground/10 py-3 text-sm text-foreground sm:text-base"
                >
                  <span className="font-display text-xs text-accent/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
