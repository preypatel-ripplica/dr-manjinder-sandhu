"use client";

import React, { useState } from "react";
import { TreatmentsFilterGrid } from "@/components/TreatmentsFilterGrid";
import { BookingModal } from "@/components/BookingModal";
import { Calendar } from "lucide-react";

export default function TreatmentsIndexPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>CARDIOLOGY TREATMENTS & PROCEDURES</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            Comprehensive <span style={{ color: "var(--primary)" }}>Cardiac Treatments</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Filter our complete offering of invasive, non-invasive, preventive, and general cardiology treatments provided by Dr. Manjinder Sandhu.
          </p>
        </div>
      </section>

      {/* Main Filterable Grid Section */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <TreatmentsFilterGrid />
        </div>
      </section>

      {/* Bottom CTA Band */}
      <section style={{ backgroundColor: "var(--secondary)", color: "#ffffff", padding: "3.5rem 0", textAlign: "center" }}>
        <div className="container-custom">
          <h2 style={{ color: "#ffffff", fontSize: "1.85rem", marginBottom: "0.5rem" }}>
            Need Personal Advice on the Right Treatment?
          </h2>
          <p style={{ color: "#d1d5db", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
            Schedule an in-person consultation or angiogram second opinion with Dr. Manjinder Sandhu.
          </p>
          <button onClick={() => setBookingModalOpen(true)} className="btn-primary" style={{ padding: "0.85rem 2rem" }}>
            <Calendar size={18} /> Book Direct Appointment
          </button>
        </div>
      </section>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
