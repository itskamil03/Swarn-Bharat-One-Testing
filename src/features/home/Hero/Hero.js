"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides as defaultHeroSlides } from "@/data/homeData";
import styles from "./Hero.module.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const AUTOPLAY_DELAY = 6000;

export default function Hero() {
  const [slides, setSlides] = useState(defaultHeroSlides);
  const slideCount = slides.length || 1;
  const virtualOffset = slideCount * 20;

  const [currentIndex, setCurrentIndex] = useState(virtualOffset);
  const [prevIndex, setPrevIndex] = useState(virtualOffset - 1);
  const [direction, setDirection] = useState("next");
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch live active slides from Central Backend API
  useEffect(() => {
    const fetchLiveSlides = async () => {
      try {
        const res = await fetch(`${API_BASE}/hero`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setSlides(json.data);
          }
        }
      } catch (e) {
        console.warn("Backend Hero API not reachable, using default slides:", e.message);
      }
    };
    fetchLiveSlides();
  }, []);

  const activeIndex = currentIndex % slideCount;
  const prevActiveIndex = prevIndex % slideCount;

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
      const diff = (index - activeIndex + slideCount) % slideCount;
      if (diff === 0) return;
      if (diff > slideCount / 2) {
        setDirection("prev");
        setCurrentIndex((c) => {
          setPrevIndex(c);
          return c - (slideCount - diff);
        });
      } else {
        setDirection("next");
        setCurrentIndex((c) => {
          setPrevIndex(c);
          return c + diff;
        });
      }
    },
    [activeIndex, slideCount]
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
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPrev = index === prevActiveIndex;

          let slideClass = styles.slideInactive;
          if (isActive) slideClass = styles.slideActive;
          else if (isPrev) slideClass = styles.slidePrev;

          const slideKey = slide._id || slide.id || index;

          return (
            <div
              key={slideKey}
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
        {slides.map((slide, index) => {
          const slideKey = slide._id || slide.id || index;
          const primaryCta = slide.primaryCta || { label: "Explore Our Businesses", href: "#businesses" };
          const secondaryCta = slide.secondaryCta || { label: "Our Impact", href: "#impact" };

          return (
            <div
              key={`content-${slideKey}`}
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
                <a href={primaryCta.href || "#businesses"} className="btn btn-gold">
                  {primaryCta.label || "Explore Our Businesses"}
                  <CtaArrowIcon />
                </a>
                <a href={secondaryCta.href || "#impact"} className="btn btn-outline">
                  {secondaryCta.label || "Our Impact"}
                  <CtaArrowIcon />
                </a>
              </div>
            </div>
          );
        })}



        <div
          className={styles.navContainerCenter}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.indicatorsDash}>
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              const slideKey = slide._id || slide.id || index;
              return (
                <button
                  key={`nav-${slideKey}`}
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
