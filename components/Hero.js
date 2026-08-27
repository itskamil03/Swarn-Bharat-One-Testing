"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/homeData";
import styles from "./Hero.module.css";

const AUTOPLAY_DELAY = 6000;
const SLIDE_COUNT = heroSlides.length;
const VIRTUAL_OFFSET = SLIDE_COUNT * 20; // 80, gives huge runway

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(VIRTUAL_OFFSET);
  const [prevIndex, setPrevIndex] = useState(VIRTUAL_OFFSET - 1);
  const [direction, setDirection] = useState("next");
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const activeIndex = currentIndex % SLIDE_COUNT;
  const prevActiveIndex = prevIndex % SLIDE_COUNT;

  const goNext = useCallback(() => {
    setDirection("next");
    setCurrentIndex((c) => {
      setPrevIndex(c);
      return c + 1;
    });
  }, []);

  const goPrev = useCallback(() => {
    setDirection("prev");
    setCurrentIndex((c) => {
      setPrevIndex(c);
      return c - 1;
    });
  }, []);

  const goTo = useCallback(
    (index) => {
      const diff = (index - activeIndex + SLIDE_COUNT) % SLIDE_COUNT;
      if (diff === 0) return;
      if (diff > SLIDE_COUNT / 2) {
        setDirection("prev");
        setCurrentIndex((c) => {
          setPrevIndex(c);
          return c - (SLIDE_COUNT - diff);
        });
      } else {
        setDirection("next");
        setCurrentIndex((c) => {
          setPrevIndex(c);
          return c + diff;
        });
      }
    },
    [activeIndex]
  );

  useEffect(() => {
    if (isPaused) return undefined;
    timerRef.current = setInterval(goNext, AUTOPLAY_DELAY);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goNext, currentIndex]); // Reset timer on interaction

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) goNext();
    if (touchEndX.current - touchStartX.current > 50) goPrev();
  };



  return (
    <section
      id="top"
      className={styles.hero}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slides} data-direction={direction}>
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPrev = index === prevActiveIndex;

          let slideClass = styles.slideInactive;
          if (isActive) slideClass = styles.slideActive;
          else if (isPrev) slideClass = styles.slidePrev;

          return (
            <div
              key={slide.id}
              className={`${styles.slide} ${slideClass}`}
              aria-hidden={!isActive}
            >
              <div
                className={styles.slideImage}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className={styles.overlay} />
            </div>
          );
        })}
      </div>

      <div className={`container ${styles.content}`}>
        {heroSlides.map((slide, index) => (
          <div
            key={`content-${slide.id}`}
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



        <div
          className={styles.navContainerCenter}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.indicatorsDash}>
            {heroSlides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`nav-${slide.id}`}
                  type="button"
                  className={styles.dashButton}
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive}
                >
                  <div className={styles.dashTrack}>
                    {isActive && (
                      <div
                        key={`progress-${currentIndex}`}
                        className={styles.progressFill}
                        style={{ animationPlayState: isPaused ? "paused" : "running", animationDuration: `${AUTOPLAY_DELAY}ms` }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`${styles.arrowButton} ${styles.arrowPrev}`}
        onClick={goPrev}
        aria-label="Previous slide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <NavArrowIcon direction="left" />
      </button>
      <button
        type="button"
        className={`${styles.arrowButton} ${styles.arrowNext}`}
        onClick={goNext}
        aria-label="Next slide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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
