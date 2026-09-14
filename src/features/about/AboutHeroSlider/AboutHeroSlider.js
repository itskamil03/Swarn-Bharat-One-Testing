"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import styles from "./AboutHeroSlider.module.css";

const SLIDES_DATA = [
  {
    region: "Swarn Bharat Group · Enterprise Ecosystem",
    place: "Unified Platform",
    cardTag: "Group Ecosystem",
    title: "Architecting India's<br />Premier Connected Ecosystem",
    desc: "Uniting technology, commerce, real estate, career pathways, matrimonial, and community growth under one interconnected platform for over 1,000,000+ citizens nationwide.",
    bg: "/images/h2.png",
    thumb: "/images/h2.png",
    ctaText: "Explore Our Ecosystem",
    ctaLink: "#ecosystem",
  },
  {
    region: "Urban Development · 18+ Smart Cities",
    place: "Modern Living",
    cardTag: "Real Estate & Infra",
    title: "Building Tomorrow's<br />Sustainable Living Spaces",
    desc: "Pioneering eco-conscious residential townships, prime commercial hubs, and modern infrastructure designed to enrich community life across 18+ cities.",
    bg: "/images/real.png",
    thumb: "/images/real.png",
    ctaText: "View Developments",
    ctaLink: "#ecosystem",
  },
  {
    region: "Enterprise Innovation · Pan-India Cloud",
    place: "Digital Engineering",
    cardTag: "Technology & Cloud",
    title: "Empowering Growth<br />Through Scalable Technology",
    desc: "Powering resilient cloud platforms, fintech escrow systems, tokenized Swarn Coin rewards, and seamless digital services with bank-grade 256-bit security.",
    bg: "/images/h1.png",
    thumb: "/images/h1.png",
    ctaText: "Discover Technology",
    ctaLink: "#ecosystem",
  },
];

const N = SLIDES_DATA.length; // 3
const REPEATS = 7; // 21 items total for infinite buffer
const BASE_INDEX = 3 * N; // 9
const INITIAL_TRACK_POS = BASE_INDEX - 1; // 8, so card 9 (Slide 0) is in center slot
const DURATION = 6000; // 6s per slide

