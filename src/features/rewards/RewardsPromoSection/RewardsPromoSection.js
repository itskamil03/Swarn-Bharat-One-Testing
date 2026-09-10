"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./RewardsPromoSection.module.css";

const services = [
  { name: "Technology", icon: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></> },
  { name: "Real Estate", icon: <><path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/></> },
  { name: "Students Portal", icon: <><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5"/><path d="M22 10v6"/></> },
  { name: "Jobs", icon: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></> },
  { name: "Matrimonial", icon: <><path d="M12 20s-7-4.4-9.3-8.8C1.3 8 3 5 6.2 5c1.9 0 3.2 1 3.8 2 .6-1 1.9-2 3.8-2 3.2 0 4.9 3 3.5 6.2C19 15.6 12 20 12 20z"/></> },
  { name: "Foundation", icon: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></> },
  { name: "E-Commerce", icon: <><path d="M6 8h12l-1 11H7z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></> },
];

export default function RewardsPromoSection() {
  const heroRef = useRef(null);
  const revealsRef = useRef([]);
  const stepsRef = useRef(null);
  const [sparks, setSparks] = useState([]);
  const [mousePos, setMousePos] = useState({ x: '74%', y: '10%' });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: `${((e.clientX - r.left) / r.width * 100)}%`,
        y: `${((e.clientY - r.top) / r.height * 100)}%`
      });
    };
    
    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.in);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      revealsRef.current.forEach(el => {
        if (el) io.observe(el);
      });

      return () => io.disconnect();
    } else {
      revealsRef.current.forEach(el => {
        if (el) el.classList.add(styles.in);
      });
    }
  }, []);

  useEffect(() => {
    const RADIUS_PCT = 40;
    const nodePositions = services.map((s, i) => {
      const angle = -90 + (360 / services.length) * i;
      const rad = angle * Math.PI / 180;
      return {
        x: 50 + RADIUS_PCT * Math.cos(rad),
        y: 50 + RADIUS_PCT * Math.sin(rad)
      };
    });

    const launchSparks = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      
      nodePositions.forEach((p, i) => {
        setTimeout(() => {
          const id = Date.now() + '-' + i;
          setSparks(prev => [...prev, { id, p, startTime: performance.now() }]);
        }, i * 150);
      });
    };

    const initialTimeout = setTimeout(launchSparks, 500);
    const interval = setInterval(launchSparks, 7000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

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
    <section 
      className={styles.hero} 
      id="heroSection" 
      ref={heroRef}
      style={{ '--mx': mousePos.x, '--my': mousePos.y }}
    >
      <div className={styles.wrap}>
        <h2 className={styles.rewardsHeading}>Score High with Swarn Rewards</h2>
        <div className={styles.heroGrid}>

          <div className={`${styles.heroCopy} ${styles.reveal}`} ref={el => revealsRef.current[0] = el}>
            <div className={styles.badge}><span className={styles.dot}></span>Swarn Bharat Ecosystem</div>
            <h1>One ecosystem.<br />Infinite <span className={styles.shimmer}>rewards.</span></h1>
            <p className={styles.lede}>Every action across the Swarn Bharat ecosystem earns you Swarn Points &mdash; <b>one ID</b>, boundless benefits, across every platform you already use.</p>

            <div className={styles.heroCtas}>
              <Link href="/rewards" className={styles.btnPrimary}>
                <span>Become a member</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <Link href="#businesses" className={styles.btnSecondary}>
                <span className={styles.icCircle}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
                Explore the ecosystem
              </Link>
            </div>

            <div className={styles.valueGrid}>
              <div className={styles.valueCell}>
                <div className={styles.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5"/></svg></div>
                <strong>One ID</strong><span>Access every platform</span>
              </div>
              <div className={styles.valueCell}>
                <div className={styles.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg></div>
                <strong>Earn points</strong><span>On every transaction</span>
              </div>
              <div className={styles.valueCell}>
                <div className={styles.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h18v4H3z"/><path d="M5 12h14v9H5z"/><path d="M12 8V4M9 4h6"/></svg></div>
                <strong>Redeem anywhere</strong><span>Across the ecosystem</span>
              </div>
              <div className={styles.valueCell}>
                <div className={styles.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8l4 3 5-7 5 7 4-3-2 10H5z"/></svg></div>
                <strong>Exclusive benefits</strong><span>More privileges, more value</span>
              </div>
            </div>
          </div>

          <div className={`${styles.hubSide} ${styles.reveal}`} ref={el => revealsRef.current[1] = el}>
            <div className={styles.hubOuter} id="hub">
              <div className={`${styles.ring} ${styles.r1}`}></div>
              <div className={`${styles.ring} ${styles.r2}`}></div>
              
              <svg className={styles.rays} viewBox="0 0 100 100" preserveAspectRatio="none">
                {services.map((s, i) => {
                  const angle = -90 + (360 / services.length) * i;
                  const rad = angle * Math.PI / 180;
                  const x = 50 + 40 * Math.cos(rad);
                  const y = 50 + 40 * Math.sin(rad);
                  return <path key={i} className={styles.rayLine} d={`M50,50 L${x},${y}`} />;
                })}
              </svg>
              
              <div className={styles.coinGlow}></div>
              <div className={styles.coinCenter}><span className={styles.glyph}>S</span></div>
              <div className={styles.hubLabel}><strong>Swarn Rewards</strong><span>Earn on every transaction</span></div>
              
              {services.map((s, i) => {
                const angle = -90 + (360 / services.length) * i;
                const rad = angle * Math.PI / 180;
                const x = 50 + 40 * Math.cos(rad);
                const y = 50 + 40 * Math.sin(rad);
                return (
                  <div 
                    key={i} 
                    className={styles.node} 
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                    <span className={styles.nodeName}>{s.name}</span>
                  </div>
                );
              })}

              {sparks.map(spark => (
                <SparkAnimation key={spark.id} spark={spark} onComplete={() => {
                  setSparks(prev => prev.filter(s => s.id !== spark.id));
                }} />
              ))}
            </div>
          </div>

        </div>

        <div className={styles.howHead} style={{ marginTop: '100px' }}>
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

function SparkAnimation({ spark, onComplete }) {
  const [style, setStyle] = useState({ opacity: 0, left: '50%', top: '50%' });

  useEffect(() => {
    let animationFrame;
    const dur = 900;
    
    const frame = () => {
      const t = performance.now();
      const prog = Math.min((t - spark.startTime) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      
      setStyle({
        left: `${50 + (spark.p.x - 50) * ease}%`,
        top: `${50 + (spark.p.y - 50) * ease}%`,
        opacity: prog < 0.08 ? prog / 0.08 : (prog > 0.85 ? (1 - prog) / 0.15 : 1)
      });

      if (prog < 1) {
        animationFrame = requestAnimationFrame(frame);
      } else {
        onComplete();
      }
    };
    
    animationFrame = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationFrame);
  }, [spark, onComplete]);

  return (
    <div className={styles.spark} style={style} />
  );
}
