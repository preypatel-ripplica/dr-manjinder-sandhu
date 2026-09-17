"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, RefreshCw, AlertTriangle, Activity, Heart, ShieldCheck, CheckCircle2 } from "lucide-react";
import { BookingModal } from "./BookingModal";

interface SymptomOption {
  id: string;
  label: string;
  sublabel: string;
  category: "Invasive" | "Preventive" | "Non-Invasive" | "General";
  recommendedSlug: string;
  recommendedTitle: string;
}

const step1Options: SymptomOption[] = [
  {
    id: "chest-pain",
    label: "Chest Pain or Pressure",
    sublabel: "Tightness or heavy sensation in chest during walking or rest",
    category: "Invasive",
    recommendedSlug: "radial-angiography-angioplasty",
    recommendedTitle: "Radial Angioplasty & Stenting"
  },
  {
    id: "breathlessness",
    label: "Shortness of Breath / Fatigue",
    sublabel: "Difficulty breathing when climbing stairs or lying flat",
    category: "Invasive",
    recommendedSlug: "tavr-tavi",
    recommendedTitle: "TAVR / TAVI Valve Replacement Evaluation"
  },
  {
    id: "palpitations",
    label: "Palpitations & Irregular Heartbeat",
    sublabel: "Racing, skipping, or abnormally slow heartbeats",
    category: "Invasive",
    recommendedSlug: "pacemaker-implants",
    recommendedTitle: "Pacemaker & Electrophysiology Evaluation"
  },
  {
    id: "preventive",
    label: "High BP, Cholesterol or Family History",
    sublabel: "Seeking proactive heart disease prevention & screening",
    category: "Preventive",
    recommendedSlug: "risk-factor-assessment-counselling",
    recommendedTitle: "Preventive Cardiac Screening"
  },
  {
    id: "second-opinion",
    label: "Angioplasty / CABG Second Opinion",
    sublabel: "Holding an existing angiogram CD & seeking Dr. Sandhu's review",
    category: "Invasive",
    recommendedSlug: "complex-angioplasty-cto",
    recommendedTitle: "Radial Angioplasty & Stenting Second Opinion"
  }
];

