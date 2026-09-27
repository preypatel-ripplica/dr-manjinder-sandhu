"use client";

<<<<<<< HEAD
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
=======
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, ArrowUpRight } from "lucide-react";
import { BookingModal } from "./BookingModal";
import { treatments } from "@/data/treatments";

const healthCareLinks = [
  ["Expertise", "/expertise"],
  ["Procedures", "/procedures"],
  ["Patient stories", "/patient-stories"],
  ["Fees", "/consultation-plans"],
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const careRef = useRef<HTMLDivElement>(null);
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const careButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setMobileOpen(false);
    setTreatmentsOpen(false);
    setCareOpen(false);
  }, [pathname]);
  useEffect(() => {
    function close(event: PointerEvent) {
      if (!careRef.current?.contains(event.target as Node)) setCareOpen(false);
      if (!treatmentsRef.current?.contains(event.target as Node))
        setTreatmentsOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (careOpen) {
          setCareOpen(false);
          careButton.current?.focus();
        }
        if (treatmentsOpen) setTreatmentsOpen(false);
        if (mobileOpen) {
          setMobileOpen(false);
          menuButton.current?.focus();
        }
      }
    }
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [careOpen, mobileOpen, treatmentsOpen]);
  const active = (href: string) =>
    pathname === href ? ("page" as const) : undefined;
  return (
    <>
      <div className="utility-bar">
        <div className="container-custom utility-inner">
          <span>
            CARDIOLOGY CARE{" "}
            <span className="utility-location"> · Gurugram & Delhi NCR</span>
          </span>
          <a href="tel:+918130370096">
            <Phone size={13} /> +91 81303 70096
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container-custom header-inner">
          <Link
            className="brand"
            href="/"
            aria-label="Dr. Manjinder Sandhu, home"
          >
            <span className="brand-text"><span className="wordmark-name"><span className="wordmark-prefix">Dr.</span> Manjinder <strong>Sandhu<span className="wordmark-period">.</span></strong></span><small>INTERVENTIONAL CARDIOLOGIST</small></span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link href="/" aria-current={active("/")}>
              Home
            </Link>
            <Link href="/about-us" aria-current={active("/about-us")}>
              About
            </Link>
            <div
              className="nav-dropdown nav-treatment-dropdown"
              ref={treatmentsRef}
              onMouseEnter={() => setTreatmentsOpen(true)}
              onMouseLeave={() => setTreatmentsOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setTreatmentsOpen(false);
              }}
            >
              <Link href="/treatments" aria-current={active("/treatments")} onFocus={() => setTreatmentsOpen(true)}>
                Treatments
              </Link>
              <button
                className="nav-caret-button"
                onClick={() => setTreatmentsOpen(!treatmentsOpen)}
                aria-label="Open treatments menu"
                aria-expanded={treatmentsOpen}
                aria-controls="treatments-navigation"
              >
                <ChevronDown size={14} />
              </button>
              <div
                className="nav-dropdown-panel treatment-dropdown-panel"
                id="treatments-navigation"
                data-open={treatmentsOpen}
                inert={!treatmentsOpen}
                aria-hidden={!treatmentsOpen}
              >
                <Link
                  className="dropdown-overview"
                  href="/treatments"
                  onClick={() => setTreatmentsOpen(false)}
                >
                  All treatments <ArrowUpRight size={14} />
                </Link>
                {treatments.map((treatment) => (
                  <Link
                    key={treatment.id}
                    href={`/treatments/${treatment.slug}`}
                    onClick={() => setTreatmentsOpen(false)}
                  >
                    <span>{treatment.title}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
            <div
              className="nav-dropdown"
              ref={careRef}
              onMouseEnter={() => setCareOpen(true)}
              onMouseLeave={() => setCareOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setCareOpen(false);
              }}
            >
              <button
                ref={careButton}
                onClick={() => setCareOpen(!careOpen)}
                aria-expanded={careOpen}
                aria-controls="care-navigation"
              >
                Care <ChevronDown size={14} />
              </button>
              <div
                className="nav-dropdown-panel"
                id="care-navigation"
                data-open={careOpen}
                inert={!careOpen}
                aria-hidden={!careOpen}
              >
                {healthCareLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setCareOpen(false)}
                  >
                    {label}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/blogs" aria-current={active("/blogs")}>
              Blogs
            </Link>
            <Link href="/contact-us" aria-current={active("/contact-us")}>
              Contact
            </Link>
          </nav>
          <div className="header-actions">
            <button
              className="btn-primary header-book"
              onClick={() => setBookingOpen(true)}
            >
              Book appointment <ArrowUpRight size={16} />
            </button>
            <button
              ref={menuButton}
              className="menu-toggle"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <nav
          className="mobile-navigation"
          data-open={mobileOpen}
          inert={!mobileOpen}
          aria-hidden={!mobileOpen}
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {[
            ["Home", "/"],
            ["About", "/about-us"],
            ["Treatments", "/treatments"],
            ...treatments.map((treatment) => [
              `— ${treatment.title}`,
              `/treatments/${treatment.slug}`,
            ]),
            ...healthCareLinks,
            ["Blogs", "/blogs"],
            ["Contact & locations", "/contact-us"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href)}
              onClick={() => setMobileOpen(false)}
            >
              {label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
          <button
            className="btn-primary"
            onClick={() => {
              setMobileOpen(false);
              setBookingOpen(true);
            }}
          >
            Book appointment
          </button>
        </nav>
      </header>
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
>>>>>>> ea53e95 (Update website design, SEO files, and content)
