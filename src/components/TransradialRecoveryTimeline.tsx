"use client";

import React, { useState } from "react";
import { Sparkles, Clock, CheckCircle2, ShieldCheck, Heart, AlertCircle, ArrowRight } from "lucide-react";

interface RecoveryStage {
  timeLabel: string;
  timeLabelShort?: string;
  hour: number;
  radialTitle: string;
  radialDesc: string;
  radialStatus: string;
  radialIcon: string;
  femoralTitle: string;
  femoralDesc: string;
  femoralStatus: string;
}

const recoveryStages: RecoveryStage[] = [
  {
    timeLabel: "Hour 0 (Procedure Complete)",
    hour: 0,
    radialTitle: "Soft Radial Compression Band Applied",
    radialDesc: "Dr. Sandhu applies a lightweight adjustable wrist compression band over the radial artery entry point. No groin sandbags or heavy pressure clamps needed.",
    radialStatus: "Patient sits comfortably in bed, drinks tea, and chats with family immediately.",
    radialIcon: "wrist",
    femoralTitle: "Flat Bedrest & Heavy Groin Compression",
    femoralDesc: "Traditional femoral artery puncture in the groin requires 4-6 hours of rigid flat bedrest with a heavy sandbag applied directly to the groin crease.",
    femoralStatus: "Zero leg movement permitted; patient lies flat on back in ICU."
  },
  {
    timeLabel: "Hour 2 (Initial Post-Op)",
    timeLabelShort: "Hour 2",
    hour: 2,
    radialTitle: "Immediate Mobilization & Arm Freedom",
    radialDesc: "The patient can stand up, walk independently to the bathroom, and read or use their mobile phone with complete arm freedom.",
    radialStatus: "Immediate walking capability • 99% lower bleeding complication rate",
    radialIcon: "walk",
    femoralTitle: "Strict Bedrest & Back Discomfort",
    femoralDesc: "Patient must continue lying flat to prevent groin arterial hematoma or pseudoaneurysm formation.",
    femoralStatus: "Leg must remain completely straight; back pain common from flat position."
  },
  {
    timeLabel: "Hour 6 (Band Depressurization)",
    timeLabelShort: "Hour 6",
    hour: 6,
    radialTitle: "Wrist Band Depressurized & Removed",
    radialDesc: "The air pressure in the radial band is gradually released by the nursing desk. Microscopic puncture site seals cleanly.",
    radialStatus: "Discharge-ready same-day or comfortable overnight stay.",
    radialIcon: "band",
    femoralTitle: "Initial Careful Bedrest Release",
    femoralDesc: "Groin sheath site checked for bleeding. Patient allowed to gently elevate head of bed under nurse supervision.",
    femoralStatus: "First tentative step out of bed with assistance."
  },
  {
    timeLabel: "Hour 24 (Discharge & Home Return)",
    timeLabelShort: "Hour 24",
    hour: 24,
    radialTitle: "Full Home Activity & Normal Routine",
    radialDesc: "Patient returns home with family, taking light walks and enjoying meals. No painful groin wound to manage.",
    radialStatus: "Fast 24-hour discharge • Return to daily routine in 2-3 days.",
    radialIcon: "home",
    femoralTitle: "Gradual Groin Recovery",
    femoralDesc: "Groin soreness and bruising may persist for several days, requiring care when walking or climbing stairs.",
    femoralStatus: "Slower return to physical confidence."
  }
];

