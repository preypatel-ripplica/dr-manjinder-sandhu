"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Activity, Zap, Stethoscope } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export default function ExpertisePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const pillars = [
    {
      title: "Invasive & Interventional Cardiology",
      tagline: "Precision catheter-based stenting & non-surgical valve replacement",
      icon: Zap,
      description: "Pioneering radial wrist angioplasty, TAVR/TAVI heart valve replacements, Rotablator calcified CTO stenting, and pacemaker implants with minimal invasiveness.",
      highlights: ["Radial Wrist Angioplasty & Stenting", "TAVR / TAVI Non-Surgical Valve Replacement", "Complex Calcified CTO Rotablator Stenting", "Pacemaker & ICD Rhythm Device Implants"],
      slugFilter: "Invasive"
    },
    {
      title: "Preventive Cardiology & Risk Screening",
      tagline: "Proactive screening to prevent avoidable heart attacks",
      icon: ShieldCheck,
      description: "Comprehensive cardiovascular risk assessment evaluating arterial calcification, lipid subclasses, blood pressure control, and genetic risk factors decades before symptoms occur.",
      highlights: ["CT Coronary Calcium Scoring", "High-Sensitivity hs-CRP & Lipid Profiling", "Lifestyle & Dietary Cardiovascular Plans", "Hypertension & Diabetes Heart Protection"],
      slugFilter: "Preventive"
    },
    {
      title: "Non-Invasive Diagnostic Cardiology",
      tagline: "High-definition ultrasound & color Doppler heart imaging",
      icon: Activity,
      description: "Advanced diagnostic imaging evaluating heart chamber pumping efficiency (Ejection Fraction), valve motion, wall thickness, and congenital structural variations.",
      highlights: ["2D / 3D Echocardiography & Color Doppler", "Treadmill Stress Testing (TMT) & Stress Echo", "24-48 Hour Continuous Holter Rhythm Monitoring", "Carotid Arterial Doppler Scans"],
      slugFilter: "Non-Invasive"
    },
    {
      title: "General & Heart Failure Cardiology",
      tagline: "Long-term medical optimization & resynchronization therapy",
      icon: Heart,
      description: "Specialized clinical care for weak heart muscle pumping (low EF), integrating modern ARNI/SGLT2 inhibitors and Cardiac Resynchronization Therapy (CRT).",
      highlights: ["Guideline-Directed Medical Therapy (GDMT)", "Cardiac Resynchronization Therapy (CRT-D / CRT-P)", "Cardiomyopathy & Heart Failure Management", "Post-Angioplasty Rehabilitation & Care"],
      slugFilter: "General"
    }
  ];

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>CLINICAL PILLARS</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            Areas of <span style={{ color: "var(--primary)" }}>Cardiology Expertise</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Dr. Manjinder Sandhu provides comprehensive cardiovascular care across four specialized interventional and diagnostic disciplines.
          </p>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }} className="pillars-grid">
            {pillars.map((pil, idx) => {
              const IconComp = pil.icon;
              return (
                <div key={idx} className="card-surface" style={{ padding: "2.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div className="circular-icon-badge" style={{ marginBottom: "1.25rem" }}>
                      <IconComp size={32} />
                    </div>

                    <h3 style={{ fontSize: "1.4rem", color: "var(--secondary)", marginBottom: "0.4rem" }}>
                      {pil.title}
                    </h3>

                    <p style={{ color: "var(--primary)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "1rem" }}>
                      {pil.tagline}
                    </p>

                    <p style={{ color: "var(--text-body)", fontSize: "0.925rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                      {pil.description}
                    </p>

                    <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginBottom: "1.5rem" }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--secondary)", marginBottom: "0.6rem" }}>
                        FEATURED PROCEDURES & SERVICES:
                      </div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                        {pil.highlights.map((h, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-body)" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--primary)", flexShrink: 0 }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link href="/treatments" className="btn-outline" style={{ justifyContent: "center" }}>
                    <span>Browse {pil.slugFilter} Treatments</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section style={{ backgroundColor: "var(--secondary)", color: "#ffffff", padding: "4rem 0", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ color: "#ffffff", fontSize: "2rem", marginBottom: "0.75rem" }}>
            Consult Dr. Manjinder Sandhu for Expert Cardiac Care
          </h2>
          <p style={{ color: "#d1d5db", fontSize: "1rem", maxWidth: "600px", margin: "0 auto 1.75rem auto" }}>
            Get an evidence-based clinical evaluation at Atrius Cardiac Care centers across Gurugram, Manesar, and Delhi NCR.
          </p>
          <button onClick={() => setBookingModalOpen(true)} className="btn-primary" style={{ padding: "0.9rem 2rem" }}>
            Book Consultation Appointment
          </button>
        </div>
      </section>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
