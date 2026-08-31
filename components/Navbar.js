"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/data/homeData";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopPanelOpen, setIsDesktopPanelOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const servicesMegaMenu = [
    {
      title: "Digital Platforms",
      links: [
        { label: "E-Commerce", href: "#businesses" },
        { label: "Matrimonial", href: "#businesses" },
        { label: "Jobs", href: "#businesses" },
        { label: "Students Portal", href: "#businesses" },
      ]
    },
    {
      title: "Real Estate & Infra",
      links: [
        { label: "Construction", href: "#businesses" },
        { label: "Real Estate", href: "#businesses" },
        { label: "Smart City", href: "#projects" },
        { label: "Highway Projects", href: "#projects" },
      ]
    },
    {
      title: "Energy & Industry",
      links: [
        { label: "Renewable Energy", href: "#projects" },
        { label: "Manufacturing", href: "#projects" },
        { label: "Services", href: "#businesses" },
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || isDesktopPanelOpen) ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isDesktopPanelOpen]);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
      <div className={`container ${styles.topUtilityBar}`}>
        <a href="#help" className={styles.utilityLink}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          Help
        </a>
        <a href="#app" className={styles.utilityLink}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          App
        </a>
      </div>
      <div className={`container ${styles.inner}`}>
        <div className={styles.leftNavGroup}>
          <button
            type="button"
            className={styles.desktopMenuButton}
            aria-label="Open side menu"
            onClick={() => setIsDesktopPanelOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <a href="#top" className={styles.brand} aria-label="Swarn Bharat Group home">
            <img src="/images/logoch.png" alt="Swarn Bharat Group" className={styles.brandLogo} />
          </a>
        </div>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navLinks.map((link) => {
            if (link.label === "Services") {
              return (
                <div key={link.href} className={styles.navItemWrapper}>
                  <a href={link.href} className={`${styles.navLink} ${styles.navLinkWithIcon}`}>
                    {link.label}
                    <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                    </svg>
                  </a>

                  <div className={styles.megaMenu}>
                    {servicesMegaMenu.map((column, colIndex) => (
                      <div key={colIndex} className={styles.megaMenuColumn}>
                        <div className={styles.megaMenuHeading}>
                          {column.title}
                        </div>
                        {column.links.map((subLink, subIndex) => (
                          <a key={subIndex} href={subLink.href} className={styles.megaMenuLink}>
                            {subLink.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className={styles.rightActions}>

          <button className={styles.actionIcon} aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className={styles.actionIcon} aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
          <div className={styles.userMenuWrapper}>
            <Link href="/login" className={styles.actionIcon} aria-label="User Profile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
            <div className={styles.userDropdown}>
              <Link href="/login" className={styles.userDropdownLink}>Login</Link>
              <Link href="/register" className={styles.userDropdownLink}>Register</Link>
            </div>
          </div>
        </div>

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
          {navLinks.map((link, index) => {
            if (link.label === "Services") {
              return (
                <div key={link.href} className={styles.mobileAccordionWrapper} style={{ transitionDelay: `${index * 40}ms` }}>
                  <button
                    className={`${styles.mobileNavLink} ${styles.mobileAccordionHeader}`}
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    aria-expanded={isMobileServicesOpen}
                  >
                    {link.label}
                    <svg className={`${styles.mobileChevron} ${isMobileServicesOpen ? styles.mobileChevronOpen : ""}`} viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                    </svg>
                  </button>

                  <div className={`${styles.mobileAccordionContent} ${isMobileServicesOpen ? styles.mobileAccordionContentOpen : ""}`}>
                    <div className={styles.mobileAccordionContentInner}>
                      {servicesMegaMenu.map((column, colIndex) => (
                        <div key={colIndex} className={styles.mobileSubCategory}>
                          <div className={styles.mobileSubHeading}>{column.title}</div>
                          {column.links.map((subLink, subIndex) => (
                            <a
                              key={subIndex}
                              href={subLink.href}
                              className={styles.mobileSubLink}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subLink.label}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                style={{ transitionDelay: `${index * 40}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}

          <div className={styles.mobileActions}>

            <div className={styles.mobileIconGroup}>
              <button className={styles.actionIcon} aria-label="Search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <button className={styles.actionIcon} aria-label="Cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
              <Link href="/login" className={styles.actionIcon} aria-label="User Profile" onClick={() => setIsMenuOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Desktop Side Panel */}
      <div 
        className={`${styles.sidePanelBackdrop} ${isDesktopPanelOpen ? styles.sidePanelBackdropOpen : ""}`}
        onClick={() => setIsDesktopPanelOpen(false)}
      />
      <div className={`${styles.sidePanel} ${isDesktopPanelOpen ? styles.sidePanelOpen : ""}`}>
        <button 
          className={styles.closePanelButton} 
          onClick={() => setIsDesktopPanelOpen(false)}
          aria-label="Close panel"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className={styles.sidePanelContent}>
          <p>Please provide the contents to add here.</p>
        </div>
      </div>
    </header>
  );
}
