"use client";

import styles from "./Rewards.module.css";
import { IconCart, IconTool, IconRings, IconBrief, IconCap, IconCrane, IconHome } from "./Icons";

export default function Ecosystem() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`} id="ecosystem">
      <div className={styles.container}>
        <div className={`${styles.sectionHead} reveal`}>
          <div className={styles.kicker}><span className={styles.rule}></span>THE ECOSYSTEM</div>
          <h2>One balance. Seven worlds.</h2>
          <p>Swarn Points hold the same value wherever you choose to spend them — no conversions, no fine print.</p>
        </div>
        <div className={`${styles.ecoGrid} revealStagger`}>
          <div className={styles.ecoTile}>
            <div className={styles.iconBadge}><IconCart /></div>
            <h4>E-Commerce</h4>
            <p>Shop the marketplace and redeem on checkout.</p>
          </div>
          <div className={styles.ecoTile}>
            <div className={styles.iconBadge}><IconTool /></div>
            <h4>Services</h4>
            <p>Offset costs on everyday and professional services.</p>
          </div>
          <div className={styles.ecoTile}>
            <div className={styles.iconBadge}><IconRings /></div>
            <h4>Matrimonial</h4>
            <p>Unlock premium visibility and profile features.</p>
          </div>
          <div className={styles.ecoTile}>
            <div className={styles.iconBadge}><IconBrief /></div>
            <h4>Jobs</h4>
            <p>Boost listings and applications on the careers portal.</p>
          </div>
          <div className={styles.ecoTile}>
            <div className={styles.iconBadge}><IconCap /></div>
            <h4>Students Portal</h4>
            <p>Redeem toward courses, material and certifications.</p>
          </div>
          <div className={styles.ecoTile}>
            <div className={styles.iconBadge}><IconCrane /></div>
            <h4>Construction</h4>
            <p>Apply points to materials and project services.</p>
          </div>
          <div className={styles.ecoTile}>
            <div className={styles.iconBadge}><IconHome /></div>
            <h4>Real Estate</h4>
            <p>Use points toward consultations and listing fees.</p>
          </div>
        </div>
        <div className={`${styles.benefitRow} reveal`}>
          <div className={styles.benefit}>
            <span className={styles.dash}></span>
            <div>
              <h5>Unified balance</h5>
              <p>Earn once, spend anywhere in the ecosystem — no separate wallets.</p>
            </div>
          </div>
          <div className={styles.benefit}>
            <span className={styles.dash}></span>
            <div>
              <h5>Transparent value</h5>
              <p>Every Swarn Point carries a clear, consistent redemption value.</p>
            </div>
          </div>
          <div className={styles.benefit}>
            <span className={styles.dash}></span>
            <div>
              <h5>Early access</h5>
              <p>Members see new rewards and platform benefits before anyone else.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
