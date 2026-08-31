"use client";

import { useEffect, useRef } from "react";
import styles from "./Rewards.module.css";
import { IconCoin, IconArrowUR, IconArrowDR } from "./Icons";

export default function StatsStrip() {
  const statRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          
          const duration = 1800;
          const start = performance.now();
          const format = n => Math.round(n).toLocaleString('en-IN');
          
          function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = format(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    statRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.container} ${styles.statsStrip} reveal`}>
      <div className={styles.statsCard}>
        <div className={styles.stat}>
          <div className={styles.iconBadge}><IconCoin /></div>
          <div className={styles.val} data-count="24850" ref={el => statRefs.current[0] = el}>0</div>
          <div className={styles.lab}>Available Points</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.iconBadge}><IconArrowUR /></div>
          <div className={styles.val} data-count="68200" ref={el => statRefs.current[1] = el}>0</div>
          <div className={styles.lab}>Points Earned (Lifetime)</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.iconBadge}><IconArrowDR /></div>
          <div className={styles.val} data-count="43350" ref={el => statRefs.current[2] = el}>0</div>
          <div className={styles.lab}>Points Redeemed</div>
        </div>
      </div>
    </div>
  );
}
