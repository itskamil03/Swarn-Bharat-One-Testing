"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import AboutHeroSlider from "@/features/about/AboutHeroSlider/AboutHeroSlider";
import styles from "./page.module.css";

const ecosystemJourney = [
  {
    step: "01",
    tag: "Instant SSO",
    badgeTitle: "STAGE 01 • UNIFIED ONBOARDING",
    title: "Create Your Unified Account",
    shortTitle: "Instant SSO",
    lead: "Sign up in 30 seconds to receive your unique Swarn ID and welcome Swarn Coins.",
    bullets: [
      "Instant 30-sec identity verification with zero friction or paperwork",
      "+250 Welcome Swarn Coins automatically credited on signup",
      "One master credential securely unlocking all 7+ partner portals"
    ],
    metricValue: "+250",
    metricLabel: "Welcome Coins",
    subMetric: "0 Passwords Needed",
    logEvent: "Ledger Grant: +250 Welcome Coins Dispatched",
    logHash: "TXN #SB-9021-SSO",
    logStatus: "Verified",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    )
  },
  {
    step: "02",
    tag: "7+ Portals",
    badgeTitle: "STAGE 02 • MULTI-PORTAL SYNC",
    title: "Explore Across Connected Verticals",
    shortTitle: "7+ Verticals",
    lead: "Access jobs, properties, shopping, matchmaking, and education without re-registering.",
    bullets: [
      "Seamless single-click transitions between independent ecosystems",
      "Unified profile sync: preferences and member tier carry over instantly",
      "Live cross-navigation between Real Estate, Mart, Jobs, Matrimony & Academy"
    ],
    metricValue: "7 Portals",
    metricLabel: "Unified Access",
    subMetric: "100% Shared Identity",
    logEvent: "Ecosystem Sync: 7 Verticals Handshake Confirmed",
    logHash: "TXN #SB-9022-PORTALS",
    logStatus: "Active",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    )
  },
  {
    step: "03",
    tag: "Auto Rewards",
    badgeTitle: "STAGE 03 • AUTOMATED ACCRUAL",
    title: "Earn Swarn Rewards Automatically",
    shortTitle: "Auto Rewards",
    lead: "Every purchase, subscription, and verified milestone credits coins straight to your wallet.",
    bullets: [
      "Real-time cashpoint accruals on shopping, courses, & asset bookings",
      "Milestone loyalty multipliers as your cross-platform engagement expands",
      "No manual claims or vouchers required—fully automated attribution"
    ],
    metricValue: "Up to 5%",
    metricLabel: "Cashback Rate",
    subMetric: "Instant Ledger Accrual",
    logEvent: "Smart Contract: Auto Cashpoint +120 Coins Accrued",
    logHash: "TXN #SB-9023-REWARD",
    logStatus: "Credited",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    step: "04",
    tag: "Encrypted Vault",
    badgeTitle: "STAGE 04 • CENTRAL SECURITY",
    title: "Centralized Ledger Security",
    shortTitle: "Encrypted Vault",
    lead: "All your earned coins are protected and safely tracked in your central profile.",
    bullets: [
      "Bank-grade 256-bit cryptographic encryption on all asset balances",
      "Immutable transaction history accessible 24/7 across all devices",
      "Multi-factor biometric verification & enterprise fraud prevention"
    ],
    metricValue: "256-Bit",
    metricLabel: "Vault Encryption",
    subMetric: "Immutable Ledger Guard",
    logEvent: "Vault Audit: Cryptographic Ledger Signature Validated",
    logHash: "TXN #SB-9024-VAULT",
    logStatus: "Protected",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    step: "05",
    tag: "1:1 Value Utility",
    badgeTitle: "STAGE 05 • UNIVERSAL UTILITY",
    title: "Redeem Across the Universe",
    shortTitle: "Universal Utility",
    lead: "Spend coins on real estate tokenization discounts, e-commerce vouchers, or career courses.",
    bullets: [
      "Guaranteed 1:1 true utility valuation across all group businesses",
      "Redeem on real asset investments, lifestyle retail, or tuition fees",
      "Compounding loop: every redemption unlocks new tier multiplier perks"
    ],
    metricValue: "1:1 Utility",
    metricLabel: "Redemption Value",
    subMetric: "Universal Acceptance",
    logEvent: "Redemption Ready: 1:1 Asset Voucher Exchange Enabled",
    logHash: "TXN #SB-9025-REDEEM",
    logStatus: "Active",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
];

