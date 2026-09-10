import Navbar from "@/components/layout/Navbar/Navbar";
import Hero from "@/features/home/Hero/Hero";
import WhoWeAreSection from "@/features/home/WhoWeAreSection/WhoWeAreSection";
import OurBusinesses from "@/features/home/OurBusinesses/OurBusinesses";
import OffersSection from "@/features/home/OffersSection/OffersSection";
import RewardsPromoSection from "@/features/rewards/RewardsPromoSection/RewardsPromoSection";
import ReferralEarnSection from "@/features/home/ReferralEarnSection/ReferralEarnSection";
import OurProjectsSection from "@/features/home/OurProjectsSection/OurProjectsSection";
import NewsEventsSection from "@/features/events/NewsEventsSection/NewsEventsSection";
import LatestBlog from "@/features/home/LatestBlog/LatestBlog";
import CareersBanner from "@/features/home/CareersBanner/CareersBanner";
import Footer from "@/components/layout/Footer/Footer";

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
        <ReferralEarnSection />
        <OurProjectsSection />
        <NewsEventsSection />
        <LatestBlog />
        <CareersBanner />
      </main>
      <Footer />
    </>
  );
}
