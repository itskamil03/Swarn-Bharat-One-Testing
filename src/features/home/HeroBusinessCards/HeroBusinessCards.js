"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { businesses } from "@/data/homeData";
import styles from "./HeroBusinessCards.module.css";

const getBgForIndex = (index) => {
  const images = [
    "/images/slide-03.jpg",
    "/images/project-02.jpg",
    "/images/project-03.jpg",
    "/images/project-04.jpg",
    "/images/vision.jpg",
    "/images/slide-04.jpg",
  ];
  return images[index % images.length];
};

const AUTOPLAY_DELAY = 5500; 

export default function HeroBusinessCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const numCards = businesses.length;

  const goTo = useCallback((index) => {
    setActiveIndex((index + numCards) % numCards);
  }, [numCards]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return undefined;
    timerRef.current = setInterval(goNext, AUTOPLAY_DELAY);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goNext]);

  // Subtle Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || window.innerWidth < 900) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 12; // Max 6px
      const yPos = (clientY / window.innerHeight - 0.5) * 12;
      containerRef.current.style.setProperty("--mouse-x", `${xPos}px`);
      containerRef.current.style.setProperty("--mouse-y", `${yPos}px`);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className={styles.wrapper} 
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className={styles.headerLayer}>
        <div className={styles.portfolioLabel}>Our Portfolio</div>
        <div className={styles.counter}>
          <span className={styles.counterCurrent}>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className={styles.counterDivider}>/</span>
          <span className={styles.counterTotal}>{String(numCards).padStart(2, "0")}</span>
        </div>
        <div className={styles.goldLine}>
           <div className={styles.goldLineHighlight} key={`line-${activeIndex}`} />
        </div>
      </div>
      
      <div className={styles.stackContainer}>
        {businesses.map((biz, idx) => {
          let offset = (idx - activeIndex + numCards) % numCards;
          
          if (offset > numCards / 2) {
             offset -= numCards;
          }

          let positionClass = "";
          if (offset === 0) positionClass = styles.cardActive;
          else if (offset === 1) positionClass = styles.cardNext1;
          else if (offset === 2) positionClass = styles.cardNext2;
          else if (offset === -1) positionClass = styles.cardExiting;
          else positionClass = styles.cardHidden;

          const isActive = offset === 0;

          return (
            <div
              key={biz.number}
              className={`${styles.card} ${positionClass}`}
              onClick={() => {
                if (offset > 0) goTo(idx);
              }}
              role="button"
              tabIndex={offset > 0 ? 0 : -1}
              aria-hidden={offset > 2 || offset < -1}
            >
              <div 
                className={styles.cardBgImage} 
                style={{ backgroundImage: `url(${getBgForIndex(idx)})` }}
              />
              <div className={styles.cardOverlay} />
              
              <div className={styles.bgNumber} aria-hidden="true">{biz.number}</div>
              
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNumber}>{biz.number}</span>
                  <h3 className={styles.cardTitle}>{biz.title}</h3>
                </div>
                
                <div className={styles.cardDivider} />
                
                <p className={styles.cardDesc}>{biz.description}</p>
                <span className={styles.cardCta}>EXPLORE &rarr;</span>
              </div>
              
              {isActive && <div className={styles.lightSweep} key={`sweep-${activeIndex}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
