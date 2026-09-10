import Image from "next/image";
import { projects } from "@/data/homeData";
import ScrollReveal from "@/components/common/ScrollReveal/ScrollReveal";
import styles from "./ProjectsSection.module.css";

export default function ProjectsSection() {
  return (
    <section id="projects" className={`section section-navy ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <ScrollReveal>
            <p className="eyebrow">Our Projects</p>
            <h2 className={styles.heading}>
              Developing today for
              <br />a better tomorrow.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <a href="#projects" className="btn btn-gold">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 90} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 900px) 90vw, 320px"
                  className={styles.image}
                />
                <span className={styles.index}>{project.index}</span>
              </div>
              <p className={styles.category}>{project.category}</p>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              <span className={styles.arrow}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 14L14 4M14 4H6M14 4v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
