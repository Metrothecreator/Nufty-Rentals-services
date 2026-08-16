import Navbar from "@/components/home/Navbar";
import CinematicHero from "@/components/home/CinematicHero";
import BrandIntro from "@/components/home/BrandIntro";
import Services from "@/components/home/Services";
import FeaturedWork from "@/components/home/FeaturedWork";
import Process from "@/components/home/Process";
import Location from "@/components/home/Location";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="home">
        <CinematicHero />
        <BrandIntro />
        <Services />
        <FeaturedWork />
        <Process />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
