"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./OurBusinesses.module.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultBizImages = [
  '/images/technology.jpg',
  '/images/realestate.jpg',
  '/images/student.png',
  '/images/jobs.png',
  '/images/matrimonial.png',
  '/images/foundation.png',
  '/images/ecommerce.jpg',
  '/images/constt.png',
  '/images/h2.png'
];

export default function OurBusinesses() {
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Fetch live active business verticals from Central Backend
  useEffect(() => {
    let isMounted = true;

    async function loadBusinesses() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/businesses?status=Active`);
        if (!res.ok) {
          throw new Error(`Failed to load business verticals (${res.status})`);
        }
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setBusinesses(json.data);
        }
      } catch (err) {
        console.error("Error fetching live businesses:", err);
        if (isMounted) setError(err.message || "Failed to load business verticals");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadBusinesses();
    return () => {
      isMounted = false;
    };
  }, []);

  const visibleBusinesses = showAll ? businesses : businesses.slice(0, 6);

  useEffect(() => {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const index = Number(el.dataset.index) || 0;
          const delay = Math.min(index * 80, 560);
          setTimeout(() => el.classList.add(styles.isVisible), delay);
          cardObserver.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    cardsRef.current.forEach(c => {
      if (c) cardObserver.observe(c);
    });

    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
          ctaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      cardObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, [visibleBusinesses.length]);

  return (
    <section id="businesses" className={styles.cardsSection}>
      <div className={styles.cardsHeader}>
        <span className={styles.cardsEyebrow}>Our Portfolio</span>
        <h2 className={styles.cardsTitle}>
          Building across sectors.<br />
          Creating <em>lasting impact.</em>
        </h2>
        <p className={styles.cardsSub}>
          Our diversified businesses operate across critical sectors, creating platforms that contribute to India&apos;s growth and long-term development.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--sb-text-muted)" }}>
          <div style={{ width: "36px", height: "36px", border: "3px solid #cbd5e1", borderTopColor: "#C59A27", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ margin: 0, fontWeight: 500 }}>Loading ecosystem verticals...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#dc2626" }}>
          <p style={{ margin: 0, fontWeight: 500 }}>{error}</p>
        </div>
      ) : (
        <div className={styles.cardsGrid} id="cardsGrid">
          {visibleBusinesses.map((b, i) => {
            const num = b.number || String(i + 1).padStart(2, '0');
            const hasExternalLink = b.platformUrl && b.platformUrl.startsWith('http');
            const CardTag = b.platformUrl ? 'a' : 'article';
            const linkProps = b.platformUrl ? {
              href: b.platformUrl,
              target: hasExternalLink ? "_blank" : undefined,
              rel: hasExternalLink ? "noopener noreferrer" : undefined,
              style: { textDecoration: 'none', display: 'block' }
            } : {};

            const imageSrc = b.image || defaultBizImages[i % defaultBizImages.length];

            return (
              <CardTag 
                key={b._id || b.id || b.title} 
                className={styles.bizCard} 
                data-index={i}
                ref={el => cardsRef.current[i] = el}
                {...linkProps}
              >
                <div className={styles.cardMedia}>
                  <img 
                    src={imageSrc} 
                    alt={b.title} 
                    loading="lazy" 
                    onError={(e) => {
                      e.target.src = defaultBizImages[i % defaultBizImages.length];
                    }}
                  />
                </div>
                <div className={styles.cardScrim}></div>
                <div className={styles.cardFrame}>
                  <span className={styles.tl}></span>
                  <span className={styles.tr}></span>
                  <span className={styles.bl}></span>
                  <span className={styles.br}></span>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardNum}>{num}</span>
                  <h3 className={styles.cardTitle}>{b.title}</h3>
                  <span className={styles.cardUnderline}></span>
                  <p className={styles.cardDesc}>{b.description}</p>
                  <span className={styles.cardArrow}>Explore vertical
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </span>
                </div>
              </CardTag>
            );
          })}
        </div>
      )}

      {!loading && !showAll && businesses.length > 6 && (
        <div className={styles.cardsCtaWrap} ref={ctaRef}>
          <button 
            type="button" 
            className={styles.cardsCta} 
            onClick={() => setShowAll(true)}
          >
            Explore All Businesses ({businesses.length})
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      )}
    </section>
  );
}
