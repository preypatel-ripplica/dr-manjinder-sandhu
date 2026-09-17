"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  const whatsappNumber = "918130370096";
  const defaultText = encodeURIComponent("Hello Dr. Manjinder Sandhu's team, I would like to inquire about a cardiology consultation.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Dr. Sandhu's Desk"
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        backgroundColor: "var(--whatsapp)",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "0.75rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
        zIndex: 9000,
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "0.9rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) translateY(0)";
      }}
    >
      <MessageSquare size={20} fill="#ffffff" />
      <span className="hidden-mobile">Chat on WhatsApp</span>
    </a>
  );
};
