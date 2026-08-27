"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./LatestBlog.module.css";
import { latestBlogPosts } from "@/data/homeData";

export default function LatestBlog() {
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
    <section className={styles.blogSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div className={styles.headingBlock}>
            <div className={styles.eyebrow}>Latest Blog</div>
            <h2 className={styles.headline}>
              Perspectives on building a <em>better tomorrow.</em>
            </h2>
          </div>
          <Link href="#" className={styles.viewAll}>
            View All Articles
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className={styles.blogGrid}>
          {latestBlogPosts.map((post, i) => {
            // Select icon based on category
            let Icon = null;
            if (post.category === "Energy") {
              Icon = (
                <svg viewBox="0 0 24 24" className={styles.categoryIcon} fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              );
            } else if (post.category === "Infrastructure") {
              Icon = (
                <svg viewBox="0 0 24 24" className={styles.categoryIcon} fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" />
                </svg>
              );
            } else if (post.category === "Manufacturing") {
              Icon = (
                <svg viewBox="0 0 24 24" className={styles.categoryIcon} fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              );
            }

            return (
              <Link key={i} href={post.href} className={styles.blogCard}>
                <div className={styles.cardFrame}>
                  <div 
                    className={styles.cardMedia} 
                    style={{ backgroundImage: `url(${post.image})` }}
                  ></div>
                  <span className={styles.cardLabel}>{post.category}</span>
                  {Icon}
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.postMeta}>
                  <span>{post.date}</span>
                  <span className={styles.sep}></span>
                  <span>{post.readTime}</span>
                </div>
                <span className={styles.readMore}>
                  Read Article{" "}
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
