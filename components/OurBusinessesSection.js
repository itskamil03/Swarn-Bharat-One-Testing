import { businesses } from "@/data/homeData";
import ScrollReveal from "./ScrollReveal";
import styles from "./OurBusinessesSection.module.css";

export default function OurBusinessesSection() {
  return (
    <section id="businesses" className={`section section-off-white ${styles.section}`}>
      <div className="container">
        <ScrollReveal className={styles.header}>
          <p className="eyebrow eyebrow--dark">Our Businesses</p>
          <h2 className={styles.heading}>
            Building across sectors.<br />
            Creating lasting impact.
          </h2>
          <p className={styles.description}>
            Our diversified businesses operate across critical sectors,
            creating platforms that contribute to India&apos;s growth and
            long-term development.
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {businesses.map((business, index) => (
            <ScrollReveal key={business.title} delay={index * 80} className={styles.cardWrap}>
              <a href="#businesses" className={styles.card}>
                <span className={styles.number}>{business.number}</span>
                <div className={styles.cardContent}>
                  <span className={styles.iconWrap}>
                    <svg 
                      width="34" height="34" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={business.iconPath} />
                    </svg>
                  </span>
                  <h3 className={styles.cardTitle}>{business.title}</h3>
                  <p className={styles.cardDescription}>{business.description}</p>
                  <span className={styles.arrow}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <path d="M4 14L14 4M14 4H6M14 4v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200} className={styles.footerCta}>
          <a href="#businesses" className={`btn btn-dark ${styles.ctaBtn}`}>
            Explore All Businesses
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
