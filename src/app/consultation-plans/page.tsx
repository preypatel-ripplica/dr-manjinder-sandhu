"use client";

import React, { useState } from "react";
import { CheckCircle2, Calendar, ShieldCheck, Heart, Info } from "lucide-react";
import { consultationPlans } from "@/data/consultation-plans";
import { BookingModal } from "@/components/BookingModal";

export default function ConsultationPlansPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(consultationPlans[0].id);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBookPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setBookingModalOpen(true);
  };

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>TRANSPARENT CLINICAL PRICING</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            Consultation <span style={{ color: "var(--primary)" }}>Plans & Fees</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Clear, upfront consultation pricing for first visits, free 15-day revisits, and specialized angiogram second opinions.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "stretch"
          }}>
            {consultationPlans.map((plan) => (
              <div
                key={plan.id}
                className="card-surface"
                style={{
                  padding: "2.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: plan.isFeatured ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                  position: "relative",
                  backgroundColor: plan.isFeatured ? "var(--primary-light)" : "var(--bg-card)"
                }}
              >
                {plan.isFeatured && (
                  <div style={{
                    position: "absolute",
                    top: "-14px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "var(--primary)",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.3rem 1rem",
                    borderRadius: "var(--radius-pill)",
                    textTransform: "uppercase"
                  }}>
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: "1.35rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
                    {plan.title}
                  </h3>

                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--secondary)" }}>
                      {plan.price}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.825rem", color: "var(--primary)", fontWeight: 700, marginBottom: "1.25rem" }}>
                    {plan.validity}
                  </p>

                  <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                    {plan.description}
                  </p>

                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--secondary)", marginBottom: "0.75rem" }}>
                      INCLUDED SERVICES:
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {plan.features.map((feat, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--secondary)" }}>
                          <CheckCircle2 size={16} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleBookPlan(plan.id)}
                  className={plan.isFeatured ? "btn-primary" : "btn-outline"}
                  style={{ width: "100%", justifyContent: "center", padding: "0.85rem" }}
                >
                  <Calendar size={16} /> {plan.ctaLabel}
                </button>
              </div>
            ))}
          </div>

          {/* Pricing Disclaimer Box */}
          <div style={{
            marginTop: "3.5rem",
            padding: "1.25rem 1.5rem",
            backgroundColor: "var(--bg-soft)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.875rem",
            color: "var(--text-body)"
          }}>
            <Info size={20} style={{ color: "var(--primary)", flexShrink: 0 }} />
            <span>
              <strong>Note:</strong> Consultation fees cover clinical evaluation, physical exam, and report reviews. Procedural charges for Radial Angioplasty, TAVR, or Pacemaker implants are quoted separately after diagnostic evaluation.
            </span>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preSelectedPlan={selectedPlanId}
      />
    </div>
  );
}
