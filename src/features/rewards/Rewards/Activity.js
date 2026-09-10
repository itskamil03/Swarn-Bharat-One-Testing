"use client";

import styles from "./Rewards.module.css";
import { IconUsers, IconStar, IconFlight, IconCap, IconRings } from "./Icons";

export default function Activity() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`} id="activity">
      <div className={styles.container}>
        <div className={`${styles.sectionHead} reveal`}>
          <div className={styles.kicker}><span className={styles.rule}></span>RECENT ACTIVITY</div>
          <h2>Where your points have moved.</h2>
          <p>A running record of every point earned and redeemed on your account.</p>
        </div>
        <div className={`${styles.activityPanel} reveal`}>
          <div className={styles.activityRow}>
            <div className={styles.activityIcon}><IconUsers /></div>
            <div className={styles.activityBody}>
              <div className={styles.t}>Referral bonus — invited 2 friends</div>
              <div className={styles.d}>Aug 27, 2026</div>
            </div>
            <div className={`${styles.activityAmt} ${styles.plus}`}>+320 SP</div>
          </div>
          <div className={styles.activityRow}>
            <div className={styles.activityIcon}><IconStar /></div>
            <div className={styles.activityBody}>
              <div className={styles.t}>Participated in Independence Week Contest</div>
              <div className={styles.d}>Aug 24, 2026</div>
            </div>
            <div className={`${styles.activityAmt} ${styles.plus}`}>+150 SP</div>
          </div>
          <div className={styles.activityRow}>
            <div className={`${styles.activityIcon} ${styles.out}`}><IconFlight /></div>
            <div className={styles.activityBody}>
              <div className={styles.t}>Redeemed Flight Booking Credit</div>
              <div className={styles.d}>Aug 20, 2026</div>
            </div>
            <div className={`${styles.activityAmt} ${styles.minus}`}>−500 SP</div>
          </div>
          <div className={styles.activityRow}>
            <div className={styles.activityIcon}><IconCap /></div>
            <div className={styles.activityBody}>
              <div className={styles.t}>Profile completion bonus — Students Portal</div>
              <div className={styles.d}>Aug 16, 2026</div>
            </div>
            <div className={`${styles.activityAmt} ${styles.plus}`}>+80 SP</div>
          </div>
          <div className={styles.activityRow}>
            <div className={`${styles.activityIcon} ${styles.out}`}><IconRings /></div>
            <div className={styles.activityBody}>
              <div className={styles.t}>Redeemed Matrimonial Premium Membership</div>
              <div className={styles.d}>Aug 9, 2026</div>
            </div>
            <div className={`${styles.activityAmt} ${styles.minus}`}>−1,200 SP</div>
          </div>
        </div>
      </div>
    </section>
  );
}
