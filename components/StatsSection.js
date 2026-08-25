"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/homeData";
import styles from "./StatsSection.module.css";

function formatValue(value) {
  return value.toLocaleString("en-IN");
}

function StatItem({ stat, isVisible, delay }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return undefined;

    const duration = 1600;
    const start = performance.now() + delay;
    let frame;

    const tick = (now) => {
      const elapsed = Math.max(0, now - start);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(stat.value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, stat.value, delay]);

  return (
    <div className={styles.stat}>
      <p className={styles.value}>
        {formatValue(displayValue)}
        {stat.suffix}
      </p>
      <p className={styles.label}>{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" ref={ref} className={`section section-navy ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        {stats.map((stat, index) => (
          <StatItem key={stat.label} stat={stat} isVisible={isVisible} delay={index * 120} />
        ))}
      </div>
    </section>
  );
}
