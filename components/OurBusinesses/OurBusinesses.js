"use client";

import { businesses } from "@/data/homeData";
import styles from "./OurBusinesses.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function OurBusinesses() {
  const [activeIndex, setActiveIndex] = useState(3);
  const sectionRef = useRef(null);
  const boardRef = useRef(null);
  const defaultIndex = 3;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleBlur = (e) => {
    if (boardRef.current && !boardRef.current.contains(e.relatedTarget)) {
      setActiveIndex(defaultIndex);
    }
  };

  return (
    <section className={styles.section} ref={sectionRef} id="businesses">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.eyebrow}><span className={styles.dash}></span> Our Businesses</div>
          <h2 className={styles.title}>Building across sectors.<br/>Creating lasting impact.</h2>
          <p className={styles.sub}>Our diversified businesses operate across critical sectors, creating platforms that contribute to India&apos;s growth and long-term development.</p>
        </div>

        <div 
          className={styles.board} 
          ref={boardRef}
          onMouseLeave={() => setActiveIndex(defaultIndex)}
          onBlur={handleBlur}
        >
          {businesses.map((bus, index) => (
            <div 
              key={bus.title} 
              className={`${styles.seg} ${activeIndex === index ? styles.active : ''}`}
              tabIndex="0"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <svg className={styles.icon} viewBox="0 0 24 24">
                <path d={bus.iconPath} />
              </svg>
              <div className={styles.num}>{bus.number}</div>
              <h3>{bus.title}</h3>
              <p>{bus.description}</p>
              <div className={styles.go}>
                <svg viewBox="0 0 24 24">
                  <line x1="5" y1="19" x2="19" y2="5" />
                  <polyline points="8 5 19 5 19 16" />
                </svg>
              </div>
              <div className={styles.accent}></div>
            </div>
          ))}
        </div>

        <div className={styles.ctaWrap}>
          <Link href="#businesses" className={styles.cta}>
            <span>Explore all businesses</span>
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
