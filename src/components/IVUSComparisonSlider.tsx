"use client";

import React, { useState } from "react";
import { Shield, Sparkles, ArrowLeftRight, CheckCircle2 } from "lucide-react";

export const IVUSComparisonSlider: React.FC = () => {
  const [position, setPosition] = useState<number>(50);

  const showStandardCaption = position >= 34;
  const showIvusCaption = position <= 66;

  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-card)",
      padding: "3rem",
      position: "relative"
    }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span className="eyebrow-pill" style={{ marginBottom: "0.5rem" }}>
          <Sparkles size={14} /> PRECISION INTERVENTIONAL CARDIOLOGY
        </span>
        <h2 style={{ fontSize: "2.2rem", color: "var(--secondary)", marginTop: "0.4rem" }}>
          See the Difference <span style={{ color: "var(--primary)" }}>3D IVUS / OCT Imaging Makes</span>
        </h2>
        <p style={{ color: "var(--text-body)", fontSize: "1rem", maxWidth: "680px", margin: "0.5rem auto 0 auto" }}>
          Intravascular Ultrasound (IVUS) provides high-resolution 3D cross-sectional imaging from inside the coronary artery, ensuring optimal stent expansion and zero plaque overhang.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "3rem",
        alignItems: "center"
      }} className="triage-grid">
        
        {/* Left Side Interactive Image Comparison Container */}
        <div>
          <div style={{
            position: "relative",
            width: "100%",
            height: "360px",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "0 16px 40px rgba(26, 37, 48, 0.12)",
            backgroundColor: "var(--secondary)",
            userSelect: "none"
          }}>
            {/* Base Image (3D IVUS View) */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #1a2530 0%, #0f172a 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              padding: "2rem",
              textAlign: "center"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "3px solid var(--primary)",
                backgroundColor: "rgba(230, 35, 52, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
              }}>
                <Sparkles size={36} style={{ color: "var(--primary)" }} />
              </div>
              <h4 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.4rem" }}>
                3D IVUS Cross-Sectional Arterial Scan
              </h4>
              <p style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
                360° Wall Thickness • Exact Plaque Calcification • Stent Sizing
              </p>
            </div>

            {/* Overlay Image (Standard 2D Angiogram View) */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: `${position}%`,
              overflow: "hidden",
              background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              padding: "2rem",
              textAlign: "center",
              borderRight: "2px solid #ffffff"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "2px solid #94a3b8",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
              }}>
                <Shield size={36} style={{ color: "#94a3b8" }} />
              </div>
              <h4 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "0.4rem", whiteSpace: "nowrap" }}>
                Standard 2D Angiogram
              </h4>
              <p style={{ fontSize: "0.85rem", color: "#9ca3af", whiteSpace: "nowrap" }}>
                Flat Shadow Projection • Limited Calcium Depth Detail
              </p>
            </div>

            {/* Stage Labels */}
            <div style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#ffffff",
              fontSize: "0.725rem",
              fontWeight: 700,
              padding: "0.25rem 0.6rem",
              borderRadius: "var(--radius-pill)",
              backdropFilter: "blur(4px)"
            }}>
              Standard 2D View
            </div>

            <div style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              fontSize: "0.725rem",
              fontWeight: 700,
              padding: "0.25rem 0.6rem",
              borderRadius: "var(--radius-pill)"
            }}>
              3D IVUS Guided View
            </div>

            {/* Slider Range Control */}
            <input
              type="range"
              min="5"
              max="95"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              aria-label="Compare standard fluoroscopy with 3D IVUS imaging"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "ew-resize",
                zIndex: 10
              }}
            />

            {/* Slider Handle Divider Icon */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: `${position}%`,
              transform: "translate(-50%, -50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
              pointerEvents: "none",
              zIndex: 5
            }}>
              <ArrowLeftRight size={20} />
            </div>
          </div>

          <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.75rem" }}>
            ↔ Drag or click slider to compare standard 2D view with 3D IVUS high-definition imaging.
          </p>
        </div>

        {/* Right Copy Block */}
        <div>
          <h3 style={{ fontSize: "1.5rem", color: "var(--secondary)", marginBottom: "1rem" }}>
            Unmatched Precision for Complex Stenting
          </h3>
          <p style={{ color: "var(--text-body)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Dr. Manjinder Sandhu uses Intravascular Ultrasound (IVUS) and Optical Coherence Tomography (OCT) during angioplasty to measure exact artery diameter, detect hidden calcium, and verify perfect stent placement.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.75rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.9rem", color: "var(--secondary)" }}>
              <CheckCircle2 size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
              <span><strong>Precise Stent Sizing:</strong> Eliminates under-expansion and reduces long-term restenosis risk.</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.9rem", color: "var(--secondary)" }}>
              <CheckCircle2 size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
              <span><strong>Rotablator & IVL Guidance:</strong> Accurately quantifies calcium depth before stenting.</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.9rem", color: "var(--secondary)" }}>
              <CheckCircle2 size={18} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
              <span><strong>Superior Clinical Outcomes:</strong> Backed by global randomized trials showing lower cardiac events.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
