import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import OurBusinessesSection from "@/components/OurBusinessesSection";
import ProjectsSection from "@/components/ProjectsSection";
import StatsSection from "@/components/StatsSection";
import NewsEventsSection from "@/components/NewsEventsSection";
import CareersBanner from "@/components/CareersBanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhoWeAreSection />
        <OurBusinessesSection />
        <ProjectsSection />
        <StatsSection />
        <NewsEventsSection />
        <CareersBanner />
      </main>
      <Footer />
    </>
  );
}
