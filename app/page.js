import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import OurBusinesses from "@/components/OurBusinesses/OurBusinesses";
import OurProjectsSection from "@/components/OurProjectsSection/OurProjectsSection";
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
        <OurBusinesses />
        <OurProjectsSection />
        <NewsEventsSection />
        <CareersBanner />
      </main>
      <Footer />
    </>
  );
}
