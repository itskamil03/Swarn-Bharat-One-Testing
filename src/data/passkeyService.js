// Universal PassKey Service for Swarn Bharat Ecosystem
// Handles passkey generation, registry storage, validation, and attached platform SSO routing.

const STORAGE_KEY_REGISTRY = "swarn_passkeys_registry";
const STORAGE_KEY_ACTIVE_PASSKEY = "swarn_active_passkey";

export const ATTACHED_PLATFORMS = [
  {
    id: "ecommerce",
    name: "Swarn E-Commerce",
    category: "Retail & Marketplace",
    icon: "🛍️",
    badge: "1-Click Active",
    url: "/offers",
    description: "Shop products, track orders, and redeem Swarn Points without logging in again.",
  },
  {
    id: "realestate",
    name: "Smart Real Estate",
    category: "Properties & Townships",
    icon: "🏢",
    badge: "1-Click Active",
    url: "/#businesses",
    description: "Book VIP site visits, view verified listings, and access investor portfolios.",
  },
  {
    id: "foundation",
    name: "Swarn Foundation",
    category: "Social Impact & CSR",
    icon: "🌱",
    badge: "1-Click Active",
    url: "http://187.52.122.33:3000",
    description: "Manage donations, track community impact programs, and access CSR certificates.",
  },
  {
    id: "matrimonial",
    name: "Swarn Matrimonial",
    category: "Family & Community",
    icon: "💍",
    badge: "1-Click Active",
    url: "/#businesses",
    description: "Browse verified member profiles and receive instant match notifications.",
  },
  {
    id: "careers",
    name: "Jobs & ATS Portal",
    category: "Careers & Hiring",
    icon: "💼",
    badge: "1-Click Active",
    url: "/careers",
    description: "Apply for roles with a pre-verified profile across all 9+ group verticals.",
  },
  {
    id: "rewards",
    name: "Swarn Rewards Hub",
    category: "Citizen Points Wallet",
    icon: "🪙",
    badge: "1-Click Active",
    url: "/rewards",
    description: "Universal loyalty currency redeemable across every attached business.",
  },
];

/**
 * Generate a unique, formatted PassKey.
 * Example format: SBPASS-8492-3105-2026
 */
export function generateUniquePassKey(prefix = "SBPASS") {
  const randBlock1 = Math.floor(1000 + Math.random() * 9000);
  const randBlock2 = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `${prefix}-${randBlock1}-${randBlock2}-${year}`;
}

/**
 * Retrieve all registered passkeys from local ecosystem registry.
 */
export function getPassKeyRegistry() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTRY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Failed to read passkey registry", e);
    return {};
  }
}

/**
 * Save a new passkey linked to user data in the registry.
 */
export function registerPassKey(passKey, userData) {
  if (typeof window === "undefined" || !passKey) return;
  try {
    const registry = getPassKeyRegistry();
    const cleanKey = passKey.trim().toUpperCase();
    
    registry[cleanKey] = {
      passKey: cleanKey,
      name: userData.name || "Swarn Citizen",
      email: userData.email || "",
      phone: userData.phone || "",
      role: userData.role || "Member",
      swarnPoints: userData.swarnPoints || "1,000",
      citizenId: userData.citizenId || `SB-CIT-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      attachedPlatforms: ATTACHED_PLATFORMS.map((p) => p.name),
    };

    localStorage.setItem(STORAGE_KEY_REGISTRY, JSON.stringify(registry));
    localStorage.setItem(STORAGE_KEY_ACTIVE_PASSKEY, cleanKey);
    return registry[cleanKey];
  } catch (e) {
    console.error("Failed to save passkey in registry", e);
    return null;
  }
}

/**
 * Validate and resolve user by PassKey.
 * Returns user profile if valid, or null.
 */
export function validatePassKey(passKey) {
  if (!passKey || typeof window === "undefined") return null;
  const cleanKey = passKey.trim().toUpperCase();
  const registry = getPassKeyRegistry();

  if (registry[cleanKey]) {
    return registry[cleanKey];
  }

  // Fallback demo matching for standard passkey format or default user
  if (cleanKey.startsWith("SBPASS-") || cleanKey.startsWith("FNDPASS-")) {
    const demoUser = {
      passKey: cleanKey,
      name: "Amit Sharma",
      email: "amit.sharma@swarnbharat.in",
      phone: "9876543210",
      role: "Verified Citizen",
      swarnPoints: "2,450",
      citizenId: "SB-CIT-884920",
      createdAt: new Date().toISOString(),
      attachedPlatforms: ATTACHED_PLATFORMS.map((p) => p.name),
    };
    // Auto-register so it persists
    registerPassKey(cleanKey, demoUser);
    return demoUser;
  }

  return null;
}

/**
 * Get active device passkey if saved.
 */
export function getSavedDevicePassKey() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY_ACTIVE_PASSKEY) || null;
}