const ecosystemCards = [
  {
    number: "01",
    tag: "Cloud & Enterprise",
    title: "Technology & Cloud",
    description: "Enterprise cloud solutions, high-scale software architectures, and AI-driven innovations for modern businesses.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    link: "/#businesses"
  },
  {
    number: "02",
    tag: "Urban & Spaces",
    title: "Real Estate & Infrastructure",
    description: "Premium commercial spaces, township residential ventures, and transparent land investments across India.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <line x1="9" y1="9" x2="9" y2="9.01" />
        <line x1="9" y1="13" x2="9" y2="13.01" />
        <line x1="9" y1="17" x2="9" y2="17.01" />
      </svg>
    ),
    link: "/#businesses"
  },
  {
    number: "03",
    tag: "Youth & Learning",
    title: "Students Portal & EdTech",
    description: "Skill certifications, competitive preparation, scholarships, and career counseling for India's youth.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    link: "/#businesses"
  },
  {
    number: "04",
    tag: "Talent & ATS",
    title: "Jobs & Talent Marketplace",
    description: "Connecting verified talent with leading enterprises, startups, and public sector opportunities.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    link: "/careers"
  },
  {
    number: "05",
    tag: "Heritage & Bonds",
    title: "Matrimonial Network",
    description: "Trusted, secure, and meaningful matchmaking services honoring cultural heritage with modern safety.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    link: "/#businesses"
  },
  {
    number: "06",
    tag: "CSR & Community",
    title: "Foundation & Impact",
    description: "Philanthropic initiatives in healthcare, grassroots education, women empowerment, and sustainability.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
    link: "/#impact"
  },
  {
    number: "07",
    tag: "Retail & Rewards",
    title: "E-Commerce & Retail",
    description: "Curated lifestyle shopping, local artisan goods, and value-packed offers with instant Swarn Rewards.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    link: "/offers"
  },
  {
    number: "08",
    tag: "Fintech & Future",
    title: "Innovation & Future Tech",
    description: "Incubating cutting-edge fintech, decentralized ledgers, and sustainable green technology initiatives.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    link: "/#businesses"
  }
];

