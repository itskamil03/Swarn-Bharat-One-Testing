"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [calculatorPoints, setCalculatorPoints] = useState(15000);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTier, setActiveTier] = useState("gold");
  const [claimedDaily, setClaimedDaily] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(24850);

  const [counterStats, setCounterStats] = useState({
    balance: 0,
    lifetime: 0,
    redeemed: 0,
    members: 0,
  });

  // Animated numbers on mount
  useEffect(() => {
    const duration = 1600;
    const start = performance.now();
    let animId;

    const frame = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCounterStats({
        balance: Math.round(24850 * eased),
        lifetime: Math.round(68200 * eased),
        redeemed: Math.round(43350 * eased),
        members: Math.round(1250000 * eased),
      });
      if (p < 1) animId = requestAnimationFrame(frame);
    };

    const timer = setTimeout(() => {
      animId = requestAnimationFrame(frame);
    }, 200);

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

  const tiers = [
    {
      id: "silver",
      name: "Silver Citizen",
      range: "0 – 5,000 SP",
      multiplier: "1.0x",
      color: "#94A3B8",
      benefits: [
        "Standard 1x earn rate on all 7 ecosystem portals",
        "Access to basic seasonal discount vouchers",
        "Standard 48-hour customer support turnaround",
        "Free participation in community quizzes & contests"
      ]
    },
    {
      id: "gold",
      name: "Gold Member",
      range: "5,000 – 25,000 SP",
      multiplier: "1.5x",
      color: "#D3AE5C",
      isPopular: true,
      benefits: [
        "1.5x accelerated earn rate on shopping & services",
        "₹1,000 Birthday celebration voucher credit",
        "Complimentary real estate advisory consultation",
        "Priority job portal applicant badge & verified badge",
        "Dedicated 12-hour priority customer desk"
      ]
    },
    {
      id: "platinum",
      name: "Platinum Elite",
      range: "25,000 – 75,000 SP",
      multiplier: "2.0x",
      color: "#CBD5E1",
      benefits: [
        "2.0x earn rate across transactions & partner portals",
        "Free matrimonial premium matchmaking pass (3 Months)",
        "Zero convenience fees on e-commerce checkouts",
        "Exclusive invites to Swarn Bharat regional summits",
        "Dedicated personal wealth & rewards concierge"
      ]
    },
    {
      id: "diamond",
      name: "Swarn Kohinoor",
      range: "75,000+ SP",
      multiplier: "3.0x",
      color: "#E2E8F0",
      benefits: [
        "3.0x maximum earning potential on entire network",
        "Annual luxury holiday & domestic flight booking vouchers",
        "VIP governance access & early-stage project previews",
        "Transferable rewards privileges for immediate family",
        "24/7 dedicated executive line"
      ]
    }
  ];

  const waysToEarn = [
    {
      category: "E-Commerce & Retail",
      rate: "5% Back in SP",
      icon: "🛍️",
      description: "Earn 5 Swarn Points for every ₹100 spent on curated lifestyle, fashion, and electronics.",
      cta: "Shop Marketplace"
    },
    {
      category: "Real Estate & Housing",
      rate: "Up to 25,000 SP",
      icon: "🏢",
      description: "Earn reward milestones on property site visits, digital tokenization, and legal consultations.",
      cta: "Explore Properties"
    },
    {
      category: "Students Portal & EdTech",
      rate: "200 SP / Course",
      icon: "🎓",
      description: "Earn points upon completing mock test series, skill certifications, and daily learning quizzes.",
      cta: "Start Learning"
    },
    {
      category: "Jobs & Careers Portal",
      rate: "300 SP Milestone",
      icon: "💼",
      description: "Earn rewards by verifying your professional profile, taking skill assessments, and interviewing.",
      cta: "Boost Profile"
    },
    {
      category: "Matrimonial Network",
      rate: "500 SP / Match",
      icon: "💍",
      description: "Earn points upon 100% profile identity verification, photo upload, and premium matchmaking.",
      cta: "Verify Account"
    },
    {
      category: "Community & Referrals",
      rate: "500 SP per Friend",
      icon: "🤝",
      description: "Invite friends and colleagues. Both you and your referral receive 500 bonus Swarn Points upon signup.",
      cta: "Share Invite Link"
    }
  ];

  const catalogItems = [
    {
      id: 1,
      category: "travel",
      tag: "TRAVEL & AIRLINES",
      title: "Domestic Flight Booking Voucher",
      cost: 500,
      value: "₹500 Discount",
      image: "/images/slide-01.jpg",
      description: "Valid across all major domestic partner airlines. Instant digital code delivered via SMS & Email.",
      remaining: 142
    },
    {
      id: 2,
      category: "shopping",
      tag: "E-COMMERCE & SHOPPING",
      title: "Swarn Bharat ₹1,000 Shopping Voucher",
      cost: 1000,
      value: "₹1,000 Credit",
      image: "/images/ecm.png",
      description: "Use on any cart item across clothing, electronics, and daily essentials with zero minimum order.",
      remaining: 89
    },
    {
      id: 3,
      category: "matrimonial",
      tag: "MATRIMONIAL NETWORK",
      title: "3 Months Platinum Matchmaking Pass",
      cost: 1200,
      value: "Worth ₹2,499",
      image: "/images/mtm.png",
      description: "Featured top search placement, direct verified contact reveals, and dedicated match advisor.",
      remaining: 215
    },
    {
      id: 4,
      category: "realestate",
      tag: "REAL ESTATE & LAND",
      title: "Executive Property Legal Consultation",
      cost: 800,
      value: "Worth ₹3,500",
      image: "/images/real.png",
      description: "1-on-1 private consultation with our certified real estate legal & investment advisory counsel.",
      remaining: 64
    },
    {
      id: 5,
      category: "education",
      tag: "STUDENTS PORTAL",
      title: "All-Access Tech & Career Certification",
      cost: 600,
      value: "Worth ₹1,999",
      image: "/images/std.png",
      description: "Full unlock to industry mock tests, coding tracks, competitive exams, and interview prep guides.",
      remaining: 320
    },
    {
      id: 6,
      category: "lifestyle",
      tag: "DINING & LIFESTYLE",
      title: "Luxury Dining & Club Experience",
      cost: 1500,
      value: "₹1,500 Off",
      image: "/images/h4.3.png",
      description: "Exclusive culinary discounts at over 500+ premium partner hotels, lounges, and restaurants.",
      remaining: 98
    },
    {
      id: 7,
      category: "shopping",
      tag: "ELECTRONICS & GADGETS",
      title: "Smart Watch / Fitness Tracker Voucher",
      cost: 2500,
      value: "₹2,500 Credit",
      image: "/images/technology.jpg",
      description: "Redeemable against smart wearables and tech gadgets from authorized partner brand stores.",
      remaining: 45
    },
    {
      id: 8,
      category: "travel",
      tag: "LUXURY STAYS",
      title: "Weekend Heritage Resort Stay Credit",
      cost: 3500,
      value: "₹4,000 Off",
      image: "/images/slide-02.jpg",
      description: "Enjoy a luxury escape across participating royal palace retreats and eco-resorts nationwide.",
      remaining: 30
    }
  ];

  const filteredCatalog = activeTab === "all" 
    ? catalogItems 
    : catalogItems.filter(item => item.category === activeTab);

  const activities = [
    {
      id: 101,
      type: "earn",
      title: "Referral Bonus — Invited Suresh K.",
      date: "Today, 11:24 AM",
      platform: "Community Network",
      points: "+500 SP"
    },
    {
      id: 102,
      type: "earn",
      title: "E-Commerce Order Cashback (Order #SB-9821)",
      date: "Yesterday, 4:15 PM",
      platform: "E-Commerce Portal",
      points: "+320 SP"
    },
    {
      id: 103,
      type: "redeem",
      title: "Redeemed Flight Booking Credit",
      date: "04 Sep 2026",
      platform: "Travel World",
      points: "−500 SP"
    },
    {
      id: 104,
      type: "earn",
      title: "Profile 100% KYC Verification Bonus",
      date: "01 Sep 2026",
      platform: "Identity Central",
      points: "+250 SP"
    },
    {
      id: 105,
      type: "earn",
      title: "Daily Check-in Streak (Day 7 Bonus)",
      date: "28 Aug 2026",
      platform: "Rewards Hub",
      points: "+100 SP"
    },
    {
      id: 106,
      type: "redeem",
      title: "Redeemed Matrimonial Premium Membership",
      date: "22 Aug 2026",
      platform: "Matrimonial Network",
      points: "−1,200 SP"
    }
  ];

  const faqs = [
    {
      q: "What is the monetary valuation of 1 Swarn Point (SP)?",
      a: "1 Swarn Point equals ₹1.00 when redeemed across select high-value vouchers and partner merchant credits. For standard catalog vouchers, 1 SP provides full redemption without hidden fees or forced conversion haircuts."
    },
    {
      q: "How do I move up through the Membership Tiers (Silver to Kohinoor)?",
      a: "Tiers are calculated based on your cumulative 12-month earning activity across all 7 portals. Once you hit the threshold (e.g., 5,000 SP for Gold), your tier upgrades automatically, instantly unlocking multiplier benefits and VIP perks."
    },
    {
      q: "Can I use Swarn Points simultaneously with promo coupon codes?",
      a: "Yes! Swarn Points function as a digital cash equivalent stored in your unified wallet. You can stack seasonal discount codes on E-Commerce or Real Estate ventures and pay the remaining balance using your Swarn Points."
    },
    {
      q: "Do Swarn Points have an expiry date?",
      a: "Points remain completely valid for 24 months from the transaction date. Active members who perform at least one qualifying ecosystem interaction per year enjoy indefinite points protection."
    },
    {
      q: "How fast are digital vouchers and gift cards delivered after redemption?",
      a: "Vouchers and digital activation keys are credited instantly to your account wallet and dispatched to your registered mobile number and email within 60 seconds of confirmation."
    }
  ];

  const handleRedeem = (item) => {
    if (availableBalance < item.cost) {
      alert(`Insufficient balance! You need ${item.cost} SP, but your balance is ${availableBalance.toLocaleString()} SP.`);
      return;
    }
    setSelectedReward(item);
    setRedeemSuccess(false);
  };

  const confirmRedemption = () => {
    if (!selectedReward) return;
    setAvailableBalance(prev => prev - selectedReward.cost);
    setRedeemSuccess(true);
  };

  const handleClaimDaily = () => {
    if (claimedDaily) return;
    setClaimedDaily(true);
    setAvailableBalance(prev => prev + 50);
  };

  return (
    <>
      <Navbar />

      <main className={styles.rewardsPage}>
        {/* ================= 1. HERO SECTION ================= */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackdrop}>
            <img 
              src="/images/h2.png" 
              alt="Swarn Bharat Rewards" 
              className={styles.heroBackdropImg}
            />
            <div className={styles.heroOverlay} />
            <div className={styles.heroGoldGlow} />
          </div>

          <div className={styles.container}>
            <div className={styles.heroGrid}>
              
              {/* Left Column: Headline & Information */}
              <div className={styles.heroContentCol}>
                <div className={styles.heroPillBadge}>
                  <span className={styles.sparkle}>✦</span>
                  <span>Swarn Bharat Universal Rewards Program</span>
                </div>

                <h1 className={styles.heroTitle}>
                  Your Everyday Journey <br />
                  <span className={styles.goldTextGradient}>Deserves Its Own Currency</span>
                </h1>

                <p className={styles.heroDescription}>
                  One unified rewards balance powering seven interconnected worlds. Earn seamlessly across technology, real estate, shopping, careers, matrimonial, and education — redeem anytime, anywhere.
                </p>

                <div className={styles.heroBtnRow}>
                  <a href="#catalog" className={styles.primaryGoldBtn}>
                    Explore Reward Catalog
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="#calculator" className={styles.secondaryOutlineBtn}>
                    Points Calculator
                  </a>
                </div>

                {/* Live Member Status Card */}
                <div className={styles.heroBalanceStrip}>
                  <div className={styles.balanceItem}>
                    <div className={styles.balanceNum}>{availableBalance.toLocaleString()}</div>
                    <div className={styles.balanceLabel}>Available Swarn Points</div>
                  </div>
                  <div className={styles.balanceDivider} />
                  <div className={styles.balanceStatus}>
                    <div className={styles.tierBadgeSmall}>
                      <span className={styles.tierDot} /> Gold Tier Member
                    </div>
                    <span className={styles.tierDelta}>+1,240 SP earned this month</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Interactive Coin Showcase & Daily Checkin */}
              <div className={styles.heroVisualCol}>
                <div className={styles.coinShowcaseCard}>
                  <div className={styles.coinShowcaseGlow} />

                  {/* Floating Chips */}
                  <div className={`${styles.floatingPill} ${styles.fp1}`}>
                    <span>✨</span>
                    <span>1 SP = ₹1.00 Value</span>
                  </div>
                  <div className={`${styles.floatingPill} ${styles.fp2}`}>
                    <span>🌐</span>
                    <span>Accepted in 7 Worlds</span>
                  </div>

                  {/* 3D Medal Coin */}
                  <div className={styles.coinContainer}>
                    <div className={styles.animatedCoin}>
                      <div className={`${styles.coinFace} ${styles.coinFront}`}>
                        <span className={styles.coinLetter}>S</span>
                        <span className={styles.coinBrandSub}>SWARN BHARAT</span>
                      </div>
                      <div className={`${styles.coinFace} ${styles.coinBack}`}>
                        <span className={styles.coinBackTitle}>UNIVERSAL REWARDS</span>
                        <span className={styles.coinBackLogo}>BHARAT</span>
                      </div>
                    </div>
                  </div>

                  {/* Daily Reward Claim Card */}
                  <div className={styles.dailyClaimCard}>
                    <div className={styles.dailyClaimInfo}>
                      <div className={styles.dailyGiftIcon}>🎁</div>
                      <div>
                        <h4>Daily Citizen Check-In</h4>
                        <p>{claimedDaily ? "You claimed +50 SP today!" : "Claim your free daily 50 Swarn Points"}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleClaimDaily}
                      disabled={claimedDaily}
                      className={claimedDaily ? styles.claimedBtn : styles.claimBtn}
                    >
                      {claimedDaily ? "✓ Claimed" : "Claim +50 SP"}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= 2. LIVE METRICS STRIP ================= */}
        <section className={styles.metricsStrip}>
          <div className={styles.container}>
            <div className={styles.metricsGrid}>
              <div className={styles.metricItem}>
                <div className={styles.metricIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                  </svg>
                </div>
                <div>
                  <div className={styles.metricValue}>{counterStats.balance.toLocaleString()} SP</div>
                  <div className={styles.metricLabel}>Current Available Balance</div>
                </div>
              </div>

              <div className={styles.metricItem}>
                <div className={styles.metricIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <div>
                  <div className={styles.metricValue}>{counterStats.lifetime.toLocaleString()} SP</div>
                  <div className={styles.metricLabel}>Lifetime Points Distributed</div>
                </div>
              </div>

              <div className={styles.metricItem}>
                <div className={styles.metricIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <div className={styles.metricValue}>{counterStats.redeemed.toLocaleString()} SP</div>
                  <div className={styles.metricLabel}>Vouchers &amp; Rewards Claimed</div>
                </div>
              </div>

              <div className={styles.metricItem}>
                <div className={styles.metricIconWrap}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <div className={styles.metricValue}>{(counterStats.members / 1000000).toFixed(2)}M+</div>
                  <div className={styles.metricLabel}>Enrolled Reward Citizens</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. MEMBERSHIP TIERS MATRIX ================= */}
        <section className={styles.tierSection}>
          <div className={styles.container}>
            <div className={styles.secHeaderCenter}>
              <span className={styles.eyebrow}>Tier Privilege Hierarchy</span>
              <h2 className={styles.secTitle}>Unlock Elevated Earning &amp; VIP Perks</h2>
              <p className={styles.secSub}>
                Every transaction and engagement elevates your tier status. The higher you climb, the faster you earn.
              </p>
            </div>

            <div className={styles.tierCardsGrid}>
              {tiers.map((tier) => (
                <div 
                  key={tier.id} 
                  className={`${styles.tierCard} ${activeTier === tier.id ? styles.tierCardActive : ""}`}
                  onClick={() => setActiveTier(tier.id)}
                >
                  {tier.isPopular && <div className={styles.popularRibbon}>MOST POPULAR</div>}
                  
                  <div className={styles.tierCardHeader}>
                    <div className={styles.tierIconRing} style={{ borderColor: tier.color }}>
                      <span style={{ color: tier.color }}>✦</span>
                    </div>
                    <h3>{tier.name}</h3>
                    <div className={styles.tierRange}>{tier.range}</div>
                  </div>

                  <div className={styles.tierMultiplierWrap}>
                    <span className={styles.multiplierLabel}>Earn Multiplier</span>
                    <span className={styles.multiplierVal}>{tier.multiplier}</span>
                  </div>

                  <ul className={styles.tierBenefitsList}>
                    {tier.benefits.map((benefit, bIdx) => (
                      <li key={bIdx}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    type="button" 
                    className={activeTier === tier.id ? styles.tierSelectedBtn : styles.tierSelectBtn}
                  >
                    {activeTier === tier.id ? "Your Active Tier" : "View Tier Details"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 4. WAYS TO EARN ================= */}
        <section className={`${styles.section} ${styles.bgPaper}`}>
          <div className={styles.container}>
            <div className={styles.secHeaderCenter}>
              <span className={styles.eyebrow}>Seamless Accrual</span>
              <h2 className={styles.secTitle}>How to Earn Across the 7 Verticals</h2>
              <p className={styles.secSub}>
                Every time you interact with any Swarn Bharat platform, your unified balance accumulates points automatically.
              </p>
            </div>

            <div className={styles.waysGrid}>
              {waysToEarn.map((way, idx) => (
                <div key={idx} className={styles.wayCard}>
                  <div className={styles.wayTopRow}>
                    <span className={styles.wayEmoji}>{way.icon}</span>
                    <span className={styles.wayRateBadge}>{way.rate}</span>
                  </div>
                  <h3>{way.category}</h3>
                  <p>{way.description}</p>
                  <Link href="/#businesses" className={styles.wayCtaLink}>
                    {way.cta} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. INTERACTIVE REWARD CATALOG ================= */}
        <section id="catalog" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.secHeaderRow}>
              <div>
                <span className={styles.eyebrow}>Exclusive Catalog</span>
                <h2 className={styles.secTitle}>Redeem for What Truly Matters</h2>
                <p className={styles.secSub}>
                  Browse curated rewards, gift cards, real estate consults, and travel discounts.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className={styles.filterPillsRow}>
                {[
                  { id: "all", label: "All Rewards" },
                  { id: "travel", label: "Travel & Flights" },
                  { id: "shopping", label: "Shopping & E-Com" },
                  { id: "realestate", label: "Real Estate" },
                  { id: "matrimonial", label: "Matrimonial" },
                  { id: "education", label: "Education" },
                  { id: "lifestyle", label: "Dining & Lifestyle" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.filterPill} ${activeTab === tab.id ? styles.filterPillActive : ""}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            <div className={styles.catalogGrid}>
              {filteredCatalog.map((item) => (
                <div key={item.id} className={styles.catalogCard}>
                  <div className={styles.catalogImgWrap}>
                    <img src={item.image} alt={item.title} className={styles.catalogImg} />
                    <span className={styles.catalogCategoryTag}>{item.tag}</span>
                    <span className={styles.catalogValueBadge}>{item.value}</span>
                  </div>

                  <div className={styles.catalogBody}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <div className={styles.catalogMetaRow}>
                      <div className={styles.pointsCostWrap}>
                        <span className={styles.costNum}>{item.cost.toLocaleString()}</span>
                        <span className={styles.costUnit}>SP</span>
                      </div>
                      <span className={styles.stockRemaining}>{item.remaining} left in stock</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRedeem(item)}
                      className={styles.redeemBtn}
                    >
                      Redeem Reward
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6. POINTS VALUE CALCULATOR ================= */}
        <section id="calculator" className={`${styles.section} ${styles.bgPaper}`}>
          <div className={styles.container}>
            <div className={styles.calculatorCard}>
              <div className={styles.calcHeader}>
                <span className={styles.eyebrow}>Value Simulator</span>
                <h2>Swarn Points Worth Calculator</h2>
                <p>Drag the slider to see the purchasing power of your Swarn Points balance.</p>
              </div>

              <div className={styles.calcBodyGrid}>
                {/* Slider Box */}
                <div className={styles.calcSliderBox}>
                  <div className={styles.sliderHeader}>
                    <span>Your Points Balance</span>
                    <strong>{calculatorPoints.toLocaleString()} SP</strong>
                  </div>

                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={calculatorPoints}
                    onChange={(e) => setCalculatorPoints(Number(e.target.value))}
                    className={styles.rangeSlider}
                  />

                  <div className={styles.sliderMinMax}>
                    <span>500 SP</span>
                    <span>50,000 SP</span>
                    <span>100,000 SP</span>
                  </div>
                </div>

                {/* Results Comparison */}
                <div className={styles.calcResultsBox}>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Direct Cash Value Equivalent</span>
                    <div className={styles.resultCashVal}>₹{calculatorPoints.toLocaleString()}</div>
                  </div>

                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Estimated Travel &amp; Flight Savings</span>
                    <div className={styles.resultPerkVal}>Up to ₹{(calculatorPoints * 1.25).toLocaleString()}</div>
                  </div>

                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Eligible Tier Privilege</span>
                    <div className={styles.resultTierVal}>
                      {calculatorPoints >= 75000 
                        ? "Swarn Kohinoor (3.0x Multiplier)"
                        : calculatorPoints >= 25000
                        ? "Platinum Elite (2.0x Multiplier)"
                        : calculatorPoints >= 5000
                        ? "Gold Member (1.5x Multiplier)"
                        : "Silver Citizen (1.0x Multiplier)"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 7. RECENT TRANSACTIONS & ACTIVITY ================= */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.secHeaderRow}>
              <div>
                <span className={styles.eyebrow}>Transparent Ledger</span>
                <h2 className={styles.secTitle}>Recent Activity &amp; Points Movement</h2>
                <p className={styles.secSub}>Every credited and redeemed point is permanently verified in your statement.</p>
              </div>
              <button 
                type="button" 
                onClick={() => alert("Your official PDF rewards statement has been generated and sent to your registered email.")} 
                className={styles.statementBtn}
              >
                Download Statement (PDF) &rarr;
              </button>
            </div>

            <div className={styles.activityTableCard}>
              {activities.map((act) => (
                <div key={act.id} className={styles.activityTableRow}>
                  <div className={styles.actTypeBadge}>
                    <span className={act.type === "earn" ? styles.earnDot : styles.redeemDot} />
                    <span className={styles.actPlatform}>{act.platform}</span>
                  </div>

                  <div className={styles.actTitleCol}>
                    <h4>{act.title}</h4>
                    <span className={styles.actDate}>{act.date}</span>
                  </div>

                  <div className={`${styles.actPointsCol} ${act.type === "earn" ? styles.pointsEarned : styles.pointsRedeemed}`}>
                    {act.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 8. FAQ SECTION ================= */}
        <section className={`${styles.section} ${styles.bgPaper}`}>
          <div className={styles.container}>
            <div className={styles.secHeaderCenter}>
              <span className={styles.eyebrow}>Rewards Help &amp; FAQs</span>
              <h2 className={styles.secTitle}>Frequently Asked Questions</h2>
              <p className={styles.secSub}>Everything you need to know about points accrual, redemption, and security.</p>
            </div>

            <div className={styles.faqWrapper}>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`${styles.faqItem} ${activeFaq === index ? styles.faqItemActive : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                    className={styles.faqQuestionBtn}
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.faqToggleIcon}>{activeFaq === index ? "−" : "+"}</span>
                  </button>
                  <div className={`${styles.faqAnswer} ${activeFaq === index ? styles.faqAnswerOpen : ""}`}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 9. CTA BANNER ================= */}
        <section className={styles.ctaBannerSection}>
          <div className={styles.container}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} />
              <div className={styles.ctaCardContent}>
                <span className={styles.ctaBadge}>Get Started Today</span>
                <h2>Start Earning Swarn Points with Your Free Account</h2>
                <p>
                  Join over 1.25M+ members already saving, earning, and redeeming across India&apos;s most connected ecosystem.
                </p>
                <div className={styles.ctaBtnRow}>
                  <Link href="/register" className={styles.primaryGoldBtn}>
                    Create Account &amp; Claim 500 Bonus SP
                  </Link>
                  <Link href="/about" className={styles.secondaryOutlineBtn}>
                    Learn About The Ecosystem
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= REDEMPTION CONFIRMATION MODAL ================= */}
        {selectedReward && (
          <div className={styles.modalBackdrop} onClick={() => setSelectedReward(null)}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className={styles.modalCloseBtn} 
                onClick={() => setSelectedReward(null)}
              >
                ✕
              </button>

              {redeemSuccess ? (
                <div className={styles.modalSuccessContent}>
                  <div className={styles.modalSuccessIcon}>✓</div>
                  <h3>Redemption Successful!</h3>
                  <p>
                    You have successfully redeemed <strong>{selectedReward.title}</strong> for <strong>{selectedReward.cost} SP</strong>.
                  </p>
                  <div className={styles.voucherCodeCard}>
                    <span>YOUR DIGITAL VOUCHER CODE</span>
                    <strong>SB-{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </div>
                  <p className={styles.modalSubNote}>
                    A copy has been sent to your registered phone &amp; email. Remaining balance: <strong>{availableBalance.toLocaleString()} SP</strong>.
                  </p>
                  <button 
                    type="button" 
                    className={styles.primaryGoldBtn} 
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => setSelectedReward(null)}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className={styles.modalConfirmContent}>
                  <div className={styles.modalThumb}>
                    <img src={selectedReward.image} alt={selectedReward.title} />
                  </div>
                  <span className={styles.modalCategoryTag}>{selectedReward.tag}</span>
                  <h3>{selectedReward.title}</h3>
                  <p>{selectedReward.description}</p>

                  <div className={styles.modalCostSummary}>
                    <div className={styles.costRow}>
                      <span>Reward Cost:</span>
                      <strong>{selectedReward.cost.toLocaleString()} SP</strong>
                    </div>
                    <div className={styles.costRow}>
                      <span>Your Balance:</span>
                      <strong>{availableBalance.toLocaleString()} SP</strong>
                    </div>
                    <div className={styles.costRow}>
                      <span>Balance After Redemption:</span>
                      <strong style={{ color: "#2FA95C" }}>{(availableBalance - selectedReward.cost).toLocaleString()} SP</strong>
                    </div>
                  </div>

                  <div className={styles.modalActionButtons}>
                    <button 
                      type="button" 
                      className={styles.primaryGoldBtn} 
                      onClick={confirmRedemption}
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Confirm Redemption
                    </button>
                    <button 
                      type="button" 
                      className={styles.secondaryOutlineBtn} 
                      onClick={() => setSelectedReward(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
