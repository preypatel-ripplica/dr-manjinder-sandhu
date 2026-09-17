"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Award, ShieldCheck, Heart, Activity, CheckCircle2, Calendar, Stethoscope, Briefcase, GraduationCap } from "lucide-react";
import { doctorProfile } from "@/data/doctor-profile";
import { BookingModal } from "@/components/BookingModal";

export default function AboutUsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>BIOGRAPHY & CLINICAL LEADERSHIP</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            About <span style={{ color: "var(--primary)" }}>Dr. Manjinder Sandhu</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Senior Interventional Cardiologist & Principal Director – Cardiology at Atrius Cardiac Care and Fortis Hospitals. Over 33 years of clinical expertise and 25,000+ cardiac procedures.
          </p>
        </div>
      </section>

      {/* Doctor Bio Details & Stats */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "center" }} className="about-grid">
            
            <div>
              <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>33+ YEARS OF CARDIAC EXCELLENCE</span>
              <h2 style={{ fontSize: "2rem", color: "var(--secondary)", marginBottom: "1.25rem", lineHeight: 1.25 }}>
                Pioneering Radial Wrist Angioplasty & <span style={{ color: "var(--primary)" }}>TAVR Interventions</span>
              </h2>

              <p style={{ color: "var(--text-body)", fontSize: "0.975rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Dr. Manjinder Sandhu is one of India&apos;s most distinguished Senior Interventional Cardiologists. He co-founded <strong>Atrius Cardiac Care</strong> in 2023 alongside senior cardiac colleagues to deliver boutique, patient-first tertiary cardiovascular care across 4 premier hospital centers in Gurugram, Manesar, and Delhi NCR.
              </p>

              <p style={{ color: "var(--text-body)", fontSize: "0.975rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                An alumnus of <strong>AFMC Pune</strong> and <strong>PGIMER Chandigarh</strong>, Dr. Sandhu previously served as Officer Commanding in the Armed Forces Medical Services and Director & Head of Cardiology at Fortis Memorial Research Institute (FMRI) Gurugram.
              </p>

              <button onClick={() => setBookingModalOpen(true)} className="btn-primary" style={{ padding: "0.85rem 1.8rem" }}>
                <Calendar size={18} /> Schedule Consultation
              </button>
            </div>

            {/* Qualifications Card */}
            <div className="card-surface" style={{ padding: "2.25rem", backgroundColor: "var(--bg-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem", color: "var(--secondary)" }}>
                <GraduationCap size={28} style={{ color: "var(--primary)" }} />
                <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Academic Qualifications & Fellowships</h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {doctorProfile.qualifications.map((qual, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.875rem", color: "var(--secondary)" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                    <span>{qual}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Career Timeline Component (§5.2) */}
      <section className="section-padding section-soft" style={{ borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="eyebrow-pill">CAREER MILESTONES</span>
            <h2 className="heading-underline" style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
              Professional Journey & <span style={{ color: "var(--primary)" }}>Leadership Chronology</span>
            </h2>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
            {/* Timeline Vertical Line */}
            <div style={{
              position: "absolute",
              left: "24px",
              top: 0,
              bottom: 0,
              width: "3px",
              backgroundColor: "var(--border-color)"
            }} className="timeline-line" />

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {doctorProfile.careerTimeline.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(230, 35, 52, 0.3)",
                    zIndex: 2,
                    flexShrink: 0
                  }}>
                    <Briefcase size={22} />
                  </div>

                  <div className="card-surface" style={{ padding: "1.75rem", flex: 1, backgroundColor: "#ffffff" }}>
                    <span className="eyebrow-pill" style={{ fontSize: "0.7rem", marginBottom: "0.4rem" }}>
                      {item.period}
                    </span>
                    <h3 style={{ fontSize: "1.2rem", color: "var(--secondary)", marginTop: "0.2rem" }}>
                      {item.role}
                    </h3>
                    <div style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.6rem" }}>
                      {item.institution}
                    </div>
                    <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                      {item.highlights}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="eyebrow-pill">PATIENT-FIRST PHILOSOPHY</span>
            <h2 className="heading-underline" style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
              Our Core <span style={{ color: "var(--primary)" }}>Clinical Values</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {doctorProfile.coreValues.map((val, idx) => (
              <div key={idx} className="card-surface" style={{ padding: "2rem", textAlign: "center" }}>
                <div className="circular-icon-badge" style={{ margin: "0 auto 1.25rem auto" }}>
                  {idx === 0 && <ShieldCheck size={32} />}
                  {idx === 1 && <Heart size={32} />}
                  {idx === 2 && <Activity size={32} />}
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)", marginBottom: "0.75rem" }}>
                  {val.title}
                </h3>
                <p style={{ color: "var(--text-body)", fontSize: "0.925rem", lineHeight: 1.6 }}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
