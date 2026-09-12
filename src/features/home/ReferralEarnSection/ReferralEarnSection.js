"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, generateUserReferralCode } from "@/context/AuthContext";
import styles from "./ReferralEarnSection.module.css";

export default function ReferralEarnSection() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const isLoggedIn = !!user;
  const userReferralCode = user ? (user.referralCode || generateUserReferralCode(user)) : "SB-BHARAT2026";
  const userTier = user?.tier || "Gold Advocate";
  const shareLink = `https://swarnbharat.in/register?ref=${userReferralCode}`;

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareLink);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className={styles.referralSection} id="referralSection">
      <div className={styles.bgAmbientGlow}></div>
      <div className={styles.bgAmbientGlowLeft}></div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.sparkle}>✨</span> Swarn Bharat Citizen Network
          </div>
          <h2 className={styles.mainTitle}>
            Invite Friends. <span className={styles.goldGradientText}>Earn Unlimited</span> Swarn Coins.
          </h2>
          <p className={styles.subtitle}>
            Empower your network with India’s premier digital ecosystem. Give your friends 200 Welcome Coins and receive 250+ Swarn Coins in your central wallet for every successful referral.
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className={styles.stepsGrid}>
          {/* Step 1 */}
          <div className={styles.stepCard}>
            <div className={styles.stepTop}>
              <div className={styles.iconWrap}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <span className={styles.stepBadge}>Step 01</span>
            </div>
            <h3 className={styles.stepCardTitle}>Share Your Unique Link</h3>
            <p className={styles.stepCardDesc}>
              Log in to generate your unique referral code or link. Share it instantly via WhatsApp, social channels, or email with friends and colleagues.
            </p>
            <div className={styles.stepRewardHighlight}>
              <span>🔗 1-Click personalized share link</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className={styles.stepCard}>
            <div className={styles.stepTop}>
              <div className={styles.iconWrap}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span className={styles.stepBadge}>Step 02</span>
            </div>
            <h3 className={styles.stepCardTitle}>Friend Joins &amp; Explores</h3>
            <p className={styles.stepCardDesc}>
              Your friend signs up on Swarn Bharat and receives <strong>200 Swarn Coins</strong> instant welcome credit to spend across any platform.
            </p>
            <div className={styles.stepRewardHighlight}>
              <span>🎁 Friend gets 200 Welcome Bonus</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className={styles.stepCard}>
            <div className={styles.stepTop}>
              <div className={styles.iconWrap}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={styles.stepBadge}>Step 03</span>
            </div>
            <h3 className={styles.stepCardTitle}>Earn &amp; Redeem Universally</h3>
            <p className={styles.stepCardDesc}>
              You receive <strong>250 to 350 Swarn Coins</strong> directly into your central wallet. Redeem them for discounts on shopping, courses, property booking, and gifts.
            </p>
            <div className={styles.stepRewardHighlight}>
              <span>🪙 You earn 250+ Coins / Referral</span>
            </div>
          </div>
        </div>

        {/* Feature Showcase & Interactive Code Preview */}
        <div className={styles.showcaseCard}>
          <div className={styles.showcaseContent}>
            <h3>Why Swarn Bharat Referral is Different</h3>
            <p>
              Unlike traditional single-app rewards, Swarn Coins are centralized across all verticals. Your earned coins unlock immense purchasing power across India&apos;s fastest growing multi-platform ecosystem.
            </p>

            <div className={styles.perksList}>
              <div className={styles.perkItem}>
                <div className={styles.checkIcon}>✓</div>
                <span><strong>Universal Central Wallet:</strong> 1 Coin = 1 Point valid across E-Commerce, EdTech, Real Estate, and more.</span>
              </div>
              <div className={styles.perkItem}>
                <div className={styles.checkIcon}>✓</div>
                <span><strong>Ambassador Tier Multipliers:</strong> Climb from Bronze to Diamond to earn up to 350 Coins per friend.</span>
              </div>
              <div className={styles.perkItem}>
                <div className={styles.checkIcon}>✓</div>
                <span><strong>No Earning Caps:</strong> Refer 5, 50, or 500 friends — rewards are credited automatically in real time.</span>
              </div>
            </div>
          </div>

          {/* Share Box Mockup / Live Citizen Pass */}
          <div className={styles.shareSimBox}>
            <div className={styles.shareSimHeader}>
              <div className={styles.passTitleGroup}>
                <span className={styles.shareSimTitle}>Citizen Referral Pass</span>
                {isLoggedIn ? (
                  <span className={styles.passActivePill}>
                    <span className={styles.activeDot}></span> Active • {user.name}
                  </span>
                ) : (
                  <span className={styles.passLockedPill}>
                    🔒 Login Required
                  </span>
                )}
              </div>
              <span className={styles.coinPill}>🪙 250 Coins / Invite</span>
            </div>

            <div className={`${styles.codeBoxWrapper} ${!isLoggedIn ? styles.codeBoxLocked : ""}`}>
              {isLoggedIn ? (
                <>
                  <span className={styles.codeText}>{userReferralCode}</span>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={handleCopyCode}
                  >
                    {copied ? "✓ Copied!" : "Copy Link"}
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.blurredCodeWrap}>
                    <span className={styles.codeTextMasked}>SB-••••••••</span>
                    <span className={styles.codeLockHint}>Sign in to reveal unique code</span>
                  </div>
                  <Link href="/login" className={styles.unlockBtn}>
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Quick Share Buttons for Logged In User */}
            {isLoggedIn && (
              <div className={styles.quickShareRow}>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Join Swarn Bharat using my unique citizen invite code ${userReferralCode} and claim 200 Welcome Swarn Coins! ${shareLink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quickShareBtn}
                  style={{ background: "#25D366" }}
                >
                  WhatsApp
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(`Join Swarn Bharat with code ${userReferralCode} and get 200 Welcome Coins!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quickShareBtn}
                  style={{ background: "#0088cc" }}
                >
                  Telegram
                </a>
              </div>
            )}

            <div className={styles.simStatsGrid}>
              <div className={styles.simStatItem}>
                <span className={styles.simStatLabel}>Example: 10 Friends</span>
                <span className={styles.simStatVal}>🪙 2,500 Coins</span>
              </div>
              <div className={styles.simStatItem}>
                <span className={styles.simStatLabel}>Ambassador Tier</span>
                <span className={styles.simStatVal} style={{ color: "#d4a748" }}>{userTier}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className={styles.sectionFooter}>
          <Link href="/referral" className={styles.primaryCta}>
            <span>{isLoggedIn ? "Open Referral Dashboard" : "Explore How Referral Works"}</span>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          {!isLoggedIn ? (
            <Link href="/register" className={styles.secondaryCta}>
              <span>Join &amp; Get Invite Code</span>
            </Link>
          ) : (
            <Link href="/profile" className={styles.secondaryCta}>
              <span>Manage Citizen Identity</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

