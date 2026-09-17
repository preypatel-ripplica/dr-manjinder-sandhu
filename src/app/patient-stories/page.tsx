"use client";

import React, { useState } from "react";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { ArrowRight, UserCheck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export default function PatientStoriesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>CLINICAL CASE STUDIES</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            Patient Stories & <span style={{ color: "var(--primary)" }}>Case Outcomes</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Real anonymized clinical cases demonstrating complex CTO stenting, wrist access angioplasty, and TAVR valve replacement outcomes.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem" }}>
            {caseStudies.map((cs) => (
              <div key={cs.id} className="card-surface" style={{ padding: "2.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span className="eyebrow-pill" style={{ fontSize: "0.7rem" }}>
                      {cs.patientAgeGender}
                    </span>
                    <span style={{ fontSize: "0.775rem", color: "var(--text-muted)", fontWeight: 600 }}>
                      Verified Case
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.3rem", color: "var(--secondary)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                    {cs.condition}
                  </h3>

                  <div style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "1rem" }}>
                    Procedure: {cs.procedurePerformed}
                  </div>

                  <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                    {cs.summary}
                  </p>

                  <div style={{ backgroundColor: "var(--primary-light)", padding: "1rem", borderRadius: "var(--radius-sm)", fontStyle: "italic", fontSize: "0.85rem", color: "var(--secondary)", marginBottom: "1.5rem" }}>
                    &ldquo;{cs.testimonialSnippet}&rdquo;
                  </div>
                </div>

                <Link href={`/patient-stories/${cs.slug}`} className="btn-outline" style={{ justifyContent: "center" }}>
                  <span>Read Full Case Details</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
