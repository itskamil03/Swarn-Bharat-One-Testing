"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the Privacy Policy and T&Cs.");
      return;
    }
    console.log("OTP requested for:", mobileNumber);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.overlay}></div>
      
      <main className={styles.modalCard}>
        <Link href="/" className={styles.closeButton} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Link>

        <div className={styles.brandWrapper}>
          <img 
            src="/images/swarn logo (2).png" 
            alt="Swarn Bharat Group" 
            className={styles.logo} 
          />
        </div>

        <h1 className={styles.title}>Login or Sign up</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <div className={styles.countryCode}>
              <span className={styles.flag} role="img" aria-label="India flag">🇮🇳</span>
              <span className={styles.code}>+91</span>
              <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div className={styles.divider}></div>
            <input 
              type="tel" 
              className={styles.mobileInput}
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              pattern="[0-9]{10}"
              required
            />
          </div>
          
          <p className={styles.helperText}>We&apos;ll send an OTP via SMS</p>

          <div className={styles.checkboxWrapper}>
            <input 
              type="checkbox" 
              id="terms" 
              className={styles.checkbox}
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              I agree to the <Link href="#">Privacy Policy</Link> and <Link href="#">T&amp;Cs</Link>.
            </label>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Get OTP
          </button>
        </form>
      </main>
    </div>
  );
}
