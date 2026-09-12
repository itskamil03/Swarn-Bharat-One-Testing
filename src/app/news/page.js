"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);

  const categories = [
    { id: "all", label: "All News" },
    { id: "corporate", label: "Corporate & Strategy" },
    { id: "infrastructure", label: "Infrastructure & Projects" },
    { id: "technology", label: "Technology & AI" },
    { id: "foundation", label: "Foundation & CSR" },
    { id: "partnerships", label: "Strategic Alliances" },
  ];

  const featuredStory = {
    id: "flagship-expansion-2026",
    title: "Swarn Bharat Group Announces ₹5,000 Cr Multi-Sector Infrastructure & Digital Expansion",
    subtitle: "A landmark investment spanning renewable energy parks, smart township logistics, and next-generation AI enterprise platforms across 18+ Indian cities.",
    date: "08 SEP 2026",
    category: "Corporate & Strategy",
    readTime: "4 min read",
    image: "/images/h2.png",
    author: "Swarn Bharat Bureau",
    summary: "At a special executive council meet in New Delhi, Swarn Bharat Group unveiled its comprehensive 2026–2030 development roadmap, emphasizing localized sustainable manufacturing, digital tokenization for property investments, and zero-carbon industrial parks.",
  };

  const newsList = [
    {
      id: "renewable-energy-project",
      title: "Swarn Bharat Inaugurates 450MW Solar & Wind Hybrid Energy Park in Western Corridor",
      date: "20 AUG 2026",
      category: "infrastructure",
      categoryName: "Infrastructure & Projects",
      readTime: "3 min read",
      image: "/images/h4.2.png",
      summary: "The flagship clean energy project is set to power over 350,000 households and offset 600,000 metric tons of carbon emissions annually as part of our Net-Zero 2040 commitment.",
      author: "Energy & Infrastructure Bureau",
    },
    {
      id: "education-initiative",
      title: "Swarn Bharat Foundation Unveils 10,000 Tech Scholarships for Rural Youth",
      date: "16 AUG 2026",
      category: "foundation",
      categoryName: "Foundation & CSR",
      readTime: "3 min read",
      image: "/images/news-02.jpg",
      summary: "Partnering with leading digital education institutions, the foundation will provide fully funded coding, AI, and competitive exam tracks to underprivileged students across 12 states.",
      author: "Foundation Press Desk",
    },
    {
      id: "global-partnership",
      title: "Strategic Alliance with Global Clean-Tech Leaders to Build Smart Logistics Hubs",
      date: "02 AUG 2026",
      category: "partnerships",
      categoryName: "Strategic Alliances",
      readTime: "4 min read",
      image: "/images/news-03.jpg",
      summary: "The joint initiative accelerates automated warehousing, electrified freight corridors, and IoT-driven cold supply chains across major Indian metro zones.",
      author: "Corporate Media Relations",
    },
    {
      id: "proptech-launch",
      title: "Next-Gen PropTech Ecosystem Crosses ₹1,200 Cr in Verified Township Transactions",
      date: "24 JUL 2026",
      category: "technology",
      categoryName: "Technology & AI",
      readTime: "3 min read",
      image: "/images/real.png",
      summary: "Transforming real estate transparency with instant property verification, digital title escrow, and unified Swarn Coin rewards for home buyers.",
      author: "PropTech Division",
    },
    {
      id: "matrimonial-milestone",
      title: "Swarn Matrimonial Surpasses 500,000 Verified User Profiles Nationwide",
      date: "12 JUL 2026",
      category: "corporate",
      categoryName: "Corporate & Strategy",
      readTime: "2 min read",
      image: "/images/mtm.png",
      summary: "Strengthening community trust through 100% Aadhaar-verified profiles and zero-brokerage matchmaking support with complete privacy protections.",
      author: "Consumer Platforms Bureau",
    },
    {
      id: "national-highway-link",
      title: "Expressway Highway Corridors Phase-2 Completed 6 Months Ahead of Schedule",
      date: "28 JUN 2026",
      category: "infrastructure",
      categoryName: "Infrastructure & Projects",
      readTime: "4 min read",
      image: "/images/h4.1.png",
      summary: "Connecting high-growth industrial clusters with deep-water ports, reducing transit time by 35% and establishing world-class freight safety standards.",
      author: "Infrastructure Projects",
    },
  ];

  const filteredNews = newsList.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.newsPageWrapper}>
      <Navbar />

      <main className={styles.newsPage}>
        {/* ================= 1. HERO SECTION ================= */}
        <section className={styles.heroSection}>
          <div className={styles.heroBackdrop}>
            <div className={styles.heroGlow} />
            <div className={styles.heroPattern} />
          </div>

          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.sparkle}>✦</span>
                <span>Swarn Bharat Media &amp; Press Center</span>
              </div>
              <h1 className={styles.heroTitle}>
                News, Milestones &amp; <br />
                <span className={styles.goldGradient}>Corporate Announcements</span>
              </h1>
              <p className={styles.heroDescription}>
                Stay informed with official press releases, infrastructure project updates, technological breakthroughs, and executive insights directly from Swarn Bharat Group.
              </p>

              {/* Media Kit & Fast Download */}
              <div className={styles.quickBar}>
                <div className={styles.quickStatsGroup}>
                  <div className={styles.quickStat}>
                    <strong>18+</strong> Cities Impacted
                  </div>
                  <div className={styles.quickStatDivider} />
                  <div className={styles.quickStat}>
                    <strong>50+</strong> Major Project Milestones
                  </div>
                  <div className={styles.quickStatDivider} />
                  <div className={styles.quickStat}>
                    <strong>24/7</strong> Press Verification Desk
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={() => alert("Official Swarn Bharat 2026 Brand & Media Press Kit (.ZIP) is downloading.")}
                  className={styles.mediaKitBtn}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download Media Kit
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. FEATURED COVER STORY ================= */}
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <div className={styles.featuredCard}>
              <div className={styles.featuredImgWrap}>
                <img src={featuredStory.image} alt={featuredStory.title} className={styles.featuredImg} />
                <span className={styles.featuredTag}>COVER STORY</span>
              </div>

              <div className={styles.featuredBody}>
                <div className={styles.metaRow}>
                  <span className={styles.categoryBadge}>{featuredStory.category}</span>
                  <span className={styles.metaDot}>•</span>
                  <span className={styles.dateText}>{featuredStory.date}</span>
                  <span className={styles.metaDot}>•</span>
                  <span className={styles.readTimeText}>{featuredStory.readTime}</span>
                </div>

                <h2 className={styles.featuredTitle}>{featuredStory.title}</h2>
                <p className={styles.featuredSubtitle}>{featuredStory.subtitle}</p>
                <p className={styles.featuredExcerpt}>{featuredStory.summary}</p>

                <div className={styles.authorRow}>
                  <div className={styles.authorAvatar}>SB</div>
                  <div>
                    <strong className={styles.authorName}>{featuredStory.author}</strong>
                    <span className={styles.authorRole}>Executive Communications</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setSelectedNews(featuredStory)}
                    className={styles.readStoryBtn}
                  >
                    Read Full Statement &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. FILTER & SEARCH BAR ================= */}
        <section className={styles.filterSection}>
          <div className={styles.container}>
            <div className={styles.filterBar}>
              {/* Category Pills */}
              <div className={styles.categoryPills}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`${styles.categoryPill} ${activeCategory === cat.id ? styles.categoryPillActive : ""}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className={styles.searchBox}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles & press releases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. NEWS ARTICLES GRID ================= */}
        <section className={styles.newsGridSection}>
          <div className={styles.container}>
            {filteredNews.length === 0 ? (
              <div className={styles.noResultsBox}>
                <div className={styles.noResultsIcon}>📰</div>
                <h3>No articles found</h3>
                <p>No press releases matched your query. Try resetting your search or category filter.</p>
                <button 
                  type="button" 
                  onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                  className={styles.resetFilterBtn}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={styles.newsGrid}>
                {filteredNews.map((item) => (
                  <article key={item.id} className={styles.newsCard}>
                    <div className={styles.cardImgWrap}>
                      <img src={item.image} alt={item.title} className={styles.cardImg} />
                      <span className={styles.cardCategoryBadge}>{item.categoryName}</span>
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.cardMeta}>
                        <span>{item.date}</span>
                        <span className={styles.metaDot}>•</span>
                        <span>{item.readTime}</span>
                      </div>

                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardSummary}>{item.summary}</p>

                      <div className={styles.cardFooter}>
                        <span className={styles.cardAuthor}>{item.author}</span>
                        <button 
                          type="button" 
                          onClick={() => setSelectedNews(item)}
                          className={styles.cardReadLink}
                        >
                          Read Release &rarr;
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= 5. NEWSLETTER & PRESS ENQUIRIES ================= */}
        <section className={styles.pressInquirySection}>
          <div className={styles.container}>
            <div className={styles.pressCard}>
              <div className={styles.pressContent}>
                <span className={styles.pressBadge}>Media Relations</span>
                <h2>Direct Press &amp; Journalist Inquiries</h2>
                <p>
                  Accredited journalists, research analysts, and institutional media can contact our dedicated corporate communications desk for press passes, executive interviews, and high-res asset requests.
                </p>
                <div className={styles.pressContactGroup}>
                  <div className={styles.pressContactItem}>
                    <strong>Official Media Bureau:</strong>
                    <a href="mailto:media@swarnbharatgroup.com">media@swarnbharatgroup.com</a>
                  </div>
                  <div className={styles.pressContactItem}>
                    <strong>Media Hotline:</strong>
                    <span>+91 (011) 4987 6555</span>
                  </div>
                </div>
              </div>

              <div className={styles.newsletterBox}>
                <h3>Subscribe to Press Alerts</h3>
                <p>Receive verified corporate releases directly in your inbox.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to Swarn Bharat Press Alerts."); }} className={styles.newsForm}>
                  <input type="email" placeholder="Enter your official press email" required className={styles.newsInput} />
                  <button type="submit" className={styles.newsSubmitBtn}>
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ARTICLE MODAL ================= */}
        {selectedNews && (
          <div className={styles.modalBackdrop} onClick={() => setSelectedNews(null)}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              <button type="button" className={styles.modalCloseBtn} onClick={() => setSelectedNews(null)}>✕</button>

              <div className={styles.modalImgWrap}>
                <img src={selectedNews.image} alt={selectedNews.title} />
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalMeta}>
                  <span>{selectedNews.categoryName || selectedNews.category}</span>
                  <span>•</span>
                  <span>{selectedNews.date}</span>
                </div>
                <h2>{selectedNews.title}</h2>
                <p className={styles.modalLead}>{selectedNews.summary || selectedNews.subtitle}</p>
                <hr className={styles.modalDivider} />
                <p className={styles.modalParagraph}>
                  NEW DELHI — Swarn Bharat Group reiterated its foundational vision towards self-reliance, inclusive economic infrastructure, and tech-driven societal transformation. 
                  &ldquo;Every project undertaken by Swarn Bharat Group is built to bridge economic disparities, unlock real employment, and position Bharat on the global leadership map,&rdquo; stated the executive council.
                </p>
                <p className={styles.modalParagraph}>
                  For additional project files, official architectural blueprints, and high-resolution media visuals, reach out to the corporate communications desk at media@swarnbharatgroup.com.
                </p>
                <div className={styles.modalFooterRow}>
                  <span>Published by <strong>{selectedNews.author}</strong></span>
                  <button type="button" onClick={() => setSelectedNews(null)} className={styles.modalDoneBtn}>Close Release</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
