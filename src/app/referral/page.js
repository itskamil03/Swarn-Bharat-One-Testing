"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { useAuth, generateUserReferralCode } from "@/context/AuthContext";
import styles from "./page.module.css";

const tiersData = [
  {
    tier: "Bronze Partner",
    req: "1 – 4 Friends",
    reward: "150",
    features: [
      "150 Swarn Coins per invitee",
      "200 Welcome Coins for friend",
      "Instant central wallet credit",
      "Basic referral dashboard",
    ],
    popular: false,
  },
  {
    tier: "Silver Referrer",
    req: "5 – 9 Friends",
    reward: "200",
    features: [
      "200 Swarn Coins per invitee",
      "+5% Bonus on friend's 1st order",
      "Priority customer care",
      "Early access to festive deals",
    ],
    popular: false,
  },
  {
    tier: "Gold Advocate",
    req: "10 – 24 Friends",
    reward: "250",
    features: [
      "250 Swarn Coins per invitee",
      "+10% Bonus on all purchases",
      "VIP Pass to Leadership Summit",
      "Exclusive Gold badge on profile",
    ],
    popular: true,
  },
  {
    tier: "Diamond Ambassador",
    req: "25+ Friends",
    reward: "350",
    features: [
      "350 Swarn Coins per invitee",
      "+15% Lifetime revenue bonus",
      "Dedicated Relationship Concierge",
      "Direct invitations to Board Events",
    ],
    popular: false,
  },
];

const redemptionChannels = [
  {
    icon: "🛍️",
    title: "Swarn E-Commerce",
    desc: "Redeem 100% of coin value for direct cart discounts, electronics, household essentials, and free priority deliveries.",
  },
  {
    icon: "🎓",
    title: "Students Learning Portal",
    desc: "Apply coins towards national test series bundles, competitive exam coaching modules, and professional certifications.",
  },
  {
    icon: "🏙️",
    title: "Smart Real Estate",
    desc: "Redeem coins for zero-processing fee property booking vouchers and premium developer project consultations.",
  },
  {
    icon: "💍",
    title: "Swarn Matrimonial",
    desc: "Unlock premium profile spotlight boosts, verified matchmaking credits, and family contact request vouchers.",
  },
  {
    icon: "🪙",
    title: "Swarn Rewards Gold Hub",
    desc: "Exchange coins for certified physical 24K Gold Coins, branded smartwatches, travel vouchers, and luxury lifestyle perks.",
  },
  {
    icon: "🤝",
    title: "Foundation & CSR Causes",
    desc: "Convert your earned coins into direct grassroots charity donations for rural girl child education and green solar drives.",
  },
];

const faqData = [
  {
    q: "How does the Swarn Bharat Refer & Earn program work?",
    a: "Every verified Swarn Bharat user gets a unique referral code and link. When someone joins using your link, they receive an instant 200 Welcome Swarn Coins, and you earn between 150 to 350 Swarn Coins (based on your tier level) once they verify their account.",
  },
  {
    q: "Where do my earned Swarn Coins get deposited?",
    a: "All referral rewards are automatically deposited into your Central Swarn Wallet. Because our ecosystem is unified, you can spend these coins across all 9+ Swarn Bharat platforms (E-Commerce, Students Portal, Real Estate, Matrimonial, Rewards, etc.).",
  },
  {
    q: "Is there any limit on how many people I can invite?",
    a: "No! There is absolutely no limit. You can invite 5, 50, or 500 people. As your successful referral count grows, you automatically advance to higher tiers (up to Diamond Ambassador) and earn higher coin multipliers.",
  },
  {
    q: "When will the coins be credited to my account?",
    a: "Coins are credited instantly in real-time as soon as your invited friend completes their basic registration and mobile OTP verification on the platform.",
  },
  {
    q: "Do Swarn Coins earned from referrals expire?",
    a: "No. Swarn Coins in your central wallet do not expire as long as your account remains in good standing. You can accumulate them for big rewards like electronics or 24K gold coins.",
  },
  {
    q: "Can colleges, influencers, or corporate partners apply for custom ambassador campaigns?",
    a: "Yes! If you are a student club head, community leader, or corporate partner, you can apply for our Institutional Ambassador Program by contacting ambassador@swarnbharat.in for custom payout tiers and promotional banners.",
  },
];

