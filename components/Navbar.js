"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/homeData";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label="Swarn Bharat Group home">
          <img src="/images/swarn logo (2).png" alt="Swarn Bharat Group" className={styles.brandLogo} />
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className={`${styles.bar} ${isMenuOpen ? styles.barOpenTop : ""}`} />
          <span className={`${styles.bar} ${isMenuOpen ? styles.barOpenMid : ""}`} />
          <span className={`${styles.bar} ${isMenuOpen ? styles.barOpenBottom : ""}`} />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <nav aria-label="Mobile" className={styles.mobileNav}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              style={{ transitionDelay: `${index * 40}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
