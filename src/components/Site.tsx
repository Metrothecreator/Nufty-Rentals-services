"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import { Stats, Services, Projects, Process, About, Testimonials, FinalCTA, Footer } from "./Sections";
import { useQuote } from "./QuoteProvider";

export default function Site() {
  const { openQuote } = useQuote();
  return (
    <>
      <Navbar />
      <main id="home">
        <Hero onQuote={openQuote} />
        <Stats />
        <Services />
        <Projects />
        <Process />
        <About />
        <Testimonials />
        <FinalCTA onQuote={openQuote} />
      </main>
      <Footer />
    </>
  );
}
