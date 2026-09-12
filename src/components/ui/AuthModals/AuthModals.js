"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./AuthModals.module.css";
import { useAuth } from "@/context/AuthContext";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

const panelCopy = {
  login: {
    t: "Welcome back to Swarn Bharat.",
    s: "Sign in to manage your profile, track services, and access all attached ecosystem platforms.",
  },
  reg_identifier: {
    t: "Every profile strengthens the network.",
    s: "Register with your mobile number or email to unlock the Swarn Bharat national portal.",
  },
  reg_otp: {
    t: "Verified and secure access.",
    s: "A quick 6-digit verification code keeps every account tied to a verified contact method.",
  },
  reg_details: {
    t: "Personalize your member presence.",
    s: "Your profile details help connect you with relevant programmes, rewards, and local initiatives.",
  },
  reg_password: {
    t: "Built on enterprise security.",
    s: "Your credentials are encrypted end to end, in line with modern security standards.",
  },
  reg_success: {
    t: "Welcome to Swarn Bharat.",
    s: "Your registration is complete. You can now sign in to explore your dashboard and benefits.",
  },
};

export function AuthModal({ isOpen = true, onClose, initialView = "login", isPage = false }) {
  const router = useRouter();
  const [view, setView] = useState(
    initialView === "personal" || initialView === "register" ? "reg_identifier" : initialView
  );
  const [isLoading, setIsLoading] = useState(false);
  const { login, registerNewAccount, findAccount } = useAuth();
  const [createdAccount, setCreatedAccount] = useState(null);

  // ================= 1. LOGIN STATE =================
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginIdentifierErr, setLoginIdentifierErr] = useState("");
  const [loginPassErr, setLoginPassErr] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // ================= 2. REGISTRATION STATE =================
  // Step 1: Identifier
  const [regIdentifier, setRegIdentifier] = useState("");
  const [regIdentifierErr, setRegIdentifierErr] = useState("");
  const [identifierType, setIdentifierType] = useState("email"); // "email" | "mobile"

  // Step 2: OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpErr, setOtpErr] = useState("");
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = useRef([]);

  // Step 3: Personal Details
  const [fullName, setFullName] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");
  const [refCode, setRefCode] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const fileInputRef = useRef(null);

  // Step 4: Password Creation
  const [regPass, setRegPass] = useState("");
  const [regPass2, setRegPass2] = useState("");
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegPass2, setShowRegPass2] = useState(false);
  const [passErr, setPassErr] = useState("");

  // Sync initial view
  useEffect(() => {
    if (initialView === "personal" || initialView === "register") {
      setView("reg_identifier");
    } else {
      setView(initialView);
    }

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

  // Handle ESC key to close
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
    if (view === "reg_otp" && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [view, otpTimer]);

  if (!isOpen && !isPage) return null;

  // Validation Helpers
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const detectIdentifierType = (val) => {
    const cleaned = val.trim();
    if (emailRe.test(cleaned)) return "email";
    const digits = cleaned.replace(/\D/g, "");
    if (digits.length === 10) return "mobile";
    return null;
  };

  // Password Checklist Calculations
  const isLenOk = regPass.length >= 8;
  const isMixOk = /[A-Za-z]/.test(regPass) && /\d/.test(regPass);
  const isMatchOk = regPass.length > 0 && regPass === regPass2;
  const isPasswordValid = isLenOk && isMixOk && isMatchOk;

  // ================= ACTION HANDLERS =================

  // 1. Unified Login Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const cleanId = loginIdentifier.trim();

    if (!cleanId) {
      setLoginIdentifierErr("Please enter your mobile number or email.");
      valid = false;
    } else {
      const type = detectIdentifierType(cleanId);
      if (!type) {
        setLoginIdentifierErr("Please enter a valid 10-digit mobile number or email address.");
        valid = false;
      } else {
        setLoginIdentifierErr("");
      }
    }

    if (!loginPass) {
      setLoginPassErr("Password is required.");
      valid = false;
    } else {
      setLoginPassErr("");
    }

    if (!valid) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const matched = findAccount ? findAccount(cleanId) : null;
      let userToLogin;

      if (matched) {
        userToLogin = {
          ...matched,
        };
      } else {
        const isEmail = cleanId.includes("@");
        const displayName = isEmail
          ? cleanId.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ")
          : `Citizen ${cleanId.slice(-4)}`;

        userToLogin = {
          name: displayName,
          email: isEmail ? cleanId : `${cleanId}@user.swarnbharat.in`,
          phone: !isEmail ? cleanId.replace(/\D/g, "") : "",
          role: "Verified Citizen",
          swarnPoints: "1,000",
          tier: "Gold Citizen",
          joinDate: "September 2026",
          citizenId: `SB-CIT-${Math.floor(100000 + Math.random() * 900000)}`,
        };
      }

      login(userToLogin);
      if (onClose) onClose();
      if (isPage) router.push("/profile");
    }, 650);
  };

  // 2. Step 1: Registration Identifier Next
  const handleStep1Next = (e) => {
    if (e) e.preventDefault();
    const cleanId = regIdentifier.trim();

    if (!cleanId) {
      setRegIdentifierErr("Please enter your mobile number or email address.");
      return;
    }

    const detected = detectIdentifierType(cleanId);
    if (!detected) {
      setRegIdentifierErr("Enter a valid 10-digit mobile number or email address.");
      return;
    }

    setRegIdentifierErr("");
    setIdentifierType(detected);
    setOtpTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpErr("");
    setView("reg_otp");

    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
    }, 120);
  };

  // Google Sign-Up Trigger (Structured for future OAuth connection)
  const handleGoogleSignUp = () => {
    // Modular hook ready for Google OAuth integration
    alert("Google authentication UI ready for backend integration.");
  };

  // 3. Step 2: OTP Handlers
  const handleOtpChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanVal;
    setOtp(newOtp);
    if (otpErr) setOtpErr("");

    if (cleanVal && index < 5 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && otpInputRefs.current[index - 1]) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasteData) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasteData[i] || "";
      }
      setOtp(newOtp);
      const nextIdx = Math.min(pasteData.length, 5);
      if (otpInputRefs.current[nextIdx]) {
        otpInputRefs.current[nextIdx].focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    if (otp.some((d) => d === "")) {
      setOtpErr("Please enter the complete 6-digit OTP.");
      return;
    }

    setOtpErr("");
    setIsLoading(true);

    // Modular structure for POST /api/auth/verify-otp
    setTimeout(() => {
      setIsLoading(false);
      setView("reg_details");
    }, 500);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setOtpTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpErr("");
    if (otpInputRefs.current[0]) otpInputRefs.current[0].focus();
    // Modular trigger for POST /api/auth/send-otp
  };

  // 4. Step 3: User Details Next
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImagePreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImageFile(null);
    setProfileImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleStep3Next = () => {
    if (!fullName.trim() || fullName.trim().length < 2) {
      setFullNameErr("Please enter your full name (minimum 2 characters).");
      return;
    }
    setFullNameErr("");
    setView("reg_password");
  };

  // 5. Step 4: Password Creation & Final Account Submission
  const handleCreateAccount = () => {
    if (!isPasswordValid) {
      setPassErr("Please ensure all password requirements are met.");
      return;
    }

    setPassErr("");
    setIsLoading(true);

    const isEmail = identifierType === "email";
    const cleanId = regIdentifier.trim();
    const newAccount = {
      name: fullName.trim(),
      email: isEmail ? cleanId : "",
      phone: !isEmail ? cleanId.replace(/\D/g, "") : "",
      identifier: cleanId,
      password: regPass,
      referralCode: refCode.trim() || `SB-${fullName.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6) || "BHARAT"}2026`,
      profileImage: profileImagePreview || null,
      tier: "Gold Citizen",
      swarnPoints: "1,000",
      joinDate: "September 2026",
      role: "Verified Citizen",
    };

    const saved = registerNewAccount ? registerNewAccount(newAccount) : newAccount;
    setCreatedAccount(saved);

    setTimeout(() => {
      setIsLoading(false);
      setView("reg_success");
    }, 700);
  };

  // Format masked contact display
  const getMaskedContact = () => {
    const val = regIdentifier.trim();
    if (identifierType === "email") {
      const parts = val.split("@");
      if (parts.length === 2) {
        const name = parts[0];
        const masked = name.length > 2 ? `${name.slice(0, 2)}••••` : name;
        return `${masked}@${parts[1]}`;
      }
      return val;
    } else {
      const digits = val.replace(/\D/g, "");
      return `+91 ${digits.slice(0, 2)}••••••${digits.slice(-2)}`;
    }
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
            Enterprise Encrypted Authentication
          </div>
        </div>
      </div>

      {/* RIGHT / FORM STAGE */}
      <div className={styles.stage}>
        <div className={styles.stageInner}>
          
          {/* ======================================================== */}
          {/* 1. LOGIN VIEW                                            */}
          {/* ======================================================== */}
          {view === "login" && (
            <div className={styles.viewFade}>
              <div className={styles.stageHead}>
                <h2>Welcome Back</h2>
                <p>Sign in to access your Swarn Bharat account &amp; services.</p>
              </div>

              <form onSubmit={handleLoginSubmit} noValidate>
                {/* Single input for Mobile Number OR Email */}
                <div className={styles.field}>
                  <label htmlFor="li-identifier">Mobile Number or Email</label>
                  <div className={`${styles.inputWrap} ${loginIdentifierErr ? styles.err : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    <input
                      type="text"
                      id="li-identifier"
                      placeholder="Enter mobile number or email"
                      value={loginIdentifier}
                      onChange={(e) => {
                        setLoginIdentifier(e.target.value);
                        if (loginIdentifierErr) setLoginIdentifierErr("");
                      }}
                      autoComplete="username"
                    />
                  </div>
                  {loginIdentifierErr && <div className={styles.fieldError}>{loginIdentifierErr}</div>}
                </div>

                {/* Password input with show/hide toggle */}
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
                        if (loginPassErr) setLoginPassErr("");
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
                  {loginPassErr && <div className={styles.fieldError}>{loginPassErr}</div>}
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
                  <button
                    type="button"
                    className={styles.link}
                    onClick={() => alert("Password reset instructions will be sent to your registered contact.")}
                  >
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={isLoading}>
                  {isLoading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      Login
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <hr className={styles.divider} />
              <p className={styles.switchLine}>
                Don&apos;t have an account?{" "}
                <b onClick={() => setView("reg_identifier")}>Create Account</b>
              </p>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. CREATE ACCOUNT — STEP 1: MOBILE OR EMAIL + GOOGLE     */}
          {/* ======================================================== */}
          {view === "reg_identifier" && (
            <div className={styles.viewFade}>
              <div className={styles.stepper}>
                <div className={`${styles.stepSeg} ${styles.active}`}><i /></div>
                <div className={styles.stepSeg}><i /></div>
                <div className={styles.stepSeg}><i /></div>
                <div className={styles.stepSeg}><i /></div>
              </div>
              <div className={styles.stepMeta}>
                <span>Step 1 of 4</span>
                <span>Contact Info</span>
              </div>

              <div className={styles.stageHead}>
                <h2>Create Your Account</h2>
                <p>Enter your mobile number or email address to get started.</p>
              </div>

              <form onSubmit={handleStep1Next} noValidate>
                <div className={styles.field}>
                  <label htmlFor="rg-id">Mobile Number or Email</label>
                  <div className={`${styles.inputWrap} ${regIdentifierErr ? styles.err : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    <input
                      type="text"
                      id="rg-id"
                      placeholder="Enter mobile number or email"
                      value={regIdentifier}
                      onChange={(e) => {
                        setRegIdentifier(e.target.value);
                        if (regIdentifierErr) setRegIdentifierErr("");
                      }}
                      autoComplete="username"
                    />
                  </div>
                  {regIdentifierErr && <div className={styles.fieldError}>{regIdentifierErr}</div>}
                  <div className={styles.help}>We will send a 6-digit OTP to this contact method for verification.</div>
                </div>

                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  style={{ marginTop: "16px" }}
                >
                  Continue
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </form>

              <div className={styles.orDivider}>
                <span>OR</span>
              </div>

              {/* Alternative Sign-up with Google */}
              <button
                type="button"
                className={styles.btnGoogle}
                onClick={handleGoogleSignUp}
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>

              <hr className={styles.divider} />
              <p className={styles.switchLine}>
                Already have an account?{" "}
                <b onClick={() => setView("login")}>Sign in</b>
              </p>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. OTP VERIFICATION — STEP 2                             */}
          {/* ======================================================== */}
          {view === "reg_otp" && (
            <div className={styles.viewFade}>
              <div className={styles.stepper}>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.active}`}><i /></div>
                <div className={styles.stepSeg}><i /></div>
                <div className={styles.stepSeg}><i /></div>
              </div>
              <div className={styles.stepMeta}>
                <span>Step 2 of 4</span>
                <span>OTP Verification</span>
              </div>

              <div className={styles.stageHead}>
                <h2>Verify Your Account</h2>
                <p>
                  Enter the OTP sent to your{" "}
                  <strong>{identifierType === "email" ? "email address" : "mobile number"}</strong>.
                </p>
              </div>

              {/* Target contact pill with edit option */}
              <div className={styles.targetPill}>
                <div className={styles.targetPillText}>
                  {identifierType === "email" ? "✉️" : "📱"} {getMaskedContact()}
                </div>
                <button
                  type="button"
                  className={styles.editTargetBtn}
                  onClick={() => setView("reg_identifier")}
                  title="Change contact info"
                >
                  Edit
                </button>
              </div>

              <div className={styles.otpRow} onPaste={handleOtpPaste}>
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

              {otpErr && <div className={styles.fieldError} style={{ textAlign: "center", marginBottom: "12px" }}>{otpErr}</div>}

              <div className={styles.resend}>
                {canResend ? (
                  <>
                    Didn&apos;t get a code?{" "}
                    <b onClick={handleResendOtp}>
                      Resend OTP
                    </b>
                  </>
                ) : (
                  <>
                    Didn&apos;t get a code? Resend OTP in <b>{otpTimer}s</b>
                  </>
                )}
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => setView("reg_identifier")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  disabled={otp.some((d) => d === "") || isLoading}
                  onClick={handleVerifyOtp}
                >
                  {isLoading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      Verify OTP
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className={styles.switchLine} style={{ marginTop: "20px" }}>
                Already have an account? <b onClick={() => setView("login")}>Sign in</b>
              </p>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. USER DETAILS — STEP 3                                 */}
          {/* ======================================================== */}
          {view === "reg_details" && (
            <div className={styles.viewFade}>
              <div className={styles.stepper}>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.active}`}><i /></div>
                <div className={styles.stepSeg}><i /></div>
              </div>
              <div className={styles.stepMeta}>
                <span>Step 3 of 4</span>
                <span>Personal Details</span>
              </div>

              <div className={styles.stageHead}>
                <h2>Tell us who you are</h2>
                <p>This appears on your member profile and across our services.</p>
              </div>

              {/* 1. Full Name (Required) */}
              <div className={styles.field}>
                <label htmlFor="rg-name">
                  Full Name <span className={styles.req}>*</span>
                </label>
                <div className={`${styles.inputWrap} ${fullNameErr ? styles.err : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                  </svg>
                  <input
                    type="text"
                    id="rg-name"
                    placeholder="e.g. Rajesh Sharma"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (fullNameErr) setFullNameErr("");
                    }}
                  />
                </div>
                {fullNameErr && <div className={styles.fieldError}>{fullNameErr}</div>}
              </div>

              {/* 2. Referral Code (Optional) */}
              <div className={styles.field}>
                <label htmlFor="rg-ref">
                  Referral Code <span className={styles.opt}>Optional</span>
                </label>
                <div className={styles.inputWrap}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1.5 1.5" />
                    <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1.5-1.5" />
                  </svg>
                  <input
                    type="text"
                    id="rg-ref"
                    placeholder="e.g. SB-REF-2026"
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value.toUpperCase())}
                  />
                </div>
              </div>

              {/* 3. Profile Picture (Optional) */}
              <div className={styles.field}>
                <label>
                  Profile Picture <span className={styles.opt}>Optional</span>
                </label>

                {profileImagePreview ? (
                  <div className={styles.avatarPreviewBox}>
                    <img src={profileImagePreview} alt="Profile Preview" className={styles.avatarThumb} />
                    <div className={styles.avatarDetails}>
                      <div className={styles.avatarName}>
                        {profileImageFile ? profileImageFile.name : "Profile Photo Selected"}
                      </div>
                      <div className={styles.avatarActions}>
                        <label htmlFor="rg-file-change" className={`${styles.btnPhotoAction} ${styles.btnPhotoChange}`}>
                          Change photo
                        </label>
                        <input
                          type="file"
                          id="rg-file-change"
                          accept="image/png,image/jpeg,image/webp"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                        <button
                          type="button"
                          className={`${styles.btnPhotoAction} ${styles.btnPhotoRemove}`}
                          onClick={handleRemoveImage}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label className={styles.upload} htmlFor="rg-file">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
                      <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" />
                    </svg>
                    <div>
                      <strong>Click to upload photo</strong> — JPG, PNG or WebP, max 5MB
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="rg-file"
                      accept="image/png,image/jpeg,image/webp"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => setView("reg_otp")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={handleStep3Next}
                >
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

          {/* ======================================================== */}
          {/* 5. PASSWORD CREATION — STEP 4                            */}
          {/* ======================================================== */}
          {view === "reg_password" && (
            <div className={styles.viewFade}>
              <div className={styles.stepper}>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.done}`}><i /></div>
                <div className={`${styles.stepSeg} ${styles.active}`}><i /></div>
              </div>
              <div className={styles.stepMeta}>
                <span>Step 4 of 4</span>
                <span>Create Password</span>
              </div>

              <div className={styles.stageHead}>
                <h2>Create Your Password</h2>
                <p>Choose a secure password to protect your account.</p>
              </div>

              {/* 1. Password */}
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
                    onChange={(e) => {
                      setRegPass(e.target.value);
                      if (passErr) setPassErr("");
                    }}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.toggleEye}
                    onClick={() => setShowRegPass(!showRegPass)}
                    aria-label="Toggle password visibility"
                  >
                    {showRegPass ? (
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
              </div>

              {/* 2. Confirm Password */}
              <div className={styles.field}>
                <label htmlFor="rg-pass2">
                  Confirm Password <span className={styles.req}>*</span>
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
                    onChange={(e) => {
                      setRegPass2(e.target.value);
                      if (passErr) setPassErr("");
                    }}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.toggleEye}
                    onClick={() => setShowRegPass2(!showRegPass2)}
                    aria-label="Toggle password visibility"
                  >
                    {showRegPass2 ? (
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
              </div>

              {passErr && <div className={styles.fieldError} style={{ marginBottom: "12px" }}>{passErr}</div>}

              {/* Password Requirement Checklist */}
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
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost}`}
                  onClick={() => setView("reg_details")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={handleCreateAccount}
                  disabled={!isPasswordValid || isLoading}
                >
                  {isLoading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      Create Account
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 12l5 5L20 6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className={styles.switchLine} style={{ marginTop: "20px" }}>
                Already have an account? <b onClick={() => setView("login")}>Sign in</b>
              </p>
            </div>
          )}

          {/* ======================================================== */}
          {/* 6. REGISTRATION SUCCESS (Frontend Flow Complete)         */}
          {/* ======================================================== */}
          {view === "reg_success" && (
            <div className={`${styles.success} ${styles.viewFade}`}>
              <div className={styles.successRing}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </div>
              <h2>Account Created Successfully!</h2>
              <p>Welcome to Swarn Bharat Group. Your profile registration is complete.</p>

              <div className={styles.userSummaryCard}>
                {profileImagePreview && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", paddingBottom: "10px", borderBottom: "1px solid #e2e8f0" }}>
                    <img src={profileImagePreview} alt="Profile Preview" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #d4a748" }} />
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#0b1929" }}>{fullName || "Citizen"}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Profile Photo Configured</div>
                    </div>
                  </div>
                )}
                <div className={styles.userSummaryRow}>
                  <span>Full Name:</span>
                  <strong>{fullName || "Citizen"}</strong>
                </div>
                <div className={styles.userSummaryRow}>
                  <span>Contact:</span>
                  <strong>{regIdentifier}</strong>
                </div>
                {refCode && (
                  <div className={styles.userSummaryRow}>
                    <span>Referral Code:</span>
                    <strong>{refCode}</strong>
                  </div>
                )}
                <div className={styles.userSummaryRow}>
                  <span>Initial Rewards:</span>
                  <strong style={{ color: "#d4a748" }}>✦ 1,000 Welcome Points</strong>
                </div>
              </div>

              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                style={{ background: "linear-gradient(180deg, #D4A748, #B88E33)", color: "#0B1220", fontWeight: 700 }}
                onClick={() => {
                  if (createdAccount) {
                    login(createdAccount);
                  }
                  if (onClose) onClose();
                  if (isPage) router.push("/profile");
                }}
              >
                Go to Dashboard &amp; Profile &rarr;
              </button>

              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                style={{ marginTop: "10px" }}
                onClick={() => {
                  setLoginIdentifier(regIdentifier);
                  setView("login");
                }}
              >
                Sign In with Password
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
  return <AuthModal isOpen={isOpen} onClose={onClose} initialView="reg_identifier" />;
}
