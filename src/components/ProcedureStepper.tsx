"use client";

import React, { useState } from "react";
<<<<<<< HEAD
=======
import { usePanelMotion } from "@/hooks/usePanelMotion";
>>>>>>> ea53e95 (Update website design, SEO files, and content)
import { CheckCircle2, Clock, Check, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { ProcedureStage } from "@/data/procedures";
import { BookingModal } from "./BookingModal";

interface ProcedureStepperProps {
  stages: ProcedureStage[];
  procedureTitle: string;
}

export const ProcedureStepper: React.FC<ProcedureStepperProps> = ({
  stages,
  procedureTitle
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);

<<<<<<< HEAD
=======
  const panelRef = usePanelMotion(activeStageIndex);
>>>>>>> ea53e95 (Update website design, SEO files, and content)
  const activeStage = stages[activeStageIndex];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "300px 1fr",
      gap: "2.5rem",
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-card)",
      padding: "2rem",
      alignItems: "start"
    }} className="stepper-grid">
      
      {/* Left Vertical Stepper Rail */}
      <div style={{
        backgroundColor: "var(--bg-soft)",
        borderRadius: "var(--radius-md)",
        padding: "1.25rem",
        border: "1px solid var(--border-color)"
      }}>
        <div style={{
<<<<<<< HEAD
          fontSize: "0.75rem",
=======
          fontSize: "0.875rem",
>>>>>>> ea53e95 (Update website design, SEO files, and content)
          fontWeight: 700,
          color: "var(--primary-tag-text)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "1rem"
        }}>
<<<<<<< HEAD
          7-STAGE WALKTHROUGH RAIL
=======
          YOUR PROCEDURE, STEP BY STEP
>>>>>>> ea53e95 (Update website design, SEO files, and content)
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {stages.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isCompleted = idx < activeStageIndex;

            return (
              <button
                key={stage.stageNumber}
<<<<<<< HEAD
=======
                aria-pressed={isActive}
>>>>>>> ea53e95 (Update website design, SEO files, and content)
                onClick={() => setActiveStageIndex(idx)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 0.9rem",
                  borderRadius: "var(--radius-sm)",
                  border: isActive ? "1.5px solid var(--primary)" : "1px solid transparent",
                  backgroundColor: isActive ? "var(--primary-light)" : "transparent",
                  color: isActive ? "var(--primary)" : isCompleted ? "var(--secondary)" : "var(--text-muted)",
                  fontWeight: isActive ? 700 : 500,
<<<<<<< HEAD
                  fontSize: "0.875rem",
=======
                  fontSize: "1rem",
>>>>>>> ea53e95 (Update website design, SEO files, and content)
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: "100%"
                }}
              >
                <div style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  backgroundColor: isActive ? "var(--primary)" : isCompleted ? "#10b981" : "var(--border-color)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
<<<<<<< HEAD
                  fontSize: "0.75rem",
=======
                  fontSize: "0.875rem",
>>>>>>> ea53e95 (Update website design, SEO files, and content)
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {isCompleted ? <Check size={14} /> : stage.stageNumber}
                </div>

                <div style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {stage.stageName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Content Panel for Active Stage */}
<<<<<<< HEAD
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
          <div>
            <span className="eyebrow-pill" style={{ marginBottom: "0.4rem" }}>
              STAGE {activeStage.stageNumber} OF 7 • {activeStage.stageName.toUpperCase()}
=======
      <div ref={panelRef} aria-live="polite">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
          <div>
            <span className="eyebrow-pill" style={{ marginBottom: "0.4rem" }}>
              STAGE {activeStage.stageNumber} OF {stages.length} • {activeStage.stageName.toUpperCase()}
>>>>>>> ea53e95 (Update website design, SEO files, and content)
            </span>
            <h3 style={{ fontSize: "1.5rem", color: "var(--secondary)" }}>
              {activeStage.title}
            </h3>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            backgroundColor: "var(--primary-light)",
            color: "var(--primary)",
            padding: "0.4rem 0.9rem",
            borderRadius: "var(--radius-pill)",
<<<<<<< HEAD
            fontSize: "0.825rem",
=======
            fontSize: "1rem",
>>>>>>> ea53e95 (Update website design, SEO files, and content)
            fontWeight: 700
          }}>
            <Clock size={15} />
            <span>{activeStage.durationEstimate}</span>
          </div>
        </div>

        {/* What to Expect Paragraph */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h4 style={{ fontSize: "1rem", color: "var(--secondary)", marginBottom: "0.4rem" }}>
            What to Expect in this Phase:
          </h4>
<<<<<<< HEAD
          <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.6 }}>
=======
          <p style={{ color: "var(--text-body)", fontSize: "1rem", lineHeight: 1.6 }}>
>>>>>>> ea53e95 (Update website design, SEO files, and content)
            {activeStage.whatToExpect}
          </p>
        </div>

        {/* Key Points Checklist */}
        <div style={{
          backgroundColor: "var(--bg-soft)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
          marginBottom: "2rem"
        }}>
<<<<<<< HEAD
          <h4 style={{ fontSize: "0.95rem", color: "var(--secondary)", fontWeight: 700, marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
=======
          <h4 style={{ fontSize: "1rem", color: "var(--secondary)", fontWeight: 700, marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
>>>>>>> ea53e95 (Update website design, SEO files, and content)
            <ShieldCheck size={18} style={{ color: "var(--primary)" }} /> Key Points & Clinical Checklist:
          </h4>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {activeStage.keyPoints.map((pt, i) => (
<<<<<<< HEAD
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.875rem", color: "var(--secondary)" }}>
=======
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "1rem", color: "var(--secondary)" }}>
>>>>>>> ea53e95 (Update website design, SEO files, and content)
                <CheckCircle2 size={16} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stepper Navigation Buttons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => setActiveStageIndex(Math.max(0, activeStageIndex - 1))}
              disabled={activeStageIndex === 0}
              className="btn-outline"
              style={{
                padding: "0.6rem 1.25rem",
                opacity: activeStageIndex === 0 ? 0.4 : 1,
                cursor: activeStageIndex === 0 ? "not-allowed" : "pointer"
              }}
            >
              Previous Stage
            </button>

            <button
              onClick={() => setActiveStageIndex(Math.min(stages.length - 1, activeStageIndex + 1))}
              disabled={activeStageIndex === stages.length - 1}
              className="btn-primary"
              style={{
                padding: "0.6rem 1.25rem",
                opacity: activeStageIndex === stages.length - 1 ? 0.4 : 1,
                cursor: activeStageIndex === stages.length - 1 ? "not-allowed" : "pointer"
              }}
            >
              Next Stage <ArrowRight size={15} />
            </button>
          </div>

          <button
            onClick={() => setBookingModalOpen(true)}
            className="btn-secondary"
<<<<<<< HEAD
            style={{ padding: "0.65rem 1.25rem", fontSize: "0.875rem" }}
=======
            style={{ padding: "0.65rem 1.25rem", fontSize: "1rem" }}
>>>>>>> ea53e95 (Update website design, SEO files, and content)
          >
            <Calendar size={15} /> Ask Procedure Details
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
};
