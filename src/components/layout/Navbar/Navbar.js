"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/homeData";
import { LoginModal, RegisterModal } from "@/components/ui/AuthModals/AuthModals";
import { useAuth } from "@/context/AuthContext";
import styles from "./Navbar.module.css";

const servicesMegaMenu = [
  {
    title: "Digital & Commerce",
    links: [
      { label: "Technology", desc: "Software, enterprise platforms & IT", href: "/#businesses" },
      { label: "E-Commerce", desc: "Nationwide shopping & brand store", href: "/offers" },
      { label: "Jobs", desc: "Opportunities across 9+ verticals", href: "/careers" },
    ]
  },
  {
    title: "Infrastructure & Living",
    links: [
      { label: "Real Estate", desc: "Townships & prime commercial spaces", href: "/#businesses" },
      { label: "Matrimonial", desc: "Trusted relationships & family bonds", href: "/#businesses" },
    ]
  },
  {
    title: "Education & Society",
    links: [
      { label: "Students Portal", desc: "Education & student accelerators", href: "/#businesses" },
      { label: "Foundation", desc: "Grassroots empowerment & healthcare", href: "http://187.52.122.33:3000", external: true },
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const profileDropdownRef = useRef(null);
  const appDropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (appDropdownRef.current && !appDropdownRef.current.contains(event.target)) {
        setIsAppModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Check if link is active
  const isActiveLink = (href) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href) && href.length > 1) return true;
    return false;
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
      {/* Top Utility Bar */}
      <div className={styles.topUtilityBar}>
        <div className={`container ${styles.utilityInner}`}>
          <div className={styles.utilityLeft}>
            <span className={styles.utilityItem}>
              <span className={styles.liveDot}></span>
              India's Premier Multi-Sector Conglomerate
            </span>
          </div>
          <div className={styles.utilityRight}>
            <a href="#app" className={styles.utilityLink} onClick={(e) => { e.preventDefault(); setIsAppModalOpen(!isAppModalOpen); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              App
            </a>
            <Link href="/news" className={styles.utilityLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8" />
                <path d="M15 18h-5" />
                <path d="M10 6h8v4h-8V6Z" />
              </svg>
              Newsroom
            </Link>
            <Link href="/events" className={styles.utilityLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Events
            </Link>
            <Link href="/blog" className={styles.utilityLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Insights
            </Link>
            <Link href="/contact" className={styles.utilityLink}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar Inner */}
      <div className={`container ${styles.inner}`}>
        {/* Brand Logo */}
        <div className={styles.brandWrapper}>
          <Link href="/" className={styles.brand} aria-label="Swarn Bharat Group home">
            <img src="/images/logoch.png" alt="Swarn Bharat Group" className={styles.brandLogo} />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Primary">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);

            if (link.label === "Businesses") {
              return (
                <div key={link.href} className={styles.navItemWrapper}>
                  <Link 
                    href={link.href} 
                    className={`${styles.navLink} ${styles.navLinkWithIcon} ${active ? styles.navLinkActive : ""}`}
                  >
                    <span>{link.label}</span>
                    <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" fill="currentColor" />
                    </svg>
                  </Link>

                  {/* Enhanced Mega Menu */}
                  <div className={styles.megaMenu}>
                    <div className={styles.megaMenuGrid}>
                      {servicesMegaMenu.map((col, colIndex) => (
                        <div key={colIndex} className={styles.megaMenuColumn}>
                          <div className={styles.megaMenuHeading}>
                            <span>{col.title}</span>
                          </div>
                          <div className={styles.megaLinkList}>
                            {col.links.map((subLink, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subLink.href}
                                className={styles.megaMenuCard}
                                target={subLink.external ? "_blank" : undefined}
                                rel={subLink.external ? "noopener noreferrer" : undefined}
                              >
                                <div className={styles.megaMenuCardText}>
                                  <span className={styles.megaMenuCardTitle}>{subLink.label}</span>
                                  <span className={styles.megaMenuCardDesc}>{subLink.desc}</span>
                                </div>
                                <span className={styles.megaMenuArrow}>→</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.megaMenuFooter}>
                      <div className={styles.megaFooterInfo}>
                        <strong>Swarn Bharat Ecosystem</strong>
                        <span>Serving 1.4B+ citizens across commerce, real estate, energy & tech.</span>
                      </div>
                      <Link href="/about" className={styles.megaFooterBtn}>
                        Explore All Verticals →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  <span>{link.label}</span>
                </a>
              );
            }

            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Auth Profile */}
        <div className={styles.rightActions}>
          {/* App Download Trigger Icon */}
          <div className={styles.appWrapper} ref={appDropdownRef}>
            <button
              className={`${styles.actionIcon} ${isAppModalOpen ? styles.actionIconActive : ""}`}
              aria-label="Download Swarn App"
              onClick={() => setIsAppModalOpen(!isAppModalOpen)}
              title="Download Swarn Mobile App"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            </button>

            {isAppModalOpen && (
              <div className={styles.appDropdown}>
                <div className={styles.appDropdownHead}>
                  <div className={styles.appIconBadge}>📱</div>
                  <div>
                    <h4>Swarn Bharat App</h4>
                    <p>E-commerce, Rewards & Services on the go</p>
                  </div>
                </div>
                <div className={styles.appBadgesRow}>
                  <div className={styles.appStoreBadge}>
                    <span className={styles.appStoreIcon}>🍎</span>
                    <div className={styles.appStoreText}>
                      <small>Download on the</small>
                      <strong>App Store</strong>
                    </div>
                  </div>
                  <div className={styles.appStoreBadge}>
                    <span className={styles.appStoreIcon}>▶</span>
                    <div className={styles.appStoreText}>
                      <small>GET IT ON</small>
                      <strong>Google Play</strong>
                    </div>
                  </div>
                </div>
                <div className={styles.appDropdownFooter}>
                  <span>Scan QR code to install</span>
                  <span className={styles.appRating}>★ 4.9 (50K+ Reviews)</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Search Toggle */}
          <div className={styles.searchWrapper}>
            <button 
              className={`${styles.actionIcon} ${isSearchOpen ? styles.actionIconActive : ""}`} 
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {isSearchOpen && (
              <div className={styles.searchDropdown}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search businesses, projects, careers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button 
                  className={styles.searchCloseBtn} 
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* User Account / Login Button */}
          <div className={styles.userMenuWrapper} ref={profileDropdownRef}>
            {user ? (
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
                className={styles.avatarBtn} 
                aria-label="User Profile"
                aria-haspopup="true"
                aria-expanded={isProfileDropdownOpen}
              >
                {(() => {
                  const n = user.name || user.email || "User";
                  const parts = n.trim().split(/[\s@._-]+/);
                  if (parts.length >= 2 && parts[0] && parts[1]) {
                    return (parts[0][0] + parts[1][0]).toUpperCase();
                  }
                  return n.slice(0, 2).toUpperCase();
                })()}
              </button>
            ) : (
              <Link 
                href="/login" 
                className={styles.authBtn}
              >
                <span>LOGIN & REGISTER</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            )}
            
            {user && (
              <div className={`${styles.menu} ${isProfileDropdownOpen ? styles.menuOpen : ''}`} role="menu">
                <div className={styles.menuHead}>
                  <div className={styles.menuAvatar}>
                    {(() => {
                      const n = user.name || user.email || "User";
                      const parts = n.trim().split(/[\s@._-]+/);
                      if (parts.length >= 2 && parts[0] && parts[1]) {
                        return (parts[0][0] + parts[1][0]).toUpperCase();
                      }
                      return n.slice(0, 2).toUpperCase();
                    })()}
                  </div>
                  <div>
                    <h3>Hello, {user.name || "User"}</h3>
                    <p>{user.email || (user.phone ? `+91 ${user.phone}` : "")}</p>
                  </div>
                </div>

                <Link href="/profile" className={styles.viewProfile} onClick={() => setIsProfileDropdownOpen(false)}>
                  View Profile
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </Link>

                <hr className={styles.menuDivider} />

                <div className={styles.menuList}>
                  <Link href="/profile" className={styles.menuItem} onClick={() => setIsProfileDropdownOpen(false)}>
                    <span className={styles.ic}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>
                      </svg>
                    </span>
                    <span className={styles.label}>My Profile</span>
                  </Link>

                  <Link href="/rewards" className={styles.menuItem} onClick={() => setIsProfileDropdownOpen(false)}>
                    <span className={styles.ic}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 3l2.7 5.9 6.3.6-4.8 4.3 1.4 6.2L12 16.9 6.4 20l1.4-6.2-4.8-4.3 6.3-.6z"/>
                      </svg>
                    </span>
                    <span className={styles.label}>My Swarn Rewards</span>
                    <span className={styles.pill}>
                      <span className={styles.coin}></span>
                      {user.swarnPoints || "1,000"} Pts
                    </span>
                  </Link>

                  <Link href="/orders" className={styles.menuItem} onClick={() => setIsProfileDropdownOpen(false)}>
                    <span className={styles.ic}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.4l2.2 11.4a2 2 0 002 1.6h8a2 2 0 002-1.7L21 8H6"/>
                      </svg>
                    </span>
                    <span className={styles.label}>My Orders & Bookings</span>
                  </Link>
                </div>

                <hr className={styles.menuDivider} />

                <div className={styles.logoutWrap}>
                  <button 
                    type="button"
                    onClick={() => { logout(); setIsProfileDropdownOpen(false); }} 
                    className={`${styles.menuItem} ${styles.danger}`}
                  >
                    <span className={styles.ic}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>
                      </svg>
                    </span>
                    <span className={styles.label}>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={styles.menuButton}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpenTop : ""}`} />
            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpenMid : ""}`} />
            <span className={`${styles.bar} ${isMenuOpen ? styles.barOpenBottom : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuBackdrop} onClick={() => setIsMenuOpen(false)}></div>
        <div className={styles.mobileMenuPanel}>
          <div className={styles.mobileMenuHead}>
            <img src="/images/logoch.png" alt="Swarn Bharat Group" className={styles.mobileLogo} />
            <button className={styles.mobileCloseBtn} onClick={() => setIsMenuOpen(false)}>✕</button>
          </div>

          <nav aria-label="Mobile" className={styles.mobileNav}>
            {navLinks.map((link, index) => {
              if (link.label === "Businesses") {
                return (
                  <div key={link.href} className={styles.mobileAccordionWrapper}>
                    <button
                      className={`${styles.mobileNavLink} ${styles.mobileAccordionHeader}`}
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      aria-expanded={isMobileServicesOpen}
                    >
                      <span>{link.label}</span>
                      <svg className={`${styles.mobileChevron} ${isMobileServicesOpen ? styles.mobileChevronOpen : ""}`} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" fill="currentColor" />
                      </svg>
                    </button>

                    <div className={`${styles.mobileAccordionContent} ${isMobileServicesOpen ? styles.mobileAccordionContentOpen : ""}`}>
                      <div className={styles.mobileAccordionContentInner}>
                        {servicesMegaMenu.map((column, colIndex) => (
                          <div key={colIndex} className={styles.mobileSubCategory}>
                            <div className={styles.mobileSubHeading}>{column.title}</div>
                            {column.links.map((subLink, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subLink.href}
                                className={styles.mobileSubLink}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <span>{subLink.label}</span>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className={styles.mobileUtilityLinks}>
              <a href="#app" className={styles.mobileUtilItem} onClick={(e) => { e.preventDefault(); setIsAppModalOpen(true); setIsMenuOpen(false); }}>📲 Swarn App</a>
              <Link href="/news" className={styles.mobileUtilItem} onClick={() => setIsMenuOpen(false)}>📰 Newsroom</Link>
              <Link href="/events" className={styles.mobileUtilItem} onClick={() => setIsMenuOpen(false)}>📅 Events</Link>
              <Link href="/blog" className={styles.mobileUtilItem} onClick={() => setIsMenuOpen(false)}>💡 Insights</Link>
              <Link href="/contact" className={styles.mobileUtilItem} onClick={() => setIsMenuOpen(false)}>📞 Support</Link>
            </div>

            <div className={styles.mobileAuthArea}>
              {user ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Link 
                    href="/profile" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={styles.mobileAuthBtn}
                    style={{ background: "#D3AE5C", color: "#0B1220" }}
                  >
                    👤 My Profile &amp; Dashboard
                  </Link>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className={styles.mobileAuthBtn}>
                    Sign Out ({user.name || "User"})
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)} 
                  className={styles.mobileAuthBtn}
                >
                  Login / Create Account
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </header>
  );
}
