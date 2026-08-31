"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Rewards/HeroSection";
import StatsStrip from "@/components/Rewards/StatsStrip";
import RewardFlow from "@/components/Rewards/RewardFlow";
import Ecosystem from "@/components/Rewards/Ecosystem";
import ExclusiveRewards from "@/components/Rewards/ExclusiveRewards";
import Activity from "@/components/Rewards/Activity";
import FaqSection from "@/components/Rewards/FaqSection";
import CtaBand from "@/components/Rewards/CtaBand";
import styles from "@/components/Rewards/Rewards.module.css";

export default function RewardsPage() {
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      // Find elements that have the global 'reveal' or 'revealStagger' class
      // Note: Because some components use styles.reveal if I missed replacing them, 
      // I'll select by checking the className string for "reveal"
      const revealEls = document.querySelectorAll('[class*="reveal"], [class*="flowPanel"]');
      
      revealEls.forEach(el => el.classList.add("revealReady"));
      
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inView");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -60px 0px' });
      
      revealEls.forEach(el => io.observe(el));

      return () => io.disconnect();
    }
  }, []);

  return (
    <div className={styles.rewardsContainer}>
      <Navbar />
      <main>
        <HeroSection />
        <StatsStrip />
        <RewardFlow />
        <Ecosystem />
        <ExclusiveRewards />
        <Activity />
        <FaqSection />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
