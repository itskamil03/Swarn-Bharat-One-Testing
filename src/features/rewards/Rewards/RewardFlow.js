"use client";

import styles from "./Rewards.module.css";

export default function RewardFlow() {
  return (
    <section className={styles.section} id="flow">
      <div className={styles.container}>
        <div className={`${styles.flowPanel} reveal flow-panel`}>
          <div className={styles.flowHead}>
            <div className={styles.kicker} style={{ color: 'var(--gold-light)' }}>
              <span className={styles.rule}></span>THE REWARD FLOW
            </div>
            <h2>Three steps between you <span className={styles.serifItalic}>and gold.</span></h2>
            <p>Swarn Points move in one simple loop — take part, earn, and spend anywhere across the ecosystem.</p>
          </div>
          <div className={styles.flowLine}>
            <svg viewBox="0 0 1000 2" preserveAspectRatio="none">
              <path d="M0 1 L1000 1" />
            </svg>
          </div>
          <div className={styles.flowSteps}>
            <div className={styles.flowStep}>
              <div className={styles.flowNum}>01</div>
              <h3>Participate</h3>
              <p>Join competitions, refer members, and transact across any Swarn Bharat platform.</p>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.flowNum}>02</div>
              <h3>Earn Swarn Points</h3>
              <p>Every qualifying action credits Swarn Points to a single, unified balance.</p>
            </div>
            <div className={styles.flowStep}>
              <div className={styles.flowNum}>03</div>
              <h3>Redeem Across Platforms</h3>
              <p>Spend your points on vouchers, memberships and services in any of seven worlds.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
