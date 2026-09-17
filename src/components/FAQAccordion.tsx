"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, AlertCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  showPricingDisclaimer?: boolean;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = "Frequently Asked Questions",
  showPricingDisclaimer = true
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-lg)",
      padding: "2rem",
      boxShadow: "var(--shadow-card)"
    }}>
      <h3 style={{
        fontSize: "1.35rem",
        color: "var(--secondary)",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        <HelpCircle size={22} style={{ color: "var(--primary)" }} /> {title}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              style={{
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                transition: "border-color 0.2s ease"
              }}
            >
              <button
                onClick={() => toggleIndex(idx)}
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: isOpen ? "var(--bg-soft)" : "#ffffff",
                  border: "none",
                  textAlign: "left",
                  fontSize: "0.975rem",
                  fontWeight: 600,
                  color: isOpen ? "var(--primary)" : "var(--secondary)",
                  cursor: "pointer"
                }}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    flexShrink: 0
                  }}
                />
              </button>

              {isOpen && (
                <div style={{
                  padding: "1rem 1.25rem 1.25rem 1.25rem",
                  fontSize: "0.925rem",
                  color: "var(--text-body)",
                  lineHeight: 1.6,
                  borderTop: "1px solid var(--border-color)",
                  backgroundColor: "#ffffff"
                }}>
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showPricingDisclaimer && (
        <div style={{
          marginTop: "1.75rem",
          padding: "0.85rem 1rem",
          backgroundColor: "var(--primary-light)",
          border: "1px solid var(--primary-tag-bg)",
          borderRadius: "var(--radius-sm)",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          fontSize: "0.825rem",
          color: "var(--secondary)"
        }}>
          <AlertCircle size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
          <span>
            <strong>Clinical & Pricing Disclaimer:</strong> Treatment cost depends on individual diagnostic findings, stent selection, imaging guidance (IVUS/OCT), and stay duration. Request a written personal estimate during your consultation.
          </span>
        </div>
      )}
    </div>
  );
};
