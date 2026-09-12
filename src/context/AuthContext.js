"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { validatePassKey, registerPassKey, getSavedDevicePassKey } from "@/data/passkeyService";

const AuthContext = createContext();

export function generateUserReferralCode(userData) {
  if (userData?.referralCode) return userData.referralCode;
  if (!userData) return "SB-BHARAT2026";

  const namePart = (userData.name || userData.email?.split("@")[0] || "CITIZEN")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6) || "BHARAT";

  const idPart = (userData.citizenId || userData.phone || "2026")
    .toString()
    .replace(/\D/g, "")
    .slice(-4) || "2026";

  return `SB-${namePart}${idPart}`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from local storage
    const savedUser = localStorage.getItem("swarn_bharat_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (!parsed.referralCode) {
          parsed.referralCode = generateUserReferralCode(parsed);
          parsed.tier = parsed.tier || "Gold Advocate";
          localStorage.setItem("swarn_bharat_user", JSON.stringify(parsed));
        }
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }, []);

  const getRegisteredAccounts = () => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("swarn_bharat_registered_accounts");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  };

  const registerNewAccount = (accountData) => {
    if (typeof window === "undefined") return accountData;
    try {
      const accounts = getRegisteredAccounts();
      const cleanIdentifier = (accountData.identifier || accountData.email || accountData.phone || "").trim().toLowerCase();
      const filtered = accounts.filter(
        (acc) =>
          acc.identifier?.toLowerCase() !== cleanIdentifier &&
          acc.email?.toLowerCase() !== cleanIdentifier &&
          (acc.phone && cleanIdentifier.length >= 10 && acc.phone.replace(/\D/g, "") !== cleanIdentifier.replace(/\D/g, ""))
      );

      const fullAccount = {
        id: accountData.id || `SB-CIT-${Math.floor(100000 + Math.random() * 900000)}`,
        citizenId: accountData.citizenId || `SB-CIT-${Math.floor(100000 + Math.random() * 900000)}`,
        name: accountData.name || "Citizen",
        email: accountData.email || "",
        phone: accountData.phone || "",
        identifier: accountData.identifier || accountData.email || accountData.phone,
        password: accountData.password || "",
        referralCode: accountData.referralCode || generateUserReferralCode(accountData),
        profileImage: accountData.profileImage || null,
        tier: accountData.tier || "Gold Citizen",
        swarnPoints: accountData.swarnPoints || "1,000",
        joinDate: accountData.joinDate || "September 2026",
        role: "Verified Citizen",
        bio: accountData.bio || "Swarn Bharat registered citizen member",
        location: accountData.location || "New Delhi, India",
      };

      filtered.push(fullAccount);
      localStorage.setItem("swarn_bharat_registered_accounts", JSON.stringify(filtered));
      return fullAccount;
    } catch (e) {
      console.error("Error saving registered account:", e);
      return accountData;
    }
  };

  const findAccount = (identifier) => {
    if (!identifier) return null;
    const clean = identifier.trim().toLowerCase();
    const digits = clean.replace(/\D/g, "");
    const accounts = getRegisteredAccounts();
    return accounts.find((acc) => {
      if (acc.identifier && acc.identifier.toLowerCase() === clean) return true;
      if (acc.email && acc.email.toLowerCase() === clean) return true;
      if (digits.length >= 10 && acc.phone && acc.phone.replace(/\D/g, "") === digits) return true;
      return false;
    });
  };

  const login = (userData) => {
    const updatedUser = {
      ...userData,
      referralCode: userData.referralCode || generateUserReferralCode(userData),
      tier: userData.tier || "Gold Citizen",
    };
    setUser(updatedUser);
    localStorage.setItem("swarn_bharat_user", JSON.stringify(updatedUser));
    if (updatedUser.passKey) {
      registerPassKey(updatedUser.passKey, updatedUser);
    }
  };

  const loginWithPassKey = (passKey) => {
    const verifiedUser = validatePassKey(passKey);
    if (verifiedUser) {
      const updatedUser = {
        ...verifiedUser,
        referralCode: verifiedUser.referralCode || generateUserReferralCode(verifiedUser),
        tier: verifiedUser.tier || "Gold Citizen",
      };
      setUser(updatedUser);
      localStorage.setItem("swarn_bharat_user", JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    }
    return { success: false, message: "Invalid or unrecognized PassKey. Please check and try again." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("swarn_bharat_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithPassKey, logout, getSavedDevicePassKey, generateUserReferralCode, registerNewAccount, findAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


