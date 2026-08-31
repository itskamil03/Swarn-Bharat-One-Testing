import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import OurBusinesses from "@/components/OurBusinesses/OurBusinesses";
import OffersSection from "@/components/OffersSection";
import RewardsPromoSection from "@/components/RewardsPromoSection";
import OurProjectsSection from "@/components/OurProjectsSection/OurProjectsSection";
import NewsEventsSection from "@/components/NewsEventsSection";
import LatestBlog from "@/components/LatestBlog/LatestBlog";
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
        <OffersSection />
        <RewardsPromoSection />
        <OurProjectsSection />
        <NewsEventsSection />
        <LatestBlog />
        <CareersBanner />
      </main>
      <Footer />
    </>
  );
}
