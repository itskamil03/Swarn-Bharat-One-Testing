import Image from "next/image";
import { latestNews, upcomingEvents } from "@/data/homeData";
import ScrollReveal from "./ScrollReveal";
import styles from "./NewsEventsSection.module.css";

export default function NewsEventsSection() {
  return (
    <section id="news" className={`section section-off-white ${styles.section}`}>
      <div className={`container ${styles.container}`}>

        {/* LATEST NEWS COLUMN */}
        <div>
          <ScrollReveal className={styles.columnHeader}>
            <p className={styles.eyebrow}>Latest News</p>
            <a href="#news" className={styles.viewAll}>
              View All News
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </ScrollReveal>

          <div className={styles.newsList}>
            {latestNews.map((item, index) => (
              <ScrollReveal key={item.id} delay={100 + index * 100}>
                <a href={`#${item.id}`} className={styles.newsItem}>
                  <div className={styles.newsImageWrap}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="120px"
                      className={styles.newsImage}
                    />
                  </div>
                  <div className={styles.newsContent}>
                    <div className={styles.newsMeta}>
                      <span>{item.date}</span>
                      <span className={styles.newsCategory}>{item.category}</span>
                    </div>
                    <h4 className={styles.newsTitle}>{item.title}</h4>
                  </div>
                  <span className={styles.arrow}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className={styles.divider}></div>

        {/* UPCOMING EVENTS COLUMN */}
        <div>
          <ScrollReveal className={styles.columnHeader} delay={100}>
            <p className={styles.eyebrow}>Upcoming Events</p>
            <a href="#events" className={styles.viewAll}>
              View All Events
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </ScrollReveal>

          <div className={styles.eventsList}>
            {upcomingEvents.map((event, index) => (
              <ScrollReveal key={event.id} delay={200 + index * 100}>
                <a href={`#${event.id}`} className={styles.eventItem}>
                  <div className={styles.dateBlock}>
                    <span className={styles.eventDay}>{event.day}</span>
                    <span className={styles.eventMonth}>{event.month}</span>
                    <span className={styles.eventYear}>{event.year}</span>
                  </div>
                  <div className={styles.eventContent}>
                    <h4 className={styles.eventTitle}>{event.title}</h4>
                    <p className={styles.eventLocation}>{event.location}</p>
                    <span className={styles.registerCta}>
                      Register Now
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
