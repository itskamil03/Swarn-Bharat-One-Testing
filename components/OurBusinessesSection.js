"use client";

import { useEffect, useRef } from "react";
import { businesses } from "@/data/homeData";
import styles from "./OurBusinessesSection.module.css";

const bizImages = [
  'https://picsum.photos/seed/biz-ecommerce/700/900',
  'https://picsum.photos/seed/biz-services/700/900',
  'https://picsum.photos/seed/biz-matrimonial/700/900',
  'https://picsum.photos/seed/biz-jobs/700/900',
  'https://picsum.photos/seed/biz-students/700/900',
  'https://picsum.photos/seed/biz-construction/700/900',
  'https://picsum.photos/seed/biz-realestate/700/900'
];

export default function OurBusinessesSection() {
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

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
  }, []);

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

      <div className={styles.cardsGrid} id="cardsGrid">
        {businesses.map((b, i) => {
          const num = String(i + 1).padStart(2, '0');
          return (
            <article 
              key={b.title} 
              className={styles.bizCard} 
              data-index={i}
              ref={el => cardsRef.current[i] = el}
            >
              <div className={styles.cardMedia}>
                <img src={bizImages[i % bizImages.length]} alt={b.title} loading="lazy" />
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
            </article>
          );
        })}
      </div>

      <div className={styles.cardsCtaWrap} ref={ctaRef}>
        <a href="#businesses" className={styles.cardsCta}>
          Explore All Businesses
          <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </section>
  );
}