export const TransradialRecoveryTimeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stage = recoveryStages[activeStage];

  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-card)",
      padding: "3rem",
      position: "relative"
    }}>
      {/* Eyebrow Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span className="eyebrow-pill" style={{ marginBottom: "0.6rem" }}>
          <Sparkles size={14} /> DR. SANDHU'S CLINICAL MASTERY
        </span>
        <h2 style={{ fontSize: "2.2rem", color: "var(--secondary)", marginTop: "0.4rem" }}>
          Why Wrist Access Transradial Angioplasty <span style={{ color: "var(--primary)" }}>Changes Everything</span>
        </h2>
        <p style={{ color: "var(--text-body)", fontSize: "1rem", maxWidth: "700px", margin: "0.5rem auto 0 auto" }}>
          Explore the interactive hour-by-hour recovery timeline comparing Dr. Manjinder Sandhu&apos;s 99% Wrist-Access technique with traditional groin angioplasty.
        </p>
      </div>

      {/* Interactive Time Stepper Bar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        marginBottom: "2.5rem",
        backgroundColor: "var(--bg-soft)",
        padding: "0.75rem",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-color)"
      }}>
        {recoveryStages.map((stg, idx) => {
          const isActive = idx === activeStage;
          return (
            <button
              key={idx}
              onClick={() => setActiveStage(idx)}
              style={{
                backgroundColor: isActive ? "var(--primary)" : "transparent",
                color: isActive ? "#ffffff" : "var(--secondary)",
                border: "none",
                borderRadius: "var(--radius-md)",
                padding: "0.9rem 1rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.25rem"
              }}
            >
              <div style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                opacity: isActive ? 0.9 : 0.7
              }}>
                Stage {idx + 1}
              </div>
              <div style={{
                fontSize: "1rem",
                fontWeight: 800
              }}>
                {stg.timeLabel.split(" ")[0]} {stg.timeLabel.split(" ")[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Comparison Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        alignItems: "stretch"
      }} className="triage-grid">

        {/* Left Column: Transradial Wrist Access (Dr. Sandhu's Specialty) */}
        <div style={{
          backgroundColor: "#fdf2f3",
          border: "2px solid var(--primary-tag-bg)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                <span className="eyebrow-pill" style={{
                  backgroundColor: "var(--primary)",
                  color: "#ffffff",
                  fontSize: "0.725rem",
                  padding: "0.4rem 0.85rem",
                  marginBottom: 0
                }}>
                  DR. SANDHU&apos;S TECHNIQUE (WRIST ACCESS)
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 800 }}>
                  {stage.timeLabel}
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: "1.35rem", color: "var(--secondary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              {stage.radialTitle}
            </h3>

            <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {stage.radialDesc}
            </p>
          </div>

          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-md)",
            padding: "1rem 1.25rem",
            border: "1px solid rgba(230, 35, 52, 0.2)",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem"
          }}>
            <ShieldCheck size={22} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--secondary)" }}>
                Patient Experience:
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600, marginTop: "2px" }}>
                {stage.radialStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Traditional Femoral Groin Access */}
        <div style={{
          backgroundColor: "var(--bg-soft)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                <span style={{
                  fontSize: "0.725rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  backgroundColor: "var(--border-color)",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "var(--radius-pill)"
                }}>
                  TRADITIONAL GROIN ACCESS
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  {stage.timeLabel}
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: "1.35rem", color: "var(--secondary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
              {stage.femoralTitle}
            </h3>

            <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {stage.femoralDesc}
            </p>
          </div>

          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-md)",
            padding: "1rem 1.25rem",
            border: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem"
          }}>
            <AlertCircle size={22} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--secondary)" }}>
                Groin Procedure Impact:
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2px" }}>
                {stage.femoralStatus}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Summary Bar */}
      <div style={{
        marginTop: "2rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--secondary)", fontWeight: 700 }}>
            <CheckCircle2 size={18} style={{ color: "var(--primary)" }} /> 99%+ Wrist Access Success Rate
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--secondary)", fontWeight: 700 }}>
            <CheckCircle2 size={18} style={{ color: "var(--primary)" }} /> Zero Mandatory Flat Bedrest
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--secondary)", fontWeight: 700 }}>
            <CheckCircle2 size={18} style={{ color: "var(--primary)" }} /> 99% Lower Access Bleeding
          </span>
        </div>

        <button
          onClick={() => setActiveStage((activeStage + 1) % 4)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "var(--primary)",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}
        >
          Next Recovery Stage <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
