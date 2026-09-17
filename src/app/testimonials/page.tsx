"use client";

import React, { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { VideoCard } from "@/components/VideoCard";
import { Star, ShieldCheck, Heart, Calendar } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export default function TestimonialsPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>VERIFIED REVIEWS</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            Patient <span style={{ color: "var(--primary)" }}>Testimonials & Reviews</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Read real patient experiences from Fortis Hospitals and Atrius Cardiac Care.
          </p>
        </div>
      </section>

      {/* Main Reviews Grid */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", marginBottom: "3.5rem" }}>
            {testimonials.map((rev) => (
              <div key={rev.id} className="card-surface" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", gap: "0.2rem", color: "#f59e0b" }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#f59e0b" />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {rev.source}
                  </span>
                </div>

                <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: "1.5rem" }}>
                  &ldquo;{rev.text}&rdquo;
                </p>

                <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--secondary)", fontSize: "0.95rem" }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {rev.location} • {rev.date}
                    </div>
                  </div>
                  {rev.procedureTag && (
                    <span className="eyebrow-pill" style={{ fontSize: "0.7rem" }}>
                      {rev.procedureTag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <h3 style={{ fontSize: "1.5rem", color: "var(--secondary)", textAlign: "center", marginBottom: "1.5rem" }}>
              Featured Video Testimonial
            </h3>
            <VideoCard
              title="TAVR Valve Replacement Patient Recovery Experience"
              patientName="Sunita Verma (Mother's Case)"
              procedureTag="TAVR Valve Replacement"
              videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            />
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