export default function ReferralPage() {
  const { user } = useAuth();
  const [friendsCount, setFriendsCount] = useState(10);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const isLoggedIn = !!user;
  const userReferralCode = user ? (user.referralCode || generateUserReferralCode(user)) : "SB-BHARAT2026";
  const userLink = `https://swarnbharat.in/register?ref=${userReferralCode}`;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(userLink);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Dynamic calculations based on slider
  let coinsPerReferral = 150;
  let tierName = "Bronze Partner";
  let multiplierText = "Standard Payout";

  if (friendsCount >= 25) {
    coinsPerReferral = 350;
    tierName = "Diamond Ambassador";
    multiplierText = "15% Bonus Rate";
  } else if (friendsCount >= 10) {
    coinsPerReferral = 250;
    tierName = "Gold Advocate";
    multiplierText = "10% Bonus Rate";
  } else if (friendsCount >= 5) {
    coinsPerReferral = 200;
    tierName = "Silver Referrer";
    multiplierText = "5% Bonus Rate";
  }

  const totalCalculatedCoins = friendsCount * coinsPerReferral;
  const estimatedRupeeWorth = totalCalculatedCoins;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <main className={styles.referralPage}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow}></div>
          <div className={styles.heroGlowLeft}></div>

          <div className={styles.container}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <span style={{ color: "#d4a748" }}>Refer &amp; Earn</span>
            </div>

            <div className={styles.heroGrid}>
              <div>
                <div className={styles.heroEyebrow}>
                  <span>✨</span> Swarn Bharat Citizen Referral Network
                </div>
                <h1 className={styles.heroTitle}>
                  Empower Your Circle. <br />
                  <span className={styles.goldGradient}>Earn Unlimited</span> Swarn Coins.
                </h1>
                <p className={styles.heroLead}>
                  Share the advantages of India’s connected multi-platform digital ecosystem. When your friends, classmates, and family join Swarn Bharat, both of you earn universal Swarn Coins that can be redeemed across all 9+ platforms.
                </p>

                <div className={styles.heroKeyStats}>
                  <div className={styles.heroStatItem}>
                    <span className={styles.heroStatVal}>250+</span>
                    <span className={styles.heroStatLabel}>Coins per Invite</span>
                  </div>
                  <div className={styles.heroStatItem}>
                    <span className={styles.heroStatVal}>200</span>
                    <span className={styles.heroStatLabel}>Welcome Bonus for Friend</span>
                  </div>
                  <div className={styles.heroStatItem}>
                    <span className={styles.heroStatVal}>Unlimited</span>
                    <span className={styles.heroStatLabel}>Earning Potential</span>
                  </div>
                </div>
              </div>

              {/* Interactive Pass Card */}
              <div className={styles.heroCard}>
                <div className={styles.heroCardHeader}>
                  <span className={styles.heroCardTitle}>
                    {isLoggedIn ? "Your Citizen Referral Pass" : "Citizen Referral Pass"}
                  </span>
                  {isLoggedIn ? (
                    <span className={styles.liveBadge}>
                      <span className={styles.pulseDot}></span> Active • {user.name}
                    </span>
                  ) : (
                    <span className={styles.lockedBadge}>
                      🔒 Login to Unlock
                    </span>
                  )}
                </div>

                <div className={`${styles.linkBox} ${!isLoggedIn ? styles.linkBoxLocked : ""}`}>
                  {isLoggedIn ? (
                    <>
                      <span className={styles.linkCodeText}>{userReferralCode}</span>
                      <button type="button" className={styles.copyCodeBtn} onClick={handleCopyLink}>
                        {copied ? "✓ Copied!" : "Copy Link"}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className={styles.maskedCodeBox}>
                        <span className={styles.maskedText}>SB-••••••••</span>
                        <span className={styles.maskedSub}>Sign in to view personal code</span>
                      </div>
                      <Link href="/login" className={styles.unlockPassBtn}>
                        Sign In
                      </Link>
                    </>
                  )}
                </div>

                {isLoggedIn ? (
                  <div className={styles.shareSocialsRow}>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Join Swarn Bharat using my citizen referral code ${userReferralCode} and unlock 200 Welcome Swarn Coins! ${userLink}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareSocialBtn}
                      style={{ background: "#25D366", borderColor: "#25D366" }}
                    >
                      <span>💬 WhatsApp</span>
                    </a>
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(userLink)}&text=${encodeURIComponent(`Join Swarn Bharat with code ${userReferralCode} and get 200 Swarn Coins!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareSocialBtn}
                      style={{ background: "#0088cc", borderColor: "#0088cc" }}
                    >
                      <span>✈️ Telegram</span>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Join India's unified ecosystem Swarn Bharat! Use code ${userReferralCode} to get 200 bonus coins. ${userLink}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareSocialBtn}
                      style={{ background: "#000000", borderColor: "#333333" }}
                    >
                      <span>✖️ Post</span>
                    </a>
                  </div>
                ) : (
                  <div className={styles.guestNoticeBox}>
                    <span>💡 Every verified citizen receives a permanent referral pass. Rewards credit directly to your Central Wallet.</span>
                  </div>
                )}

                <div className={styles.heroCardNotice}>
                  🔒 Coins are credited immediately upon verified mobile sign-up. 100% fair and automated.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: HOW IT WORKS STEP BY STEP */}
        <section className={styles.howItWorksSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionTag}>Simple 4-Step Process</span>
              <h2 className={styles.sectionTitle}>How Swarn Bharat Refer &amp; Earn Works</h2>
              <p className={styles.sectionSubtitle}>
                No complicated hurdles or hidden terms. A completely transparent rewards mechanism built for citizens across Bharat.
              </p>
            </div>

            <div className={styles.workflowGrid}>
              <div className={styles.workflowCard}>
                <div className={styles.stepNumberCircle}>01</div>
                <h4>Grab Your Code</h4>
                <p>
                  Sign in to your Swarn Bharat account to get your unique citizen referral code and personalized web link.
                </p>
                <div className={styles.workflowPill}>🔑 Unique 1-Click Code</div>
              </div>

              <div className={styles.workflowCard}>
                <div className={styles.stepNumberCircle}>02</div>
                <h4>Invite Your Circle</h4>
                <p>
                  Share your link with colleagues, friends, family members, or students looking for education &amp; job opportunities.
                </p>
                <div className={styles.workflowPill}>📱 Social &amp; Messaging</div>
              </div>

              <div className={styles.workflowCard}>
                <div className={styles.stepNumberCircle}>03</div>
                <h4>Friend Gets 200 Coins</h4>
                <p>
                  When your friend signs up and verifies their mobile OTP, they receive 200 Welcome Swarn Coins instantly.
                </p>
                <div className={styles.workflowPill}>🎁 200 Coins Welcome Credit</div>
              </div>

              <div className={styles.workflowCard}>
                <div className={styles.stepNumberCircle}>04</div>
                <h4>You Earn &amp; Level Up</h4>
                <p>
                  You receive 250+ Swarn Coins in your Central Wallet, increasing your rank toward Diamond Ambassador status.
                </p>
                <div className={styles.workflowPill}>🪙 250+ Coins / Referral</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE REWARD CALCULATOR */}
        <section className={styles.calcSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionTag}>Interactive Earnings Estimator</span>
              <h2 className={styles.sectionTitle}>Calculate Your Referral Potential</h2>
              <p className={styles.sectionSubtitle}>
                Slide to see how many Swarn Coins and real purchasing power you unlock as you introduce friends to Swarn Bharat.
              </p>
            </div>

            <div className={styles.calcCard}>
              <div className={styles.calcControls}>
                <h3>How many friends can you invite?</h3>
                <p>Move the slider below to project your monthly coins and ambassador tier.</p>

                <div className={styles.sliderGroup}>
                  <div className={styles.sliderHeader}>
                    <span className={styles.sliderLabel}>Number of Friends:</span>
                    <span className={styles.sliderCount}>{friendsCount} Friends</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={friendsCount}
                    onChange={(e) => setFriendsCount(Number(e.target.value))}
                    className={styles.customRangeInput}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>
                    <span>1 Friend</span>
                    <span>25 Friends (Diamond)</span>
                    <span>50 Friends</span>
                  </div>
                </div>

                <div style={{ fontSize: "13px", color: "#475467", background: "#f8fafc", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  💡 <strong>Tip:</strong> Reaching <strong>10 friends</strong> unlocks the Gold Advocate status with 250 Coins per friend and VIP access to summits!
                </div>
              </div>

              <div className={styles.calcResults}>
                <div className={styles.calcResultHeader}>Projected Swarn Coin Earnings</div>
                <div className={styles.calcCoinTotal}>
                  <span>🪙</span>
                  <span>{totalCalculatedCoins.toLocaleString()}</span>
                  <span style={{ fontSize: "20px", color: "#d4a748", fontWeight: 700 }}>Coins</span>
                </div>
                <div className={styles.calcRupeeValue}>
                  ≈ ₹{estimatedRupeeWorth.toLocaleString()} in equivalent platform purchasing value
                </div>

                <div className={styles.calcTierBadgeRow}>
                  <div className={styles.tierPill}>🏆 {tierName}</div>
                  <div className={styles.multiplierPill}>⚡ {multiplierText}</div>
                </div>

                <div className={styles.calcPerksList}>
                  <div>✓ Direct credit to central ecosystem wallet</div>
                  <div>✓ Redeemable across E-Commerce, Education &amp; Real Estate</div>
                  <div>✓ Eligible for quarterly physical 24K Gold Coin lucky draws</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TIERS & REWARD MULTIPLIERS */}
        <section className={styles.tiersSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionTag}>Ambassador Program</span>
              <h2 className={styles.sectionTitle}>Referral Tiers &amp; Multipliers</h2>
              <p className={styles.sectionSubtitle}>
                The more active advocates in your network, the greater the rewards. Climb our four ambassador tiers automatically.
              </p>
            </div>

            <div className={styles.tiersGrid}>
              {tiersData.map((item, idx) => (
                <div
                  key={idx}
                  className={`${styles.tierCard} ${item.popular ? styles.popularTier : ""}`}
                >
                  <h3 className={styles.tierTitle}>{item.tier}</h3>
                  <div className={styles.tierRequirement}>Target: {item.req}</div>
                  <div className={styles.tierRewardAmount}>🪙 {item.reward}</div>
                  <div className={styles.tierRewardUnit}>Swarn Coins / Invitee</div>

                  <ul className={styles.tierFeatures}>
                    {item.features.map((f, fIdx) => (
                      <li key={fIdx}>
                        <span className={styles.tierCheck}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: CROSS-PLATFORM REDEMPTION GUIDE */}
        <section className={styles.redemptionSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionTag}>Central Wallet Utility</span>
              <h2 className={styles.sectionTitle}>Where Can You Spend Your Swarn Coins?</h2>
              <p className={styles.sectionSubtitle}>
                Your Swarn Coins belong to your centralized Swarn Bharat account. Spend them freely across any vertical.
              </p>
            </div>

            <div className={styles.redemptionGrid}>
              {redemptionChannels.map((c, idx) => (
                <div key={idx} className={styles.redemptionCard}>
                  <div className={styles.redemptionIcon}>{c.icon}</div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionTag}>Got Questions?</span>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              <p className={styles.sectionSubtitle}>
                Everything you need to know about the Swarn Bharat Citizen Referral Program.
              </p>
            </div>

            <div className={styles.faqWrapper}>
              {faqData.map((faq, idx) => (
                <div
                  key={idx}
                  className={`${styles.faqItem} ${openFaq === idx ? styles.open : ""}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.faqToggle}>{openFaq === idx ? "−" : "+"}</span>
                  </button>
                  {openFaq === idx && (
                    <div className={styles.faqAnswer}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: CTA BANNER */}
        <section className={styles.ctaBannerSection}>
          <div className={styles.container}>
            <div className={styles.ctaCard}>
              <h2>Start Sharing. Start Earning Today.</h2>
              <p>
                Join hundreds of thousands of citizens who are earning Swarn Coins and unlocking boundless opportunities across India’s connected digital platforms.
              </p>
              <div className={styles.ctaActionBtns}>
                <Link href="/register" className={styles.btnGold}>
                  Create Free Account &amp; Get Code
                </Link>
                <Link href="/login" className={styles.btnOutline}>
                  Sign In to View Your Wallet
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
