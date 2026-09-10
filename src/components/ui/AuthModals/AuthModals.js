"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./AuthModals.module.css";
import { useAuth } from "@/context/AuthContext";

const panelCopy = {
  login: {
    t: "Empowering communities, one initiative at a time.",
    s: "Sign in to manage sectors, track programmes and coordinate reporting across every district we serve.",
  },
  personal: {
    t: "Every profile strengthens the network.",
    s: "Register as a citizen, community member, NGO or government agency to access the Swarn Bharat portal.",
  },
  contact: {
    t: "A direct line to every district office.",
    s: "Verified contact details keep programme updates, alerts and approvals reaching the right person.",
  },
  security: {
    t: "Built on a secure foundation.",
    s: "Your credentials are encrypted end to end, in line with the same standard used across government systems.",
  },
  otp: {
    t: "One last check, and you're in.",
    s: "Mobile verification keeps every account on the portal tied to a real, reachable person.",
  },
  success: {
    t: "Welcome to Swarn Bharat.",
    s: "Your account is active. Sign in any time to manage programmes, sectors and reporting.",
  },
};

export function AuthModal({ isOpen = true, onClose, initialView = "login", isPage = false }) {
  const router = useRouter();
  const [view, setView] = useState(initialView);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginEmailErr, setLoginEmailErr] = useState(false);
  const [loginPassErr, setLoginPassErr] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form State
  const [fullName, setFullName] = useState("");
  const [refCode, setRefCode] = useState("");
  const [profileImageName, setProfileImageName] = useState("");
  const [fullNameErr, setFullNameErr] = useState(false);

  const [regEmail, setRegEmail] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regEmailErr, setRegEmailErr] = useState(false);
  const [regMobileErr, setRegMobileErr] = useState(false);

  const [regPass, setRegPass] = useState("");
  const [regPass2, setRegPass2] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegPass2, setShowRegPass2] = useState(false);

  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = useRef([]);

  useEffect(() => {
    setView(initialView);
    if (!isPage) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialView, isPage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (onClose) onClose();
        else if (isPage) router.push("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isPage, router]);

  // OTP Timer Countdown
  useEffect(() => {
    let interval = null;
    if (view === "otp" && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [view, otpTimer]);

  if (!isOpen && !isPage) return null;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password Checklist Calculations
  const isLenOk = regPass.length >= 8;
  const isMixOk = /[A-Za-z]/.test(regPass) && /\d/.test(regPass);
  const isMatchOk = regPass.length > 0 && regPass === regPass2;
  const isSecurityValid = isLenOk && isMixOk && isMatchOk;

  // Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!emailRe.test(loginEmail.trim())) {
      setLoginEmailErr(true);
      valid = false;
    } else {
      setLoginEmailErr(false);
    }

    if (!loginPass) {
      setLoginPassErr(true);
      valid = false;
    } else {
      setLoginPassErr(false);
    }

    if (!valid) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({
        name: loginEmail.split("@")[0].replace(/[^a-zA-Z0-9]/g, " "),
        email: loginEmail,
        role: "Member",
        swarnPoints: "2,450",
      });
      if (onClose) onClose();
      if (isPage) router.push("/");
    }, 800);
  };

  const handlePersonalNext = () => {
    if (fullName.trim().length < 2) {
      setFullNameErr(true);
      return;
    }
    setFullNameErr(false);
    setView("contact");
  };

  const handleContactNext = () => {
    let valid = true;
    if (!emailRe.test(regEmail.trim())) {
      setRegEmailErr(true);
      valid = false;
    } else {
      setRegEmailErr(false);
    }

    if (!/^[6-9]\d{9}$/.test(regMobile.trim())) {
      setRegMobileErr(true);
      valid = false;
    } else {
      setRegMobileErr(false);
    }

    if (!valid) return;
    setView("security");
  };

  const handleSecurityNext = () => {
    if (!isSecurityValid) return;
    setOtpTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setView("otp");
    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
    }, 100);
  };

  const handleOtpChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanVal;
    setOtp(newOtp);

    if (cleanVal && index < 5 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && otpInputRefs.current[index - 1]) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleCreateAccount = () => {
    if (otp.some((digit) => digit === "")) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView("success");
    }, 800);
  };

  const handleSuccessSignIn = () => {
    login({
      name: fullName || regEmail.split("@")[0],
      email: regEmail,
      phone: regMobile,
      role: "Member",
      swarnPoints: "1,000",
    });
    if (onClose) onClose();
    if (isPage) router.push("/");
  };

  const currentCopy = panelCopy[view] || panelCopy.login;

  // Spokes for radial background graphic
  const spokes = [];
  for (let i = 0; i < 24; i++) {
    const a = (i * 15 * Math.PI) / 180;
    const x1 = 100 + Math.cos(a) * 48;
    const y1 = 100 + Math.sin(a) * 48;
    const x2 = 100 + Math.cos(a) * 92;
    const y2 = 100 + Math.sin(a) * 92;
    spokes.push(<line key={i} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} />);
  }

  const content = (
    <div className={styles.frame}>
      {!isPage && onClose && (
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* LEFT / BRAND PANEL */}
      <div className={styles.panel}>
        <div className={styles.motif} aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none">
            <g stroke="#7DAEDE" strokeWidth="0.6" opacity="0.8">
              <circle cx="100" cy="100" r="92" />
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="48" />
              <g>{spokes}</g>
            </g>
          </svg>
        </div>

        <div className={styles.mark}>
          <span className={styles.dot} />
          <span className={styles.markText}>SWARN BHARAT</span>
        </div>

        <div className={styles.panelCopy}>
          <h1>{currentCopy.t}</h1>
          <p>{currentCopy.s}</p>
        </div>

        <div>
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <b>1.4B+</b>
              <span>Citizens Envisioned</span>
            </div>
            <div className={styles.stat}>
              <b>50,000+</b>
              <span>Villages Empowered</span>
            </div>
            <div className={styles.stat}>
              <b>100%</b>
              <span>Governance Reach</span>
            </div>
          </div>
          <div className={styles.panelFoot}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2l7 3v6c0 5-3.4 8.4-7 11-3.6-2.6-7-6-7-11V5l7-3z" />
            </svg>
            256-bit secure TLS encryption
          </div>
        </div>
      </div>

      {/* RIGHT / FORM STAGE */}
      <div className={styles.stage}>
        <div className={styles.stageInner}>
          {/* ================= LOGIN VIEW ================= */}
          {view === "login" && (
            <div className={styles.viewFade}>
              <div className={styles.stageHead}>
                <h2>Sign in to your account</h2>
                <p>Access your Swarn Bharat member or administrative portal.</p>
              </div>

              <form onSubmit={handleLoginSubmit} noValidate>
                <div className={styles.field}>
                  <label htmlFor="li-email">Email address</label>
                  <div className={`${styles.inputWrap} ${loginEmailErr ? styles.err : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    <input
                      type="email"
                      id="li-email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        if (loginEmailErr) setLoginEmailErr(false);
                      }}
                      autoComplete="email"
                    />
                  </div>
                  {loginEmailErr && <div className={styles.fieldError}>Enter a valid email address.</div>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="li-pass">Password</label>
                  <div className={`${styles.inputWrap} ${loginPassErr ? styles.err : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="4" y="10" width="16" height="10" rx="2" />
                      <path d="M8 10V7a4 4 0 018 0v3" />
                    </svg>
                    <input
                      type={showLoginPass ? "text" : "password"}
                      id="li-pass"
                      placeholder="Enter your password"
                      value={loginPass}
                      onChange={(e) => {
                        setLoginPass(e.target.value);
                        if (loginPassErr) setLoginPassErr(false);
                      }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className={styles.toggleEye}
                      onClick={() => setShowLoginPass(!showLoginPass)}
                      aria-label="Toggle password visibility"
                    >
                      {showLoginPass ? (
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {loginPassErr && <div className={styles.fieldError}>Password is required.</div>}
                </div>

                <div className={styles.between}>
                  <label className={styles.chk}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <button type="button" className={styles.link} onClick={() => alert("Password reset link will be sent to your registered email.")}>
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={isLoading}>
                  {isLoading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      Sign in
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <hr className={styles.divider} />
              <p className={styles.switchLine}>
                Don't have an account yet?{" "}
                <b onClick={() => setView("personal")}>Create one</b>
              </p>
            </div>
          )}

          {/* ================= REGISTER: STEP 1 — PERSONAL ================= */}
          {view === "personal" && (
            <div className={styles.viewFade}>
              <div className={styles.stepper}>
                <div className={`${styles.stepSeg} ${styles.active}`}><i /></div>
                <div className={styles.stepSeg}><i /></div>
                <div className={styles.stepSeg}><i /></div>
                <div className={styles.stepSeg}><i /></div>
              </div>
              <div className={styles.stepMeta}>
                <span>Step 1 of 4</span>
                <span>Personal information</span>
              </div>

              <div className={styles.stageHead}>
                <h2>Tell us who you are</h2>
                <p>This appears on your member profile and any programme records tied to your account.</p>
              </div>

              <div className={styles.field}>
                <label htmlFor="rg-name">
                  Full name <span className={styles.req}>*</span>
                </label>
                <div className={`${styles.inputWrap} ${fullNameErr ? styles.err : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                  </svg>
                  <input
                    type="text"
                    id="rg-name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (fullNameErr) setFullNameErr(false);
                    }}
                  />
                </div>
                {fullNameErr && <div className={styles.fieldError}>Please enter your full name.</div>}
              </div>

              <div className={styles.field}>
                <label htmlFor="rg-ref">
                  Referral code <span className={styles.opt}>Optional</span>
                </label>
                <div className={styles.inputWrap}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1.5 1.5" />
                    <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1.5-1.5" />
                  </svg>
                  <input
                    type="text"
                    id="rg-ref"
                    placeholder="e.g. SB-DISTRICT-2026"
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label>
                  Profile image / logo <span className={styles.opt}>Optional</span>
                </label>
                <label className={styles.upload} htmlFor="rg-file">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
                    <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
                  </svg>
                  <div>
                    {profileImageName ? (
                      <strong style={{ color: "#2E7D5B" }}>{profileImageName}</strong>
                    ) : (
                      <>
                        <strong>Click to upload</strong> — JPG, PNG or WebP, max 5MB
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    id="rg-file"
                    accept="image/png,image/jpeg,image/webp"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProfileImageName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>

              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                style={{ marginTop: "12px" }}
                onClick={handlePersonalNext}
              >
                Continue
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>

              <p className={styles.switchLine} style={{ marginTop: "20px" }}>
                Already have an account? <b onClick={() => setView("login")}>Sign in</b>
              </p>
            </div>
          )}

          {/* ================= REGISTER: STEP 2 — CONTACT ================= */}
          {view === "contact" && (
            <div className={styles.viewFade}>
              <div className={styles.stepper}>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.active}`}><i /></div>
                <div className={styles.stepSeg}><i /></div>
                <div className={styles.stepSeg}><i /></div>
              </div>
              <div className={styles.stepMeta}>
                <span>Step 2 of 4</span>
                <span>Contact details</span>
              </div>

              <div className={styles.stageHead}>
                <h2>How can we reach you?</h2>
                <p>We'll use these to verify your account and send updates.</p>
              </div>

              <div className={styles.field}>
                <label htmlFor="rg-email">
                  Email address <span className={styles.req}>*</span>
                </label>
                <div className={`${styles.inputWrap} ${regEmailErr ? styles.err : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <input
                    type="email"
                    id="rg-email"
                    placeholder="name@domain.com"
                    value={regEmail}
                    onChange={(e) => {
                      setRegEmail(e.target.value);
                      if (regEmailErr) setRegEmailErr(false);
                    }}
                  />
                </div>
                {regEmailErr && <div className={styles.fieldError}>Enter a valid email address.</div>}
              </div>

              <div className={styles.field}>
                <label htmlFor="rg-mobile">
                  Mobile number <span className={styles.req}>*</span>
                </label>
                <div className={`${styles.inputWrap} ${regMobileErr ? styles.err : ""}`}>
                  <span className={styles.countryCode}>+91</span>
                  <input
                    type="tel"
                    id="rg-mobile"
                    placeholder="98765 43210"
                    maxLength={10}
                    inputMode="numeric"
                    value={regMobile}
                    onChange={(e) => {
                      setRegMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
                      if (regMobileErr) setRegMobileErr(false);
                    }}
                  />
                </div>
                {regMobileErr && <div className={styles.fieldError}>Enter a valid 10-digit mobile number.</div>}
                <div className={styles.help}>A 6-digit code will be sent to this number in step 4.</div>
              </div>

              <div className={styles.notice}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2l7 3v6c0 5-3.4 8.4-7 11-3.6-2.6-7-6-7-11V5l7-3z" />
                </svg>
                <span>Swarn Bharat stores your contact details securely and never shares them with commercial third parties.</span>
              </div>

              <div className={styles.btnRow}>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setView("personal")}>
                  Back
                </button>
                <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleContactNext}>
                  Continue
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>

              <p className={styles.switchLine} style={{ marginTop: "20px" }}>
                Already have an account? <b onClick={() => setView("login")}>Sign in</b>
              </p>
            </div>
          )}

          {/* ================= REGISTER: STEP 3 — SECURITY ================= */}
          {view === "security" && (
            <div className={styles.viewFade}>
              <div className={styles.stepper}>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.active}`}><i /></div>
                <div className={styles.stepSeg}><i /></div>
              </div>
              <div className={styles.stepMeta}>
                <span>Step 3 of 4</span>
                <span>Set a password</span>
              </div>

              <div className={styles.stageHead}>
                <h2>Secure your account</h2>
                <p>Use at least 8 characters, mixing letters and numbers.</p>
              </div>

              <div className={styles.field}>
                <label htmlFor="rg-pass">
                  Password <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 018 0v3" />
                  </svg>
                  <input
                    type={showRegPass ? "text" : "password"}
                    id="rg-pass"
                    placeholder="Create a password"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.toggleEye}
                    onClick={() => setShowRegPass(!showRegPass)}
                    aria-label="Toggle password visibility"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="rg-pass2">
                  Confirm password <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 018 0v3" />
                  </svg>
                  <input
                    type={showRegPass2 ? "text" : "password"}
                    id="rg-pass2"
                    placeholder="Re-enter your password"
                    value={regPass2}
                    onChange={(e) => setRegPass2(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.toggleEye}
                    onClick={() => setShowRegPass2(!showRegPass2)}
                    aria-label="Toggle password visibility"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.ruleBox}>
                <div className={`${styles.checkline} ${isLenOk ? styles.ok : ""}`}>
                  <span className={styles.cbox}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </span>
                  Minimum 8 characters length
                </div>
                <div className={`${styles.checkline} ${isMixOk ? styles.ok : ""}`}>
                  <span className={styles.cbox}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </span>
                  Contains both letters and numbers
                </div>
                <div className={`${styles.checkline} ${isMatchOk ? styles.ok : ""}`}>
                  <span className={styles.cbox}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </span>
                  Passwords match
                </div>
              </div>

              <div className={styles.btnRow}>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setView("contact")}>
                  Back
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={handleSecurityNext}
                  disabled={!isSecurityValid}
                >
                  Send OTP
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>

              <p className={styles.switchLine} style={{ marginTop: "20px" }}>
                Already have an account? <b onClick={() => setView("login")}>Sign in</b>
              </p>
            </div>
          )}

          {/* ================= REGISTER: STEP 4 — OTP ================= */}
          {view === "otp" && (
            <div className={styles.viewFade}>
              <div className={styles.stepper}>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.active}`}><i /></div>
              </div>
              <div className={styles.stepMeta}>
                <span>Step 4 of 4</span>
                <span>Verify mobile</span>
              </div>

              <div className={styles.stageHead}>
                <h2>Verify your mobile number</h2>
                <p>
                  Enter the 6-digit code sent to{" "}
                  <span>+91 {regMobile ? regMobile.replace(/(\d{2})\d{4}(\d{4})/, "$1••••$2") : "••••••••••"}</span>.
                </p>
              </div>

              <div className={styles.otpRow}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    className={styles.otpInput}
                    maxLength={1}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  />
                ))}
              </div>

              <div className={styles.resend}>
                {canResend ? (
                  <>
                    Didn't get a code?{" "}
                    <b
                      onClick={() => {
                        setOtpTimer(30);
                        setCanResend(false);
                        setOtp(["", "", "", "", "", ""]);
                        if (otpInputRefs.current[0]) otpInputRefs.current[0].focus();
                      }}
                    >
                      Resend OTP
                    </b>
                  </>
                ) : (
                  <>
                    Didn't get a code? Resend OTP in <b>{otpTimer}s</b>
                  </>
                )}
              </div>

              <div className={styles.whoBox}>
                Creating a user profile for <b>{fullName || "User"}</b>
              </div>

              <div className={styles.btnRow}>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setView("security")}>
                  Back
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={otp.some((d) => d === "") || isLoading}
                  onClick={handleCreateAccount}
                >
                  {isLoading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      Create account
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 12l5 5L20 6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ================= SUCCESS VIEW ================= */}
          {view === "success" && (
            <div className={`${styles.success} ${styles.viewFade}`}>
              <div className={styles.successRing}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </div>
              <h2>Account created</h2>
              <p>Your Swarn Bharat member profile is ready. You can sign in now to access your portal.</p>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSuccessSignIn}>
                Go to portal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isPage) {
    return (
      <div className={styles.standalonePage}>
        <Link href="/" className={styles.backHomeBtn}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        {content}
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.overlay} onClick={onClose} />
      {content}
    </div>
  );
}

export function LoginModal({ isOpen, onClose }) {
  return <AuthModal isOpen={isOpen} onClose={onClose} initialView="login" />;
}

export function RegisterModal({ isOpen, onClose }) {
  return <AuthModal isOpen={isOpen} onClose={onClose} initialView="personal" />;
}
