import Image from "next/image";
import { swarnBharatCards } from "@/data/homeData";
import ScrollReveal from "./ScrollReveal";
import styles from "./WhoWeAreSection.module.css";

export default function WhoWeAreSection() {
  return (
    <section id="about" className={`section section-navy ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        
        {/* Left Content Area */}
        <div className={styles.header}>
          <ScrollReveal>
            <p className="eyebrow">Who We Are</p>
            <h2 className={styles.heading}>Swarn Bharat</h2>
          </ScrollReveal>

          <ScrollReveal delay={120} className={styles.copy}>
            <p className={styles.description}>
              Swarn Bharat is a diversified organization working
              across key sectors of the economy. Our mission is
              to nation-build by creating long-term value for our
              stakeholders and contributing to India&apos;s growth story.
            </p>
            <a href="#about" className={`btn btn-outline ${styles.cta}`}>
              Know More About Us
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ marginLeft: '4px' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        {/* Right Cards Area */}
        <div className={styles.cardsGrid}>
          {swarnBharatCards.map((card, index) => (
            <ScrollReveal key={card.title} delay={200 + index * 100} className={styles.card}>
              
              <div className={styles.imageWrap}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.image}
                />
                <div className={styles.overlay}></div>
              </div>

              <div className={styles.cardContent}>
                <svg 
                  className={styles.icon} 
                  width="24" height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={card.iconPath} />
                </svg>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>

            </ScrollReveal>
          ))}
        </div>
        
      </div>
    </section>
  );
}
