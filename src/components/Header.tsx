"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Heart, Calendar, Phone } from "lucide-react";
import { BookingModal } from "./BookingModal";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Top Announcement & Emergency Bar */}
      <div style={{
        backgroundColor: "var(--secondary)",
        color: "#ffffff",
        fontSize: "0.8rem",
        padding: "0.4rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div className="container-custom" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Heart size={14} style={{ color: "var(--primary)" }} />
              <strong>Atrius Cardiac Care</strong> • Principal Director – Cardiology
            </span>
            <span style={{ color: "var(--text-muted)" }} className="hidden-mobile">|</span>
            <span className="hidden-mobile" style={{ color: "#d1d5db" }}>
              Gurugram • Delhi NCR • 4 Hospital Affiliations
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <a href="tel:+918130370096" style={{
              color: "#ffffff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontWeight: 600
            }}>
              <Phone size={13} style={{ color: "var(--primary)" }} />
              Direct Helpline: +91-8130370096
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 8000,
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.96)" : "var(--bg-page)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border-color)",
        transition: "all 0.3s ease",
        boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none"
      }}>
        <div className="container-custom" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "76px"
        }}>
          {/* Logo Lockup - Black Logo for Light Header Background */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img
              src="https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/657030e0751d3318c7f72dfe_64df4ba1b010601067770586_image%20(3)%20(1)%20(1)-p-500.png"
              srcSet="https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/657030e0751d3318c7f72dfe_64df4ba1b010601067770586_image%20(3)%20(1)%20(1)-p-500.png 500w, https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/657030e0751d3318c7f72dfe_64df4ba1b010601067770586_image%20(3)%20(1)%20(1)-p-800.png 800w, https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/657030e0751d3318c7f72dfe_64df4ba1b010601067770586_image%20(3)%20(1)%20(1).png 1639w"
              sizes="(max-width: 479px) 180px, 240px"
              alt="Dr. Manjinder Sandhu - Atrius Cardiac Care"
              style={{ height: "48px", maxHeight: "52px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                fontSize: "0.925rem",
                fontWeight: isActive("/") ? 700 : 500,
                color: isActive("/") ? "var(--primary)" : "var(--secondary)",
                transition: "color 0.2s ease"
              }}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              style={{
                textDecoration: "none",
                fontSize: "0.925rem",
                fontWeight: isActive("/about-us") ? 700 : 500,
                color: isActive("/about-us") ? "var(--primary)" : "var(--secondary)",
                transition: "color 0.2s ease"
              }}
            >
              About us
            </Link>

            {/* Expertise Dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/expertise"
                style={{
                  textDecoration: "none",
                  fontSize: "0.925rem",
                  fontWeight: pathname.startsWith("/expertise") || pathname.startsWith("/treatments") || pathname.startsWith("/procedures") ? 700 : 500,
                  color: pathname.startsWith("/expertise") || pathname.startsWith("/treatments") || pathname.startsWith("/procedures") ? "var(--primary)" : "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                Expertise <ChevronDown size={14} />
              </Link>

              {/* Submenu Menu */}
              {dropdownOpen && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "230px",
                  backgroundColor: "#ffffff",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  border: "1px solid var(--border-color)",
                  padding: "0.5rem 0",
                  zIndex: 9000,
                  animation: "fadeIn 0.2s ease"
                }}>
                  <Link
                    href="/treatments"
                    style={{
                      display: "block",
                      padding: "0.6rem 1.25rem",
                      fontSize: "0.875rem",
                      color: "var(--secondary)",
                      textDecoration: "none",
                      fontWeight: 500
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--primary-light)"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    Treatments & Procedures
                  </Link>

                  <Link
                    href="/procedures"
                    style={{
                      display: "block",
                      padding: "0.6rem 1.25rem",
                      fontSize: "0.875rem",
                      color: "var(--secondary)",
                      textDecoration: "none",
                      fontWeight: 500
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--primary-light)"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    Procedure Guides (7-Stage)
                  </Link>

                  <Link
                    href="/patient-stories"
                    style={{
                      display: "block",
                      padding: "0.6rem 1.25rem",
                      fontSize: "0.875rem",
                      color: "var(--secondary)",
                      textDecoration: "none",
                      fontWeight: 500
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--primary-light)"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    Patient Stories & Cases
                  </Link>

                  <Link
                    href="/consultation-plans"
                    style={{
                      display: "block",
                      padding: "0.6rem 1.25rem",
                      fontSize: "0.875rem",
                      color: "var(--secondary)",
                      textDecoration: "none",
                      fontWeight: 500
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--primary-light)"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    Consultation Plans
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/blogs"
              style={{
                textDecoration: "none",
                fontSize: "0.925rem",
                fontWeight: isActive("/blogs") ? 700 : 500,
                color: isActive("/blogs") ? "var(--primary)" : "var(--secondary)",
                transition: "color 0.2s ease"
              }}
            >
              Blogs
            </Link>

            <Link
              href="/contact-us"
              style={{
                textDecoration: "none",
                fontSize: "0.925rem",
                fontWeight: isActive("/contact-us") ? 700 : 500,
                color: isActive("/contact-us") ? "var(--primary)" : "var(--secondary)",
                transition: "color 0.2s ease"
              }}
            >
              Contact us
            </Link>
          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setBookingModalOpen(true)}
              className="btn-primary"
              style={{ padding: "0.65rem 1.35rem", fontSize: "0.875rem" }}
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Toggle Navigation Menu"
              style={{
                background: "none",
                border: "none",
                color: "var(--secondary)",
                cursor: "pointer",
                padding: "0.5rem",
                display: "none"
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Off-Canvas Drawer */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: "#ffffff",
            borderTop: "1px solid var(--border-color)",
            padding: "1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
          }}>
            <Link href="/" style={{ textDecoration: "none", color: "var(--secondary)", fontWeight: 600, padding: "0.5rem 0" }}>Home</Link>
            <Link href="/about-us" style={{ textDecoration: "none", color: "var(--secondary)", fontWeight: 600, padding: "0.5rem 0" }}>About Dr. Sandhu</Link>
            <Link href="/expertise" style={{ textDecoration: "none", color: "var(--secondary)", fontWeight: 600, padding: "0.5rem 0" }}>Areas of Expertise</Link>
            <Link href="/treatments" style={{ textDecoration: "none", color: "var(--secondary)", fontWeight: 600, padding: "0.5rem 0" }}>Treatments & Services</Link>
            <Link href="/procedures" style={{ textDecoration: "none", color: "var(--secondary)", fontWeight: 600, padding: "0.5rem 0" }}>Procedure Guides</Link>
            <Link href="/consultation-plans" style={{ textDecoration: "none", color: "var(--secondary)", fontWeight: 600, padding: "0.5rem 0" }}>Consultation Plans</Link>
            <Link href="/blogs" style={{ textDecoration: "none", color: "var(--secondary)", fontWeight: 600, padding: "0.5rem 0" }}>Blogs & Articles</Link>
            <Link href="/contact-us" style={{ textDecoration: "none", color: "var(--secondary)", fontWeight: 600, padding: "0.5rem 0" }}>Contact Us</Link>
          </div>
        )}
      </header>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </>
  );
};
