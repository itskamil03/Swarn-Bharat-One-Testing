"use client";

import { useEffect, useRef } from "react";
import styles from "./ImpactStats.module.css";

const impactStatsData = [
  {
    target: 25, suffix: "+", label: "Years",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" /></svg>
  },
  {
    target: 120000, suffix: "+", locale: true, label: "People Impacted",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  },
  {
    target: 25, suffix: "+", label: "Major Initiatives",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
  },
  {
    target: 50, suffix: "+", label: "Strategic Partnerships",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12h1.5l2-3 3 6 2-3H21" /><path d="M3 12a5 5 0 0 1 8-4l1 1" /><path d="M21 12a5 5 0 0 1-8 4l-1-1" /></svg>
  },
  {
    target: 100, suffix: "M+", label: "Lives Touched",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5 5 0 0 0-7.1 0L12 6.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 20.3l8.8-8.6a5 5 0 0 0 0-7.1z" /></svg>
  }
];

function formatNumber(value, useLocale) {
  const rounded = Math.round(value);
  return useLocale ? rounded.toLocaleString('en-IN') : rounded.toLocaleString('en-US');
}

export default function ImpactStats() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statNode = entry.target;
            statNode.classList.add(styles.inView);

            // Animate count-up
            const target = parseInt(statNode.getAttribute('data-target'), 10);
            const suffix = statNode.getAttribute('data-suffix');
            const useLocale = statNode.getAttribute('data-locale') === '1';
            const numberEl = statNode.querySelector(`.${styles.number}`);
            
            if (numberEl) {
              const duration = 1600;
              const start = performance.now();

              function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = target * eased;
                numberEl.textContent = formatNumber(current, useLocale) + suffix;
                
                if (progress < 1) {
                  requestAnimationFrame(tick);
                }
              }
              requestAnimationFrame(tick);
            }

            observer.unobserve(statNode);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statElements = containerRef.current?.querySelectorAll(`.${styles.stat}`);
    statElements?.forEach(el => observer.observe(el));

    return () => {
      statElements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className={styles.stats} ref={containerRef} id="impact">
      <div className={styles.gridTexture}></div>
      <div className={styles.glow}></div>

      <div className={styles.wrap}>
        <div className={styles.row}>
          {impactStatsData.map((stat, i) => (
            <div 
              key={stat.label} 
              className={styles.stat} 
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-target={stat.target}
              data-suffix={stat.suffix}
              data-locale={stat.locale ? '1' : '0'}
            >
              <div className={styles.iconRing}>{stat.icon}</div>
              <div className={styles.number}>0</div>
              <div className={styles.underline}></div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
