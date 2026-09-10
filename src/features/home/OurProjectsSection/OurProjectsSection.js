"use client";

import { projects } from "@/data/homeData";
import styles from "./OurProjectsSection.module.css";
import { useEffect, useRef } from "react";
import Link from "next/link";

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

function letterSpans(text) {
  return text.split('').map((ch, idx) => (
    <span 
      key={idx} 
      className={styles.ch} 
      style={{ transitionDelay: `${0.05 + idx * 0.02}s` }}
    >
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));
}

const arrowSVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export default function OurProjectsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add(styles.inView);
            
            // If it's a stat number, trigger count up
            if (el.hasAttribute('data-target')) {
              const target = parseInt(el.getAttribute('data-target'), 10);
              const suffix = el.getAttribute('data-suffix');
              const useLocale = el.getAttribute('data-locale') === '1';
              const numberEl = el.querySelector(`.${styles.number}`);
              
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
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    const animatedElements = sectionRef.current?.querySelectorAll('[data-animate]');
    animatedElements?.forEach(el => observer.observe(el));

    return () => {
      animatedElements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className={styles.projects} ref={sectionRef} id="projects">
      <div className={styles.gridTexture}></div>
      <div className={styles.glowTop}></div>
      <div className={styles.glowBottom}></div>

      <div className={styles.wrap}>
        {/* PROJECTS HEADER */}
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrowRow} data-animate>
              <span className={styles.eyebrowLine} data-animate></span>
              <span className={styles.eyebrow}>Our Projects</span>
            </div>
            <h2 className={styles.headline} data-animate>
              Developing today for a <br/><em>better tomorrow.</em>
            </h2>
          </div>

          <Link href="/#businesses" className={styles.cta} data-animate>
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* PROJECTS GRID */}
        <div className={styles.grid}>
          {projects.slice(0, 4).map((p, i) => (
            <Link 
              href={p.href || "/#businesses"} 
              key={p.id} 
              className={styles.card} 
              data-animate 
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className={styles.cardShade}></div>
              <svg className={styles.trace} viewBox="0 0 300 400" preserveAspectRatio="none">
                <rect x="1.5" y="1.5" width="297" height="397" rx="13" />
              </svg>
              <div className={styles.indexTag}>
                <span className={styles.num}>{p.index}</span>
                <span className={styles.rule}></span>
              </div>
              <div className={styles.panel}>
                <div className={styles.category}>{letterSpans(p.category)}</div>
                <div className={styles.titleWrap}><h3 className={styles.title}>{p.title}</h3></div>
                <div className={styles.revealBlock}>
                  <p className={styles.desc}>{p.description}</p>
                  <span className={styles.viewLink}>View project {arrowSVG}</span>
                </div>
                <div className={styles.footerLine}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* STATS ROW (Merged directly into the same section wrap) */}
        
        <div className={styles.row}>
          {impactStatsData.map((stat, i) => (
            <div 
              key={stat.label} 
              className={styles.stat} 
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-animate
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
