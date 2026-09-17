"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, CheckCircle2, Calendar } from "lucide-react";
import { procedures } from "@/data/procedures";
import { BookingModal } from "@/components/BookingModal";

export default function ProceduresIndexPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>PATIENT EDUCATION & STEPPERS</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            Procedure <span style={{ color: "var(--primary)" }}>Walkthrough Guides</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Detailed 7-stage step-by-step walkthroughs explaining what to expect before, during, and after your interventional cardiac procedure.
          </p>
        </div>
      </section>

      {/* Procedures List */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem" }}>
            {procedures.map((proc) => (
              <div key={proc.id} className="card-surface" style={{ padding: "2.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span className="eyebrow-pill" style={{ fontSize: "0.7rem", marginBottom: "0.6rem" }}>
                    7-STAGE {proc.category.toUpperCase()} GUIDE
                  </span>
                  <h3 style={{ fontSize: "1.35rem", color: "var(--secondary)", marginBottom: "0.4rem" }}>
                    {proc.title}
                  </h3>
                  <p style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>
                    {proc.subtitle}
                  </p>

                  <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    {proc.overview}
                  </p>

                  <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", fontSize: "0.825rem", color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Clock size={14} style={{ color: "var(--primary)" }} /> {proc.estimatedTotalTime}
                    </span>
                    <span>•</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <ShieldCheck size={14} style={{ color: "var(--primary)" }} /> {proc.hospitalStay}
                    </span>
                  </div>
                </div>

                <Link href={`/procedures/${proc.slug}`} className="btn-primary" style={{ justifyContent: "center" }}>
                  <span>Launch 7-Stage Walkthrough</span>
                  <ArrowRight size={16} />
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
