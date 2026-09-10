"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.css";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const categories = [
    { id: "all", label: "All Journal Articles", count: 7 },
    { id: "energy", label: "Energy & Net-Zero", count: 2 },
    { id: "infrastructure", label: "Nation Building & Infra", count: 2 },
    { id: "technology", label: "Tech, AI & Web3", count: 2 },
    { id: "realestate", label: "Urban Townships", count: 1 },
  ];

  const featuredLead = {
    id: "solar-rollout-largest",
    issue: "VOLUME 14 · SEPTEMBER 2026",
    category: "Energy & Net-Zero",
    categoryKey: "energy",
    title: "Engineering Energy Sovereignty: Inside India's Largest 450MW Hybrid Microgrid",
    subtitle: "How decentralized renewables, predictive battery storage, and localized microgrids are insulating industrial corridors from peak-tariff volatility while powering 350,000 households.",
    author: "Aditya Kumar",
    authorRole: "Founder & Managing Director",
    date: "08 SEP 2026",
    readTime: "6 min read",
    listenTime: "5 min listen",
    image: "/images/h4.2.png",
    takeaways: [
      "Combines 450MW bifacial solar panels with automated battery storage",
      "Reduces transmission losses by 28% through localized microgrid architecture",
      "Supplies clean baseline power to 14 industrial parks and 350,000 homes",
      "Zero-carbon offset certified under international green taxonomy standards"
    ],
    content: "Energy sovereignty is the foundational pillar of any resilient modern economy. At Swarn Bharat Group, our hybrid clean energy deployments are engineered not just for green compliance, but to provide round-the-clock uninterrupted industrial power. By integrating AI-driven predictive storage and decentralized battery banks, we are empowering manufacturing hubs to operate 100% off-grid during peak tariff hours."
  };

  const articles = [
    {
      id: "urban-infrastructure-trust",
      category: "infrastructure",
      categoryName: "Nation Building & Infra",
      title: "How Transit-Oriented Urban Infrastructure Restores Citizen Trust & Elevates Mobility",
      date: "02 SEP 2026",
      readTime: "5 min read",
      author: "Rahul Sharma",
      authorRole: "Chief Technology Officer",
      image: "/images/slide-03.jpg",
      summary: "Modern township planning requires integrating pedestrian-first transit corridors, automated underground utility ducts, and high-speed digital infrastructure.",
      takeaways: ["Transit-oriented urban zones", "Underground utility corridors", "Citizen-first open spaces"]
    },
    {
      id: "manufacturing-capacity-bharat",
      category: "infrastructure",
      categoryName: "Nation Building & Infra",
      title: "Building High-Precision Domestic Manufacturing for a Self-Reliant & Export-Ready Bharat",
      date: "24 AUG 2026",
      readTime: "6 min read",
      author: "Meera Patel",
      authorRole: "Head of Operations",
      image: "/images/h4.4.png",
      summary: "Analyzing capital efficiency, high-precision robotics, and localized supply chains that are driving India's industrial export competitiveness.",
      takeaways: ["Zero-defect manufacturing", "Localized tier-2/3 vendor networks", "Global export standards"]
    },
    {
      id: "proptech-tokenization",
      category: "realestate",
      categoryName: "Urban Townships",
      title: "Democratizing Real Estate: Fractional Property Ownership & Cryptographic Escrow",
      date: "15 AUG 2026",
      readTime: "4 min read",
      author: "Tarun Verma",
      authorRole: "Head of Product",
      image: "/images/real.png",
      summary: "How digital title escrow and Swarn Points integration are allowing everyday citizens to invest in high-yield commercial property portfolios.",
      takeaways: ["Fractional tokenization", "100% legal title transparency", "Automated quarterly rental yields"]
    },
    {
      id: "future-of-work-youth",
      category: "technology",
      categoryName: "Tech, AI & Web3",
      title: "Bridging the Skill Divide: Preparing 10 Million Young Indians for the Agentic AI Era",
      date: "04 AUG 2026",
      readTime: "5 min read",
      author: "Swarn Bharat Education Bureau",
      authorRole: "Research Team",
      image: "/images/std.png",
      summary: "Why traditional degrees are giving way to continuous modular certifications, practical project apprenticeships, and localized vernacular AI tools.",
      takeaways: ["Modular nano-certifications", "Vernacular AI learning", "Apprenticeship-to-hire pipelines"]
    },
    {
      id: "omnichannel-retail-revolution",
      category: "technology",
      categoryName: "Tech, AI & Web3",
      title: "The Next 500 Million Shoppers: Scaling Unified Commerce Beyond Tier-1 Metros",
      date: "22 JUL 2026",
      readTime: "4 min read",
      author: "Retail Strategy Desk",
      authorRole: "Consumer Intelligence",
      image: "/images/ecm.png",
      summary: "Voice search, vernacular product guides, and universal loyalty coins are dismantling the barriers between tier-3 retail and modern digital commerce.",
      takeaways: ["Voice-first browsing", "Same-day regional hub logistics", "Instant Swarn Rewards parity"]
    },
    {
      id: "green-hydrogen-future",
      category: "energy",
      categoryName: "Energy & Net-Zero",
      title: "Green Hydrogen: The Next Frontier in Heavy Logistics & Steel Decarbonization",
      date: "10 JUL 2026",
      readTime: "7 min read",
      author: "Energy Innovation Lab",
      authorRole: "Clean Energy Group",
      image: "/images/h4.1.png",
      summary: "Mapping the economic viability of green hydrogen electrolyzers co-located at solar plants for national freight rail and long-haul transport corridors.",
      takeaways: ["Electrolyzer cost parity", "Dedicated freight rail fueling", "Heavy industry decarbonization"]
    }
  ];

  const filteredArticles = articles.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSaveArticle = (e, id) => {
    e.stopPropagation();
    setSavedArticles(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openReader = (article) => {
    setSelectedArticle(article);
    setReadingProgress(0);
  };

  return (
    <>
      <Navbar />

      <main className={styles.blogPage}>
        {/* ================= 1. EDITORIAL MASTHEAD & HERO ================= */}
        <header className={styles.masthead}>
          <div className={styles.mastheadTopBar}>
            <div className={styles.container}>
              <div className={styles.mastheadMeta}>
                <span>SWARN BHARAT JOURNAL OF NATION BUILDING</span>
                <span>•</span>
                <span>VOL. XIV · ED. 2026</span>
                <span>•</span>
                <span>ISSN 2814-9920</span>
              </div>
            </div>
          </div>

          <div className={styles.heroSection}>
            <div className={styles.heroBackdrop}>
              <div className={styles.heroGlow} />
              <div className={styles.heroGridLines} />
            </div>

            <div className={styles.container}>
              <div className={styles.leadGrid}>
                
                {/* Left Column: Editorial Lead */}
                <div className={styles.leadContentCol}>
                  <div className={styles.issueTagPill}>
                    <span className={styles.goldSealIcon}>✦</span>
                    <span>{featuredLead.issue}</span>
                  </div>

                  <h1 className={styles.leadHeadline}>
                    Engineering Energy Sovereignty: <br />
                    <span className={styles.goldSerif}>Inside India&apos;s 450MW Hybrid Grid</span>
                  </h1>

                  <p className={styles.leadSubtitle}>{featuredLead.subtitle}</p>

                  {/* Audio Podcast Preview Player */}
                  <div className={styles.audioPlayerStrip}>
                    <button 
                      type="button" 
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className={styles.audioPlayBtn}
                      aria-label={isPlayingAudio ? "Pause Audio" : "Play Audio"}
                    >
                      {isPlayingAudio ? "❚❚" : "▶"}
                    </button>
                    <div className={styles.audioInfo}>
                      <span className={styles.audioTitle}>
                        {isPlayingAudio ? "Playing Audio Narration (AI Voice)..." : "Listen to this Thought Piece"}
                      </span>
                      <span className={styles.audioDuration}>{featuredLead.listenTime} · Executive Summary</span>
                    </div>
                    {isPlayingAudio && (
                      <div className={styles.soundWaves}>
                        <span /><span /><span /><span /><span />
                      </div>
                    )}
                  </div>

                  <div className={styles.leadActionRow}>
                    <button 
                      type="button" 
                      onClick={() => openReader(featuredLead)}
                      className={styles.readFeatureBtn}
                    >
                      Read Full Journal Analysis
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                    <span className={styles.readTimeBadge}>⏱ {featuredLead.readTime}</span>
                  </div>
                </div>

                {/* Right Column: 3D Luxury Journal Cover Card */}
                <div className={styles.leadVisualCol}>
                  <div className={styles.journalCoverCard} onClick={() => openReader(featuredLead)}>
                    <div className={styles.coverImageWrap}>
                      <img src={featuredLead.image} alt={featuredLead.title} className={styles.coverImg} />
                      <div className={styles.coverOverlay} />
                    </div>

                    <div className={styles.coverFrameHeader}>
                      <div className={styles.coverGoldLogo}>S</div>
                      <div className={styles.coverEdition}>
                        <strong>SWARN BHARAT</strong>
                        <span>JOURNAL OF STRATEGY</span>
                      </div>
                    </div>

                    <div className={styles.coverBottomBlock}>
                      <span className={styles.coverTopicBadge}>{featuredLead.category}</span>
                      <h3>&ldquo;Energy sovereignty is the foundation of a Viksit Bharat.&rdquo;</h3>
                      <div className={styles.coverAuthorLine}>
                        <span>By {featuredLead.author}</span>
                        <span>{featuredLead.authorRole}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </header>

        {/* ================= 2. TRENDING TOPICS MARQUEE ================= */}
        <section className={styles.marqueeStrip}>
          <div className={styles.marqueeTrack}>
            <span>✦ 450MW RENEWABLE HYBRID GRIDS</span>
            <span>✦ PROPTECH FRACTIONAL TITLE ESCROW</span>
            <span>✦ 10M YOUTH AI SKILL SCHOLARSHIPS</span>
            <span>✦ ZERO-CARBON INDUSTRIAL TOWNSHIPS</span>
            <span>✦ HIGH-SPEED FREIGHT LOGISTICS</span>
            <span>✦ VERNACULAR E-COMMERCE ADOPTION</span>
            <span>✦ UNIFIED REWARDS CURRENCY</span>
            {/* Duplicated for infinite continuous loop */}
            <span>✦ 450MW RENEWABLE HYBRID GRIDS</span>
            <span>✦ PROPTECH FRACTIONAL TITLE ESCROW</span>
            <span>✦ 10M YOUTH AI SKILL SCHOLARSHIPS</span>
            <span>✦ ZERO-CARBON INDUSTRIAL TOWNSHIPS</span>
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
                    <span>{cat.label}</span>
                    <span className={styles.pillCount}>{cat.count}</span>
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className={styles.searchBox}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search thought pieces & research..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

            </div>
          </div>
        </section>

        {/* ================= 4. EDITORIAL ESSAYS GRID ================= */}
        <section className={styles.articlesSection}>
          <div className={styles.container}>
            <div className={styles.editorialGrid}>
              {filteredArticles.map((article, idx) => (
                <article 
                  key={article.id} 
                  className={`${styles.editorialCard} ${idx === 0 ? styles.editorialCardLarge : ""}`}
                  onClick={() => openReader(article)}
                >
                  <div className={styles.cardMediaWrap}>
                    <img src={article.image} alt={article.title} className={styles.cardImg} />
                    <span className={styles.cardTopicBadge}>{article.categoryName}</span>
                    <button 
                      type="button" 
                      onClick={(e) => toggleSaveArticle(e, article.id)}
                      className={`${styles.saveBookmarkBtn} ${savedArticles.includes(article.id) ? styles.saved : ""}`}
                      title={savedArticles.includes(article.id) ? "Saved to Reading List" : "Save Article"}
                    >
                      {savedArticles.includes(article.id) ? "★" : "☆"}
                    </button>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardDateMeta}>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className={styles.cardTitle}>{article.title}</h3>
                    <p className={styles.cardSummary}>{article.summary}</p>

                    <div className={styles.cardTakeawayChips}>
                      {article.takeaways.map((t, tIdx) => (
                        <span key={tIdx} className={styles.takeawayPill}>✦ {t}</span>
                      ))}
                    </div>

                    <div className={styles.cardFooterRow}>
                      <div className={styles.authorMetaBlock}>
                        <strong>{article.author}</strong>
                        <span>{article.authorRole}</span>
                      </div>
                      <span className={styles.readArticleLink}>
                        Read Analysis &rarr;
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. SUNDAY DISPATCH NEWSLETTER ================= */}
        <section className={styles.dispatchSection}>
          <div className={styles.container}>
            <div className={styles.dispatchCard}>
              <div className={styles.dispatchSeal}>
                <div className={styles.sealInner}>S</div>
              </div>

              <div className={styles.dispatchContent}>
                <span className={styles.dispatchEyebrow}>Executive Intelligence</span>
                <h2>The Sunday Strategic Dispatch</h2>
                <p>
                  Every Sunday morning, over 85,000 corporate executives, institutional investors, and policy thinkers read our synthesized perspectives on Indian infrastructure, AI commercialization, and macroeconomic momentum.
                </p>

                <form onSubmit={(e) => { e.preventDefault(); alert("You are subscribed to the Swarn Bharat Strategic Dispatch."); }} className={styles.dispatchForm}>
                  <input 
                    type="email" 
                    placeholder="Enter your official executive email" 
                    required 
                    className={styles.dispatchInput} 
                  />
                  <button type="submit" className={styles.dispatchSubmitBtn}>
                    Join the Briefing Free
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ARTICLE READER MODAL ================= */}
        {selectedArticle && (
          <div className={styles.readerBackdrop} onClick={() => setSelectedArticle(null)}>
            <div className={styles.readerModal} onClick={(e) => e.stopPropagation()}>
              
              {/* Reader Header Bar */}
              <div className={styles.readerTopNav}>
                <div className={styles.readerBrand}>
                  <span className={styles.readerLogoMark}>S</span>
                  <span>SWARN BHARAT JOURNAL</span>
                </div>
                <div className={styles.readerControls}>
                  <button 
                    type="button" 
                    onClick={(e) => toggleSaveArticle(e, selectedArticle.id)}
                    className={styles.readerBookmarkBtn}
                  >
                    {savedArticles.includes(selectedArticle.id) ? "★ Saved in Reading List" : "☆ Save Article"}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSelectedArticle(null)}
                    className={styles.readerCloseBtn}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Reader Body */}
              <div className={styles.readerScrollContent}>
                <div className={styles.readerBannerWrap}>
                  <img src={selectedArticle.image} alt={selectedArticle.title} />
                  <span className={styles.readerCategoryTag}>{selectedArticle.categoryName || selectedArticle.category}</span>
                </div>

                <div className={styles.readerArticleBody}>
                  <div className={styles.readerMetaRow}>
                    <span>Published {selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>

                  <h1 className={styles.readerHeading}>{selectedArticle.title}</h1>
                  <p className={styles.readerLeadParagraph}>{selectedArticle.summary || selectedArticle.subtitle}</p>

                  {/* Key Takeaways Callout */}
                  <div className={styles.takeawaysCallout}>
                    <h4>Executive Key Findings:</h4>
                    <ul>
                      {selectedArticle.takeaways?.map((takeaway, idx) => (
                        <li key={idx}>✦ {takeaway}</li>
                      ))}
                    </ul>
                  </div>

                  <hr className={styles.articleSeparator} />

                  <p className={styles.articleText}>
                    {selectedArticle.content || `India stands at the threshold of an unprecedented multi-decade infrastructure transformation. Building high-resilience ecosystems requires harmonizing sovereign capital allocation, advanced automation, and citizen-centric governance. At Swarn Bharat Group, our cross-sector initiatives embody this integrated ethos — uniting essential everyday services into an empowering national economic flywheel.`}
                  </p>

                  <p className={styles.articleText}>
                    As technological decentralization deepens, the convergence of clean microgrids, transparent proptech title records, and modular skill certifications ensures that prosperity is broadly distributed across tier-2, tier-3, and rural growth clusters.
                  </p>

                  <blockquote className={styles.pullQuote}>
                    &ldquo;Nation building is not measured solely by physical assets created, but by the generational opportunities unlocked for every citizen.&rdquo;
                  </blockquote>

                  <p className={styles.articleText}>
                    Our ongoing research and cross-platform rollouts will continue to be documented in this Journal. To participate in strategic working groups or inquire about collaborative research, contact our editorial team at editorial@swarnbharatgroup.com.
                  </p>

                  {/* Author Bio Card */}
                  <div className={styles.authorBioCard}>
                    <div className={styles.authorBioAvatar}>
                      {selectedArticle.author?.split(' ').map(n => n[0]).join('') || 'SB'}
                    </div>
                    <div>
                      <strong>{selectedArticle.author}</strong>
                      <span>{selectedArticle.authorRole}</span>
                      <p>Senior contributing Fellow at Swarn Bharat Group. Specializes in macro-infrastructure financing and energy transition policy.</p>
                    </div>
                  </div>

                  <div className={styles.readerActionBottom}>
                    <button 
                      type="button" 
                      onClick={() => setSelectedArticle(null)}
                      className={styles.finishReadingBtn}
                    >
                      Finished Reading &times;
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