export default function AboutPage() {
  const [walletCoins, setWalletCoins] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoopPaused, setIsLoopPaused] = useState(false);

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

  // Circular loop auto-cycle
  useEffect(() => {
    if (isLoopPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 3800);
    return () => clearInterval(timer);
  }, [isLoopPaused]);

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

            <div className={styles.ecosystemGrid}>
              {ecosystemCards.map((card, idx) => (
                <Link
                  key={card.number}
                  href={card.link}
                  className={`${styles.ecoCard} ${styles.reveal} ${styles[`d${(idx % 4) + 1}`]}`}
                  style={{ "--card-idx": idx }}
                >
                  <div className={styles.ecoCardGlow} aria-hidden="true" />
                  <div className={styles.ecoCardTopRow}>
                    <div className={styles.ecoIconWrap}>
                      {card.icon}
                    </div>
                    <span className={styles.ecoNumber}>{card.number}</span>
                  </div>

                  <div className={styles.ecoCategoryTag}>{card.tag}</div>
                  <h3 className={styles.ecoCardTitle}>{card.title}</h3>
                  <p className={styles.ecoCardDesc}>{card.description}</p>

                  <div className={styles.ecoFooterRow}>
                    <span className={styles.ecoActionText}>Explore Vertical</span>
                    <svg className={styles.ecoArrowIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              ))}
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

        {/* ================= HOW IT WORKS: CIRCULAR VALUE LOOP ================= */}
        <section id="journey" className={`${styles.section} ${styles.loopSection}`}>
          <div className={styles.loopBgPattern} aria-hidden="true" />
          <div className={styles.loopAmbientGlow} aria-hidden="true" />

          <div className={styles.container}>
            <div className={styles.secHeaderCenter}>
              <div className={`${styles.loopEyebrowBadge} ${styles.reveal}`}>
                <span className={styles.loopSparkle}>✦</span>
                <span>HOW IT WORKS</span>
                <span className={styles.loopPill}>CIRCULAR VALUE LOOP</span>
              </div>
              <h2 className={`${styles.secTitle} ${styles.loopSecTitle} ${styles.reveal} ${styles.d1}`}>
                How Rewards &amp; Value <span className={styles.loopTitleHighlight}>Continuously Compound</span>
              </h2>
              <p className={`${styles.secSub} ${styles.reveal} ${styles.d2}`}>
                From unified signup to continuous auto-accrual and universal redemption—an interconnected cycle designed to reward you across every touchpoint.
              </p>
            </div>

            {/* Interactive Step Navigator Pipeline */}
            <div
              className={`${styles.stepperNavWrapper} ${styles.reveal} ${styles.d1}`}
              onMouseEnter={() => setIsLoopPaused(true)}
              onMouseLeave={() => setIsLoopPaused(false)}
            >
              <div className={styles.stepperTrack}>
                {ecosystemJourney.map((item, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      className={`${styles.stepperTabBtn} ${isActive ? styles.stepperTabActive : ""}`}
                      onClick={() => setActiveStep(idx)}
                      aria-label={`Step ${item.step}: ${item.title}`}
                    >
                      <span className={styles.stepperNum}>{item.step}</span>
                      <span className={styles.stepperLabel}>{item.shortTitle}</span>
                      {isActive && <span className={styles.stepperActiveDot} />}
                    </button>
                  );
                })}
              </div>
              <div className={styles.stepperProgressTrack}>
                <div
                  className={styles.stepperProgressBar}
                  style={{ width: `${((activeStep + 1) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Executive Studio 2-Column Split Canvas */}
            <div
              className={`${styles.studioCanvas} ${styles.reveal} ${styles.d2}`}
              onMouseEnter={() => setIsLoopPaused(true)}
              onMouseLeave={() => setIsLoopPaused(false)}
            >
              {/* Left Column: Spotlight Active Stage Details */}
              <div className={styles.studioSpotlightCol}>
                <div className={styles.spotlightCard}>
                  <div className={styles.spotlightHeader}>
                    <div className={styles.spotlightBadgeRow}>
                      <span className={styles.spotlightStageTag}>
                        {ecosystemJourney[activeStep].badgeTitle}
                      </span>
                      <span className={styles.spotlightCategoryPill}>
                        {ecosystemJourney[activeStep].tag}
                      </span>
                    </div>
                    <div className={styles.spotlightIconWrapper}>
                      {ecosystemJourney[activeStep].icon}
                    </div>
                  </div>

                  <h3 className={styles.spotlightTitle}>
                    {ecosystemJourney[activeStep].title}
                  </h3>
                  <p className={styles.spotlightLead}>
                    {ecosystemJourney[activeStep].lead}
                  </p>

                  <div className={styles.spotlightBullets}>
                    {ecosystemJourney[activeStep].bullets.map((b, i) => (
                      <div key={i} className={styles.spotlightBulletRow}>
                        <div className={styles.spotlightCheckIcon}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stage Metrics Bar */}
                  <div className={styles.spotlightMetricRow}>
                    <div className={styles.spotlightMetricCard}>
                      <span className={styles.metricVal}>
                        {ecosystemJourney[activeStep].metricValue}
                      </span>
                      <span className={styles.metricLbl}>
                        {ecosystemJourney[activeStep].metricLabel}
                      </span>
                    </div>
                    <div className={styles.spotlightMetricCard}>
                      <span className={styles.metricSubVal}>
                        {ecosystemJourney[activeStep].subMetric}
                      </span>
                      <span className={styles.metricLbl}>Frictionless Delivery</span>
                    </div>
                  </div>

                  {/* Navigation & CTA Controls */}
                  <div className={styles.spotlightControls}>
                    <div className={styles.stepBtnGroup}>
                      <button
                        type="button"
                        className={styles.prevStepBtn}
                        onClick={() => setActiveStep((prev) => (prev === 0 ? 4 : prev - 1))}
                        title="Previous Stage"
                        aria-label="Previous Stage"
                      >
                        ← Prev
                      </button>
                      <button
                        type="button"
                        className={styles.nextStepBtn}
                        onClick={() => setActiveStep((prev) => (prev === 4 ? 0 : prev + 1))}
                        title="Next Stage"
                        aria-label="Next Stage"
                      >
                        Next →
                      </button>
                    </div>

                    <Link href="/register" className={styles.spotlightCta}>
                      <span>Activate Swarn ID</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Swarn Digital Pass & Real-Time Ledger Hub */}
              <div className={styles.studioLedgerCol}>
                <div className={styles.ledgerHubCard}>
                  {/* The Swarn Sovereign Gold Card */}
                  <div className={styles.swarnSovereignCard}>
                    <div className={styles.cardShimmerOverlay} />
                    <div className={styles.cardTopRow}>
                      <div className={styles.cardBrand}>
                        <div className={styles.cardLogoBox}>S</div>
                        <div>
                          <div className={styles.cardBrandName}>SWARN BHARAT</div>
                          <div className={styles.cardBrandSub}>SOVEREIGN PASS</div>
                        </div>
                      </div>
                      <div className={styles.cardChipBox}>
                        <div className={styles.chipCircuit} />
                        <span className={styles.cardContactless}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                            <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                            <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className={styles.cardNumber}>
                      <span>SB-8829</span>
                      <span>••••</span>
                      <span>••••</span>
                      <span>4091</span>
                    </div>

                    <div className={styles.cardBottomRow}>
                      <div>
                        <div className={styles.cardMetaLbl}>TOTAL AVAILABLE BALANCE</div>
                        <div className={styles.cardBalanceAmount}>
                          <span className={styles.cardCoinIcon}>🪙</span>
                          <strong>{walletCoins.toLocaleString()}</strong>
                          <span className={styles.cardCoinsUnit}>Swarn Coins</span>
                        </div>
                      </div>
                      <div className={styles.cardTierBadge}>
                        <span>GOLD SOVEREIGN</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Ecosystem Ledger Terminal */}
                  <div className={styles.liveLedgerTerminal}>
                    <div className={styles.terminalHeader}>
                      <div className={styles.terminalStatusDot}>
                        <span className={styles.pulseDot} />
                        <span>LIVE CENTRAL LEDGER AUDIT</span>
                      </div>
                      <span className={styles.terminalSyncBadge}>7/7 PORTALS SYNCED</span>
                    </div>

                    {/* Active Stage Simulated Ledger Event */}
                    <div className={styles.activeLedgerEvent}>
                      <div className={styles.eventLeft}>
                        <span className={styles.eventIcon}>⚡</span>
                        <div>
                          <div className={styles.eventTitle}>
                            {ecosystemJourney[activeStep].logEvent}
                          </div>
                          <div className={styles.eventSub}>
                            {ecosystemJourney[activeStep].logHash} · <span className={styles.eventTime}>Just Now</span>
                          </div>
                        </div>
                      </div>
                      <span className={styles.eventStatusBadge}>
                        {ecosystemJourney[activeStep].logStatus}
                      </span>
                    </div>

                    {/* Quick Verticals Micro-Grid */}
                    <div className={styles.verticalsRow}>
                      <span className={styles.vertChip}>🏢 Real Estate</span>
                      <span className={styles.vertChip}>🛍️ Mart</span>
                      <span className={styles.vertChip}>💼 Jobs</span>
                      <span className={styles.vertChip}>🎓 Academy</span>
                      <span className={styles.vertChip}>💍 Matrimony</span>
                      <span className={styles.vertChip}>🤝 Foundation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Loop Flow Status Ribbon */}
            <div className={`${styles.loopRibbonWrap} ${styles.reveal} ${styles.d3}`}>
              <div className={styles.loopRibbonTrack}>
                <div className={`${styles.loopRibbonItem} ${activeStep === 0 ? styles.ribbonItemActive : ""}`}>
                  <strong>01</strong> Instant SSO
                </div>
                <div className={styles.loopRibbonArrow}>➔</div>
                <div className={`${styles.loopRibbonItem} ${activeStep === 1 ? styles.ribbonItemActive : ""}`}>
                  <strong>02</strong> 7+ Verticals
                </div>
                <div className={styles.loopRibbonArrow}>➔</div>
                <div className={`${styles.loopRibbonItem} ${activeStep === 2 ? styles.ribbonItemActive : ""}`}>
                  <strong>03</strong> Auto Rewards
                </div>
                <div className={styles.loopRibbonArrow}>➔</div>
                <div className={`${styles.loopRibbonItem} ${activeStep === 3 ? styles.ribbonItemActive : ""}`}>
                  <strong>04</strong> Encrypted Vault
                </div>
                <div className={styles.loopRibbonArrow}>➔</div>
                <div className={`${styles.loopRibbonItem} ${activeStep === 4 ? styles.ribbonItemActive : ""}`}>
                  <strong>05</strong> 1:1 Value Utility
                </div>
                <div className={styles.loopRibbonArrow}>➔</div>
                <div className={`${styles.loopRibbonItem} ${styles.loopRibbonLoopTag}`}>
                  <span>🔁 Continuous Compounding Loop</span>
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
