"use client";

import { swarnBharatCards } from "@/data/homeData";
import styles from "./WhoWeAreSection.module.css";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function WhoWeAreSection() {
  const sectionRef = useRef(null);

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

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.section} ref={sectionRef}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}><span className={styles.dash}></span> Who We Are</div>
          <h1 className={styles.title}>Swarn <em>Bharat</em></h1>
          <p className={styles.lede}>Swarn Bharat is a diversified organization working across key sectors of the economy. Our mission is to nation-build by creating long-term value for our stakeholders and contributing to India&apos;s growth story.</p>
          <Link href="#about" className={styles.cta}>
            <span>Know more about us</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        <div className={styles.cards}>
          {swarnBharatCards.map((card, index) => (
            <div className={styles.card} tabIndex="0" key={card.title}>
              <div className={styles.cardNumber}>0{index + 1}</div>
              <div className={styles.art}>
                <img src={card.image} alt={card.title} className={styles.image} />
              </div>
              <div className={styles.veil}></div>
              <div className={styles.seal}><i></i><i></i><i></i><i></i></div>
              <div className={styles.content}>
                <div className={styles.badge}>
                  <svg viewBox="0 0 24 24" fill={card.title === "Mission" ? "none" : "currentColor"} stroke={card.title === "Mission" ? "currentColor" : "none"} strokeWidth={card.title === "Mission" ? "1.4" : undefined}>
                    {card.title === "Vision" && (
                      <>
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" fill="none" stroke="currentColor" strokeWidth="1.4" />
                        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </>
                    )}
                    {card.title === "Mission" && (
                      <>
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
                      </>
                    )}
                    {card.title === "Values" && (
                      <rect x="7" y="7" width="10" height="10" rx="1.5" transform="rotate(45 12 12)" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    )}
                  </svg>
                </div>
                <h3>{card.title}</h3>
                <div className={styles.rule}></div>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
