"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import OffersSection from "@/features/home/OffersSection/OffersSection";
import styles from "./page.module.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function OffersPage() {
  const [featuredOffers, setFeaturedOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const [stats, setStats] = useState({
    savings: "1.5",
    brands: 100,
    verticals: 7,
    coupons: 10,
  });

  // Fetch offers and stats from Central Backend API
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/offers?status=Active`);
        if (!res.ok) {
          throw new Error(`Failed to load offers (${res.status})`);
        }
        const json = await res.json();
        
        if (isMounted) {
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setFeaturedOffers(json.data);
          } else {
            setFeaturedOffers([]);
          }
        }
      } catch (err) {
        console.error("Error fetching live offers:", err);
        if (isMounted) {
          setError(err.message || "Unable to fetch offers at this time.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }

      // Fetch dynamic stats if available
      try {
        const statsRes = await fetch(`${API_BASE}/offers/stats`);
        if (statsRes.ok) {
          const statsJson = await statsRes.json();
          if (statsJson.success && statsJson.data) {
            if (isMounted) {
              setStats(prev => ({
                ...prev,
                coupons: statsJson.data.totalOffers || prev.coupons,
                verticals: statsJson.data.categoriesCount || prev.verticals,
              }));
            }
          }
        }
      } catch (e) {
        // Ignore stats fallback
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Animated metric counters
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let animId;
    const frame = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setStats(prev => ({
        savings: (1.5 * eased).toFixed(1),
        brands: Math.round(100 * eased),
        verticals: Math.round((prev.verticals || 7) * eased) || 7,
        coupons: Math.round((prev.coupons || 10) * eased) || 10,
      }));
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

  // Automatic slideshow
  useEffect(() => {
    if (isPaused || featuredOffers.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredOffers.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, featuredOffers.length]);

  // Reset slide index if bounds change
  useEffect(() => {
    if (currentSlide >= featuredOffers.length && featuredOffers.length > 0) {
      setCurrentSlide(0);
    }
  }, [featuredOffers.length, currentSlide]);

  const handleNextSlide = () => {
    if (featuredOffers.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % featuredOffers.length);
  };

  const handlePrevSlide = () => {
    if (featuredOffers.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + featuredOffers.length) % featuredOffers.length);
  };

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2200);
  };

  const activeOffer = featuredOffers[currentSlide] || null;

  return (
    <div className={styles.offersPageWrapper}>
      <Navbar />

      {/* ================= LIGHT THEME PROFESSIONAL OFFERS HERO HEADER ================= */}
      <section 
        className={styles.hero}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Ambient Light Theme Background & Dynamic Pattern */}
        <div className={styles.heroBg}>
          <div className={styles.heroRadialGold} />
          <div className={styles.heroRadialBlue} />
          <div className={styles.heroRadialRose} />
          <div className={styles.heroMeshLight} />
        </div>

        <div className={styles.wrap}>
          <div className={styles.heroMainGrid}>
            
            {/* Left Column: Headlines & Benefits */}
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.pulseDot} />
                <span>EXCLUSIVE GROUP PRIVILEGES & OFFERS</span>
              </div>

              <h1 className={styles.heroTitle}>
                Unmatched Savings.
                <br />
                <span className={styles.gradientHighlight}>Exclusive Privileges</span> Across Bharat.
              </h1>

              <p className={styles.heroLead}>
                Unlock verified member benefits, instant discounts, and exclusive partner vouchers spanning 
                <strong> E-Commerce, Real Estate, Technology, Education, and Matrimonial</strong> services.
              </p>

              {/* Dynamic Value Pillar Chips */}
              <div className={styles.heroPillars}>
                <div className={`${styles.pillarChip} ${styles.chipAmber}`}>
                  <span className={styles.pillarIcon}>⚡</span>
                  <span>Up to 60% Instant Off</span>
                </div>
                <div className={`${styles.pillarChip} ${styles.chipGold}`}>
                  <span className={styles.pillarIcon}>🪙</span>
                  <span>2X Swarn Coins</span>
                </div>
                <div className={`${styles.pillarChip} ${styles.chipEmerald}`}>
                  <span className={styles.pillarIcon}>🔒</span>
                  <span>100% Verified Deals</span>
                </div>
                <div className={`${styles.pillarChip} ${styles.chipBlue}`}>
                  <span className={styles.pillarIcon}>🌐</span>
                  <span>7 Connected Verticals</span>
                </div>
              </div>

              {/* Quick Jump Browse Buttons */}
              <div className={styles.quickBrowseRow}>
                <span className={styles.quickBrowseLabel}>Quick Jump:</span>
                <div className={styles.categoryPills}>
                  {featuredOffers.map((offer, idx) => (
                    <button
                      key={offer._id || offer.id || idx}
                      type="button"
                      className={`${styles.catPill} ${idx === currentSlide ? styles.catPillActive : ""}`}
                      onClick={() => setCurrentSlide(idx)}
                    >
                      {offer.category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Changing Offer Card Showcase */}
            <div className={styles.showcaseContainer}>
              {loading ? (
                <div className={styles.showcaseCard} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "420px" }}>
                  <div style={{ textAlign: "center", color: "#64748b", padding: "40px 20px" }}>
                    <div style={{ width: "36px", height: "36px", border: "3px solid #cbd5e1", borderTopColor: "#C59A27", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
                    <p style={{ margin: 0, fontWeight: 500 }}>Loading exclusive offers...</p>
                  </div>
                </div>
              ) : error ? (
                <div className={styles.showcaseCard} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "420px" }}>
                  <div style={{ textAlign: "center", color: "#dc2626", padding: "40px 20px" }}>
                    <p style={{ margin: "0 0 12px", fontWeight: 600 }}>{error}</p>
                    <button 
                      type="button" 
                      onClick={() => window.location.reload()}
                      className={styles.claimBtn}
                      style={{ display: "inline-block", cursor: "pointer", border: "none" }}
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : activeOffer ? (
                <div className={styles.showcaseCard}>
                  
                  {/* Background Image Carousel with Smooth Crossfade */}
                  <div className={styles.cardImageContainer}>
                    {featuredOffers.map((offer, index) => (
                      <div
                        key={offer._id || offer.id || index}
                        className={`${styles.cardImageSlide} ${index === currentSlide ? styles.cardImageActive : ""}`}
                      >
                        {offer.image ? (
                          <img
                            src={offer.image}
                            alt={offer.title}
                            className={styles.offerImg}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1e293b, #0f172a)" }} />
                        )}
                        <div className={styles.imageOverlayGradient} />
                      </div>
                    ))}

                    {/* Slide Category Floating Tag */}
                    <div className={styles.floatingTagRow}>
                      <span 
                        className={styles.spotlightTag}
                        style={{ 
                          color: activeOffer.accentColor || "#C59A27",
                          backgroundColor: "rgba(255, 255, 255, 0.95)"
                        }}
                      >
                        {activeOffer.tag || `${activeOffer.category} Offer`}
                      </span>
                      <span className={styles.liveDealBadge}>
                        {activeOffer.liveBadge || "🔥 Active Deal"}
                      </span>
                    </div>

                    {/* Carousel Nav Arrows */}
                    {featuredOffers.length > 1 && (
                      <div className={styles.sliderControls}>
                        <button
                          type="button"
                          className={styles.arrowBtn}
                          onClick={handlePrevSlide}
                          aria-label="Previous offer"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className={styles.arrowBtn}
                          onClick={handleNextSlide}
                          aria-label="Next offer"
                        >
                          ›
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Offer Details Body */}
                  <div className={styles.spotlightBody}>
                    <div className={styles.discountRow}>
                      <span 
                        className={styles.spotlightDiscount}
                        style={{ color: activeOffer.accentColor || "#C59A27" }}
                      >
                        {activeOffer.discount || `${activeOffer.label || "Flat"} ${activeOffer.prefix || ""}${activeOffer.count || ""}${activeOffer.unit || ""}`}
                      </span>
                      <span className={styles.expiryTag}>{activeOffer.expiry || "Limited Time"}</span>
                    </div>

                    <h3 className={styles.spotlightHeading}>
                      {activeOffer.title}
                    </h3>
                    
                    <p className={styles.spotlightDesc}>
                      {activeOffer.desc}
                    </p>

                    {/* Copyable Voucher Code Box */}
                    {activeOffer.code && (
                      <div className={styles.codeBox}>
                        <div className={styles.codeInfo}>
                          <span className={styles.codeLabel}>VOUCHER CODE</span>
                          <span className={styles.codeValue}>{activeOffer.code}</span>
                        </div>
                        <button
                          type="button"
                          className={`${styles.copyCodeBtn} ${copiedCode === activeOffer.code ? styles.copiedBtn : ""}`}
                          onClick={() => handleCopyCode(activeOffer.code)}
                          aria-label={`Copy code ${activeOffer.code}`}
                        >
                          {copiedCode === activeOffer.code ? (
                            <>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Foot Note and Action Button */}
                    <div className={styles.spotlightFoot}>
                      <span className={styles.validityNote}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {activeOffer.validity || "Valid across ecosystem"}
                      </span>
                      <a href={activeOffer.linkUrl || "#offers-listing"} className={styles.claimBtn}>
                        {activeOffer.linkText || "Shop Deals Now"} →
                      </a>
                    </div>
                  </div>

                  {/* Progress Indicators / Dots */}
                  {featuredOffers.length > 1 && (
                    <div className={styles.indicatorStrip}>
                      {featuredOffers.map((offer, index) => (
                        <button
                          key={offer._id || offer.id || index}
                          type="button"
                          className={`${styles.indicatorDot} ${index === currentSlide ? styles.indicatorActive : ""}`}
                          style={{
                            backgroundColor: index === currentSlide ? (activeOffer.accentColor || "#C59A27") : "rgba(0, 0, 0, 0.15)"
                          }}
                          onClick={() => setCurrentSlide(index)}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                </div>
              ) : (
                <div className={styles.showcaseCard} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "420px" }}>
                  <div style={{ textAlign: "center", color: "#64748b", padding: "40px 20px" }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>No active offers available right now.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Light Themed Live Metric Strip */}
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <div className={`${styles.statIcon} ${styles.iconGold}`}>
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
            <div className={`${styles.statIcon} ${styles.iconPurple}`}>
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
            <div className={`${styles.statIcon} ${styles.iconBlue}`}>
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
            <div className={`${styles.statIcon} ${styles.iconEmerald}`}>
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
      <div className={styles.offersGridSection} id="offers-listing">
        <OffersSection isPage={true} />
      </div>

      <Footer />
    </div>
  );
}
