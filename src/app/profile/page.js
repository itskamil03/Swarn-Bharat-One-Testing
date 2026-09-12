"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { useAuth } from "@/context/AuthContext";
import { generateUniquePassKey, registerPassKey, ATTACHED_PLATFORMS } from "@/data/passkeyService";
import styles from "./page.module.css";

// Crisp Authentic SVG QR Code Component
function SwarnCitizenQRCode({ citizenId }) {
  return (
    <div className={styles.cardQrBox}>
      <svg
        className={styles.qrSvg}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* White background */}
        <rect width="120" height="120" fill="#FFFFFF" rx="6" />

        {/* Top-Left Target Finder */}
        <rect x="10" y="10" width="30" height="30" rx="4" stroke="#0B1220" strokeWidth="4" fill="none" />
        <rect x="18" y="18" width="14" height="14" rx="2" fill="#D4A748" />

        {/* Top-Right Target Finder */}
        <rect x="80" y="10" width="30" height="30" rx="4" stroke="#0B1220" strokeWidth="4" fill="none" />
        <rect x="88" y="18" width="14" height="14" rx="2" fill="#D4A748" />

        {/* Bottom-Left Target Finder */}
        <rect x="10" y="80" width="30" height="30" rx="4" stroke="#0B1220" strokeWidth="4" fill="none" />
        <rect x="18" y="88" width="14" height="14" rx="2" fill="#D4A748" />

        {/* Dynamic Matrix Data Dots */}
        <g fill="#0F172A">
          <rect x="46" y="12" width="6" height="6" rx="1" />
          <rect x="58" y="12" width="6" height="6" rx="1" />
          <rect x="46" y="24" width="6" height="6" rx="1" />
          <rect x="66" y="24" width="6" height="6" rx="1" />
          <rect x="54" y="34" width="6" height="6" rx="1" />

          <rect x="12" y="46" width="6" height="6" rx="1" />
          <rect x="24" y="46" width="6" height="6" rx="1" />
          <rect x="36" y="46" width="6" height="6" rx="1" />
          <rect x="78" y="46" width="6" height="6" rx="1" />
          <rect x="90" y="46" width="6" height="6" rx="1" />
          <rect x="102" y="46" width="6" height="6" rx="1" />

          <rect x="12" y="58" width="6" height="6" rx="1" />
          <rect x="28" y="58" width="6" height="6" rx="1" />
          <rect x="84" y="58" width="6" height="6" rx="1" />
          <rect x="100" y="58" width="6" height="6" rx="1" />

          <rect x="12" y="68" width="6" height="6" rx="1" />
          <rect x="32" y="68" width="6" height="6" rx="1" />
          <rect x="76" y="68" width="6" height="6" rx="1" />
          <rect x="96" y="68" width="6" height="6" rx="1" />

          <rect x="46" y="80" width="6" height="6" rx="1" />
          <rect x="60" y="80" width="6" height="6" rx="1" />
          <rect x="46" y="92" width="6" height="6" rx="1" />
          <rect x="68" y="92" width="6" height="6" rx="1" />
          <rect x="82" y="92" width="6" height="6" rx="1" />
          <rect x="100" y="92" width="6" height="6" rx="1" />
          <rect x="54" y="102" width="6" height="6" rx="1" />
          <rect x="72" y="102" width="6" height="6" rx="1" />
          <rect x="90" y="102" width="6" height="6" rx="1" />
        </g>

        {/* Center Swarn Bharat Emblem Seal */}
        <circle cx="60" cy="60" r="13" fill="#FFFFFF" stroke="#D4A748" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="10" fill="#0B1220" />
        <text
          x="60"
          y="64"
          fill="#D4A748"
          fontSize="9"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          SB
        </text>
      </svg>
      <span className={styles.qrLabel}>SCAN PASS</span>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, login } = useAuth();

  // Active Tab State
  const [activeTab, setActiveTab] = useState("overview");

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);

  // Profile Form State (default fallback to demo user if not authenticated)
  const [profileData, setProfileData] = useState({
    name: "Amit Sharma",
    email: "amit.sharma@gmail.com",
    phone: "9876543210",
    citizenId: "SB-CIT-884920",
    passKey: "SBPASS-8849-3105-2026",
    tier: "Gold Citizen",
    tierMultiplier: "1.5x Multiplier",
    joinDate: "August 2024",
    location: "New Delhi, India",
    gender: "Male",
    dob: "1994-06-15",
    address: "42, Barakhamba Road, Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    pinCode: "110001",
    bio: "Entrepreneur & Citizen Investor actively leveraging Swarn Bharat ecosystem for smart commerce and community development.",
    swarnCoins: 24850,
    verificationStatus: "Verified Citizen",
    panStatus: "Verified",
    twoFactor: true,
  });

  // Dynamic user sync with AuthContext
  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        passKey: user.passKey || prev.passKey,
        citizenId: user.citizenId || prev.citizenId,
        tier: user.tier || prev.tier,
        profileImage: user.profileImage || prev.profileImage || null,
        referralCode: user.referralCode || prev.referralCode,
        joinDate: user.joinDate || prev.joinDate,
        swarnCoins: user.swarnPoints ? parseInt(String(user.swarnPoints).replace(/[^0-9]/g, "")) || 1000 : prev.swarnCoins,
      }));
    }
  }, [user]);

  // Daily Streak State
  const [streakClaimed, setStreakClaimed] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedPasskey, setCopiedPasskey] = useState(false);


  // Redeem Coins Simulator State
  const [redeemOption, setRedeemOption] = useState("ecommerce");
  const [redeemAmount, setRedeemAmount] = useState(2500);
  const [redeemSuccessCode, setRedeemSuccessCode] = useState(null);

  // Edit Profile Form Inputs
  const [editForm, setEditForm] = useState({ ...profileData });

  const handleCopyCitizenId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(profileData.citizenId);
    }
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyRefCode = () => {
    const code = `SB-${profileData.name.toUpperCase().replace(/\s+/g, "")}-2026`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://swarnbharat.in/register?ref=${code}`);
    }
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleCopyPasskey = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(profileData.passKey);
    }
    setCopiedPasskey(true);
    setTimeout(() => setCopiedPasskey(false), 2000);
  };

  const handleRegeneratePasskey = () => {
    const newKey = generateUniquePassKey("SBPASS");
    setProfileData((prev) => ({ ...prev, passKey: newKey }));
    registerPassKey(newKey, { ...profileData, passKey: newKey });
    if (login) {
      login({ ...user, passKey: newKey });
    }
    alert(`New Universal PassKey generated: ${newKey}\n\nThis PassKey is now activated across all attached platforms.`);
  };

  const handleClaimDaily = () => {
    if (streakClaimed) return;
    setStreakClaimed(true);
    setProfileData((prev) => ({
      ...prev,
      swarnCoins: prev.swarnCoins + 50,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({ ...editForm });
    if (login) {
      login({
        ...user,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
      });
    }
    setIsEditModalOpen(false);
  };

  const handleProcessRedeem = (e) => {
    e.preventDefault();
    if (profileData.swarnCoins < redeemAmount) {
      alert("Insufficient Swarn Points balance!");
      return;
    }
    const generatedCode = `SB-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${redeemAmount}`;
    setProfileData((prev) => ({
      ...prev,
      swarnCoins: prev.swarnCoins - redeemAmount,
    }));
    setRedeemSuccessCode(generatedCode);
  };

  const activities = [
    {
      id: 1,
      type: "career",
      title: "Job Application Submitted — Senior Cloud Architect",
      sector: "Careers & ATS",
      time: "Today, 02:45 PM",
      desc: "Application successfully submitted for Swarn Cloud Technologies. Status: Under Review.",
      coins: "+100 SP Milestone",
      isEarn: true,
      icon: "💼",
    },
    {
      id: 2,
      type: "ecommerce",
      title: "E-Commerce Order Delivered #SB-8921",
      sector: "Swarn E-Commerce",
      time: "Yesterday, 06:15 PM",
      desc: "Delivered: Smart Air Purifier & Heritage Khadi Jacket. Cashback credited.",
      coins: "+320 SP Cashback",
      isEarn: true,
      icon: "🛍️",
    },
    {
      id: 3,
      type: "realestate",
      title: "VIP Site Visit Pass Confirmed",
      sector: "Smart Real Estate",
      time: "07 Sep 2026",
      desc: "Confirmed scheduled private tour at Swarn Grand Aurum Residency, Tower C.",
      coins: "Visit Pass Active",
      isEarn: false,
      icon: "🏢",
    },
    {
      id: 4,
      type: "matrimonial",
      title: "New Verified Match Request Received",
      sector: "Matrimonial",
      time: "05 Sep 2026",
      desc: "Profile match request from Delhi NCR (Verified Member ID #MTM-4401).",
      coins: "Match Active",
      isEarn: false,
      icon: "💍",
    },
    {
      id: 5,
      type: "foundation",
      title: "CSR Tree Plantation Contribution",
      sector: "Swarn Foundation",
      time: "01 Sep 2026",
      desc: "Sponsored 5 teak saplings in Bundelkhand Green Corridor. E-Certificate issued.",
      coins: "+500 Impact SP",
      isEarn: true,
      icon: "🌱",
    },
  ];

  const initials = profileData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Navbar />

      <main className={styles.profilePage}>
        
        {/* ================= 1. TOP EXECUTIVE HERO BANNER ================= */}
        <section className={styles.heroHeaderSection}>
          <div className={styles.heroGlowTop} />
          <div className={styles.heroGlowLeft} />

          <div className={styles.container}>
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <span className={styles.breadcrumbActive}>Citizen Account &amp; Dashboard</span>
            </div>

            {/* Profile Hero Card */}
            <div className={styles.profileHeroCard}>
              <div className={styles.heroMainGrid}>
                
                {/* Avatar Section */}
                <div className={styles.avatarSection}>
                  <div className={styles.avatarWrapper}>
                    {profileData.profileImage ? (
                      <img
                        src={profileData.profileImage}
                        alt={profileData.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className={styles.avatarEditBadge}
                    onClick={() => {
                      setEditForm({ ...profileData });
                      setIsEditModalOpen(true);
                    }}
                    title="Edit Profile"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </div>

                {/* Citizen Information & Badges */}
                <div className={styles.profileDetailsCol}>
                  <div className={styles.nameRow}>
                    <h1 className={styles.userName}>{profileData.name}</h1>
                    <span className={styles.tierBadge}>✦ {profileData.tier}</span>
                    <span className={styles.kycVerifiedBadge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Verified Citizen
                    </span>
                  </div>

                  <div className={styles.citizenMetaRow}>
                    <div className={styles.metaItem}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>Member since {profileData.joinDate}</span>
                    </div>

                    <div className={styles.metaItem}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{profileData.location}</span>
                    </div>

                    <div className={styles.metaItem}>
                      <span
                        className={styles.citizenIdPill}
                        onClick={handleCopyCitizenId}
                        title="Click to copy Citizen ID"
                      >
                        <span>ID: {profileData.citizenId}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.copyIcon}>
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        {copiedId && <span style={{ color: "#34D399", fontSize: "11px" }}>✓ Copied</span>}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.profileActionsCol}>
                  <button
                    type="button"
                    className={styles.btnPrimaryGold}
                    onClick={() => setIsIdCardModalOpen(true)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <circle cx="9" cy="10" r="2" />
                      <line x1="15" y1="8" x2="17" y2="8" />
                      <line x1="15" y1="12" x2="17" y2="12" />
                      <line x1="7" y1="16" x2="17" y2="16" />
                    </svg>
                    Digital Citizen Card
                  </button>

                  <button
                    type="button"
                    className={styles.btnSecondaryOutline}
                    onClick={() => {
                      setEditForm({ ...profileData });
                      setIsEditModalOpen(true);
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    Edit Information
                  </button>

                  <button
                    type="button"
                    className={styles.btnGhostDanger}
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    Sign Out
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. MAIN DASHBOARD CONTENT (LIGHT THEME) ================= */}
        <section className={styles.dashboardMainSection}>
          <div className={styles.container}>

            {/* Key Metrics Bar */}
            <div className={styles.metricsGrid}>
              {/* Swarn Coins */}
              <div className={`${styles.metricCard} ${styles.metricCardGold}`}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Central Swarn Wallet</span>
                  <div className={styles.metricIconCircle}>🪙</div>
                </div>
                <div>
                  <div className={styles.metricValRow}>
                    <span className={styles.metricNumber}>{profileData.swarnCoins.toLocaleString()}</span>
                    <span className={styles.metricUnit}>SP</span>
                  </div>
                  <div className={styles.metricSubtext}>
                    ≈ <strong>₹{(profileData.swarnCoins * 0.1).toFixed(0)} INR</strong> Purchasing Value
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.metricActionLink}
                  onClick={() => {
                    setRedeemSuccessCode(null);
                    setIsRedeemModalOpen(true);
                  }}
                >
                  Redeem Coins &rarr;
                </button>
              </div>

              {/* Verticals Engaged */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Ecosystem Reach</span>
                  <div className={styles.metricIconCircle}>🌐</div>
                </div>
                <div>
                  <div className={styles.metricValRow}>
                    <span className={styles.metricNumber}>6 of 9</span>
                    <span className={styles.metricUnit}>Sectors</span>
                  </div>
                  <div className={styles.metricSubtext}>
                    <span className={styles.metricPositive}>● Active</span> Commerce, Jobs, Realty
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.metricActionLink}
                  onClick={() => setActiveTab("services")}
                >
                  View Connected Services &rarr;
                </button>
              </div>

              {/* Referral Hub */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Referral Impact</span>
                  <div className={styles.metricIconCircle}>🤝</div>
                </div>
                <div>
                  <div className={styles.metricValRow}>
                    <span className={styles.metricNumber}>18</span>
                    <span className={styles.metricUnit}>Invited</span>
                  </div>
                  <div className={styles.metricSubtext}>
                    <span className={styles.metricPositive}>+4,500 SP</span> earned via network
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.metricActionLink}
                  onClick={() => setActiveTab("referral")}
                >
                  Open Refer &amp; Earn &rarr;
                </button>
              </div>

              {/* Security & Trust */}
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Identity &amp; Trust</span>
                  <div className={styles.metricIconCircle}>🛡️</div>
                </div>
                <div>
                  <div className={styles.metricValRow}>
                    <span className={styles.metricNumber}>100%</span>
                    <span className={styles.metricUnit}>Verified</span>
                  </div>
                  <div className={styles.metricSubtext}>
                    <span className={styles.metricPositive}>✓ Complete</span> Government ID &amp; 2FA
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.metricActionLink}
                  onClick={() => setActiveTab("security")}
                >
                  Security Center &rarr;
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className={styles.tabsNavWrapper}>
              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === "overview" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                <span>📊 Overview &amp; Activities</span>
              </button>

              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === "wallet" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("wallet")}
              >
                <span>🪙 Swarn Points &amp; Wallet</span>
                <span className={styles.tabBadge}>{profileData.swarnCoins.toLocaleString()} SP</span>
              </button>

              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === "services" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("services")}
              >
                <span>⚡ Connected Verticals</span>
              </button>

              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === "referral" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("referral")}
              >
                <span>🎁 Refer &amp; Earn Passport</span>
              </button>

              <button
                type="button"
                className={`${styles.tabBtn} ${activeTab === "security" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <span>⚙️ Personal Info &amp; Verification</span>
              </button>
            </div>

            {/* TAB 1: OVERVIEW & ACTIVITIES */}
            {activeTab === "overview" && (
              <div className={styles.overviewGrid}>
                
                {/* Left Column: Recent Activity Feed */}
                <div className={styles.cardBox}>
                  <div className={styles.cardBoxHeader}>
                    <h3 className={styles.cardBoxTitle}>
                      <span>⏱️</span> Recent Cross-Vertical Activities
                    </h3>
                    <button type="button" className={styles.cardBoxAction}>
                      Export History
                    </button>
                  </div>

                  <div className={styles.activityList}>
                    {activities.map((act) => (
                      <div key={act.id} className={styles.activityItem}>
                        <div className={styles.actIconBadge}>{act.icon}</div>
                        <div className={styles.actBody}>
                          <div className={styles.actTitleRow}>
                            <h4 className={styles.actTitle}>{act.title}</h4>
                            <span className={styles.actDate}>{act.time}</span>
                          </div>
                          <p className={styles.actDesc}>{act.desc}</p>
                          <div className={styles.actFooter}>
                            <span className={styles.actSectorPill}>{act.sector}</span>
                            <span className={act.isEarn ? styles.actCoinsEarned : styles.actCoinsSpent}>
                              {act.coins}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Digital Citizen Card with Live QR Code & Widgets */}
                <div className={styles.sideWidgetsCol}>
                  
                  {/* 1. DIGITAL CITIZEN CARD WITH LIVE QR CODE */}
                  <div className={styles.digitalCardContainer}>
                    <div className={styles.digitalCardHeader}>
                      <h3 className={styles.digitalCardTitle}>
                        <span>🪪</span> Digital Citizen Card
                      </h3>
                      <span className={styles.kycVerifiedBadge}>Official Pass</span>
                    </div>

                    <div className={styles.executiveCitizenCard}>
                      {/* Top Row: Brand & Chip */}
                      <div className={styles.cardTopRow}>
                        <div className={styles.cardBrandBadge}>
                          <span className={styles.cardEmblem}>SB</span>
                          <span className={styles.cardBrandText}>Swarn Bharat Passport</span>
                        </div>
                        <div className={styles.cardChipGraphic} />
                      </div>

                      {/* Middle Body: Avatar, Details & Live QR Code */}
                      <div className={styles.cardMainBody}>
                        <div className={styles.cardPhotoBox}>
                          {initials}
                        </div>

                        <div className={styles.cardInfoCol}>
                          <h4>{profileData.name}</h4>
                          <p className={styles.cardIdText}>ID: {profileData.citizenId}</p>
                          <span className={styles.cardTierPill}>✦ {profileData.tier}</span>
                        </div>

                        {/* Live QR Code */}
                        <SwarnCitizenQRCode citizenId={profileData.citizenId} />
                      </div>

                      {/* Bottom Row */}
                      <div className={styles.cardBottomStrip}>
                        <span>GOVERNANCE &amp; COMMERCE PASSPORT</span>
                        <span className={styles.cardLiveStatus}>
                          <span className={styles.cardLiveDot} /> ACTIVE PASS
                        </span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className={styles.cardActionBtnsRow}>
                      <button
                        type="button"
                        className={`${styles.btnCardAction} ${styles.btnDownloadCard}`}
                        onClick={() => alert(`Digital Citizen Passport for ${profileData.name} (${profileData.citizenId}) downloaded as PDF & PNG with scannable QR Code.`)}
                      >
                        📥 Download Card
                      </button>
                      <button
                        type="button"
                        className={`${styles.btnCardAction} ${styles.btnShareCard}`}
                        onClick={handleCopyCitizenId}
                      >
                        🔗 {copiedId ? "✓ ID Copied" : "Share Citizen ID"}
                      </button>
                    </div>
                  </div>

                  {/* 2. Daily Check-In Bonus */}
                  <div className={styles.streakCard}>
                    <div className={styles.streakInfo}>
                      <h4>Daily Citizen Check-In</h4>
                      <p>{streakClaimed ? "You claimed +50 SP for today!" : "Check in today to earn +50 Swarn Points"}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClaimDaily}
                      disabled={streakClaimed}
                      className={`${styles.streakBtn} ${streakClaimed ? styles.streakClaimed : ""}`}
                    >
                      {streakClaimed ? "✓ Claimed" : "Claim +50 SP"}
                    </button>
                  </div>

                  {/* 3. Vertical Launchpad */}
                  <div className={styles.cardBox}>
                    <div className={styles.cardBoxHeader}>
                      <h3 className={styles.cardBoxTitle}>
                        <span>🚀</span> Swarn Ecosystem Verticals
                      </h3>
                    </div>

                    <div className={styles.verticalsGrid}>
                      <Link href="/offers" className={styles.verticalItem}>
                        <span className={styles.verticalIcon}>🛍️</span>
                        <span className={styles.verticalTitle}>E-Commerce</span>
                        <span className={styles.verticalStatus}>Verified</span>
                      </Link>
                      <Link href="/careers" className={styles.verticalItem}>
                        <span className={styles.verticalIcon}>💼</span>
                        <span className={styles.verticalTitle}>Jobs &amp; ATS</span>
                        <span className={styles.verticalStatus}>1 Applied</span>
                      </Link>
                      <Link href="/#businesses" className={styles.verticalItem}>
                        <span className={styles.verticalIcon}>💍</span>
                        <span className={styles.verticalTitle}>Matrimonial</span>
                        <span className={styles.verticalStatus}>Active</span>
                      </Link>
                      <Link href="/#businesses" className={styles.verticalItem}>
                        <span className={styles.verticalIcon}>🏢</span>
                        <span className={styles.verticalTitle}>Real Estate</span>
                        <span className={styles.verticalStatus}>Pass Ready</span>
                      </Link>
                      <Link href="/#businesses" className={styles.verticalItem}>
                        <span className={styles.verticalIcon}>🎓</span>
                        <span className={styles.verticalTitle}>Students</span>
                        <span className={styles.verticalStatus}>Enrolled</span>
                      </Link>
                      <Link href="/rewards" className={styles.verticalItem}>
                        <span className={styles.verticalIcon}>🪙</span>
                        <span className={styles.verticalTitle}>Rewards Hub</span>
                        <span className={styles.verticalStatus}>Gold Tier</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: SWARN POINTS & WALLET */}
            {activeTab === "wallet" && (
              <div>
                <div className={styles.walletHeroCard}>
                  <div className={styles.walletBalanceBlock}>
                    <h2>Unified Citizen Wallet</h2>
                    <div className={styles.walletBigAmount}>
                      {profileData.swarnCoins.toLocaleString()} <span>SP</span>
                    </div>
                    <div className={styles.walletRupeeEquivalent}>
                      Estimated Direct Purchasing Power: <strong>₹{(profileData.swarnCoins * 0.1).toFixed(2)} INR</strong>
                    </div>
                    <div className={styles.walletActionRow}>
                      <button
                        type="button"
                        className={styles.btnPrimaryGold}
                        onClick={() => {
                          setRedeemSuccessCode(null);
                          setIsRedeemModalOpen(true);
                        }}
                      >
                        Redeem Swarn Points
                      </button>
                      <Link href="/rewards" className={styles.btnSecondaryOutline}>
                        Explore Catalog
                      </Link>
                    </div>
                  </div>

                  <div className={styles.walletStatsBreakdown}>
                    <div className={styles.statMiniItem}>
                      <span className={styles.statMiniLabel}>Lifetime Earned</span>
                      <span className={styles.statMiniVal}>68,200 SP</span>
                    </div>
                    <div className={styles.statMiniItem}>
                      <span className={styles.statMiniLabel}>Total Redeemed</span>
                      <span className={styles.statMiniVal}>43,350 SP</span>
                    </div>
                    <div className={styles.statMiniItem}>
                      <span className={styles.statMiniLabel}>Tier Multiplier</span>
                      <span className={styles.statMiniVal} style={{ color: "#D3AE5C" }}>1.5x Multiplier</span>
                    </div>
                    <div className={styles.statMiniItem}>
                      <span className={styles.statMiniLabel}>Next Tier Goal</span>
                      <span className={styles.statMiniVal} style={{ color: "#34D399" }}>Platinum Elite</span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardBox}>
                  <div className={styles.cardBoxHeader}>
                    <h3 className={styles.cardBoxTitle}>
                      <span>📜</span> Swarn Points Transaction Ledger
                    </h3>
                    <button
                      type="button"
                      onClick={() => alert("Statement generated and dispatched to your email address.")}
                      className={styles.cardBoxAction}
                    >
                      Download Statement (PDF) &rarr;
                    </button>
                  </div>

                  <div className={styles.ledgerTableWrapper}>
                    <table className={styles.ledgerTable}>
                      <thead>
                        <tr>
                          <th>Transaction ID</th>
                          <th>Platform / Sector</th>
                          <th>Description</th>
                          <th>Date &amp; Time</th>
                          <th>Movement</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#TXN-99482</td>
                          <td>Community Referral</td>
                          <td>Referral Bonus — Suresh K. joined</td>
                          <td>09 Sep 2026, 11:24 AM</td>
                          <td style={{ color: "#059669", fontWeight: 700 }}>+500 SP</td>
                          <td><span className={styles.serviceStatusPill + " " + styles.pillActive}>Settled</span></td>
                        </tr>
                        <tr>
                          <td>#TXN-99310</td>
                          <td>E-Commerce Store</td>
                          <td>Cashback on electronics cart #SB-8921</td>
                          <td>08 Sep 2026, 04:15 PM</td>
                          <td style={{ color: "#059669", fontWeight: 700 }}>+320 SP</td>
                          <td><span className={styles.serviceStatusPill + " " + styles.pillActive}>Settled</span></td>
                        </tr>
                        <tr>
                          <td>#TXN-98845</td>
                          <td>Travel Partner</td>
                          <td>Domestic Flight Booking Discount Voucher</td>
                          <td>04 Sep 2026, 09:30 AM</td>
                          <td style={{ color: "#DC2626", fontWeight: 700 }}>−500 SP</td>
                          <td><span className={styles.serviceStatusPill + " " + styles.pillActive}>Redeemed</span></td>
                        </tr>
                        <tr>
                          <td>#TXN-98102</td>
                          <td>Identity Central</td>
                          <td>KYC 100% Verification Milestone Bonus</td>
                          <td>01 Sep 2026, 02:10 PM</td>
                          <td style={{ color: "#059669", fontWeight: 700 }}>+250 SP</td>
                          <td><span className={styles.serviceStatusPill + " " + styles.pillActive}>Settled</span></td>
                        </tr>
                        <tr>
                          <td>#TXN-97540</td>
                          <td>Matrimonial Network</td>
                          <td>3-Month Platinum Matchmaking Pass</td>
                          <td>22 Aug 2026, 08:45 PM</td>
                          <td style={{ color: "#DC2626", fontWeight: 700 }}>−1,200 SP</td>
                          <td><span className={styles.serviceStatusPill + " " + styles.pillActive}>Redeemed</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CONNECTED VERTICALS & UNIVERSAL PASSKEY HUB */}
            {activeTab === "services" && (
              <div>
                {/* 1. UNIVERSAL PASSKEY MANAGER */}
                <div className={styles.passkeyManagerCard}>
                  <div className={styles.passkeyCardGlow} />
                  <div className={styles.passkeyTopMeta}>
                    <div>
                      <h3 className={styles.passkeyTitle}>
                        <span>🔑</span> Universal Ecosystem PassKey
                      </h3>
                      <p style={{ color: "#94A3B8", fontSize: "13px", margin: "4px 0 0 0" }}>
                        One key for passwordless &amp; OTP-free login across all attached Swarn Bharat platforms.
                      </p>
                    </div>
                    <span className={styles.passkeyStatusBadge}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34D399" }}></span>
                      Ecosystem Synced &bull; 6 Attached Platforms
                    </span>
                  </div>

                  <div className={styles.passkeyDisplayRow}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                        Your Active PassKey
                      </div>
                      <div className={styles.passkeyValue}>{profileData.passKey}</div>
                    </div>
                    <div className={styles.passkeyActionsRow}>
                      <button
                        type="button"
                        className={styles.btnCopyPasskeyGold}
                        onClick={handleCopyPasskey}
                      >
                        {copiedPasskey ? "✓ Copied!" : "📋 Copy PassKey"}
                      </button>
                      <button
                        type="button"
                        className={styles.btnRegenPasskey}
                        onClick={handleRegeneratePasskey}
                      >
                        🔄 Re-issue Key
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: "12px", color: "#CBD5E1", background: "rgba(255,255,255,0.06)", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    💡 <strong>How it works:</strong> Whenever you open Swarn E-Commerce, Real Estate, Foundation, Matrimonial or Careers, select <em>"Sign in with PassKey"</em> and paste this key. You will be authenticated immediately without entering passwords or receiving mobile OTPs.
                  </div>
                </div>

                {/* 2. ATTACHED PLATFORMS GRID */}
                <div className={styles.cardBox} style={{ marginBottom: "24px" }}>
                  <div className={styles.cardBoxHeader}>
                    <h3 className={styles.cardBoxTitle}>
                      <span>🌐</span> Attached Ecosystem Platforms
                    </h3>
                    <span style={{ fontSize: "12px", color: "#059669", fontWeight: 700 }}>
                      ✓ All 6 Connected with 1-Click PassKey
                    </span>
                  </div>

                  <div className={styles.attachedGrid}>
                    {ATTACHED_PLATFORMS.map((platform) => (
                      <Link
                        key={platform.id}
                        href={platform.url}
                        className={styles.attachedCard}
                        target={platform.url.startsWith("http") ? "_blank" : undefined}
                        rel={platform.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        <div>
                          <div className={styles.attachedHead}>
                            <span className={styles.attachedIconBadge}>{platform.icon}</span>
                            <span className={styles.attachedStatusPill}>✓ {platform.badge}</span>
                          </div>
                          <h4 className={styles.attachedTitle}>{platform.name}</h4>
                          <p className={styles.attachedDesc}>{platform.description}</p>
                        </div>
                        <div className={styles.attachedLaunchBtn}>
                          Launch Platform with PassKey &rarr;
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 3. ORIGINAL VERTICAL ACTIVITIES */}
                <div className={styles.servicesGrid}>
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceCardHead}>
                      <div className={styles.serviceTitleBadge}>
                        <span className={styles.serviceIcon}>💼</span>
                        <h3>Careers &amp; Job Applications</h3>
                      </div>
                      <span className={`${styles.serviceStatusPill} ${styles.pillActive}`}>1 Active</span>
                    </div>

                    <div className={styles.serviceItemList}>
                      <div className={styles.serviceItemRow}>
                        <div className={styles.serviceItemInfo}>
                          <h5>Senior Cloud Architect</h5>
                          <p>Swarn Cloud Technologies • Applied 09 Sep 2026</p>
                        </div>
                        <span className={styles.serviceItemAction} style={{ color: "#059669" }}>Under Review</span>
                      </div>
                      <div className={styles.serviceItemRow}>
                        <div className={styles.serviceItemInfo}>
                          <h5>Lead Solutions Engineer</h5>
                          <p>Swarn Digital Infrastructure • Saved</p>
                        </div>
                        <Link href="/careers" className={styles.serviceItemAction}>Apply Now &rarr;</Link>
                      </div>
                    </div>
                  </div>

                  <div className={styles.serviceCard}>
                    <div className={styles.serviceCardHead}>
                      <div className={styles.serviceTitleBadge}>
                        <span className={styles.serviceIcon}>💍</span>
                        <h3>Swarn Matrimonial Profile</h3>
                      </div>
                      <span className={`${styles.serviceStatusPill} ${styles.pillActive}`}>Active &amp; Verified</span>
                    </div>

                    <div className={styles.serviceItemList}>
                      <div className={styles.serviceItemRow}>
                        <div className={styles.serviceItemInfo}>
                          <h5>Profile ID #MTM-88921</h5>
                          <p>Gold Spotlight Pass • 12 Matches Available</p>
                        </div>
                        <Link href="/#businesses" className={styles.serviceItemAction}>View Matches &rarr;</Link>
                      </div>
                    </div>
                  </div>

                  <div className={styles.serviceCard}>
                    <div className={styles.serviceCardHead}>
                      <div className={styles.serviceTitleBadge}>
                        <span className={styles.serviceIcon}>🏢</span>
                        <h3>Real Estate &amp; Site Visits</h3>
                      </div>
                      <span className={`${styles.serviceStatusPill} ${styles.pillActive}`}>Pass Active</span>
                    </div>

                    <div className={styles.serviceItemList}>
                      <div className={styles.serviceItemRow}>
                        <div className={styles.serviceItemInfo}>
                          <h5>Swarn Grand Aurum Residency</h5>
                          <p>Tower C, 3BHK Luxury Suite • Scheduled Site Visit</p>
                        </div>
                        <span className={styles.serviceItemAction} style={{ color: "#B3822A" }}>12 Sep 2026</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.serviceCard}>
                    <div className={styles.serviceCardHead}>
                      <div className={styles.serviceTitleBadge}>
                        <span className={styles.serviceIcon}>🎓</span>
                        <h3>Students Learning &amp; Upskilling</h3>
                      </div>
                      <span className={`${styles.serviceStatusPill} ${styles.pillActive}`}>Enrolled</span>
                    </div>

                    <div className={styles.serviceItemList}>
                      <div className={styles.serviceItemRow}>
                        <div className={styles.serviceItemInfo}>
                          <h5>Full-Stack Cloud &amp; AI Engineering</h5>
                          <p>Certificate Track • 78% Progress Completed</p>
                        </div>
                        <Link href="/#businesses" className={styles.serviceItemAction}>Resume &rarr;</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: REFER & EARN PASSPORT */}
            {activeTab === "referral" && (
              <div className={styles.referralHubGrid}>
                <div className={styles.cardBox}>
                  <div className={styles.cardBoxHeader}>
                    <h3 className={styles.cardBoxTitle}>
                      <span>🎁</span> Your Citizen Referral Passport
                    </h3>
                    <span className={styles.kycVerifiedBadge}>Gold Advocate Tier</span>
                  </div>

                  <p style={{ color: "#475467", fontSize: "14px", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                    Share the power of Swarn Bharat with your friends and colleagues. When they join, they receive <strong>200 Welcome Swarn Coins</strong> and you receive <strong>250 Swarn Coins</strong> instantly.
                  </p>

                  <div className={styles.referralCodeBox}>
                    <div>
                      <span style={{ fontSize: "11px", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>Your Personal Code</span>
                      <div className={styles.refCodeText}>SB-AMIT-2026</div>
                    </div>
                    <button type="button" className={styles.refCopyBtn} onClick={handleCopyRefCode}>
                      {copiedRef ? "✓ Copied Link!" : "Copy Invite Link"}
                    </button>
                  </div>

                  <div className={styles.shareSocialGrid}>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Join Swarn Bharat using my invite code SB-AMIT-2026 and get 200 Welcome Coins! https://swarnbharat.in/register?ref=SB-AMIT-2026")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialShareBtn}
                      style={{ background: "#25D366" }}
                    >
                      <span>💬 WhatsApp</span>
                    </a>
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent("https://swarnbharat.in/register?ref=SB-AMIT-2026")}&text=${encodeURIComponent("Join Swarn Bharat and get 200 Swarn Coins!")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialShareBtn}
                      style={{ background: "#0088CC" }}
                    >
                      <span>✈️ Telegram</span>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Join India's unified ecosystem Swarn Bharat! Use code SB-AMIT-2026 to get 200 bonus coins.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialShareBtn}
                      style={{ background: "#0F172A", border: "1px solid #CBD5E1" }}
                    >
                      <span>✖️ Share</span>
                    </a>
                  </div>
                </div>

                <div className={styles.cardBox}>
                  <div className={styles.cardBoxHeader}>
                    <h3 className={styles.cardBoxTitle}>
                      <span>🏆</span> Ambassador Milestone
                    </h3>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px" }}>
                      <span style={{ color: "#0F172A", fontWeight: 600 }}>Current: 18 Referrals</span>
                      <span style={{ color: "#B3822A", fontWeight: 700 }}>Target: 25 (Diamond)</span>
                    </div>
                    <div style={{ height: "10px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ width: "72%", height: "100%", background: "linear-gradient(90deg, #D4A748, #C99A3E)", borderRadius: "999px" }} />
                    </div>
                    <p style={{ fontSize: "12px", color: "#64748B", marginTop: "8px" }}>
                      Just 7 more invites needed to unlock <strong>Diamond Ambassador (350 SP / Invite)</strong>!
                    </p>
                  </div>

                  <div className={styles.serviceItemList}>
                    <div className={styles.serviceItemRow}>
                      <div className={styles.serviceItemInfo}>
                        <h5>Suresh K.</h5>
                        <p>Joined via Web • Phone Verified</p>
                      </div>
                      <span style={{ color: "#059669", fontWeight: 700, fontSize: "12px" }}>+250 SP</span>
                    </div>
                    <div className={styles.serviceItemRow}>
                      <div className={styles.serviceItemInfo}>
                        <h5>Priya Patel</h5>
                        <p>Joined via App • Phone Verified</p>
                      </div>
                      <span style={{ color: "#059669", fontWeight: 700, fontSize: "12px" }}>+250 SP</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PERSONAL DETAILS & VERIFICATION */}
            {activeTab === "security" && (
              <div className={styles.settingsGrid}>
                <div className={styles.cardBox}>
                  <div className={styles.cardBoxHeader}>
                    <h3 className={styles.cardBoxTitle}>
                      <span>👤</span> Personal Information
                    </h3>
                    <button
                      type="button"
                      className={styles.cardBoxAction}
                      onClick={() => {
                        setEditForm({ ...profileData });
                        setIsEditModalOpen(true);
                      }}
                    >
                      Edit Details
                    </button>
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <span className={styles.formLabel}>Full Legal Name</span>
                      <input type="text" readOnly value={profileData.name} className={styles.formInput} />
                    </div>

                    <div className={styles.formGroup}>
                      <span className={styles.formLabel}>Email Address</span>
                      <input type="email" readOnly value={profileData.email} className={styles.formInput} />
                    </div>

                    <div className={styles.formGroup}>
                      <span className={styles.formLabel}>Mobile Number</span>
                      <input type="text" readOnly value={`+91 ${profileData.phone}`} className={styles.formInput} />
                    </div>

                    <div className={styles.formGroup}>
                      <span className={styles.formLabel}>Gender / Date of Birth</span>
                      <input type="text" readOnly value={`${profileData.gender} • ${profileData.dob}`} className={styles.formInput} />
                    </div>

                    <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                      <span className={styles.formLabel}>Residential Address</span>
                      <input type="text" readOnly value={`${profileData.address}, ${profileData.city}, ${profileData.state} - ${profileData.pinCode}`} className={styles.formInput} />
                    </div>
                  </div>
                </div>

                <div className={styles.cardBox}>
                  <div className={styles.cardBoxHeader}>
                    <h3 className={styles.cardBoxTitle}>
                      <span>🛡️</span> Identity &amp; Verification Badges
                    </h3>
                  </div>

                  <div className={styles.kycBox}>
                    <div className={styles.kycInfo}>
                      <h4>Citizen Identity Status</h4>
                      <p>Official Conglomerate Identity Passport</p>
                    </div>
                    <span className={`${styles.serviceStatusPill} ${styles.pillActive}`}>✓ Verified Citizen</span>
                  </div>

                  <div className={styles.kycBox}>
                    <div className={styles.kycInfo}>
                      <h4>Tax Identification (PAN)</h4>
                      <p>ABCDE1234F • Verified Record</p>
                    </div>
                    <span className={`${styles.serviceStatusPill} ${styles.pillActive}`}>✓ Verified</span>
                  </div>

                  <div className={styles.kycBox}>
                    <div className={styles.kycInfo}>
                      <h4>Two-Factor Authentication (2FA)</h4>
                      <p>SMS &amp; Email OTP Shield</p>
                    </div>
                    <span className={`${styles.serviceStatusPill} ${styles.pillActive}`}>Active</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </main>

      {/* ================= MODAL 1: EDIT PROFILE ================= */}
      {isEditModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsEditModalOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Edit Profile Information</h3>
              <button type="button" className={styles.modalCloseBtn} onClick={() => setIsEditModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>City &amp; State</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label className={styles.formLabel}>Residential Address</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className={styles.formInput}
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                  <label className={styles.formLabel}>Personal Bio</label>
                  <textarea
                    rows={3}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className={styles.formInput}
                    style={{ resize: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "24px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className={styles.btnSecondaryOutline}
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.btnPrimaryGold}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: REDEEM COINS ================= */}
      {isRedeemModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsRedeemModalOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Redeem Swarn Points</h3>
              <button type="button" className={styles.modalCloseBtn} onClick={() => setIsRedeemModalOpen(false)}>✕</button>
            </div>

            {redeemSuccessCode ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
                <h4 style={{ fontSize: "20px", color: "#0F172A", margin: "0 0 8px 0" }}>Redemption Successful!</h4>
                <p style={{ color: "#64748B", fontSize: "14px", margin: "0 0 20px 0" }}>
                  Your digital voucher has been generated and dispatched to your registered SMS and email.
                </p>
                <div className={styles.referralCodeBox}>
                  <span style={{ fontSize: "12px", color: "#64748B" }}>VOUCHER CODE:</span>
                  <div className={styles.refCodeText}>{redeemSuccessCode}</div>
                </div>
                <button
                  type="button"
                  className={styles.btnPrimaryGold}
                  style={{ marginTop: "16px", width: "100%" }}
                  onClick={() => setIsRedeemModalOpen(false)}
                >
                  Done &amp; Return to Wallet
                </button>
              </div>
            ) : (
              <form onSubmit={handleProcessRedeem}>
                <div style={{ marginBottom: "20px" }}>
                  <label className={styles.formLabel}>Select Redemption Channel</label>
                  <select
                    value={redeemOption}
                    onChange={(e) => setRedeemOption(e.target.value)}
                    className={styles.formInput}
                    style={{ width: "100%", marginTop: "6px" }}
                  >
                    <option value="ecommerce">🛍️ Swarn E-Commerce ₹250 Cart Voucher (2,500 SP)</option>
                    <option value="travel">✈️ Domestic Flight Booking ₹500 Off (5,000 SP)</option>
                    <option value="matrimonial">💍 3-Month Matrimonial Platinum Pass (1,200 SP)</option>
                    <option value="realestate">🏢 Real Estate Legal Consultation Pass (800 SP)</option>
                    <option value="gold">🪙 24K Physical Gold Coin Discount (15,000 SP)</option>
                  </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label className={styles.formLabel}>Points to Redeem</label>
                  <input
                    type="number"
                    min="500"
                    max={profileData.swarnCoins}
                    step="100"
                    value={redeemAmount}
                    onChange={(e) => setRedeemAmount(Number(e.target.value))}
                    className={styles.formInput}
                    style={{ width: "100%", marginTop: "6px" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748B", marginTop: "6px" }}>
                    <span>Available Balance: {profileData.swarnCoins.toLocaleString()} SP</span>
                    <span style={{ color: "#059669", fontWeight: 700 }}>Worth ₹{(redeemAmount * 0.1).toFixed(0)} INR</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "24px", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    className={styles.btnSecondaryOutline}
                    onClick={() => setIsRedeemModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.btnPrimaryGold}>
                    Confirm &amp; Generate Voucher
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL 3: DIGITAL CITIZEN CARD ================= */}
      {isIdCardModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsIdCardModalOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Official Digital Citizen Passport</h3>
              <button type="button" className={styles.modalCloseBtn} onClick={() => setIsIdCardModalOpen(false)}>✕</button>
            </div>

            {/* Realistic Digital Citizen ID Card with Live QR */}
            <div className={styles.executiveCitizenCard}>
              <div className={styles.cardTopRow}>
                <div className={styles.cardBrandBadge}>
                  <span className={styles.cardEmblem}>SB</span>
                  <span className={styles.cardBrandText}>Swarn Bharat Citizen Passport</span>
                </div>
                <div className={styles.cardChipGraphic} />
              </div>

              <div className={styles.cardMainBody}>
                <div className={styles.cardPhotoBox}>
                  {initials}
                </div>
                <div className={styles.cardInfoCol}>
                  <h4>{profileData.name}</h4>
                  <p className={styles.cardIdText}>Citizen ID: {profileData.citizenId}</p>
                  <span className={styles.cardTierPill}>✦ {profileData.tier}</span>
                </div>
                <SwarnCitizenQRCode citizenId={profileData.citizenId} />
              </div>

              <div className={styles.cardBottomStrip}>
                <span>GOVERNANCE &amp; COMMERCE PASSPORT</span>
                <span className={styles.cardLiveStatus}>
                  <span className={styles.cardLiveDot} /> ACTIVE PASS
                </span>
              </div>
            </div>

            <button
              type="button"
              className={styles.btnPrimaryGold}
              style={{ width: "100%", marginTop: "18px" }}
              onClick={() => alert(`Digital Citizen Passport for ${profileData.name} (${profileData.citizenId}) downloaded as PDF & PNG with scannable QR Code.`)}
            >
              📥 Download Citizen Identity Card (PDF)
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
