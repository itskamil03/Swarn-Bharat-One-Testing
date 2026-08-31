"use client";

import { useEffect, useRef } from "react";
import styles from "./Rewards.module.css";
import { IconTrend, IconGift, IconStar, IconArrowR } from "./Icons";

export default function HeroSection() {
  const balanceRef = useRef(null);

  useEffect(() => {
    // Basic counter animation
    const el = balanceRef.current;
    if (!el) return;
    const target = 24850;
    const duration = 2200;
    const start = performance.now();
    const format = n => Math.round(n).toLocaleString('en-IN');
    
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, []);

  return (
    <header className={styles.hero} id="overview">
      <div className={styles.heroGrain}></div>
      <div className={`${styles.container} ${styles.heroInner}`}>
        <div>
          <div className={styles.eyebrowLine}>
            <span className={styles.dot}></span> SWARN BHARAT REWARD PROGRAM
          </div>
          <h1>Your journey deserves <em className={styles.serifItalic}>its own currency.</em></h1>
          <p className={styles.lede}>
            Every competition entered, referral made and service used across the Swarn Bharat ecosystem earns Swarn Points — one balance, redeemable across seven worlds.
          </p>
          <div className={styles.heroCtas}>
            <button className={`${styles.btn} ${styles.btnGold}`}>
              Redeem Points <IconArrowR />
            </button>
            <button className={`${styles.btn} ${styles.btnGhost}`}>
              View Activity
            </button>
          </div>
          <div className={styles.heroBalance}>
            <div>
              <div className={styles.num} ref={balanceRef}>0</div>
              <div className={styles.lab}>Swarn Points available</div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.delta}>
              <IconTrend /> +1,240 SP this month
            </div>
          </div>
        </div>

        <div className={styles.coinStage}>
          <div className={styles.coinGlow}></div>
          <div className={`${styles.floatChip} ${styles.fc1}`}>
            <IconGift /> Exclusive rewards
          </div>
          <div className={`${styles.floatChip} ${styles.fc2}`}>
            <IconStar /> 7 platforms
          </div>
          <span className={`${styles.spark} ${styles.spark1}`}></span>
          <span className={`${styles.spark} ${styles.spark2}`}></span>
          <span className={`${styles.spark} ${styles.spark3}`}></span>
          <span className={`${styles.spark} ${styles.spark4}`}></span>
          <div className={styles.coinWrap}>
            <div className={styles.coin}>
              <div className={`${styles.coinFace} ${styles.front}`}>
                <span className={styles.mono}>S</span>
              </div>
              <div className={`${styles.coinFace} ${styles.back}`}>
                <span className={styles.sub}>SWARN<br/>BHARAT<br/>REWARDS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
