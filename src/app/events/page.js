"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", designation: "", attendees: "1" });
  const [isRegistered, setIsRegistered] = useState(false);

  const flagshipEvent = {
    id: "leadership-conclave-2026",
    title: "Swarn Bharat National Leadership Conclave 2026",
    theme: "Architecting a $5 Trillion Viksit Bharat — Infrastructure, AI & Social Prosperity",
    date: { day: "25", month: "OCT", year: "2026", full: "October 25 – 26, 2026" },
    time: "09:30 AM – 06:00 PM IST",
    location: "Bharat Mandapam, Pragati Maidan, New Delhi",
    image: "/images/slide-01.jpg",
    spotsLeft: 48,
    speakers: ["Union Ministers & Policy Leaders", "Fortune 500 CEOs", "Tech & Clean Energy Pioneers"],
    description: "India's premier high-level dialogue bringing together policymakers, industry captains, tech innovators, and civil society leaders to shape nation-building agendas."
  };

  const eventsList = [
    {
      id: "sustainability-summit",
      category: "flagship",
      categoryName: "Flagship Summit",
      title: "Sustainability & Clean Energy Summit 2026",
      day: "18",
      month: "NOV",
      year: "2026",
      time: "10:00 AM – 05:00 PM IST",
      location: "Grand Hyatt Ballroom, Bengaluru",
      image: "/images/h4.2.png",
      summary: "Exploring hybrid solar-wind grids, green hydrogen corridors, and ESG frameworks for Indian real estate and manufacturing conglomerates.",
      seatsRemaining: 84
    },
    {
      id: "youth-tech-hackathon",
      category: "webinar",
      categoryName: "Tech & Hackathons",
      title: "Swarn Bharat CodeForIndia Hackathon & AI Masterclass",
      day: "05",
      month: "DEC",
      year: "2026",
      time: "Virtual & Hybrid / Delhi Tech Hub",
      location: "Online / Outer Ring Road, Bengaluru",
      image: "/images/std.png",
      summary: "48-hour nationwide developer sprint creating decentralized identity, smart logistics, and localized EdTech solutions. ₹25 Lakh in prize grants.",
      seatsRemaining: 230
    },
    {
      id: "proptech-investors-meet",
      category: "industry",
      categoryName: "Industry Roundtables",
      title: "National PropTech & Township Infrastructure Forum",
      day: "14",
      month: "DEC",
      year: "2026",
      time: "02:00 PM – 07:00 PM IST",
      location: "One BKC Corporate Centre, Mumbai",
      image: "/images/real.png",
      summary: "High-level investor symposium on tier-2/3 smart township expansion, green real estate rating norms, and institutional asset tokenization.",
      seatsRemaining: 42
    },
    {
      id: "community-impact-drive",
      category: "community",
      categoryName: "Community & CSR",
      title: "Foundation Rural Livelihood & Skills Empowerment Day",
      day: "10",
      month: "JAN",
      year: "2027",
      time: "09:00 AM – 04:00 PM IST",
      location: "Salt Lake Convention Centre, Kolkata",
      image: "/images/news-02.jpg",
      summary: "Celebrating 100,000 rural youth skill graduates with job placement drives, artisan handicraft exhibitions, and grassroots leadership awards.",
      seatsRemaining: 150
    },
    {
      id: "commerce-retail-expo",
      category: "industry",
      categoryName: "Industry Roundtables",
      title: "Viksit Retail & Supply Chain Expo 2027",
      day: "22",
      month: "JAN",
      year: "2027",
      time: "10:00 AM – 06:30 PM IST",
      location: "Hitex Exhibition Center, Hyderabad",
      image: "/images/ecm.png",
      summary: "Connecting 500+ D2C brands, warehousing operators, and fintech providers to scale omnichannel retail across 50+ tier-2/3 Indian cities.",
      seatsRemaining: 110
    }
  ];

  const pastHighlights = [
    {
      title: "Swarn Bharat Infrastructure Conclave 2025",
      city: "New Delhi",
      delegates: "1,200+ Delegates",
      keynote: "Keynote Address on National Highway Connectivity",
      image: "/images/h4.1.png"
    },
    {
      title: "Youth Tech & Livelihood Summit 2025",
      city: "Bengaluru",
      delegates: "2,500+ Students & Founders",
      keynote: "AI & Future of Work in Emerging Bharat",
      image: "/images/news-01.jpg"
    },
    {
      title: "Foundation Impact Dialogue 2025",
      city: "Mumbai",
      delegates: "40+ CSR Leaders",
      keynote: "Grassroots Healthcare & Women Entrepreneurship",
      image: "/images/news-03.jpg"
    }
  ];

  const filteredEvents = activeTab === "all"
    ? eventsList
    : eventsList.filter((ev) => ev.category === activeTab);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  return (
    <div className={styles.eventsPageWrapper}>
      <Navbar />

      <main className={styles.eventsPage}>
        {/* ================= 1. HERO SECTION ================= */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} />
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.sparkle}>✦</span>
                <span>Swarn Bharat Conclaves &amp; Forums</span>
              </div>
              <h1 className={styles.heroTitle}>
                Convening Visionaries to <br />
                <span className={styles.goldText}>Shape India&apos;s Next Era</span>
              </h1>
              <p className={styles.heroDescription}>
                Join industry leaders, policymakers, entrepreneurs, and scholars across our flagship summits, technical hackathons, regional roundtables, and CSR community drives.
              </p>
            </div>
          </div>
        </section>

        {/* ================= 2. FLAGSHIP EVENT BANNER ================= */}
        <section className={styles.flagshipSection}>
          <div className={styles.container}>
            <div className={styles.flagshipCard}>
              <div className={styles.flagshipImgCol}>
                <img src={flagshipEvent.image} alt={flagshipEvent.title} className={styles.flagshipImg} />
                <div className={styles.flagshipBadge}>FLAGSHIP CONCLAVE</div>
              </div>

              <div className={styles.flagshipContentCol}>
                <div className={styles.dateLocationRow}>
                  <div className={styles.datePill}>
                    <strong>{flagshipEvent.date.full}</strong>
                  </div>
                  <div className={styles.locationPill}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{flagshipEvent.location}</span>
                  </div>
                </div>

                <h2 className={styles.flagshipHeading}>{flagshipEvent.title}</h2>
                <p className={styles.flagshipTheme}>{flagshipEvent.theme}</p>
                <p className={styles.flagshipDesc}>{flagshipEvent.description}</p>

                <div className={styles.speakersList}>
                  <span className={styles.speakersLabel}>Key Participants:</span>
                  {flagshipEvent.speakers.map((sp, idx) => (
                    <span key={idx} className={styles.speakerChip}>
                      ✦ {sp}
                    </span>
                  ))}
                </div>

                <div className={styles.flagshipActionRow}>
                  <button 
                    type="button" 
                    onClick={() => { setSelectedEvent(flagshipEvent); setIsRegistered(false); }}
                    className={styles.registerFlagshipBtn}
                  >
                    Reserve Delegate Pass
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <span className={styles.spotsCount}>Only {flagshipEvent.spotsLeft} Delegate Passes Remaining</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. UPCOMING EVENTS FILTER & GRID ================= */}
        <section className={styles.eventsGridSection}>
          <div className={styles.container}>
            <div className={styles.secHeaderRow}>
              <div>
                <span className={styles.eyebrow}>Calendar of Summits</span>
                <h2 className={styles.secTitle}>Upcoming Summits &amp; Forums</h2>
              </div>

              {/* Filter Tabs */}
              <div className={styles.tabsRow}>
                {[
                  { id: "all", label: "All Events" },
                  { id: "flagship", label: "Flagship Summits" },
                  { id: "industry", label: "Industry Roundtables" },
                  { id: "webinar", label: "Tech & Hackathons" },
                  { id: "community", label: "Community & CSR" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ""}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.eventsGrid}>
              {filteredEvents.map((event) => (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.eventCardImgWrap}>
                    <img src={event.image} alt={event.title} className={styles.eventCardImg} />
                    <span className={styles.eventCategoryTag}>{event.categoryName}</span>
                  </div>

                  <div className={styles.eventCardBody}>
                    <div className={styles.eventDateBlock}>
                      <div className={styles.dateBox}>
                        <span className={styles.dateDay}>{event.day}</span>
                        <span className={styles.dateMonth}>{event.month}</span>
                      </div>
                      <div className={styles.eventTimeLocation}>
                        <span className={styles.eventTime}>{event.time}</span>
                        <span className={styles.eventLoc}>{event.location}</span>
                      </div>
                    </div>

                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.eventSummary}>{event.summary}</p>

                    <div className={styles.eventCardFooter}>
                      <span className={styles.seatsBadge}>
                        <span className={styles.seatsPulse} /> {event.seatsRemaining} Seats Open
                      </span>
                      <button
                        type="button"
                        onClick={() => { setSelectedEvent(event); setIsRegistered(false); }}
                        className={styles.registerEventBtn}
                      >
                        Register Free &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 4. PAST CONCLAVES ARCHIVE ================= */}
        <section className={`${styles.section} ${styles.bgPaper}`}>
          <div className={styles.container}>
            <div className={styles.secHeaderCenter}>
              <span className={styles.eyebrow}>Archive of Excellence</span>
              <h2 className={styles.secTitle}>Past Conclave Highlights</h2>
              <p className={styles.secSub}>Memorable moments and key policy outcomes from our previous nationwide conclaves.</p>
            </div>

            <div className={styles.archiveGrid}>
              {pastHighlights.map((ph, idx) => (
                <div key={idx} className={styles.archiveCard}>
                  <div className={styles.archiveImgWrap}>
                    <img src={ph.image} alt={ph.title} className={styles.archiveImg} />
                    <span className={styles.archiveCityTag}>{ph.city}</span>
                  </div>
                  <div className={styles.archiveBody}>
                    <div className={styles.archiveMeta}>
                      <span>{ph.delegates}</span>
                    </div>
                    <h4>{ph.title}</h4>
                    <p>{ph.keynote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= REGISTRATION MODAL ================= */}
        {selectedEvent && (
          <div className={styles.modalBackdrop} onClick={() => setSelectedEvent(null)}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              <button type="button" className={styles.modalCloseBtn} onClick={() => setSelectedEvent(null)}>✕</button>

              <div className={styles.modalHeader}>
                <span className={styles.modalTag}>Delegate Registration</span>
                <h2>{selectedEvent.title}</h2>
                <div className={styles.modalEventMeta}>
                  <span>📍 {selectedEvent.location}</span>
                  <span>🗓️ {selectedEvent.date?.full || `${selectedEvent.day} ${selectedEvent.month}`}</span>
                </div>
              </div>

              <div className={styles.modalBody}>
                {isRegistered ? (
                  <div className={styles.successState}>
                    <div className={styles.successIcon}>🎉</div>
                    <h3>Registration Confirmed!</h3>
                    <p>Thank you, {regForm.name || "Delegate"}. Your pass confirmation has been sent to <strong>{regForm.email || "your email"}</strong>.</p>
                    <button type="button" onClick={() => setSelectedEvent(null)} className={styles.modalDoneBtn}>Done</button>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className={styles.modalForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Aryan Sharma"
                          value={regForm.name}
                          onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Corporate / Official Email</label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={regForm.phone}
                          onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Organization / Designation</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. VP Strategy, Apex Corp"
                          value={regForm.designation}
                          onChange={(e) => setRegForm({ ...regForm, designation: e.target.value })}
                        />
                      </div>
                    </div>

                    <button type="submit" className={styles.submitRegistrationBtn}>
                      Confirm Delegate Registration
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
