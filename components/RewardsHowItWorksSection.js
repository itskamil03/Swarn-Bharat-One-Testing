"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./RewardsHowItWorksSection.module.css";

export default function RewardsHowItWorksSection() {
  const stepsRef = useRef(null);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const steps = stepsRef.current.querySelectorAll(`.${styles.step}`);
            steps.forEach((s, i) => setTimeout(() => s.classList.add(styles.in), i * 130));
            io.disconnect();
          }
        });
      }, { threshold: 0.2 });
      
      if (stepsRef.current) {
        io.observe(stepsRef.current);
      }

      return () => io.disconnect();
    } else {
      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll(`.${styles.step}`);
        steps.forEach((s) => s.classList.add(styles.in));
      }
    }
  }, []);

  return (
    <section className={styles.how}>
      <div className={styles.wrap}>

        <div className={styles.howHead}>
          <div className={styles.eyebrow}>
            <span className={styles.rule}></span>
            <span className={styles.spark}>&#10022;</span>
            Swarn Bharat Rewards
            <span className={styles.spark}>&#10022;</span>
            <span className={`${styles.rule} ${styles.r2}`}></span>
          </div>
          <h2>How It <span className={styles.gold}>Works</span></h2>
          <p>Simple steps. Endless rewards. One ID for everything.</p>
        </div>

        <div style={{ position: 'relative' }}>
          <div className={styles.connector}>
            <svg viewBox="0 0 1000 2" preserveAspectRatio="none">
              <line className={styles.dash} x1="0" y1="1" x2="1000" y2="1"/>
              <line className={styles.flow} x1="0" y1="1" x2="1000" y2="1"/>
            </svg>
          </div>

          <div className={styles.stepsRow} ref={stepsRef}>

            {/* Step 1 */}
            <div className={`${styles.step} ${styles.s1}`}>
              <div className={styles.stepVisual}>
                <div className={styles.pedestal}></div>
                <div className={styles.coinBadge}>+200</div>
                <div className={`${styles.iconTile} ${styles.t1}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c0-3.9 3.1-6.5 6.5-6.5S15.5 16.1 15.5 20"/><path d="M18 9v5M15.5 11.5h5"/></svg>
                </div>
                <span className={`${styles.miniDot} ${styles.m1}`}></span><span className={`${styles.miniDot} ${styles.m2}`}></span>
              </div>
              <div className={styles.stepNum}>01</div>
              <h3>Create Your Account</h3>
              <p>Sign up on Swarn Bharat One and get 200 Swarn Points instantly.</p>
            </div>

            {/* Step 2 */}
            <div className={`${styles.step} ${styles.s2}`}>
              <div className={styles.stepVisual}>
                <div className={styles.pedestal}></div>
                <div className={`${styles.iconTile} ${styles.t2}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                </div>
                <span className={`${styles.miniDot} ${styles.m1}`}></span><span className={`${styles.miniDot} ${styles.m2}`}></span>
              </div>
              <div className={styles.stepNum}>02</div>
              <h3>Use Any Platform</h3>
              <p>Shop, learn, book or invest across the ecosystem.</p>
            </div>

            {/* Step 3 */}
            <div className={`${styles.step} ${styles.s3}`}>
              <div className={styles.stepVisual}>
                <div className={styles.pedestal}></div>
                <div className={`${styles.iconTile} ${styles.t3}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.3 15.3c.4 1 1.4 1.7 2.7 1.7 1.7 0 2.8-1 2.8-2.2 0-3-5.5-1.6-5.5-4.5 0-1.2 1.1-2.2 2.8-2.2 1.3 0 2.3.6 2.7 1.7"/></svg>
                </div>
                <span className={`${styles.miniDot} ${styles.m1}`}></span><span className={`${styles.miniDot} ${styles.m2}`}></span>
              </div>
              <div className={styles.stepNum}>03</div>
              <h3>Earn Swarn Points</h3>
              <p>Earn points on every eligible transaction, automatically.</p>
            </div>

            {/* Step 4 */}
            <div className={`${styles.step} ${styles.s4}`}>
              <div className={styles.stepVisual}>
                <div className={styles.pedestal}></div>
                <div className={`${styles.iconTile} ${styles.t4}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="6" width="19" height="13" rx="2.5"/><path d="M16 12.5h3"/><path d="M2.5 9.5h19"/></svg>
                </div>
                <span className={`${styles.miniDot} ${styles.m1}`}></span><span className={`${styles.miniDot} ${styles.m2}`}></span>
              </div>
              <div className={styles.stepNum}>04</div>
              <h3>Points Get Added</h3>
              <p>Your Swarn Points are credited automatically to your account.</p>
            </div>

            {/* Step 5 */}
            <div className={`${styles.step} ${styles.s5}`}>
              <div className={styles.stepVisual}>
                <div className={styles.pedestal}></div>
                <div className={`${styles.iconTile} ${styles.t5}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M3 13h18"/><path d="M12 9v12"/><path d="M12 9c-1.8 0-3.2-1.3-3.2-3S10.2 3 12 4.5c1.8-1.5 3.2-.7 3.2 1.5S13.8 9 12 9z"/></svg>
                </div>
                <span className={`${styles.miniDot} ${styles.m1}`}></span><span className={`${styles.miniDot} ${styles.m2}`}></span>
              </div>
              <div className={styles.stepNum}>05</div>
              <h3>Redeem Rewards</h3>
              <p>Use your points across the ecosystem for exciting rewards.</p>
            </div>

            {/* Step 6 */}
            <div className={`${styles.step} ${styles.s6}`}>
              <div className={styles.stepVisual}>
                <div className={styles.pedestal}></div>
                <div className={`${styles.iconTile} ${styles.t6}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.6-3 8.3-7 9-4-.7-7-4.4-7-9V6z"/><path d="M9 12l2 2 4-4.2"/></svg>
                </div>
                <span className={`${styles.miniDot} ${styles.m1}`}></span><span className={`${styles.miniDot} ${styles.m2}`}></span>
              </div>
              <div className={styles.stepNum}>06</div>
              <h3>Unlock More Benefits</h3>
              <p>Enjoy exclusive offers, privileges and possibilities.</p>
            </div>

          </div>
        </div>

        {/* Trust Bar */}
        <div className={styles.trust}>
          <div className={styles.trustItem}>
            <div className={styles.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5"/></svg></div>
            <div><h4>One ID</h4><p>Access everything with a single ID.</p></div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l7 3v6c0 4.6-3 8.3-7 9-4-.7-7-4.4-7-9V6z"/></svg></div>
            <div><h4>Secure &amp; Trusted</h4><p>Your security and privacy are our priority.</p></div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></div>
            <div><h4>10+ Platforms</h4><p>Multiple platforms, one ecosystem.</p></div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg></div>
            <div><h4>Unlimited Earning</h4><p>More ways to earn, more rewards.</p></div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M3 13h18"/><path d="M12 9v12"/></svg></div>
            <div><h4>Exciting Rewards</h4><p>Redeem across platforms for amazing benefits.</p></div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.dotgrid}></div>
          <div className={styles.ctaVisual}>
            <div className={styles.coinStack}>S</div>
            <div className={styles.gift}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="12" rx="1.5"/><path d="M3 13h18"/><path d="M12 9v12"/></svg></div>
          </div>
          <div className={styles.ctaText}>
            <h3>Start your journey today!</h3>
            <p>Create your account now and get <b>200 Swarn Points</b> instantly.</p>
          </div>
          <Link href="/register" className={styles.ctaBtn}>
            <span>Create Account</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