export default function AboutHeroSlider() {
  const [trackPos, setTrackPos] = useState(INITIAL_TRACK_POS);
  const [withTransition, setWithTransition] = useState(true);
  const [cardStep, setCardStep] = useState(192); // 176px + 16px default
  const [isLeaving, setIsLeaving] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  const [slowDriftIndex, setSlowDriftIndex] = useState(0);

  const railTrackRef = useRef(null);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef(null);
  const rafRef = useRef(null);
  const autoplayRef = useRef(autoplay);

  autoplayRef.current = autoplay;

  // Extended slides array (21 items for seamless wrap)
  const extendedSlides = useMemo(() => {
    const list = [];
    for (let r = 0; r < REPEATS; r++) {
      SLIDES_DATA.forEach((s, idx) => {
        list.push({ ...s, originalIndex: idx, cloneId: `${r}-${idx}` });
      });
    }
    return list;
  }, []);

  // Active slide index (0, 1, or 2)
  const activeDataIndex = ((trackPos + 1) % N + N) % N;
  const currentSlide = SLIDES_DATA[activeDataIndex];
  const [displayedSlide, setDisplayedSlide] = useState(SLIDES_DATA[0]);

  // Measure card width + gap dynamically for exact pixel translation
  const measureStep = useCallback(() => {
    if (railTrackRef.current && railTrackRef.current.children[0]) {
      const cardEl = railTrackRef.current.children[0];
      const cardRect = cardEl.getBoundingClientRect();
      const style = window.getComputedStyle(railTrackRef.current);
      const gap = parseFloat(style.gap) || 16;
      if (cardRect.width > 0) {
        setCardStep(cardRect.width + gap);
      }
    }
  }, []);

  useEffect(() => {
    measureStep();
    window.addEventListener("resize", measureStep);
    return () => window.removeEventListener("resize", measureStep);
  }, [measureStep]);

  // Update left stage text and Ken Burns layer on active slide change
  useEffect(() => {
    setIsLeaving(true);
    const textTimer = setTimeout(() => {
      setDisplayedSlide(SLIDES_DATA[activeDataIndex]);
      setIsLeaving(false);
    }, 240);

    const driftTimer = setTimeout(() => {
      setSlowDriftIndex(activeDataIndex);
    }, 50);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(driftTimer);
    };
  }, [activeDataIndex]);

  // Navigation handlers
  const nextSlide = useCallback(() => {
    elapsedRef.current = 0;
    setProgressWidth(0);
    setWithTransition(true);
    setTrackPos((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    elapsedRef.current = 0;
    setProgressWidth(0);
    setWithTransition(true);
    setTrackPos((prev) => prev - 1);
  }, []);

  const handleCardClick = (cardIndex) => {
    const centerIndex = trackPos + 1;
    const diff = cardIndex - centerIndex;
    if (diff === 0) return;
    elapsedRef.current = 0;
    setProgressWidth(0);
    setWithTransition(true);
    setTrackPos((prev) => prev + diff);
  };

  // Seamless invisible reset when reaching buffer boundaries
  const handleTransitionEnd = (e) => {
    if (e.target !== railTrackRef.current) return;

    // If outside safe middle range [3 * N - 2, 5 * N]
    if (trackPos >= 5 * N || trackPos <= N) {
      const normalizedPos = ((trackPos - (BASE_INDEX - 1)) % N + N) % N + (BASE_INDEX - 1);
      if (normalizedPos !== trackPos) {
        setWithTransition(false);
        setTrackPos(normalizedPos);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setWithTransition(true);
          });
        });
      }
    }
  };

  // Autoplay loop
  useEffect(() => {
    const tick = (ts) => {
      if (!lastTickRef.current) lastTickRef.current = ts;
      const dt = ts - lastTickRef.current;
      lastTickRef.current = ts;

      if (autoplayRef.current) {
        elapsedRef.current += dt;
        const pct = Math.min(100, (elapsedRef.current / DURATION) * 100);
        setProgressWidth(pct);

        if (elapsedRef.current >= DURATION) {
          elapsedRef.current = 0;
          setProgressWidth(0);
          setWithTransition(true);
          setTrackPos((prev) => prev + 1);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div
      className={styles.ghero}
      id="about-hero"
    >
      {/* Background Layers */}
      <div className={styles.bgStack}>
        {SLIDES_DATA.map((slide, i) => {
          const isActive = i === activeDataIndex;
          const isDrifting = isActive && slowDriftIndex === i;
          return (
            <div
              key={slide.place + i}
              className={`${styles.bgLayer} ${isActive ? styles.isActive : ""} ${isDrifting ? styles.slowDrift : ""}`}
              style={{ backgroundImage: `url('${slide.bg}')` }}
            />
          );
        })}
      </div>

      <div className={styles.bgScrim} />
      <div className={styles.ambientGlow} />

      <div className={styles.stage}>
        {/* Left Content */}
        <div className={styles.content}>
          <div className={`${styles.contentInner} ${isLeaving ? styles.leaving : ""}`}>
            <div className={styles.regionRow}>
              <span className={styles.regionTick} />
              <span className={styles.region}>{displayedSlide.region}</span>
            </div>

            <h1
              className={styles.heading}
              dangerouslySetInnerHTML={{ __html: displayedSlide.title }}
            />

            <p className={styles.desc}>{displayedSlide.desc}</p>

            <div className={styles.ctaRow}>
              <a href={displayedSlide.ctaLink} className={styles.cta}>
                <span>{displayedSlide.ctaText}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>

              <button
                type="button"
                className={styles.playtoggle}
                onClick={() => setAutoplay((prev) => !prev)}
                aria-label={autoplay ? "Pause autoplay" : "Resume autoplay"}
                title={autoplay ? "Pause slideshow" : "Resume slideshow"}
              >
                {autoplay ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 5l12 7-12 7V5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Rail Thumbnails (Continuous Infinite Looping Ribbon) */}
        <div className={styles.railWrap}>
          <div className={styles.railViewport}>
            <div
              ref={railTrackRef}
              className={styles.railTrack}
              style={{
                transform: `translateX(-${trackPos * cardStep}px)`,
                transition: withTransition ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedSlides.map((slide, i) => {
                const isSelected = i === trackPos + 1;
                return (
                  <div
                    key={slide.cloneId}
                    className={`${styles.card} ${isSelected ? styles.isActive : ""}`}
                    style={{ backgroundImage: `url('${slide.thumb}')` }}
                    onClick={() => handleCardClick(i)}
                    title={`Switch to ${slide.place}`}
                  >
                    <div className={styles.cardScrim} />
                    <div className={styles.cardLabel}>
                      <div className={styles.place}>{slide.cardTag || slide.region.split("·")[0]}</div>
                      <div className={styles.name}>{slide.place}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={prevSlide}
              aria-label="Previous Slide"
              title="Previous Slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressWidth}%` }}
              />
            </div>

            <button
              type="button"
              className={styles.arrow}
              onClick={nextSlide}
              aria-label="Next Slide"
              title="Next Slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <div className={styles.counter}>
              <b>{String(activeDataIndex + 1).padStart(2, "0")}</b> / {String(N).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
