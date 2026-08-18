import Reveal from "@/components/ui/Reveal";

const SERVICES_LIST = [
  "Marquee tents", "Rope & pole tents", "Pagodas",
  "Decorations", "Generators", "Chairs", "Tables",
  "Synthetic rug", "Catering services", "Air conditioners",
  "Ushers", "Cooling",
];

export default function BrandIntro() {
  return (
    <section id="about" className="bg-background px-6 py-24 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-[1400px]">

        {/* EST badge + heading */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 mb-20">
          <Reveal effect="reveal" className="lg:col-span-3 flex flex-col gap-4">
            <div className="inline-flex flex-col items-start gap-1">
              <p className="label text-[9px] text-accent">Established</p>
              <p className="font-display text-5xl font-medium text-foreground leading-none">2002</p>
              <p className="label text-[8px] text-muted-2">24 years of excellence</p>
            </div>
          </Reveal>
          <Reveal effect="reveal" className="lg:col-span-8 lg:col-start-4">
            <h2 className="font-display text-[clamp(2.2rem,5.2vw,5.2rem)] font-medium leading-[1.08] tracking-[-.02em]">
              Your event deserves<br />
              <span className="italic text-black/40">a great setting.</span>
            </h2>
          </Reveal>
        </div>

        {/* Introduction */}
        <div className="grid gap-12 lg:grid-cols-12 mb-20 pb-20 border-b border-border">
          <Reveal effect="reveal" className="lg:col-span-3">
            <p className="label text-[9px] text-muted-2">Introduction</p>
          </Reveal>
          <div className="lg:col-span-8 lg:col-start-4 space-y-5">
            <Reveal effect="reveal">
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                Nufty Services is a home-based outfit, duly registered and incorporated in Nigeria to deliver quality and prompt services in the hospitality business.
              </p>
            </Reveal>
            <Reveal effect="reveal" delay={80}>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                We commenced business in October 2002 and boast of a rich 24 years of experience in events planning and management — undoubtedly one of the biggest and most experienced rental service outfits in Nigeria.
              </p>
            </Reveal>
            <Reveal effect="reveal" delay={140}>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                Nufty Services has a national network and outreach that covers the entire country. From Kebbi to Abia, from Edo to Anambra — our team has made our services available in every part of Nigeria.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid gap-12 lg:grid-cols-12 mb-20 pb-20 border-b border-border">
          <Reveal effect="reveal" className="lg:col-span-3">
            <p className="label text-[9px] text-muted-2">Our Purpose</p>
          </Reveal>
          <div className="lg:col-span-8 lg:col-start-4 grid sm:grid-cols-2 gap-10">
            <Reveal effect="reveal">
              <div>
                <p className="label text-[10px] text-accent mb-3">Vision</p>
                <p className="text-sm leading-relaxed text-muted">
                  Customer satisfaction driven — we are determined to serve our clients with quality, prompt and pocket-friendly services.
                </p>
              </div>
            </Reveal>
            <Reveal effect="reveal" delay={100}>
              <div>
                <p className="label text-[10px] text-accent mb-3">Mission</p>
                <p className="text-sm leading-relaxed text-muted">
                  To provide cutting-edge services in the hospitality business at the best possible cost, and to ensure our clients are served promptly and satisfactorily.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Services list + stats */}
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal effect="reveal" className="lg:col-span-3">
            <p className="label text-[9px] text-muted-2">What We Offer</p>
          </Reveal>
          <div className="lg:col-span-8 lg:col-start-4">
            <Reveal effect="reveal">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 mb-12">
                {SERVICES_LIST.map((s, i) => (
                  <div key={s} className="flex items-center gap-2.5">
                    <span className="h-px w-4 bg-accent/50 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{s}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal effect="reveal" delay={80}>
              <div className="grid grid-cols-3 gap-1 bg-border">
                {[
                  { num: "2002", label: "Est." },
                  { num: "500+", label: "Events" },
                  { num: "36", label: "States served" },
                ].map(s => (
                  <div key={s.label} className="bg-background px-5 py-6 text-center">
                    <p className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium leading-none text-foreground">{s.num}</p>
                    <p className="label text-[8px] text-muted-2 mt-2">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}
