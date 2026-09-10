"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const ecosystemLinks = [
  { label: "Swarn E-Commerce", href: "/offers" },
  { label: "Smart Real Estate", href: "/#businesses" },
  { label: "Technology & IT", href: "/#businesses" },
  { label: "Careers & Jobs", href: "/careers" },
  { label: "Swarn Matrimonial", href: "/#businesses" },
  { label: "Students Learning Hub", href: "/#businesses" },
  { label: "Construction & Civil", href: "/#businesses" },
];

const companyLinks = [
  { label: "About Swarn Bharat", href: "/about" },
  { label: "Vision & Pillars", href: "/about#vision" },
  { label: "Swarn Foundation (CSR)", href: "http://187.52.122.33:3000", external: true },
  { label: "Press & Newsroom", href: "/news" },
  { label: "Corporate Events", href: "/events" },
  { label: "Editorial Insights", href: "/blog" },
];

const supportLinks = [
  { label: "Swarn Rewards Program", href: "/rewards" },
  { label: "Refer & Earn Program", href: "/referral" },
  { label: "Exclusive Member Offers", href: "/offers" },
  { label: "Partner & Vendor Hub", href: "/contact" },
  { label: "Helpline & Support", href: "/contact" },
  { label: "Download Mobile App", href: "#app" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className={styles.footer}>
      {/* Ambient Top Glow & Grid Texture */}
      <div className={styles.footerGlow}></div>
      <div className={styles.footerGrid}></div>

      {/* PRE-FOOTER CALLOUT BANNER */}
      <div className={`container ${styles.preFooter}`}>
        <div className={styles.preFooterCard}>
          <div className={styles.preFooterLeft}>
            <div className={styles.preFooterIcon}>🇮🇳</div>
            <div>
              <h3 className={styles.preFooterTitle}>Engineering a Self-Reliant, Developed Bharat</h3>
              <p className={styles.preFooterDesc}>Join millions of citizens thriving in the Swarn Bharat integrated digital and physical economy.</p>
            </div>
          </div>
          <div className={styles.preFooterRight}>
            <div className={styles.appPills}>
              <div className={styles.appPill}>
                <span>🍎</span>
                <div>
                  <small>Download on</small>
                  <strong>App Store</strong>
                </div>
              </div>
              <div className={styles.appPill}>
                <span>▶</span>
                <div>
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER COLUMNS */}
      <div className={`container ${styles.mainContent}`}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brandLink}>
            <img src="/images/logoch.png" alt="Swarn Bharat Group" className={styles.brandLogo} />
          </Link>
          <p className={styles.brandTagline}>
            Swarn Bharat Group is a nation-building conglomerate committed to sustainable infrastructure, cutting-edge technology, and universal citizen empowerment across India.
          </p>

          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <span>1800-SWARN-BHARAT (Toll-Free)</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <span>contact@swarnbharat.in</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span>Corporate HQ: New Delhi, India</span>
            </div>
          </div>

          <div className={styles.socials}>
            {socialLinks.map((social) => (
              <a 
                key={social.label} 
                href={social.href} 
                aria-label={social.label} 
                className={styles.socialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Ecosystem */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Businesses & Ecosystem</h4>
          <ul className={styles.linkList}>
            {ecosystemLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={styles.footerNavLink}>
                  <span className={styles.bullet}>›</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Company & Governance</h4>
          <ul className={styles.linkList}>
            {companyLinks.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.footerNavLink}>
                    <span className={styles.bullet}>›</span>
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={styles.footerNavLink}>
                    <span className={styles.bullet}>›</span>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter & Engagement */}
        <div className={styles.newsletterCol}>
          <h4 className={styles.colTitle}>Swarn Pulse Newsletter</h4>
          <p className={styles.newsletterCopy}>
            Subscribe to receive quarterly economic reports, technological breakthroughs, and executive announcements.
          </p>

          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            <div className={styles.inputWrapper}>
              <input 
                type="email" 
                placeholder="Enter your official email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
                <span>Subscribe</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
            {subscribed && (
              <p className={styles.successMsg}>✓ Thank you for subscribing to Swarn Pulse.</p>
            )}
          </form>

          <div className={styles.certBadge}>
            <span className={styles.badgeShield}>🛡️</span>
            <div>
              <strong>ISO 9001:2015 Certified</strong>
              <small>Committed to world-class governance & quality</small>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL & COPYRIGHT BAR */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <div className={styles.copyText}>
            <p>&copy; {new Date().getFullYear()} Swarn Bharat Group. All rights reserved.</p>
            <span className={styles.cinText}>CIN: U74999DL2024PTC394821 · Nation First, Always</span>
          </div>

          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <span className={styles.legalDot}>•</span>
            <Link href="/terms">Terms of Service</Link>
            <span className={styles.legalDot}>•</span>
            <Link href="/security">Trust & Security</Link>
            <span className={styles.legalDot}>•</span>
            <Link href="/contact">Grievance Officer</Link>
          </div>

          <button onClick={scrollToTop} className={styles.scrollTopBtn} aria-label="Scroll to top">
            <span>Back to top</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
