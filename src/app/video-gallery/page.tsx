"use client";

import React, { useState } from "react";
import { VideoCard } from "@/components/VideoCard";
import { Play, ShieldCheck, Heart } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export default function VideoGalleryPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const videos = [
    {
      title: "Understanding Radial Wrist Angioplasty & Stenting",
      patientName: "Dr. Manjinder Sandhu Clinical Guide",
      procedureTag: "Radial Angioplasty",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "TAVR Valve Replacement Patient Recovery Story",
      patientName: "Sunita Verma Family Review",
      procedureTag: "TAVR / TAVI",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Pacemaker Implantation & Post-Op Guidance",
      patientName: "Atrius Cardiac Care Clinic Series",
      procedureTag: "Pacemaker Implants",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  return (
    <div>
      {/* Page Hero Header */}
      <section style={{ backgroundColor: "var(--bg-soft)", padding: "4rem 0", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container-custom" style={{ textAlign: "center" }}>
          <span className="eyebrow-pill" style={{ marginBottom: "0.75rem" }}>PATIENT EDUCATION & VIDEOS</span>
          <h1 className="heading-underline" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
            Video <span style={{ color: "var(--primary)" }}>Gallery</span>
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.05rem", maxWidth: "720px", margin: "1rem auto 0 auto" }}>
            Watch procedural explanations, patient recovery stories, and interventional cardiology insights from Dr. Manjinder Sandhu.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--bg-page)" }}>
        <div className="container-custom">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
            {videos.map((vid, idx) => (
              <VideoCard key={idx} {...vid} />
            ))}
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </div>
  );
}