export const SymptomTriageWidget: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<SymptomOption | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<string>("Exertional / Intermittent");
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);

  const handleSelectOption = (opt: SymptomOption) => {
    setSelectedOption(opt);
  };

  const handleNextStep = () => {
    if (!selectedOption) return;
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedOption(null);
    setUrgencyLevel("Exertional / Intermittent");
  };

  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-card)",
      padding: "2.5rem 2rem",
      position: "relative"
    }}>
      {/* Header Eyebrow */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span className="eyebrow-pill">
          <Activity size={14} /> SYMPTOM GUIDE & CARE PATHWAY
        </span>
        <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", fontWeight: 600 }}>
          Step {currentStep} of 3
        </span>
      </div>

      <h2 style={{ fontSize: "1.75rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
        Not sure what care <span style={{ color: "var(--primary)" }}>you need?</span>
      </h2>
      <p style={{ color: "var(--text-body)", fontSize: "0.95rem", marginBottom: "2rem" }}>
        Answer 2 quick questions to find the right cardiology treatment pathway or schedule a direct consultation with Dr. Manjinder Sandhu.
      </p>

      {/* Progress Bar */}
      <div style={{
        width: "100%",
        height: "6px",
        backgroundColor: "var(--border-color)",
        borderRadius: "3px",
        marginBottom: "2rem",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${(currentStep / 3) * 100}%`,
          height: "100%",
          backgroundColor: "var(--primary)",
          transition: "width 0.3s ease"
        }} />
      </div>

      {/* Grid Container: Left Interactive Step Machine + Right Framing Panel */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "2.5rem",
        alignItems: "start"
      }} className="triage-grid">
        
        {/* Left Interactive Machine */}
        <div>
          {currentStep === 1 && (
            <div>
              <h3 style={{ fontSize: "1.1rem", color: "var(--secondary)", marginBottom: "1rem" }}>
                1. What is your primary cardiac concern?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {step1Options.map((opt) => {
                  const isSelected = selectedOption?.id === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      style={{
                        padding: "1rem 1.25rem",
                        borderRadius: "var(--radius-md)",
                        border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                        backgroundColor: isSelected ? "var(--primary-light)" : "var(--bg-card)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <div style={{
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: isSelected ? "var(--primary)" : "var(--secondary)"
                        }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: "0.825rem", color: "var(--text-body)", marginTop: "0.2rem" }}>
                          {opt.sublabel}
                        </div>
                      </div>
                      <div style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: isSelected ? "6px solid var(--primary)" : "2px solid var(--border-color)",
                        backgroundColor: "#ffffff",
                        flexShrink: 0
                      }} />
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                  onClick={handleNextStep}
                  disabled={!selectedOption}
                  className="btn-primary"
                  style={{
                    opacity: selectedOption ? 1 : 0.5,
                    cursor: selectedOption ? "pointer" : "not-allowed",
                    padding: "0.75rem 1.75rem"
                  }}
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && selectedOption && (
            <div>
              <h3 style={{ fontSize: "1.1rem", color: "var(--secondary)", marginBottom: "1rem" }}>
                2. How frequently or severely do these symptoms occur?
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {[
                  { title: "Occasional / Mild", desc: "Triggers mainly after heavy physical exertion or stress." },
                  { title: "Exertional / Intermittent", desc: "Occurs regularly when walking fast, climbing stairs, or carrying weights." },
                  { title: "Frequent / Severe at Rest", desc: "Occurs even while sitting or lying down, accompanied by sweating." }
                ].map((item) => {
                  const isSel = urgencyLevel === item.title;
                  return (
                    <div
                      key={item.title}
                      onClick={() => setUrgencyLevel(item.title)}
                      style={{
                        padding: "1rem 1.25rem",
                        borderRadius: "var(--radius-md)",
                        border: isSel ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                        backgroundColor: isSel ? "var(--primary-light)" : "var(--bg-card)",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: isSel ? "var(--primary)" : "var(--secondary)" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: "0.825rem", color: "var(--text-body)", marginTop: "0.2rem" }}>
                        {item.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button onClick={handleNextStep} className="btn-primary" style={{ padding: "0.75rem 1.75rem" }}>
                  View Recommended Pathway <ChevronRight size={16} />
                </button>
                <button
                  onClick={handleReset}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <RefreshCw size={14} /> Start over
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && selectedOption && (
            <div>
              <div style={{
                backgroundColor: "var(--primary-light)",
                border: "1.5px solid var(--primary-tag-bg)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
                marginBottom: "1.5rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                  <CheckCircle2 size={18} /> RECOMMENDED CARDIOLOGY PATHWAY
                </div>
                <h4 style={{ fontSize: "1.25rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
                  {selectedOption.recommendedTitle}
                </h4>
                <p style={{ color: "var(--text-body)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  Based on your concern (<strong>{selectedOption.label}</strong>) with <em>{urgencyLevel}</em> pattern, Dr. Manjinder Sandhu recommends a comprehensive clinical evaluation.
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="btn-primary"
                  style={{ padding: "0.8rem 1.5rem" }}
                >
                  Book Appointment with Dr. Sandhu
                </button>

                <Link
                  href={`/treatments/${selectedOption.recommendedSlug}`}
                  className="btn-outline"
                  style={{ padding: "0.8rem 1.5rem" }}
                >
                  Explore Treatment Details
                </Link>

                <button
                  onClick={handleReset}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <RefreshCw size={14} /> Start over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Framing Panel (Desktop) */}
        <div style={{
          backgroundColor: "var(--bg-soft)",
          borderRadius: "var(--radius-md)",
          padding: "1.75rem",
          border: "1px solid var(--border-color)"
        }}>
          <h4 style={{ fontSize: "1.1rem", color: "var(--secondary)", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShieldCheck size={20} style={{ color: "var(--primary)" }} /> What happens next?
          </h4>
          <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
            Tell us what feels most urgent so we can point you toward the right cardiology care pathway with Dr. Sandhu at Atrius Cardiac Care.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.85rem", color: "var(--secondary)" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0 }}>1</span>
              <span><strong>Share Symptoms & Reports:</strong> Submit your prior ECG, Echo, or Angiogram CD.</span>
            </li>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.85rem", color: "var(--secondary)" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0 }}>2</span>
              <span><strong>Expert Doctor Review:</strong> Dr. Sandhu&apos;s team reviews your history and urgency level.</span>
            </li>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.85rem", color: "var(--secondary)" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0 }}>3</span>
              <span><strong>Clear Care Plan:</strong> Receive an evidence-based recommendation (Medicine / Wrist Stenting / TAVR).</span>
            </li>
          </ul>

          <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.825rem", color: "var(--primary)" }}>
            <Heart size={15} fill="var(--primary)" />
            <span>Need quick guidance? Contact our patient care team at <strong>+91-8130370096</strong> for priority appointment coordination.</span>
          </div>
        </div>
      </div>

      {/* Global Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
};
