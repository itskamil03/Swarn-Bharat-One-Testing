"use client";

import { locationData } from "@/data/locationData";
import styles from "./LocationSection.module.css";
import { useEffect, useRef, useState } from "react";

export default function LocationSection() {
  const [activeLocation, setActiveLocation] = useState(null);
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
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}><span className={styles.dash}></span> Our Presence</div>
          <h2 className={styles.title}>Strategic <em>Locations</em></h2>
          <p className={styles.subtitle}>Strategically located across India to drive growth, innovation, and seamless connectivity.</p>
        </div>
        
        <div className={styles.mapContainer}>
          <div className={styles.mapVisual}>
             
             {/* Abstract connecting lines between markers */}
             <svg className={styles.connections} preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M 45 35 L 30 65" className={styles.line} style={{animationDelay: '0.5s'}} />
                <path d="M 45 35 L 42 78" className={styles.line} style={{animationDelay: '0.7s'}} />
                <path d="M 30 65 L 42 78" className={styles.line} style={{animationDelay: '0.9s'}} />
                <path d="M 45 35 L 25 50" className={styles.line} style={{animationDelay: '1.1s'}} />
             </svg>

             {locationData.map((loc, index) => (
               <div 
                 key={loc.id} 
                 className={`${styles.markerGroup} ${activeLocation === loc.id ? styles.active : ''}`}
                 style={{ top: loc.coordinates.top, left: loc.coordinates.left, animationDelay: `${index * 0.15 + 0.3}s` }}
                 onMouseEnter={() => setActiveLocation(loc.id)}
                 onMouseLeave={() => setActiveLocation(null)}
               >
                 <div className={styles.markerWrapper}>
                   <div className={styles.pulse}></div>
                   <div className={styles.marker}></div>
                 </div>
                 <div className={styles.label}>
                   <span className={styles.cityName}>{loc.city}</span>
                 </div>
                 
                 <div className={styles.infoPanel}>
                   <span className={styles.locationName}>{loc.name}</span>
                   <p>{loc.description}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
