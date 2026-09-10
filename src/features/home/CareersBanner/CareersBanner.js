import ScrollReveal from "@/components/common/ScrollReveal/ScrollReveal";
import styles from "./CareersBanner.module.css";
import Link from "next/link";

const CAREERS_IMAGE =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2400&auto=format&fit=crop";

export default function CareersBanner() {
  return (
    <section id="careers" className={styles.banner}>
      <div className={styles.imageWrap}>
        <div className={styles.image} style={{ backgroundImage: `url(${CAREERS_IMAGE})` }} />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>
        <ScrollReveal>
          <p className="eyebrow">Careers</p>
          <h2 className={styles.heading}>
            Build your career.
            <br />
            <span className={styles.gold}>Build Bharat.</span>
          </h2>
          <p className={styles.description}>
            Join a team that is driven by purpose, passion and a vision to create a lasting
            impact.
          </p>
          <Link href="/careers" className="btn btn-gold">
            Explore Career Opportunities
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
