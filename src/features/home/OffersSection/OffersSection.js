"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./OffersSection.module.css";

export default function OffersSection({ isPage = false }) {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    // Scroll observation
    const track = trackRef.current;
    if (!track) return;

    const updateNavState = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      setCanScrollPrev(track.scrollLeft > 0);
      setCanScrollNext(track.scrollLeft < max);
    };

    track.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState);
    updateNavState();

    // Intersection observer for animation
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = track.querySelectorAll('.offer-card');
    cards.forEach((card, i) => card.style.setProperty('--i', i));

    const animateCount = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const prefix = el.dataset.prefix || '';
      const numEl = el.querySelector('.num');
      if (reduced) {
        numEl.textContent = prefix + target;
        return;
      }
      const duration = 900;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        numEl.textContent = prefix + Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const val = entry.target.querySelector(`.${styles.offerCardDiscountValue}`);
          if (val) animateCount(val);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    cards.forEach(card => io.observe(card));

    return () => {
      track.removeEventListener('scroll', updateNavState);
      window.removeEventListener('resize', updateNavState);
      io.disconnect();
    };
  }, []);

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.offer-card');
    if (!card) return;
    const gap = 24;
    const amount = (card.offsetWidth + gap) * dir;
    track.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleCopyCode = (e, code) => {
    const btn = e.currentTarget;
    navigator.clipboard?.writeText(code).catch(() => { });
    const textEl = btn.querySelector(`.${styles.offerCardCodeText}`);
    const original = code;
    btn.classList.add(styles.copied);
    textEl.textContent = 'Copied';
    setTimeout(() => {
      btn.classList.remove(styles.copied);
      textEl.textContent = original;
    }, 1400);
  };

  const offers = [
    {
      id: 1,
      grad: "linear-gradient(155deg,#16325C,#0B1B36)",
      accent: "#122A52",
      icon: <path d="M12 2v20m10-10H2" />, // simple tech/plus icon or use e-commerce
      prefix: "",
      count: 10,
      label: "Flat",
      unit: "% off",
      category: "Technology",
      title: "10% off gadgets via SBI Card",
      desc: "Use your SBI Credit Card to grab a flat 10% discount on the latest technology and gadgets.",
      code: "SBI10TECH"
    },
    {
      id: 2,
      grad: "linear-gradient(155deg,#D5334B,#A31730)",
      accent: "#C21F3A",
      icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
      prefix: "",
      count: 100,
      label: "Up to",
      unit: "% Fee Waiver",
      category: "Real Estate",
      title: "HDFC Home Loan + Kotak Bank debit offer",
      desc: "Enjoy zero processing fees on HDFC home loans and get exclusive discounts on property bookings using Kotak Bank debit cards.",
      code: "REALBANK"
    },
    {
      id: 3,
      grad: "linear-gradient(155deg,#12786C,#0A3F38)",
      accent: "#0E5C52",
      icon: <path d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />,
      prefix: "",
      count: 5,
      label: "Up to",
      unit: "% Cashback",
      category: "Students Portal",
      title: "Education loan cashback via Axis Bank",
      desc: "Get guaranteed cashback on education loans processed through Axis Bank for premium courses and certifications.",
      code: "AXISED"
    },
    {
      id: 4,
      grad: "linear-gradient(155deg,#8C3A73,#5C1F4A)",
      accent: "#7A2E63",
      icon: <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      prefix: "₹",
      count: 2000,
      label: "Flat",
      unit: " Bonus",
      category: "Jobs",
      title: "Salary account bonus with ICICI Bank",
      desc: "Open a salary account through our Jobs portal with ICICI Bank and earn a guaranteed joining bonus.",
      code: "ICICIJOBS"
    },
    {
      id: 5,
      grad: "linear-gradient(155deg,#C99141,#8F5F1F)",
      accent: "#A9762E",
      icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
      prefix: "",
      count: 15,
      label: "Up to",
      unit: "% off",
      category: "Matrimonial",
      title: "Wedding shopping deals via Paytm UPI",
      desc: "Get exclusive discounts and cashback on partner brands for your wedding shopping using Paytm UPI.",
      code: "PAYTMMATCH"
    },
    {
      id: 6,
      grad: "linear-gradient(155deg,#4A6A32,#2D421E)",
      accent: "#3B5527",
      icon: <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />,
      prefix: "",
      count: 100,
      label: "Up to",
      unit: "% Match",
      category: "Foundation",
      title: "Donation match with PhonePe UPI",
      desc: "Donate to Swarn Bharat Foundation using PhonePe UPI and get your contribution matched by partner initiatives.",
      code: "PHONEPECARE"
    },
    {
      id: 7,
      grad: "linear-gradient(155deg,#3B82F6,#1D4ED8)",
      accent: "#2563EB",
      icon: <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
      prefix: "₹",
      count: 500,
      label: "Up to",
      unit: " Cashback",
      category: "E-Commerce",
      title: "Marketplace cashback via Google Pay UPI",
      desc: "Shop on the Swarn Bharat marketplace using Google Pay UPI and earn guaranteed cashback on your orders.",
      code: "GPAYECOM"
    }
  ];

  return (
    <section className={styles.offersSection} aria-label="Offers and discounts">
      <div className={styles.offers}>
        <div className={styles.offersHead}>
          <div className={styles.offersTitleBlock}>
            <p className={styles.offersEyebrow}>FOR MEMBERS</p>
            <h2 className={styles.offersTitle}>Offers &amp; Discounts</h2>
            <p className={styles.offersSub}>Curated savings and exclusive benefits across the Swarn Bharat ecosystem — refreshed regularly.</p>
          </div>
          {!isPage && (
            <div className={styles.offersNav}>
              <button
                type="button"
                aria-label="Previous offers"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollPrev}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button
                type="button"
                aria-label="Next offers"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollNext}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          )}
        </div>

        <div className={isPage ? styles.offersGrid : styles.offersTrack} ref={trackRef}>
          {offers.map(offer => (
            <article
              key={offer.id}
              className="offer-card"
              style={{ '--card-grad': offer.grad, '--card-accent': offer.accent }}
            >
              <div className={styles.offerCardMedia}>
                <div className={styles.offerCardIcon}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {offer.icon}
                  </svg>
                </div>
                <div className={styles.offerCardDiscount}>
                  <span className={styles.offerCardDiscountLabel}>{offer.label}</span>
                  <span className={styles.offerCardDiscountValue} data-count={offer.count} data-prefix={offer.prefix}>
                    <span className="num">0</span>
                    <span className="unit">{offer.unit}</span>
                  </span>
                </div>
              </div>
              <div className={styles.offerCardBody}>
                <span className={styles.offerCardCategory}>{offer.category}</span>
                <h3 className={styles.offerCardTitle}>{offer.title}</h3>
                <p className={styles.offerCardDesc}>{offer.desc}</p>
                <div className={styles.offerCardFoot}>
                  <button
                    className={styles.offerCardCode}
                    type="button"
                    onClick={(e) => handleCopyCode(e, offer.code)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="12" height="12" rx="1.5" />
                      <path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" />
                    </svg>
                    <span className={styles.offerCardCodeText}>{offer.code}</span>
                  </button>
                  <Link href="/offers" className={styles.offerCardLink}>
                    Know more
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {/* View All Card */}
          {!isPage && (
            <Link href="/offers" className={`offer-card ${styles.viewAllCard}`}>
              <div className={styles.viewAllContent}>
                <div className={styles.viewAllIcon}>
                  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </div>
                <h3 className={styles.viewAllTitle}>View all offers</h3>
              </div>
            </Link>
          )}

        </div>
      </div>
    </section>
  );
}
