"use client";

import { footerLinks } from "@/data/homeData";
import styles from "./Footer.module.css";

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "X", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <img src="/images/logoch.png" alt="Swarn Bharat Group" className={styles.brandLogo} />
          </div>
          <p className={styles.tagline}>
            Building businesses. Empowering people. Enriching lives. For a stronger Bharat and a
            better tomorrow.
          </p>
          <div className={styles.socials}>
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label} className={styles.socialIcon}>
                {social.label.charAt(0)}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul>
            {footerLinks.quick.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Connect</h4>
          <ul>
            {footerLinks.connect.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.newsletterCol}>
          <h4 className={styles.colTitle}>Newsletter</h4>
          <p className={styles.newsletterCopy}>Subscribe to get the latest updates and insights.</p>
          <form className={styles.newsletterForm} onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input id="newsletter-email" type="email" placeholder="Enter your email" required />
            <button type="submit" aria-label="Subscribe">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>&copy; {new Date().getFullYear()} Swarn Bharat Group. All Rights Reserved.</p>
        <div className={styles.legalLinks}>
          {footerLinks.legal.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
