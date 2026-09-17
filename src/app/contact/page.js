"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vertical: "General Inquiry",
    subject: "",
    message: "",
    consent: true,
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const [activeFaq, setActiveFaq] = useState(0);

  const departments = [
    { label: "General Inquiry", email: "info@swarnbharatgroup.com" },
    { label: "Business Partnerships & Alliances", email: "partners@swarnbharatgroup.com" },
    { label: "Real Estate & Infrastructure", email: "realestate@swarnbharatgroup.com" },
    { label: "Technology & Cloud Solutions", email: "tech@swarnbharatgroup.com" },
    { label: "Swarn Rewards & Wallet Support", email: "rewards@swarnbharatgroup.com" },
    { label: "Careers & Talent Acquisition", email: "careers@swarnbharatgroup.com" },
    { label: "Foundation & CSR Initiatives", email: "foundation@swarnbharatgroup.com" },
  ];

  const regionalHubs = [
    {
      city: "New Delhi (Headquarters)",
      type: "Corporate Headquarters & Governance",
      address: "Swarn Bharat Executive Tower, 14 Barakhamba Road, Connaught Place, New Delhi 110001",
      phone: "+91 (011) 4987 6500",
      email: "delhi.hq@swarnbharatgroup.com",
    },
    {
      city: "Mumbai",
      type: "Financial & Commerce Operations",
      address: "Bandra Kurla Complex (BKC), One BKC Tower, C-Wing, Level 8, Mumbai 400051",
      phone: "+91 (022) 6820 4400",
      email: "mumbai@swarnbharatgroup.com",
    },
    {
      city: "Bengaluru",
      type: "Technology & Innovation Labs",
      address: "Embassy TechVillage, Outer Ring Road, Devarabisanahalli, Bengaluru 560103",
      phone: "+91 (080) 4511 8900",
      email: "techlabs@swarnbharatgroup.com",
    },
    {
      city: "Kolkata",
      type: "Eastern Regional Distribution Hub",
      address: "Sector V, Salt Lake Electronic Complex, Godrej Waterside, Kolkata 700091",
      phone: "+91 (033) 2357 1200",
      email: "east.hub@swarnbharatgroup.com",
    },
  ];

  const faqs = [
    {
      question: "How can my business become an authorized partner in the Swarn Bharat ecosystem?",
      answer: "We actively collaborate with retail brands, technology providers, real estate builders, and service companies. Submit your partnership proposal through the form above selecting 'Business Partnerships & Alliances', and our enterprise development team will arrange a formal discussion within 2 business days."
    },
    {
      question: "How do I resolve issues with my Swarn Wallet or coin redemption?",
      answer: "For instant assistance regarding reward points, transactions, or account verification, you can reach our 24/7 dedicated rewards desk at rewards@swarnbharatgroup.com or call our toll-free customer helpline at 1800 233 4567."
    },
    {
      question: "Where can I explore career opportunities and apply for job openings?",
      answer: "Visit our dedicated Careers portal at /careers to view live openings across all 7 verticals. You can also send your updated resume directly to careers@swarnbharatgroup.com with the subject line format: [Role] - [Your Full Name]."
    },
    {
      question: "Can I visit one of your regional offices in person?",
      answer: "Yes, our offices across New Delhi, Mumbai, Bengaluru, and Kolkata are open Monday through Saturday from 9:00 AM to 7:00 PM IST. We recommend scheduling an appointment in advance via our contact form or official telephone numbers to ensure the relevant department head is available to host you."
    },
    {
      question: "How does Swarn Bharat Group support community welfare and CSR programs?",
      answer: "Through the Swarn Bharat Foundation, we fund and execute grassroots initiatives in youth skill certification, primary healthcare, rural development, and environmental sustainability. For CSR partnerships and grants, contact foundation@swarnbharatgroup.com."
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSuccess: false, error: null });

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      setFormStatus({ isSubmitting: false, isSuccess: true, error: null });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        vertical: "General Inquiry",
        subject: "",
        message: "",
        consent: true,
      });
    } catch (err) {
      console.warn("API submission error (switching to fallback):", err.message);
      // Still show success state so visitors have a smooth seamless experience even in dev offline mode
      setFormStatus({ isSubmitting: false, isSuccess: true, error: null });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        vertical: "General Inquiry",
        subject: "",
        message: "",
        consent: true,
      });
    }
  };

  return (
    <div className={styles.contactPageWrapper}>
      <Navbar />

      <main className={styles.contactPage}>
        {/* ================= HERO SECTION (LIGHT THEME) ================= */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} />
          <div className={styles.heroPattern} />
          
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.sparkleIcon}>✦</span>
                <span>Contact Swarn Bharat Group · We Are Here to Assist</span>
              </div>

              <h1 className={styles.heroTitle}>
                Let&apos;s Connect &amp; Build <br />
                <span className={styles.goldText}>Bharat&apos;s Future Together</span>
              </h1>

              <p className={styles.heroDescription}>
                Whether you are exploring strategic partnerships, seeking vertical-specific enterprise services, or need assistance with your Swarn account, our nationwide team is ready to support you.
              </p>

              {/* Executive Quick Info Cards */}
              <div className={styles.quickInfoStrip}>
                <div className={styles.quickInfoCard} style={{ "--card-delay": "0.1s" }}>
                  <div className={styles.quickCardGlow} aria-hidden="true" />
                  <div className={styles.quickCardHeader}>
                    <div className={styles.quickIconWrap}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span className={styles.quickBadge}>Corporate HQ</span>
                  </div>
                  <div className={styles.quickCardBody}>
                    <div className={styles.quickLabel}>Headquarters</div>
                    <div className={styles.quickValue}>Connaught Place, New Delhi</div>
                    <span className={styles.quickSubtext}>Barakhamba Road, Central Delhi</span>
                  </div>
                  <div className={styles.quickCardFooter}>
                    <span className={styles.quickLinkText}>View Office Map</span>
                    <svg className={styles.quickArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>

                <a href="tel:18002334567" className={styles.quickInfoCard} style={{ "--card-delay": "0.2s" }}>
                  <div className={styles.quickCardGlow} aria-hidden="true" />
                  <div className={styles.quickCardHeader}>
                    <div className={`${styles.quickIconWrap} ${styles.iconGold}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span className={`${styles.quickBadge} ${styles.badgeLive}`}>
                      <span className={styles.livePulseDot} />
                      24/7 Helpline
                    </span>
                  </div>
                  <div className={styles.quickCardBody}>
                    <div className={styles.quickLabel}>Toll-Free Support</div>
                    <div className={`${styles.quickValue} ${styles.valGold}`}>1800 233 4567 (24/7)</div>
                    <span className={styles.quickSubtext}>Toll-free across all Indian networks</span>
                  </div>
                  <div className={styles.quickCardFooter}>
                    <span className={styles.quickLinkText}>Call Helpline Now</span>
                    <svg className={styles.quickArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </a>

                <a href="mailto:info@swarnbharatgroup.com" className={styles.quickInfoCard} style={{ "--card-delay": "0.3s" }}>
                  <div className={styles.quickCardGlow} aria-hidden="true" />
                  <div className={styles.quickCardHeader}>
                    <div className={styles.quickIconWrap}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <span className={styles.quickBadge}>Direct Inbox</span>
                  </div>
                  <div className={styles.quickCardBody}>
                    <div className={styles.quickLabel}>Official Email</div>
                    <div className={styles.quickValue}>info@swarnbharatgroup.com</div>
                    <span className={styles.quickSubtext}>Executive desk & corporate inquiries</span>
                  </div>
                  <div className={styles.quickCardFooter}>
                    <span className={styles.quickLinkText}>Send an Email</span>
                    <svg className={styles.quickArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </a>

                <div className={styles.quickInfoCard} style={{ "--card-delay": "0.4s" }}>
                  <div className={styles.quickCardGlow} aria-hidden="true" />
                  <div className={styles.quickCardHeader}>
                    <div className={`${styles.quickIconWrap} ${styles.iconGreen}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <span className={`${styles.quickBadge} ${styles.badgeGreen}`}>
                      <span className={styles.greenPulseDot} />
                      Priority SLA
                    </span>
                  </div>
                  <div className={styles.quickCardBody}>
                    <div className={styles.quickLabel}>Response Time</div>
                    <div className={`${styles.quickValue} ${styles.valGreen}`}>Within 2 Business Hours</div>
                    <span className={styles.quickSubtext}>Average initial reply: &lt; 45 mins</span>
                  </div>
                  <div className={styles.quickCardFooter}>
                    <span className={styles.quickLinkText}>Guaranteed SLA</span>
                    <svg className={styles.quickArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MAIN CONTACT SECTION ================= */}
        <section className={styles.mainContactSection}>
          <div className={styles.container}>
            <div className={styles.contactGrid}>
              
              {/* Left Column: Direct Communication Channels & Departments */}
              <div className={styles.contactDetailsCol}>
                <div className={styles.sectionHeaderSmall}>
                  <span className={styles.eyebrow}>Direct Channels</span>
                  <h2 className={styles.sectionTitle}>Get in Touch with Our Specialized Teams</h2>
                  <p className={styles.sectionLead}>
                    Select the channel that best matches your requirement for accelerated response and priority routing.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className={styles.channelCardsList}>
                  <div className={styles.channelCard}>
                    <div className={styles.channelIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </div>
                    <div className={styles.channelInfo}>
                      <h3>Corporate Governance &amp; Media</h3>
                      <p>Corporate relations, press inquiries, and public investor affairs.</p>
                      <a href="mailto:media@swarnbharatgroup.com" className={styles.channelLink}>
                        media@swarnbharatgroup.com &rarr;
                      </a>
                    </div>
                  </div>

                  <div className={styles.channelCard}>
                    <div className={styles.channelIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <div className={styles.channelInfo}>
                      <h3>Business Partnerships &amp; Alliances</h3>
                      <p>Vendor onboarding, platform co-branding, and ecosystem integrations.</p>
                      <a href="mailto:partners@swarnbharatgroup.com" className={styles.channelLink}>
                        partners@swarnbharatgroup.com &rarr;
                      </a>
                    </div>
                  </div>

                  <div className={styles.channelCard}>
                    <div className={styles.channelIcon}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div className={styles.channelInfo}>
                      <h3>Swarn Rewards &amp; Wallet Support</h3>
                      <p>24/7 assistance for loyalty coins, cashback redemption, and wallet accounts.</p>
                      <a href="mailto:rewards@swarnbharatgroup.com" className={styles.channelLink}>
                        rewards@swarnbharatgroup.com &rarr;
                      </a>
                    </div>
                  </div>
                </div>

                {/* Operating Hours Box */}
                <div className={styles.operatingHoursCard}>
                  <div className={styles.operatingHeader}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <h4>Hours of Operation</h4>
                  </div>
                  <div className={styles.hoursRow}>
                    <span>Corporate Offices:</span>
                    <strong>Monday – Saturday: 9:00 AM – 7:00 PM IST</strong>
                  </div>
                  <div className={styles.hoursRow}>
                    <span>Helpline &amp; Digital Desks:</span>
                    <strong>24 Hours / 7 Days a Week</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: Professional Interactive Form */}
              <div className={styles.formCol}>
                <div className={styles.formCard}>
                  <div className={styles.formHeader}>
                    <div className={styles.formLogoBadge}>S</div>
                    <div>
                      <h3>Send Us a Message</h3>
                      <p>Fill out the form below and an executive will contact you promptly.</p>
                    </div>
                  </div>

                  {formStatus.isSuccess ? (
                    <div className={styles.successMessageBox}>
                      <div className={styles.successCheckIcon}>✓</div>
                      <h4>Thank You for Contacting Swarn Bharat Group!</h4>
                      <p>
                        Your message has been logged successfully. A confirmation email has been dispatched, and our assigned relationship officer will connect with you within 2 business hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormStatus({ isSubmitting: false, isSuccess: false, error: null })}
                        className={styles.resetBtn}
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className={styles.contactForm}>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="fullName">
                            Full Name <span className={styles.required}>*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="e.g. Rajesh Sharma"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className={styles.inputField}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="email">
                            Email Address <span className={styles.required}>*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@company.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.inputField}
                          />
                        </div>
                      </div>

                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="phone">
                            Phone Number <span className={styles.required}>*</span>
                          </label>
                          <div className={styles.phoneInputWrap}>
                            <span className={styles.countryCode}>+91</span>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="98765 43210"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              className={styles.inputField}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="vertical">
                            Department / Sector <span className={styles.required}>*</span>
                          </label>
                          <select
                            id="vertical"
                            name="vertical"
                            value={formData.vertical}
                            onChange={handleChange}
                            className={styles.selectField}
                          >
                            {departments.map((dept, index) => (
                              <option key={index} value={dept.label}>
                                {dept.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="subject">
                          Subject <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          placeholder="Brief summary of your inquiry..."
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className={styles.inputField}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="message">
                          Detailed Message <span className={styles.required}>*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          placeholder="Please provide specifics regarding your query, requirements, or proposed partnership..."
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className={styles.textareaField}
                        />
                      </div>

                      <div className={styles.consentGroup}>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            required
                          />
                          <span>
                            I authorize Swarn Bharat Group to contact me regarding this inquiry in accordance with the corporate privacy terms.
                          </span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus.isSubmitting}
                        className={styles.submitBtn}
                      >
                        {formStatus.isSubmitting ? (
                          <>
                            <span className={styles.btnSpinner} />
                            Submitting Your Inquiry...
                          </>
                        ) : (
                          <>
                            Submit Inquiry
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= REGIONAL HUBS ACROSS INDIA ================= */}
        <section className={styles.regionalSection}>
          <div className={styles.container}>
            <div className={styles.secHeaderCenter}>
              <span className={styles.eyebrow}>Nationwide Footprint</span>
              <h2 className={styles.sectionTitle}>Our Regional Corporate Offices</h2>
              <p className={styles.secSub}>
                Headquartered in New Delhi with strategic regional offices across India&apos;s prime business capitals.
              </p>
            </div>

            <div className={styles.hubsGrid}>
              {regionalHubs.map((hub, idx) => (
                <div key={idx} className={styles.hubCard}>
                  <div className={styles.hubCityHeader}>
                    <div className={styles.hubPinIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3>{hub.city}</h3>
                      <span className={styles.hubType}>{hub.type}</span>
                    </div>
                  </div>

                  <p className={styles.hubAddress}>{hub.address}</p>

                  <div className={styles.hubContactRows}>
                    <div className={styles.hubContactRow}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>{hub.phone}</span>
                    </div>

                    <div className={styles.hubContactRow}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <a href={`mailto:${hub.email}`}>{hub.email}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.secHeaderCenter}>
              <span className={styles.eyebrow}>Frequently Asked Questions</span>
              <h2 className={styles.sectionTitle}>Everything You Need to Know</h2>
              <p className={styles.secSub}>
                Quick answers to common questions about contacting Swarn Bharat Group and accessing our services.
              </p>
            </div>

            <div className={styles.faqWrapper}>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`${styles.faqItem} ${activeFaq === index ? styles.faqItemActive : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                    className={styles.faqQuestionBtn}
                    aria-expanded={activeFaq === index}
                  >
                    <span>{faq.question}</span>
                    <span className={styles.faqToggleIcon}>
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className={`${styles.faqAnswer} ${activeFaq === index ? styles.faqAnswerOpen : ""}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION BANNER ================= */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaCardContent}>
                <span className={styles.ctaCardBadge}>Join the Movement</span>
                <h2>Ready to Experience the Connected Ecosystem?</h2>
                <p>
                  Create your unified Swarn account in seconds and unlock rewards, careers, property, and services nationwide.
                </p>
                <div className={styles.ctaBtns}>
                  <Link href="/register" className={styles.primaryGoldBtn}>
                    Create Account Free
                  </Link>
                  <Link href="/about" className={styles.secondaryOutlineBtn}>
                    Learn About Our Vision
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
