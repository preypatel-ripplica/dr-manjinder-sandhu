import React from "react";
import Link from "next/link";
import { Heart, MapPin, Phone, Mail, ChevronRight, ShieldCheck } from "lucide-react";
import { clinicLocations } from "@/data/clinics";

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: "var(--secondary)",
      color: "#ffffff",
      paddingTop: "4.5rem",
      paddingBottom: "2rem",
      borderTop: "3px solid var(--primary)",
      marginTop: "auto"
    }}>
      <div className="container-custom">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3.5rem"
        }}>
          {/* Column 1: Doctor Profile & Brand Context */}
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <img
                src="https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/6570313192499d62b3bce1b5_64df4ba1b010601067770586_image%20(3)%20(1)%20(2)-p-500.png"
                srcSet="https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/6570313192499d62b3bce1b5_64df4ba1b010601067770586_image%20(3)%20(1)%20(2)-p-500.png 500w, https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/6570313192499d62b3bce1b5_64df4ba1b010601067770586_image%20(3)%20(1)%20(2)-p-800.png 800w, https://cdn.prod.website-files.com/64abefce59d5dabbeb3b31ae/6570313192499d62b3bce1b5_64df4ba1b010601067770586_image%20(3)%20(1)%20(2).png 1639w"
                sizes="(max-width: 479px) 180px, 240px"
                alt="Dr. Manjinder Sandhu - Atrius Cardiac Care"
                style={{ height: "50px", maxHeight: "56px", width: "auto", objectFit: "contain" }}
              />
            </div>

            <p style={{ color: "#9ca3af", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              Senior Interventional Cardiologist & Principal Director – Cardiology. Over 33 years of clinical excellence in Radial Angioplasty, TAVR/TAVI, and Complex Coronary Interventions.
            </p>

            <div style={{
              backgroundColor: "rgba(230, 35, 52, 0.12)",
              border: "1px solid rgba(230, 35, 52, 0.3)",
              borderRadius: "var(--radius-md)",
              padding: "0.85rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem"
            }}>
              <ShieldCheck size={24} style={{ color: "var(--primary)", flexShrink: 0 }} />
              <div style={{ fontSize: "0.825rem", color: "#e5e7eb" }}>
                <strong>Patient Care & Appointment Desk</strong>
                <br />
                Direct Helpline: <a href="tel:+918130370096" style={{ color: "#ffffff", textDecoration: "underline" }}>+91-8130370096</a>
              </div>
            </div>

            {/* Social Media Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <a
                href="https://www.youtube.com/channel/UCTcSjzNhA-CUo45DxTVbM6Q"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>

              <a
                href="https://www.instagram.com/drsandhucardiologist"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>

              <a
                href="https://www.facebook.com/DrManjinderSandhu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>

              <a
                href="https://www.linkedin.com/in/manjinder-sandhu-92bb0321/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Key Cardiology Treatments */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.25rem" }}>
              Key Treatments
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li>
                <Link href="/treatments/radial-angiography-angioplasty" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Radial Wrist Angioplasty
                </Link>
              </li>
              <li>
                <Link href="/treatments/tavr-tavi" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> TAVR / TAVI Valve Replacement
                </Link>
              </li>
              <li>
                <Link href="/treatments/pacemaker-implants" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Pacemaker & ICD Implants
                </Link>
              </li>
              <li>
                <Link href="/treatments/complex-angioplasty-cto" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Complex Calcified CTO Stenting
                </Link>
              </li>
              <li>
                <Link href="/treatments/heart-failure-management" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Heart Failure & CRT Therapy
                </Link>
              </li>
              <li>
                <Link href="/treatments/risk-factor-assessment-counselling" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Preventive Cardiac Screening
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Care & Quick Links */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.25rem" }}>
              Patient Resources
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li>
                <Link href="/about-us" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Doctor Profile & Credentials
                </Link>
              </li>
              <li>
                <Link href="/procedures/coronary-angiography-angioplasty-guide" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> 7-Stage Procedure Walkthroughs
                </Link>
              </li>
              <li>
                <Link href="/consultation-plans" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Consultation Plans & Fees
                </Link>
              </li>
              <li>
                <Link href="/patient-stories" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Patient Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blogs" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Cardiac Awareness Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-us" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ChevronRight size={14} style={{ color: "var(--primary)" }} /> Contact & Clinic Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: 4 Consultation Clinics List */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: 700, marginBottom: "1.25rem" }}>
              Hospital Consultation Centers
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {clinicLocations.map(clinic => (
                <div key={clinic.id} style={{ fontSize: "0.85rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.5rem" }}>
                  <div style={{ fontWeight: 600, color: "#ffffff", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <MapPin size={13} style={{ color: "var(--primary)" }} /> {clinic.shortName}
                  </div>
                  <div style={{ color: "#9ca3af", fontSize: "0.775rem", marginTop: "0.15rem" }}>
                    {clinic.timings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.825rem",
          color: "#9ca3af"
        }}>
          <div>
            © {new Date().getFullYear()} Dr. Manjinder Sandhu • Atrius Cardiac Care. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Medical Disclaimer: Content is for patient education and does not replace direct clinical consultation.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
