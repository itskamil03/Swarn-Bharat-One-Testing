"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import AboutHeroSlider from "@/features/about/AboutHeroSlider/AboutHeroSlider";
import styles from "./page.module.css";

export default function AboutPage() {
  const [walletCoins, setWalletCoins] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);

  const timelineRef = useRef(null);

  // Numbers Count-up
  useEffect(() => {
    const dur = 1400;
    const start = performance.now();
    let animId;
    const frame = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setWalletCoins(Math.round(2450 * eased));
      if (p < 1) animId = requestAnimationFrame(frame);
    };

    const timer = setTimeout(() => {
      animId = requestAnimationFrame(frame);
    }, 300);

    return () => {
      clearTimeout(timer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Reveal observer
  useEffect(() => {
    const revealEls = document.querySelectorAll(`.${styles.reveal}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.revealIn);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Timeline Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      let progress = (vh * 0.75 - rect.top) / total;
      progress = Math.max(0, Math.min(1, progress));
      setTimelineProgress(progress * 100);
      const activeIdx = Math.floor(progress * 5);
      setActiveStep(activeIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className={styles.aboutPage}>
        {/* ================= CINEMATIC ANIMATED HERO SLIDER ================= */}
        <AboutHeroSlider />

        {/* ================= WHO WE ARE / STORY ================= */}
        <section id="story" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.storyGrid}>
              <div className={`${styles.storyVisualWrap} ${styles.reveal}`}>
                <div className={styles.storyImageFrame}>
                  <img src="/images/mission.jpg" alt="Our Mission & Story" className={styles.storyImg} />
                  <div className={styles.storyBadge}>
                    <div className={styles.storyLogoLetter}>S</div>
                    <div className={styles.storyBadgeText}>
                      <strong>Swarn Bharat Group</strong>
                      <span>People. Platforms. Possibilities.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.storyContentWrap}>
                <div className={`${styles.eyebrow} ${styles.reveal}`}>Who We Are</div>
                <h2 className={`${styles.secTitle} ${styles.reveal} ${styles.d1}`}>
                  More Than Independent Portals. One Interconnected National Platform.
                </h2>
                <p className={`${styles.secSub} ${styles.reveal} ${styles.d2}`}>
                  Swarn Bharat is an interconnected ecosystem of digital and physical platforms created to serve diverse consumer and enterprise needs while delivering one frictionless, rewarding experience.
                </p>

                <div className={styles.featuresGrid}>
                  <div className={`${styles.featureCard} ${styles.reveal} ${styles.d1}`}>
                    <div className={styles.featureIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" />
                      </svg>
                    </div>
                    <h4>Single Identity (SSO)</h4>
                    <p>One unified account unlocks every service and portal seamlessly.</p>
                  </div>

                  <div className={`${styles.featureCard} ${styles.reveal} ${styles.d2}`}>
                    <div className={styles.featureIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </div>
                    <h4>Unified Swarn Wallet</h4>
                    <p>Earn, store, and manage your Swarn Coins across the whole ecosystem.</p>
                  </div>

                  <div className={`${styles.featureCard} ${styles.reveal} ${styles.d3}`}>
                    <div className={styles.featureIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                      </svg>
                    </div>
                    <h4>Earn Everywhere</h4>
                    <p>Get recognized and rewarded on shopping, transactions, and learning.</p>
                  </div>

                  <div className={`${styles.featureCard} ${styles.reveal} ${styles.d4}`}>
                    <div className={styles.featureIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" />
                      </svg>
                    </div>
                    <h4>Universal Redemption</h4>
                    <p>Use your earned coins across all partner portals, discounts, and real assets.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ECOSYSTEM VERTICALS ================= */}
        <section id="ecosystem" className={`${styles.section} ${styles.bgPaper}`}>
          <div className={styles.container}>
            <div className={styles.secHeaderRow}>
              <div>
                <div className={`${styles.eyebrow} ${styles.reveal}`}>Our Ecosystem</div>
                <h2 className={`${styles.secTitle} ${styles.reveal} ${styles.d1}`}>
                  Built Around Every Stage of Modern Life &amp; Growth
                </h2>
                <p className={`${styles.secSub} ${styles.reveal} ${styles.d2}`}>
                  From skill development and career advancement to property investment, matrimonial matches, and e-commerce.
                </p>
              </div>
              <Link href="/#businesses" className={`${styles.goldArrowLink} ${styles.reveal}`}>
                View All Businesses &rarr;
              </Link>
            </div>

            <div className={`${styles.ecosystemGrid} ${styles.reveal} ${styles.d2}`}>
              <div className={styles.ecoCard}>
                <div className={styles.ecoIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" />
                  </svg>
                </div>
                <h3>Technology &amp; Cloud</h3>
                <p>Enterprise cloud solutions, high-scale software architectures, and AI-driven innovations for modern businesses.</p>
              </div>

              <div className={styles.ecoCard}>
                <div className={styles.ecoIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" />
                  </svg>
                </div>
                <h3>Real Estate &amp; Infrastructure</h3>
                <p>Premium commercial spaces, township residential ventures, and transparent land investments across India.</p>
              </div>

              <div className={styles.ecoCard}>
                <div className={styles.ecoIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 9l10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
                  </svg>
                </div>
                <h3>Students Portal &amp; EdTech</h3>
                <p>Skill certifications, competitive preparation, scholarships, and career counseling for India&apos;s youth.</p>
              </div>

              <div className={styles.ecoCard}>
                <div className={styles.ecoIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </div>
                <h3>Jobs &amp; Talent Marketplace</h3>
                <p>Connecting verified talent with leading enterprises, startups, and public sector opportunities.</p>
              </div>

              <div className={styles.ecoCard}>
                <div className={styles.ecoIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s-8-4.6-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 6.4-8 11-8 11Z" />
                  </svg>
                </div>
                <h3>Matrimonial Network</h3>
                <p>Trusted, secure, and meaningful matchmaking services honoring cultural heritage with modern safety.</p>
              </div>

              <div className={styles.ecoCard}>
                <div className={styles.ecoIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                  </svg>
                </div>
                <h3>Foundation &amp; Impact</h3>
                <p>Philanthropic initiatives in healthcare, grassroots education, women empowerment, and sustainability.</p>
              </div>

              <div className={styles.ecoCard}>
                <div className={styles.ecoIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="9" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" /><path d="M2 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H6" />
                  </svg>
                </div>
                <h3>E-Commerce &amp; Retail</h3>
                <p>Curated lifestyle shopping, local artisan goods, and value-packed offers with instant Swarn Rewards.</p>
              </div>

              <div className={styles.ecoCard}>
                <div className={styles.ecoIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <h3>Innovation &amp; Future Tech</h3>
                <p>Incubating cutting-edge fintech, decentralized ledgers, and sustainable green technology initiatives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LEADERSHIP TEAM ================= */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.secHeaderRow}>
              <div>
                <div className={`${styles.eyebrow} ${styles.reveal}`}>Our Leadership</div>
                <h2 className={`${styles.secTitle} ${styles.reveal} ${styles.d1}`}>
                  Guided by Experienced Visionaries &amp; Innovators
                </h2>
                <p className={`${styles.secSub} ${styles.reveal} ${styles.d2}`}>
                  A dedicated team of industry pioneers driving governance, operational excellence, and lasting social impact.
                </p>
              </div>
              <Link href="/careers" className={`${styles.goldArrowLink} ${styles.reveal}`}>
                Join Our Team &rarr;
              </Link>
            </div>

            <div className={`${styles.teamGrid} ${styles.reveal} ${styles.d2}`}>
              <div className={styles.teamCard}>
                <div className={styles.teamAvatar}>
                  AK
                  <div className={styles.teamLiBadge}>in</div>
                </div>
                <h3>Aditya Kumar</h3>
                <div className={styles.teamRole}>Founder &amp; Managing Director</div>
                <p>Steering the strategic vision, capital allocation, and nationwide growth of Swarn Bharat Group.</p>
              </div>

              <div className={styles.teamCard}>
                <div className={styles.teamAvatar}>
                  RS
                  <div className={styles.teamLiBadge}>in</div>
                </div>
                <h3>Rahul Sharma</h3>
                <div className={styles.teamRole}>Chief Technology Officer</div>
                <p>Architecting the core digital infrastructure, microservices, and unified identity engine.</p>
              </div>

              <div className={styles.teamCard}>
                <div className={styles.teamAvatar}>
                  MP
                  <div className={styles.teamLiBadge}>in</div>
                </div>
                <h3>Meera Patel</h3>
                <div className={styles.teamRole}>Head of Global Operations</div>
                <p>Overseeing multi-vertical governance, compliance, logistics, and partner brand networks.</p>
              </div>

              <div className={styles.teamCard}>
                <div className={styles.teamAvatar}>
                  TV
                  <div className={styles.teamLiBadge}>in</div>
                </div>
                <h3>Tarun Verma</h3>
                <div className={styles.teamRole}>Head of Product &amp; Growth</div>
                <p>Designing seamless cross-platform consumer journeys and the Swarn Rewards program.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS TIMELINE & WALLET ================= */}
        <section className={`${styles.section} ${styles.bgPaper}`}>
          <div className={styles.container}>
            <div className={styles.secHeaderCenter}>
              <div className={`${styles.eyebrow} ${styles.reveal}`}>The Connected Journey</div>
              <h2 className={`${styles.secTitle} ${styles.reveal} ${styles.d1}`}>
                How the Swarn Bharat Ecosystem Works for You
              </h2>
              <p className={`${styles.secSub} ${styles.reveal} ${styles.d2}`}>
                One seamless account creates an amplifying cycle of value across every life moment.
              </p>
            </div>

            <div className={styles.howItWorksLayout}>
              <div className={styles.timelineCol} ref={timelineRef}>
                <div className={styles.timelineTrack} />
                <div className={styles.timelineFill} style={{ height: `${timelineProgress}%` }} />

                {[
                  { title: "Create Your Unified Account", desc: "Sign up in 30 seconds to receive your unique Swarn ID and welcome Swarn Coins." },
                  { title: "Explore Across Verticals", desc: "Access jobs, properties, shopping, matchmaking, and education without re-registering." },
                  { title: "Earn Swarn Rewards Automatically", desc: "Every purchase, subscription, and verified milestone credits coins straight to your wallet." },
                  { title: "Centralized Ledger Security", desc: "All your earned coins are protected and safely tracked in your central profile." },
                  { title: "Redeem Across the Universe", desc: "Spend coins on real estate tokenization discounts, e-commerce vouchers, or career courses." }
                ].map((step, idx) => (
                  <div key={idx} className={`${styles.stepItem} ${idx <= activeStep ? styles.stepItemActive : ""}`}>
                    <div className={styles.stepNumberBadge}>0{idx + 1}</div>
                    <div>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`${styles.walletCol} ${styles.reveal} ${styles.d2}`}>
                <div className={styles.walletCard}>
                  <div className={styles.walletHeader}>
                    <div className={styles.walletGoldMark}>S</div>
                    <div>
                      <div className={styles.walletTitle}>Central Swarn Wallet</div>
                      <div className={styles.walletStatus}>Active · Verified Identity</div>
                    </div>
                  </div>

                  <div className={styles.walletBalanceLabel}>Total Available Balance</div>
                  <div className={styles.walletBalanceAmount}>
                    {walletCoins.toLocaleString()} <span>Swarn Coins</span>
                  </div>

                  <div className={styles.walletChipsRow}>
                    <div className={styles.walletChip}>
                      <strong>Earn</strong> Across 7+ Verticals
                    </div>
                    <div className={styles.walletChip}>
                      <strong>Spend</strong> Universal Acceptance
                    </div>
                    <div className={styles.walletChip}>
                      <strong>Save</strong> Exclusive Member Tier
                    </div>
                  </div>

                  <div className={styles.walletActionRow}>
                    <Link href="/register" className={styles.walletCtaBtn}>
                      Activate Your Wallet Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MISSION, VISION & COMPARISON ================= */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.mvGrid}>
              <div className={`${styles.mvCard} ${styles.reveal} ${styles.d1}`}>
                <div className={styles.mvIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                  </svg>
                </div>
                <h3>Our Mission</h3>
                <p>To empower every citizen and enterprise across Bharat with seamless access to essential digital infrastructure, fair economic opportunity, and shared prosperity under one unified platform.</p>
              </div>

              <div className={`${styles.mvCard} ${styles.reveal} ${styles.d2}`}>
                <div className={styles.mvIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3>Our Vision</h3>
                <p>To establish India&apos;s most admired and interconnected digital conglomerate, creating millions of livelihood opportunities and uplifting communities through sustainable technological innovation.</p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className={styles.comparisonWrapper}>
              <div className={`${styles.eyebrow} ${styles.reveal}`}>The Value Difference</div>
              <h2 className={`${styles.secTitle} ${styles.reveal} ${styles.d1}`}>
                Why an Integrated Ecosystem Outperforms Disconnected Apps
              </h2>

              <div className={`${styles.compareCardsGrid} ${styles.reveal} ${styles.d2}`}>
                <div className={`${styles.compareCard} ${styles.compareTraditional}`}>
                  <div className={styles.compareHeader}>
                    <span className={styles.compareCrossIcon}>✕</span>
                    Traditional Fragmented Experience
                  </div>
                  <ul className={styles.compareList}>
                    <li>Multiple separate logins &amp; passwords for every service</li>
                    <li>Siloed loyalty points that expire or cannot be transferred</li>
                    <li>Inconsistent user privacy &amp; fragmented data tracking</li>
                    <li>Friction-heavy navigation across disconnected providers</li>
                  </ul>
                </div>

                <div className={`${styles.compareCard} ${styles.compareSwarn}`}>
                  <div className={styles.compareHeader}>
                    <span className={styles.compareCheckIcon}>✓</span>
                    The Swarn Bharat Connected Ecosystem
                  </div>
                  <ul className={styles.compareList}>
                    <li>One unified Single Sign-On (SSO) identity everywhere</li>
                    <li>Universal Swarn Coins spendable across all 7+ verticals</li>
                    <li>Highest enterprise-grade privacy and unified data protection</li>
                    <li>Seamless cross-promotion, member discounts, and priority support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MID-PAGE CALL TO ACTION ================= */}
        <section className={styles.ctaBannerSection}>
          <div className={styles.container}>
            <div className={`${styles.ctaBannerCard} ${styles.reveal}`}>
              <div className={styles.ctaBannerGlow} />
              <div className={styles.ctaBannerContent}>
                <div className={styles.ctaBannerBadge}>Join The Movement</div>
                <h2>Experience the Power of One Connected Bharat</h2>
                <p>
                  Join over 1,000,000 citizens already benefiting from our unified services, jobs network, and shared rewards ecosystem.
                </p>
                <div className={styles.ctaBannerButtons}>
                  <Link href="/register" className={styles.primaryGoldBtn}>
                    Create Your Account Free
                  </Link>
                  <Link href="/#businesses" className={styles.secondaryOutlineBtn}>
                    Explore All Platforms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
