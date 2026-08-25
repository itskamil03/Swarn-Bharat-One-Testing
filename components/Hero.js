"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/homeData";
import styles from "./Hero.module.css";

const AUTOPLAY_DELAY = 3500;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const slideCount = heroSlides.length;

  const goTo = useCallback(
    (index) => {
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return undefined;
    timerRef.current = setInterval(goNext, AUTOPLAY_DELAY);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goNext]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) {
      goNext();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      goPrev();
    }
  };

  return (
    <section
      id="top"
      className={styles.hero}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slides}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ""}`}
            aria-hidden={index !== activeIndex}
          >
            <div
              className={styles.slideImage}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className={styles.overlay} />
          </div>
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.textBlock} ${index === activeIndex ? styles.textBlockActive : ""}`}
            aria-hidden={index !== activeIndex}
          >
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              {slide.eyebrow}
            </p>
            <h1 className={styles.headline}>
              {slide.headlineLead}
              <br />
              <span className={styles.headlineGold}>{slide.headlineHighlight}</span>
            </h1>
            <p className={styles.description}>{slide.description}</p>
            <div className={styles.ctaRow}>
              <a href={slide.primaryCta.href} className="btn btn-gold">
                {slide.primaryCta.label}
                <CtaArrowIcon />
              </a>
              <a href={slide.secondaryCta.href} className="btn btn-outline">
                {slide.secondaryCta.label}
                <CtaArrowIcon />
              </a>
            </div>
          </div>
        ))}

        <div className={styles.navContainerCenter}>
          <div className={styles.indicatorsDash}>
            {heroSlides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  className={styles.dashButton}
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive}
                >
                  <div className={styles.dashTrack}>
                    {isActive && (
                      <div
                        key={`progress-${activeIndex}`}
                        className={styles.progressFill}
                        style={{ animationPlayState: isPaused ? "paused" : "running" }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button type="button" className={`${styles.arrowButton} ${styles.arrowPrev}`} onClick={goPrev} aria-label="Previous slide">
        <NavArrowIcon direction="left" />
      </button>
      <button type="button" className={`${styles.arrowButton} ${styles.arrowNext}`} onClick={goNext} aria-label="Next slide">
        <NavArrowIcon direction="right" />
      </button>

    </section>
  );
}

function CtaArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ marginLeft: '4px' }}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavArrowIcon({ direction }) {
  const rotate = direction === "left" ? 180 : 0;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
