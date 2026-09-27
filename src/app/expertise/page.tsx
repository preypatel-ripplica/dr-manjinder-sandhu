"use client";

import { VisualIntro } from "@/components/VisualIntro";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Activity,
  Zap,
  Stethoscope,
} from "lucide-react";
import { BookingModal } from "@/components/BookingModal";

export default function ExpertisePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const pillars = [
    {
      title: "Invasive & Interventional Cardiology",
      tagline:
        "Precision catheter-based stenting & non-surgical valve replacement",
      icon: Zap,
      description:
        "Pioneering radial wrist angioplasty, TAVR/TAVI heart valve replacements, Rotablator calcified CTO stenting, and pacemaker implants with minimal invasiveness.",
      highlights: [
        "Radial Wrist Angioplasty & Stenting",
        "TAVR / TAVI Non-Surgical Valve Replacement",
        "Complex Calcified CTO Rotablator Stenting",
        "Pacemaker & ICD Rhythm Device Implants",
      ],
      slugFilter: "Invasive",
    },
    {
      title: "Preventive Cardiology & Risk Screening",
      tagline: "Proactive screening to prevent avoidable heart attacks",
      icon: ShieldCheck,
      description:
        "Comprehensive cardiovascular risk assessment evaluating arterial calcification, lipid subclasses, blood pressure control, and genetic risk factors decades before symptoms occur.",
      highlights: [
        "CT Coronary Calcium Scoring",
        "High-Sensitivity hs-CRP & Lipid Profiling",
        "Lifestyle & Dietary Cardiovascular Plans",
        "Hypertension & Diabetes Heart Protection",
      ],
      slugFilter: "Preventive",
    },
    {
      title: "Non-Invasive Diagnostic Cardiology",
      tagline: "High-definition ultrasound & color Doppler heart imaging",
      icon: Activity,
      description:
        "Advanced diagnostic imaging evaluating heart chamber pumping efficiency (Ejection Fraction), valve motion, wall thickness, and congenital structural variations.",
      highlights: [
        "2D / 3D Echocardiography & Color Doppler",
        "Treadmill Stress Testing (TMT) & Stress Echo",
        "24-48 Hour Continuous Holter Rhythm Monitoring",
        "Carotid Arterial Doppler Scans",
      ],
      slugFilter: "Non-Invasive",
    },
    {
      title: "General & Heart Failure Cardiology",
      tagline: "Long-term medical optimization & resynchronization therapy",
      icon: Heart,
      description:
        "Specialized clinical care for weak heart muscle pumping (low EF), integrating modern ARNI/SGLT2 inhibitors and Cardiac Resynchronization Therapy (CRT).",
      highlights: [
        "Guideline-Directed Medical Therapy (GDMT)",
        "Cardiac Resynchronization Therapy (CRT-D / CRT-P)",
        "Cardiomyopathy & Heart Failure Management",
        "Post-Angioplasty Rehabilitation & Care",
      ],
      slugFilter: "General",
    },
  ];

  return (
    <div>
      {/* Page Hero Header */}
      <VisualIntro
        label="HEART CARE / EXPERTISE"
        title="Specialist care. A complete perspective."
        description="From understanding your risk to planning specialist treatment, explore the four areas of Dr. Sandhu’s cardiac care."
        image="/images/dr-sandhu-office.png"
        alt="Dr. Sandhu in his consultation room"
      />

      <section className="section-padding">
        <div className="container-custom expertise-rows">
          {pillars.map((pil, i) => (
            <article className="expertise-row" key={pil.slugFilter}>
              <div className="expertise-visual">
                <img
                  src={
                    i === 1
                      ? "/images/heart-consultation.jpg"
                      : i === 3
                        ? "/images/patient-care.jpg"
                        : "/images/clinical-care.jpg"
                  }
                  alt={
                    i === 1
                      ? "A blood pressure check"
                      : i === 3
                        ? "An older couple at home"
                        : "A clinician reviewing information"
                  }
                  width={700}
                  height={500}
                  loading="lazy"
                />
                <span>0{i + 1}</span>
              </div>
              <div>
                <span className="eyebrow-pill">
                  {pil.slugFilter} CARDIOLOGY
                </span>
                <h2>
                  {
                    [
                      "Treating arteries, valves & heart rhythm.",
                      "Understanding your risk. Planning ahead.",
                      "A clearer picture of your heart.",
                      "Support for your long-term heart health.",
                    ][i]
                  }
                </h2>
                <p>{pil.tagline}</p>
                <details className="expertise-details">
                  <summary>Explore services in this area</summary>
                  <div>
                    <p>{pil.description}</p>
                    <ul>
                      {pil.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </details>
                <Link
                  className="text-link"
                  href={`/treatments?category=${pil.slugFilter}`}
                >
                  Browse treatments <ArrowRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      {/* Booking CTA Section */}
      <section
        style={{
          backgroundColor: "var(--secondary)",
          color: "#ffffff",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="container-custom">
          <h2
            style={{
              color: "#ffffff",
              fontSize: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Consult Dr. Manjinder Sandhu for Expert Cardiac Care
          </h2>
          <p
            style={{
              color: "#d1d5db",
              fontSize: "1rem",
              maxWidth: "600px",
              margin: "0 auto 1.75rem auto",
            }}
          >
            Get an evidence-based clinical evaluation in Gurugram, Manesar,
            and Delhi NCR.
          </p>
          <button
            onClick={() => setBookingModalOpen(true)}
            className="btn-primary"
            style={{ padding: "0.9rem 2rem" }}
          >
            Book Consultation Appointment
          </button>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
