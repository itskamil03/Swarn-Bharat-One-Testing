"use client";

import { useState } from "react";
import styles from "./Rewards.module.css";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What are Swarn Points?",
      a: "Swarn Points are the single reward currency earned by taking part anywhere across the Swarn Bharat ecosystem — from competitions to everyday transactions."
    },
    {
      q: "How do I earn Swarn Points?",
      a: "Points accrue automatically when you take part in competitions, refer new members, complete purchases, or engage with participating services."
    },
    {
      q: "Where can I redeem my points?",
      a: "Redeem across E-Commerce, Services, Matrimonial, Jobs, Students Portal, Construction and Real Estate — one balance, seven worlds."
    },
    {
      q: "Do Swarn Points expire?",
      a: "Points remain valid for 24 months from the date they're earned, and you'll be notified well before any expiry."
    },
    {
      q: "Can I transfer points to someone else?",
      a: "Not yet — Swarn Points are currently tied to the account that earned them, with gifting on our roadmap."
    }
  ];

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={`${styles.sectionHead} reveal`}>
          <div className={styles.kicker}><span className={styles.rule}></span>FAQS</div>
          <h2>Questions, answered.</h2>
        </div>
        <div className={`${styles.faqList} reveal`}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
              >
                <div 
                  className={styles.faqQ} 
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <h4>{faq.q}</h4>
                  <div className={styles.faqToggle}></div>
                </div>
                <div className={styles.faqA}>
                  <div className={styles.faqAInner}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
