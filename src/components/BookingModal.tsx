"use me client";
"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, User, Phone, Mail, MapPin, CheckCircle, FileText } from "lucide-react";
import { clinicLocations } from "@/data/clinics";
import { consultationPlans } from "@/data/consultation-plans";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedPlan?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedPlan
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredDate: "",
    clinicId: clinicLocations[0].id,
    planId: preSelectedPlan || consultationPlans[0].id,
    medicalConcern: "",
    hasReport: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preSelectedPlan) {
      setFormData(prev => ({ ...prev, planId: preSelectedPlan }));
    }
  }, [preSelectedPlan]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Auto-reset after 3 seconds
      setIsSubmitted(false);
      onClose();
    }, 3500);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(26, 37, 48, 0.75)",
      backdropFilter: "blur(6px)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "var(--radius-lg)",
        maxWidth: "560px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
        position: "relative",
        border: "1px solid var(--border-color)",
        padding: "2rem"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "var(--bg-soft)",
            border: "1px solid var(--border-color)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-dark)",
            transition: "all 0.2s ease"
          }}
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem auto"
            }}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: "1.5rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
              Appointment Request Sent!
            </h3>
            <p style={{ color: "var(--text-body)", fontSize: "0.95rem" }}>
              Thank you, <strong>{formData.fullName}</strong>. Dr. Manjinder Sandhu&apos;s clinical appointment desk will call you at <strong>{formData.phone}</strong> shortly to confirm your slot.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <span className="eyebrow-pill" style={{ marginBottom: "0.5rem" }}>
                ATRIUS CARDIAC CARE
              </span>
              <h3 style={{ fontSize: "1.5rem", color: "var(--secondary)" }}>
                Book Appointment with Dr. Sandhu
              </h3>
              <p style={{ color: "var(--text-body)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                Senior Interventional Cardiologist • 33+ Years Experience
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Patient Full Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                  Patient Full Name *
                </label>
                <div style={{ position: "relative" }}>
                  <User size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.75rem 0.75rem 2.3rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-color)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Phone & Email Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                    Phone / WhatsApp *
                  </label>
                  <div style={{ position: "relative" }}>
                    <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.75rem 0.75rem 2.3rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                    Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.75rem 0.75rem 2.3rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Location Select */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                  Preferred Consultation Location *
                </label>
                <div style={{ position: "relative" }}>
                  <MapPin size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <select
                    value={formData.clinicId}
                    onChange={e => setFormData({ ...formData, clinicId: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.75rem 0.75rem 2.3rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-color)",
                      fontSize: "0.9rem",
                      backgroundColor: "#fff",
                      outline: "none"
                    }}
                  >
                    {clinicLocations.map(clinic => (
                      <option key={clinic.id} value={clinic.id}>
                        {clinic.shortName} ({clinic.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consultation Type & Date Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                    Consultation Type
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
                    {consultationPlans.map(plan => (
                      <option key={plan.id} value={plan.id}>
                        {plan.title} ({plan.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                    Preferred Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <Calendar size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.75rem 0.75rem 2.3rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-color)",
                        fontSize: "0.85rem",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Concern & Attachments */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem", color: "var(--secondary)" }}>
                  Describe Symptoms or Cardiac Concern
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Chest tightness on walking, seeking second opinion for angioplasty..."
                  value={formData.medicalConcern}
                  onChange={e => setFormData({ ...formData, medicalConcern: e.target.value })}
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

              {/* Attach File Option */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 0.8rem",
                background: "var(--bg-soft)",
                borderRadius: "var(--radius-sm)",
                border: "1px dashed var(--border-color)",
                fontSize: "0.825rem",
                color: "var(--text-body)"
              }}>
                <FileText size={16} style={{ color: "var(--primary)" }} />
                <span>Attach prior ECG / Angiogram / Echo report (Optional)</span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={() => setFormData({ ...formData, hasReport: true })}
                  style={{ fontSize: "0.75rem", marginLeft: "auto" }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", marginTop: "0.5rem", padding: "0.9rem" }}
              >
                Confirm & Request Slot
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
