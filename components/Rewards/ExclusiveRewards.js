"use client";

import styles from "./Rewards.module.css";
import { IconFlight, IconCart, IconRings, IconHome, IconCrane, IconBrief, IconArrowR } from "./Icons";

export default function ExclusiveRewards() {
  return (
    <section className={styles.section} id="rewards">
      <div className={styles.container}>
        <div className={`${styles.sectionHead} reveal`}>
          <div className={styles.kicker}><span className={styles.rule}></span>EXCLUSIVE REWARDS</div>
          <h2>Rewards worth the redemption.</h2>
          <p>A curated selection of what your Swarn Points can unlock this season.</p>
        </div>
        <div className={`${styles.rewardsGrid} revealStagger`}>

          <div className={styles.rewardCard}>
            <div className={styles.rewardTop}>
              <span className={styles.rewardTag}>TRAVEL</span>
              <div className={styles.iconBadge}>
                <IconFlight />
              </div>
              <h4>Flight Booking Credit</h4>
              <p>Discounted fares on partner airlines across domestic routes.</p>
            </div>
            <div className={styles.rewardBottom}>
              <div className={styles.rewardCost}><span className={styles.n}>500</span><span className={styles.u}>SP</span></div>
              <div className={styles.rewardBtn}>Redeem <IconArrowR /></div>
            </div>
          </div>

          <div className={styles.rewardCard}>
            <div className={styles.rewardTop}>
              <span className={styles.rewardTag}>E-COMMERCE</span>
              <div className={styles.iconBadge}>
                <IconCart />
              </div>
              <h4>₹1,000 Gift Voucher</h4>
              <p>Redeemable across the full Swarn Bharat marketplace.</p>
            </div>
            <div className={styles.rewardBottom}>
              <div className={styles.rewardCost}><span className={styles.n}>1,000</span><span className={styles.u}>SP</span></div>
              <div className={styles.rewardBtn}>Redeem <IconArrowR /></div>
            </div>
          </div>

          <div className={styles.rewardCard}>
            <div className={styles.rewardTop}>
              <span className={styles.rewardTag}>MATRIMONIAL</span>
              <div className={styles.iconBadge}>
                <IconRings />
              </div>
              <h4>Premium Membership</h4>
              <p>Three months of featured profile visibility and priority matches.</p>
            </div>
            <div className={styles.rewardBottom}>
              <div className={styles.rewardCost}><span className={styles.n}>1,200</span><span className={styles.u}>SP</span></div>
              <div className={styles.rewardBtn}>Redeem <IconArrowR /></div>
            </div>
          </div>

          <div className={styles.rewardCard}>
            <div className={styles.rewardTop}>
              <span className={styles.rewardTag}>REAL ESTATE</span>
              <div className={styles.iconBadge}>
                <IconHome />
              </div>
              <h4>Property Consultation</h4>
              <p>One-on-one session with a dedicated real estate advisor.</p>
            </div>
            <div className={styles.rewardBottom}>
              <div className={styles.rewardCost}><span className={styles.n}>800</span><span className={styles.u}>SP</span></div>
              <div className={styles.rewardBtn}>Redeem <IconArrowR /></div>
            </div>
          </div>

          <div className={styles.rewardCard}>
            <div className={styles.rewardTop}>
              <span className={styles.rewardTag}>CONSTRUCTION</span>
              <div className={styles.iconBadge}>
                <IconCrane />
              </div>
              <h4>Material Discount</h4>
              <p>10% off select building materials with partner suppliers.</p>
            </div>
            <div className={styles.rewardBottom}>
              <div className={styles.rewardCost}><span className={styles.n}>1,500</span><span className={styles.u}>SP</span></div>
              <div className={styles.rewardBtn}>Redeem <IconArrowR /></div>
            </div>
          </div>

          <div className={styles.rewardCard}>
            <div className={styles.rewardTop}>
              <span className={styles.rewardTag}>JOBS</span>
              <div className={styles.iconBadge}>
                <IconBrief />
              </div>
              <h4>Career Boost Pass</h4>
              <p>Priority listing placement on the Jobs Portal for 30 days.</p>
            </div>
            <div className={styles.rewardBottom}>
              <div className={styles.rewardCost}><span className={styles.n}>600</span><span className={styles.u}>SP</span></div>
              <div className={styles.rewardBtn}>Redeem <IconArrowR /></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
