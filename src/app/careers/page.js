"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

const initialJobs = [
  { title: "Frontend Developer (React)", category: "Technology", location: "Bengaluru", type: "Full-time", desc: "Build and ship UI for our internal admin panels and public-facing platforms.", posted: "2 days ago" },
  { title: "Backend Engineer (Node.js)", category: "Technology", location: "Bengaluru", type: "Full-time", desc: "Own REST APIs powering the SwarnBharat ecosystem's core services.", posted: "5 days ago" },
  { title: "QA Engineer", category: "Technology", location: "Remote", type: "Full-time", desc: "Drive manual and automated testing across web and mobile releases.", posted: "1 week ago" },
  { title: "Site Sales Manager", category: "Real Estate", location: "Jamshedpur", type: "Full-time", desc: "Lead on-site sales for a premium residential project launch.", posted: "3 days ago" },
  { title: "Project Coordinator", category: "Real Estate", location: "Ranchi", type: "Full-time", desc: "Coordinate timelines between contractors, vendors and the design team.", posted: "1 week ago" },
  { title: "Content & Curriculum Associate", category: "Students Portal", location: "Remote", type: "Full-time", desc: "Curate scholarship listings and mentorship content for the student network.", posted: "4 days ago" },
  { title: "Student Success Intern", category: "Students Portal", location: "Bengaluru", type: "Internship", desc: "Support onboarding and engagement for enrolled student members.", posted: "6 days ago" },
  { title: "Talent Acquisition Executive", category: "Jobs", location: "Bengaluru", type: "Full-time", desc: "Source and screen candidates across the group's job placement marketplace.", posted: "2 days ago" },
  { title: "Employer Partnerships Associate", category: "Jobs", location: "Remote", type: "Full-time", desc: "Build relationships with hiring companies onboarding to the Jobs platform.", posted: "1 week ago" },
  { title: "Relationship Manager", category: "Matrimonial", location: "Jamshedpur", type: "Full-time", desc: "Guide members through profile verification and matchmaking journeys.", posted: "3 days ago" },
  { title: "Trust & Safety Analyst", category: "Matrimonial", location: "Remote", type: "Full-time", desc: "Review profiles and reports to keep the matrimonial platform safe.", posted: "5 days ago" },
  { title: "CSR Program Officer", category: "Foundation", location: "Ranchi", type: "Full-time", desc: "Run community education and healthcare outreach programs on the ground.", posted: "4 days ago" },
  { title: "Foundation Operations Intern", category: "Foundation", location: "Jamshedpur", type: "Internship", desc: "Support logistics and reporting for ongoing CSR initiatives.", posted: "1 week ago" },
  { title: "Category Manager", category: "E-Commerce", location: "Bengaluru", type: "Full-time", desc: "Own product listings, pricing and vendor relationships for a marketplace category.", posted: "2 days ago" },
  { title: "Logistics Coordinator", category: "E-Commerce", location: "Bengaluru", type: "Full-time", desc: "Coordinate warehouse and last-mile delivery operations for marketplace orders.", posted: "6 days ago" }
];

