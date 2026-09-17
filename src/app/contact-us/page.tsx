"use client";

import React, { useState } from "react";
import { clinicLocations } from "@/data/clinics";
import { consultationPlans } from "@/data/consultation-plans";
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2, FileText, AlertCircle } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    clinicId: clinicLocations[0].id,
    planId: consultationPlans[0].id,
    message: "",
    hasFile: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>GET IN TOUCH</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            Contact <span style={{ color: "var(--primary)" }}>Dr. Manjinder Sandhu</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Consultation locations across Fortis Hospitals & Atrius Cardiac Care centers in Gurugram, Manesar, and Delhi NCR.
          </p>
        </div>
      </section>

      {/* Main Grid: Left Appointment Form + Right 4 Hospital Locations */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3.5rem" }} className="contact-grid">
            
            {/* Left Column: Comprehensive Lead Capture Form */}
            <div className="card-surface" style={{ padding: "2.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
                Book Appointment / Consultation
              </h2>
              <p style={{ color: "var(--text-body)", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
                Fill out the form below and Dr. Sandhu&apos;s clinic coordinator will get back to you within 2 hours.
              </p>

              {isSubmitted ? (
                <div style={{
                  backgroundColor: "var(--primary-light)",
                  border: "1px solid var(--primary-tag-bg)",
                  borderRadius: "var(--radius-md)",
                  padding: "2.5rem 1.5rem",
                  textAlign: "center"
                }}>
                  <CheckCircle2 size={48} style={{ color: "var(--primary)", margin: "0 auto 1rem auto" }} />
                  <h3 style={{ fontSize: "1.4rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
                    Appointment Request Received!
                  </h3>
                  <p style={{ color: "var(--text-body)", fontSize: "0.95rem" }}>
                    Thank you, <strong>{formData.name}</strong>. Our clinical team will contact you at <strong>{formData.phone}</strong> to confirm your slot.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--secondary)", marginBottom: "0.35rem" }}>
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--secondary)", marginBottom: "0.35rem" }}>
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.9rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--secondary)", marginBottom: "0.35rem" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.9rem",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--secondary)", marginBottom: "0.35rem" }}>
                        Preferred Hospital Location *
                      </label>
                      <select
                        value={formData.clinicId}
                        onChange={e => setFormData({ ...formData, clinicId: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.85rem",
                          backgroundColor: "#fff",
                          outline: "none"
                        }}
                      >
                        {clinicLocations.map(c => (
                          <option key={c.id} value={c.id}>{c.shortName}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--secondary)", marginBottom: "0.35rem" }}>
                        Consultation Plan
                      </label>
                      <select
                        value={formData.planId}
                        onChange={e => setFormData({ ...formData, planId: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-color)",
                          fontSize: "0.85rem",
                          backgroundColor: "#fff",
                          outline: "none"
                        }}
                      >
                        {consultationPlans.map(p => (
                          <option key={p.id} value={p.id}>{p.title} ({p.price})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--secondary)", marginBottom: "0.35rem" }}>
                      Symptoms or Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your chest tightness, angiogram review request, or questions..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.85rem",
                        outline: "none",
                        fontFamily: "inherit"
                      }}
                    />
                  </div>

                  {/* File Upload Attachment */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem",
                    background: "var(--bg-soft)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px dashed var(--border-color)",
                    fontSize: "0.825rem",
                    color: "var(--text-body)"
                  }}>
                    <FileText size={18} style={{ color: "var(--primary)" }} />
                    <span>Attach prior ECG / Angiogram / Echo (Optional)</span>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={() => setFormData({ ...formData, hasFile: true })}
                      style={{ fontSize: "0.75rem", marginLeft: "auto" }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ padding: "0.9rem", marginTop: "0.5rem" }}>
                    Submit Appointment Request
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: 4 Hospital Consultation Locations */}
            <div>
              <h2 style={{ fontSize: "1.5rem", color: "var(--secondary)", marginBottom: "1.25rem" }}>
                Consultation Locations
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {clinicLocations.map((clinic) => (
                  <div key={clinic.id} className="card-surface" style={{ padding: "1.5rem", backgroundColor: "var(--bg-soft)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <h3 style={{ fontSize: "1.1rem", color: "var(--secondary)" }}>
                        {clinic.name}
                      </h3>
                      {clinic.isPrimary && (
                        <span className="eyebrow-pill" style={{ fontSize: "0.65rem" }}>
                          PRIMARY CATH LAB
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                      {clinic.address}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.825rem", color: "var(--secondary)", marginBottom: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Clock size={14} style={{ color: "var(--primary)" }} /> <span><strong>Timings:</strong> {clinic.timings}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <Phone size={14} style={{ color: "var(--primary)" }} /> <span><strong>Emergency:</strong> {clinic.emergencyPhone}</span>
                      </div>
                    </div>

                    <a
                      href={clinic.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", width: "fit-content" }}
                    >
                      <MapPin size={14} /> Open in Google Maps
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
