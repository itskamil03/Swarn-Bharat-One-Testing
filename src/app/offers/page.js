"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import OffersSection from "@/features/home/OffersSection/OffersSection";
import styles from "./page.module.css";

export default function OffersPage() {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    savings: 1.5,
    brands: 100,
    verticals: 7,
    coupons: 10,
  });

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let animId;
    const frame = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setStats({
        savings: (1.5 * eased).toFixed(1),
        brands: Math.round(100 * eased),
        verticals: Math.round(7 * eased),
        coupons: Math.round(10 * eased),
      });
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

  const handleCopyCode = () => {
    navigator.clipboard?.writeText("SWARN50").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.offersPageWrapper}>
      <Navbar />

      {/* ================= HIGH PROFESSIONAL OFFERS HERO HEADER ================= */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" 
            alt="Swarn Bharat Exclusive Offers & Privileges" 
          />
          <div className={styles.heroMesh} />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.wrap}>
          <div className={styles.heroMainGrid}>
            {/* Left Column */}
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.pulseDot} />
                <span>SWARN BHARAT PRIVILEGES & OFFERS</span>
              </div>

              <h1 className={styles.heroTitle}>
                Exclusive Benefits.
                <br />
                <span className={styles.goldHighlight}>Unmatched Savings</span> Across Bharat.
              </h1>

              <p className={styles.heroLead}>
                Unlock curated member privileges, instant cashback discounts, and exclusive partner vouchers spanning E-Commerce, Real Estate, Travel, Education, and Tech platforms.
              </p>

              <div className={styles.heroPillars}>
                <div className={styles.pillarChip}>
                  <span className={styles.pillarIcon}>⚡</span>
                  <span>Up to 50% Instant Off</span>
                </div>
                <div className={styles.pillarChip}>
                  <span className={styles.pillarIcon}>🪙</span>
                  <span>2X Swarn Coins Earned</span>
                </div>
                <div className={styles.pillarChip}>
                  <span className={styles.pillarIcon}>🔒</span>
                  <span>100% Verified Deals</span>
                </div>
                <div className={styles.pillarChip}>
                  <span className={styles.pillarIcon}>🌐</span>
                  <span>7 Connected Verticals</span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Spotlight Card */}
            <div className={styles.spotlightCard}>
              <div className={styles.spotlightGlow} />

              <div className={styles.spotlightHeader}>
                <span className={styles.spotlightTag}>Featured Ecosystem Privilege</span>
                <span className={styles.liveDealBadge}>🔥 Trending Deal</span>
              </div>

              <div className={styles.spotlightBody}>
                <div className={styles.spotlightDiscount}>FLAT 50% OFF</div>
                <div className={styles.spotlightHeading}>Welcome Ecosystem Voucher</div>
                <p className={styles.spotlightDesc}>
                  Enjoy 50% instant discount on your first service across any Swarn Bharat vertical + 500 bonus Swarn Coins.
                </p>
              </div>

              <div className={styles.codeBox}>
                <div>
                  <div className={styles.codeLabel}>Voucher Code</div>
                  <div className={styles.codeValue}>SWARN50</div>
                </div>
                <button 
                  type="button" 
                  className={styles.copyCodeBtn}
                  onClick={handleCopyCode}
                  aria-label="Copy voucher code"
                >
                  {copied ? "✓ Copied!" : "Copy Code"}
                </button>
              </div>

              <div className={styles.spotlightFoot}>
                <span>Valid on all verticals</span>
                <span>Limited time offer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Metric Strip */}
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div className={styles.statNumber}>₹{stats.savings} Cr+</div>
              <div className={styles.statLabel}>Total Member Savings</div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <div>
              <div className={styles.statNumber}>{stats.brands}+</div>
              <div className={styles.statLabel}>Partner Brands</div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div>
              <div className={styles.statNumber}>{stats.verticals}</div>
              <div className={styles.statLabel}>Connected Verticals</div>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <div className={styles.statNumber}>{stats.coupons}k+</div>
              <div className={styles.statLabel}>Vouchers Claimed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OFFERS LISTING SECTION ================= */}
      <div className={styles.offersGridSection}>
        <OffersSection isPage={true} />
      </div>

      <Footer />
    </div>
  );
}
