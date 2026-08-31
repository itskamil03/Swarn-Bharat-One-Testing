"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./RewardsPromoSection.module.css";

export default function RewardsPromoSection() {
  const cardsRef = useRef([]);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      cardsRef.current.forEach(card => {
        if (card) io.observe(card);
      });

      return () => io.disconnect();
    } else {
      cardsRef.current.forEach(card => {
        if (card) {
          card.style.opacity = 1;
          card.style.transform = 'none';
        }
      });
    }
  }, []);

  return (
    <section className={styles.rewardsSection}>
      <div className={styles.rewardsWrap}>
        <h2 className={styles.rewardsHeading}>Score High with Swarn Rewards</h2>

        <div className={styles.rewardsGrid}>
          {/* CARD 1: Co-branded credit card */}
          <div className={styles.rCard} ref={el => cardsRef.current[0] = el}>
            <div className={styles.rText}>
              <h3>Swarn Bharat<br />Elite Credit Card</h3>
              <p>Earn unlimited Swarn Points on every transaction, across every platform in the ecosystem.</p>
              <Link href="#" className={styles.rBtn}>
                Apply Now 
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className={styles.rVisual}>
              <div className={styles.cardStage}>
                <div className={`${styles.bankCard} ${styles.back}`}>
                  <div className={styles.bcTop}><span className={styles.bcWord}>swarn one</span><div className={styles.bcChip}></div></div>
                  <div className={styles.bcMono}>S</div>
                  <div className={styles.bcBottom}>
                    <svg className={styles.bcWave} viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 16 0" /><path d="M7 12a5 5 0 0 1 10 0" /><path d="M10 12a2 2 0 0 1 4 0" /></svg>
                    <span className={styles.bcTier}>ELITE</span>
                  </div>
                </div>
                <div className={`${styles.bankCard} ${styles.front}`}>
                  <div className={styles.bcTop}><span className={styles.bcWord}>swarn one</span><div className={styles.bcChip}></div></div>
                  <div className={styles.bcMono}>S</div>
                  <div className={styles.bcBottom}>
                    <svg className={styles.bcWave} viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 16 0" /><path d="M7 12a5 5 0 0 1 10 0" /><path d="M10 12a2 2 0 0 1 4 0" /></svg>
                    <span className={styles.bcTier}>ELITE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Rewards program */}
          <div className={styles.rCard} ref={el => cardsRef.current[1] = el}>
            <div className={styles.rText}>
              <div className={styles.rEyebrow}>
                <span className={styles.mark}>Swarn Bharat</span>
                <span className={styles.tag}>REWARDS</span>
              </div>
              <h3>Your journey.<br />Your rewards.</h3>
              <p>Earn Swarn Points on competitions, purchases, and every platform you use.</p>
              <Link href="/rewards" className={styles.rBtn}>
                Explore Now 
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className={styles.rVisual}>
              <div className={styles.coinStage}>
                <div className={styles.coinGlow}></div>
                <span className={`${styles.spark} ${styles.spark1}`}></span>
                <span className={`${styles.spark} ${styles.spark2}`}></span>
                <span className={`${styles.spark} ${styles.spark3}`}></span>
                <div className={styles.coinWrap}>
                  <div className={styles.coin}>
                    <div className={`${styles.coinFace} ${styles.front}`}><span className={styles.mono}>S</span></div>
                    <div className={`${styles.coinFace} ${styles.back}`}><span className={styles.sub}>SWARN<br />BHARAT<br />REWARDS</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
