"use client";

import styles from "./Rewards.module.css";
import { IconArrowR } from "./Icons";

export default function CtaBand() {
  return (
    <section className={styles.section} style={{ paddingTop: 0 }}>
      <div className={styles.container}>
        <div className={`${styles.ctaBand} reveal`}>
          <div>
            <h2>Ready to put your points to work?</h2>
            <p>Browse exclusive rewards or check your latest activity — your balance is ready when you are.</p>
          </div>
          <button className={styles.ctaBandBtn}>
            Redeem Points <IconArrowR />
          </button>
        </div>
      </div>
    </section>
  );
}