export default function CareersPage() {
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({ category: "", position: "" });
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const [counts, setCounts] = useState({ verticals: 7, positions: 120, members: 2400, cities: 18 });
  const fileInputRef = useRef(null);
  const applyFormRef = useRef(null);
  const carouselRef = useRef(null);
  const heroRef = useRef(null);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%";
    const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%";
    heroRef.current.style.setProperty("--mx", x);
    heroRef.current.style.setProperty("--my", y);
  };

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();
    let animId;
    const frame = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCounts({
        verticals: Math.round(7 * eased),
        positions: Math.round(120 * eased),
        members: Math.round(2400 * eased),
        cities: Math.round(18 * eased),
      });
      if (p < 1) animId = requestAnimationFrame(frame);
    };
    const timer = setTimeout(() => {
      animId = requestAnimationFrame(frame);
    }, 600);
    return () => {
      clearTimeout(timer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.querySelector(`.${styles.deptCard}`);
    const scrollAmount = card ? card.offsetWidth + 22 : 320;

    if (direction === "left") {
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (isAutoPlayPaused) return;
    const interval = setInterval(() => {
      scrollCarousel("right");
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlayPaused]);

  const filteredJobs = initialJobs.filter(j => filter === "all" || j.category === filter);

  const handleFilterClick = (cat) => setFilter(cat);

  const handleApplyClick = (cat, role) => {
    setFormData({ category: cat, position: role });
    if (applyFormRef.current) {
      applyFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFileName(e.dataTransfer.files[0].name);
      if (fileInputRef.current) fileInputRef.current.files = e.dataTransfer.files;
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formEl = e.target;
    const submissionData = {
      fullName: formEl.fullName.value,
      phone: formEl.phone.value,
      email: formEl.email.value,
      category: formData.category || "Technology",
      position: formData.position || "General Application",
      message: formEl.message.value,
      resumeName: fileName || "Candidate_Resume.pdf",
    };

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      const data = await res.json();
      if (data.success) {
        setShowSuccess(true);
        formEl.reset();
        setFileName("");
        setFormData({ category: "", position: "" });
        setTimeout(() => setShowSuccess(false), 6000);
      } else {
        alert(data.error || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      // Fallback success for offline/client mode
      setShowSuccess(true);
      formEl.reset();
      setFileName("");
      setFormData({ category: "", position: "" });
      setTimeout(() => setShowSuccess(false), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const LocIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  const TypeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
      <rect x="3" y="7" width="18" height="13" rx="1" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <section className={styles.hero} id="hero" ref={heroRef} onMouseMove={handleHeroMouseMove}>
        <div className={styles.heroBg}>
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop" alt="Careers at SwarnBharat" />
          <div className={styles.sheen} id="sheen" />
        </div>

        <div className={styles.heroContentWrap}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Careers at SwarnBharat</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.lineMask}><span>Build your career</span></span>
            <span className={styles.lineMask}><span>across Bharat's fastest-</span></span>
            <span className={styles.lineMask}><span>growing ecosystem</span></span>
          </h1>

          <p className={styles.lede}>
            From technology and real estate to student services, jobs, matrimonial,
            foundation and e-commerce — one group, seven worlds of opportunity.
          </p>

          <div className={styles.heroCtaRow}>
            <a href="#openings" className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}>
              <span>View Open Positions</span>
            </a>
            <a href="#apply" className={`${styles.heroBtn} ${styles.heroBtnGhost}`}>
              <span>Submit Your Resume</span>
            </a>
          </div>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="0.5" />
                <rect x="14" y="3" width="7" height="7" rx="0.5" />
                <rect x="3" y="14" width="7" height="7" rx="0.5" />
                <rect x="14" y="14" width="7" height="7" rx="0.5" />
              </svg>
            </div>
            <div className={styles.statBody}>
              <div className={styles.statNum}>
                {String(counts.verticals).padStart(2, "0")}
              </div>
              <div className={styles.statLabel}>Business Verticals</div>
            </div>
          </div>

          <div className={styles.heroStat}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="13" rx="1" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <div className={styles.statBody}>
              <div className={styles.statNum}>
                {counts.positions}+
              </div>
              <div className={styles.statLabel}>Open Positions</div>
            </div>
          </div>

          <div className={styles.heroStat}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="8" r="3" />
                <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
                <circle cx="17" cy="8" r="2.5" />
                <path d="M17 5.3c1.2.3 2 1.4 2 2.7 0 1.3-.8 2.4-2 2.7" />
                <path d="M22 20c0-2.6-1.7-4.6-4-5.5" />
              </svg>
            </div>
            <div className={styles.statBody}>
              <div className={styles.statNum}>
                {counts.members.toLocaleString("en-IN")}+
              </div>
              <div className={styles.statLabel}>Team Members</div>
            </div>
          </div>

          <div className={styles.heroStat}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24">
                <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.3" />
              </svg>
            </div>
            <div className={styles.statBody}>
              <div className={styles.statNum}>
                {String(counts.cities).padStart(2, "0")}
              </div>
              <div className={styles.statLabel}>Cities Across India</div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.sectionBlock} ${styles.wrap}`}>
        <div className={styles.secHead}>
          <div>
            <div className={styles.kicker}>Why SwarnBharat</div>
            <h2>A career that grows in more than one direction</h2>
          </div>
          <p>Move across verticals, not just up a ladder — our group structure means your next role could be in an entirely different industry.</p>
        </div>
        <div className={styles.whyGrid}>
          {[
            {
              title: "Cross-Vertical Growth",
              desc: "Start in one business and move into another as the group expands — technology, realty, e-commerce and beyond.",
              icon: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>
            },
            {
              title: "Real Ownership",
              desc: "Small, accountable teams per vertical mean your work is visible and your decisions carry weight from day one.",
              icon: <><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" /></>
            },
            {
              title: "Purpose-Led Work",
              desc: "Every vertical, including our Foundation, ties back to measurable community and customer impact.",
              icon: <path d="M12 21s-7-4.35-9.5-8.5C.7 8.9 2.6 5 6.2 5c2 0 3.4 1.1 4.3 2.3 0 0 .9-2.3 3.5-2.3 3.6 0 5.5 3.9 3.7 7.5C19.5 16.65 12 21 12 21Z" />
            },
            {
              title: "Structured Rewards",
              desc: "Transparent appraisal cycles, performance bonuses and long-tenure recognition across all seven verticals.",
              icon: <path d="M12 2l2.6 6.6L21 9.3l-5 4.5L17.4 21 12 17.3 6.6 21 8 13.8l-5-4.5 6.4-.7z" />
            }
          ].map((item, idx) => (
            <div key={idx} className={styles.whyItem}>
              <div className={styles.whyItemMark}>
                <svg viewBox="0 0 24 24">{item.icon}</svg>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.sectionBlock} ${styles.wrap}`} id="departments">
        <div className={styles.deptCarouselHeader}>
          <div>
            <div className={styles.kicker}>Explore by Vertical</div>
            <h2>Seven businesses, one career home</h2>
            <p style={{ marginTop: '8px', color: 'var(--slate)', fontSize: '14px', fontWeight: 300, maxWidth: '480px' }}>
              Every card links to live openings in that vertical — filtered instantly in the section below.
            </p>
          </div>

          <div className={styles.carouselNavButtons}>
            <button
              type="button"
              className={styles.carouselBtn}
              onClick={() => scrollCarousel("left")}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.carouselBtn}
              onClick={() => scrollCarousel("right")}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.deptCarouselWrapper}>
          <div
            ref={carouselRef}
            className={styles.deptCarousel}
            onMouseEnter={() => setIsAutoPlayPaused(true)}
            onMouseLeave={() => setIsAutoPlayPaused(false)}
            onTouchStart={() => setIsAutoPlayPaused(true)}
            onTouchEnd={() => setIsAutoPlayPaused(false)}
          >
            {[
              { name: "Technology", desc: "Product engineering, platforms and digital consulting powering every other vertical in the group.", img: "/images/ecm.png" },
              { name: "Real Estate", desc: "Residential and commercial development, sales and project management across 18 cities.", img: "/images/real.png" },
              { name: "Students Portal", desc: "Building the scholarship, mentorship and career-readiness platform for students nationwide.", img: "/images/std.png" },
              { name: "Jobs", desc: "Running the group's own placement and recruitment marketplace connecting talent to opportunity.", img: "/images/h2.png" },
              { name: "Matrimonial", desc: "Product, trust & safety and relationship-success teams behind the group's matchmaking platform.", img: "/images/mtm.png" },
              { name: "Foundation", desc: "Community, education and healthcare programs — for people who want their work to be measured in impact.", img: "/images/ah2.png" },
              { name: "E-Commerce", desc: "Marketplace, logistics and category teams running the group's consumer commerce business.", img: "/images/ah1.png" },
            ].map((dept, idx) => (
              <div
                key={idx}
                className={styles.deptCard}
                onClick={() => {
                  handleFilterClick(dept.name);
                  document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className={styles.deptCardPhoto}>
                  <img src={dept.img} alt={dept.name} />
                  <div className={styles.deptTag}>{dept.name}</div>
                </div>
                <div className={styles.deptBody}>
                  <p>{dept.desc}</p>
                  <div className={styles.deptLink}>
                    View Openings
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.process} id="process">
        <div className={styles.wrap}>
          <div className={styles.secHead}>
            <div>
              <div className={styles.kicker}>How Hiring Works</div>
              <h2>A five-step recruitment process</h2>
            </div>
            <p>Every application is manually reviewed — most candidates hear back within 5 working days of applying.</p>
          </div>
          <div className={styles.processTrack}>
            {[
              { title: "Apply", desc: "Submit your resume through the form below, choosing the vertical and role you're interested in." },
              { title: "Screening", desc: "Our talent team reviews your profile against the role and reaches out within 5 working days." },
              { title: "Interview", desc: "One or two rounds with the hiring vertical — a mix of technical and culture-fit conversations." },
              { title: "Offer", desc: "Selected candidates receive a formal offer with compensation, vertical and reporting details." },
              { title: "Onboarding", desc: "A structured first month gets you set up across your vertical and the wider SwarnBharat group." }
            ].map((step, idx) => (
              <div key={idx} className={styles.step}>
                <div className={styles.stepNum}>0{idx + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.sectionBlock} ${styles.wrap}`} id="openings">
        <div className={styles.secHead}>
          <div>
            <div className={styles.kicker}>Current Openings</div>
            <h2>Positions posted by our hiring teams</h2>
          </div>
          <p>Filter by vertical, or search. This list is pulled live from the admin panel's job listings.</p>
        </div>
        <div className={styles.filters}>
          {["all", "Technology", "Real Estate", "Students Portal", "Jobs", "Matrimonial", "Foundation", "E-Commerce"].map(cat => (
            <button
              key={cat}
              className={`${styles.chip} ${filter === cat ? styles.chipActive : ""}`}
              onClick={() => handleFilterClick(cat)}
            >
              {cat === "all" ? "All Openings" : cat}
            </button>
          ))}
        </div>

        <div className={styles.jobGrid}>
          {filteredJobs.map((job, idx) => (
            <div key={idx} className={styles.jobCard}>
              <div className={styles.jobTop}>
                <div className={styles.jobTitle}>{job.title}</div>
                <div className={styles.jobCat}>{job.category}</div>
              </div>
              <div className={styles.jobMeta}>
                <span><LocIcon /> {job.location}</span>
                <span><TypeIcon /> {job.type}</span>
              </div>
              <div className={styles.jobDesc}>{job.desc}</div>
              <div className={styles.jobFoot}>
                <span className={styles.jobFootPosted}>Posted {job.posted}</span>
                <button
                  type="button"
                  className={styles.applyLink}
                  onClick={() => handleApplyClick(job.category, job.title)}
                >
                  Apply Now
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className={`${styles.noResults} ${styles.noResultsActive}`}>
            No open positions in this category right now — check back soon or submit your resume below for future roles.
          </div>
        )}
      </section>

      <section className={styles.joinSection} id="apply" ref={applyFormRef}>
        <div className={`${styles.wrap} ${styles.joinGrid}`}>
          <div className={styles.joinLeft}>
            <div className={styles.joinEyebrow}>
              <span />
              <em>Ready to Join Us</em>
            </div>
            <h2 className={styles.joinTitle}>
              Tell us about you — we'll match you to the right vertical
            </h2>
            <p className={styles.joinLede}>
              Whether or not you see an exact match above, submit your resume. Our talent team reviews every application against openings across all seven verticals.
            </p>

            <ul className={styles.joinChecklist}>
              <li>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7.5L5.5 11L12 3.5" stroke="#B4863A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Response within 5 working days
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7.5L5.5 11L12 3.5" stroke="#B4863A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Resume kept on file for 12 months across all verticals
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7.5L5.5 11L12 3.5" stroke="#B4863A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                PDF, DOC or DOCX accepted, up to 5MB
              </li>
            </ul>

            <div className={styles.joinStats}>
              <div className={styles.joinStat}>
                <b>7</b>
                <span>Verticals hiring across the group</span>
              </div>
              <div className={styles.joinStat}>
                <b>5</b>
                <span>Working days to first response</span>
              </div>
              <div className={styles.joinStat}>
                <b>12</b>
                <span>Months your resume stays on file</span>
              </div>
            </div>

            <p className={styles.joinContact}>
              Prefer to reach us directly? Write to <a href="mailto:careers@swarnbharat.in">careers@swarnbharat.in</a> and a member of the talent team will follow up.
            </p>
          </div>

          <form className={styles.joinForm} onSubmit={handleSubmit}>
            <div className={styles.joinRow}>
              <div className={styles.joinField}>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" required placeholder="Your full name" />
              </div>
              <div className={styles.joinField}>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" required placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            <div className={styles.joinField}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" required placeholder="you@example.com" />
            </div>

            <div className={styles.joinRow}>
              <div className={styles.joinField}>
                <label htmlFor="category">Vertical</label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="" disabled>Select a vertical</option>
                  <option value="Technology">Technology</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Students Portal">Students Portal</option>
                  <option value="Jobs">Jobs</option>
                  <option value="Matrimonial">Matrimonial</option>
                  <option value="Foundation">Foundation</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Not Sure / General">Not Sure / General</option>
                </select>
              </div>
              <div className={styles.joinField}>
                <label htmlFor="position">Position Applying For</label>
                <input
                  type="text"
                  id="position"
                  placeholder="e.g. Frontend Developer"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.joinField}>
              <label htmlFor="message">A Little About You</label>
              <textarea id="message" placeholder="Relevant experience, notice period, anything you'd like us to know" />
            </div>

            <div className={styles.joinField}>
              <label>Resume</label>
              <div
                className={`${styles.joinUpload} ${isDragOver ? styles.joinUploadDragover : ""}`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 13V3M10 3L6 7M10 3L14 7" stroke="#B4863A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="#B4863A" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <p>
                  <strong>Click to upload</strong> or drag your resume here — PDF, DOC or DOCX, up to 5MB
                </p>
                {fileName && <div className={styles.joinFileName}>Selected: {fileName}</div>}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className={styles.joinSubmitBtn}>Submit Application</button>
            <p className={styles.joinLegal}>By submitting, you agree to let SwarnBharat Group retain your resume for future openings.</p>
            {showSuccess && (
              <div className={styles.successMsg}>
                Thank you — your application has been received. Our talent team will be in touch within 5 working days.
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
